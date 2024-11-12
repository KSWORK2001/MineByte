import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./MainPage.css";
import { useAuth } from "../contexts/AuthProvider";

const MainPage = ({ username }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEnrolledCourses(userData.courses || []);
        } else {
          console.log("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching enrolled courses: ", error);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  return (
    <div className="main-page">
      <div className="left-section">
        <h2>Welcome, {username}!</h2> {/* Display the username */}
        <div className="progress">Progress</div>
        <div className="stats">Stats</div>
      </div>
      <div className="right-section">
        <div className="profile">Profile</div>
        <div className="highlights">Highlights</div>
        <div className="courses-summary">
          <h3>Courses Summary</h3>
          <ul>
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course, index) => (
                <li key={index} style={{ paddingTop: "5px" }}>
                  <strong>{course.title}</strong>: {course.description} -{" "}
                  {course.learningHours} hours
                </li>
              ))
            ) : (
              <p>No enrolled courses yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
