import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("DB Successfully Connected");
    });
    connection.on("error", (error) => {
      console.log("MongoDB Connection Error");
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("ERROR: ");
    console.log(error);
  }
}
