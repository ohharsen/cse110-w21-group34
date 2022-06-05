const background_1_path = 'url("http://127.0.0.1:5500/images/background.svg")';
const background_2_path = 'url("http://127.0.0.1:5500/images/background2.svg")';
const background_3_path = 'url("http://127.0.0.1:5500/images/background3.svg")';

describe("Changing Backgrounds and Language Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get("#settings-open-button").click();
  });
  //background
  it("Clicking first background", () => {
    // Default background on load 
    expect(
      cy.get("html").should("have.css", "background-image", background_1_path)
    );

    cy.get('select').eq(0).select('original');
    expect(
      cy.get("html").should("have.css", "background-image", background_1_path)
    );

  });

  it("Clicking second background", () => {

    cy.get('select').eq(0).select('desert');
    expect(
      cy.get("html").should("have.css", "background-image", background_2_path)
    );
  });

  it("Clicking third background", () => {
    cy.get('select').eq(0).select('lake');
    expect(
      cy.get("html").should("have.css", "background-image", background_3_path)
    );
  });

  it("Changing backgrounds multiple times ", () => {
    cy.get('select').eq(0).select('original');
    expect(
      cy.get("html").should("have.css", "background-image", background_1_path)
    );
    cy.get('select').eq(0).select('desert');
    expect(
      cy.get("html").should("have.css", "background-image", background_2_path)
    );
    cy.get('select').eq(0).select('lake');
    expect(
      cy.get("html").should("have.css", "background-image", background_3_path)
    );

  });
});
