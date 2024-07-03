const express = require("express")
const {
	createWorkout,
	getWorkouts,
	getWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// Protect all routes in this file
// This will run the requireAuth middleware before any of the routes are executed.
// The next() function in the middleware will call the next route handler.
router.use(requireAuth)

// GET all workouts
router.get("/", getWorkouts)

// GET a single workout
router.get("/:id", getWorkout)

// POST a new workout
router.post("/", createWorkout)

// DELETE a workout
router.delete("/:id", deleteWorkout)

// PATCH (update) a workout
router.patch("/:id", updateWorkout)

module.exports = router
