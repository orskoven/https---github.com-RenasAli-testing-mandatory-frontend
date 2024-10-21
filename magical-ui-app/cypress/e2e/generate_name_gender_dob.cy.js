describe('Checks that generating name, gender, and date of birth works as expected', () => {
  it('Checks that all expected data is present', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Generate Name, Gender & DOB').click();

    cy.get('.MuiCardContent-root').then((cardElement) => {
      cy.wrap(cardElement)
        .find('h5').should('not.be.empty');
      cy.validateDoB(cardElement);
      cy.validateGender(cardElement);
    });
  });
});
