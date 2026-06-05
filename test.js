import mongoose from "mongoose";

mongoose
  .connect("mongodb+srv://yusramirza555_db_user:2plBMijDlc9cDqYn@cluster0.wlq7mz1.mongodb.net/")
  .then(() => {
    console.log("Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
  });
