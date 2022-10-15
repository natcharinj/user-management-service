import express from 'express'
import path from 'path'
import http from 'http'
import Debug from 'debug'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import ApiRoute from './routes'
import config from './config';
import verifyDatabaseConnection from './utils/VerifyDatabaseConnection';

const debug = Debug('user-service')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/v1', ApiRoute())

app.use(cors())
app.use((err, req, res, next) => {
  const { statusCode = 500, message, stack } = err
  const jsonBody = { status: 'error', statusCode, message }
  res.status(statusCode).json(
    process.env['NODE_ENV'] === 'production'
      ? jsonBody
      : { ...jsonBody, stack } // Show stacktrace if not production
  )
})

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}


const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}

const port = normalizePort(config.port)
app.set('port', port)
console.log('Port: ', port)

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

verifyDatabaseConnection();