import React from "react";
import PetOverview from "./PetOverview";
import { Pet, PetType } from "../../types";
import { setSupabaseMock } from '../../cypress/mocks/supabase';

const mockPet: Pet = {
    id: '1',
    name: "Buddy",
    type: PetType.Dog,
    birthdate: new Date("2020-01-15"),
    description: "blabla",
    weight: [
        {id: "2", date: "2024-01-10", value: "25" },
        { id: "3", date: "2024-01-01", value: "24" },
    ],
};

describe("PetOverview Component", () => {
    beforeEach(() => {
        cy.mount(<PetOverview petData={mockPet} />);
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
                        getUser: cy.stub().resolves({
                            data: { user: {id: "test-user-id"} },
                            error: null
                        }),
                        signOut: cy.stub().resolves({ error: null })
                    },
                    functions: {
                        invoke: cy.stub().resolves({ data: {}, error: null })
                    }
                });
    });

    it("renders pet name and type", () => {
        cy.contains("Buddy").should("be.visible");
        cy.contains("Dog").should("be.visible");
    });

    it("displays current weight correctly", () => {
        cy.contains("25 kg").should("be.visible");
    });

    it("displays birthdate in table", () => {
        cy.contains("Birthday").should("be.visible");
        cy.contains("15-1-2020").should("be.visible");
    });

    it("opens delete confirmation modal when delete button is clicked", () => {
        cy.contains("Delete Pet").click();
        cy.contains("Are you sure you want to delete Buddy?").should("be.visible");
    });

    it("closes delete modal when cancel is clicked", () => {
        cy.contains("Delete Pet").click();
        cy.contains("Cancel").click();
        cy.contains("Are you sure you want to delete Buddy?").should("not.exist");
    });

    it("renders profile image", () => {
        cy.get("[data-testid='image'").should("be.visible");
    });

    it("renders edit image button", () => {
        cy.get("[data-testid='edit-icon-button']").should("be.visible");
    });
});