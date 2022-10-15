import express from 'express'
import bcrypt from 'bcrypt';
import { MySQL } from '../database'
import { errorResponse, successResponse } from '../utils'

const { Models } = MySQL
export default () => {
  const router = express.Router()

  const validatePassword = (password, encryptPassword) => bcrypt.compare(password, encryptPassword)

  const loginUser = async (username, plainPassword, type = 'phone') => {
    const _user = type == 'phone' ? await Models.Users.getUserByPhone(username, true) : await Models.Users.getUserByEmail(username, true)
    if (!_user) return null

    const validPassword = await validatePassword(plainPassword, _user.password)
    const { password, ...user } = _user
    if (validPassword) return user

    return null
  }

  router.post('/login', async (req, res, next) => {
    try {
      const { username, password: plainPassword } = req.body
      const fileds = ['username', 'password']
      const messages = []
      for (let index = 0; index < fileds.length; index++) {
        const filed = fileds[index];
        if (!req.body[filed]) messages.push(`${filed} is require.`)
      }

      if (messages.length) return res.send(errorResponse(messages))

      const userByPhone = await loginUser(username, plainPassword, 'phone')
      if (userByPhone) return res.send(successResponse(userByPhone))

      const userByEmail = await loginUser(username, plainPassword, 'email')
      if (userByEmail) return res.send(successResponse(userByEmail))

      res.send(errorResponse("username & password incorrect."))
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        password
      } = req.body
      const messages = []
      const fileds = ['firstName', 'lastName', 'phone', 'password']

      for (let index = 0; index < fileds.length; index++) {
        const filed = fileds[index];
        if (!req.body[filed]) messages.push(`${filed} is require.`)
      }
      if (messages.length) {
        return res.send(errorResponse(messages))
      }

      const _userPhone = await Models.Users.getUserByPhone(phone)
      if (_userPhone) return res.send(errorResponse("phone is duplicate."))

      const _userEmail = email ? await Models.Users.getUserByEmail(email) : null
      if (_userEmail) return res.send(errorResponse("email is duplicate."))

      const user = {
        firstName,
        lastName,
        email,
        phone,
        password
      }
      const userCreated = await Models.Users.createUser(user)
      res.send(successResponse(userCreated))
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const user = await Models.Users.getUserById(req.params.id)
      
      if (!user) return res.send(errorResponse("user not found."))

      res.send(successResponse(user))
    } catch (error) {
      next(error)
    }
  })

  return router
}