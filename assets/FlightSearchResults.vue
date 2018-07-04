<template>
  <div class="section">
    <table
      v-if="flights.state === 'completed'"
      class="table">
      <thead>
        <tr>
          <th>Airline</th>
          <th>Departure date</th>
          <th>Arrival date</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="flight in flights.data"
          :key="flight.key">
          <td>
            {{ flight.airline.name }}
          </td>
          <td>
            {{ flight.start.dateTime }}
          </td>
          <td>
            {{ flight.finish.dateTime }}
          </td>
          <td>
            <a class="button is-success">
              {{ (flight.price).toLocaleString("en-US", {style: 'currency', currency: "AUD"}) }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <i
      v-if="flights.state === 'pending'"
      class="fas fa-spinner fa-spin fa-3x"/>

    <div
      v-if="flights.state === 'failed'"
      class="notification is-danger">{{ flights.error }}</div>

  </div>
</template>

<script>
export default {
  props: {
    flights: {
      type: Object,
      required: true,
    },
  },
};
</script>

