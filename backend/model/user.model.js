const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator').isEmail;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    unique: [true, 'Email already exists'],
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [6, 'Password must be at least 6 characters'],
    // DO NOT set maxlength here since hashed passwords are always long
  },
  profilePic: {
    type: String,
    default:
      'https://static.vecteezy.com/system/resources/previews/020/765/399/large_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
  },
  address: {
    type: String, // changed from Number to String (more realistic)
    default: '',
    trim: true,
  },
 
  role: {
    type: String,
    enum: ['user', 'admin', 'seller'],
    default: 'user',
  },
});

// ✅ Hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// ✅ Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err, false);
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
