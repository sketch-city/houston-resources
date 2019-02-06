export const searchURL = '//need-hou-api.herokuapp.com/api/programs'

export const categories = [
  {
    name: 'Food',
    description: 'Find help for your food needs such as food pantries, food stamps, and nutrition education',
  },
  {
    name: 'Family',
    description: 'blajblkajlksj dlkajsdflk askl',
  },
  {
    name: 'Health',
    description: 'blajblkajlksj dlkajsdflk askl',
  },
  {
    name: 'Housing',
    description: 'blajblkajlksj dlkajsdflk askl',
  },
  {
    name: 'Education',
    description: '',
  },
  {
    name: 'Legal',
    description: '',
  },
  {
    name: 'Employment',
    description: '',
  },
  {
    name: 'Money',
    description: '',
  },
]

export const attributeSettings = {
  agency_id: {
    groups: [],
  },
  id: {
    label: 'Service ID',
    groups: [],
  },
  name: {
    label: 'Service Name',
    groups: ['summary', 'listing'],
    order: [0, 0],
  },
  description: {
    groups: ['summary', 'listing'],
    order: [2, 2],
  },
  physical_address: {
    label: 'Address',
    groups: ['summary', 'listing', 'contact'],
  },
  ada: {
    label: 'ADA Compliant',
    groups: ['about', 'services-provided', 'filterable-toggle'],
  },
  application_process: {
    groups: ['about'],
  },
  documents_required: {
    groups: ['requirements', 'about'],
  },
  fee_structure: {
    groups: ['about'],
  },
  coverage_area: {
    groups: ['about'],
  },
  service_type: {
    groups: ['services-provided', 'icon'],
  },
  last_updated: {
    groups: ['details'],
  },
  alternative_name: {
    groups: [],
  },
  website: {
    groups: ['contact'],
    label: 'Learn more about the service',
  },
  appointment_required: {
    groups: ['requirements', 'about'],
    order: [1, 1],
  },
  accepting_clients: {
    groups: ['summary', 'filterable-toggle'],
    order: [0, 0],
  },
  transportation: {
    label: 'Provides Transportation',
    groups: ['services-provided', 'filterable-toggle'],
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
    groups: [],
  },
  next_steps: {
    groups: ['summary'],
  },
  waitlist_wait: {
    groups: ['about'],
  },
  other_program_enrollment: {
    groups: ['about'],
  },
  other_eligibility: {
    groups: ['elgibility'],
    order: [4]
  },
  id_accepted_notes: {
    groups: ['id-details', 'about'],
    order: [2],
  },
  proof_address: {
    label: 'Proof of Address',
    groups: ['requirements', 'about'],
  },
  appointment_required_notes: {
    groups: ['requirements', 'about'],
  },
  service_available_intake: {
    groups: ['service-intake-details', 'about'],
  },
  service_available_intake_notes: {
    groups: ['service-intake-details', 'about'],
  },
  schedule_notes: {
    groups: ['schedule'],
  },
  document_assistance: {
    groups: ['about', 'services-offered'],
  },
  visual_aids_offered: {
    groups: ['about', 'services-offered'],
  },
  consultation_opportunity: {
    groups: ['about', 'services-offered'],
  },
  enforcement_request_policy: {
    groups: ['policy'],
  },
  cultural_competency_offered: {
    groups: ['about', 'services-offered'],
  },
  zipcode_eligibility: {
    groups: ['elgibility'],
    order: [0],
  },
  age_eligibility: {
    groups: ['elgibility'],
    order: [1]
  },
  id_accepted_current: {
    groups: ['id-details', 'about'],
  },
  website_languages: {
    groups: ['language-support'],
    label: 'Website',
  },
  frontline_languages: {
    groups: ['language-support'],
    label: 'Frontline',
  },
  interpretation_offered: {
    groups: ['language-support'],
    label: 'Interpretation',
  },
  crisis_services_offered: {
    groups: ['about', 'services-offered'],
  },
  document_languages: {
    groups: ['language-support'],
    label: 'Document',
  },
  immigration_status: {
    groups: ['policy'],
  },
  income_eligibility: {
    groups: ['elgibility'],
    order: [2]
  },
  id_accepted_expired: {
    groups: ['id-details', 'about'],
  },
  gender_eligibility: {
    groups: ['elgibility'],
    order: [3],
  },
  schedule: {
    groups: ['schedule'],
    label: ['Program/Service Hours'],
  },
  service_cost: {
    groups: ['summary'],
  },
  source: {
    label: 'A2S Verified',
    groups: ['filterable-toggle'],
  },
  agency_name: {
    groups: ['summary', 'listing'],
    label: 'Who is providing this help?',
    order: [1, 1],
  },
  agency_website: {
    groups: ['summary', 'listing'],
    label: 'Learn more about this group.',
  },
  agency_phone: {
    groups: ['listing', 'contact'],
    label: 'Phone Numbers',
    order: [3]
  },
  language_arr: {
    groups: ['language-support'],
    label: 'General',
  },
}