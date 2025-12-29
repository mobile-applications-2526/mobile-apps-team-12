import React from 'react';
import VaccinSpecification from './VaccinSpecification';
import * as ExpoRouter from 'expo-router';
import VaccinationService from '../../services/VaccinationService';

describe('VaccinSpecification Component', () => {

    const mockData = { id: '1', name: 'Anti-wormen', type: 'A', shot_date: new Date('2012-12-12'), expire_date: new Date('2022-12-12') };

    beforeEach(() => {
        cy.stub(VaccinationService, 'updateVaccin').resolves({});
        cy.stub(VaccinationService, 'deleteVaccin').resolves({});
        cy.stub(ExpoRouter.router, 'back').as('routerBack');
    });

    it('Shows vaccin data in table', () => {
        cy.mount(<VaccinSpecification vacData={mockData} />);

        cy.contains('Anti-wormen').should('be.visible');
        cy.contains('A').should('be.visible');
        cy.contains('12-12-2012').should('be.visible');
        cy.contains('12-12-2022').should('be.visible');
    });

    it('Shows edit type when type is clicked', () => {
        cy.mount(<VaccinSpecification vacData={mockData} />);

        cy.get('[data-testid="type-row"]').click();
        cy.contains('Edit Type').should('be.visible');
    });

    it('Type is updated when save button is pressed', () => {
        cy.mount(<VaccinSpecification vacData={mockData} />);

        cy.get('[data-testid="type-row"]').click();
        cy.get('input').first().clear().type('B');
        cy.contains('Save').click();

        cy.wrap(VaccinationService.updateVaccin).should('have.been.calledWith', '1', { type: 'B' });
    });

    it('Shows delete vaccin modal and deletes vaccin', () => {
        cy.mount(<VaccinSpecification vacData={mockData} />);

        cy.contains('Delete Vaccin').click();

        cy.contains('Are you sure you want to delete Anti-wormen?').should('be.visible');

        cy.contains('Cancel').parent().parent().within(() => {
            cy.contains('Delete').click();
        });

        cy.wrap(VaccinationService.deleteVaccin).should('have.been.calledWith', '1');
        cy.get('@routerBack').should('have.been.called');
    });

    it('Edit Vaccin modal should be closed when cancel is pressed', () => {
        cy.mount(<VaccinSpecification vacData={mockData} />);

        cy.contains('Type').parent().click();
        cy.contains('Cancel').click();
        cy.contains('Edit Type').should('not.exist');
    });

    it('Delete vaccin modal should be closed when cancel is pressed', () => {
        cy.mount(<VaccinSpecification vacData={mockData} />);

        cy.contains('Delete Vaccin').click();
        cy.contains('Are you sure').should('be.visible');

        cy.contains('Cancel').click();
        cy.contains('Are you sure').should('not.exist');

        cy.wrap(VaccinationService.deleteVaccin).should('not.have.been.called');
    });
});