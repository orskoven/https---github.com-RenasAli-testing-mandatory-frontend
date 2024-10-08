describe('GeneratePerson Component Tests', () => {
    const baseUrl = 'http://localhost:5174/generate'; // Update if your app uses a different port
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    it('Should load the main page successfully', () => {
      cy.contains('Generate Fake Person Data').should('be.visible');
    });
  
    it('Should display and interact with field checkboxes', () => {
      const fields = [
        { label: 'CPR', value: 'cpr' },
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Date of Birth', value: 'date_of_birth' },
        { label: 'Address', value: 'address' },
        { label: 'Mobile Phone Number', value: 'phone_number' },
      ];
  
      fields.forEach((field) => {
        cy.contains(field.label)
          .parent()
          .find('input[type="checkbox"]')
          .as('checkbox');
  
        cy.get('@checkbox').should('exist').check().should('be.checked');
        cy.get('@checkbox').uncheck().should('not.be.checked');
      });
    });
  
    it('Should generate single person data with selected fields', () => {
      // Select fields
      cy.get('input[value="first_name"]').check();
      cy.get('input[value="last_name"]').check();
      cy.get('input[value="gender"]').check();
  
      // Click the generate button
      cy.contains('Generate Single Person').click();
  
      // Verify loading indicator
      cy.contains('Generate Single Person')
        .parent()
        .find('.MuiCircularProgress-root')
        .should('exist');
  
      // Wait for data to load
      cy.get('.MuiCard-root', { timeout: 10000 }).should('be.visible');
  
      // Verify displayed data
      cy.get('.MuiCardContent-root').within(() => {
        cy.get('h5').should('contain.text', /.+/); // Non-empty name
        cy.contains('Gender:').should('exist');
      });
    });
  
    it('Should generate bulk person data with specified count', () => {
      // Set number of persons
      cy.get('input[type="number"]').clear().type('5');
  
      // Click the generate bulk data button
      cy.contains('Generate Bulk Data').click();
  
      // Verify loading indicator
      cy.contains('Generate Bulk Data')
        .parent()
        .find('.MuiCircularProgress-root')
        .should('exist');
  
      // Wait for data to load
      cy.get('.person-tile', { timeout: 10000 }).should('have.length', 5);
    });
  
    it('Should display error message on failed single person data fetch', () => {
      // Simulate network error
      cy.intercept('GET', '**/api/person?fields=*', { forceNetworkError: true }).as('getPerson');
  
      // Click the generate button
      cy.contains('Generate Single Person').click();
  
      // Wait for the request to complete
      cy.wait('@getPerson');
  
      // Verify error message
      cy.contains('Failed to fetch person data').should('be.visible');
    });
  
    it('Should display error message on failed bulk data fetch', () => {
      // Simulate network error
      cy.intercept('GET', '**/api/persons/*', { forceNetworkError: true }).as('getPersons');
  
      // Click the generate bulk data button
      cy.contains('Generate Bulk Data').click();
  
      // Wait for the request to complete
      cy.wait('@getPersons');
  
      // Verify error message
      cy.contains('Failed to fetch bulk data').should('be.visible');
    });
  
    it('Should handle invalid bulk count input gracefully', () => {
      // Enter an invalid number
      cy.get('input[type="number"]').clear().type('101');
  
      // Click the generate bulk data button
      cy.contains('Generate Bulk Data').click();
  
      // Verify that no data is displayed
      cy.get('.person-tile').should('not.exist');
  
      // Optionally, verify that an error or validation message is shown
      // This depends on how your app handles invalid inputs
    });
  });
  