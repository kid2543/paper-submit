//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const shortid = require("shortid")
const port = 4000;

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
const UploadFile = require("./models/uploadfile");
const InvSpeaker = require("./models/inv_speaker");
const Topic = require("./models/topic");



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

const storagePdf = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Pdf");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadPdf = multer({
  storage: storagePdf,
});
const uploadImage = multer({
  storage: storageImage,
});


//test
app.get("/", (req, res) => {
  res.send("Paper Submission");
});
app.get("/test", (req, res) => {
  console.log(shortid.generate());
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

app.get("/topic", async (req, res) => {
  try {
    const topic = await Topic.find({});
    res.status(200).json(topic);
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
    const conferences = await Conferences.find(req.body);
    res.status(200).json(conferences);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/category", async (req,res) => {
  try {
    const category = await Category.find({});
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/category-for-confr/:id", async (req, res) => {
  try {
    const id = req.params.id
    const getData = await Conferences.findById(id)
    const getCode = getData.confr_code
    const category_code = await Category.find({"confr_code": getCode})
    res.status(200).json(category_code)
  } catch (error) {
    console.log(error)
  }
})

app.post("/inv-speaker-get", async (req,res) => {
  try {
    const getData = await InvSpeaker.find({ confr_code:req.body.confr_code})
    res.status(200).json(getData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

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

app.post("/create/topic", async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/inv-speaker", async (req, res) => {
  try {
    const inv = await InvSpeaker.create(req.body);
    res.status(201).json(inv)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/author", async (req, res) => {
  try {
    const { password } = req.body;
    if (password.length < 8) {
      res.status(400).send("Password ต้องมากกว่า 8 ตัว");
    } else {
      const author = await Author.create(req.body);
      res.status(201).json(author);
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.json(error.code);
    } else {
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

app.post("/create/paper",uploadPdf.single('file'), async (req, res) => {
  try {
    const paper = await Paper.create({
      title:req.body.title,
      confr_code:req.body.confr,
      file:req.file.filename,
      owner:req.body.owner
    });
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

//--------------------------Login--------------------------------------


app.post("/login", async (req, res) => {
  try {
    const check = await Host.findOne({ username: req.body.username });
    if (!check) {
      res.status(404).send("Not Found");
    }
    if (check.password === req.body.password) {
      res.status(200).json({
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

app.post("/author-login", async (req, res) => {
  try {
    const check = await Author.findOne({ username: req.body.username });
    if (!check) {
      res.status(404).send("Not Found");
    }
    if (check.password === req.body.password) {
      res.status(200).json({
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

// ----------------------------------update-----------------------------------

app.put("/conferences-update/:id", async (req, res) => {
  try {
    const confrId = req.params.id;
    const userInput = req.body;
    const confUpdate = await Conferences.findByIdAndUpdate(confrId, {
      $set: {
        title: userInput.title,
        confr_code: userInput.code,
        confr_desc: userInput.desc,
        category_code: userInput.topic,
        presentation_guide: userInput.present,
        regis:userInput.regis,
        important_date:userInput.important_date,
        publication:userInput.pub,
      },
    });
    res.status(200).json(confUpdate);
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------get by id------------------------------

app.get('/conferences-get/:id', async (req,res) => {
  try {
    const confrId = req.params.id;
    const getConfr = await Conferences.findById(confrId)
    res.status(200).json(getConfr)
  } catch (error) {
    console.log(error)
  }
})

app.get('/inv-speaker-get/:id', async (req,res) => {
  try {
    const invId = req.params.id;
    const getConfr = await InvSpeaker.findById(invId)
    res.status(200).json(getConfr)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

app.post('/author-get-by-username', async (req, res) => {
  try {
    const getAuthor = await Author.findOne({username:req.body.username})
    res.status(200).json(getAuthor)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/paper-table', async (req,res) => {
  try {
    const getPaper = await Paper.find({owner:req.body.owner})
    res.status(200).json(getPaper)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/conferences-paper/:id', async (req,res) => {
  try {
    const confrId = req.params.id;
    const getConfr = await Conferences.findById(confrId)
    const getPaper = await Paper.find({confr_code:getConfr.confr_code})
    res.status(200).json(getPaper)
  } catch (error) {
    console.log(error)
  }
})

app.post('/conferences/paper', async (req,res) => {
  try {
    const getPaper = await Paper.find({confr_code:req.body.confr})
    res.status(200).json(getPaper)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/paper-get/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const getPaper = await Paper.findById(id)
    res.status(200).json(getPaper)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/committees-get/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const getCommit = await Committee.findById(id)
    res.status(200).json(getCommit)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/committees-assign/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const getCommit = await Paper.findByIdAndUpdate(id,{
      $set:{
        committees:req.body.commit
      }
    })
    res.status(200).json(getCommit)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/committees-update/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const getCommit = await Committee.findByIdAndUpdate(id,{
      $set:{
        fname:req.body.fname,
        lname:req.body.lname,
        topic:req.body.topic
      }
    })
    res.status(200).json(getCommit)
  } catch (error) {
    res.status(500).send(error)
  }
})
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
//-----------------------------upload file---------------------------

app.post('/conferences-upload/:id',uploadImage.single('image'), async (req,res) => {
  try {
    const confrId = req.params.id;
    const getConfr = await Conferences.findByIdAndUpdate(confrId,{$set:{
      logo:req.file.filename,
    }})
    res.status(200).json(getConfr)
  } catch (error) {
    console.log(error)
  }
})

app.post('/inv-speaker-update', async (req,res) => {
  try {
    const invId = req.body.id
    const UpdateInv = await InvSpeaker.findByIdAndUpdate(invId,{
      $set:{
        name:req.body.name,
        desc:req.body.desc,
        keynote:req.body.keynote,
      }
    })
    res.status(200).json(UpdateInv)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

app.post('/upload', uploadImage.single('image'), (req, res) => {
    console.log(req);
})

app.get('/get-image', (req, res) => {
    UploadFile.find()
    .then(Img => res.json(Img))
    .catch(err => console.log(err))
})

app.put('/inv-speaker-upload-img',uploadImage.single('image'), async (req,res) => {
  try {
    const invId = req.body.id
    const UpdateInv = await InvSpeaker.findByIdAndUpdate(invId,{
      $set:{
        name:req.body.name,
        desc:req.body.desc,
        keynote:req.body.keynote,
        img:req.file.filename,
        cv:req.body.cv,
      }
    })
    res.status(200).json(UpdateInv)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

app.put('/inv-speaker-upload-cv',uploadPdf.single('file'), async (req,res) => {
  try {
    const invId = req.body.id
    const UplaodFile = await InvSpeaker.findByIdAndUpdate(invId,{
      $set:{
        name:req.body.name,
        desc:req.body.desc,
        keynote:req.body.keynote,
        cv:req.file.filename,
        img:req.body.img,
      }
    })
    res.status(200).json(UplaodFile)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

app.put('/partner-upload/:id',uploadImage.array('image',10), async (req,res) => {
  try {
    const id = req.params.id
    let fileName = [];
    for (let x in req.files) {
      fileName = [...fileName, req.files[x].filename]
    }
    const uploadPartner = await Conferences.findByIdAndUpdate(id, {$set:{
      partner: fileName
    }})
    console.log(fileName)
    res.status(200).json(uploadPartner)
  } catch (error) {
    console.log(error)
  }
})

app.post('/venue-update/:id', async (req,res) => {
  try {
    const id = req.params.id
    const uploadVenue = await Conferences.findByIdAndUpdate(id,{
      $set:{
        venue:{
          name:req.body.name,
          desc:req.body.desc,
          remark:req.body.remark,
          travel:req.body.travel,
          img:req.body.image
        }
      }
    })
    res.status(200).json(uploadVenue)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/venue-upload-img/:id',uploadImage.single('image'), async (req,res) => {
  try {
    const id = req.params.id
    const uploadVenue = await Conferences.findByIdAndUpdate(id,{
      $set:{
        venue:{
          name:req.body.name,
          desc:req.body.desc,
          remark:req.body.remark,
          travel:req.body.travel,
          img:req.file.filename
        }
      }
    })
    res.status(200).json(uploadVenue)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/schedule-upload/:id', uploadPdf.single('file'), async (req,res) => {
  try {
    const id = req.params.id
    const upload = await Conferences.findByIdAndUpdate(id, {
      $set: {
        schedule:req.file.filename
      }
    })
    res.status(200).json(upload)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/brochure-upload/:id', uploadImage.single('image'), async (req,res) => {
  try {
    const id = req.params.id
    const upload = await Conferences.findByIdAndUpdate(id, {
      $set: {
        brochure:req.file.filename
      }
    })
    res.status(200).json(upload)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/upload/img',uploadImage.single('image'), async (req,res) => {
  try {
    res.status(200).json(req.file.filename)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/upload/pdf',uploadPdf.single('file'), async (req,res) => {
  try {
    res.status(200).json(req.file.filename)
  } catch (error) {
    res.status(500).send(error)
  }
})

mongoose
  .connect("mongodb://127.0.0.1/paper_submition")
  .then(() => {
    console.log("connected to Mongodb");
    app.listen(port, console.log("Server is Runing on Port: " + port));
  })
  .catch((err) => {
    console.log(err);
  });
