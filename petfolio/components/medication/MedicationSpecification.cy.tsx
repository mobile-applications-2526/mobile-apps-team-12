import React from 'react';
import MedicationSpecification from './MedicationSpecification';
import * as ExpoRouter from 'expo-router';
import MedicationService from '../../services/MedicationService';

describe('MedicationSpecification Component', () => {
    const mockData = {
        id: '1',
        name: 'Anti-Epilepsi',
        description: 'Medication that treats epilepsi',
        quantity: '20',
    };

    beforeEach(() => {
        cy.stub(MedicationService, 'updateMedication').resolves({});
        cy.stub(MedicationService, 'deleteMedication').resolves({});
        cy.stub(ExpoRouter.router, 'back').as('routerBack');
    });

    it('Shows medication data in table', () => {
        cy.mount(<MedicationSpecification medicationData={mockData} />);

        cy.contains('Anti-Epilepsi').should('be.visible');
        cy.contains('Medication that treats epilepsi').should('be.visible');
        cy.contains('20').should('be.visible');
    });

    it('Shows edit quantity when amount is clicked', () => {
        cy.mount(<MedicationSpecification medicationData={mockData} />);

        cy.contains('Amount').parent().click();
        cy.contains('Edit Amount').should('be.visible');
    });

    it('Quantity is updated when save button is pressed', () => {
        cy.mount(<MedicationSpecification medicationData={mockData} />);

        cy.contains('Amount').parent().click();
        cy.get('input').first().clear().type('15');
        cy.contains('Save').click();

        cy.wrap(MedicationService.updateMedication).should('have.been.calledWith', '1', { quantity: '15' });
    });

    it('Shows delete medication modal and deletes medication', () => {
        cy.mount(<MedicationSpecification medicationData={mockData} />);

        cy.contains('Delete Medication').click();

        cy.contains('Are you sure you want to delete Anti-Epilepsi?').should('be.visible');

        cy.contains('Cancel').parent().parent().within(() => {
            cy.contains('Delete').click();
        });

        cy.wrap(MedicationService.deleteMedication).should('have.been.calledWith', '1');
        cy.get('@routerBack').should('have.been.called');
    });

    it('Edit Medication modal should be closed when cancel is pressed', () => {
        cy.mount(<MedicationSpecification medicationData={mockData} />);

        cy.contains('Amount').parent().click();
        cy.contains('Cancel').click();
        cy.contains('Edit Amount').should('not.exist');
    });

    it('Delete medication modal should be closed when cancel is pressed', () => {
        cy.mount(<MedicationSpecification medicationData={mockData} />);

        cy.contains('Delete Medication').click();
        cy.contains('Are you sure').should('be.visible');

        cy.contains('Cancel').click();
        cy.contains('Are you sure').should('not.exist');

        cy.wrap(MedicationService.deleteMedication).should('not.have.been.called');
    });
});