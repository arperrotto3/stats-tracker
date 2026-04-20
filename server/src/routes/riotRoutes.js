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
            'https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/' + summonerId, { headers: { ' X-Riot-Token': apiKey } }
        );

        res.json(rankResponse.data);

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch rank: ' + err.message })
    }
});

module.exports = router;