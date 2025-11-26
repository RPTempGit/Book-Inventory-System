import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/">
                    <h1 className="text-xl font-semibold text-emerald-600">Book Inventory</h1>
                </Link>
                <nav className="flex items-center gap-3">
                    {user && (
                        <>
                            <span className="text-gray-600">{user.email} ({user.role})</span>
                            <Link to="/">Dashboard</Link>
                            <Link to="/transaction">Transaction</Link>
                            <Link to="/stocktake">Stock Take</Link>
                            <Link to="/reports">Reports</Link>
                            <button onClick={handleClick} className="border border-emerald-500 text-emerald-500 px-3 py-1 rounded">
                                Log out
                            </button>
                        </>
                    )}
                    {!user && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
