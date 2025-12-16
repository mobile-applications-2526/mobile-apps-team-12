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

    it('A table of vaccins should be displayed', () => {
        cy.url().should('include', '/pet/vaccinations/');
        cy.contains('Back to pet', { timeout: 10000 }).should('be.visible');
    });

    it('should open and close add vaccination modal', () => {
        cy.contains('Add new vaccin', { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.contains('Add Vaccin', { timeout: 5000 }).should('be.visible');

        cy.get('[data-testid="cancel-vaccin-button"]').click();
        cy.wait(1000);
    });

    it('Can add new vaccin', () => {
        cy.contains('Add new vaccin', { timeout: 10000 }).scrollIntoView().click();
        cy.contains('Add Vaccin', { timeout: 5000 }).should('be.visible');

        cy.get('input').eq(0).type('Rabies');
        cy.get('input').eq(1).type('A');

        cy.get('[data-testid="shot_date"]').click();
        cy.get('[data-testid="expire_date"]').click();

        cy.get('[data-testid="add-vaccin-button"]').click();

        cy.wait(5000);
        cy.reload();
        cy.wait(2000);

        cy.contains('Rabies', { timeout: 10000 }).should('be.visible');
        cy.contains('A').should('be.visible');
    });

    it('Should redirect to the vaccins detail page when clicked on a vaccin', () => {
        cy.wait(2000);

        cy.get('body').then(() => {

            cy.get('div').contains('›').first().parent().click();

            cy.url({ timeout: 10000 }).should('include', '/vaccination/');
            cy.contains('Delete Vaccin').should('be.visible');
        });
    });

    it('Deleted medication', () => {
        cy.wait(2000);

        cy.get('body').then(($body) => {
            if ($body.text().includes('Rabies')) {
                cy.contains('Rabies').click();

                cy.url({ timeout: 10000 }).should('include', '/vaccination/');

                cy.contains('Delete Vaccin').scrollIntoView().click();

                cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');
                cy.contains('This action cannot be undone').should('be.visible');

                cy.get('[data-testid="delete-vaccin-button"]').click();

                cy.wait(3000);
                cy.url({ timeout: 10000 }).should('include', '/pet/vaccinations/');

                cy.reload();
                cy.wait(2000);

                cy.get('body').should('not.contain', 'Rabies');
            }
        });
    });
})