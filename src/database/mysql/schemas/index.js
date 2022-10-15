import { DataTypes } from 'sequelize'
import User from './user.schema'


export default (sequelize) => ({
  User: User(sequelize, DataTypes)
})
