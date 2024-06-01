import User from "../models/UserSchema.js";
import Salon from "../models/SalonSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, phone, gender } = req.body;
  try {
    let user = null;

    if (role === "customer") {
      user = await User.findOne({ $or: [{ email }, { phone }] });
    } else if (role === "salon") {
      user = await Salon.findOne({ $or: [{ email }, { phone }] });
    }

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists,Please Login" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user based on role
    if (role === "customer") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        phone,
        role,
      });
    } else if (role === "salon") {
      user = new Salon({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    // Save the new user to the database
    await user.save();

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please Try Again",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const salon = await Salon.findOne({ email });
    const customer = await User.findOne({ email });
    if (customer) {
      user = customer;
    }
    if (salon) {
      user = salon;
    }

    //check if user exists or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare if passwords matches
    const isPasswordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatches) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    //if password matches we will generate auth toke
    const token = generateToken(user);

    const { password, role, appoinments, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully Login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
