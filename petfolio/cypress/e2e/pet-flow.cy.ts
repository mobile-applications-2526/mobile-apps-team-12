describe("Pet Overview Flow", () => {
    const userEmail = "testuser@ucll.be";
    const userPassword = "Test123";
    const petId = 32
    beforeEach(() => {
        cy.login(userEmail, userPassword);
        cy.visit("/homepage");
        cy.url({ timeout: 5000 }).should('include', '/homepage');
        cy.visit("/petOverview");
        cy.url({ timeout: 5000 }).should('include', '/petOverview');
        cy.wait(2000);
    })

    it("user can see his pets", () => {
        cy.contains("This is the pet Overview").should("be.visible");
        cy.contains("Tasha").should("be.visible");
        cy.contains("Max").should("be.visible");
    })
    it("user can see pet Max his details", () => {
        cy.get("[data-testid='pet-details-button']").eq(1).click();
        cy.url({ timeout: 5000 }).should('include', `/pet/${petId}`);
        cy.contains("Max").should("exist");
        cy.contains("Birthday").should("be.visible");
        cy.contains("2025-12-16");
        cy.contains("Current weight")
    .scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.contains("Food").scrollIntoView({ offset: { top: -100, left: 0 } }).should("be.visible");
    cy.contains("Medication").scrollIntoView({ offset: { top: -100, left: 0 } }).should("be.visible");
    cy.contains("Vaccinations").scrollIntoView({ offset: { top: -100, left: 0 } }).should("be.visible");
       
    })
  
})