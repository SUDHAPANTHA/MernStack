// const express = require("express");
import express from "express"; // this is for ES6 i
import bcrypt from "bcryptjs";
import cors from "cors";
const app = express();
import multer from "multer";

//importing database connection in index.js
// import "./dbconfig/conn.js";
import connectDB from "./dbconfig/conn.js";
import StudentModel from "./models/student-model.js";
import AdminModel from "./models/admin-model.js";
import BookModel from "./models/book-model.js";

//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//multer configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//first api
app.get("/home", (req, res) => {
  res.send("This is home page");
});

//second api
app.get("/product/page", (req, res) => {
  res.json({ msg: "Prduct page" });
});

//API regester the student in database
app.post("/student-register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    //check if email already exists
    const checkEmail = await StudentModel.findOne({ email });

    if (checkEmail) {
      return res.status(404).json({ msg: `${email} already exists` });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user code
    const createStudent = new StudentModel({
      email,
      password: hashedPassword,
      name,
    });

    await createStudent.save();

    if (createStudent) {
      res.status(200).json({
        status: 200,
        msg: "user created successfully",
        data: createStudent,
      });
    } else {
      res.status(400).json({ msg: "failed to create user" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error!" });
  }
});

//API for Login student
app.post("/student-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation for empty fields
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "pasword and email both are required" });

    //check credentials
    const validateUser = await StudentModel.findOne({ email });
    if (!validateUser)
      return res.status(400).json({ msg: "Email address does not exist" });

    const isMatch = await bcrypt.compare(password, validateUser.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentails" });
    }

    if (validateUser && isMatch) {
      return res.status(200).json("Login successful");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error!", err: error.message });
  }
});

//API for Admin register
app.post("/admin-register", async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
    });

    await createAdmin.save();

    if (createAdmin) {
      return res.status(200).json({
        msg: "Admin create successfully",
        status: 200,
        data: createAdmin,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API for admin to get the all student details
app.get("/admin-get-student", async (_, res) => {
  try {
    const findAllStudent = await StudentModel.find();

    if (findAllStudent) {
      const totalStudent = findAllStudent.length;

      const data = findAllStudent.map((std) => {
        return {
          id: std._id,
          name: std.name,
          email: std.email,
        };
      });

      return res
        .status(200)
        .json({ studentdata: data, totalStudent: totalStudent });
    } else {
      return res.status(400).json({ msg: "No student found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API for admin login
app.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const findAdmin = await AdminModel.findOne({ email });

    if (!findAdmin) {
      return res.status(200).json({ msg: "Invalid Email address" });
    }

    const isMatch = await bcrypt.compare(password, findAdmin.password);

    if (!isMatch) {
      return res.status(200).json({ msg: "Invalid Credentials" });
    }
    if (findAdmin && isMatch) {
      return res
        .status(200)
        .json({ msg: "Login successful", status: 200, data: findAdmin });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API to store the Book
app.post("/upload-book", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const { bookname, author, genre, description, publishdate } = req.body;

    if (!bookname || !author || !genre || !description || !publishdate) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    //validation for not storing the multiple bookname
    const checkIfBookExist = await BookModel.findOne({ bookname });
    if (checkIfBookExist) {
      return res.status(400).json({ msg: `${bookname} book already exists` });
    }

    //storing the book in database
    const createBook = new BookModel({
      bookname,
      author,
      genre,
      description,
      publishdate,
      image: req.file.filename,
    });

    await createBook.save();

    if (createBook) {
      return res.status(200).json({
        status: 200,
        msg: "Book uploaded successfully",
        data: createBook,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API to update the single book
app.patch("/update-book/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //validation if id is wrong
    if (!id) {
      return res.status(400).json({ msg: "Book id is required" });
    }

    //upadting the book details
    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedBook) {
      return res.status(200).json({
        msg: "Book updated successfully",
        status: 200,
        data: updatedBook,
      });
    } else {
      return res.status(400).json({ msg: "Book not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API to delete the single book
app.delete("/delete-book/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "Book id is required" });
    }

    const deleteBook = await BookModel.findByIdAndDelete(id);

    if (deleteBook) {
      return res
        .status(200)
        .json({ msg: "Book deleted successfully", data: deleteBook.bookname });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API to get all the book details
app.get("/get-all-books", async (req, res) => {
  try {
    const findAllBook = await BookModel.find();

    if (findAllBook) {
      return res.status(200).json({
        msg: "Book found successfully",
        status: 200,
        allbooksdata: findAllBook,
      });
    } else {
      return res.status(400).json({ msg: "No book found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: error.message });
  }
});

//API to delete user
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await StudentModel.findByIdAndDelete(id);

    if (deletedStudent) {
      return res.status(200).json({
        msg: `${deletedStudent.name} deleted successfully`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
});

//connection function call
connectDB();

app.listen(3000, () => console.log("server is running on port 3000"));
