const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const db = require("../database/connection")

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  // const userExists = await User.findOne({ email })
  db.query(`select username from users where username = "${username}"`, function (err, rows) {
    if (err) {
      res.status(400).json({ success: false, msg: "ther's an error" });
    }
    else if (rows.length) {
      res.status(400).json({ success: false, msg: "user already exists" });
    }

  })


  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  db.query(`insert into users (username, password) values ("${username}","${hashedPassword}")`, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(400)
      // throw new Error('Invalid user data')
    } else {
      res.status(201).json({
        id: rows[0].insertId,
        username: username,
        token: generateToken(rows[0].insertId),
      })
    }
  })
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body



  // Check for user email
  db.query(`select * from users where username = "${username}"`, async function (err, rows) {

    if (err) {

      res.status(400)
      throw new Error('Invalid credentials')

    }

    else if (rows.length && (await bcrypt.compare(password, rows[0].password))) {


      res.json({
        username: username,
        token: generateToken(rows[0].insertId),
      })


    }

  })
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
