import React from 'react';
import AddFoodModal from './AddFoodModal';

describe('AddFoodModal Component', () => {
    it('renders when visible', () => {
      const onClose = cy.stub();
      const onSubmit = cy.stub();
      
      cy.mount(
        <AddFoodModal visible={true} onClose={onClose} onSubmit={onSubmit} />
      );
      
      cy.contains('Add Food').should('exist');
      cy.contains('Name').should('exist');
      cy.contains('Description').should('exist');
      cy.contains('Quantity').should('exist');
    });

    it('does not render when not visible', () => {
      const onClose = cy.stub();
      const onSubmit = cy.stub();
      
      cy.mount(
        <AddFoodModal visible={false} onClose={onClose} onSubmit={onSubmit} />
      );
      
      cy.contains('Add Food').should('not.exist');
    });

    it('calls onSubmit with input values when Add is clicked', () => {
      const onClose = cy.stub();
      const onSubmit = cy.stub().as('onSubmitStub');
      
      cy.mount(
        <AddFoodModal visible={true} onClose={onClose} onSubmit={onSubmit} />
      );
      
      cy.get('input').eq(0).type('New Food');
      cy.get('input').eq(1).type('Delicious');
      cy.get('input').eq(2).type('1 cup');
      
      cy.contains('Cancel').parent().parent().within(() => {
        cy.contains('Add').click();
      });
      
      cy.get('@onSubmitStub').should('have.been.calledOnce');
      cy.get('@onSubmitStub').should('have.been.calledWith', 'New Food', 'Delicious', '1 cup');
    });

    it('calls onClose when Cancel is clicked', () => {
      const onClose = cy.stub().as('onCloseStub');
      const onSubmit = cy.stub();
      
      cy.mount(
        <AddFoodModal visible={true} onClose={onClose} onSubmit={onSubmit} />
      );
      
      cy.contains('Cancel').click();
      cy.get('@onCloseStub').should('have.been.called');
    });
});