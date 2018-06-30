import $ from 'jquery';
import Pikaday from 'pikaday';
import 'moment';

class Datepicker {
  constructor(dateInputField) {
    if ($(dateInputField).length !== 1) {
      throw new Error('Datepicker component must be given a single DOM element to attach to.');
    }

    const pikaday = new Pikaday({
      field: $(dateInputField)[0],
      onSelect: () => { this.value = pikaday.getMoment(); },
    });
  }
}

export { Datepicker as default };
