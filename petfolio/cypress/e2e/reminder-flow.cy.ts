describe("Reminder Flow", () => {
  const testPetId = "12";
  const userEmail = "lotte.geeraerts@ucll.be";
  const userPassword = "welkom4321";
  beforeEach(() => {
    cy.login(userEmail, userPassword);
    cy.visit("/reminders", { timeout: 10000 });
    cy.url({ timeout: 5000 }).should("include", "/reminders");
    cy.wait(2000);
  });

  it("should complete a full reminder lifecycle", () => {
    // 1. Navigate to add reminder
    cy.contains("Reminders").should("be.visible");
    cy.get('[data-testid="add-reminder-button"]', { timeout: 10000 }).should(
      "exist"
    );
    cy.get('[data-testid="add-reminder-button"]').click();
    cy.url().should("include", "/addReminder");

    // 2. Fill in reminder form
    cy.get('input[placeholder="Reminder title"]').type("Feed the dog");
    cy.get('input[placeholder="Optional description"]').type(
      "Give dog food at 6 PM"
    );

    // 4. Submit form
    cy.get('[data-testid="save-reminder-button"]').click();
    cy.url().should("include", "/reminders");

    // 5. Verify reminder appears in list
    cy.contains("Feed the dog").should("exist");

    // 6. Delete reminder
    cy.contains('[data-testid="reminder-card"]', "Feed the dog")
      .find('[data-testid="delete-reminder-button"]')
      .click({ force: true });
    cy.wait(2000); // wait for alert to appear
    cy.contains("Feed the dog").should("not.exist");
  });

  it("should validate required reminder title", () => {
    cy.get('[data-testid="add-reminder-button"]').click();
    cy.get('[data-testid="save-reminder-button"]').click();
    cy.contains("Title is required").should("exist");
  });

  it("should display reminders in correct date/time format", () => {
    cy.contains("Feed Tasha").should("exist");
   cy.contains('[data-testid="reminder-card"]', "Feed Tasha")
  .find('div[data-testid="reminder-date"]') // or just the first child with date
  .first()
  .invoke('text')
  .should('match', /\d{1,2}\/\d{1,2}\/\d{4}/);
 });

 

});
