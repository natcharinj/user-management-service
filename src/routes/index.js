import express from "express"
import UserRoute from "./users.route"
export default () => {
  const router = express.Router()
  router.use("/users", UserRoute())
  return router
}