import React, { useRef, useState } from 'react';
import './Tictactoe.css';
import circle_icon from './Assets/circle_icon.png';
import cross_icon from './Assets/cross_icon.png';

let data = ["", "", "", "", "", "", "", "", ""];

const Tiktaktoe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='X'>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' alt='O'>`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }

        // If all boxes are filled and no winner, it's a draw
        if (!data.includes("")) {
            titleRef.current.innerHTML = 'Draw! Reset to Play Again';
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}' alt='X'> wins!`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}' alt='O'> wins!`;
        }
    };

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        const boxes = document.querySelectorAll(".boxes");
        boxes.forEach((box) => (box.innerHTML = ""));
        titleRef.current.innerHTML = 'Tic Tac Toe Game in <span>React</span>';
        setCount(0);
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
            <div className='board'>
                {[...Array(9)].map((_, index) => (
                    <div
                        key={index}
                        className='boxes'
                        onClick={(e) => toggle(e, index)}
                    ></div>
                ))}
            </div>
            <button className='reset' onClick={reset}>Reset</button>
        </div>
    );
};

export default Tiktaktoe;
