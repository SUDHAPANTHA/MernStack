import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Admin", trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: { type: String, required: true, trim: true, minlength: 8 },
  role: {
    type: String,
    required: true,
    trim: true,
    default: "Admin",
    enum: ["Admin", "SuperAdmin"],
  },
  phone: [{ type: String, required: true, trim: true, unique: true }],
  address: { type: String, required: true, trim: true },
});
const AdminModel = mongoose.model("admin", adminSchema);
export default AdminModel;
//curly braces bhitrra deko kurav haru validation ko lagi use hunxa
