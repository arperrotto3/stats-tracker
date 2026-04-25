import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await axios.post('/api/auth/register', { username, email, password })
            localStorage.setItem('token', response.data.token)
            window.location.href = '/dashboard'
        } catch {
            setError('Something went wrong. Please try again.')
        }
        setLoading(false)
    }

    return (
        <div style={{ fontFamily: 'Rajdhani, sans-serif', background: '#0a0a0f', minHeight: '100vh', color: 'white' }}>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .register-card {
                    animation: slideUp 0.6s ease forwards;
                }
                .input-field {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    padding: 0.85rem 1rem;
                    color: white;
                    font-family: Rajdhani, sans-serif;
                    font-size: 1rem;
                    font-weight: 500;
                    outline: none;
                    transition: border-color 0.2s ease;
                    box-sizing: border-box;
                }
                .input-field:focus {
                    border-color: #C89B3C;
                }
                .input-field:placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }
                .submit-btn {
                    width: 100%;
                    background: linear-gradient(135deg, #C89B3C 0%, #785A28 100%);
                    color: white;
                    border: none;
                    padding: 0.9rem;
                    border-radius: 4px;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.2rem;
                    letter-spacing: 0.15em;
                    cursor: pointer;
                    transition: opacity 0.2s ease;
                }
                .submit-btn:hover {
                    opacity: 0.85;
                }
            `}</style>

                {/* Navbar */}
                <nav style={{
                position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: '1.2rem 3rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(10,10,15,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(200,155,60,0.2)'
                }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#C89B3C', letterSpacing: '0.15em' }}>RIFT & RIFLE</span>
                    </a>

                    <a href="/login" style={{
                        background: 'linear-gradient(135deg, #C89B3C, #785A28)',
                        color: 'white',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                    }}>LOGIN</a>
                </nav>

                {/* Form */}
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1rem 2rem' }}>
                    <div className="register-card" style={{
                        width: '100%',
                        maxWidth: '420px',
                        padding: '2.5rem',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                        border: '1px solid rgba(200, 155, 60, 0.2)',
                        borderRadius: '12px'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem', letterSpacing: '0.1rem', margin: '0 0 0.5rem', color: 'F0E6D3' }}>CREATE ACCOUNT</h1>
                            <p style={{ color: '#a0a0b0', fontSize: '1.05rem', margin: 0, fontWeight: 550 }}>Start tracking your stats today</p>
                        </div>

                        {error && (
                            <div style={{ background: 'rgba(255, 71, 87, 0.1)', border: '1px solid rgba(255, 71, 87, 0.3)', borderRadius: '4px', padding: '0.75rem 1rem', marginBottom: '1.5rem'}}>
                                <p style={{ color: '#ff4757', margin: 0, fontSize: '0.95rem' }}>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Username</label>
                                <input
                                    type="text"
                                    placeholder="Your Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            <button type="submit" className="submit-btn" style={{ marginTop: '0.5rem' }}>{loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}</button>
                        </form>

                        <p style={{ textAlign: 'center', color: '#a0a0b0', marginTop: '1.5rem', fontSize: '1rem', fontWeight: 550 }}>
                            Already have an account? <a href="/login" style={{ color: '#C89B3C', textDecoration: 'none', fontWeight: 600 }}>Sign in</a>
                        </p>
                    </div>
                </div>
        </div>
    )
}

export default Register