import uploadCloudniary from "../config/cloudniary.js";
import Course from "../model/course.model.js";

export const courseController = async (req, res) => {
  try {
    const { title, description, price, category, SubTitle } = req.body;
    console.log("🔥 Course API Hit Hua");

    if (!title || !category) {
      return res.status(401).json({
        message: "Title and Category is required",
      });
    }

    const course = await Course.create({
      title,
      description,
      price,
      category,
      SubTitle,
      creator: req.userId,
    });

    return res.status(201).json({
      message: "Course cretaed Successfully",
      course,
    });
  } catch (error) {
    console.log(error, "error in course controller ");

    return res.status(500).json({
      message: `course controller   ${error}`,
    });
  }
};

export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate("lectures");
    if (!courses) {
      return res.status(401).json({
        message: "Course is not Found",
      });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error ,"error in get published course controller ");

    return res.status(500).json({
      message: `get published course   ${error}`,
    });
  }
};

export const creatorController = async (req, res) => {
  try {
    const userId = req.userId;
    const course = await Course.find({ creator: userId });
    if (!course) {
      return res.status(401).json({
        message: " creator Course is not Found",
      });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.log(error ,"error in creator course controller ");

    return res.status(500).json({
      message: `creator  course   ${error}`,
    });
  }
};

 export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      price,
      level,
      category,
      isPublished,
    } = req.body;

    

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Edit Course not found",
      });
    }
   
   // Convert isPublished to boolean
    const isPublishedBoolean =
      isPublished === "true" || isPublished === true ? true : false;

    // Clean price (convert to number)
    const priceNumber = price ? Number(price) : course.price;

    let thumbnail;

    if (req.file) {
      thumbnail = await uploadCloudniary(req.file.path);
    }

    const updateData = {
      title,
      subTitle,
      description,
      price: priceNumber,
      level: level || course.level,          // keep old level if empty
      category,
      isPublished: isPublishedBoolean,
      thumbnail: course.thumbnail             // preserve old thumbnail
    };

    if (thumbnail) {
      updateData.thumbnail = thumbnail.secure_url; // replace only if new image uploaded
    }

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json(course);
  } catch (error) {
    console.error("error in edit course controller ", error);

    return res.status(500).json({
      message: `Edit course error: ${error.message}`,
    });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        message: " get course by id is not Found",
      });
    }

    return res.status(200).json(course);
  } catch (error) {
    console.log(error , "error in edit course controller ");

    return res.status(500).json({
      message: `get course by id course   ${error}`,
    });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        message: " get course by id is not Found",
      });
    }
    course = await Course.findByIdAndDelete(courseId, { new: true });
    return res.status(200).json({ message: "Course Remove Successfully" });
  } catch (error) {
    console.log("Remove  course controller ");

    return res.status(500).json({
      message: `Remove course   ${error}`,
    });
  }
};
