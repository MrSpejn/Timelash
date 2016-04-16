'use strict';
import imagediff from 'imagediff';

import {renderComponent, expect} from '../test_helper';
import paintRing from '../CanvasHelper';

import ProgressTimeCanvas from '../../src/components/progress/progress-time-canvas';

describe('ProgressTimeCanvas', () => {
  let Component;
  let perfectCanvas;

  beforeEach(() => {
    perfectCanvas = imagediff.createCanvas();
    perfectCanvas.width = 400;
    perfectCanvas.height = 400;
  });


  it('should render canvas as main element', () => {
    Component = renderComponent(ProgressTimeCanvas, {'currentValue': 1, 'maxValue': 1});
    expect(Component.getContext).to.be.a('function');
  });

  it('should paint empty ring when no value in equal 0', () => {
    Component = renderComponent(ProgressTimeCanvas, {'currentValue': 0, 'maxValue': 1});

    paintRing(perfectCanvas, 0);

    if (!imagediff.equal(perfectCanvas, Component.getContext('2d'), 1)) {
      throw new Error("Two images do not match each other");
    }
  });

  it('should paint full ring when value reaches max', () => {
    Component = renderComponent(ProgressTimeCanvas, {'currentValue': 1, 'maxValue': 1});

    paintRing(perfectCanvas, 360);

    if (!imagediff.equal(perfectCanvas, Component.getContext('2d'), 1)) {
      throw new Error("Two images do not match each other");
    }
  });

  it('should paint partialy filled ring when value is a fraction of max', () => {
    Component = renderComponent(ProgressTimeCanvas, {'currentValue': 6, 'maxValue': 16});

    paintRing(perfectCanvas, 135);

    if (!imagediff.equal(perfectCanvas, Component.getContext('2d'), 1)) {
      throw new Error("Two images do not match each other");
    }
  });

});