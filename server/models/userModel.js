const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
})

// static method to sign up
// A static method doesn't have access to the INSTANCE of the model, only the model itself
// So we use 'this' to refer to the model
// Can't use arrow function here because we need to use 'this'
// Arrow functions don't have their own 'this', they inherit it from the parent scope
userSchema.statics.signup = async function (email, password) {
	// validate the input fields first before anything else
	if (!email || !password) {
		throw new Error("All fields are required.")
	}
	// validate email
	if (!validator.isEmail(email)) {
		throw new Error("Invalid email.")
	}
	// validate password
	if (!validator.isStrongPassword(password)) {
		throw new Error(
			"Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character."
		)
	}

	// check if user email exists first
	const userExists = await this.findOne({ email })

	if (userExists) {
		throw new Error("User already exists")
	}

	// hash password with bcrypt
	// bcrypt is a library that helps hash passwords
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// create a new user document
	const user = await this.create({ email, password: hashedPassword })

	return user
}

module.exports = mongoose.model("User", userSchema)
