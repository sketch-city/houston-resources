import { format } from 'date-fns'
import replaceAll from 'voca/replace_all'
import kebabCase from 'voca/kebab_case'
import titleCase from 'voca/title_case'
import isArray from 'lodash/isArray'
import compact from 'lodash/compact'
import flatten from 'lodash/flatten'

import {
  commonCities,
} from './constants'

export const attributeSettings = {
  a2s_verified: {
    label: 'A2S Verified',
    groups: ['service-checks'],
    order: [0],
  },
  agency_id: {
    groups: ['identifiers'],
  },
  id: {
    label: 'Service ID',
    groups: ['identifiers'],
  },
  name: {
    label: 'Service Name',
    groups: ['summary', 'listing'],
    order: [1, 1],
  },
  description: {
    groups: ['summary', 'listing'],
    order: [2, 3],
    label: 'Program Description',
  },
  physical_address: {
    label: 'Address',
    groups: ['listing', 'contact', 'coverage'],
    order: [6, 2, 6]
  },
  ada: {
    label: 'ADA accessible?',
    groups: ['services-and-policies', 'service-checks'],
    order: [2, 2]
  },
  application_process: {
    groups: ['about'],
  },
  documents_required: {
    groups: ['requirements'],
    order: [3],
  },
  fee_structure: {
    groups: ['about'],
  },
  coverage_area: {
    groups: ['summary', 'coverage'],
    order: [2],
    label: 'Program Neighborhood/Area',
  },
  service_type: {
    groups: ['services-provided', 'icon', 'service-type'],
    label: 'Service Type'
  },
  last_updated: {
    groups: ['edit-details'],
  },
  alternative_name: {
    groups: [],
  },
  website: {
    groups: ['contact'],
    label: 'Program webpage',
    order: [1],
  },
  appointment_required: {
    groups: ['requirements', 'appointment-required'],
    order: [1],
    label: 'Appointment required?',
  },
  accepting_clients: {
    groups: ['summary', 'listing', 'service-checks'],
    order: [4, 3, 1],
    label: 'Accepting clients?',
  },
  transportation: {
    label: 'Provides Transportation',
    groups: ['services-provided', 'service-checks'],
    order: [3, 3],
  },
  latitude: {
    groups: ['location'],
  },
  longitude: {
    groups: ['location'],
  },
  holiday_schedule: {
    groups: ['schedule'],
  },
  service_area: {
    groups: ['coverage'],
  },
  next_steps: {
    groups: ['summary'],
    order: [6],
    label: 'Next steps for client to take',
  },
  waitlist_wait: {
    groups: ['summary'],
    order: [5],
    label: 'Waitlist wait days',
  },
  other_program_enrollment: {
    groups: ['eligibility'],
    label: 'Requires Enrollment In',
    order: [4],
  },
  other_eligibility: {
    groups: ['eligibility', 'immigrant-accessibility'],
    order: [5]
  },
  id_accepted_notes: {
    groups: ['id-details'],
    order: [2],
    label: 'Notes about accepted IDs',
  },
  proof_address: {
    label: 'Proof of Address',
    groups: ['requirements', 'immigrant-accessibility'],
    order: [0],
  },
  appointment_required_notes: {
    groups: ['requirements', 'immigrant-accessibility'],
    label: ['Appointment notes'],
    order: [2],
  },
  service_available_intake: {
    groups: ['service-intake-details', 'immigrant-accessibility'],
    label: 'Are services available the same day as intake?',
    order: [0],
  },
  service_available_intake_notes: {
    groups: ['service-intake-details'],
    label: ['Intake notes'],
    order: [1],
  },
  schedule_notes: {
    groups: ['schedule'],
  },
  document_assistance: {
    groups: ['services-and-policies', 'immigrant-accessibility'],
    label: 'Assistance with forms offered',
    order: [0],
  },
  visual_aids_offered: {
    groups: ['services-and-policies', 'immigrant-accessibility'],
    label: 'Visual aids offered for low-literacy clients?',
    order: [1],
  },
  consultation_opportunity: {
    groups: ['services-and-policies', 'immigrant-accessibility'],
    label: 'Offers consultation before paperwork',
    order: [3],
  },
  enforcement_request_policy: {
    groups: ['services-and-policies', 'immigrant-accessibility'],
    label: 'Has policy to respond to Immigration and Customs Enforcement requests?',
    order: [4],
  },
  cultural_competency_offered: {
    groups: ['services-and-policies', 'immigrant-accessibility'],
    label: 'Cultural competence trained',
    order: [5],
  },
  zipcode_eligibility: {
    groups: ['eligibility', 'coverage'],
    order: [0],
    label: 'Eligible zipcodes',
  },
  age_eligibility: {
    groups: ['eligibility'],
    order: [3],
    label: 'Eligible age groups',
  },
  id_accepted_current: {
    groups: ['id-details'],
    label: 'Current accepted IDs',
    order: [0],
  },
  website_languages: {
    groups: ['language-support', 'immigrant-accessibility'],
    label: 'Website',
  },
  frontline_languages: {
    groups: ['language-support', 'immigrant-accessibility'],
    label: 'Frontline',
  },
  interpretation_offered: {
    groups: ['language-support', 'immigrant-accessibility'],
    label: 'Interpretation',
  },
  crisis_services_offered: {
    groups: ['services-offered', 'service-checks'],
    order: [4, 4],
  },
  document_languages: {
    groups: ['language-support', 'immigrant-accessibility'],
    label: 'Document',
  },
  immigration_status: {
    groups: ['eligibility', 'immigrant-accessibility'],
    order: [6],
  },
  income_eligibility: {
    groups: ['eligibility'],
    order: [1],
    label: 'Eligible incomes (% of federal poverty level)',
  },
  id_accepted_expired: {
    groups: ['id-details'],
    order: [1],
    label: 'Expired accepted IDs',
  },
  gender_eligibility: {
    groups: ['eligibility'],
    order: [2],
    label: 'Eligible Gender',
  },
  schedule: {
    groups: ['schedule', 'immigrant-accessibility'],
    label: ['Program/Service Hours'],
    order: [0],
  },
  service_cost: {
    groups: [],
  },
  source: {
    groups: [],
  },
  agency_name: {
    groups: ['summary', 'listing'],
    label: 'Who is providing this help?',
    order: [0, 0],
  },
  agency_website: {
    groups: [],
  },
  agency_phone: {
    groups: ['listing', 'contact', 'immigrant-accessibility'],
    label: 'Phone Numbers',
    order: [5, 0]
  },
  language_arr: {
    groups: ['listing', 'summary', 'language-support', 'immigrant-accessibility'],
    label: ['Languages Spoken', 'Program Languages Spoken', 'Program'],
    order: [4, 7, 0]
  },
}

function cleanStrings(string) {
  return replaceAll(replaceAll(string, /â€™/, "'"), /Â/, '')
}

function getLabelAndPhone(string, index) {
  const PHONE_REGEX = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})(([xX]|( x ))\d{1,4})?/g
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
  agency_name: cleanStrings,
  name: cleanStrings,
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
        }, labelledSettings, {
          label: ((isArray(labellizedSettings[key].label[groupIndex]) && labellizedSettings[key].label[groupIndex]) || labellizedSettings[key].label)
        })

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

window.groupedSettings = groupedSettings
window.labellizedSettings = labellizedSettings

function handleDataFromAPIToView(object) {
  let transformedViewData = {}

  Object.keys(object)
    .forEach((key, index) => {

      let item = object[key]
      if (additionalTransforms[key] && item) {
        item = additionalTransforms[key](item)
      }

      if (!labellizedSettings[key]) { return }

      const { attribute, label } = labellizedSettings[key]

      const viewData = { attribute, label, item }

      const { groups, order = [] } = attributeSettings[key]

      return groups.forEach((group, groupIndex) => {
        const viewDataOrdered = Object.assign({
          order: labellizedSettings[key].groups[group],
          groups: groups,
        }, viewData, {
          label: (isArray(label) && label[groupIndex]) || label
        })

        if (!transformedViewData[group]) {
          transformedViewData[group] = []
        }

        transformedViewData[group].push(viewDataOrdered)
      })
    })

  Object.keys(transformedViewData)
    .forEach((key, index) => {
      if (key === 'ALL') { return }

      const dataViews = transformedViewData[key]
      dataViews.sort((item1, item2) => {
        return item1.order - item2.order
      })

      transformedViewData[key] = dataViews
    })

  transformedViewData.searchable = flatten(compact(Object.values(transformedViewData.listing).map((data) => {
    if (isArray(data.item) && data.item[0] && data.item[0].item) {
      return data.item.map((data) => `${data.label} ${data.item}`)
    } else {
      return data.item
    }
  }))).join(' ').toLowerCase()

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