import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import leagueLogo from '../assets/league-logo.png'

function Dashboard () {
    const [username, setUsername] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
            return
        }
        const decoded = jwtDecode(token)
        setUsername(decoded.username)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownOpen) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [dropdownOpen])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <div style={{ fontFamily: 'Rajdhani, sans-serif', background: '#0a0a0f', minHeight: '100vh', color: 'white' }}>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .game-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                    text-decoration: none;
                }
                .game-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px rgba(200, 155, 60, 0.2);
                }
                .game-card-cs2:hover {
                    box-shadow: 0 20px 60px rgba(255, 107, 53, 0.1);
                }
                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    right: 0;
                    background: #13131a;
                    border: 1px solid rgba(200, 155, 60, 0.2);
                    border-radius: 8px;
                    min-width: 180px;
                    overflow: hidden;
                    z-index: 200;
                }
                .dropdown-item {
                    display: block;
                    padding: 0.75rem 1.25rem;
                    color: #a0a0b0;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 550;
                    transition: background 0.2s ease, color 0.2s ease;
                    cursor: pointer;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                    font-family: Rajdhani, sans-serif;
                }
                .dropdown-item:hover {
                    background: rgba(200, 155, 60, 0.1);
                    color: #C89B3C;
                }
                .dropdown-divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.05);
                    margin: 0;
                }
                .nav-game-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    text-decoration: none;
                    font-family: Bebas Neue, sans-serif;
                    font-size: 1rem;
                    letter-spacing: 0.08em;
                    transition: background 0.2s ease;
                }
                .nav-game-btn:hover {
                    background: rgba(255, 255, 255, 0.05)
                }
            `}</style>

            {/* Navbar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(10, 10, 15, 0.98)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(200, 155, 60, 0.2)'
            }}>
                <a href="/dashboard" style={{ textDecoration: 'none' }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#C89B3C', letterSpacing: '0.15em' }}>RIFT & RIFLE</span>
                </a>

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setDropdownOpen(!dropdownOpen)}
                        }
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(200, 155, 60, 0.2)',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            color: 'white',
                            cursor: 'pointer',
                            fontFamily: 'Rajdhani, sans-serif',
                            fontSize: '1rem',
                            fontWeight: 600
                        }}
                    >
                        <span>{username}</span>
                        <span style={{ color: '#C89b3c', fontSize: '0.7rem' }}>▼</span>
                    </button>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="/profile" className="dropdown-item">My Profile</a>
                            <a href="/settings" className="dropdown-item">Settings</a>
                            <div className="dropdown-divider" />
                            <button onClick={handleLogout} className="dropdown-item" style={{ color: '#ff4757' }}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem 4rem' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'slideUp 0.6s ease forwards' }}>
                    <p style={{ color: '#a0a0b0', fontSize: '1.1rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Welcome back</p>
                    <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.5rem', letterSpacing: '0.1em', color: '#f0e6d3', margin: '0 0 0.5rem' }}>{username}</h1>
                    <p style={{ color: '#a0a0b0', fontSize: '1.1rem', fontWeight: 500 }}>Select a game to view your stats</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '900px', width: '100%' }}>

                    {/* League Card */}
                    <a href="/league" className="game-card" style={{
                        background: 'linear-gradient(135deg, rgba(100, 155, 60, 0.08) 0%, rgba(200, 155, 60, 0.02) 100%)',
                        border: '1px solid rgba(200, 155, 60, 0.3)',
                        borderRadius: '16px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <img src={leagueLogo} alt="League of Legends" style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'block', margin: '0 auto 1rem', border: '2px solid rgba(200,155,60,0.4)', objectFit: 'cover' }} />
                        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', letterSpacing: '0.1em', color: '#c89b3c', margin: '0 0 0.75rem' }}>LEAGUE OF LEGENDS</h2>
                        <p style={{ color: '#a0a0b0', fontSize: '1.1rem', lineHeight: 1.6, margin: '0 0 1.5rem', fontWeight: 600 }}>Rank tracking, match history, champion history and live game data</p>
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #c89b3c, #785a28)',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '4px',
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '0.1em'
                        }}>VIEW STATS</span>
                    </a>

                    {/* CS2 Card */}
                    <div className="game-card game-card-cs2" style={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.04) 0%, rgba(255, 107, 53, 0.01) 100%)',
                        border: '1px solid rgba(255, 107, 53, 0.15)',
                        borderRadius: '16px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        opacity: 0.6,
                        cursor: 'not-allowed'
                    }}>
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/csgo/images/csgo_react/global/logo_cs_sm.svg" alt="Counter-Strike 2" style={{ width: '80px', height: '80px', display: 'block', margin: '0 auto 1rem', objectFit: 'contain' }} />
                        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', letterSpacing: '0.1em', color: '#ff6b35', margin: '0 0 0.75rem' }}>COUNTER-STRIKE 2</h2>
                        <p style={{ color: '#a0a0b0', fontSize: '1.1rem', lineHeight: 1.6, margin: '0 0 1.5rem', fontWeight: 600 }}>K/D ratio, match stats, map win rates and rank history</p>
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255, 107, 53, 0.15)',
                            color: '#ff6b35',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '4px',
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '0.1em',
                            border: '1px solid rgba(255, 107, 53, 0.3)'
                        }}>COMING SOON</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard