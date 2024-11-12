// CourseDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Box, Typography, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CourseDetails = () => {
  const { courseName } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const coursesCollection = collection(db, "courses");
      const q = query(coursesCollection, where("courseName", "==", courseName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setCourse(querySnapshot.docs[0].data());
      }
    };

    fetchCourse();
  }, [courseName]);

  if (!course) return <Typography>Loading...</Typography>;

  // Links to add to each course
  const usefulLinks = {
    Python: [
      "https://www.w3schools.com/python/python_intro.asp",
      "https://www.w3schools.com/python/python_getstarted.asp",
      "https://www.w3schools.com/python/python_syntax.asp",
      "https://www.w3schools.com/python/python_comments.asp",
    ],
    HTML: [
      "https://www.w3schools.com/html/html_intro.asp",
      "https://www.w3schools.com/html/html_editors.asp",
      "https://www.w3schools.com/html/html_basic.asp",
      "https://www.w3schools.com/html/html_elements.asp",
    ],
  };

  // Get the course-specific links
  const links = usefulLinks[courseName] || [];

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper
        elevation={3}
        sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
      >
        <Typography variant="h4" gutterBottom>
          {course.courseName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Description:
        </Typography>
        <Typography variant="body1" paragraph>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Learning Hours:
        </Typography>
        <Typography variant="body1" paragraph>
          {course.learningHours} hours
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Enrollment:
        </Typography>
        <Typography variant="body1">
          {course.isFree ? "Free" : "Paid"}
        </Typography>

        {/* Displaying the useful links */}
        {links.length > 0 && (
          <>
            <Typography variant="h6" mt={3}>
              Useful Links:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.map((link, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  href={link}
                  target="_blank"
                >
                  {`Link ${index + 1}`}
                </Button>
              ))}
            </Box>
          </>
        )}

        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={2}
        >
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={{ background: "#6B73E8" }}
          >
            Enrol
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CourseDetails;
