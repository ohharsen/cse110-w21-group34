const background_1_path = 'url("http://127.0.0.1:5500/images/background.svg")';
const background_2_path = 'url("http://127.0.0.1:5500/images/background2.png")';
const background_3_path = 'url("http://127.0.0.1:5500/images/background3.png")';

describe("Changing Backgrounds and Language Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get("#stats-open-button").click();
  });
  //background
  it("Clicking first background", () => {
    cy.get("#background_1").click({ force: true });
    expect(
      cy.get("html").should("have.css", "background-image", background_1_path)
    );

    cy.get("#background_1").should("not.be.visible");
    cy.get("#background_2").should("not.be.visible");
    cy.get("#background_3").should("not.be.visible");
  });

  it("Clicking second background", () => {
    cy.get("#background_2").click({ force: true });
    expect(
      cy.get("html").should("have.css", "background-image", background_2_path)
    );

    cy.get("#background_1").should("not.be.visible");
    cy.get("#background_2").should("not.be.visible");
    cy.get("#background_3").should("not.be.visible");
  });

  it("Clicking third background", () => {
    cy.get("#background_3").click({ force: true });
    expect(
      cy.get("html").should("have.css", "background-image", background_3_path)
    );

    cy.get("#background_1").should("not.be.visible");
    cy.get("#background_2").should("not.be.visible");
    cy.get("#background_3").should("not.be.visible");
  });

  it("Changing backgrounds multiple times ", () => {
    cy.get("#background_1").click({ force: true });
    expect(
      cy.get("html").should("have.css", "background-image", background_1_path)
    );
    cy.get("#background_2").click({ force: true });
    expect(
      cy.get("html").should("have.css", "background-image", background_2_path)
    );
    cy.get("#background_3").click({ force: true });
    expect(
      cy.get("html").should("have.css", "background-image", background_3_path)
    );

    cy.get("#background_1").should("not.be.visible");
    cy.get("#background_2").should("not.be.visible");
    cy.get("#background_3").should("not.be.visible");
  });
  //languages
  it("Clicking first language", () => {
    cy.get("#languages_1").click({ force: true });

    cy.get("#pomobear-header").should('have.text', 'Pomobear');
    cy.get("#settings-header").should('have.text', 'Settings');
    cy.get("#stats-header").should('have.text', 'User Statistics');
  });

  it("Clicking second language", () => {
    cy.get("#languages_2").click({ force: true });
    
    cy.get("#pomobear-header").should('have.text', '뽀모곰');
    cy.get("#settings-header").should('have.text', '설정');
    cy.get("#stats-header").should('have.text', '사용자 통계');
  });

  it("Clicking third language", () => {
    cy.get("#languages_3").click({ force: true });

    cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
    cy.get("#settings-header").should('have.text', 'Configuración');
    cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  });

  it("Changing language multiple times ", () => {
    cy.get("#languages_1").click({ force: true });
    cy.get("#languageDropDownText").should('have.text', 'Change Language');

    cy.get("#languages_3").click({ force: true });
    cy.get("#languageDropDownText").should('have.text', 'Cambiar idioma');

    cy.get("#languages_2").click({ force: true });
    cy.get("#languageDropDownText").should('have.text', '언어 변경');
  });
});
