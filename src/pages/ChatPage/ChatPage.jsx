// import axios from 'axios';
// import React, { useState, useEffect } from 'react';



// const ChatPage = () => {
//   const [challengeIndex, setChallengeIndex] = useState(0);
//   const [code, setCode] = useState('');
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
//   const [codingChallenges, setCodingChallenges] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     // Fetch coding challenges from the API
//     axios.get('http://localhost:8080/question')
//       .then(response => {
//         // Set the coding challenges to the fetched data
//         setCodingChallenges(response.data);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching coding challenges:', error);
//       });
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const currentChallenge = codingChallenges[challengeIndex];
  


//   const handleNextChallenge = () => {
//     const nextIndex = challengeIndex + 1;
//     if (nextIndex < codingChallenges.length) {
//       setChallengeIndex(nextIndex);
//       setCode('');
//       setIsAnswerCorrect(null);
//     }
//   };

//   const handleRunCode = () => {
//     const currentChallenge = codingChallenges[challengeIndex];
//     const expectedOutput = eval(currentChallenge.solution);
  
//     try {
//       const userOutput = eval(code);
//       setIsAnswerCorrect(userOutput === expectedOutput);
//     } catch (error) {
//       setIsAnswerCorrect(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Coding Challenge</h1>
//       <div className="question-container">
//         <h2 className="subtitle">Question</h2>
//         <p className="question">{currentChallenge.question}</p>
//       </div>
//       <div className="code-container">
//         <h2 className="subtitle">Your Answer</h2>
//         <textarea
//           className="textarea"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           rows={10}
//           cols={50}
//         />
//       </div>
//       <div className="code-container">
//         <h2 className="subtitle">Result</h2>
//         {isAnswerCorrect !== null && (
//           <div className="validation-message">
//             {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
//           </div>
//         )}
//       </div>
//       <div className="button-container">
//         <button className="run-button" onClick={handleRunCode}>
//           Run Code
//         </button>
//         <button
//           className="next-button"
//           onClick={handleNextChallenge}
//           disabled={isAnswerCorrect === false}
//         >
//           Next Challenge
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import './ChatPage.scss';



const ChatPage = () => {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [code, setCode] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [output, setOutput] = useState('');
  const [codingChallenges, setCodingChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch coding challenges from the API
    axios
      .get('http://localhost:8080/question')
      .then((response) => {
        // Set the coding challenges to the fetched data
        setCodingChallenges(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching coding challenges:', error);
      });
  }, []);

  if (isLoading) {
    return <div className="chat-page__loading">Loading...</div>;
  }

  const currentChallenge = codingChallenges[challengeIndex];

  const handleNextChallenge = () => {
    const nextIndex = challengeIndex + 1;
    if (nextIndex < codingChallenges.length) {
      setChallengeIndex(nextIndex);
      setCode('');
      setIsAnswerCorrect(null);
      setShowResult(false);
      setOutput(''); // Reset the output
    }
  };

  const handleCheckAnswer = () => {
    if (code.trim() === '') {
      setIsAnswerCorrect(false);
      setShowResult(true);
      setOutput('No code provided.'); // Set the output
    } else {
      const currentChallenge = codingChallenges[challengeIndex];
      const expectedOutput = eval(currentChallenge.solution);
    
      try {
        const userOutput = eval(code);
        setIsAnswerCorrect(userOutput === expectedOutput);
        setShowResult(true);
        setOutput(userOutput); // Set the output
      } catch (error) {
        setIsAnswerCorrect(false);
        setShowResult(true);
        setOutput(error.toString()); // Set the error message as output
      }
    }
  };

  return (
    <div className="chat-page">
      <h1 className="chat-page__title">Coding Challenge</h1>
      <div className="chat-page__question-container">
        <h2 className="chat-page__subtitle">Question</h2>
        <p className="chat-page__question">{currentChallenge.question}</p>
      </div>
      <div className="chat-page__code-container">
        <h2 className="chat-page__subtitle">Your Answer</h2>
        <LiveProvider code={code}>
          <LiveEditor onChange={setCode} className="chat-page__code-editor" />
          <LivePreview />
          {code !== ""  && <LiveError />}
        </LiveProvider>
        
      </div>
      <div className="chat-page__result-container">
        {showResult && (
          <>
            <h2 className={`chat-page__result-title ${isAnswerCorrect ? 'chat-page__result-title--correct' : 'chat-page__result-title--incorrect'}`}>
              {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
            </h2>
            <p className="chat-page__output">{output}</p>
          </>
        )}
      </div>
      <div className="chat-page__button-container">
        <button className="chat-page__check-answer-button" onClick={handleCheckAnswer}>
          Check Answer
        </button>
        <button
          className="chat-page__next-button"
          onClick={handleNextChallenge}
          disabled={isAnswerCorrect === false || !showResult}
        >
          Next Challenge
        </button>
      </div>
    </div>
  );
};

export default ChatPage;





