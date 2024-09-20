import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndrefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("user = ",user);
    
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong when generating access token"
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  // register user here
  const { fullName, email, username, password } = req.body;
  
  if (
    [fullName, email, username, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if(!username && !email) {
    throw new ApiError(400, "Username and email is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  // check if user is created or not

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!userCreated) {
    throw new ApiError(500, "Failed to create user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // it will search through the databse to find either the username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "user not found please register");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndrefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged In Successfully"
      )
    )
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const option ={
    httpOnly: true,
    secure: true,
  }

  return res
  .status(200)
  .clearCookie("accessToken", option)
  .clearCookie("refreshToken", option)
  .json(
    new ApiResponse(200, {}, "User logged out successfully")
  )
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken  = req.cookies.refreshToken || req.body.refreshToken
  
  if(!incomingRefreshToken){
    throw new ApiError(401, "No refresh token provided")
  }
try {
  
    const decondedToken = jwt.verify( incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
    const user = await User.findById(decondedToken?._id)
  
    if(!user){
      throw new ApiError(401, "Invalid refresh Token")
    }
  
    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401, "Invalid refresh Token or token is expired")
    }
  
    const options = {
      httpOnly: true,
      secure: true,
    
    }
  // 25 min vid access and refreshtokrn
    const {accessToken, newRefreshToken} = await generateAccessAndrefreshToken(user._id)
    return res
    .status(200)
    .cookie("accessToken", accessToken, options) 
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(200, {
        accessToken, 
        refreshToken: newRefreshToken
      }, 
      "Access token refreshed successfully")
    )
} catch (error) {
  throw new ApiError(401, error?.message || "Invalid refresh token")
}
})
export { registerUser, loginUser, logoutUser, refreshAccessToken };
