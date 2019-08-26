import React from 'react';
import Select from 'react-select';

import './StyleSelector.scss';

export default function StyleSelector({ onChange, selectedStyle, styles }) {
  const makeOption = (styleName) => ({ label: styleName, value: styleName });

  return (
    <div className='StyleSelector'>
      <Select
        defaultValue={makeOption(selectedStyle)}
        isSearchable={false}
        onChange={option => onChange(option.value)}
        options={styles.map(makeOption)}
        placeholder='Select a style'
      />
    </div>
  );
}
