const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const db = require("../database/connection")


const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from the token
      db.query(`select username from users where id = "${decoded.id}"`, function (err, rows) {
        // req.user = rows[0].id
      })

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
