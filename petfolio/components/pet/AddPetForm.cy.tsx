import React from "react";
import AddPetForm from "./AddPetForm";
import PetService from "../../services/PetService";

describe("AddPetForm Component", () => {
  beforeEach(() => {
  cy.stub(PetService, "addPet").resolves({
    id: 1,
    name: "Max",
  });

    cy.mount(<AddPetForm />);
  });

  it("should render the form with all fields", () => {
    cy.contains("Register Pet").should("be.visible");
    cy.contains("Name:").should("be.visible");
    cy.contains("Birthdate:").should("be.visible");
    cy.contains("Description:").should("be.visible");
    cy.contains("Type:").should("be.visible");
  });

  it("should allow entering pet name", () => {
    cy.get('input[placeholder="Enter your pet\'s name"]')
      .type("Fluffy")
      .should("have.value", "Fluffy");
  });

  it("should allow entering pet description", () => {
    cy.get('input[placeholder="Enter a description"]')
      .type("Very friendly")
      .should("have.value", "Very friendly");
  });

  it("should open date picker when calendar icon is clicked", () => {
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="date-picker"]').should("be.visible");
  });

  it("should open pet type dropdown when select box is clicked", () => {
    cy.contains("Select pet type").parent().click();
    cy.get('[data-testid="pet-type-picker"]').should("be.visible");
  });

  it("should select a pet type from dropdown", () => {
    cy.contains("Select pet type").parent().click();
    cy.contains("Dog").click();
    cy.contains("Dog").should("be.visible");
  });

  it("should submit form with valid data", () => {
    cy.get('input[placeholder="Enter your pet\'s name"]').type("Max");
    cy.get('input[placeholder="Enter a description"]').type("Energetic dog");
    cy.get('[data-testid="date-picker-button"]').click();
    cy.get('[data-testid="set-test-date"]').click({ force: true });
    cy.contains("Select pet type").parent().click();
    cy.contains("Dog").click();
    cy.get('[data-testid="save-pet-button"]').click();
    cy.contains("Pet added succesfully!", { timeout: 10000 }).should(
      "be.visible"
    );
  });

  it("should display success message on successful submission", () => {
    cy.intercept("POST", "**/pets", { statusCode: 201, body: { id: 1 } });
    cy.get('input[placeholder="Enter your pet\'s name"]').type("Bella");
    cy.get('input[placeholder="Enter a description"]').type("Calm cat");
    cy.contains("Select pet type").parent().click();
    cy.contains("Cat").click();
    cy.contains("Add").click();
    cy.contains("Pet added succesfully!").should("be.visible");
  });
});
