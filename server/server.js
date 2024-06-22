require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")

// express app
const app = express()

// middleware
// This middleware will parse incoming JSON data and make it available under req.body
app.use(express.json())

app.use((req, res, next) => {
	console.log("Request path:", req.path, req.method)
	next()
})

// routes
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the server" })
})

app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)

// connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log(
				"Connected to MongoDB & listening on PORT",
				process.env.PORT
			)
		})
	})
	.catch((err) => {
		console.log(err)
	})
