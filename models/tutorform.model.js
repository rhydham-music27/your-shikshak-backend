import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    email: {
        type: String,

        required: true,
        lowercase: true,
        trim: true,
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/, // basic validation for Indian numbers
    },
    isFirstTime: {
        type: Boolean,
        required: true,
        unique: false,
        default: false // basic validation for Indian numbers
    },
    qualification: {
        type: String,
        trim: true,
    },
    subject: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    experience: {
        type: String,
        trim: true,
    },

    preferedmode: {
        type: String,
        default: "online", // false = offline, true = online (or vice versa)
    },
    city: {
        type: String,
        required: true,
    },
    cityCode: {
        type: String,
        required: true,
    },
    area: {
        type: [String],
        default: [],
    },
    teacherId: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});


export const TutorFormModel = mongoose.model('HomeTutorLeads', teacherSchema);
