import React, { useState } from 'react'
import Loader from './UI/Loader'
import robotImage from '../assets/images/robot.gif'
import JOKES from '../jokes.json'
const Jokes = ({ speechSynth, voice }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})

  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.continuous = true;
  recognition.start()
  recognition.onresult = (e) => {
    if (e.results[e.results.length - 1][0].transcript.toLowerCase() === 'tell me a joke') {
      getRandomJokes()
    }
  }
 
  const textToSpeech = (text) => {
    const speaker = new SpeechSynthesisUtterance(text)
    speaker.voice = voice
    speechSynth.speak(speaker)
  }
  const getRandomJokes = () => {
    setIsLoading(true)
    // To make API Call for fetching JOKES
    const randomNumber = Math.floor(Math.random() * (JOKES.length - 0 + 1))
    const joke = {
      setup: JOKES[randomNumber].setup,
      punchline: JOKES[randomNumber].punchline
    }
    textToSpeech(joke.setup)
    textToSpeech(joke.punchline)
    setData(joke)
    setIsLoading(false)
  }
  return (
    <div className="none:container w-full h-screen flex items-center justify-center flex-col">
      <img
        src={robotImage}
        alt="Joke Teller"
        style={{
          height: '275px',
          width: '275px'
        }}
        className="mb-5 -ml-28"
      />
      <div className="w-1/2 h-50">
        <div>
          <button
            onClick={getRandomJokes}
            className="
          mx-auto 
          block 
          p-4 
          hover:pointer
          bg-slate-900 
          text-white 
          text-center 
          text-md 
          antialiased 
          capitalize 
          rounded ">
            tell me a joke
          </button>
          <p className="text-center mt-1 text-cyan-700 font-medium">You can also try saying "Tell me a joke"</p>
        </div>
        <div className="flex items-center border-box justify-center">
          {isLoading && <Loader />}
          {!isLoading && <div className="mt-5 w-100">
            <p className="text-cyan-900 text-xl font-bold text-center">{data.setup}</p>
            <p className="text-cyan-900 text-md font-medium mt-3 text-center">{data.punchline}</p>
          </div>}
        </div>
      </div>
    </div >
  )
}

export default Jokes