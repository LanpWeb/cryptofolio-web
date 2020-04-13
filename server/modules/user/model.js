const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  refreshTokens: [String],
  watchlist: [Number],
})

userSchema.pre('save', async function cryptPass() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

userSchema.pre('update', async function cryptPass() {
  const { password } = this.getUpdate().$set
  if (password) {
    const hash = await bcrypt.hash(password, 10)
    this.getUpdate().$set.password = hash
  }
})

userSchema.methods.matchesPassword = function comparePass(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
