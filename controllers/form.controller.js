import { TutorFormModel } from "../models/tutorform.model.js"
import { generateUniqueCode } from "../utils/teacher.utils.js"
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const submitController = async (request, response) => {
    try {
        const { fullname, gender, email, phonenumber, qualification, subject, password, experience, confirmpassword, preferedmode, city, area, cityCode } = request.body;

        // Combined required fields check
        const requiredFields = { fullname, gender, email, phonenumber, qualification, subject, password, confirmpassword, preferedmode, city, area, cityCode, experience };
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) return response.status(400).send({ message: `${key} is required`, success: false });
        }

        if (confirmpassword !== password) return response.status(400).send({ message: "passwords are not matching", success: false });
        if (!/^[0-9]{10}$/.test(phonenumber)) return response.status(400).send({ message: "phone number should be of 10 digits", success: false });

        // Check existing tutor
        const find = await TutorFormModel.findOne({ phonenumber });
        if (find) return response.status(403).send({ message: "phone number already exists kindly login with tutor id", success: false });

        // Generate teacherId and hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const teacherId = `T${gender[0]}${cityCode}${await generateUniqueCode()}`;

        // Save document (same as original)
        const data = await new TutorFormModel({
            area, city, cityCode, fullname, gender, email, phonenumber,
            password: hashedPassword, preferedmode, qualification,
            experience, teacherId, subject
        }).save();

        return response.status(201).send({
            data,
            tid: teacherId,
            message: `Account created succesfully`,
            success: true
        });

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: "Internal server error", success: false });
    }
};

export const loginFunction = async (request, response) => {
    const { teacherId, password } = request.body
    if (!teacherId) return response.status(400).send({
        message: "teacher id is required",
        success: false
    })
    if (!password) return response.status(400).send({
        message: "password is required",
        success: false
    })

    const user = await TutorFormModel.findOne({ teacherId })

    if (!user) return response.status(404).send({
        message: "teacher id or password is incorrect",
        success: false
    })
    const compare = await bcrypt.compare(password, user.password)
    if (!compare) return response.status(403).send({
        message: 'either teacherId or password is incorrect',
        success: false
    })

    const token = await jwt.sign({ teacherId }, process.env.JWT_SECRET)
    return response.status(200).send({
        message: "login succesfull",
        token,


    })
}