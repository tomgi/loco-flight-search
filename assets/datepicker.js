import $ from 'jquery';
import Pikaday from 'pikaday';
import 'moment';

class Datepicker {
  constructor(datepickerInput) {
    const pikaday = new Pikaday({
      field: $(datepickerInput)[0],
      onSelect: () => { this.value = pikaday.getMoment(); },
    });
  }
}

export { Datepicker as default };
