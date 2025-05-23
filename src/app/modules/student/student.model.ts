import { Schema, model } from "mongoose";

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  studentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name Is Required"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father Name Is Required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation Is Required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact Number Is Required"],
  },
  motherName: { type: String, required: [true, "Mother Name Is Required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation Is Required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact Number Is Required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local Guardian Name is Required"] },
  occupation: {
    type: String,
    required: [true, "Guardian Occupation is Required"],
  },
  contactNo: {
    type: String,
    required: [true, "Guardian Contact Number is Required"],
  },
  relationship: {
    type: String,
    required: [true, "Guardian Relationship is Required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel, studentMethods>({
  id: {
    type: String,
  },
  name: {
    type: userNameSchema,
    required: [true, "Your Name Is Required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User Id Is Required"],
    unique: true,
    ref: "User",
  },

  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "The Gender must be either male or female",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, "Contact Number Is Required"],
    unique: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact Number Is Required"],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address Is Required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "permanent Address Is Required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian Details Are Required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian Details Are Required"],
  },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicSemester",
  },
  isDeleted: { type: Boolean, default: false },
});

// Before find checked the isDeleted

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

studentSchema.methods.isExists = async function (
  email: string,

  contactNo: string
) {
  const student = await Student.findOne({
    $or: [{ email }, { contactNo }],
  });
  return student;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
