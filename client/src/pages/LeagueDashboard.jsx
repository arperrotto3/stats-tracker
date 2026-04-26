import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard () {
    const [gameName, setGameName] = useState('')
    const [tagLine, setTagLine] = useState('')
    const [summoner, setSummoner] = useState(null)
    const [rank, setRank] = useState(null)
    const [mastery, setMastery] = useState(null)
    const [matches, setMatches] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [championById, setChampionById] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
        }
    }, [])

    const handleSearch = async () => {
        if (!gameName || !tagLine) {
            setError('Please enter both a username and tag')
            return
        }
        setLoading(true)
        setError('')
        try {
            const championRes = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.24.1/data/en_US/champion.json')
            const championData = championRes.data.data
            const champMap = {}
            Object.values(championData).forEach(champ => {
                champMap[champ.key] = champ.name
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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6x1 mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4x1 font-bold text-blue-400">Stats Tracker</h1>
                        <p className="text-gray-400 mt-1">Search any League of Legends player</p>
                    </div>
                    <button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">Logout</button>
                </div>

                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Game Name"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-4 py-2 flex-1 focus:outline-none focus:border-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="TAG"
                        value={tagLine}
                        onChange={(e) => setTagLine(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded px-4 py-2 w-24 focus:outline-none focus:border-blue-400"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded font-semibold">{loading ? 'Searching...' : 'Search'}</button>
                </div>

                {error && <p className="text-red-400 mb-4">{error}</p>}

                {summoner && (
                    <div className="bg-gray-800 rounded-1g p-6 mb-6">
                        <h2 className="text-2x1 font-bold">{gameName + '#' + tagLine}</h2>
                        <p className="text-gray-400">Summoner Level: {summoner.summonerLevel}</p>
                    </div>
                )}

                {rank && rank.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-blue-400">Ranked Stats</h2>
                        {rank.map((entry) => (
                            <div key={entry.queueType} className="mb-4">
                                <p className="text-gray-400 text-sm">{entry.queueType === 'RANKED_SOLO_5x5' ? 'Solo/Duo' : 'Flex'}</p>
                                <p className="text-2x1 font-bold">{entry.tier + ' ' + entry.rank}</p>
                                <p className="text-gray-400">{entry.leaguePoints + ' LP'}</p>
                                <p className="text-gray-400">{entry.wins + 'W ' + entry.losses + 'L'}</p>
                                <p className="text-gray-400">{'Win Rate: ' + Math.round((entry.wins / (entry.wins + entry.losses)) * 100) + '%'}</p>
                            </div>
                        ))}
                    </div>
                )}

                {rank && rank.length === 0 && summoner && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-x1 font-bold mb-2 text-blue-400">Ranked Stats</h2>
                        <p className="text-gray-400">Unranked</p>
                    </div>
                )}

                {mastery && mastery.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-blue-400">Top Champions</h2>
                        <div className="grid grid-cols-5 gap-4">
                            {mastery.slice(0, 5).map((champ) => {
                                console.log('Champion ID: ', champ.championId)
                                console.log('Champion lookup: ', championById[String(champ.championId)])
                                return (
                                <div key={champ.championId} className="bg-gray-700 rounded-lg p-4 text-center">
                                    <p className="font-bold">{championById[String(champ.championId)] || 'Unknown'}</p>
                                    <p className="text-blue-400 text-sm">{'Level ' + champ.championLevel}</p>
                                    <p className="text-gray-400 text-xs">{champ.championPoints.toLocaleString() + ' pts'}</p>
                                </div>
                                )
                            })}
                        </div>
                    </div> 
                )}
                
                {matches && matches.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-blue-400">Recent Matches</h2>
                        {matches.map((match) => {
                            const player = match.info.participants.find(p => p.puuid === match.metadata.participants[0])
                            return (
                                <div key={match.metadata.matchId} className={'flex items-center justify-between p-4 mb-2 rounded-lg ' + (player.win ? 'bg-blue-900' : 'bg-red-900')}>
                                    <div>
                                        <p className="font-bold">{player.championName}</p>
                                        <p className="text-gray-300 text-sm">{match.info.gameMode}</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="font-bold">{player.kills + '/' + player.deaths + '/' + player.assists}</p>
                                        <p className="text-gray-300 text-sm">KDA</p>
                                    </div>

                                    <div className="text-center">
                                        <p className="font-bold>">{player.win ? 'WIN' : 'LOSS'}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard