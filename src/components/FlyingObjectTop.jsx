import React from 'react';
import PropTypes from 'prop-types';
import { makeBezierCurve } from '../utils/formulas';
import App from '../App';


const FlyingObjectTop = (props) => {
    const style = {
        fill: '#b6b6b6',
        stroke: '#7d7d7d',
      };

      const baseWith = 40;
      const halfBase = 20;
      const height = 25;

      const cubicBezierCurve = {
        initialAxis: {
          x: props.position.x - halfBase,
          y: props.position.y,
        },
        initialControlPoint: {
          x: 10,
          y: -height,
        },
        endingControlPoint: {
          x: 30,
          y: -height,
        },
        endingAxis: {
          x: baseWith,
          y: 0,
        },
      };

      return (
        <path
          style={style}
          d={makeBezierCurve(cubicBezierCurve)}
        />
      );

    };

    FlyingObjectTop.propTypes = {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
    }).isRequired

}

export default FlyingObjectTop