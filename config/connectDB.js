import mongoose from "mongoose";

export default async function connectDB(URI) {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
