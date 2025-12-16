describe("Vaccin e2e flow", () => {
    const petId = '10';
    const email = 'nina.deweerd@student.ucll.be';
    const password = 'welkom123';

    beforeEach(() => {
        cy.login(email, password);
        cy.visit(`/pet/vaccinations/${petId}`);
        cy.url({ timeout: 5000 }).should('include', '/pet/vaccinations/');
        cy.wait(2000);
    });

    after(() => {
        cy.login(email, password);
        cy.visit(`/pet/vaccinations/${petId}`);
        cy.wait(2000);

        cy.get('body').then(($body) => {
            if ($body.text().includes('Anti-wormen')) {
                cy.contains('Anti-wormen').click();
                cy.wait(1000);

                cy.contains('Delete Vaccin').click();
                cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');

                cy.contains('This action cannot be undone')
                    .parent()
                    .parent()
                    .contains('Delete')
                    .click({ force: true });

                cy.wait(2000);
            }
        });
    });
})