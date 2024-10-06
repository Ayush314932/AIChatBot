import { useState } from 'react';
import './App.css';
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading...");
    
    // Access the API key from the environment variable
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      method: "post",
      data: {
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ],
      },
    });

    setAnswer(response.data.candidates[0].content.parts[0].text);
  }

  return (
    <>
      <h1 className='bg-red-300'>chat bot</h1>
      <textarea 
        className='border rounded w-full placeholder:center'
        value={question} 
        onChange={(e) => setQuestion(e.target.value)}
        cols="30" 
        rows="10"
        placeholder='Ask anything to me??'
      >
      </textarea>
      
      <button onClick={generateAnswer} className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...'>
        generate answer
      </button>
    
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center flex justify-center rounded-lg bg-black my-4 shadow-lg">
        <ReactMarkdown className="p-4 justify-center items-center">{answer}</ReactMarkdown>
      </div>
    </>
  );
}

export default App;
