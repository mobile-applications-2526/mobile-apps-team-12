import React from 'react';
import * as ExpoRouter from 'expo-router';
import ProfileOverview from './ProfileOverview';
import { setSupabaseMock } from '../../cypress/mocks/supabase';

describe("Profile Overview Component", () => {
    const firstname = "Test";
    const lastname = "User";
    const email = "testuser@ucll.be";
    const phonenumber = "0475428824";
    const pictures = null;
    const mockProfileData = {id: "1", user_id:"1", firstname, lastname, email, phonenumber, pictures};

    beforeEach(() => {
        cy.stub(ExpoRouter.router, 'navigate').as('navigate');
    });

    it("view Profile Information", () => {
       setSupabaseMock({
            from: cy.stub().returns({
                select: cy.stub().returns({
                    eq: cy.stub().returns({
                        single: cy.stub().resolves({
                            data: { pictures: null },
                            error: null
                        })
                    })
                })
            }),
            auth: {
                getSession: cy.stub().resolves({
                    data: { session: null },
                    error: null
                }),
                signOut: cy.stub().resolves({ error: null })
            },
            functions: {
                invoke: cy.stub().resolves({ data: {}, error: null })
            }
        });
        cy.mount(
            <ProfileOverview 
                profileData={mockProfileData} 
                onProfileUpdated={cy.stub()}
            />
        );
        cy.contains("Test User").should("be.visible");
        cy.contains("testuser@ucll.be").should("be.visible");
        cy.contains("0475428824").should("be.visible");
    });

    it("should open delete confirmation modal when delete button clicked", () => {
        setSupabaseMock({
            from: cy.stub().returns({
                select: cy.stub().returns({
                    eq: cy.stub().returns({
                        single: cy.stub().resolves({
                            data: { pictures: null },
                            error: null
                        })
                    })
                })
            }),
            auth: {
                getSession: cy.stub().resolves({
                    data: { session: null },
                    error: null
                }),
                signOut: cy.stub().resolves({ error: null })
            },
            functions: {
                invoke: cy.stub().resolves({ data: {}, error: null })
            }
        });
        cy.mount(
            <ProfileOverview 
                profileData={mockProfileData} 
                onProfileUpdated={cy.stub()}
            />
        );
        
        cy.contains("Delete Account").click();
        cy.contains("Are you sure you want to delete the user Test User").should("be.visible");
    });

   it("should delete account when confirmed", () => {
     const invokeStub = cy.stub().resolves({ data: { success: true }, error: null });
        const signOutStub = cy.stub().resolves({ error: null });
        const getSessionStub = cy.stub().resolves({
            data: { 
                session: { 
                    access_token: 'mock-access-token',
                    user: { id: '1' }
                } 
            },
            error: null
        });

        // Different mock because this test needs a session to be able to logout at the end
        setSupabaseMock({
            from: cy.stub().returns({
                select: cy.stub().returns({
                    eq: cy.stub().returns({
                        single: cy.stub().resolves({
                            data: { pictures: null },
                            error: null
                        })
                    })
                })
            }),
            auth: {
                getSession: getSessionStub,
                signOut: signOutStub
            },
            functions: {
                invoke: invokeStub
            }
        });


    cy.mount(
        <ProfileOverview 
            profileData={mockProfileData} 
            onProfileUpdated={cy.stub()}
        />
    );
    
    // Wait for component to load
    cy.contains("Test User").should("be.visible");
    
    // Open delete modal
    cy.contains("Delete Account").click();
    
    // Confirm deletion
    cy.contains("Are you sure you want to delete the user Test User").should("be.visible");
    
    // Click the delete button in the modal (the red one)
    cy.get('[data-testid="delete-account-button"]').click();
    
    // Wait a bit for async operations
    cy.wait(100);
    cy.then(() => {
    console.log('invokeStub called?', invokeStub.called);
    console.log('invokeStub call count:', invokeStub.callCount);
    expect(invokeStub).to.have.been.calledOnce;
    expect(signOutStub).to.have.been.calledOnce;
    });
    });
});