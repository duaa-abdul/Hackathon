import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
}, {
  timestamps: true
}) 


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
}
)




userSchema.methods.comparePassword = function(plainTextPass){
 return bcrypt.compare(plainTextPass, this.password)
}


const User = mongoose.model("user", userSchema)

export default User;