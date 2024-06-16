import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
	// Replacing this useState with useWorkoutsContext hook so that we can access the workouts from the context instead of fetching them from the API
	// const [workouts, setWorkouts] = useState(null)
	const { workouts, dispatch } = useWorkoutsContext()

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("/api/workouts")
			const json = await response.json()

			if (response.ok) {
				// setWorkouts, which was part of useState, is now replaced with dispatch to update the workouts in the context

				dispatch({ type: "SET_WORKOUTS", payload: json })
			}
		}

		fetchWorkouts()
	}, [dispatch])

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	)
}

export default Home
