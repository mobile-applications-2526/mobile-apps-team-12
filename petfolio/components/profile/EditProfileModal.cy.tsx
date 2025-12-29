import EditProfileModal from "./EditProfileModal";


describe("EditProfileModal Component", () => {
     const firstname = "Test";
    const lastname = "User";
    const email = "testuser@ucll.be";
    const phonenumber = "0475428824";
    const pictures = null;
    const mockProfileData = {id: "1", user_id:"1", firstname, lastname, email, phonenumber, pictures};
    it ("Should render the component when visibility is set to true", () => {
        const onClose = cy.stub();
        const onSubmit = cy.stub();
        cy.mount( <EditProfileModal oldProfileData={mockProfileData} visible={true} onClose={onClose} onSubmit={onSubmit}/>);
        cy.contains("Edit User Profile").should("be.visible");
        cy.contains("Surname").should("be.visible");
        cy.contains("Name").should("be.visible");
        cy.contains("Email").should("be.visible");
        cy.contains("Phonenumber").should("be.visible");
    })
    it("Should not render the component when visibility is set to false", () => {
         const onClose = cy.stub();
        const onSubmit = cy.stub();
        cy.mount( <EditProfileModal oldProfileData={mockProfileData} visible={false} onClose={onClose} onSubmit={onSubmit}/>);
        cy.contains("Edit User Profile").should("not.exist");
    })
     it('Should submit the profile info when Edit Profile is pressed', () => {
            const onClose = cy.stub();
            const onSubmit = cy.stub().as('onSubmitStub');
            cy.mount( <EditProfileModal oldProfileData={mockProfileData} visible={true} onClose={onClose} onSubmit={onSubmit}/>);
    
            cy.get('input').eq(0).clear().type('NewTest');
            cy.get('input').eq(1).clear().type('User');
            cy.get('input').eq(2).clear().type('newtestuser@ucll.be');   
            cy.contains('Cancel').parent().parent().within(() => { cy.contains('Edit Profile').click(); });
            cy.get('@onSubmitStub').should('have.been.calledOnce');
            cy.get("@onSubmitStub").should("have.been.calledWithMatch",
                "NewTest",
                "User",
                "newtestuser@ucll.be",
                "0475428824"
            );
        });

            it('Should cancel when cancel button is clicked', () => {
                const onClose = cy.stub().as('onCloseStub');
                const onSubmit = cy.stub();
                 cy.mount( <EditProfileModal oldProfileData={mockProfileData} visible={true} onClose={onClose} onSubmit={onSubmit}/>);
        
                cy.contains('Cancel').click();
                cy.get('@onCloseStub').should('have.been.called');
            });
})