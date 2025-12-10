import React from 'react';
import AddWeightModal from './AddWeightModal';

describe('AddWeightModal Component', () => {
    it('renders when visible', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();
        
        cy.mount(
        <AddWeightModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );
        
        cy.contains('Add Weight').should('exist');
        cy.contains('Weight').should('exist');
        cy.contains('Date').should('exist');
    });

    it('does not render when not visible', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();
        
        cy.mount(
        <AddWeightModal visible={false} onClose={onClose} onSubmit={onSubmit} />
        );
        
        cy.contains('Add Weight').should('not.exist');
    });

    it('displays current date by default', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();
        
        cy.mount(
        <AddWeightModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );
        
        const today = new Date().toLocaleDateString('nl-BE');
        cy.contains(today).should('exist');
    });

    it('calls onSubmit with weight and date when Add is clicked', () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub().as('onSubmitStub');
        
        cy.mount(
        <AddWeightModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );
        
        cy.get('[data-testid="weight-input"]').type('27.5');
        
        cy.get('[data-testid="add-button"]').click();
        
        cy.get('@onSubmitStub').should('have.been.calledOnce');
        cy.get('@onSubmitStub').its('firstCall.args.0').should('equal', '27.5');
        cy.get('@onSubmitStub').its('firstCall.args.1').should('match', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
    it('calls onClose when Cancel is clicked', () => {
        const onClose = cy.stub().as('onCloseStub');
        const onSubmit = cy.stub();
        
        cy.mount(
        <AddWeightModal visible={true} onClose={onClose} onSubmit={onSubmit} />
        );
        
        cy.contains('Cancel').click();
        cy.get('@onCloseStub').should('have.been.called');
    });
});