describe('Navigation Flow ', () => {
  const testPetId = '9';
  const userEmail = 'odemalfait@student.ucll.be';
  const userPassword = 'welkom321';

  beforeEach(() => {
    cy.login(userEmail, userPassword);
    cy.visit('/homepage');
    cy.url({ timeout: 10000 }).should('include', '/homepage');
  });

it('navigates through main pet pages and back', () => {
    cy.get('[data-testid="pet-overview-button"]').click();
    cy.url({ timeout: 10000 }).should('include', '/petOverview');

    cy.contains('This is the pet Overview', { timeout: 10000 }).should('be.visible');
    cy.get('[data-testid="pet-details-button"]').first().click();
    cy.url({ timeout: 10000 }).should('include', `/pet/${testPetId}`);

    // Make sure we scroll the ScrollView, then click the pressable
    cy.get('[data-testid="pet-scrollview"]').scrollTo('center', { ensureScrollable: false });

    cy.contains("Current weight")
    .scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.get('[data-testid="weight-arrow"]').click({ force: true });
    cy.url({ timeout: 10000 }).should('include', `/pet/weights/${testPetId}`);
    cy.get('[data-testid="back-button"]').click();
    cy.url({ timeout: 10000 }).should('include', `/pet/${testPetId}`);

    cy.contains("Food").scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.get('[data-testid="food-arrow"]').click({ force: true });
    cy.url({ timeout: 10000 }).should('include', `/pet/foods/${testPetId}`);
    cy.get('[data-testid="back-button"]').click();
    cy.url({ timeout: 10000 }).should('include', `/pet/${testPetId}`);

    cy.contains("Medication").scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.get('[data-testid="medication-arrow"]').click({ force: true });
    cy.url({ timeout: 10000 }).should('include', `/pet/medications/${testPetId}`);
    cy.get('[data-testid="back-button"]').click();
    cy.url({ timeout: 10000 }).should('include', `/pet/${testPetId}`);

    cy.contains("Vaccinations").scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.get('[data-testid="vaccin-arrow"]').click({ force: true });
    cy.url({ timeout: 10000 }).should('include', `/pet/vaccinations/${testPetId}`);
    cy.get('[data-testid="back-button"]').click();
    cy.url({ timeout: 10000 }).should('include', `/pet/${testPetId}`);

    cy.contains('Back to pets overview', { timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should('include', '/petOverview');
});

it("navigates to profile overview and back", () => {
       cy.get('[data-testid="profile-icon"]').click();
       cy.url({ timeout: 10000 }).should('include', `/profile`);
       cy.get('[data-testid="home-icon"]').first().click({force: true});
       cy.url({ timeout: 10000 }).should('include', `/homepage`);
})
it("navigates to calendar overview and back", () => {
       cy.get('[data-testid="calendar-icon"]').click();
       cy.url({ timeout: 10000 }).should('include', `/calendar`);
       cy.get('[data-testid="home-icon"]').first().click({force: true});
       cy.url({ timeout: 10000 }).should('include', `/homepage`);
})
it("press the logout icon", () => {
       cy.get('[data-testid="logout-icon"]').click();
       cy.url({ timeout: 10000 }).should('include', `/homepage`);
})
}
)