let mongoose = require('mongoose');

const Double = require('@mongoosejs/double');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
});

const User = mongoose.model('User', UserSchema);

const BeerSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, index: true},
    when: {type: Date, required: true, index: true},
    where: {type: String, required: true},
    what: {type: String, required: true},
    liter: {type: Double, required: true}
});

const Beer = mongoose.model('Beer', BeerSchema);

module.exports = {User, Beer, UserSchema, BeerSchema};
