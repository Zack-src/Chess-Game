
import { WHITE } from "./Reducer"

export const pieceTypes = {
    PAWN: "pawn",
    KNIGHT: "knight",
    BISHOP: "bishop",
    ROOK: "rook",
    KING: "king",
    QUEEN: "queen"
}

export const createPiece = (color, type) => ({
    color,
    type,
    image: `img/${color}_${type}.svg`
})

export const isValidMove = (fromPosition, toPosition, boardState) => {
    switch (boardState[fromPosition].type) {
        case pieceTypes.PAWN:
            return isValidMovePawn(fromPosition, toPosition, boardState)
    
        case pieceTypes.KNIGHT:
            return isValidMoveKnight(fromPosition, toPosition)
    
        case pieceTypes.BISHOP:
            return isValidMoveBishop(fromPosition, toPosition, boardState)
    
        case pieceTypes.ROOK:
            return isValidMoveRook(fromPosition, toPosition, boardState)
    
        case pieceTypes.KING:
            return isValidMoveKing(fromPosition, toPosition)
    
        case pieceTypes.QUEEN:
            return isValidMoveQueen(fromPosition, toPosition, boardState)
    
        default:
            return false
    }
}
const getPositionCoordinates = (position) => {
    const col = position.charCodeAt(0)
    const row = parseInt(position[1], 10)

    return { col, row }
}
const isValidMovePawn = (fromPosition, toPosition, boardState) => {
    const { col: fromCol, row: fromRow } = getPositionCoordinates(fromPosition)
    const { col: toCol, row: toRow } = getPositionCoordinates(toPosition)
    const DIRECTION_WHITE = 1
    const DIRECTION_BLACK = -1
    const START_ROW_WHITE = 2
    const START_ROW_BLACK = 7
    const MOVE_ONE_STEP = 1
    const MOVE_TWO_STEPS = 2

    let direction = DIRECTION_BLACK
    let startRow = START_ROW_BLACK

    if (boardState[fromPosition].color === WHITE) {
        direction = DIRECTION_WHITE
        startRow = START_ROW_WHITE
    }

    if (fromCol === toCol) {
        if (toRow === fromRow + direction && !boardState[toPosition]) {
            return true
        }

        if (fromRow === startRow && toRow === fromRow + MOVE_TWO_STEPS * direction && !boardState[toPosition]) {
            const betweenPosition = `${String.fromCharCode(fromCol)}${fromRow + direction}`

            return !boardState[betweenPosition]
        }
    }

    if (toRow === fromRow + direction && Math.abs(toCol - fromCol) === MOVE_ONE_STEP) {
        return boardState[toPosition]
    }

    return false
}
const isValidMoveKnight = (fromPosition, toPosition) => {
    const { col: fromCol, row: fromRow } = getPositionCoordinates(fromPosition)
    const { col: toCol, row: toRow } = getPositionCoordinates(toPosition)
    const colDiff = Math.abs(toCol - fromCol)
    const rowDiff = Math.abs(toRow - fromRow)

    return (colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)
}
const isValidMoveBishop = (fromPosition, toPosition, boardState) => {
    const { col: fromCol, row: fromRow } = getPositionCoordinates(fromPosition)
    const { col: toCol, row: toRow } = getPositionCoordinates(toPosition)

    if (Math.abs(toCol - fromCol) !== Math.abs(toRow - fromRow)) {
        return false
    }

    const colStep = toCol > fromCol ? 1 : -1
    const rowStep = toRow > fromRow ? 1 : -1
    const distance = Math.abs(toCol - fromCol)
    
    for (let i = 1; i < distance; i+=1) {
        const intermediateCol = fromCol + i * colStep
        const intermediateRow = fromRow + i * rowStep
        const intermediatePosition = `${String.fromCharCode(intermediateCol)}${intermediateRow}`
        
        if (boardState[intermediatePosition]) {
            return false
        }
    }

    return true
}
const isValidMoveRook = (fromPosition, toPosition, boardState) => {
    const { col: fromCol, row: fromRow } = getPositionCoordinates(fromPosition)
    const { col: toCol, row: toRow } = getPositionCoordinates(toPosition)

    let colStep = 0
    let rowStep = 0

    if (fromCol !== toCol && fromRow !== toRow) {
        return false
    }

    if (fromCol !== toCol) {
        colStep = toCol > fromCol ? 1 :-1
    }

    if (fromRow !== toRow ) {
        rowStep = toRow > fromRow ? 1 :-1
    }
    
    const distance = fromCol === toCol ? Math.abs(toRow - fromRow) : Math.abs(toCol - fromCol)

    for (let i = 1; i < distance; i+=1) {
        const intermediateCol = fromCol + i * colStep
        const intermediateRow = fromRow + i * rowStep
        const intermediatePosition = `${String.fromCharCode(intermediateCol)}${intermediateRow}`

        if (boardState[intermediatePosition]) {
            return false
        }
    }

    return true
}
const isValidMoveKing = (fromPosition, toPosition) => {
    const { col: fromCol, row: fromRow } = getPositionCoordinates(fromPosition)
    const { col: toCol, row: toRow } = getPositionCoordinates(toPosition)
    const colDiff = Math.abs(toCol - fromCol)
    const rowDiff = Math.abs(toRow - fromRow)

    return (colDiff <= 1 && rowDiff <= 1)
}
const isValidMoveQueen = (fromPosition, toPosition, boardState) => (
    isValidMoveBishop(fromPosition, toPosition, boardState) || isValidMoveRook(fromPosition, toPosition, boardState)
)