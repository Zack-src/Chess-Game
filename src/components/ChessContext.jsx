import React, { createContext, useEffect, useReducer } from "react"
import { initialState, chessReducer } from "./Reducer"

export const ChessProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chessReducer, initialState)
    const startGame = () => { dispatch({ type: "START_GAME" }) }
    const resetGame = () => { dispatch({ type: "RESET_GAME" }) }
    const movePiece = (fromPosition, toPosition) => { dispatch({ type: "MOVE_PIECE", payload: { fromPosition, toPosition } }) }
    const setSelectedPiece = (piecePosition) => { dispatch({ type: "SET_SELECTED_PIECE", payload: piecePosition }) }

    useEffect(() => {
        let timerId = null

        if (state.isGameStarted) {
            timerId = setInterval(() => {
                dispatch({ type: "DECREMENT_TIME" })
            }, 1000)
        }

        return () => {
            clearInterval(timerId)
        }
    }, [state.isGameStarted, dispatch])

    return (
    <ChessContext.Provider value={{ ...state, movePiece, startGame, resetGame, setSelectedPiece }}>
    {children}
    </ChessContext.Provider>
    )
}

export const ChessContext = createContext(null)