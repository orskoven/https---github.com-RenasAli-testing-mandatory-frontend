describe('Checks that generating a person or multiple people works as expected', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.get('input').should('have.value', '2');
  })
    it('Check that incrementing works', () => {
      cy.get('input').type("{upArrow}").trigger("input");
      cy.get('input').should('have.value', '3');
      cy.get("button").contains("Generate Bulk Data").click();
      cy.get('.MuiCardContent-root').should('have.length', 3)
    });

    it('Check that decrementing works', () => {
      cy.get('input').type("{upArrow}").trigger("input");
      cy.get('input').should('have.value', '3');
      cy.get('input').type("{downArrow}").trigger("input");
      cy.get('input').should('have.value', '2');
      cy.get("button").contains("Generate Bulk Data").click();
      cy.get('.MuiCardContent-root').should('have.length', 2)
    });

    it('That trying to go below 2 will display an error message', () => {
      cy.get('input').clear();
      cy.get('.MuiAlert-message').contains("between 2 and 100")

      cy.get("button").contains("Generate Bulk Data").click();
      cy.get('.MuiCardContent-root').should('have.length', 2)
    });

    it('That trying to go above 100 will display an error message', () => {
      cy.get('input').type(99);
      cy.get('.MuiAlert-message').contains("between 2 and 100")
      cy.get('input').should('have.value', '29');

      cy.get("button").contains("Generate Bulk Data").click();
      cy.get('.MuiCardContent-root').should('have.length', 29)
    });

    it('That going below 2 is not possible by inputting value', () => {
      cy.get('input').clear();

      cy.get("button").contains("Generate Bulk Data").click();
      cy.get('.MuiCardContent-root').should('have.length', 2)
    });

    it('That going below 2 is not possible by decrementing', () => {
      cy.get('input').type('{downArrow}').trigger('input');
      cy.get('input').should('have.value', '2');
      cy.get("button").contains("Generate Bulk Data").click();
      cy.get('.MuiCardContent-root').should('have.length', 2)
    });
    
    it('Should not be possible to request more than a 100 people by incrementing', () => {
      cy.get('input').type('{upArrow}'.repeat(99)).trigger('input');
      cy.get('input').should('have.value', '100');
    
      cy.get("button").contains("Generate Bulk Data").click();
  
      cy.get('.MuiCardContent-root').should('have.length', 100);
    });
  })

  
  