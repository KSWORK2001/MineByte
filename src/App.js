// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import CourseSelection from './pages/CourseSelection';
import TestYourSkills from './pages/TestYourSkills';
import Accomplishments from './pages/Accomplishments';
import QuizletPage from './pages/QuizletPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<CourseSelection />} />
          <Route path="/test-your-skills" element={<TestYourSkills />} />
          <Route path="/accomplishments" element={<Accomplishments />} />
          <Route path="/quizlet" element={<QuizletPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
