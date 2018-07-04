import React from 'react';
import FlightSearchComponent from './FlightSearchComponent';

export default function App() {
  return (
    <div id="app">
      <section className="section">
        <div className="container">
          <h1 className="title">
          Loco Flight Finder
          </h1>

          <div className="columns">
            <div className="column">
              <h2 className="subtitle">
                Fly there
              </h2>
              <FlightSearchComponent id="flight-search-there" />
            </div>
            <div className="column">
              <h2 className="subtitle">
                And back
              </h2>
              <FlightSearchComponent id="flight-search-back" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
