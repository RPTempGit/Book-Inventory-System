import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { TransactionContextProvider } from "./context/TransactionContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <TransactionContextProvider>
                <App />
            </TransactionContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
)
