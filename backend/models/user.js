const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Roles = {
    AUTHOR: 'AUTHOR',
    COMMITTEE: 'COMMITTEE',
    HOST: 'HOST',
    ADMIN : 'ADMIN'
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
            required: true
        },
        email: {
            type:String,
        },
        department: {
            type:String,
        },
        university: {
            type: String,
        },
        address: {
            type: String,
        },
        province: {
            type:String,
        },
        district: {
            type:String,
        },
        sub_district: {
            type:String,
        },
        zip_code: {
            type:String,
        },
    }
)

userSchema.index({fname: 1, lname: 1})

//static signup method
userSchema.statics.signup = async function(username, password, role) {

    //validation
    const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    const usernameValid = usernameRegex.test(username)

    if(role === 'ADMIN') {
        const admin = await this.findOne({role})
        if(admin) {
            throw Error('Already have Admin')
        }
    }

    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    if(!usernameValid) {
        throw Error ('Username is not valid ')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, password: hash, role})

    return user

}

//static login method
userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({username})

    if(!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}

const User = mongoose.model("User", userSchema)
module.exports = User