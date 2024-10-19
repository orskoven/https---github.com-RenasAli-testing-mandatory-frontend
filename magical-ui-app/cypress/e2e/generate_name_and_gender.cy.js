describe('Checks that generating name and gender works as expected', () => {
    it('Check that both elements contain some text', () => {
      cy.visit('http://localhost:5173')
      cy.contains('Generate Name & Gender').click();
      cy.get('.MuiCardContent-root')
        .find('h5')
        .should('not.be.empty')
        .siblings('p')
        .should('not.be.empty');
    })
  })
  