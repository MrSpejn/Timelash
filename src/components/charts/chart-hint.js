import React from 'react';

export default (props) => {
  let position;
  const width = 210;
  const pointerSize = 10;
  const options = props.options;
  let direction;

  if (options.display === 'horizontal') {
    position = {top: options.y};

    if (options.targetHeight < pointerSize) {
      position.top -= 5 * Math.ceil(pointerSize / options.targetHeight);
    }
    if (options.x > pointerSize + width) {
      position.left = options.x - width;
      direction = 'left';
    }
    else {
      position.left = options.x + options.targetWidth + pointerSize;
      direction = 'right';
    }
  }

  if (options.display === 'vertical') {
    position = {left: options.x - 10 - pointerSize};
    position.bottom = options.containerHeight - options.y + pointerSize + 5;
    direction = 'bottom';
  }


  return (
    <div className={`chart-hint chart-hint--${direction}`} style={position}>
      {props.children}
    </div>
  );
}