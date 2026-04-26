import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

function Dashboard () {
    const [gameName, setGameName] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [tagLine, setTagLine] = useState('')
    const [summoner, setSummoner] = useState(null)
    const [rank, setRank] = useState(null)
    const [mastery, setMastery] = useState(null)
    const [matches, setMatches] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [championById, setChampionById] = useState({})
    const [username, setUsername] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
        }
        const decoded = jwtDecode(token)
        setUsername(decoded.username)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownOpen) setDropdownOpen(false)
        }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
    }, [dropdownOpen])
    
    const handleSearch = async () => {
        if (!gameName || !tagLine) {
            setError('Please enter both a game name and tag')
            return
        }
        setLoading(true)
        setError('')
        setSummoner(null)
        setRank(null)
        setMastery(null)
        setMatches(null)
        try {
            const championRes = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.24.1/data/en_US/champion.json')
            const championData = championRes.data.data
            const champMap = {}
            Object.values(championData).forEach(champ => {
                champMap[champ.key] = { name: champ.name, id: champ.id }
            })
            setChampionById(champMap)

            const summonerRes = await axios.get('/api/riot/summoner?gameName=' + gameName + '&tagLine=' + tagLine)
            setSummoner(summonerRes.data.summoner)
            const puuid = summonerRes.data.puuid

            try {
            const rankRes = await axios.get('/api/riot/rank?summonerId=' + puuid)
            setRank(rankRes.data)
            } catch {
                setRank([])
            }

            try {
            const masteryRes = await axios.get('/api/riot/mastery?puuid=' + puuid)
            setMastery(masteryRes.data)
            } catch {
                setMastery([])
            }

            try{
            const matchRes = await axios.get('/api/riot/matches?puuid=' + puuid + '&count=10')
            setMatches(matchRes.data)
            } catch {
                setMatches([])
            }

        } catch {
            setError('Could not find player. Check the Riot ID and try again.')
        }
        setLoading(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div style={{ fontFamily: 'Rajdhani, sans-serif', background: '#0a0a0f', minHeight: '100vh', color: 'white' }}>
            <style>{`
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
                color: #c89b3c;
            }
            .dropdown-divider {
                height: 1px;
                background: rgba(255, 255, 255, 0.05);
                margin: 0;
            }
            .search-input {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 4px 0 0 4px;
                padding: 0.5rem 1rem;
                color: white;
                font-family: Rajdhani, sans-serif;
                font-size: 1rem;
                font-weight: 500;
                outline: none;
                transition: border-color 0.2s ease;
                width: 180px;
            }
            .search-input:focus {
                border-color: rgba(200, 155, 60, 0.5);
            }
            .search-input::placeholder {
                color: rgba(255, 255, 255, 0.3);
            }
            .search-btn {
                background: linear-gradient(135deg, #c89b3c, #785a28);
                border: none;
                padding: 0.5rem 1rem;
                color: white;
                font-family: Bebas Neue, sans-serif;
                font-size: 1rem;
                letter-spacing: 0.08em;
                cursor: pointer;
                border-radius: 0 4px 4px 0;
                transition: opacity 0.2s ease;
            }
            .search-btn:hover {
                opacity: 0.85;
            }
            .stat-section {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 12px;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }
            .section-title {
                font-family: Bebas Neue, sans-serif;
                font-size: 1.3rem;
                letter-spacing: 0.1em;
                color: #c89b3c;
                margin: 0 0 1rem;
            }
            .match-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                transition: transform 0.2s ease;
            }
            .match-row:hover {
                transform: translateX(4px);
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
                    <span style ={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#c89b3c', letterSpacing: '0.15em' }}>RIFT & RIFLE</span> 
                </a>

                {/* Search Bar */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Game Name"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="TAG"
                        value={tagLine}
                        onChange={(e) => setTagLine(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="search-input"
                        style={{ width: '80px', borderRadius: '0', borderLeft: 'none' }}
                    />
                    <button onClick={handleSearch} className="search-btn">
                        {loading ? '...' : 'SEARCH'}
                    </button>
                </div>

                {/* Username Dropdown */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setDropdownOpen(!dropdownOpen)
                        }}
                        style={{
                            display:'flex',
                            alignItems:'center',
                            gap:'0.5rem',
                            background:'rgba(255, 255, 255, 0.05)',
                            border:'1px solid rgba(200, 155, 60, 0.2)',
                            borderRadius:'6px',
                            padding:'0.5rem 1rem',
                            color:'white',
                            cursor:'pointer',
                            fontFamily:'Rajdhani, sans-serif',
                            fontSize:'1rem',
                            fontWeight:600
                        }}
                    >
                        <span>{username}</span>
                        <span style={{ color: '#c89b3c', fontSize: '0.7rem' }}>▼</span>
                    </button>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="profile" className="dropdown-item">My Profile</a>
                            <a href="/settings" className="dropdown-item">Settings</a>
                            <div className="dropdown-divider" />
                            <button onClick={handleLogout} className="dropdown-item" style={{ color: '#ff4757' }}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 2rem 4rem' }}>

                {error && (
                    <div style={{ background: 'rgba(255, 71, 87, 0.1)', border: '1px solid rgba(255, 71, 87, 0.3)', borderRadius: '8px', padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
                        <p style={{ color: '#ff4757', margin: 0, fontWeight: 600 }}>{error}</p>
                    </div>
                )}

                {!summoner && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '8rem' }}>
                        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#a0a0b0', letterSpacing: '0.1em' }}>SEARCH A PLAYER TO GET STARTED</p>
                        <p style={{ color: '#555', fontSize: '1rem' }}>Enter a Riot ID above to view stats</p>
                    </div>
                )}

                {summoner && (
                    <div>
                        {/* Summoner Card */}
                        <div className="stat-section" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #c89b3c, #785a28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                                {gameName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', letterSpacing: '0.1rem', margin: '0 0 0.25rem', color: '#f0e6d3' }}>{gameName + '#' + tagLine}</h2>
                                <p style={{ color: '#a0a0b0', margin: 0, fontWeight: 600 }}>{'Summoner Level ' + summoner.summonerLevel}</p>
                            </div>
                        </div>

                        {/* Rank Section */}
                        <div className="stat-section">
                            <p className="section-title">RANKED STATS</p>
                            {rank && rank.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                    {rank.map((entry) => (
                                        <div key={entry.queueType} style={{ background: 'rgba(200, 155, 60, 0.05', border: '1px solid rgba(200, 155, 60, 0.15)', borderRadius: '8px', padding: '1rem' }}>
                                            <p style={{ color: '#a0a0b0', fontSize: '0.85rem', letterSpacing: '0.1rem', textTransform: 'uppercase', margin: '0 0 0.5rem', fontWeight: 600 }}>{entry.queueType === 'RANKED_SOLO_5x5' ? 'Solo / Duo' : 'Flex'}</p>
                                            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', color: '#c89b3c', margin: '0 0 0.25rem', letterSpacing: '0.05em' }}>{entry.tier + ' ' + entry.rank}</p>
                                            <p style={{ color: '#a0a0b0', margin: '0 0 0.25rem', fontWeight: 600 }}>{entry.leaguePoints + ' LP'}</p>
                                            <p style={{ color: '#a0a0b0', margin: '0 0 0.25rem', fontWeight: 600 }}>{entry.wins + 'W ' + entry.losses + 'L'}</p>
                                            <p style={{ color: '#00d4aa', margin: 0, fontWeight: 700 }}>{'Win Rate: ' + Math.round((entry.wins / (entry.wins + entry.losses)) * 100) + '%'}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#a0a0b0', fontWeight: 600 }}>Unranked</p>
                            )}
                        </div>

                        {/* Champion Mastery Section */}
                        {mastery && mastery.length > 0 && (
                            <div className="stat-section">
                                <p className="section-title">TOP CHAMPIONS</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(120px, 1fr))', gap: '1rem' }}>
                                    {mastery.slice(0, 5).map((champ) => (
                                        <div key={champ.championId} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', position: 'relative' }}>
                                            <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', color: '#c89b3c', letterSpacing: '0.05em', fontWeight: 500 }}>{'#' + (mastery.indexOf(champ) + 1)}</span>
                                            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#f0e6d3', margin: '0 0 0.25rem', letterSpacing: '0.05em' }}>{championById[String(champ.championId)]?.name || 'Unknown'}</p>
                                            <img
                                                src={'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/' + (championById[String(champ.championId)]?.id || 'Unknown') + '.png'}
                                                alt={championById[String(champ.championId)]?.name || 'Unknown'}
                                                style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'block', margin: '0 auto 0.5rem', border: '2px solid rgba(200, 155, 60, 0.3)', objectFit: 'cover' }}
                                            />
                                            <p style={{ color: '#c89b3c', fontSize: '1rem', margin: '0 0 0.25rem', fontWeight: 600 }}>{'Level ' + champ.championLevel}</p>
                                            <p style={{ color: '#a0a0b0', fontSize: '1rem', margin: 0, fontWeight: 600 }}>{champ.championPoints.toLocaleString() + ' pts'}</p>
                                        </div>  
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Match History Section */}
                        {matches && matches.length > 0 && (
                            <div className="stat-section">
                                <p className="section-title">RECENT MATCHES</p>
                                {matches.map((match) => {
                                    const player = match.info.participants.find(p => p.puuid === match.metadata.participants[0])
                                    const kda = player.deaths === 0 ? 'Perfect' : ((player.kills + player.assists) / player.deaths).toFixed(2)
                                    return (
                                        <div
                                            key={match.metadata.matchId}
                                            className="match-row"
                                            style={{ background: player.win ? 'rgba(0, 212, 170, 0.06)' : 'rgba(255, 71, 87, 0.06)', border: '1px solid ' + (player.win ? 'rgba(0, 212, 170, 0.15)' : 'rgba(255, 71, 87, 0.15)') }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '160px' }}>
                                                <div style={{ width: '4px', height: '40px', borderRadius: '2px', background: player.win ? '#00d4aa' : '#ff4757', flexShrink: 0 }} />
                                                <div>
                                                    <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', color: '#f0e6d3', margin: '0 0 0.15rem', letterSpacing: '0.05em' }}>{player.championName}</p>
                                                    <p style={{ color: '#a0a0b0', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>{match.info.gameMode}</p>
                                                </div>
                                            </div>

                                            <div style={{ textAlign: 'center' }}>
                                                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: '#f0e6d3', margin: '0 0 0.15rem', letterSpacing: '0.05em' }}>{player.kills + ' / ' + player.deaths + ' / ' + player.assists}</p>
                                                <p style={{ color: '#a0a0b0', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>{'KDA: ' + kda}</p>
                                            </div>

                                            <div style={{ textAlign: 'center' }}>
                                                <p style={{ color: '#a0a0b0', fontSize: '0.9rem', margin: '0 0 0.15rem', fontWeight: 600 }}>{'CS: ' + player.totalMinionsKilled}</p>
                                                <p style={{ color: '#a0a0b0', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>{'Vision: ' + player.visionScore}</p>
                                            </div>

                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ color: '#555', fontSize: '1rem', margin: 0, fontWeight: 600 }}>{new Date(match.info.gameEndTimestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            </div>

                                            <div>
                                                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: player.win ? '#00d4aa' : '#ff4757', margin: 0, letterSpacing: '0.05em' }}>{player.win ? 'WIN' : 'LOSS'}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard