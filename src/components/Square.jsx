import React, { useContext } from "react"
import { ChessContext } from "./ChessContext"

const getSquareClasses = (isDarkSquare, isSelected) => {
    const baseColor = isDarkSquare ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-gray-700"

    return `w-12 h-12 flex justify-center items-center relative ${baseColor} ${isSelected ? "bg-yellow-600 border-2 border-white" : ""}`
}
const Square = ({ position }) => {
    const { boardState, selectedPiece, setSelectedPiece, movePiece, isGameStarted, currentPlayer } = useContext(ChessContext)
    const piece = boardState[position]
    const isDarkSquare = (position.charCodeAt(0) + Number(position[1])) % 2 === 0
    const isSelected = selectedPiece === position
    const isFirstCol = position.startsWith("a")
    const isLastRaw = position.endsWith("1")
    const handleSquareClick = () => {
        if (!isGameStarted) {
            return
        }

        if (piece && !selectedPiece) {
            if(currentPlayer !== piece.color) {
                return
            }

            setSelectedPiece(position)
        } 
        
        if (selectedPiece) {
            movePiece(selectedPiece, position)
        }
    }
    const squareClasses = getSquareClasses(isDarkSquare, isSelected)

    return (
    <div className={squareClasses} id={position} onClick={handleSquareClick}>
        {piece && (
            <img
                src={piece.image}
                alt={`${piece.color} ${piece.type}`}
                className="w-10 h-10"
            />
        )}
        {isFirstCol && <span className="absolute top-0 left-0 text-xs font-medium p-0.5">{position[1]}</span>}
        {isLastRaw && <span className="absolute bottom-0 right-0 text-xs font-medium p-0.5">{position[0]}</span>}
    </div>
    )
}

export default Square
