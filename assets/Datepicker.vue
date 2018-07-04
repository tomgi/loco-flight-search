<template>
  <div class="field">
    <label class="label">Date</label>
    <div class="control">
      <input
        ref="dateInput"
        name="date"
        class="input"
        type="text"
        placeholder="When are you flying?">
    </div>
  </div>
</template>

<script>
import Pikaday from 'pikaday';
import 'moment';
import $ from 'jquery';

export default {
  data() {
    return { value: null };
  },
  mounted() {
    const pikaday = new Pikaday({
      field: $(this.$refs.dateInput)[0],
      onSelect: () => {
        this.value = pikaday.getMoment();
        this.$emit('select', this.value);
      },
    });
  },
};
</script>

