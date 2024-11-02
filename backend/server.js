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
const fs = require('fs')
const jwt = require('jsonwebtoken')

//midleware
const Paper = require("./models/paper");
const Category = require("./models/category");
const Conferences = require("./models/conferences");
const UploadFile = require("./models/uploadfile");
const InvSpeaker = require("./models/inv_speaker");
const Partner = require("./models/partner");
const User = require("./models/user");
const paperAssign = require("./models/paper_assign")
const notification = require("./models/notification")

const cloudinary = require('./cloudinary');
const Publication = require("./models/publication");

const bcrypt = require('bcrypt')
const saltRounds = 10;

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
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: cloud })

const uploadPdf = multer({
  storage: storagePdf,
});
const uploadImage = multer({
  storage: storageImage,
});

function generateAccessToken(user) {
  return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1]
  if (!token) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return res.status(403);
    req.user = user;
    next();
  })
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403)
    }

    next();
  }
}

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


// pagiantion

function paginatedResults(model, pageNumber, limitNumber, fieldName) {
  return async (req, res, next) => {
    const page = parseInt(pageNumber) || 1
    const limit = parseInt(limitNumber) || 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const result = {}

    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit
      }
    }

    result.result = model.slice(startIndex, endIndex)
  }
}

app.get('/test/pagination', (req, res) => {
  res.json(paginatedResults([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 2))
})

// end pagiantion



//-----------------------get All data--------------------------//

app.get("/all/confr", async (req, res) => {
  try {
    const confr = await Conferences.find({})
    res.status(200).json(confr)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/all/assign", async (req, res) => {
  try {
    const list = await paperAssign.find({status: 0})
    res.status(200).json(list)
  } catch (error) {
    console.log(error)
  }
})

app.get("/all/paper", async (req, res) => {
  try {
    const paperData = await Paper.find({})
    res.status(200).json(paperData)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/all/host", async (req, res) => {
  try {
    const host = await User.find({ role: "host" }).select({ password: 0 })
    res.status(200).json(host)
  } catch (error) {
    console.log(error)
  }
})

app.get('/get/comment/:id', async (req, res) => {
  try {
    const comment = await paperAssign.find({ paper_id: req.params.id })
    res.status(200).json(comment)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/get/committee/detail/:id', async (req, res) => {
  try {
    const commitDetail = await User.findById(req.params.id).select({ username: 0, password: 0 })
    res.status(200).json(commitDetail)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/partner/:id", async (req, res) => {
  try {
    const partner = await Partner.find({
      confr_id: req.params.id
    })
    res.status(200).json(partner)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/assign/:id", async (req, res) => {
  try {
    const assign = await paperAssign.find({ reviewer: req.params.id }).populate("paper_id")
    res.status(200).json(assign)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/assigned/:paper", async (req, res) => {
  try {
    const assigned = await paperAssign.find({ paper_id: req.params.paper, status: { $ne: 5 } }).populate("reviewer", "fname lname")
    res.status(200).json(assigned)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/all/committee", async (req, res) => {
  try {
    const committee = await User.find({ role: "committee" }).select({ password: 0 })
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
    const conferences = await Conferences.find({ status: true });
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

app.get("/get/cofr/cate/:id", async (req, res) => {
  try {
    const cate = await Category.find({ confr_id: req.params.id })
    res.status(200).json(cate);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get/category/:id", async (req, res) => {
  try {
    const getCategory = await Category.find({
      confr_id: req.params.id
    });
    res.status(200).json(getCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get/one/cate/:id", async (req, res) => {
  try {
    const getOneCate = await Category.findById(req.params.id)
    res.status(200).json(getOneCate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/committee/list/:id", async (req, res) => {
  try {
    const getList = await Category.findById(req.params.id).populate("reviewer_list", { "username": 0, "password": 0 })
    res.status(200).json(getList.reviewer_list)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/question/:id", async (req, res) => {
  try {
    const question = await Conferences.findById(req.params.id)
    res.status(200).json(question.question)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/inv-speaker/:id", async (req, res) => {
  try {
    const getData = await InvSpeaker.find({ confr_id: req.params.id });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/get/user/byid/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select({ "password": 0, })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})


//----------------------Create Data--------------------------//

app.post("/create/notification/:id", async (req, res) => {
  try {
    const input = req.body
    await notification.create({
      owner: req.params.id,
      header: input.header,
      form: input.form,
    })
    res.status(201).send("Notification is Created")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.post("/create/inv", async (req, res) => {
  try {
    const input = req.body
    const create = await InvSpeaker.create({
      name: input.name,
      desc: input.desc,
      keynote: input.keynote,
      confr_id: input.confr_id
    })
    res.status(201).json(create)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

app.post("/assign/:paper", async (req, res) => {
  try {
    const create = await paperAssign.create({
      reviewer: req.body.reviewer,
      paper_id: req.params.paper,
    })
    await Paper.findByIdAndUpdate(req.params.paper, {
      $set: {
        status: 1
      }
    })
    await notification.create({
      owner: req.body.reviewer,
      header: "มีบทความรอการตรวจ",
      form: "บทความ " + req.body.paper_code + " ได้ถูกมอบหมายให้คุณ"
    })
    res.status(200).json(create)
  } catch (error) {
    console.log(error)
  }
})

app.get("/get/reviewer/:id", async (req, res) => {
  try {
    const list = await Category.findById(req.params.id).populate("reviewer_list", { "username": 0, "password": 0 })
    res.status(200).json(list.reviewer_list)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/reviewer/list/:paper", async (req, res) => {
  try {
    const list = await paperAssign.find({ paper_id: req.params.paper })
    res.status(200).json(list)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.post("/signup", async (req, res) => {
  try {
    const newData = req.body
    const passwordHash = bcrypt.hashSync(newData.password, saltRounds)
    newData.password = passwordHash
    const newUser = await User.create(newData)
    res.status(201).send(newUser)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("มีผู้ใช้งานนี้แล้ว")
    } else {
      res.status(500).json(error)
      console.log(error)
    }
  }
})

app.post('/signup/committee', async (req, res) => {
  try {
    const resData = await User.create(req.body);
    const sendBackData = {
      _id: resData._id,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      university: req.body.university,
      username: req.body.username
    }
    res.status(201).json(sendBackData)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send("มีผู้ใช้งานแล้ว")
    } else {
      res.status(500).send(error)
    }
  }
})

app.post("/create/pub", async (req, res) => {
  try {
    const pub = await Publication.create(req.body);
    res.status(201).json(pub);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/create/paper", uploadPdf.single("file"), async (req, res) => {
  try {
    const catchReSubmit = await Paper.find({ owner: req.body.owner, confr_code: req.body.confr_code })
    console.log(catchReSubmit)
    if (catchReSubmit.length > 0) {
      res.status(406).send("this is a resubmit")
    } else {
      const paper = await Paper.create({
        title: req.body.title,
        cate_code: req.body.cate_code,
        paper_code: req.body.paper_code,
        confr_code: req.body.confr_code,
        owner: req.body.owner,
        paper_file: req.file.filename,
        publication: req.body.pub,
        abstract: req.body.abstract,
        regis_type: req.body.regis_type,
      })
      await notification.create({
        header: req.body.paper_code,
        owner: req.body.confr_code,
        form: "มีบทความส่งเข้ามาใหม่กรุณาตรวจสอบ"
      })
      res.status(201).json(paper);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/create/category", uploadImage.single("image"), async (req, res) => {
  try {
    const input = req.body
    const create = await Category.create({
      name: input.name,
      category_code: input.cate_code.toUpperCase(),
      desc: input.desc,
      confr_id: input.confr_id,
      icon: req.file.filename
    });
    res.status(201).json(create);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/upload/category", uploadImage.single('image'), async (req, res) => {
  try {
    const input = req.body
    const category = await Category.create({
      name: input.name,
      category_code: input.cate_code,
      desc: input.desc,
      confr_id: input.confr_id,
      icon: req.file.filename
    });
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
    if (error.code === 11000) {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
});

//--------------------------Login--------------------------------------

app.post("/signin", async (req, res) => {
  try {
    const check = await User.findOne({ username: req.body.username });
    if (!check) {
      res.status(404).send("Not Found");
    }
    if (bcrypt.compareSync(req.body.password, check.password)) {
      res.status(200).json({
        fname: check.fname,
        lname: check.lname,
        token: check._id,
        role: check.role,
        confr_id: check.confr_id
      });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (error) {
    res.status(500);
  }
})

// ----------------------------------update-----------------------------------

app.patch("/check/payment/:id", async (req, res) => {
  try {
    await Paper.findByIdAndUpdate(req.params.id, {
      $set: {
        payment_status: req.body.payment_status
      }
    })
    res.status(200).send("Update success")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/upload/file/inv/:id", uploadPdf.single('file'), async (req, res) => {
  try {
    const findOldInvCV = await InvSpeaker.findById(req.params.id)
    if (findOldInvCV.cv !== "" && findOldInvCV.cv !== undefined) {
      fs.unlink('../server/public/pdf/' + findOldInvCV.cv, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log("หาไฟล์ไม่เจอ")
          } else {
            throw err
          }
        } else {
          console.log("file is deleted")
        }
      })
    }
    const result = await InvSpeaker.findByIdAndUpdate(req.params.id, {
      $set: {
        cv: req.file.filename,
      }
    })
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.patch("/upload/image/inv/:id", uploadImage.single('image'), async (req, res) => {
  try {
    const findOldInvimg = await InvSpeaker.findById(req.params.id)
    if (findOldInvimg.img !== "" && findOldInvimg.img !== undefined) {
      fs.unlink('../server/public/image/' + findOldInvimg.img, (err) => {
        if (err?.code === 'ENOENT') {
          if (err.code === 'ENOENT') {
            console.log("หาไฟล์ไม่เจอ")
          } else {
            throw err
          }
        } else {
          console.log("file is delete")
        }
      })
    }
    const result = await InvSpeaker.findByIdAndUpdate(req.params.id, {
      $set: {
        img: req.file.filename,
      }
    })
    console.log(result)
    res.status(200).json(req.file.filename)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch('/update/notification/status/:id', async (req, res) => {
  try {
    const readStatus = await notification.updateMany({ owner: req.params.id, read_status: false }, {
      $set: {
        read_status: true,
      }
    },
    )
    res.status(200).json(readStatus)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch('/cancel/paper/assign', async (req, res) => {
  try {
    const input = req.body
    for (let i in input.list) {
      await paperAssign.updateMany({ paper_id: input.paper_id, reviewer: input.list[i] }, {
        $set: {
          status: 5
        }
      })
      await notification.create({
        owner: input.list[i],
        header: "ยกเลิกการตรวจบทความ",
        form: "ผู้จัดงานได้ทำการยกเลิกการตรวจบทความ: " + input.paper_code + " แล้ว",
      })
    }
    res.status(200).send("Cancel Success!")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/update/inv/:id", async (req, res) => {
  try {
    const input = req.body
    const update = await InvSpeaker.findByIdAndUpdate(req.params.id, {
      $set: {
        name: input.name,
        desc: input.desc,
        keynote: input.keynote
      }
    })
    console.log(update)
    res.status(200).send("Update Success")
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.patch("/update/user/:id", async (req, res) => {
  try {
    const input = req.body
    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        status: input.status,
        prefix: input.prefix,
        gender: input.gender,
        address: input.address,
        university: input.university,
        department: input.department,
        province: input.province,
        district: input.district,
        sub_district: input.sub_district,
        zip_code: input.zip_code,
      }
    })
    res.status(200).send("Update Success")
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.patch("/update/conferences/:id", async (req, res) => {
  try {
    const userInput = req.body;
    const confrUpdate = await Conferences.findByIdAndUpdate(req.params.id, userInput)
    res.status(200).json(confrUpdate);
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
});

app.patch("/upload/venue/image/:id", uploadImage.single("image"), async (req, res) => {
  try {
    const upload = await Conferences.findByIdAndUpdate(req.params.id, {
      venue_image: req.file.filename
    })
    res.status(200).send(upload.venue_image);
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
});

app.patch("/update/paper/:id", async (req, res) => {
  try {
    const updatePaper = await Paper.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        publication: req.body.pub,
        status: req.body.status,
      }
    })
    res.status(200).json(updatePaper)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch('/update/cate/:id', async (req, res) => {
  try {
    const updateCate = await Category.findByIdAndUpdate(req.params.id, {
      $set: {
        category_code: req.body.cate_code,
        name: req.body.name,
        desc: req.body.desc,
        reviewer_list: req.body.reviewer
      }
    })
    res.status(200).json(updateCate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/upload/cate/:id/:filename", uploadImage.single('image'), async (req, res) => {
  try {
    fs.unlink('../server/public/image/' + req.params.filename, (err) => {
      if (err) console.log(err)
      else {
        console.log("file is deleted")
      }
    })
    const uploadCate = await Category.findByIdAndUpdate(req.params.id, {
      $set: {
        category_code: req.body.cate_code,
        name: req.body.name,
        desc: req.body.desc,
        reviewer_list: req.body.reviewer,
        icon: req.file.filename
      }
    })
    res.status(200).json(uploadCate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/update/pub/:id", async (req, res) => {
  try {
    await Publication.findByIdAndUpdate(req.params.id, {
      $set: {
        th_name: req.body.th_name,
        en_name: req.body.en_name,
        branch: req.body.branch
      }
    })
    res.status(200).send("update Success")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/update/paper/status/:id", async (req, res) => {
  try {
    const update = await Paper.findByIdAndUpdate(req.params.id, {
      $set: {
        status: req.body.status,
        result: req.body.result
      }
    })
    await notification.create({
      owner: update.owner,
      header: update.paper_code,
      form: "บทความ: " + update.paper_code + " มีการเปลี่ยนแปลงสถานะ",
    })
    res.status(200).json(update)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/upload/close/paper/:id", uploadPdf.single('file'), async (req, res) => {
  try {
    await Paper.findByIdAndUpdate(req.params.id, {
      $set: {
        close_name_file: req.file.filename
      }
    })
    res.status(200).send("Upload Success")
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

//-------------------------------get by id------------------------------

app.get("/get/notification/:id", async (req, res) => {
  try {
    const getNoti = await notification.find({ owner: req.params.id })
    res.status(200).json(getNoti)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/unread/notification/:id", async (req, res) => {
  try {
    const getRead = await notification.find({ owner: req.params.id, read_status: false })
    res.status(200).send(getRead)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.get("/get/confr/:id", async (req, res) => {
  let validObj = mongoose.Types.ObjectId
  if (validObj.isValid(req.params.id)) {
    try {
      const getConfr = await Conferences.findById(req.params.id);
      if (getConfr === null) {
        res.status(404).send("Item not found")
      } else {
        res.status(200).json(getConfr);
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  } else {
    res.status(404).send("Item not found")
  }

});

app.get("/get/confr/list/:id", async (req, res) => {
  try {
    const list = await Conferences.find({ owner: req.params.id })
    res.status(200).json(list)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/host/confr/:id", async (req, res) => {
  try {
    const getConfr = await Conferences.find({ owner: req.params.id })
    res.status(200).json(getConfr)
  } catch (error) {
    console.log(error);
  }
});

app.get("/get/inv/:id", async (req, res) => {
  try {
    const getInv = await InvSpeaker.find({
      confr_id: req.params.id
    });
    res.status(200).json(getInv);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

app.get("/get/table/paper/:owner", async (req, res) => {
  try {
    const owner = req.params.owner;
    const getPaper = await Paper.find({ owner: owner }).populate("cate_code confr_code");
    res.status(200).json(getPaper);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get/conferences/paper/:code", async (req, res) => {
  try {
    const getPaper = await Paper.find({ cate_code: req.params.code }).populate("owner");
    res.status(200).json(getPaper);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/get/number/paper/:id', async (req, res) => {
  try {
    const numberPaper = await Paper.find({ cate_code: req.params.id })
    res.status(200).json(numberPaper)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/list/all/paper/:id", async (req, res) => {
  try {
    const getPaper = await Paper.find({ confr_code: req.params.id }).populate("cate_code")
    res.status(200).json(getPaper)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/pub/:id", async (req, res) => {
  try {
    const pub = await Conferences.findById(req.params.id).populate("publication")
    res.status(200).send(pub.publication)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.get("/get/position/:id", async (req, res) => {
  try {
    const position = await Conferences.findById(req.params.id).distinct("committees.position")
    res.status(200).json(position)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.get("/all/pub", async (req, res) => {
  try {
    const pub = await Publication.find({})
    res.status(200).json(pub)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.get("/get/paper/:id", async (req, res) => {
  try {
    const getPaper = await Paper.findById(req.params.id).populate("publication owner cate_code confr_code", { "password": 0, "username": 0 });
    res.status(200).json(getPaper);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get/rate/paper/:id", async (req, res) => {
  try {
    const detail = await paperAssign.findById(req.params.id).populate("paper_id")
    res.status(200).json(detail)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.get("/get/paper/assign/:id", async (req, res) => {
  try {
    const getPaper = await Paper.findById(req.params.id).populate("confr_code cate_code publication owner")
    res.status(200).json(getPaper)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.get("/get/review/host/:id", async (req, res) => {
  try {
    const reviewList = await paperAssign.find({ paper_id: req.params.id, status: { $ne: 5 } }).populate("reviewer", { "password": 0, "username": 0 })
    res.status(200).json(reviewList)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/review/:id", async (req, res) => {
  try {
    const paperList = await paperAssign.find({ reviewer: req.params.id }).populate("paper_id")
    res.status(200).json(paperList)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/verified/:id", async (req, res) => {
  try {
    const paperList = await paperAssign.find({ reviewer: req.params.id, status: { $ne: 0 } }).populate("paper_id")
    res.status(200).json(paperList)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get("/get/amount/review/:id", async (req, res) => {
  try {
    const amountReview = await paperAssign.find({ reviewer: req.params.id, status: 0 })
    res.status(200).json(amountReview)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/upload/comment/:id", uploadPdf.single("file"), async (req, res) => {
  try {
    const addComment = await paperAssign.findByIdAndUpdate(req.params.id, {
      $set: {
        suggestion_file: req.file.filename,
      }
    })
    res.status(200).json(addComment)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.patch("/add/comment/:id", async (req, res) => {
  try {
    const addComment = await paperAssign.findByIdAndUpdate(req.params.id, {
      $set: {
        suggestion: req.body.suggestion,
        rate: req.body.rate,
        total: req.body.total,
        status: 1,
        result: req.body.result
      }
    })
    res.status(200).json(addComment)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})



//-----------------------------upload file---------------------------

app.patch("/upload/payment/:id", uploadImage.single("image"), async (req, res) => {
  try {
    const uplaodPayment = await Paper.findByIdAndUpdate(req.params.id, {
      payment_image: req.file.filename,
      payment_status: 1
    })
    res.status(201).json(uplaodPayment)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.post(
  "/upload/template/:id",
  uploadPdf.single("file"),
  async (req, res) => {
    const input = req.body
    try {
      const uploadTemplate = await UploadFile.create({
        name: input.name,
        file: req.file.filename,
        confr_id: req.params.id
      })
      res.status(201).json(uploadTemplate)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
);

app.get("/get/template/:id", async (req, res) => {
  try {
    const getTemplate = await UploadFile.find({
      confr_id: req.params.id
    })
    res.status(200).json(getTemplate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.post("/upload", uploadImage.single("image"), (req, res) => {
  console.log(req);
});

app.post("/upload/partner/:id", uploadImage.single("image"), async (req, res) => {
  try {
    const upload = await Partner.create({
      confr_id: req.params.id,
      image: req.file.filename,
      desc: req.body.desc,
    })
    res.status(200).send(upload)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

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

app.delete('/delete/confr/:id/:filename', async (req, res) => {
  try {
    await Conferences.deleteOne({ _id: req.params.id })
    fs.unlink('../server/public/image/' + req.params.filename, (err) => {
      if (err) throw err
      res.status(202).send("file is deleted")
    })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

app.delete('/del/notification/:id', async (req, res) => {
  try {
    await notification.deleteOne({ _id: req.params.id })
    res.status(202).send("Notification is Deleted")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.delete('/clear/notification/:id', async (req, res) => {
  try {
    await notification.deleteMany({ owner: req.params.id })
    res.status(202).send("Notification is deleted")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.delete("/delete/user/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.status(200).send("User is deleted")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})


app.delete("/delete/template/:id/:filename", async (req, res) => {
  try {
    await UploadFile.deleteOne({ _id: req.params.id })
    fs.unlink('../server/public/pdf/' + req.params.filename, (err) => {
      if (err) throw err
      res.status(200).send("file is deleted")
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.delete('/delete/paper/:id', async (req, res) => {
  try {
    await Paper.findByIdAndUpdate(req.params.id, {
      $set: {
        status: 5
      }
    })
    res.status(200).send("Cancel Success")
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.delete('/delete/committee/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.status(202).send("Delete Success")
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.delete('/delete/partner/:id/:filename', async (req, res) => {
  try {
    await Partner.deleteOne({ _id: req.params.id })
    fs.unlink('../server/public/image/' + req.params.filename, (err) => {
      if (err) throw err
      res.status(202).send("file is deleted")
    })
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
})

app.delete('/delete/pub/:id', async (req, res) => {
  try {
    const del = await Publication.deleteOne({ _id: req.params.id })
    res.status(202).json(del)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.delete('/delete/cate/:id/:filename', async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id })
    fs.unlink('../server/public/image/' + req.params.filename, (err) => {
      if (err) throw err
      res.status(202).send("file is deleted")
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

app.delete('/delete/inv/:id/:image/:cv', async (req, res) => {
  try {
    if (req.params.image !== "" && req.params.image !== undefined) {
      fs.unlink('../server/public/image/' + req.params.image, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log("หาไฟล์ไม่เจอ")
          } else {
            throw err
          }
        } else {
          console.log("image is deleted")
        }
      })
    }
    if (req.params.cv !== "" && req.params.cv !== undefined) {
      fs.unlink('../server/public/pdf/' + req.params.cv, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log("หาไฟล์ไม่เจอ")
          } else {
            throw err
          }
        } else {
          console.log("cv is deleted")
        }
      })
    }
    await InvSpeaker.deleteOne({ _id: req.params.id })
    res.status(200).send("delete success")
  } catch (error) {
    console.log(error)
  }
})

//------------------------------------------------------- ค้นหา ----------------------------------------------------

app.get('/search/paper/:title/:id', async (req, res) => {
  try {
    const searchPaper = await Paper.find({ confr_code: req.params.id, title: { $regex: req.params.title, $options: "i" } }).populate("cate_code")
    res.status(200).json(searchPaper)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/search/confr', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ''
    const skip = (page - 1) * limit

    const items = await Conferences.find({ title: { $regex: searchQuery, $options: 'i' } })
      .skip(skip)
      .limit(limit)

    const total = await Conferences.countDocuments({ title: { $regex: searchQuery, $options: 'i' } })

    res.status(200).json({
      items,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/search/committee', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ''
    const skip = (page - 1) * limit

    const items = await User.find({ fname: { $regex: searchQuery, $options: 'i' }, role: "committee" })
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments({ fname: { $regex: searchQuery, $options: 'i' }, role: "committee" })

    res.status(200).json({
      items,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/search/publication', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ''
    const skip = (page - 1) * limit

    const items = await Publication.find({ en_name: { $regex: searchQuery, $options: 'i' }})
      .skip(skip)
      .limit(limit)

    const total = await Publication.countDocuments({ en_name: { $regex: searchQuery, $options: 'i' }})

    res.status(200).json({
      items,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/search/paper', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ''
    const skip = (page - 1) * limit

    const items = await Paper.find({ title: { $regex: searchQuery, $options: 'i' }}).populate("owner")
      .skip(skip)
      .limit(limit)

    const total = await Paper.countDocuments({ title: { $regex: searchQuery, $options: 'i' }})

    res.status(200).json({
      items,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/search/cate/:cate/:id', async (req, res) => {
  try {
    const searchCate = await Category.find({ confr_id: req.params.id, name: { $regex: req.params.cate, $options: "i" } })
    res.status(200).json(searchCate)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/search/pub/:pubname', async (req, res) => {
  try {
    const searchPub = await Publication.find({ en_name: { $regex: req.params.pubname, $options: "i" } })
    res.status(200).json(searchPub)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/search/host/:hostname', async (req, res) => {
  try {
    const searchHost = await User.find({ role: "host", fname: { $regex: req.params.hostname, $options: "i" } })
    res.status(200).json(searchHost)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/host/search', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ''
    const skip = (page - 1) * limit

    const items = await User.find({ fname: { $regex: searchQuery, $options: 'i' }, role: "host" })
      .skip(skip)
      .limit(limit)

    const total = await User.countDocuments({ fname: { $regex: searchQuery, $options: 'i' }, role: "host" })

    res.status(200).json({
      items,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/search/all/paper/:title/:limit', async (req, res) => {
  try {
    console.log("limit:", req.params.limit)
    const limitInt = parseInt(req.params.limit)
    const paperData = await Paper.find({ title: { $regex: req.params.title, $options: "i" } }).limit(limitInt)
    res.status(200).json(paperData)
  } catch (error) {
    console.log(error)
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
