import React from "react";
import PropTypes from "prop-types";
import { makeBezierCurve } from "../utils/formulas";

const Heart = (props) => {

    const heartStyle = {
        fill: '#da0d15',
        stroke: '#a51708',
        strokeWidth: '2px',
      };

  const rightSide = {
    initialAxis: {
      x: props.position.x,
      y: props.position.y,
    },
    initialControlPoint: {
      x: 20,
      y: -20,
    },
    endingControlPoint: {
      x: 40,
      y: 10,
    },
    endingAxis: {
      x: 0,
      y: 40,
    },
  };

  const leftSide = {
    initialAxis: {
      x: props.position.x,
      y: props.position.y,
    },
    initialControlPoint: {
      x: -20,
      y: -20,
    },
    endingControlPoint: {
      x: -40,
      y: 10,
    },
    endingAxis: {
      x: 0,
      y: 40,
    },
  };

  return (
    <g filter="url(#shadow)">
      <path style={heartStyle} d={makeBezierCurve(leftSide)} />
      <path style={heartStyle} d={makeBezierCurve(rightSide)} />
    </g>
  );
};

Heart.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Heart;
