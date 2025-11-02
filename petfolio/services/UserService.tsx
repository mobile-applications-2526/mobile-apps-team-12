
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
        if (!response.ok) {
        throw new Error("Failed to sign up user");
        }
        return response;
        } catch (error) {
            console.error(error);
        }
    };

const UserService = {registerUser}
export default UserService;