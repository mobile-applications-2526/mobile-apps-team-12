import React from 'react';
import FoodOverview from './FoodOverview';
import * as ExpoRouter from 'expo-router';

describe('FoodOverview Component', () => {
  const mockFoods = [
    { id: '1', name: 'Dog Food', description: 'Premium kibble', quantity: '2 cups' },
    { id: '2', name: 'Treats', description: 'Chicken treats', quantity: '5 pieces' },
  ];

  beforeEach(() => {
    cy.stub(ExpoRouter.router, 'navigate').as('navigate');
  });

  it('renders list of foods', () => {
    cy.mount(<FoodOverview foods={mockFoods} />);
    
    cy.contains('Dog Food').should('be.visible');
    cy.contains('Premium kibble').should('be.visible');
    cy.contains('Treats').should('be.visible');
    cy.contains('Chicken treats').should('be.visible');
  });

  it('renders empty list when no foods provided', () => {
    cy.mount(<FoodOverview foods={[]} />);
    
    cy.contains('Dog Food').should('not.exist');
  });

  it('navigates to food detail when row is clicked', () => {
    cy.mount(<FoodOverview foods={mockFoods} />);
    
    cy.contains('Dog Food').parent().click();
    cy.get('@navigate').should('have.been.calledWith', '/food/1');
  });

  it('displays correct quantities', () => {
    cy.mount(<FoodOverview foods={mockFoods} />);
    
    cy.contains('2 cups').should('be.visible');
    cy.contains('5 pieces').should('be.visible');
  });
});