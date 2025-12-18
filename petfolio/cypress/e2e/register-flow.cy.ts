// describe("Register user flow", () => {
//     const userEmail = "newTestuser@ucll.be";
//     const userPassword = "Newtest123!";
//     const firstName = "New";
//     const lastName = "TestUser";
//     const phonenumber = "0472428824"

//       beforeEach(() => {
//         cy.visit("/");
//       })

//     it("User registers with valid information", () => {
//         cy.get('[data-testid="register-button"]').click();
//         cy.url().should("include", "/register");
//         cy.contains("Register here").should("be.visible");
//         cy.get('input').eq(0).type(`${firstName}`);
//         cy.get('input').eq(1).type(`${lastName}`); 
//         cy.get('input').eq(2).type(`${userEmail}`); 
//         cy.get('input').eq(3).type(`${phonenumber}`); 
//         cy.get('input').eq(4).type(`${userPassword}`); 
//         cy.get('input').eq(5).type(`${userPassword}`); 
//         cy.contains("register").click();
//         cy.wait(2000);
//         cy.url().should("include", "/login");
//     })
// })