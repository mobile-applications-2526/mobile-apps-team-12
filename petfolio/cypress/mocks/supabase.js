const createDefaultMock = () => ({
    from: () => ({
        select: () => ({
            eq: () => ({
                single: () => Promise.resolve({ data: null, error: null })
            }),
            // Also support direct select without chaining
            then: (resolve) => resolve({ data: [], error: null })
        }),
        insert: () => Promise.resolve({ data: [], error: null }),
        update: () => ({
            eq: () => Promise.resolve({ data: [], error: null }),
            // Support direct update
            then: (resolve) => resolve({ data: [], error: null })
        }),
        delete: () => ({
            eq: () => Promise.resolve({ data: [], error: null }),
            // Support direct delete
            then: (resolve) => resolve({ data: [], error: null })
        }),
    }),
    auth: {
        signIn: () => Promise.resolve({ user: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
    functions: {
        invoke: () => Promise.resolve({ data: {}, error: null })
    }
});

// Use a mutable object instead of const
export const supabase= createDefaultMock();

// Function to update the mock
export const setSupabaseMock = (mock) => {
    Object.keys(supabase).forEach(key => delete supabase[key]);
    Object.assign(supabase, mock);
};

export const resetSupabaseMock = () => {
    setSupabaseMock(createDefaultMock());
};