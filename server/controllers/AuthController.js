import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import AddContact from "../models/AddContacts.js";

const AuthController = {
  // register controller
  register: async (req, res) => {
    const { name, email, password, mobile, gender, city } = req.body;

    try {
      const userExist = await User.findOne({ email });

      if (userExist)
        return res.status(400).json({ message: "Email already registered" });

      // hash the password

      // const hash = await bcrypt.hash(password,10);

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hash,
        mobile,
        gender,
        city,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Register Error:", error);
      res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    }
  },

  // login controller
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user)
        return res.status(404).json({ message: "Email and password not registered" });

      // node persist
      // const isLoggedIn = await storage.getItem(`loggedin:${email}`);
      // if (isLoggedIn) {
      //   return res.status(403).json({ message: "User already logged in" });
      // }

      // Password match using bcrypt

      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"})
      }

      // JWT Token Create

      const token = jwt.sign({id:user._id,email},process.env.JWT_SECRET,{expiresIn:"1d"});

      // Cookie Set

      const cookie = (token,"token",{
        httpOnly:true,
        secure:true,
        maxAge:24*60*60*1000,
      });

      // Mark this user as logged in
      // await storage.setItem(`loggedin:${email}`, true);

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  },

  addcontact: async (req, res) => {
    const { name, email, phone } = req.body;

    try {
      const newContact = new AddContact({ name, email, phone });
      await newContact.save();

      res.status(201).json({ message: "Contact added successfully" });
    } catch (error) {
      console.error("Error saving contact:", error);
      res
        .status(500)
        .json({ message: "Failed to add contact", error: error.message });
    }
  },

  // send data view contacts

  getcontacts: async (req, res) => {
    try {
      const contacts = await AddContact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch contacts",
        error: error.message,
      });
    }
  },

  // send users manage contacts

  getusers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  },

  // get single user

  getcontactbyid: async (req, res) => {
    try {
      const contact = await AddContact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch contact",
        error: error.message,
      });
    }
  },

  // update contact by id

  updatecontact: async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
      const updated = await AddContact.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true }
      );

      if (!updated)
        return res.status(404).json({ message: "Contact not found" });

      res.status(200).json({ message: "Contact updated", updated });
    } catch (error) {
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  },

  // delete contact by id

  deletecontact: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await AddContact.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json({ message: "Contact deleted successfully" });

      localStorage.setItem("email", user.email);
    } catch (error) {
      console.error("Error saving contact", error);
      res.status(500).json({ message: "Delete failed", error: error.message });
    }
  },

  // logout controller

  logout: async (req, res) => {
    const { email } = req.body;

    try {
      await storage.removeItem(`loggedin:${email}`);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Logout failed", error: error.message });
    }
  },
};

export default AuthController;
