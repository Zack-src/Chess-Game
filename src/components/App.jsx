import React, { useContext } from "react"
import Board from "./Board"
import { ChessContext } from "./ChessContext"
import CapturedPieces from "./CapturedPieces"

const App = () => {
    const {
        isGameStarted,
        startGame, resetGame,
        whiteTime, blackTime,
        whiteCaptures, blackCaptures,
        whiteNbMoves, blackNbMoves
    } = useContext(ChessContext)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {!isGameStarted && <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startGame}>Démarrer</button>}
            {isGameStarted && <button className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={resetGame}>Réinitialiser</button>}

            <div className="flex flex-col items-center">
                <div className="flex flex-row py-3 justify-between w-full">
                    <CapturedPieces pieces={blackCaptures} />
                    <div className="p-3 rounded-lg bg-slate-900 text-white">{formatTime(blackTime)}</div>
                </div>

                <Board />

                <div className="flex flex-row py-3 justify-between w-full">
                    <CapturedPieces pieces={whiteCaptures} />
                    <div className="p-3 rounded-lg bg-slate-300 text-black">{formatTime(whiteTime)}</div>
                </div>
            </div>

            <div> Nombres de coup des blancs : {whiteNbMoves} </div>
            <div> Nombres de coup des noirs : {blackNbMoves} </div>
        </div>
    )
}

export default App
