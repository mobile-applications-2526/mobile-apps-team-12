describe('Weight Management Flow', () => {
  const testPetId = '12';
  const userEmail = 'ashley.timmermans@student.ucll.be';
  const userPassword = 'welkom1234';
  
  beforeEach(() => {
    cy.login(userEmail, userPassword);
    cy.visit(`/pet/weights/${testPetId}`);
    cy.url({ timeout: 5000 }).should('include', '/pet/weights/');
    cy.wait(2000);
  });

  after(() => {
    cy.login(userEmail, userPassword);
    cy.visit(`/pet/weights/${testPetId}`);
    cy.wait(3000);
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('2.5 kg')) {
        cy.contains('2.5 kg')
          .parents('[style]')
          .first()
          .within(() => {
            cy.contains('🗑️').click();
          });
        
        cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');
        cy.contains('Are you sure').parent().parent().within(() => {
          cy.contains('Delete').click();
        });
        
        cy.wait(2000);
      }
    });
  });

  it('should display the weight page', () => {
    cy.url().should('include', '/pet/weights/');
    cy.contains('Back to pets', { timeout: 10000 }).should('be.visible');
  });

  it('should display existing weights', () => {
    cy.contains('kg', { timeout: 10000 }).should('be.visible');
  });

  it('should open and close add weight modal', () => {
    cy.contains('Add new weight', { timeout: 10000 }).click();
    cy.contains('Add Weight', { timeout: 5000 }).should('be.visible');
    
    cy.contains('Cancel').click();
    cy.wait(1000);
  });

  it('should add a new weight entry', () => {
    cy.contains('Add new weight', { timeout: 10000 }).click();
    cy.contains('Add Weight', { timeout: 5000 }).should('be.visible');
    
    cy.get('[data-testid="weight-input"]').type('2.5');
    
    cy.get('[data-testid="add-button"]').click();
    
    cy.wait(5000);
    cy.reload();
    cy.wait(2000);
    
    cy.contains('2.5 kg', { timeout: 10000 }).should('be.visible');
  });

  it('should delete a weight entry', () => {
    cy.contains('kg', { timeout: 10000 }).should('be.visible');
    
    cy.contains('🗑️').first().click();
    
    cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');
    
    cy.get('[data-testid="delete-weight-button"]').click();
    
    cy.wait(2000);
    cy.reload();
    cy.wait(2000);
  });
});