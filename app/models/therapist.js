const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose
const therapistSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email id'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength : 128
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tokens : [
        {
            token : {
                type : String

            }
        }
    ]
})
therapistSchema.pre('save',function(next){
    if(this.isNew){
    bcryptjs.genSalt(10).then((salt)=>{
        bcryptjs.hash(this.password,salt).then((hashPassword)=>{
            this.password = hashPassword
            next()
        })
    })
    }
    else{
        next()
    }
})

  
therapistSchema.statics.findByEmailAndPassword=function(email,password){
    const Therapist = this
    return Therapist.findOne({email})
    .then((therapist)=>{
        if(therapist){
            
            return bcryptjs.compare(password,therapist.password)
            .then((result)=>{
                console.log(result)
                if(result){
                    return new Promise((resolve,reject)=>{
                        resolve(therapist)//Promise.resolve(user)
                    })
                }
                    else{
                        return new Promise((resolve,reject)=>{
                            reject('invalid emaill/password')//Promise.reject('invalid email/password')
                        })
                    }
                })
            .catch((err)=>{
               return  new Promise((resolve,reject)=>{
                    reject(err)//Promise.reject(err)
                })
            })
        }
        else{
            return new Promise((resolve,reject)=>{
                reject('invalid email/password ')//Promise.reject('invalid email/password')
            })
        }

    })
    .catch((err)=>{
        return new Promise((resolve,reject)=>{
            reject(err)//Promise.reject(err)
        })
    })
}
therapistSchema.methods.generateToken = function(){
    const therapist = this
    const tokenData = {
        therapistId : therapist._id,
     }
    const token = jwt.sign(tokenData,'dct@welt433')
    //console.log(token)
    therapist.tokens.push({token})
    return therapist.save().then((therapist)=>{
        return {token}
    })
    .catch((err)=>{
        return err
    })
}
therapistSchema.statics.findByToken = function(token){
    const Therapist= this
    let tokenData
    try{
    tokenData = jwt.verify(token,'dct@welt433')
    }
    catch(err){
        return Promise.reject(err)
    }
    return Therapist.findOne({_id:tokenData.userId,'tokens.token' : token})
    .then((therapist)=>{
        return Promise.resolve(therapist)
    })
    .catch((err)=>{
        return Promise.reject(err)
    })
}
const Therapist = mongoose.model('Therapist', therapistSchema)
module.exports = {
    Therapist
}