import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import DaughterComponent from './DaugtherComponent.jsx';

function App() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState({});

    const [counter , setCounter] = useState(0);
    
    const questions = [
        {   
            name: "gender",
            question: "what is your gender?",
            options: ["male", "female", "other", "prefer not to say"]
        },
        {
            name: "age",
            question: "what is your age group?",
            options: ["under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65 or older"]
        },
        {
            name: "favorite_language",
            question: "what is your favorite programming language?",
            options: ["JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Other"]
        },
        {
            name: "hours_per_week",
            question: "how many hours do you code per week?",
            options: ["0-5", "6-10", "11-20", "21-30", "31 or more"]
        },
        {
            name: "OS",
            question: "what is your preferred development environment?",
            options: ["Windows", "macOS", "Linux", "Other"]
        }
    ];

    const decrementReal = () => setCounter(prev => Math.max(0, prev - 1));

    const maxSteps = questions.length;
    const progress = ((step / maxSteps) * 100).toFixed(0) || 0

    const setAnswer = (answer) => {
        setAnswers(prev => (
            { ...prev, [questions[step].name]: answer }
        ));
        setStep(prev => prev + 1); 
    }


    const stepBack = () => {
        setAnswers(prev => (
            { ...prev, [questions[step - 1].name]: null }
        ));
        setStep(prev => prev - 1);
    }

    return (
        <div className="container">
            {counter}


            <button className="btn btn-primary" onClick={() =>setCounter(old => old + 1)}>Increment</button>
            <button className="btn btn-danger" onClick={() => decrementReal(counter)}>Decrement</button>
            <button className="btn btn-warning" onClick={() =>setCounter(0)}>Reset</button> 

            <DaughterComponent counter={counter} setCounter={setCounter} decrementReal={decrementReal}/>

            <div className="row">
                {/* brand logo */}
                <div className="brand col-sm-12 col-md-6 mx-auto center mb-3">
                    <img className='mx-auto' src="/src/assets/asiatalks.svg" alt="Logo" style={{maxWidth: "140px", display: "block"}}/>
                </div>
            </div>

            <div className="row">
                {/* progress bar */}
                { step < maxSteps &&
                <div>
                    <div className="col-sm-12 col-md-6 mx-auto progress mb-3 px-0" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: `${progress}%`}}>{progress}%</div>
                    </div>
                </div>
                }
            </div>

            <div className="row">
                {/* questions */}
                { 
                    questions.map((item, index)=>{
                        
                        if(index !== step) return null;

                        return (
                            <div className='quiz-container col-sm-12 col-md-6 mx-auto' key={index}>
                                <p className='muted mb-1'>Question {index + 1}</p>
                                <h4 className='mb-3'>{item.question}</h4>

                                <div className='answers d-grid gap-2 mb-4'>
                                    {item.options.map((option, optionIndex) => {
                                        return (
                                            <button className='btn btn-outline-primary' onClick={() => setAnswer(option)} key={optionIndex}>{option}</button>
                                        )
                                    })}
                                </div>
                                {   step > 0 && step <= maxSteps &&
                                    <div className='back'>
                                        <button className='btn btn-outline-secondary' onClick={stepBack}>Back</button>
                                    </div>
                                }
                            </div>
                        )
                    })
                }


                {/* results */}
                {
                    step === maxSteps ? (
                        <div className='quiz-container'>
                            <h3 className='mb-3'>Your Answers:</h3>
                            <ul className='list-group mb-4'>
                                {
                                    Object.keys(answers).map((key, index) => {
                                        return (
                                            <li className='list-group-item d-flex justify-content-between align-items-center' key={index} style={{textAlign: "left"}}>
                                                <span style={{textTransform: "capitalize"}}>{key.replaceAll("_", " ")}:</span>
                                                <span>{answers[key]}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className='restart'>
                                <button className='btn btn-outline-danger' onClick={() => (setStep(0) , setAnswers({}))}>Restart Quiz</button>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default App
