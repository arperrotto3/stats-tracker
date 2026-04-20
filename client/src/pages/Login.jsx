import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            window.location.href = '/dashboard'
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form  onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    )
}

export default Login