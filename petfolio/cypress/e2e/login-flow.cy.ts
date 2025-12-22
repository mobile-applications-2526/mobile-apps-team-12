describe("Login User Flow", () => {
    const userEmail = "testuser@ucll.be";
    const userPassword = "Test123";

    beforeEach(() => {
        cy.visit("/");
    })

    it("log user in with valid credentials", () => {
        cy.get('[data-testid="login-button"]').click();
        cy.url({ timeout: 10000 }).should('include', '/login');
        cy.contains("Email*").should("be.visible");
        cy.contains("Password*").should("be.visible");
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(3)').type(`${userEmail}`);
        cy.get('[type="password"]').type(`${userPassword}`);
        cy.contains("login").click();
        cy.url({ timeout: 10000 }).should('include', '/homepage');
    })

    it("log user in with invalid credentials", () => {
        cy.get('[data-testid="login-button"]').click();
        cy.url({ timeout: 10000 }).should('include', '/login');
        cy.contains("Email*").should("be.visible");
        cy.contains("Password*").should("be.visible");
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(3)').type(`wrong.email@example.com`);
        cy.get('[type="password"]').type(`wrongPassword123`);
        cy.contains("login").click();
        cy.wait(5000);
        cy.contains("Invalid login credentials").should("be.visible");
        cy.url().should("include", "/login");
    })
    it("log user in without any credentials", () => {
        cy.get('[data-testid="login-button"]').click();
        cy.url({ timeout: 10000 }).should('include', '/login');
        cy.contains("Email*").should("be.visible");
        cy.contains("Password*").should("be.visible");
        cy.contains("login").click();
        cy.contains("This field is required").should("be.visible");
    })
})