import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Slider from 'react-input-slider';
import moment from 'moment';

import { setDayOfWeek, setTimeOfDay } from './actions';
import './TimeSelector.scss';

export default function TimeSelector(props) {
  const { dayOfWeek, timeOfDay } = useSelector(state => state.time);
  const dispatch = useDispatch();
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const makeOption = (day) => ({ label: day, value: day });

  const hour = Math.floor(parseInt(timeOfDay) / 100);
  const minutes = (parseInt(timeOfDay) % 100) / 60.0;
  const time = hour + minutes;

  const formatTime = time => {
    let commonName;
    if (time === 0) commonName = 'midnight';
    if (time === 12) commonName = 'noon';

    const date = moment()
      .hours(Math.floor(time))
      .minutes(time % 1 ? (60 * (time % 1)) : 0);
    return date.format('h:mm a') + (commonName ? ` (${commonName})` : '');
  }

  return (
    <div className='TimeSelector'>
      <div>Show services available:</div>
      <div className='TimeSelector-inputs'>
        <Select
          className='day-of-week'
          defaultValue={makeOption(dayOfWeek)}
          isSearchable={false}
          menuPlacement='auto'
          onChange={option => dispatch(setDayOfWeek(option.value))}
          options={days.map(makeOption)}
        />

        <div className='time-of-day'>
          <div>At {formatTime(time)}</div>
          <Slider
            axis='x'
            xmin={0}
            xmax={24}
            xstep={0.25}
            onChange={({x}) => {
              const date = moment()
                .hours(Math.floor(x))
                .minutes(x % 1 ? (60 * (x % 1)) : 0);
              dispatch(setTimeOfDay(date.format('HHmm')));
            }}
            x={time}
          />
        </div>
      </div>
    </div>
  );
}
