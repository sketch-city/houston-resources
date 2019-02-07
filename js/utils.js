import { format } from 'date-fns'
import replaceAll from 'voca/replace_all'
import kebabCase from 'voca/kebab_case'
import titleCase from 'voca/title_case'

import {
  attributeSettings,
  commonCities,
} from './constants'

const PHONE_REGEX = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g

function cleanStrings(string) {
  return replaceAll(replaceAll(string, /â€™/, "'"), /Â/, '')
}

function getLabelAndPhone(string, index) {
  const phone = string.match(PHONE_REGEX)
  if (!phone || !phone.length) {
    return {}
  }

  const label = string.replace(phone[0], '').trim() || (index ? `Phone ${index + 1}` : `Main Phone`)

  return {
    [titleCase(label)]: phone[0],
  }
}

function getPhonesFromString(string) {
  const phonesAndLabels = string.split('nn').join(';').split(';')
  const phones = phonesAndLabels.reduce((result, line, index) => {
    return Object.assign(getLabelAndPhone(line, index), result)
  }, {})

  return phones
}

function formatDateString(string, stringFormat = 'MM/DD/YYYY') {
  return format(new Date(string), stringFormat)
}

const commonCitiesRegex = new RegExp(`(${commonCities.join('.*$|')}.*$){1}`)

function isCityCrowded(address) {
  const cityPos = address.search(commonCitiesRegex)
  return address[cityPos - 1] !== ' '
}

function splitByCity(address) {
  return address.split(commonCitiesRegex).join(' ')
}

const additionalTransforms = {
  agency_phone: (data) => {
    const phones = getPhonesFromString(data)

    return Object.keys(phones)
      .map((key, index) => {
        return dataToViewData(key, index, phones[key])
      })
  },
  last_updated: formatDateString,
  description: cleanStrings,
  physical_address: (data) => ( (isCityCrowded(data) && splitByCity(data)) || data )
}
// These next few functions are unfortunate...this can definitely be
// reduced...
function labellizeSettings(settings = attributeSettings) {
  let labels = {}

  Object.keys(settings)
    .forEach((key, index) => {
      let labelledSettings = labellizeSetting(key, index, settings)

      const { groups, order = [] } = settings[key]

      const groupsWithOrder = groups.reduce((result, group, groupIndex) => {
        const itemOrder = order[groupIndex] !== undefined ? order[groupIndex] : index
        return Object.assign({
          [group]: itemOrder
        }, result)

      }, {})

      labelledSettings.groups = groupsWithOrder

      if (!labels[key]) {
        labels[key] = labelledSettings
      }
    })
  return labels
}

export const labellizedSettings = labellizeSettings()

function groupSettings(settings = attributeSettings) {
  let grouped = {}

  Object.keys(settings)
    .forEach((key, index) => {
      const labelledSettings = labellizedSettings[key]
      const { groups, order = [] } = settings[key]

      return groups.forEach((group, groupIndex) => {

        const settingsCombined = Object.assign({
          order: labellizedSettings[key].groups[group],
          groups: groups,
        }, labelledSettings)

        if (!grouped[group]) {
          grouped[group] = []
        }

        grouped[group].push(settingsCombined)
      })
    })

  Object.keys(grouped)
    .forEach((key, index) => {
      const settingsCombined = grouped[key]
      settingsCombined.sort((item1, item2) => {
        return item1.order - item2.order
      })

      grouped[key] = settingsCombined
    })

  return grouped
}

export const groupedSettings = groupSettings()

function handleDataFromAPIToView(object) {
  let transformedViewData = {}

  Object.keys(object)
    .forEach((key, index) => {

      let item = object[key]
      if (additionalTransforms[key]) {
        item = additionalTransforms[key](item)
      }

      const { attribute, label } = labellizedSettings[key]

      const viewData = { attribute, label, item }

      const { groups, order = [] } = attributeSettings[key]

      return groups.forEach((group, groupIndex) => {
        const viewDataOrdered = Object.assign({
          order: labellizedSettings[key].groups[group],
          groups: groups,
        }, viewData)

        if (!transformedViewData[group]) {
          transformedViewData[group] = []
        }

        transformedViewData[group].push(viewDataOrdered)
      })
    })

  Object.keys(transformedViewData)
    .forEach((key, index) => {
      const dataViews = transformedViewData[key]
      dataViews.sort((item1, item2) => {
        return item1.order - item2.order
      })

      transformedViewData[key] = dataViews
    })

  return transformedViewData
}

function labellizeSetting(key, index, settings = attributeSettings) {
  const { label = titleCase(key.split('_').join(' ')) } = settings[key] || {}
  const attribute = kebabCase(key)

  return {
    label,
    attribute,
  }
}

function dataToViewData(key, index, item) {
  const { label, attribute } = labellizeSetting(key, index, attributeSettings)

  return {
    attribute,
    label,
    item,
  }
}

export {
  cleanStrings,
  getLabelAndPhone,
  getPhonesFromString,
  formatDateString,
  dataToViewData,
  handleDataFromAPIToView,
}