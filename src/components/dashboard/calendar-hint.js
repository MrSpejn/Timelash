import React from 'react';

export default (props) => {
  const item = props.options.item;
  const position = {top: props.options.y};
  let direction;

  if (item.time < 3600) {
    position.top -= 10;
  }
  if (props.options.x > 230) {
    position.left = props.options.x - 215;
    direction = 'left';
  }
  else {
    position.left = props.options.x + props.options.targetWidth + 15;
    direction = 'right';
  }

  return (
    <div className={`weekly-calendar__calendar-hint
                     weekly-calendar__calendar-hint--${direction}`} style={position}>
      <h3>{item.name}</h3>
      <span><em>Started: </em>{item.date.format('hh:mm A')}</span><br />
      <span><em>Duration: </em>{Math.round(item.time / 60)}min</span>
    </div>
  );
}