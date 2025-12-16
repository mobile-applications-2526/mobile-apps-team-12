import React from 'react';
import VaccinationsTable from './VaccinationsTable';
import * as ExpoRouter from 'expo-router';
import { PetType } from '../../types';

describe('VaccinationsTable Component', () => {
    const mockVaccins = [
        { id: '1', name: 'Anti-wormen', type: 'A', shot_date: new Date('2012-12-12'), expire_date: new Date('2022-12-12') },
        { id: '2', name: 'Rabies', type: 'A', shot_date: new Date('2012-12-12'), expire_date: new Date('2022-12-12') },
        { id: '3', name: 'Anti-vlooien', type: 'B', shot_date: new Date('2012-12-12'), expire_date: new Date('2022-12-12') },
    ];

    const mockPet = { id: '1', name: 'Bengel', birthdate: new Date('2012-09-22'), description: 'Orange Cat with White spots', type: PetType.Cat, vaccins: [mockVaccins[0], mockVaccins[1], mockVaccins[2]] };
    const mockPetEmptyMed = { id: '1', name: 'Bengel', birthdate: new Date('2012-09-22'), description: 'Orange Cat with White spots', type: PetType.Cat, vaccins: [] };


    beforeEach(() => {
        cy.stub(ExpoRouter.router, 'navigate').as('navigate');
    });

    it('Shows vaccination table', () => {
        cy.mount(<VaccinationsTable petData={mockPet} />);

        cy.contains('Anti-wormen').should('be.visible');
        cy.contains('Rabies').should('be.visible');
        cy.contains('Anti-vlooien').should('be.visible');
    });

    it('Shows empty vaccination table', () => {
        cy.mount(<VaccinationsTable petData={mockPetEmptyMed} />);

        cy.contains('Anti-wormen').should('not.exist');
        cy.contains('rabies').should('not.exist');
        cy.contains('Anti-vlooien').should('not.exist');
    });

    it('navigates to vaccination specification when row is clicked', () => {
        cy.mount(<VaccinationsTable petData={mockPet} />);

        cy.contains('Anti-wormen').parent().click();
        cy.get('@navigate').should('have.been.calledWith', '/vaccination/1');
    });
});