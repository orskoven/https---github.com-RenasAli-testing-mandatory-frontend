describe('Checks that generating a CPR works as expected', () => {
  it('Should generate a CPR', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Generate CPR').click();
    cy.get('.MuiCardContent-root')
      .find('.MuiTypography-root')
      .invoke('text')
      .then((text) => {
        const numbersOnly = text.replace(/\D/g, ''); // Remove all non-numeric characters
        expect(numbersOnly.length).to.equal(10);      // Assert that the length of the numeric part is 8
      });
  })
})
