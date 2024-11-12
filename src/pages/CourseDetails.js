import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { Box, Typography, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../contexts/AuthProvider";

const CourseDetails = () => {
  const { courseName } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuth();

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

  console.log(user, "useruser");

  useEffect(() => {
    // Check if the user is already enrolled in the course
    const checkEnrollment = async () => {
      if (user && course) {
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const enrolledCourses = userData.courses || [];
          console.log(enrolledCourses, "enrolledCoursesenrolledCourses");

          setIsEnrolled(
            enrolledCourses.some((c) => c.title === course.courseName)
          );
        }
      }
    };

    checkEnrollment();
  }, [user, course]);

  const handleEnroll = async () => {
    try {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      const courseData = {
        title: course.courseName,
        description: course.description,
        learningHours: course.learningHours,
      };

      const userDocRef = doc(db, "users", user.uid);

      // Ensure the document exists or create it if not
      await setDoc(
        userDocRef,
        { courses: arrayUnion(courseData) },
        { merge: true }
      );

      console.log("Course added successfully!");
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course: ", error);
    }
  };

  console.log(course, "coursecourse");

  if (!course) return <Typography>Loading...</Typography>;

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
        <Typography variant="body1" paragraph>
          {course.isFree ? "Free" : "Paid"}
        </Typography>

        {course.videoLink && isEnrolled && (
          <Box mt={3} textAlign="center">
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Course Video:
            </Typography>
            <Box
              component="iframe"
              src={
                // Extract the src URL from the videoLink string using a regex
                course.videoLink.match(/src="([^"]*)"/)?.[1] || ""
              }
              width="100%"
              height="315"
              allow="autoplay; encrypted-media"
              allowFullScreen
              sx={{ borderRadius: "8px", border: "none" }}
            />
          </Box>
        )}

        {course.courseDetails && isEnrolled && (
          <Box mt={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Course Details:
            </Typography>
            <Typography variant="body1" paragraph>
              {course.courseDetails}
            </Typography>
          </Box>
        )}

        {!isEnrolled && (
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
              onClick={handleEnroll}
            >
              Enroll
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CourseDetails;
