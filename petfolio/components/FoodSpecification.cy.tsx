import React from 'react';
import FoodsService from '../services/FoodService';
import FoodSpecification from './FoodSpecification';

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
  });

  it('renders food data correctly', () => {
    cy.mount(<FoodSpecification foodData={mockFood} />);
    
    cy.contains('Dog Food').should('be.visible');
    cy.contains('2 cups').should('be.visible');
    cy.contains('Premium kibble').should('be.visible');
  });

  it('opens amount modal when amount row is clicked', () => {
    cy.mount(<FoodSpecification foodData={mockFood} />);
    
    cy.contains('Amount').click();
    cy.contains('Edit Amount').should('exist');
  });

  it('updates amount when save is pressed', () => {
    cy.mount(<FoodSpecification foodData={mockFood} />);
    
    cy.contains('Amount').click();
    cy.get('input').clear().type('3 cups');
    cy.contains('Save').click();
    
    cy.wrap(FoodsService.updateFood).should('have.been.calledWith', '1', { quantity: '3 cups' });
  });

  it('updates description on blur', () => {
    cy.mount(<FoodSpecification foodData={mockFood} />);
    
    cy.get('input').last()
      .clear()
      .type('Updated description')
      .blur();
    
    cy.wait(100); 
    cy.wrap(FoodsService.updateFood).should('have.been.calledWith', '1', { 
      description: 'Updated description' 
    });
  });

  it('opens delete modal and deletes food', () => {
    cy.mount(<FoodSpecification foodData={mockFood} />);
    
    cy.contains('Delete Food').click();
    cy.contains('Are you sure').should('exist');
    
    cy.contains('Cancel').parent().parent().within(() => {
      cy.contains('Delete').click();
    });
    
    cy.wrap(FoodsService.deleteFood).should('have.been.calledWith', '1');
  });

  it('closes modal when cancel is pressed', () => {
    cy.mount(<FoodSpecification foodData={mockFood} />);
    
    cy.contains('Amount').click();
    cy.contains('Cancel').click();
    cy.contains('Edit Amount').should('not.be.visible');
  });
});