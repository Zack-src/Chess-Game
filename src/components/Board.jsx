import React, { useContext } from "react"
import Square from "./Square"
import { ChessContext } from "./ChessContext"

const BOARD_SIZE = 8
const Board = () => {
    const { isGameStarted } = useContext(ChessContext)
    const board = []

    for (let y = 0; y < BOARD_SIZE; y+=1) {
        const row = []

        for (let x = 0; x < BOARD_SIZE; x+=1) {
            const position = `${String.fromCharCode(97 + x)}${BOARD_SIZE - y}`
            row.push(
                <Square 
                    key={position} 
                    position={position} 
                    isGameStarted={isGameStarted}
                />
            )
        }

        board.push(
            <div key={y} className="flex">
                {row}
            </div>
        )
    }

    return (
        <div className="border border-gray-800 inline-block">
            {board}
        </div>
    )
}

export default Board
