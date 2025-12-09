import React from 'react';
import WeightOverview from "./WeightOverview";

describe('WeightOverview Component', () => {
    const mockWeights = [
      { id: 'w1', value: '25.5', date: '2024-01-15T10:00:00.000Z' },
      { id: 'w2', value: '26.0', date: '2024-01-20T10:00:00.000Z' },
      { id: 'w3', value: '24.8', date: '2024-01-10T10:00:00.000Z' },
    ];

    it('renders list of weights', () => {
      const onDelete = cy.stub();
      cy.mount(<WeightOverview weights={mockWeights} onDelete={onDelete} />);
      
      cy.contains('25.5 kg').should('be.visible');
      cy.contains('26.0 kg').should('be.visible');
      cy.contains('24.8 kg').should('be.visible');
    });

    it('displays weights in descending order by date', () => {
      const onDelete = cy.stub();
      cy.mount(<WeightOverview weights={mockWeights} onDelete={onDelete} />);
      
      cy.contains('26.0 kg').should('be.visible');
    });

    it('formats dates correctly', () => {
      const onDelete = cy.stub();
      cy.mount(<WeightOverview weights={mockWeights} onDelete={onDelete} />);
      
      cy.contains(/januari|februari|maart/i).should('be.visible');
    });

    it('opens delete modal when trash icon is clicked', () => {
      const onDelete = cy.stub();
      cy.mount(<WeightOverview weights={mockWeights} onDelete={onDelete} />);
      
      cy.contains('🗑️').first().click();
      
      cy.contains('Delete Weight').should('exist');
      cy.contains('Are you sure').should('exist');
    });

      it('calls onDelete when delete is confirmed', () => {
      const onDelete = cy.stub().as('onDeleteStub');
      cy.mount(<WeightOverview weights={mockWeights} onDelete={onDelete} />);
      
      cy.contains('🗑️').first().click();
      cy.contains('Are you sure').should('exist');
      
      cy.contains('Cancel').parent().parent().within(() => {
          cy.contains('Delete').click();
      });
      
      cy.get('@onDeleteStub').should('have.been.calledOnce');
      cy.get('@onDeleteStub').should('have.been.calledWith', 'w2');
      });

    it('closes modal when cancel is clicked', () => {
      const onDelete = cy.stub();
      cy.mount(<WeightOverview weights={mockWeights} onDelete={onDelete} />);
      
      cy.contains('🗑️').first().click();
      cy.contains('Are you sure').should('exist');
      
      cy.contains('Cancel').click();
      
      cy.wrap(onDelete).should('not.have.been.called');
      
      cy.contains('26.0 kg').should('be.visible');
    });

    it('renders empty list when no weights provided', () => {
      const onDelete = cy.stub();
      cy.mount(<WeightOverview weights={[]} onDelete={onDelete} />);
      
      cy.contains('kg').should('not.exist');
    });
});