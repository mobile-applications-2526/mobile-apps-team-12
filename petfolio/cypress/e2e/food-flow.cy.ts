describe('Food Management Flow', () => {
  const testPetId = '12';
  const userEmail = 'ashley.timmermans@student.ucll.be';
  const userPassword = 'welkom1234';

  beforeEach(() => {
    cy.login(userEmail, userPassword);
    cy.visit(`/pet/foods/${testPetId}`);
    cy.url({ timeout: 5000 }).should('include', '/pet/foods/');
    cy.wait(2000);
  });

  after(() => {
    cy.login(userEmail, userPassword);
    cy.visit(`/pet/foods/${testPetId}`);
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('Premium Rabbit Food')) {
        cy.contains('Premium Rabbit Food').click();
        cy.wait(1000);
        
        cy.contains('Delete Food').click();
        cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');
        
        cy.contains('This action cannot be undone')
          .parent()
          .parent()
          .contains('Delete')
          .click({ force: true });
        
        cy.wait(2000);
      }
    });
  });

  it('should display the food page', () => {
    cy.url().should('include', '/pet/foods/');
    cy.contains('Back to pet', { timeout: 10000 }).should('be.visible');
  });

  it('should open and close add food modal', () => {
    cy.contains('Add new food', { timeout: 10000 }).scrollIntoView().should('be.visible').click();
    cy.contains('Add Food', { timeout: 5000 }).should('be.visible');
    
    cy.get('[data-testid="cancel-food-button"]').click();
    cy.wait(1000);
  });

  it('should add a new food item', () => {
    cy.contains('Add new food', { timeout: 10000 }).scrollIntoView().click();
    cy.contains('Add Food', { timeout: 5000 }).should('be.visible');
    
    cy.get('input').eq(0).type('Premium Rabbit Food');
    cy.get('input').eq(1).type('High quality pellets');
    cy.get('input').eq(2).type('2 cups daily');
    
    cy.get('[data-testid="add-food-button"]').click();
    
    cy.wait(5000);
    cy.reload();
    cy.wait(2000);
    
    cy.contains('Premium Rabbit Food', { timeout: 10000 }).should('be.visible');
    cy.contains('High quality pellets').should('be.visible');
  });

  it('should navigate to food detail page when clicking existing food', () => {
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      
      if (!bodyText.includes('Back to pet') || bodyText.includes('No food')) {
        cy.log('No food items found, skipping navigation test');
        return;
      }
      
      cy.get('div').contains('›').first().parent().click();
      
      cy.url({ timeout: 10000 }).should('include', '/food/');
      
      cy.contains('Amount', { timeout: 10000 }).should('be.visible');
      cy.contains('Delete Food').should('be.visible');
    });
  });

  it('should delete a food item', () => {
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('Premium Rabbit Food')) {
        cy.contains('Premium Rabbit Food').click();
        
        cy.url({ timeout: 10000 }).should('include', '/food/');
        cy.contains('Amount', { timeout: 10000 }).should('be.visible');
        
        cy.contains('Delete Food').scrollIntoView().click();
        
        cy.contains('Are you sure', { timeout: 5000 }).should('be.visible');
        cy.contains('This action cannot be undone').should('be.visible');
        
        cy.get('[data-testid="delete-food-button"]').click();
        
        cy.wait(3000);
        cy.url({ timeout: 10000 }).should('include', '/pet/foods/');
        
        cy.reload();
        cy.wait(2000);
        
        cy.get('body').should('not.contain', 'Premium Rabbit Food');
      } else {
        cy.log('Premium Rabbit Food not found, skipping delete test');
      }
    });
  });
});