import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import { ChessProvider } from "./components/ChessContext"

const rootElement = document.querySelector("#app")
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ChessProvider>
      <App />
    </ChessProvider>
  </React.StrictMode>
)
