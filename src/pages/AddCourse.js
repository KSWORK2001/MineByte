import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [learningHours, setLearningHours] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [courseDetails, setCourseDetails] = useState("");

  // Save course to Firebase
  const handleSave = async () => {
    try {
      const courseData = {
        courseName,
        learningHours,
        description,
        isFree,
        videoLink,
        courseDetails,
      };

      // Add course to 'courses' collection in Firebase
      await addDoc(collection(db, "courses"), courseData);
      alert("Course saved successfully!");

      // Clear form after submission
      setCourseName("");
      setLearningHours("");
      setDescription("");
      setIsFree(false);
      setVideoLink("");
      setCourseDetails("");
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
        maxWidth={400}
        width="100%"
      >
        <TextField
          label="Course Name"
          variant="outlined"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <TextField
          label="Learning Hours"
          variant="outlined"
          value={learningHours}
          onChange={(e) => setLearningHours(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="YouTube Video Link"
          variant="outlined"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          helperText="Enter the YouTube embed link"
        />
        <TextField
          label="Course Details"
          variant="outlined"
          multiline
          rows={6}
          value={courseDetails}
          onChange={(e) => setCourseDetails(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            />
          }
          label="Enroll for Free"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Course
        </Button>
      </Box>
    </Box>
  );
};

export default AddCourse;
