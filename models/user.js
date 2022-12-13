const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Jwt = require('jsonwebtoken');
const userschema = new schema({
    username: {
        type: 'String',
        required: true,
    },
    email: {
        type: 'String',
        required: true,
    },
    password: {
        type: 'String',
        required: true,
    },
    profileimage: {
        type: 'String',
        default: 'images/user.png'
    },
    isadmin: {
        type: 'Boolean',
        default: false,
    },
    isverified: {
        type: 'Boolean',
        default: false
    },
    addresses: [{
        name: String,
        locality: String,
        city: String,
        district: String,
        pincode: Number,
        contact: String,
        isdefault: {
            type: Boolean,
            default: false
        }

    }],
    cart: [{
        qty: {
            type: Number,
            default: 1
        },
        product: {
            type: schema.Types.ObjectId,
            ref: 'product'
        },
    }],
    token: {
        type: 'String'
    },
    tokenexpire: {
        type: Date
    }
}, { timestamps: true });

userschema.methods.getJwtToken = function () {
    const userinfo = {
        id: this._id,
        username: this.username,
        img: this.profileimage
    };

    const token = Jwt.sign(userinfo, process.env.JwtPrivateKey);
    return token;
}

module.exports = mongoose.model('user', userschema);