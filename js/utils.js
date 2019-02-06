import { format } from 'date-fns'
import replaceAll from 'voca/replace_all'
import kebabCase from 'voca/kebab_case'
import titleCase from 'voca/title_case'

import { attributeSettings } from './constants'

const PHONE_REGEX = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g

function cleanStrings(string) {
  return replaceAll(replaceAll(string, /â€™/, "'"), /Â/, '')
}

function getLabelAndPhone(string, index) {
  const phone = string.match(PHONE_REGEX)
  if (!phone || !phone.length) {
    return {}
  }

  const label = string.replace(phone[0], '').trim() || `Phone ${index + 1}`

  return {
    [label]: phone[0],
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
}

function handleDataFromAPIToView(object) {
  let transformedViewData = {}

  Object.keys(object)
    .forEach((key, index) => {

      let item = object[key]
      if (additionalTransforms[key]) {
        item = additionalTransforms[key](item)
      }

      const viewData = dataToViewData(key, index, item)

      const { groups, order = [] } = attributeSettings[key]

      return groups.forEach((group, groupIndex) => {
        const viewDataOrdered = Object.assign({
          order: order[groupIndex] || index,
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

function dataToViewData(key, index, item) {
  const { label = titleCase(key.split('_').join(' ')) } = attributeSettings[key] || {}
  const attribute = kebabCase(key)

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