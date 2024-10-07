import express from "express";
import { Student } from "../Models/studentModel.js";

let studentRoute = express.Router();

studentRoute.post("/", async (req, res) => {
    try {
        let { name, gender, course, isQualified, address } = req.body;
        console.log(req.body);
        if (!name || !gender || !course || isQualified === undefined || !address) {
            return res.status(400).send("Required name,gender,course,isQualified,address");
        }
        let newStudent = {
            name,
            gender,
            course,
            isQualified,
            address
        };
        let student = await Student.create(newStudent);
        return res.status(201).send(student);
        // return res.status(201).send('Student is created successfully');
    } catch (error) {
        res.status(500).send("Internal server Error");
        console.error(error);
    }
});


studentRoute.get("/", async (req, res) => {
    try {
        var students = await Student.find({});
        return res.status(200).send(students);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route for getting single student

studentRoute.get("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        var student = await Student.findById(id);
        return res.status(200).send(student);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

//Route for Delete a student

studentRoute.delete("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        var result = await Student.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).send({ message: "Student not found" });
        }
        return res
            .status(200)
            .send({ message: "Student deleted successfully from db" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

//Route for update a student in db

studentRoute.put("/:id", async (req, res) => {
    try {
        let { name, gender, course, isQualified, address } = req.body;
        if (!name || !gender || !course || isQualified === undefined || !address) {
            return res.status(400).send("Some error in frontend");
        }

        var { id } = req.params;
        var result = await Student.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(400).send({ message: "Student not found" });
        }
        return res
            .status(200)
            .send({ message: "Student updated successfully from db" });

        // return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});


export default studentRoute;