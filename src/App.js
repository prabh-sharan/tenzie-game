
import './App.css';
import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

    const [isPlaying , setIsPlaying]= React.useState(false)

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [turnCount, setTurnCount]=React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)

        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
/**
   Allow the user to play a new game when the
 * button is clicked and they've already won
 */
    
    function rollDice() {
 
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))

            setTurnCount(prevState =>prevState+1)

            if(turnCount=== 0)
                 setIsPlaying( prevState => !prevState)
            

        } else {
            setTenzies(false)
            setDice(allNewDice())
            setTurnCount(0)
            setIsPlaying(prevState => !prevState)
        }


    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main id="main">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
                id="rollBtn"
            >
                {tenzies ? "New Game" : "Roll"}
            </button>

            <h3>No. of turns : {turnCount}</h3>

        </main>
    )
 
}
