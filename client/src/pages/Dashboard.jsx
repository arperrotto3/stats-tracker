import { useEffect, useState } from 'react'

function Dashboard () {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your Stats Tracker!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard