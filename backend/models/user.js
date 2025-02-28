const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const fs = require('fs')

const Roles = {
    AUTHOR: 'AUTHOR',
    COMMITTEE: 'COMMITTEE',
    HOST: 'HOST',
    ADMIN: 'ADMIN'
}

Object.freeze(Roles)

const userSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            enum: {
                values: Object.values(Roles),
                message: '{VALUE} is not supported'
            },
            default: Roles.AUTHOR
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        department: {
            type: String,
        },
        university: {
            type: String,
        },
        address: {
            type: String,
        },
        province: {
            type: String,
        },
        district: {
            type: String,
        },
        sub_district: {
            type: String,
        },
        zip_code: {
            type: String,
        },
    }
)

//static signup method
userSchema.statics.signup = async function (username, password, role, email, name) {

    //validation
    const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    const usernameValid = usernameRegex.test(username)

    if (role === 'ADMIN') {
        const admin = await this.findOne({ role })
        if (admin) {
            throw Error('ผู้ดูแลระบบสามารถมีได้เพียง 1 บัญชี')
        }
    }

    if (!username || !password) {
        throw Error('กรุณากรอกข้อมูลให้ครบ')
    }

    if (!usernameValid) {
        throw Error('ชื่อผู้ใช้งานไม่ตรงตามเงื่อนไข')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('รหัสผ่านไม่แข็งแรงพอ')
    }

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('ชื่อผู้ใช้งานนี้ถูกใช้ไปแล้ว')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, role, email, name })


    return user

}

//static login method
userSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error('กรุณากรอกข้อมูลให้ครบ')
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('ไม่พบชื่อผู้ใช้งานนี้ในระบบ')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('รหัสผ่านไม่ถูกต้อง')
    }

    return user
}

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        if (this.role === 'COMMITTEE') {
            // pull from category
            await mongoose.model('category').updateMany(
                { reviewer_list : this._id},
                {$pull : {reviewer_list : this._id}}
            )

            // delete paper assign
            const assign = await mongoose.model('paper_assign').find({ reviewer: this._id });
            for(const file in assign) {
                if(file.suggestion_file) {
                    fs.unlinkSync(`/public/uploads/${file.suggestion_file}`)
                    console.log("suggestion file deleted")
                }
            }
            for(const doc of assign) {
                await mongoose.Model('paper_assign').deleteOne({_id : doc._id})
                console.log('Document is deleted', doc)
            }
        }
        // next step
        next();
    } catch (err) {
        next(err);
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User