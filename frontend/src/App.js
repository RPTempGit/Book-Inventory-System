import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import StockTakePage from "./pages/StockTakePage"
import ReportsPage from "./pages/ReportsPage"

function App() {
    const { user } = useAuthContext()

    return (
        <BrowserRouter>
            <Navbar />
            <div className="p-4 max-w-6xl mx-auto">
                <Routes>
                    <Route 
                        path="/" 
                        element={user ? <Home /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/stocktake" 
                        element={user ? <StockTakePage /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/reports" 
                        element={user ? <ReportsPage /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/login" 
                        element={!user ? <Login /> : <Navigate to="/" />} 
                    />
                    <Route 
                        path="/signup" 
                        element={!user ? <Signup /> : <Navigate to="/" />} 
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
