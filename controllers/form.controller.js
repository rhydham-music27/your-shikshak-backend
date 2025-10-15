import { TutorFormModel } from "../models/tutorform.model.js"
import { generateUniqueCode } from "../utils/teacher.utils.js"
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const submitController = async (request, response) => {
    const { fullname, gender, email, phonenumber, qualification, subject, password, experience, confirmpassword, preferedmode, city, area, cityCode } = request.body
    if (!fullname) return response.status(400).send({
        message: "preferedmode is required ",
        success: false
    })
    if (!email) return response.status(400).send({
        message: "email is required ",
        success: false
    })
    if (!preferedmode) return response.status(400).send({
        message: "preferedmode is required ",
        success: false
    })
    if (!city) return response.status(400).send({
        message: "city is required ",
        success: false
    })
    if (!area) return response.status(400).send({
        message: "area is required ",
        success: false
    })
    if (!cityCode) return response.status(400).send({
        message: "cityCode is required ",
        success: false
    })
    if (!password) return response.status(400).send({
        message: "password is required ",
        success: false
    })
    if (!confirmpassword) return response.status(400).send({
        message: "confirmpassword is required ",
        success: false
    })
    if (!experience) return response.status(400).send({
        message: "experience is required ",
        success: false
    })
    if (!gender) return response.status(400).send({
        message: "gender is required ",
        success: false
    })
    if (!subject) return response.status(400).send({
        message: "subject is required ",
        success: false
    })
    if (!phonenumber) return response.status(400).send({
        message: "phonenumber is required ",
        success: false
    })
    if (phonenumber.length > 10) return response.status(400).send({
        message: "phone number should be of 10 numbers"
    })
    if (!qualification) return response.status(400).send({
        message: "qualification is required ",
        success: false
    })
    if (confirmpassword !== password) return response.status(400).send({
        message: "passwords are not matching",
        success: false
    })

    const find = await TutorFormModel.findOne({ phonenumber })
    if (find) return response.status(403).send({
        message: "phone number already exists kindly login with tutor id",
        success: false
    })
    const num = Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(password, 10)
    const teacherId = `T${gender[0]}${cityCode}${await generateUniqueCode()}`
    const data = await new TutorFormModel({ area, city, cityCode, fullname, gender, email, phonenumber, password: hashedPassword, preferedmode, qualification, experience, teacherId, subject }).save()
    return response.status(201).send({
        data,
        tid: teacherId
        , message: `Account created succesfully`,
        success: true
    })
}
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