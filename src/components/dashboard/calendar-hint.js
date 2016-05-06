import React from 'react';

export default (props) => {
  const item = props.options.item;
  const position = {top: props.options.y};
  const width = 210;
  const pointerSize = 10;
  let direction;

  if (item.time < 3600) {
    position.top -= 10;
  }
  if (props.options.x > pointerSize + width) {
    position.left = props.options.x - width;
    direction = 'left';
  }
  else {
    position.left = props.options.x + props.options.targetWidth + pointerSize;
    direction = 'right';
  }

  return (
    <div className={`weekly-calendar__hint
                     weekly-calendar__hint--${direction}`} style={position}>
      <h3>{item.name}</h3>
      <span><em>Started: </em>{item.date.format('hh:mm A')}</span><br />
      <span><em>Duration: </em>{Math.round(item.time / 60)}min</span>
    </div>
  );
}