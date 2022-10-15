require('@babel/register')({
    extensions: ['.js'],
})
require('dotenv').config()
require('./src/app')
