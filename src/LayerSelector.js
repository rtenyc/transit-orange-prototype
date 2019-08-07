import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLayer } from './actions';
import './LayerSelector.scss';

export default function LayerSelector(props) {
  const layers = useSelector(state => state.layers);
  const dispatch = useDispatch();

  return (
    <div className='LayerSelector'>
      <ul>
        {layers.map(({ id, name, selected }) => (
          <li key={id}>
            <label htmlFor={`check-${id}`}>
              <input
                id={`check-${id}`}
                type='checkbox'
                checked={selected}
                onChange={() => dispatch(toggleLayer(id, !selected))}
              />
              {name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
