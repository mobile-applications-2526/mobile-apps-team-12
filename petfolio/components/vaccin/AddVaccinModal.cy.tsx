import React from 'react';
import AddVaccinModal from './AddVaccinModal';

beforeEach(() => {
    cy.viewport(500, 800);
});


describe('AddVaccinModal Component', () => {
    it('Should render the component when visable is set to true', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();

        cy.mount(
            <AddVaccinModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.contains('Add Vaccin').should('exist');
        cy.contains('Name').should('exist');
        cy.contains('Type').should('exist');
        cy.contains('Shot date').should('exist');
        cy.contains('Expire date').should('exist');
    });

    it('Should not render the component when visable is set to false', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();

        cy.mount(
            <AddVaccinModal visible={false} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.contains('Add Vaccin').should('not.exist');
    });

    it('Should submit the vaccin when add button is pressed', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub().as('onSubmitStub');

        cy.mount(
            <AddVaccinModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.get('input').eq(0).type('Rabies');
        cy.get('input').eq(1).type('A');

        cy.get('[data-testid="shotDate"]').within(() => {
            cy.contains('Change Date').click();
        });
        cy.get('[data-testid="expireDate"]').within(() => {
            cy.contains('Change Date').click();
        });

        cy.contains('Cancel').parent().parent().within(() => { cy.contains('Add').click(); });


        cy.get('@onSubmitStub').should('have.been.calledOnce');
        cy.get("@onSubmitStub").should("have.been.calledWithMatch",
            "Rabies",
            "A",
            Cypress.sinon.match.instanceOf(Date),
            Cypress.sinon.match.instanceOf(Date),
        );
    });

    it('Should cancel when cancel button is clicked', () => {
        const onClose = cy.stub().as('onCloseStub');
        const onSubmit = cy.stub();

        cy.mount(
            <AddVaccinModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.contains('Cancel').click();
        cy.get('@onCloseStub').should('have.been.called');
    });
});