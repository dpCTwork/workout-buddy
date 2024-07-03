import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
	const { dispatch } = useAuthContext()
	const { dispatch: workoutsDispatch } = useWorkoutsContext()

	const logout = () => {
		// Remove the user from the local storage
		localStorage.removeItem("user")

		// Update the AuthContext
		// No need for any payload since we are just logging out
		dispatch({ type: "LOGOUT" })
		workoutsDispatch({ type: "SET_WORKOUTS", payload: null })
	}

	return { logout }
}
