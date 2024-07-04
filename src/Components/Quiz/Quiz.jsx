import React, { useState, useEffect } from "react";
import './Quiz.css';
import { data } from "../../assets/data";

function Quiz() {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [timerID, setTimerID] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    handleNext();
                    return 30;
                }
                return prevTime - 1;
            });
        }, 1000);
        setTimerID(timer);

        return () => clearInterval(timer);
    }, [index]);

    const checkAns = (e, ans) => {
        if (selected !== null) return;
        setSelected(ans);
        clearInterval(timerID);

        if (data[index].ans === ans) {
            e.target.classList.add("correct");
            setScore(prevScore => prevScore + 1);
        } else {
            e.target.classList.add("wrong");
            const correctIndex = data[index].ans - 1;
            const items = document.querySelectorAll(".container ol li");
            items[correctIndex].classList.add("correct");
        }
    };

    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
            setSelected(null);
            setTimeLeft(30);
            resetClasses();
        } else {
            setQuizCompleted(true);
            clearInterval(timerID);
        }
    };

    const resetClasses = () => {
        const items = document.querySelectorAll(".container ol li");
        items.forEach(item => {
            item.classList.remove("correct", "wrong");
        });
    };

    const resetQuiz = () => {
        setIndex(0);
        setSelected(null);
        setTimeLeft(30);
        setScore(0);
        setQuizCompleted(false);
    };

    if (quizCompleted) {
        return (
            <div className="container">
                <h1>Quiz Completed!</h1>
                <hr />
                <h2>Your Score: {score} / {data.length}</h2>
                <button onClick={resetQuiz}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>The Quiz App</h1>
            <hr />
            <h2>{index + 1}. {data[index].question}</h2>
            <ol>
                <li onClick={(e) => checkAns(e, 1)}>
                    {data[index].option1}
                </li>
                <li onClick={(e) => checkAns(e, 2)}>
                    {data[index].option2}
                </li>
                <li onClick={(e) => checkAns(e, 3)}>
                    {data[index].option3}
                </li>
                <li onClick={(e) => checkAns(e, 4)}>
                    {data[index].option4}
                </li>
            </ol>
            <button onClick={handleNext}>Next</button>
            <div className="index">{index + 1} of {data.length} questions</div>
            <div className="timer">Time left: {timeLeft} seconds</div>
        </div>
    );
}

export default Quiz;
