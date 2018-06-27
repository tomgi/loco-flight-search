import moment from 'moment';

module.exports = {
  behavesLikeAFlightSearchComponent(componentRoot) {
    beforeEach(() => {
      cy.server({ force404: true });
      cy.route('airports/Sydney', 'fixture:locomote_service/Sydney_airports.json');
      cy.route('airports/JFK', 'fixture:locomote_service/JFK_airports.json');
      cy.route('search/SYD/JFK/*', 'fixture:locomote_service/SYD_JFK_flights.json');
      cy.visit('/');
    });

    const submitSearchForm = (date) => {
      cy.get('input[name=airport-from]').type('Sydney');
      cy.contains('Kingsford Smith').click();
      cy.get('input[name=airport-to]').type('JFK');
      cy.contains('John F Kennedy Intl').click();

      cy.get('input[name=date]').type(date);
      cy.root().click(); // to hide the datepicker
      cy.get('button[name=submit]').click();
    };

    it('Searches flights after submitting the form', () => {
      cy.get(componentRoot).within(() => {
        const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
        submitSearchForm(tomorrow);
        cy.contains('China Eastern');
        cy.contains('A$5,514.67');
      });
    });

    it('Validates that required fields are present', () => {
      cy.get(componentRoot).within(() => {
        cy.get('button[name=submit]').click();
        cy.contains('Please fill all the fields above');
      });
    });

    it('Validates that selected date is not in the past', () => {
      cy.get(componentRoot).within(() => {
        const yesterday = moment().add(-1, 'day').format('YYYY-MM-DD');
        submitSearchForm(yesterday);
        cy.contains('Selected date is in the past');
      });
    });
  },
};
