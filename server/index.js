//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 4000

//midleware
const Host = require("./models/host");
const Author = require("./models/author");
const Committee = require("./models/committees");
const Status = require("./models/status");
const Rank = require("./models/rank");
const Paper = require("./models/paper");
const Category = require("./models/category");
const Comment = require("./models/comment");
const Conferences = require("./models/conferences");
const Name_title = require("./models/name_title");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

//storage for upload Image
const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Image");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

//test
app.get("/", (req, res) => {
  res.send("Test get");
});
//-----------------------get All data--------------------------//
app.get("/host", async (req, res) => {
  try {
    const host = await Host.find({});
    res.status(200).json(host);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/comment", async (req, res) => {
  try {
    const comment = await Comment.find({});
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/author", async (req, res) => {
  try {
    const author = await Author.find({});
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/committee", async (req, res) => {
  try {
    const committee = await Committee.find({});
    res.status(200).json(committee);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/paper", async (req, res) => {
  try {
    const paper = await Paper.find({});
    res.status(200).json(paper);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/conferences", async (req, res) => {
  try {
    const conferences = await Conferences.find({});
    res.status(200).json(conferences);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/conferences/user", async (req, res) => {
  try {
    const conferences = await Conferences.find(req.body)
    res.status(200).json(conferences)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

app.get("/category", async (req, res) => {
  try {
    const category = await Category.find({})
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//----------------------Create Data--------------------------//

app.post("/create/host", async (req, res) => {
  try {
    const host = await Host.create(req.body);
    res.status(201).json(host);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/author", async (req, res) => {
  try {
    const {password} = req.body;
    if(password.length < 8){
        res.status(400).send("Password ต้องมากกว่า 8 ตัว")
    }else{
        const author = await Author.create(req.body);
        res.status(201).json(author);
    }

  } catch (error) {
    console.log(error);
    if(error.code === 11000){
        res.json(error.code);
    }else{
        res.status(500).json(error);
    }

  }
});

app.post("/create/committee", async (req, res) => {
  try {
    const committee = await Committee.create(req.body);
    res.status(201).json(committee);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/comment", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/status", async (req, res) => {
  try {
    const status = await Status.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/rank", async (req, res) => {
  try {
    const rank = await Rank.create(req.body);
    res.status(201).json(rank);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/paper", async (req, res) => {
  try {
    const paper = await Paper.create(req.body);
    res.status(201).json(paper);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/category", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/conferences", async (req, res) => {
  try {
    const conferences = await Conferences.create(req.body);
    res.status(201).json(conferences);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/nametitle", async (req, res) => {
  try {
    const nameTitle = await Name_title.create(req.body);
    res.status(201).json(nameTitle);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//-------------------------End create data-----------------------------//

//Login
app.post("/login", async (req, res) => {
  try {
    const check = await Author.findOne({ username: req.body.username });
    if (!check) {
      res.status(404).send("Not Found");
    }
    if (check.password === req.body.password) {
      res
        .status(200)
        .json({
          fname: check.fname,
          lname: check.lname,
          token: check.username,
        });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (error) {
    res.status(500);
  }
});

//Find All

/* app.get('/admin', async (req,res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) */

//Find by ID

/* app.get('/product/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) */

//test product

/* app.post('/product', async (req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}) */

//test Create Page
/* 
app.post('/create/page', async (req, res) => {
    try {
        const page = await Page.create(req.body)
        res.json(200).json(page)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}) */

//loging and register
/* 
app.post('/register', async (req,res) => {
    try{
        const check = await User.findOne({email: req.body.email})
        if(check != req.body.mail && check != []){
            res.status(200).send("Email is already existed")
        }else {
            const user = await User.create(req.body)
            res.status(201).json(user)
            console.log("User Create Sucess!")
        }
    } catch (error) {
        res.status(500).send(error.errors)   
    }
}) */
/* 
app.get('/users', async (req,res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) */

/* app.post('/login', async (req,res) => {
    try {
        const check = await User.findOne({email:req.body.email})
        if (!check) {
            res.status(404).send("Not Found")
        }
        if (check.password === req.body.password) {
            res.status(200).json({name:check.name, token: check.id})
        } else {
            res.status(400).send("Wrong password")
        }
    } catch (error) {
        res.status(500)
    }
}) */

/* app.get('/get-user/:id', async (req, res) => {
    try {
        const {id} = req.params
        const getUser = await User.findById(id);
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) */
//-----------------

//upload file

const uploadImage = multer({
  storage: storageImage,
});

/* app.post('/upload', uploadImage.single('image'), (req, res) => {
    UploadFile.create({image: req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
}) */

/* app.get('/get-image', (req, res) => {
    UploadFile.find()
    .then(Img => res.json(Img))
    .catch(err => console.log(err))
}) */
//-----------------

mongoose
  .connect("mongodb://127.0.0.1/paper_submition")
  .then(() => {
    console.log("connected to Mongodb");
    app.listen(port, console.log("Server is Runing on Port: " + port));
  })
  .catch((err) => {
    console.log(err);
  });
