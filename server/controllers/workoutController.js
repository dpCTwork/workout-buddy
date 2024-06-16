const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// GET all workouts
const getWorkouts = async (req, res) => {
	const workouts = await Workout.find({}).sort({ createdAt: -1 })
	res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ error: `Workout with id ${id} not found` })
	}

	const workout = await Workout.findById(id)

	if (!workout) {
		return res
			.status(404)
			.json({ error: `Workout with id ${id} not found` })
	}

	res.status(200).json(workout)
}

// POST (create) a new workout
const createWorkout = async (req, res) => {
	// destructure the title, load, and reps from the request body
	const { title, load, reps } = req.body

	let emptyFields = []

	// check for empty fields
	// if any fields are empty, add them to the emptyFields array
	if (!title) {
		emptyFields.push("Title")
	}
	if (!load) {
		emptyFields.push("Load")
	}
	if (!reps) {
		emptyFields.push("Reps")
	}

	// if there are any empty fields, return an error message
	if (emptyFields.length > 0) {
		return res.status(400).json({
			error: "Please fill in all fields:",
			emptyFields,
		})
	}

	// add doc to db collection
	try {
		const workout = await Workout.create({ title, load, reps })
		res.status(200).json(workout)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ error: `Workout with id ${id} not found` })
	}

	const workout = await Workout.findOneAndDelete({ _id: id })

	if (!workout) {
		return res
			.status(404)
			.json({ error: `Workout with id ${id} not found` })
	}

	res.status(200).json(workout)
}

// PATCH (update) a workout
const updateWorkout = async (req, res) => {
	const { id } = req.params
	const { title, load, reps } = req.body

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ error: `Workout with id ${id} not found` })
	}

	const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body })

	if (!workout) {
		return res
			.status(404)
			.json({ error: `Workout with id ${id} not found` })
	}

	res.status(200).json(workout)
}

module.exports = {
	createWorkout,
	getWorkouts,
	getWorkout,
	deleteWorkout,
	updateWorkout,
}
