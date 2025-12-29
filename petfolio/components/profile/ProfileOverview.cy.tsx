import React from 'react';
import * as ExpoRouter from 'expo-router';
import ProfileOverview from './ProfileOverview';

describe("Profile Overview Component", () => {
    const firstname = "Test";
    const lastname = "User";
    const email = "testuser@ucll.be";
    const phonenumber ="0475428824";
    const pictures = null;
    const mockProfileData = {id: "1", user_id:"1", firstname, lastname, email, phonenumber, pictures};

     beforeEach(() => {
        cy.stub(ExpoRouter.router, 'navigate').as('navigate');
        
        // Mock supabase
        cy.window().then((win) => {
            (win as any).supabase = {
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
                    signOut: cy.stub().resolves({})
                },
                functions: {
                    invoke: cy.stub().resolves({ data: {}, error: null })
                }
            };
        });
    });
    it("view Profile Information", () => {
        cy.mount(
            <ProfileOverview 
                profileData={mockProfileData} 
                onProfileUpdated={cy.stub()}
            />
        );
        cy.contains("Test User").should("be.visible");
    })



})