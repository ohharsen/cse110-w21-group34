const background_1_path = "url(\"http://127.0.0.1:5500/images/background.png\")"
const background_2_path = "url(\"http://127.0.0.1:5500/images/background2.png\")"
const background_3_path = "url(\"http://127.0.0.1:5500/images/background3.png\")"

describe('Changing Backgrounds Tests', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
      cy.get('#stats-open-button').click();
    });

it('Clicking first background', () => {
    cy.get('#background_1').click({ force: true });
    expect(cy.get('html').should('have.css', 'background-image', background_1_path));

    cy.get('#background_1').should('not.be.visible')
    cy.get('#background_2').should('not.be.visible')
    cy.get('#background_3').should('not.be.visible')
});

it('Clicking second background', () => {
    cy.get('#background_2').click({ force: true });
    expect(cy.get('html').should('have.css', 'background-image', background_2_path));

    cy.get('#background_1').should('not.be.visible')
    cy.get('#background_2').should('not.be.visible')
    cy.get('#background_3').should('not.be.visible')
});

it('Clicking third background', () => {
    cy.get('#background_3').click({ force: true });
    expect(cy.get('html').should('have.css', 'background-image', background_3_path));

    cy.get('#background_1').should('not.be.visible')
    cy.get('#background_2').should('not.be.visible')
    cy.get('#background_3').should('not.be.visible')
});

it('Changing backgrounds multiple times ', () => {
    cy.get('#background_1').click({ force: true });
    expect(cy.get('html').should('have.css', 'background-image', background_1_path));
    cy.get('#background_2').click({ force: true });
    expect(cy.get('html').should('have.css', 'background-image', background_2_path))
    cy.get('#background_3').click({ force: true });
    expect(cy.get('html').should('have.css', 'background-image', background_3_path));

    cy.get('#background_1').should('not.be.visible')
    cy.get('#background_2').should('not.be.visible')
    cy.get('#background_3').should('not.be.visible')
});
});