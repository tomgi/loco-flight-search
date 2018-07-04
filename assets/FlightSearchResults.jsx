import PropTypes from 'prop-types';
import React from 'react';

export default function FlightSearchResults({ flights }) {
  if (flights.state === 'completed') {
    return (
      <div className="section">
        <table className="table">
          <thead>
            <tr>
              <th>
                Airline
              </th>
              <th>
                Departure date
              </th>
              <th>
                Arrival date
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {flights.data.map(flight => (
              <tr key={flight.key}>
                <td>
                  { flight.airline.name }
                </td>
                <td>
                  { flight.start.dateTime }
                </td>
                <td>
                  { flight.finish.dateTime }
                </td>
                <td>
                  <button type="button" className="button is-success">
                    { (flight.price).toLocaleString('en-US', { style: 'currency', currency: 'AUD' }) }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }

  if (flights.state === 'pending') {
    return (
      <i className="fas fa-spinner fa-spin fa-3x" />
    );
  }

  if (flights.state === 'failed') {
    return (
      <div className="notification is-danger">
        { flights.error }

      </div>
    );
  }

  return (<div />);
}

FlightSearchResults.propTypes = {
  flights: PropTypes.shape({
    data: PropTypes.array,
    state: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};
