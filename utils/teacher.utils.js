import CodeModel from "../models/code.model.js";
import { TutorFormModel } from "../models/tutorform.model.js";

export   function  generateCode() {
  // 2 random uppercase letters
   
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  // 4 random digits
  const numbers = Math.floor(1000 + Math.random() * 9000); // ensures 4 digits

  return letters + numbers;
}
export async function generateUniqueCode() {
  let code;
  let exists = true;

  while (exists) {
    code = generateCode();
    exists = await CodeModel.exists({ code });
  }

  // save to DB immediately
  await CodeModel.create({ code });
  return code;
}

// Example
