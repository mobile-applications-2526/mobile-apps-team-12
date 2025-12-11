import React from 'react';
import MedicationsTable from './MedicationsTable';
import * as ExpoRouter from 'expo-router';
import { PetType } from '../../types';

describe('MedicationsTable Component', () => {
    const mockMedication = [
        { id: '1', name: 'Anti-Epilepsi', description: 'Medication that treats epilepsi', quantity: '20' },
        { id: '2', name: 'Antibiotica', description: 'Helps fight bacterial infection', quantity: '35' },
        { id: '3', name: 'Pain killers', description: 'Helps against pain', quantity: '6' }
    ];

    const mockPet = { id: '1', name: 'Bengel', birthdate: new Date('2012-09-22'), description: 'Orange Cat with White spots', type: PetType.Cat, medication: [mockMedication[0], mockMedication[1], mockMedication[2]] };
    const mockPetEmptyMed = { id: '1', name: 'Bengel', birthdate: new Date('2012-09-22'), description: 'Orange Cat with White spots', type: PetType.Cat, medication: [] };


    beforeEach(() => {
        cy.stub(ExpoRouter.router, 'navigate').as('navigate');
    });

    it('Shows medication table', () => {
        cy.mount(<MedicationsTable petData={mockPet} />);

        cy.contains('Anti-Epilepsi').should('be.visible');
        cy.contains('Antibiotica').should('be.visible');
        cy.contains('Pain killers').should('be.visible');
    });

    it('Shows empty medication table', () => {
        cy.mount(<MedicationsTable petData={mockPetEmptyMed} />);

        cy.contains('Anti-Epilepsi').should('not.exist');
        cy.contains('Antibiotica').should('not.exist');
        cy.contains('Pain killers').should('not.exist');
    });

    it('navigates to medication specification when row is clicked', () => {
        cy.mount(<MedicationsTable petData={mockPet} />);

        cy.contains('Anti-Epilepsi').parent().click();
        cy.get('@navigate').should('have.been.calledWith', '/medication/1');
    });
});