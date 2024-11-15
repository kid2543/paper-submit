//import
const express = require('express')
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 4000;
require('dotenv').config()

// connect to mongodb database
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/paper_submition'
const options = { useNewUrlParser: true, useUnifiedTopology: true }

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => { console.log('Connected to the database');})


//middlewares
const errorHandler = require('./middlewares/errorHandler');


//router
const userRoutes = require('./routes/user')
const paperRoutes = require('./routes/paper')
const conferenceRoutes = require('./routes/conferences')
const paperAssignRoutes = require('./routes/paperAssign')
const categoryRoutes = require('./routes/category')
const invRoutes = require('./routes/invSpeaker')
const partnerRoutes = require('./routes/partner')
const publicationRoutes = require('./routes/publication')
const templateRoutes = require('./routes/template')

app.use(express.json());
app.use(express.static("public"));
app.use(cors())
app.use(cookieParser());



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


// handle error
app.use(errorHandler)

app.get('/', (req, res) => { res.send('Hello paper submission!'); });

mongoose.connect(uri, options) 
.then(() => { console.log('Connected to MongoDB!'); }) 
.catch((error) => { console.error('Connection error:', error); })

// start the server 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})