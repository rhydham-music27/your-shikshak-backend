import mongoose from "mongoose";
import { TutorFormModel } from "../models/tutorform.model.js";
// your model

async function dropIndex() {
  try {
    // Drops the index named "isfirstTime_1"
    await TutorFormModel.collection.dropIndex("isfirstTime_1");
    console.log("Index dropped successfully!");
  } catch (err) {
    console.error("Error dropping index:", err.message);
  }
}

dropIndex();
