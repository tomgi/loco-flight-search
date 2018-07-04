import PropTypes from 'prop-types';
import React from 'react';
import Pikaday from 'pikaday';
import 'moment';

export default class Datepicker extends React.Component {
  constructor(props) {
    super(props);

    this.initPikaday = (field) => {
      const pikaday = new Pikaday({
        field,
        onSelect: () => {
          const { onSelect } = this.props;
          onSelect(pikaday.getMoment());
        },
      });
    };
  }

  render() {
    return (
      <div className="field">
        <div className="label">
          Date
        </div>
        <div className="control">
          <input
            name="date"
            className="input"
            type="text"
            placeholder="When are you flying?"
            ref={this.initPikaday}
          />
        </div>
      </div>
    );
  }
}

Datepicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
