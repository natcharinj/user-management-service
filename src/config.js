const config = () => ({
  port: process.env.PORT || 3002,
  database: {
    host: process.env.MYSQL_HOSTNAME,
    name: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    driver: 'mysql',
    sslConnection: process.env.MYSQL_SSL_CONNECTION === 'true' ? ({
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true
        }
      }
    }) : ({})
  },
})
export default config();
