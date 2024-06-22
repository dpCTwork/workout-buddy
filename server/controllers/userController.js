const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

// login user function
const loginUser = async (req, res) => {
	res.json({ message: "Login user" })
}

// signup user function
const signupUser = async (req, res) => {
	// We can write the logic for signing up and hashing password before saving it to the database here
	// But in this project, we'll use a static method in the User model to hash the password instead
	// This is to keep the controller lean and focused on handling the request and response
	// A static method is a method that is called on the model itself, not on an instance of the model

	const { email, password } = req.body

	try {
		const user = await User.signup(email, password)
		res.status(200).json({ email, user })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { signupUser, loginUser }
