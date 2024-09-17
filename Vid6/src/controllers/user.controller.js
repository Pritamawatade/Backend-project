import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponcse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
  // register user here
  const { fullname, email, username, password } = req.body;
  console.log("email : ", email);

  if (
    [fullname, email, username, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const covnerImageLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(covnerImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user =  await User.create({
    fullname,
    avatar: avatar.url,
    converImage: coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase() 

  });

  // check if user is created or not 

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken "
  )

  if (!userCreated) {
    throw new ApiError(500, "Failed to create user");
  }

  return res.status(201).json(
    new ApiResponse(200, userCreated, "User created successfully")
  )
});

export { registerUser };
