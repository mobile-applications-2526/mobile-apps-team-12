describe("Medication e2e flow", () => {
    const petId = '10';
    const email = 'nina.deweerd@student.ucll.be';
    const password = 'welkom123';

    beforeEach(() => {
        cy.login(email, password);
        cy.visit(`/pet/medications/${petId}`);
        cy.url({ timeout: 5000 }).should('include', '/pet/medications/');
        cy.wait(2000);
    });

    after(() => {
        cy.login(email, password);
        cy.visit(`/pet/medications/${petId}`);
        cy.wait(2000);

        cy.get('body').then(($body) => {
            if ($body.text().includes('Anti-Epilepsi')) {
                cy.contains('Anti-Epilepsi').click();
                cy.wait(1000);

                cy.contains('Delete Medication').click();
                cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');

                cy.contains('This action cannot be undone')
                    .parent()
                    .parent()
                    cy.get('[data-testid="delete-medication-button"]').click({force:true});
                cy.wait(2000);
            }
        });
    });


    it('A table of medications should be displayed', () => {
        cy.url().should('include', '/pet/medications/');
        cy.contains('Back to pet', { timeout: 10000 }).should('be.visible');
    });

    it('should open and close add medication modal', () => {
        cy.contains('Add new medication', { timeout: 10000 }).scrollIntoView().should('be.visible').click();
        cy.contains('Add Medication', { timeout: 5000 }).should('be.visible');

        cy.get('[data-testid="cancel-medication-button"]').click();
        cy.wait(1000);
    });

    it('Can add new medication', () => {
        cy.contains('Add new medication', { timeout: 10000 }).scrollIntoView().click();
        cy.contains('Add Medication', { timeout: 5000 }).should('be.visible');

        cy.get('input').eq(0).type('Anti-Epilepsi');
        cy.get('input').eq(1).type('Medication that treats epilepsi');
        cy.get('input').eq(2).type('10');

        cy.get('[data-testid="add-medication-button"]').click();

        cy.wait(5000);
        cy.reload();
        cy.wait(2000);

        cy.contains('Anti-Epilepsi', { timeout: 10000 }).should('be.visible');
        cy.contains('Medication that treats epilepsi').should('be.visible');
    });

    it('Should redirect to the medications detail page when clicked on a medication', () => {
        cy.wait(2000);

        cy.get('body').then(() => {

            cy.get('div').contains('›').first().parent().click();

            cy.url({ timeout: 10000 }).should('include', '/medication/');
            cy.contains('Delete Medication').should('be.visible');
        });
    });
    it('Deleted medication', () => {
    cy.contains('Anti-Epilepsi', { timeout: 10000 }).click();

    cy.url().should('include', '/medication/');

    cy.contains('Delete Medication').click();

    cy.contains('Are you sure').should('be.visible');
    cy.contains('This action cannot be undone').should('be.visible');

    cy.get('[data-testid="delete-medication-button"]').click();

    cy.url({ timeout: 10000 }).should('include', '/pet/medications/');

    cy.contains('Anti-Epilepsi').should('not.exist');
    });

})