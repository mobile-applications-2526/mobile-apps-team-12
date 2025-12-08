import React from 'react';
import FoodSpecification from './FoodSpecification';
import * as ExpoRouter from 'expo-router';
import FoodsService from '../services/FoodService';

describe('FoodSpecification Component', () => {
    const mockFood = {
      id: '1',
      name: 'Dog Food',
      description: 'Premium kibble',
      quantity: '2 cups',
    };

    beforeEach(() => {
      cy.stub(FoodsService, 'updateFood').resolves({});
      cy.stub(FoodsService, 'deleteFood').resolves({});
      cy.stub(ExpoRouter.router, 'back').as('routerBack');
    });

    it('renders food data correctly', () => {
      cy.mount(<FoodSpecification foodData={mockFood} />);
      
      cy.contains('Dog Food').should('be.visible');
      cy.contains('2 cups').should('be.visible');
      cy.contains('Premium kibble').should('be.visible');
    });

    it('opens amount modal when amount row is clicked', () => {
      cy.mount(<FoodSpecification foodData={mockFood} />);
      
      cy.contains('Amount').parent().click();
      cy.contains('Edit Amount').should('be.visible');
    });

    it('updates amount when save is pressed', () => {
      cy.mount(<FoodSpecification foodData={mockFood} />);
      
      cy.contains('Amount').parent().click();
      cy.get('input').first().clear().type('3 cups');
      cy.contains('Save').click();
      
      cy.wrap(FoodsService.updateFood).should('have.been.calledWith', '1', { quantity: '3 cups' });
    });

    it('opens delete modal and deletes food', () => {
      cy.mount(<FoodSpecification foodData={mockFood} />);
      
      cy.contains('Delete Food').click();
      
      cy.contains('Are you sure you want to delete Dog Food?').should('be.visible');
      
      cy.contains('Cancel').parent().parent().within(() => {
        cy.contains('Delete').click();
      });
      
      cy.wrap(FoodsService.deleteFood).should('have.been.calledWith', '1');
      cy.get('@routerBack').should('have.been.called');
    });

    it('closes modal when cancel is pressed', () => {
      cy.mount(<FoodSpecification foodData={mockFood} />);
      
      cy.contains('Amount').parent().click();
      cy.contains('Cancel').click();
      cy.contains('Edit Amount').should('not.exist');
    });

    it('closes delete modal when cancel is pressed', () => {
      cy.mount(<FoodSpecification foodData={mockFood} />);
      
      cy.contains('Delete Food').click();
      cy.contains('Are you sure').should('be.visible');
      
      cy.contains('Cancel').click();
      cy.contains('Are you sure').should('not.exist');
      
      cy.wrap(FoodsService.deleteFood).should('not.have.been.called');
    });
});