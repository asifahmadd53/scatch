const mongoose = require('mongoose')

const config = require('config')
// const dbgr = require('debug')('development:mongoose')


mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(() => console.log('Connected to MongoDB...'))
.catch(()=> console.log('Could not connect to MongoDB...'))


module.exports = mongoose.connection;