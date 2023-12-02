import React from "react"

const CapturedPieces = ({ pieces }) => {
    const countPieces = pieces.reduce((acc, piece) => {
        const key = `${piece.color}_${piece.type}`
        acc[key] = (acc[key] || 0) + 1

        return acc
    }, {})
    const pieceImages = Object.entries(countPieces).map(([key, count]) => {
        const [color, type] = key.split("_")

        return (
            <div key={key} className="flex items-center justify-center mr-2">
                <img className="w-10 h-10" src={`img/${color}_${type}.svg`} alt="" />
                <span className="text-xs font-bold">{count}</span>
            </div>
        )
    })

    return <div className="flex overflow-auto whitespace-nowrap">{pieceImages}</div>
}

export default CapturedPieces