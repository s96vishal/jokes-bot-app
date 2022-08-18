import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Jokes from './components/Jokes';
import SelectBox from './components/UI/SelectBox';




function App() {
  const syth = window.speechSynthesis
  const [voices, setVoices] = useState(syth.getVoices())
  const [voice, setVoice] = useState({})
  const onChangeHandler = (e) => {
    const el = voices.find((vo => vo.name === e.target.value))
    console.log(el)
    setVoice(el)
  }

  const populateVoices = useCallback(() => {
    setVoices(syth.getVoices())
  }, [])

  useEffect(() => {
    populateVoices()
    setVoice(voices[0])
  }, [populateVoices])
  return <>
    {voices && <SelectBox options={voices} onChange={onChangeHandler} />}
    <Jokes speechSynth={syth} voice={voice} />
  </>
}

export default App;
