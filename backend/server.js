//import
const express = require('express')
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
require('dotenv').config()
const port = process.env.PORT;

// connect to mongodb database
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URL

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => { console.log('Connected to the database');})


//middlewares
const errorHandler = require('./middlewares/errorHandler');


//router
const userRoutes = require('./routes/user')
const paperRoutes = require('./routes/paper')
const conferenceRoutes = require('./routes/conferences')
const paperAssignRoutes = require('./routes/paper_assign')
const categoryRoutes = require('./routes/category')
const invRoutes = require('./routes/inv_speaker')
const partnerRoutes = require('./routes/partner')
const publicationRoutes = require('./routes/publication')
const templateRoutes = require('./routes/template')
const paperFile = require('./routes/paper_file')
const editFile = require('./routes/paper_edit')
const assignHistory = require('./routes/paper_assign_history')
const notificationRouter = require('./routes/notification');

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use('/api/user', userRoutes)
app.use('/api/paper', paperRoutes)
app.use('/api/conference', conferenceRoutes)
app.use('/api/assign', paperAssignRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/inv', invRoutes)
app.use('/api/partner', partnerRoutes)
app.use('/api/publication', publicationRoutes)
app.use('/api/template', templateRoutes)
app.use('/api/paperfile', paperFile)
app.use('/api/editpaper', editFile)
app.use('/api/history', assignHistory)
app.use('/api/notification', notificationRouter)



// handle error
app.use(errorHandler)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

mongoose.connect(uri) 
.then(() => { console.log('Connected to MongoDB!'); }) 
.catch((error) => { console.error('Connection error:', error); })

// start the server 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})