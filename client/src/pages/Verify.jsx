import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

function Verify() {
    const [status, setStatus] = useState('loading')
    const [message, setMessage] = useState('')
    const hasVerified = useRef(false)

    useEffect(() => {
        if (hasVerified.current) return
        hasVerified.current=true
        
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (!token) {
            setStatus('error')
            setMessage('Invalid verification link.')
            return
        }

        axios.get('/api/auth/verify?token=' + token)
            .then(() => {
                setStatus('success')
                setMessage('Email verified successfully! You can now log in.')
            })
            .catch(() => {
                setStatus('error')
                setMessage('Invalid or expired verification link. Please register again.')
            })
    }, [])

    return (
        <div style={{ fontFamily: 'Rajdhani, sans-serif', background: '#0a0a0f', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                border: '1px solid rgba(200, 155, 60, 0.2)',
                borderRadius: '12px',
                padding: '3rem',
                maxWidth: '480px',
                width: '100%',
                margin: '1rem'
            }}>
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', color: '#c89b3c', letterSpacing: '0.15em', margin: '0 0 2rem' }}>RIFT & RIFLE</p>

                {status === 'loading' && (
                    <div>
                        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#f0e6d3', letterSpacing: '0.1em' }}>VERIFYING YOUR EMAIL...</p>
                        <p style={{ color: '#a0a0b0', fontWeight: 600 }}>Please wait a moment</p>
                    </div>
                )}

                {status === 'success' && (
                    <div>
                        <p style={{ fontSize: '3rem', margin: '0 0 1rem' }}>✅</p>
                        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#00d4aa', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>EMAIL VERIFIED</p>
                        <p style={{ color: '#a0a0b0', fontWeight: 600, marginBottom: '2rem' }}>{message}</p>
                        <a href="/login" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #c89b3c, #785a28)',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '0.1em'
                        }}>GO TO LOGIN</a>
                    </div>
                )}

                {status === 'error' && (
                    <div>
                        <p style={{ fontSize: '3rem', margin: '0 0 1rem' }}>❌</p>
                        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#ff4757', letterSpacing: '0.1em', margin: '0 0 0.5rem' }}>VERIFICATION FAILED</p>
                        <p style={{ color: '#a0a0b0', fontWeight: 600, marginBottom: '2rem' }}>{message}</p>
                        <a href="/register" style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #c89b3c, #785a28)',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '0.1em'
                        }}>BACK TO REGISTER</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Verify