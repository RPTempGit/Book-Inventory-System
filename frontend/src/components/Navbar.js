import { NavLink, Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()


    const handleClick = () => {
        logout()
    }

    return (
        <header style={{ background: "var(--primary)", boxShadow: "var(--card-shadow)" }}>
            <div style={{ maxWidth: 1400, margin: 0, padding: "0 0 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/" style={{ textDecoration: "none", marginLeft: 24 }}>
                        <h1 style={{ color: "#fff", fontWeight: 700, fontSize: 28, margin: "16px 32px 16px 0" }}>Book Inventory</h1>
                    </Link>
                    <nav style={{ display: "flex", alignItems: "center", gap: 0, marginLeft: 0 }}>
                        {user && (
                            <>
                                <NavLink
                                    to="/"
                                    end
                                    style={({ isActive }) => ({
                                        background: isActive ? "#fff" : "transparent",
                                        color: isActive ? "var(--primary)" : "#fff",
                                        fontWeight: 600,
                                        padding: "8px 18px",
                                        borderRadius: "var(--border-radius)",
                                        marginLeft: 0,
                                        marginRight: 8,
                                        textDecoration: "none",
                                        boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.08)" : "none",
                                        border: isActive ? "2px solid #fff" : "2px solid transparent",
                                        transition: "all 0.2s"
                                    })}
                                    onMouseOver={e => {
                                        if (!e.target.style.background || e.target.style.background === "transparent") {
                                            e.target.style.background = "rgba(255,255,255,0.18)";
                                        }
                                    }}
                                    onMouseOut={e => {
                                        if (!e.target.className.includes('active')) {
                                            e.target.style.background = "transparent";
                                        }
                                    }}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/transaction"
                                    style={({ isActive }) => ({
                                        background: isActive ? "#fff" : "transparent",
                                        color: isActive ? "var(--primary)" : "#fff",
                                        fontWeight: 600,
                                        padding: "8px 18px",
                                        borderRadius: "var(--border-radius)",
                                        marginLeft: 0,
                                        marginRight: 8,
                                        textDecoration: "none",
                                        boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.08)" : "none",
                                        border: isActive ? "2px solid #fff" : "2px solid transparent",
                                        transition: "all 0.2s"
                                    })}
                                    onMouseOver={e => {
                                        if (!e.target.style.background || e.target.style.background === "transparent") {
                                            e.target.style.background = "rgba(255,255,255,0.18)";
                                        }
                                    }}
                                    onMouseOut={e => {
                                        if (!e.target.className.includes('active')) {
                                            e.target.style.background = "transparent";
                                        }
                                    }}
                                >
                                    Transaction
                                </NavLink>
                                <NavLink
                                    to="/stocktake"
                                    style={({ isActive }) => ({
                                        background: isActive ? "#fff" : "transparent",
                                        color: isActive ? "var(--primary)" : "#fff",
                                        fontWeight: 600,
                                        padding: "8px 18px",
                                        borderRadius: "var(--border-radius)",
                                        marginLeft: 0,
                                        marginRight: 8,
                                        textDecoration: "none",
                                        boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.08)" : "none",
                                        border: isActive ? "2px solid #fff" : "2px solid transparent",
                                        transition: "all 0.2s",
                                        opacity: user.role === 'admin' ? 1 : 0.7,
                                        pointerEvents: user.role === 'admin' ? 'auto' : 'auto',
                                    })}
                                    onMouseOver={e => {
                                        if (!e.target.style.background || e.target.style.background === "transparent") {
                                            e.target.style.background = "rgba(255,255,255,0.18)";
                                        }
                                    }}
                                    onMouseOut={e => {
                                        if (!e.target.className.includes('active')) {
                                            e.target.style.background = "transparent";
                                        }
                                    }}
                                >
                                    Stock Take{user.role !== 'admin' && <span style={{ fontSize: 12, marginLeft: 4 }}>(View Only)</span>}
                                </NavLink>
                                <NavLink
                                    to="/reports"
                                    style={({ isActive }) => ({
                                        background: isActive ? "#fff" : "transparent",
                                        color: isActive ? "var(--primary)" : "#fff",
                                        fontWeight: 600,
                                        padding: "8px 18px",
                                        borderRadius: "var(--border-radius)",
                                        marginLeft: 0,
                                        marginRight: 8,
                                        textDecoration: "none",
                                        boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.08)" : "none",
                                        border: isActive ? "2px solid #fff" : "2px solid transparent",
                                        transition: "all 0.2s",
                                        opacity: user.role === 'admin' ? 1 : 0.7,
                                        pointerEvents: user.role === 'admin' ? 'auto' : 'auto',
                                    })}
                                    onMouseOver={e => {
                                        if (!e.target.style.background || e.target.style.background === "transparent") {
                                            e.target.style.background = "rgba(255,255,255,0.18)";
                                        }
                                    }}
                                    onMouseOut={e => {
                                        if (!e.target.className.includes('active')) {
                                            e.target.style.background = "transparent";
                                        }
                                    }}
                                >
                                    Reports{user.role !== 'admin' && <span style={{ fontSize: 12, marginLeft: 4 }}>(View Only)</span>}
                                </NavLink>
                            </>
                        )}
                    </nav>
                </div>
                {user ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ color: "#e0e0e0", marginRight: 18 }}>{user.email} ({user.role})</span>
                        <button onClick={handleClick} style={{
                            background: "#fff",
                            color: "var(--primary)",
                            border: "2px solid #fff",
                            padding: "8px 18px",
                            borderRadius: "var(--border-radius)",
                            fontWeight: 600,
                            marginLeft: 0,
                            marginRight: 8,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(40,54,80,0.08)",
                            transition: "background 0.2s, color 0.2s"
                        }}
                            onMouseOver={e => { e.target.style.background = "var(--primary-dark)"; e.target.style.color = "#fff"; }}
                            onMouseOut={e => { e.target.style.background = "#fff"; e.target.style.color = "var(--primary)"; }}
                        >
                            Log out
                        </button>
                    </div>
                ) : null}
            </div>
        </header>
                    {!user && (
                        <>
                            <NavLink
                                to="/login"
                                style={({ isActive }) => ({
                                    background: isActive ? "#fff" : "transparent",
                                    color: isActive ? "var(--primary)" : "#fff",
                                    fontWeight: 600,
                                    padding: "8px 18px",
                                    borderRadius: "var(--border-radius)",
                                    marginLeft: 0,
                                    marginRight: 8,
                                    textDecoration: "none",
                                    boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.08)" : "none",
                                    border: isActive ? "2px solid #fff" : "2px solid transparent",
                                    transition: "all 0.2s"
                                })}
                                onMouseOver={e => {
                                    if (!e.target.style.background || e.target.style.background === "transparent") {
                                        e.target.style.background = "rgba(255,255,255,0.18)";
                                    }
                                }}
                                onMouseOut={e => {
                                    if (!e.target.className.includes('active')) {
                                        e.target.style.background = "transparent";
                                    }
                                }}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                style={({ isActive }) => ({
                                    background: isActive ? "#fff" : "transparent",
                                    color: isActive ? "var(--primary)" : "#fff",
                                    fontWeight: 600,
                                    padding: "8px 18px",
                                    borderRadius: "var(--border-radius)",
                                    marginLeft: 0,
                                    marginRight: 8,
                                    textDecoration: "none",
                                    boxShadow: isActive ? "0 2px 8px rgba(40,54,80,0.08)" : "none",
                                    border: isActive ? "2px solid #fff" : "2px solid transparent",
                                    transition: "all 0.2s"
                                })}
                                onMouseOver={e => {
                                    if (!e.target.style.background || e.target.style.background === "transparent") {
                                        e.target.style.background = "rgba(255,255,255,0.18)";
                                    }
                                }}
                                onMouseOut={e => {
                                    if (!e.target.className.includes('active')) {
                                        e.target.style.background = "transparent";
                                    }
                                }}
                            >
                                Signup
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
