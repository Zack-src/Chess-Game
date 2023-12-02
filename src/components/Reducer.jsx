import { createPiece, pieceTypes, isValidMove } from "./Pieces"

const WHITE = "white"
const BLACK = "black"
const TEN_MIN_IN_SEC = 600
const moveSound = new Audio("/sound/move-self.mp3")
const captureSound = new Audio("/sound/capture.mp3")
const gameStartSound = new Audio("/sound/game-start.mp3")
const gameEndSound = new Audio("/sound/game-end.mp3")
const initialBoardSetup = () => {
    const board = {}

    board.a8 = createPiece(BLACK, pieceTypes.ROOK)
    board.b8 = createPiece(BLACK, pieceTypes.KNIGHT)
    board.c8 = createPiece(BLACK, pieceTypes.BISHOP)
    board.d8 = createPiece(BLACK, pieceTypes.QUEEN)
    board.e8 = createPiece(BLACK, pieceTypes.KING)
    board.f8 = createPiece(BLACK, pieceTypes.BISHOP)
    board.g8 = createPiece(BLACK, pieceTypes.KNIGHT)
    board.h8 = createPiece(BLACK, pieceTypes.ROOK)
    board.a7 = createPiece(BLACK, pieceTypes.PAWN)
    board.b7 = createPiece(BLACK, pieceTypes.PAWN)
    board.c7 = createPiece(BLACK, pieceTypes.PAWN)
    board.d7 = createPiece(BLACK, pieceTypes.PAWN)
    board.e7 = createPiece(BLACK, pieceTypes.PAWN)
    board.f7 = createPiece(BLACK, pieceTypes.PAWN)
    board.g7 = createPiece(BLACK, pieceTypes.PAWN)
    board.h7 = createPiece(BLACK, pieceTypes.PAWN)

    board.a1 = createPiece(WHITE, pieceTypes.ROOK)
    board.b1 = createPiece(WHITE, pieceTypes.KNIGHT)
    board.c1 = createPiece(WHITE, pieceTypes.BISHOP)
    board.d1 = createPiece(WHITE, pieceTypes.QUEEN)
    board.e1 = createPiece(WHITE, pieceTypes.KING)
    board.f1 = createPiece(WHITE, pieceTypes.BISHOP)
    board.g1 = createPiece(WHITE, pieceTypes.KNIGHT)
    board.h1 = createPiece(WHITE, pieceTypes.ROOK)
    board.a2 = createPiece(WHITE, pieceTypes.PAWN)
    board.b2 = createPiece(WHITE, pieceTypes.PAWN)
    board.c2 = createPiece(WHITE, pieceTypes.PAWN)
    board.d2 = createPiece(WHITE, pieceTypes.PAWN)
    board.e2 = createPiece(WHITE, pieceTypes.PAWN)
    board.f2 = createPiece(WHITE, pieceTypes.PAWN)
    board.g2 = createPiece(WHITE, pieceTypes.PAWN)
    board.h2 = createPiece(WHITE, pieceTypes.PAWN)

    return board
}
const initialState = {
    isGameStarted: false,
    currentPlayer: WHITE,
    boardState: initialBoardSetup(),
    selectedPiece: null,
    whiteTime: TEN_MIN_IN_SEC,
    blackTime: TEN_MIN_IN_SEC,
    whiteCaptures: [],
    blackCaptures: [],
    whiteNbMoves: 0,
    blackNbMoves: 0,
}
function handleMovePiece(state, action) {
    const { fromPosition, toPosition } = action.payload

    if (fromPosition === toPosition) {
        return { ...state, selectedPiece: null }
    }

    if (state.boardState[fromPosition].color === state.boardState[toPosition]?.color) {
        return { ...state, selectedPiece: toPosition }
    }

    if (!isValidMove(fromPosition, toPosition, state.boardState)) {
        return { ...state, selectedPiece: null }
    }
    
    const newBoard = { ...state.boardState }
    const capturedPiece = newBoard[toPosition]
    const newWhiteCaptures = [...state.whiteCaptures]
    const newBlackCaptures = [...state.blackCaptures]

    if (capturedPiece?.color === WHITE) {
        newBlackCaptures.push(capturedPiece)
    }

    if (capturedPiece?.color === BLACK) {
        newWhiteCaptures.push(capturedPiece)
    }

    newBoard[toPosition] = state.boardState[fromPosition]
    newBoard[fromPosition] = null

    if (capturedPiece) {
        captureSound.play()
    } else {
        moveSound.play()
    }

    let nexPlayer = null
    let newWhiteNbMoves = state.whiteNbMoves
    let newBlackNbMoves = state.blackNbMoves

    if (state.currentPlayer === WHITE) {
        nexPlayer = BLACK
        newWhiteNbMoves += 1
    }
    else {
        nexPlayer = WHITE
        newBlackNbMoves += 1
    }

    return {
        ...state,
        boardState: newBoard,
        whiteCaptures: newWhiteCaptures,
        blackCaptures: newBlackCaptures,
        currentPlayer: nexPlayer,
        selectedPiece: null,
        whiteNbMoves: newWhiteNbMoves,
        blackNbMoves: newBlackNbMoves
    }
}

function chessReducer(state, action) {
    switch (action.type) {
        case "START_GAME": {
            gameStartSound.play()
            
            return { ...state, isGameStarted: true }
        }

        case "RESET_GAME": {
            gameEndSound.play()

            return { ...initialState }
        }

        case "SET_SELECTED_PIECE": {
            return { ...state, selectedPiece: action.payload }
        }

        case "MOVE_PIECE": {
            return handleMovePiece(state, action)
        }

        case "DECREMENT_TIME": {
            const timeKey = state.currentPlayer === WHITE ? "whiteTime" : "blackTime"
            const newTime = state[timeKey] > 0 ? state[timeKey] - 1 : 0

            return { ...state, [timeKey]: newTime }
        }
        
        default:
            return state
    }
}

export { initialState, chessReducer, WHITE }