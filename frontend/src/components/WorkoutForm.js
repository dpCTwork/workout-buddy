/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext()

	const { user } = useAuthContext()

	const [title, setTitle] = useState("")
	const [load, setLoad] = useState("")
	const [reps, setReps] = useState("")
	const [error, setError] = useState(null)
	const [emptyFields, setEmptyFields] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!user) {
			setError("You must be logged in to add a workout")
			return
		}

		const workout = { title, load, reps }

		const response = await fetch("/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`,
			},
		})

		const data = await response.json()

		if (!response.ok) {
			setError(data.error)
			setEmptyFields(data.emptyFields)
		}
		if (response.ok) {
			setEmptyFields([])
			setError(null)
			setTitle("")
			setLoad("")
			setReps("")
			console.log("New workout added:", data)
			dispatch({ type: "CREATE_WORKOUT", payload: data })
		}
	}

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>

			<label>Exercise Title:</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyFields.includes("title") ? "error" : ""}
			/>

			<label>Load (in lbs):</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyFields.includes("load") ? "error" : ""}
			/>

			<label>Reps:</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyFields.includes("reps") ? "error" : ""}
			/>

			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}

export default WorkoutForm
