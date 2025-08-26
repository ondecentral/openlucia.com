/// <reference types="cypress" />

describe("User visit", () => {
  // beforeEach(() => {
  //     cy.visit('http://localhost:3000');
  // });

  it("fingerprint successfully", () => {
    cy.visit("http://localhost:3000");
    cy.visit("http://localhost:3000");
    cy.get("h1");
    cy.contains("Web3 Attribution");
  });
});
