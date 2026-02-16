import uploadCloudniary from "../config/cloudniary.js";
import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwod");

    if (!user) {
      return res.status(401).json({
        message: "User Not found",
      });
    }

    res.status(201).json({
      message: "Get curruent User",
      user,
    });
  } catch (error) {
    console.log(error ,"error in getUser controller ");

    return res.status(500).json({
      message: `Get user  ${error}`,
    });
  }
};

 export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;
    let photoUrl;

    if (req.file) {
      const uploadResult = await uploadCloudniary(req.file.path);
      photoUrl = uploadResult.secure_url;  // ⭐ ONLY URL STORED
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        description,
        ...(photoUrl && { photoUrl }), // only update if file uploaded
      },
      { new: true } // ⭐ returns updated user
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile Updated",
      user,
    });
  } catch (error) {
    console.log(error, "error in profile controller");
    return res.status(500).json({
      message: `profile controller ${error}`,
    });
  }
};



export const getCreatorById = async (req ,res)=>{
  try {
    const {userId} = req.body

    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(401).json({message: "user not found"})
    }

     return res.status(201).json(user)
  } catch (error) {
     console.log(error, "error in get creator controller");
    return res.status(500).json({
      message: `get creator ${error}`,
    });
  }
}



