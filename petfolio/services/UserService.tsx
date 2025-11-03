

const registerUser = async (userData) => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/users/register",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        if (!response || !response.ok) {
            // Throw a clear error so callers can handle failures explicitly
            const text = await (response?.text?.() || Promise.resolve(""));
            throw new Error(
                `Failed to sign up user: ${response?.status ?? "no-response"} ${text}`
            );
        }

        return response;
    } catch (error) {
        console.error(error);
        // Re-throw so callers don't receive undefined and can handle errors.
        throw error;
    }
};

const UserService = {registerUser}
export default UserService;