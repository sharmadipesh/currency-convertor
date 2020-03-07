import React from 'react';
import PropTypes from 'prop-types';

import {Constants} from '../config/constants';

export default class Card extends React.Component {
  render() {
    const cardStyle = {
      boxShadow:
        this.props.shadowColor && `${this.props.shadowColor} 0px 0px 20px 0px`,
      backgroundColor: Constants.white_color,
      borderRadius: this.props.borderRadius,
      minWidth: this.props.minWidth,
      maxWidth: this.props.maxWidth,
      borderBottom: this.props.bottomBorder
        ? `${this.props.borderSize} solid ${this.props.borderColor}`
        : 'none',
      pointerEvents: this.props.pointerEvents
    };

    return (
      <div className={this.props.className} style={cardStyle}>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  className: PropTypes.string,
  shadowColor: PropTypes.string,
  borderSize: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string
};

Card.defaultProps = {
  className: '',
  shadowColor: Constants.box_shadow_color,
  borderSize: '4px',
  bottomBorder: true,
  borderColor: Constants.lime_green_color,
  borderRadius: '4px',
  minWidth: '',
  maxWidth: '',
  pointerEvents: 'auto'
};
