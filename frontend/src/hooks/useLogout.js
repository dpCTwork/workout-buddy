import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
	const { dispatch } = useAuthContext()

	const logout = () => {
		// Remove the user from the local storage
		localStorage.removeItem("user")

		// Update the AuthContext
		// No need for any payload since we are just logging out
		dispatch({ type: "LOGOUT" })
	}

	return { logout }
}
