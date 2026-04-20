const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/summoner', async (req, res) => {
    try {
        const { gameName, tagLine } = req.query;
        const apiKey = process.env.RIOT_API_KEY;

        const accountResponse = await axios.get(
            'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/' + gameName + '/' + tagLine, { headers: { 'X-Riot-Token': apiKey} }
        );

        const puuid = accountResponse.data.puuid;

        const summonerResponse = await axios.get(
            'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/' + puuid, { headers: { 'X-Riot-Token': apiKey } }
        );

        res.json({
            puuid,
            summoner: summonerResponse.data
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch summoner: ' + err.message});
    } 
});

router.get('/rank', async (req, res) => {
    try {
        const { summonerId } = req.query;
        const apiKey = process.env.RIOT_API_KEY;

        const rankResponse = await axios.get(
            'https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/' + summonerId, { headers: { 'X-Riot-Token': apiKey } }
        );

        res.json(rankResponse.data);

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rank: ' + err.message })
    }
});

router.get('/mastery', async (req, res) => {
    try {
        const { puuid } = req.query;
        const apiKey = process.env.RIOT_API_KEY;

        const masteryResponse = await axios.get(
            'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/' + puuid + '/top?count=10', { headers: { 'X-Riot-Token': apiKey } }
        );

        res.json(masteryResponse.data);

    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch mastery: ' + err.message })
    }
});

router.get('/matches', async (req, res) => {
    try {
        const { puuid, count } = req.query;
        const apiKey = process.env.RIOT_API_KEY;
        const matchCount = count || 10;

        const matchListResponse = await axios.get(
            'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid + '/ids?count=' + matchCount, { headers: { 'X-Riot-Token': apiKey } }
        );

        const matchIds = matchListResponse.data;

        const matchDetails = await Promise.all(
            matchIds.map(matchId =>
                axios.get(
                    'https://americas.api.riotgames.com/lol/match/v5/matches/' + matchId, { headers: { 'X-Riot-Token': apiKey } }
                ).then(res => res.data)
            )
        );

        res.json(matchDetails);

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch matches: ' + err.message });
    }
});

router.get('/livegame', async (req, res) => {
    try {
        const { puuid } = req.query;
        const apiKey = process.env.RIOT_API_KEY;

        const liveGameResponse = await axios.get(
            'https://na1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/' + puuid, { headers: { 'X-Riot-Token': apiKey } }
        );

        res.json(liveGameResponse.data);

    } catch (err) {
        if (err.response && err.response.status === 404) {
            res.json({ inGame: false, message: 'Player is not currently in a game' });
        } else {
            res.status(500).json({ error: 'Failed to fetch live game: ' + err.message});
        }
    }
});

module.exports = router;