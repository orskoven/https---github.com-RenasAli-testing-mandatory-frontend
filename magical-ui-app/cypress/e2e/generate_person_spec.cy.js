// File: cypress/integration/generate_person.spec.js

describe('GeneratePerson Component Tests with Fixtures', () => {
  let cprData;
  let personData;
  let personsData;

  beforeEach(() => {
    // Load fixtures
    cy.fixture('cpr').then((data) => {
      cprData = data;
    });
    cy.fixture('person').then((data) => {
      personData = data;
    });
    cy.fixture('persons').then((data) => {
      personsData = data;
    });

    // Intercept API requests and respond with fixtures
    cy.intercept('GET', '**/api/cpr', (req) => {
      req.reply({
        statusCode: 200,
        body: cprData,
      });
    }).as('getCPR');

    cy.intercept('GET', '**/api/person', (req) => {
      req.reply({
        statusCode: 200,
        body: personData,
      });
    }).as('getPerson');

    cy.intercept('GET', '**/api/persons/*', (req) => {
      req.reply({
        statusCode: 200,
        body: personsData,
      });
    }).as('getPersons');

    cy.visit('/');
  });

  it('should display CPR from /cpr endpoint', () => {
    // Click 'Generate CPR' button
    cy.contains('Generate CPR').click();

    // Wait for API response
    cy.wait('@getCPR');

    // Verify that the CPR is displayed correctly
    cy.contains(`CPR: ${cprData.CPR}`).should('exist');
  });

  it('should display person data from /person endpoint', () => {
    // Deselect all fields and select desired fields
    cy.get('input[type="checkbox"]').uncheck();
    ['CPR', 'First Name', 'Last Name', 'Gender', 'Date of Birth', 'Address', 'Mobile Phone Number'].forEach((field) => {
      cy.contains(field)
        .parent()
        .find('input')
        .check();
    });

    // Click 'Generate Single Person' button
    cy.contains('Generate Single Person').click();

    // Wait for API response
    cy.wait('@getPerson');

    // Verify that the data is displayed correctly
    cy.contains(`${personData.firstName} ${personData.lastName}`).should('exist');
    cy.contains(`Gender: ${personData.gender}`).should('exist');
    cy.contains(`Date of Birth: ${new Date(personData.birthDate).toLocaleDateString()}`).should('exist');
    cy.contains(`CPR: ${personData.CPR}`).should('exist');
    cy.contains(`Address: ${personData.address.street} ${personData.address.number}, Floor ${personData.address.floor}, Door ${personData.address.door}`).should('exist');
    cy.contains(`${personData.address.postal_code} ${personData.address.town_name}`).should('exist');
    cy.contains(`Phone: ${personData.phoneNumber}`).should('exist');
  });

  it('should display multiple persons from /persons endpoint', () => {
    // Set bulk count to 3
    cy.get('input[type="number"]').clear().type('3');

    // Deselect all fields and select desired fields
    cy.get('input[type="checkbox"]').uncheck();
    ['CPR', 'First Name', 'Last Name', 'Gender', 'Date of Birth', 'Address', 'Mobile Phone Number'].forEach((field) => {
      cy.contains(field)
        .parent()
        .find('input')
        .check();
    });

    // Click 'Generate Bulk Data' button
    cy.contains('Generate Bulk Data').click();

    // Wait for API response
    cy.wait('@getPersons');

    // Verify that 3 person tiles are displayed
    cy.get('.person-tile').should('have.length', 3);

    // Verify the content of each person tile
    cy.get('.person-tile').each(($tile, index) => {
      const person = personsData[index];
      cy.wrap($tile).contains(`${person.firstName} ${person.lastName}`).should('exist');
      cy.wrap($tile).contains(`Gender: ${person.gender}`).should('exist');
      cy.wrap($tile).contains(`Date of Birth: ${new Date(person.birthDate).toLocaleDateString()}`).should('exist');
      cy.wrap($tile).contains(`CPR: ${person.CPR}`).should('exist');
      cy.wrap($tile).contains(`Address: ${person.address.street} ${person.address.number}, Floor ${person.address.floor}, Door ${person.address.door}`).should('exist');
      cy.wrap($tile).contains(`${person.address.postal_code} ${person.address.town_name}`).should('exist');
      cy.wrap($tile).contains(`Phone: ${person.phoneNumber}`).should('exist');
    });
  });
});