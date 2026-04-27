import { useEffect, useState } from 'react'
import { jwtDecode} from 'jwt-decode'
import api from '../services/api'

function Profile() {
    const [username, setUsername] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [riotGameName, setRiotGameName] = useState('')
    const [riotTagLine, setRiotTagLine] = useState('')
    const [profileSaved, setProfileSaved] = useState(false)
    const [trackedPlayers, setTrackedPlayers] = useState([])
    const [newGameName, setNewGameName] = useState('')
    const [newTagLine, setNewTagLine] = useState('')
    const [newNickname, setNewNickname] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editNickname, setEditNickname] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
            return
        }
        const decoded = jwtDecode(token)
        setUsername(decoded.username)
        fetchProfile()
        fetchTrackedPlayers()
    }, [])

    useEffect(() => {
        const handleClickOutside = () => {
            if (dropdownOpen) setDropdownOpen(false)
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [dropdownOpen])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    const fetchProfile = async () => {
        try {
            const res = await api.get('/api/profile')
            if (res.data.riot_game_name) {
                setRiotGameName(res.data.riot_game_name)
                setRiotTagLine(res.data.riotTagLine)
            }
        } catch {}
    }

    const fetchTrackedPlayers = async () => {
        try {
            const res = await api.get('/api/tracked')
            setTrackedPlayers(res.data)
        } catch {}
    }

    const handleSaveProfile = async () => {
        try {
            await api.post('/api/profile', {riotGameName, riotTagLine})
            setProfileSaved(true)
            setSuccess('Riot ID saved successfully!')
            setTimeout(() => setSuccess(''), 3000)
        } catch {
            setError('Failed to save profile')
            setTimeout(() => setError(''), 3000)
        }
    }

    const handleAddPlayer = async () => {
        if (!newGameName || !newTagLine) {
            setError('Please enter both a game name and tag')
            setTimeout(() => setError(''), 3000)
            return
        }
        try {
            const res = await api.post('/api/tracked', {
                gameName: newGameName,
                tagLine: newTagLine,
                nickname: newNickname
            })
            setTrackedPlayers([res.data, ...trackedPlayers])
            setNewGameName('')
            setNewTagLine('')
            setNewNickname('')
            setSuccess('Player added to watchlist!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add player')
            setTimeout(() => setError(''), 3000)
        }
    }

    const handleUpdateNickname = async (id) => {
        try {
            const res = await api.put('/api/tracked/' + id, {nickname: editNickname})
            setTrackedPlayers(trackedPlayers.map(p => p.id === id ? res.data : p))
            setEditingId(null)
            setEditNickname('')
            setSuccess('Nickname updated!')
            setTimeout(() => setSuccess(''), 3000)
        } catch {
            setError('Failed to update nickname')
            setTimeout(() => setError(''), 3000)
        }
    }

    const handleDeletePlayer = async (id) => {
        try {
            await api.delete('/api/tracked/' + id)
            setTrackedPlayers(trackedPlayers.filter(p => p.id !== id))
            setSuccess('Player removed from watchlist!')
            setTimeout(() => setSuccess(''), 3000)
        } catch {
            setError('Failed to remove player')
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
    <div style={{ fontFamily: 'Rajdhani, sans-serif', background: '#0a0a0f', minHeight: '100vh', color: 'white' }}>
      <style>{`
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: #13131a;
          border: 1px solid rgba(200,155,60,0.2);
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
          background: rgba(200,155,60,0.1);
          color: #C89B3C;
        }
        .dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0;
        }
        .input-field {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 0.75rem 1rem;
          color: white;
          font-family: Rajdhani, sans-serif;
          font-size: 1rem;
          font-weight: 550;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
          width: 100%;
        }
        .input-field:focus {
          border-color: #C89B3C;
        }
        .input-field::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .btn-gold {
          background: linear-gradient(135deg, #C89B3C, #785A28);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-family: Bebas Neue, sans-serif;
          font-size: 1rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .btn-gold:hover {
          opacity: 0.85;
        }
        .btn-danger {
          background: rgba(255,71,87,0.1);
          color: #ff4757;
          border: 1px solid rgba(255,71,87,0.3);
          padding: 0.4rem 0.75rem;
          border-radius: 4px;
          font-family: Bebas Neue, sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .btn-danger:hover {
          background: rgba(255,71,87,0.2);
        }
        .btn-edit {
          background: rgba(200,155,60,0.1);
          color: #C89B3C;
          border: 1px solid rgba(200,155,60,0.3);
          padding: 0.4rem 0.75rem;
          border-radius: 4px;
          font-family: Bebas Neue, sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .btn-edit:hover {
          background: rgba(200,155,60,0.2);
        }
        .section-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-family: Bebas Neue, sans-serif;
          font-size: 1.3rem;
          letter-spacing: 0.1em;
          color: #C89B3C;
          margin: 0 0 1.5rem;
        }
        .player-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          gap: 1rem;
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
        background: 'rgba(10,10,15,0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(200,155,60,0.2)'
      }}>
        <a href="/dashboard" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#C89B3C', letterSpacing: '0.15em' }}>RIFT & RIFLE</span>
        </a>
        <div style={{ position: 'relative' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen) }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(200,155,60,0.2)',
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
            <span style={{ color: '#C89B3C', fontSize: '0.7rem' }}>▼</span>
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
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>

        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.1em', color: '#F0E6D3', margin: '0 0 0.5rem' }}>MY PROFILE</h1>
        <p style={{ color: '#a0a0b0', fontWeight: 550, marginBottom: '2rem' }}>{'Logged in as ' + username}</p>

        {error && (
          <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
            <p style={{ color: '#ff4757', margin: 0, fontWeight: 600 }}>{error}</p>
          </div>
        )}

        {success && (
          <div style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
            <p style={{ color: '#00d4aa', margin: 0, fontWeight: 600 }}>{success}</p>
          </div>
        )}

        {/* Riot ID Section */}
        <div className="section-card">
          <p className="section-title">MY RIOT ID</p>
          <p style={{ color: '#a0a0b0', fontWeight: 550, marginBottom: '1.5rem' }}>Save your Riot ID so your stats load automatically when you visit the League dashboard.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Game Name</label>
              <input
                type="text"
                placeholder="YourGameName"
                value={riotGameName}
                onChange={(e) => setRiotGameName(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Tag</label>
              <input
                type="text"
                placeholder="TAG"
                value={riotTagLine}
                onChange={(e) => setRiotTagLine(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={handleSaveProfile} className="btn-gold">SAVE</button>
            </div>
          </div>
          {profileSaved && riotGameName && (
            <p style={{ color: '#00d4aa', marginTop: '1rem', fontWeight: 600 }}>{'Currently linked: ' + riotGameName + '#' + riotTagLine}</p>
          )}
        </div>

        {/* Tracked Players Section */}
        <div className="section-card">
          <p className="section-title">PLAYER WATCHLIST</p>

          {/* Add Player Form */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Game Name</label>
              <input
                type="text"
                placeholder="PlayerName"
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Tag</label>
              <input
                type="text"
                placeholder="TAG"
                value={newTagLine}
                onChange={(e) => setNewTagLine(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', color: '#a0a0b0', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 550 }}>Nickname (optional)</label>
              <input
                type="text"
                placeholder="e.g. Best Friend"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="input-field"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={handleAddPlayer} className="btn-gold">ADD</button>
            </div>
          </div>

          {/* Players List */}
          {trackedPlayers.length === 0 ? (
            <p style={{ color: '#555', fontWeight: 550, textAlign: 'center', padding: '2rem 0' }}>No players tracked yet. Add some above!</p>
          ) : (
            trackedPlayers.map((player) => (
              <div key={player.id} className="player-row">
                <div>
                  <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: '#F0E6D3', margin: '0 0 0.15rem', letterSpacing: '0.05em' }}>{player.game_name + '#' + player.tag_line}</p>
                  {editingId === player.id ? (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <input
                        type="text"
                        value={editNickname}
                        onChange={(e) => setEditNickname(e.target.value)}
                        placeholder="New nickname"
                        className="input-field"
                        style={{ width: '180px', padding: '0.4rem 0.75rem' }}
                      />
                      <button onClick={() => handleUpdateNickname(player.id)} className="btn-gold" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>SAVE</button>
                      <button onClick={() => setEditingId(null)} className="btn-edit" style={{ padding: '0.4rem 0.75rem' }}>CANCEL</button>
                    </div>
                  ) : (
                    <p style={{ color: '#a0a0b0', fontSize: '0.9rem', margin: 0, fontWeight: 550 }}>{player.nickname || 'No nickname'}</p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <a href={'/league?gameName=' + player.game_name + '&tagLine=' + player.tag_line} className="btn-edit" style={{ textDecoration: 'none', padding: '0.4rem 0.75rem' }}>VIEW</a>
                  <button onClick={() => { setEditingId(player.id); setEditNickname(player.nickname || '') }} className="btn-edit">EDIT</button>
                  <button onClick={() => handleDeletePlayer(player.id)} className="btn-danger">REMOVE</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile