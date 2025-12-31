describe("Pet Overview Flow", () => {
    const userEmail = "testuser@ucll.be";
    const userPassword = "Test123";
    const petId = 41;
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
        cy.contains("Snowy").should("be.visible");
        cy.contains("Tasha").should("be.visible");
    })
    it("user can see pet Snowy his details", () => {
        cy.get("[data-testid='pet-details-button']").eq(0).click();
        cy.url({ timeout: 5000 }).should('include', `/pet/${petId}`);
        cy.contains("Snowy").should("exist");
        cy.contains("Birthday").should("be.visible");
        cy.contains("Current weight").scrollIntoView({ offset: { top: -100, left: 0 } });
        cy.contains("Food").scrollIntoView({ offset: { top: -100, left: 0 } }).should("be.visible");
        cy.contains("Medication").scrollIntoView({ offset: { top: -100, left: 0 } }).should("be.visible");
        cy.contains("Vaccinations").scrollIntoView({ offset: { top: -100, left: 0 } }).should("be.visible");
       
    })
    it("user can delete pet", () => {
        // Mock the delete request
        cy.intercept('DELETE', '**/rest/v1/pets?id=eq.*', {
        statusCode: 204,
        body: null
        }).as('deletePetAndExtras');
        cy.get("[data-testid='pet-details-button']").eq(0).click();
        cy.url({ timeout: 5000 }).should('include', `/pet/${petId}`);
        cy.contains("Snowy").should("exist");
        cy.contains("Delete Pet").scrollIntoView({ offset: { top: -100, left: 0 } }).click();

        cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');
        cy.contains('This action cannot be undone').should('be.visible');
        
        cy.get('[data-testid="delete-pet-button"]').click();
        cy.wait('@deletePetAndExtras').then((interception) => {
        cy.log('Intercepted request:', interception.request.url);
            expect(interception.request.method).to.equal('DELETE');
            expect(interception.response.statusCode).to.equal(204);
        });
    })
  
})