import './App.css'

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './store'

import { useState } from 'react';

function App() {

let [changeStep, setChangeStep] = useState(1)

const counter = useSelector(state => state.store);
const dispatch = useDispatch();

  return (
    <>
        <input type="number" value={changeStep} onChange={(e) => setChangeStep(e.target.value)} />
        <br />
        {counter.value}
        <br />
        <button onClick={() => dispatch(increment(changeStep))}>+{changeStep}</button>
        <button onClick={() => dispatch(decrement(changeStep))}>-{changeStep}</button>
        <button onClick={() => dispatch(reset())}>reset</button>
    </>
  )
}

export default App
