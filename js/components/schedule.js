import { h, Component } from 'preact'
import LabelledItem from './labelled-item'

import titleCase from 'voca/title_case'
import isEmpty from 'lodash/isEmpty'
import { hasValuesAsObject } from '../utils'

import { setHours, setMinutes, format } from 'date-fns'

const timeReformat = (timeString) => {
  const [ hours, minutes ] = timeString.split(':')

  return format(setMinutes(setHours(new Date(), parseInt(hours)), minutes), 'h:mm a')
}

const Schedule = (props) => {

  if (!hasValuesAsObject(props.item)) { return }

  const daysOfTheWeek = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
  ]

  return (<div className='program--schedule'>
    {daysOfTheWeek.map((day) => {
      const status = ( isEmpty(props.item[day]) && 'closed' ) || 'open'
      return (<LabelledItem
        label={`${titleCase(day)}`}
        attribute={`schedule-${day}-${status}`}>
          { props.item[day].map(timeReformat).join(' — ') || status }
      </LabelledItem>)
    })}
  </div>)
}

export default Schedule