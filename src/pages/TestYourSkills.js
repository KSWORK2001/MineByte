import React, { useState } from 'react';
import './TestYourSkills.css';

const displayNames = {
  Cpp: "C++",
  Java: "Java",
  Python: "Python"
};

const questions = {
  Cpp: {
    general: [
      "What is a pointer in C++ and how does it differ from a reference?",
      "Explain the concept of RAII (Resource Acquisition Is Initialization).",
      "What is the purpose of the 'const' keyword in C++?",
      "Describe the difference between stack and heap memory.",
      "What are virtual functions and how do they work?",
      "Explain the use of templates in C++.",
      "What is the significance of the 'this' pointer?",
      "What are destructors, and when are they called?",
      "Explain the concept of operator overloading.",
      "What is the role of the preprocessor in C++?"
    ],
    tasks: [
      "Write a program to implement a simple calculator using classes.",
      "Create a program that demonstrates the use of polymorphism.",
      "Implement a linked list and provide functions to add and remove elements.",
      "Write a C++ program that sorts an array using the quicksort algorithm.",
      "Create a program to read and write to a file in C++.",
      "Implement a basic banking system with deposit and withdrawal functionalities.",
      "Write a program that counts the number of vowels in a given string.",
      "Create a program that demonstrates exception handling.",
      "Implement a binary search algorithm.",
      "Write a program that converts a decimal number to binary."
    ],
  },
  Java: {
    general: [
      "What is the Java Virtual Machine (JVM) and how does it work?",
      "Explain the difference between '== ' and '.equals()' in Java.",
      "What are the access modifiers in Java?",
      "Describe the concept of inheritance and its types in Java.",
      "What is the significance of the 'static' keyword?",
      "Explain the difference between an interface and an abstract class.",
      "What are collections in Java? Name some common types.",
      "What is garbage collection and how does it work in Java?",
      "Explain the concept of multithreading in Java.",
      "What is the purpose of the 'final' keyword?"
    ],
    tasks: [
      "Write a Java program to find the factorial of a number using recursion.",
      "Create a program that demonstrates the use of interfaces.",
      "Implement a simple game (like Tic-Tac-Toe) in Java.",
      "Write a Java program that reads data from a file and displays it on the console.",
      "Create a program that reverses a string using a stack.",
      "Implement a basic CRUD application using ArrayList.",
      "Write a program that checks if a number is a palindrome.",
      "Create a Java program that counts the occurrences of each word in a given text.",
      "Implement a simple banking application with customer and account classes.",
      "Write a program to sort an array using bubble sort."
    ],
  },
  Python: {
    general: [
      "What is the difference between a list and a tuple in Python?",
      "Explain the concept of decorators in Python.",
      "What are Python generators, and how do they differ from regular functions?",
      "Describe the use of the 'self' keyword in Python classes.",
      "What is the significance of the __init__ method?",
      "Explain the concept of list comprehensions.",
      "What are lambda functions and how are they used?",
      "What is exception handling in Python?",
      "Describe the differences between Python 2 and Python 3.",
      "What is the purpose of the 'with' statement?"
    ],
    tasks: [
      "Write a Python function to find the Fibonacci sequence up to a given number.",
      "Create a program that implements a simple web scraper.",
      "Write a Python script to read a CSV file and calculate the average of a specific column.",
      "Implement a program that checks for prime numbers within a range.",
      "Create a Python program that generates a random password.",
      "Write a function that takes a string and returns the number of vowels.",
      "Implement a basic note-taking application using a dictionary.",
      "Create a program that counts the frequency of each word in a text file.",
      "Write a Python script to convert temperatures between Celsius and Fahrenheit.",
      "Implement a simple chatbot that can respond to basic questions."
    ],
  },
};


const TestYourSkills = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
  };

  const handleQuestionTypeSelection = (type) => {
    const languageQuestions = questions[selectedLanguage];
    const selectedQuestions = languageQuestions[type];
    const shuffledQuestions = selectedQuestions.sort(() => 0.5 - Math.random());
    setRandomQuestions(shuffledQuestions);  // Store all questions shuffled
    setQuestionType(type);
    setCurrentQuestionIndex(0); // Reset to the first question
    setUserCode(''); // Clear code input
    setOutput(''); // Clear output
    setUserAnswer(''); // Clear answer input
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % randomQuestions.length);
  };

  const handleSwitchLanguage = () => {
    setSelectedLanguage(null);
    setQuestionType(null);
    setRandomQuestions([]);
  };

  const handleLeavePage = () => {
    setShowDialog(true);
  };
  
  const confirmLeave = (confirm) => {
    if (confirm) {
      setSelectedLanguage(null);
      setQuestionType(null);
      setRandomQuestions([]);
    }
    setShowDialog(false);
  };

  const compileCode = async () => {
    const langMap = { Cpp: "cpp17", Java: "java", Python: "python3" };
    const program = {
      clientId: "36f806502c730771d012f71922db87dd", // Use your actual client ID
      clientSecret: "c596e6be1de1a6f141da38cb2aee2cc641c276fabe462862cb47a6a64d14c057", // Use your actual client secret
      script: userCode,
      language: langMap[selectedLanguage],
      versionIndex: "0",
    };

    try {
      const response = await fetch("https://api.jdoodle.com/v1/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(program),
      });
      const data = await response.json();
      setOutput(data.output || "Error: No output");
    } catch (error) {
      setOutput("Error: Unable to compile code.");
    }
  };

  return (
    <div className="skills-selection">
      {!selectedLanguage ? (
        <>
          <h2 style={{ marginTop: '50px' }}>Select a language to test your skills</h2>
          <div className="language-options">
            <button onClick={() => handleLanguageSelection('Cpp')}>C++</button>
            <button onClick={() => handleLanguageSelection('Java')}>Java</button>
            <button onClick={() => handleLanguageSelection('Python')}>Python</button>
          </div>
        </>
      ) : questionType === null ? (
        <div className="gen-or-task">  
          <h3>{displayNames[selectedLanguage]} Selected</h3>
          <h4>Select the type of question:</h4>
          <button onClick={() => handleQuestionTypeSelection('general')}>General Questions</button>
          <button onClick={() => handleQuestionTypeSelection('tasks')}>Tasks</button>
        </div>
      ) : (
        <>
          <div className="compiler-container">
            {questionType === 'tasks' && (
              <div className="compiler">
                <h3>{displayNames[selectedLanguage]} Compiler</h3>
                <textarea
                  rows="10"
                  cols="110"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder={`Write your ${displayNames[selectedLanguage]} code here...`}
                />
                <button onClick={compileCode}>Run Code</button>
                <div className="output">
                  <h4>Output:</h4>
                  <pre>{output}</pre>
                </div>
              </div>
            )}
            <div className="questions">
              <h3>{displayNames[selectedLanguage]} {questionType === 'general' ? 'General Questions' : 'Tasks'}</h3>
              <div className="question-item">
                <p>{randomQuestions[currentQuestionIndex]}</p>
              </div>
              {questionType === 'general' && (
                <textarea
                  rows="5"
                  cols="60"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
              )}
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          </div>
          
          <button className="leave-test-button" onClick={handleLeavePage}>Leave Test</button>
        </>
      )}
      
      {selectedLanguage && questionType === null && (
        <div className="alt-options">
          <button onClick={handleSwitchLanguage}>Switch Language</button>
          {/* Back button removed */}
        </div>
      )}
      
      {showDialog && (
        <div className="dialog">
          <p className="dialog-message">You won't be able to come back to this session. Are you sure you want to leave?</p>
          <div className="dialog-buttons">
            <button onClick={() => confirmLeave(true)}>Yes</button>
            <button onClick={() => confirmLeave(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestYourSkills;
