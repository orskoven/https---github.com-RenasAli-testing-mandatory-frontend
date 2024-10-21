describe('Checks that generating CPR, name and gender works as expected', () => {
    it('Should show the correct data', () => {
        cy.visit('http://localhost:5173')
        cy.contains('Generate CPR, Name & Gender').click();

        cy.get('.MuiCardContent-root').then((cardElement) => {
            cy.wrap(cardElement)
            .find('h5')
            .should('not.be.empty')
            
            cy.validateGender(cardElement);

            cy.wrap(cardElement)
            .find('.MuiTypography-root')
            .invoke('text')
            .then((text) => {
            const numbersOnly = text.replace(/\D/g, '');
            expect(numbersOnly.length).to.equal(10);     
            });
    })
  })
})
  