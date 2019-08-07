import React from 'react';
import Select from 'react-select';

import './TownSelector.scss';

export default function TownSelector({ onChange, towns }) {
  return (
    <div className='TownSelector'>
      <Select
        onChange={option => onChange(option.value)}
        options={towns.map(town => ({ label: town, value: town }))}
        placeholder='Select a town'
      />
    </div>
  );
}
