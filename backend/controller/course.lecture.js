import uploadCloudniary from "../config/cloudniary.js";
import Course from "../model/course.model.js";
import Lecture from "../model/lecture.model.js";

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle   } = req.body;
    const { courseId } = req.params;

    // Validation
    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title or courseId are required",
      });
    }

    // Check course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Create lecture
    const lecture = await Lecture.create({
      lectureTitle,
      
      
    });

    // Push lecture into course
    course.lectures.push(lecture._id);
    await course.save();

    // Populate lectures
    await course.populate("lectures");

    return res.status(201).json({
      message: "Lecture created successfully",
      lecture,
      course,
    });
  } catch (error) {
    console.error("Error in createLecture controller:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(401).json({ message: "Course not Found" });
    }
    await course.populate("lectures");
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.log(error, "error in get lecture controller ");

    return res.status(500).json({
      message: `get  lecture     ${error}`,
    });
  }
};

  export const editLecture = async (req, res) => {
  try {
    console.log("REQ FILE:", req.file);

    const { lectureId } = req.params;
    const { lectureTitle, isPreviewFree } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (req.file) {
      const uploadResult = await uploadCloudniary(req.file.path);
      console.log("UPLOAD RESULT:", uploadResult);

      if (uploadResult?.secure_url) {
        lecture.videoUrl = uploadResult.secure_url;
        lecture.publicId = uploadResult.public_id;
      }
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    lecture.isPreviewFree = isPreviewFree === "true";

    await lecture.save();

    res.status(200).json({
      message: "Lecture updated",
      lecture,
    });
  } catch (error) {
    console.error("EDIT LECTURE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    if (!lecture) {
      return req.status(401).json({ message: "Lecture not Found" });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res.status(201).json({ message: "Course Removed" });
  } catch (error) {
    console.log(error, "error in remove  lecture controller ");

    return res.status(500).json({
      message: `get  remove lecture     ${error}`,
    });
  }
};
