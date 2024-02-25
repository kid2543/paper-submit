//import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const shortid = require("shortid");
const port = 4000;
require('dotenv').config()

//midleware
const Host = require("./models/host");
const Author = require("./models/author");
const Committee = require("./models/committees");
const Paper = require("./models/paper");
const Category = require("./models/category");
const Comment = require("./models/comment");
const Conferences = require("./models/conferences");
const UploadFile = require("./models/uploadfile");
const InvSpeaker = require("./models/inv_speaker");
const Topic = require("./models/topic");
const ListOfCommittees = require("./models/committees_list");

const cloudinary = require('./cloudinary')

app.use(express.json());
app.use(express.static("public"));
app.use(cors())
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

const cloud = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage:cloud})

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


//test for host image upload
app.post("/test/upload", upload.single('image'), async (req, res) => {
    const test = await cloudinary.uploader.upload(req.file.path)
    console.log(test.url)
})

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

app.get("/host/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const host = await Host.find({ username: user });
    if (host.username !== undefined) {
      res.status(200).json(host);
    } else {
      res.status(404).send({ message: "not have user" });
    }
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

app.get("/committee/list", async (req, res) => {
  try {
    const list = await ListOfCommittees.find({});
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/committee/paper/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const getCate = await Category.findOne({ category_code: code });
    const getCommit = await Committee.find({ topic: getCate.topic });
    res.status(200).json(getCommit);
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

app.get("/get/paper/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const paper = await Paper.findById(id);
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

app.get("/category", async (req, res) => {
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
    const id = req.params.id;
    const getData = await Conferences.findById(id);
    const getCode = getData.confr_code;
    const category_code = await Category.find({ confr_code: getCode });
    res.status(200).json(category_code);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get-category-code/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const resConfr = await Conferences.findOne({confr_code: code});
    const getCategory = await Category.find({
      confr_code: resConfr.confr_code,
    });
    res.status(200).json(getCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get/inv-speaker/:code", async (req, res) => {
  try {
    const code = req.params.code
    const getData = await InvSpeaker.find({ confr_code: code });
    res.status(200).json(getData);
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
    res.status(500).json(error);
  }
});

app.post("/create/committees/list", async (req, res) => {
  try {
    const list = await ListOfCommittees.create(req.body);
    res.status(201).json(list);
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
    res.status(201).json(inv);
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

app.post("/create/paper", uploadPdf.single("file"), async (req, res) => {
  try {
    const paper = await Paper.create(req.body)
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
        token: check._id,
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

app.patch("/update/conferences/:id", async (req, res) => {
  try {
    const userInput = req.body;
    const confUpdate = await Conferences.findByIdAndUpdate(req.params.id, {
      $set: {
        title: userInput.title,
        sub_title: userInput.subtitle,
        confr_desc: userInput.confr_desc,
        confr_code: userInput.code,
        category_code: userInput.topic,
        important_date: userInput.important_date,
        publication: userInput.pub,
      },
    });
    res.status(200).json(confUpdate);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.patch("/update/conferences/:id/present", async (req, res) => {
  try {

    const userInput = req.body;
    const confUpdate = await Conferences.findByIdAndUpdate(req.params.id, {
      $set: {
        presentation_guide: {
          remark: userInput.remark,
          detail: userInput.detail,
          for_presenters: userInput.present,
          for_session_chair: userInput.chair,
          for_audience: userInput.audience,
        }
      },
    });
    res.status(200).json(confUpdate);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.patch("/update/conferences/:id/regis", async (req, res) => {
  try {

    const userInput = req.body;
    const regisUpdate = await Conferences.findByIdAndUpdate(req.params.id, {
      $set: {
        regis: {
          remark: userInput.remark,
          early_bird_date: userInput.eb_date,
          regular_date: userInput.r_date,
          bank_name: userInput.bank_name,
          ac_name: userInput.ac_name,
          ac_type: userInput.ac_type,
          ac_no: userInput.ac_no,
        }
      },
    });
    res.status(200).json(regisUpdate);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.patch("/update/conferences/:id/regis-type", async (req, res) => {
  try {

    const regisUpdate = await Conferences.findByIdAndUpdate(req.params.id, {
      $set: {
        regis_type: req.body
      },
    });
    res.status(200).json(regisUpdate);
  } catch (error) {
    res.status(500).json(error)
  }
});

//-------------------------------get by id------------------------------

app.get("/get/confr/:id", async (req, res) => {
  try {
    const getConfr = await Conferences.findById(req.params.id);
    res.status(200).json(getConfr);
  } catch (error) {
    res.status(500).json(error)
  }
});

app.get("/get/host/confr/:id", async (req, res) => {
  try {
    const getHost = await Host.findById(req.params.id);
    const getConfr = await Conferences.find({owner: getHost.username})
    res.status(200).json(getConfr)
  } catch (error) {
    console.log(error);
  }
});

app.get("/list/committees/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const getList = await ListOfCommittees.find({ confr_code: code });
    res.status(200).json(getList);
  } catch (error) {
    console.log(error);
  }
});

app.get("/amount/committees/:id", async (req, res) => {
  try {
    const getList = await ListOfCommittees.find({ committees_list: req.params.id });
    res.status(200).json(getList);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get/committees/:id", async (req, res) => {
  try {
    const getList = await ListOfCommittees.findOne({ paper_id: req.params.id });
    res.status(200).json(getList);
  } catch (error) {
    console.log(error);
  }
});

app.post("/assign/:confr/:paper", async (req, res) => {
  try {
    const getCode = await Conferences.findById(req.params.confr);
    const getPaper = await Paper.findById(req.params.paper);
    const createList = await ListOfCommittees.updateOne(
      { paper_id: getPaper._id },
      {
        $set: {
          confr_code: getCode.confr_code,
          committees_list: req.body.commit,
        },
      },
      { upsert: true }
    );
    res.status(200).json(createList);
  } catch (error) {
    console.log(error);
  }
});

app.get("/inv-speaker-get/:id", async (req, res) => {
  try {
    const getConfr = await InvSpeaker.findById(req.params.id);
    res.status(200).json(getConfr);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

app.post("/author-get-by-username", async (req, res) => {
  try {
    const getAuthor = await Author.findOne({ username: req.body.username });
    res.status(200).json(getAuthor);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/paper-table/:owner", async (req, res) => {
  try {
    const owner = req.params.owner;
    const getPaper = await Paper.find({ owner: owner });
    res.status(200).json(getPaper);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/conferences-paper/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const getPaper = await Paper.find({ submit_code: code });
    res.status(200).json(getPaper);
  } catch (error) {
    console.log(error);
  }
});

app.post("/conferences/paper", async (req, res) => {
  try {
    const getPaper = await Paper.find({ confr_code: req.body.confr });
    res.status(200).json(getPaper);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/paper-get/:id", async (req, res) => {
  try {
    const getPaper = await Paper.findById(req.params.id);
    res.status(200).json(getPaper);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/committees-get/:id", async (req, res) => {
  try {
    const getCommit = await Committee.findById(req.params.id);
    res.status(200).json(getCommit);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/committees-assign/:id", async (req, res) => {
  try {
    const getCommit = await Paper.findByIdAndUpdate(req.params.id, {
      $set: {
        committees: req.body.commit,
      },
    });
    res.status(200).json(getCommit);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/committees-update/:id", async (req, res) => {
  try {
    const getCommit = await Committee.findByIdAndUpdate(req.params.id, {
      $set: {
        fname: req.body.fname,
        lname: req.body.lname,
        topic: req.body.topic,
      },
    });
    res.status(200).json(getCommit);
  } catch (error) {
    res.status(500).send(error);
  }
});

//-----------------------------upload file---------------------------

app.post(
  "/conferences-upload/:id",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      const getConfr = await Conferences.findByIdAndUpdate(req.params.id, {
        $set: {
          logo: req.file.filename,
        },
      });
      res.status(200).json(getConfr);
    } catch (error) {
      console.log(error);
    }
  }
);

app.post("/inv-speaker-update", async (req, res) => {
  try {
    const UpdateInv = await InvSpeaker.findByIdAndUpdate(req.body.id, {
      $set: {
        name: req.body.name,
        desc: req.body.desc,
        keynote: req.body.keynote,
      },
    });
    res.status(200).json(UpdateInv);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

app.post("/upload", uploadImage.single("image"), (req, res) => {
  console.log(req);
});

app.get("/get-image", (req, res) => {
  UploadFile.find()
    .then((Img) => res.json(Img))
    .catch((err) => console.log(err));
});

app.put(
  "/inv-speaker-upload-img",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      const invId = req.body.id;
      const UpdateInv = await InvSpeaker.findByIdAndUpdate(invId, {
        $set: {
          name: req.body.name,
          desc: req.body.desc,
          keynote: req.body.keynote,
          img: req.file.filename,
          cv: req.body.cv,
        },
      });
      res.status(200).json(UpdateInv);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

app.put(
  "/inv-speaker-upload-cv",
  uploadPdf.single("file"),
  async (req, res) => {
    try {
      const UplaodFile = await InvSpeaker.findByIdAndUpdate(req.body.id, {
        $set: {
          name: req.body.name,
          desc: req.body.desc,
          keynote: req.body.keynote,
          cv: req.file.filename,
          img: req.body.img,
        },
      });
      res.status(200).json(UplaodFile);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }
);

app.put(
  "/partner-upload/:id",
  uploadImage.array("image", 10),
  async (req, res) => {
    try {
      let fileName = [];
      for (let x in req.files) {
        fileName = [...fileName, req.files[x].filename];
      }
      const uploadPartner = await Conferences.findByIdAndUpdate(req.params.id, {
        $set: {
          partner: fileName,
        },
      });
      console.log(fileName);
      res.status(200).json(uploadPartner);
    } catch (error) {
      console.log(error);
    }
  }
);

app.post("/venue-update/:id", async (req, res) => {
  try {
    const uploadVenue = await Conferences.findByIdAndUpdate(req.params.id, {
      $set: {
        venue: {
          name: req.body.name,
          desc: req.body.desc,
          remark: req.body.remark,
          travel: req.body.travel,
          img: req.body.image,
        },
      },
    });
    res.status(200).json(uploadVenue);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/venue-upload-img/:id",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      const uploadVenue = await Conferences.findByIdAndUpdate(req.params.id, {
        $set: {
          venue: {
            name: req.body.name,
            desc: req.body.desc,
            remark: req.body.remark,
            travel: req.body.travel,
            img: req.file.filename,
          },
        },
      });
      res.status(200).json(uploadVenue);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.post("/schedule-upload/:id", uploadPdf.single("file"), async (req, res) => {
  try {
    const upload = await Conferences.findByIdAndUpdate(req.params.id, {
      $set: {
        schedule: req.file.filename,
      },
    });
    res.status(200).json(upload);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/brochure-upload/:id",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      const upload = await Conferences.findByIdAndUpdate(req.params.id, {
        $set: {
          brochure: req.file.filename,
        },
      });
      res.status(200).json(upload);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.post("/upload/img", uploadImage.single("image"), async (req, res) => {
  try {
    res.status(200).json(req.file.filename);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/upload/pdf", uploadPdf.single("file"), async (req, res) => {
  try {
    res.status(200).json(req.file.filename);
  } catch (error) {
    res.status(500).send(error);
  }
});

//----------------------------Del------------------------------//

app.delete('/delete/confr/:id', async (req, res) => {
  try {
    const del = await Conferences.deleteOne({_id:req.params.id})
    res.status(202).json(del)
  } catch (error) {
    res.status(500).json(error)
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
