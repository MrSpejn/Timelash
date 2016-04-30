import React                     from 'react';
import leftPad                   from '../../utilities/left-pad';


export default (props) => {
  let time;
  if(props.currentValue === props.maxValue) {
    time = 'Koniec';
  }
  else {
    const minutes = leftPad(Math.floor(props.currentValue / 60), 2, '0');
    const seconds = leftPad(props.currentValue % 60, 2, '0');
    time = `${minutes}:${seconds}`;
  }

  return (
    <div className='progress-box__timer'>
      {time}
    </div>
  );
}