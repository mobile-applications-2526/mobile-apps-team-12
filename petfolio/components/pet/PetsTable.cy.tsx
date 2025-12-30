import React from 'react';
import PetsTable from './PetsTable';
import { Pet } from '../../types';

describe('PetsTable Component', () => {
    const mockPets: Pet[] = [
        {
            id: '1',
            name: 'Fluffy',
            birthdate: new Date('2020-01-15'),
            description: 'A cute cat',
        },
        {
            id: '2',
            name: 'Max',
            birthdate: new Date('2019-05-20'),
            description: 'A friendly dog',
        },
    ];

    beforeEach(() => {
        cy.mount(<PetsTable petData={mockPets} />);
    });

    it('should render pets subtitle', () => {
        cy.contains('Pets:').should('be.visible');
    });

    it('should render all pets in the list', () => {
        cy.contains('Fluffy').should('be.visible');
        cy.contains('Max').should('be.visible');
    });

    it('should display pet details', () => {
        cy.contains('A cute cat').should('be.visible');
        cy.contains('A friendly dog').should('be.visible');
    });

    it('should render add pet button', () => {
        cy.contains('Add pet').should('be.visible');
    });


    it('should render empty state when no pets provided', () => {
        cy.mount(<PetsTable petData={[]} />);
        cy.contains('Pets:').should('be.visible');
        cy.get('[testID="pet-details-button"]').should('not.exist');
    });
});