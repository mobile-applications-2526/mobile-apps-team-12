import React from 'react';
import AddMedicationModal from './AddMedicationModal';

describe('AddMedicationModal Component', () => {
    it('Should render the component when visable is set to true', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();

        cy.mount(
            <AddMedicationModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.contains('Add Medication').should('exist');
        cy.contains('Name').should('exist');
        cy.contains('Description').should('exist');
        cy.contains('Quantity').should('exist');
    });

    it('Should not render the component when visable is set to false', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();

        cy.mount(
            <AddMedicationModal visible={false} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.contains('Add Medication').should('not.exist');
    });

    it('Should submit the medication when add button is pressed', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub().as('onSubmitStub');

        cy.mount(
            <AddMedicationModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.get('input').eq(0).type('Anti-Epilepsi');
        cy.get('input').eq(1).type('Medication that treats epilepsi');
        cy.get('input').eq(2).type('20');

        cy.contains('Cancel').parent().parent().within(() => {
            cy.contains('Add').click();
        });

        cy.get('@onSubmitStub').should('have.been.calledOnce');
        cy.get('@onSubmitStub').should('have.been.calledWith', 'Anti-Epilepsi', 'Medication that treats epilepsi', '20');
    });

    it('Should cancel when cancel button is clicked', () => {
        const onClose = cy.stub().as('onCloseStub');
        const onSubmit = cy.stub();

        cy.mount(
            <AddMedicationModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );

        cy.contains('Cancel').click();
        cy.get('@onCloseStub').should('have.been.called');
    });
});