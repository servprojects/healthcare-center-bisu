const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, default: null },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  middleName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: {type : String},
  token: { type: String },
  schedule: {
    type: mongoose.Schema.Types.Object,
    ref: 'Schedule'
}
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Muser", userSchema);
