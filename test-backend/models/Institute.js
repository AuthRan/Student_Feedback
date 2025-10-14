const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const InstituteSchema = new mongoose.Schema({
  instituteName: { type: String, required: true },
  instituteType: { type: String, required: true },
  establishedYear: { type: Number, required: true },
  affiliationBoard: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alternatePhone: { type: String },
  website: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true },
  adminName: { type: String, required: true },
  adminDesignation: { type: String, required: true },
  adminEmail: { type: String, required: true },
  password: { type: String, required: true }, // You should hash this in production!
  totalStudents: { type: Number },
  totalFaculty: { type: Number },
  departments: { type: Number },
  description: { type: String },
  agreeNewsletter: { type: Boolean },
  adminEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
InstituteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison
InstituteSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('Institute', InstituteSchema);
