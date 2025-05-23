import { model, Schema } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true, trim: true },
  prefix: { type: String, required: true, trim: true },
  code: { type: Number, required: true, trim: true },
  credits: { type: Number, required: true, trim: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: { type: Boolean, default: false },
});

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
});

export const CourseFaculty = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);

export const Course = model<TCourse>("Course", courseSchema);
