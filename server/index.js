import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { escapeMarkdown } from 'discord.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const API_KEY = process.env.TBA_KEY;

//test
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

//using bluealliance TBA API v3 - get a specific team using team key
app.get('/team/:team_key', async (req, res) => {
  const teamKey = req.params.team_key;

  try {
    const response = await axios.get(`https://www.thebluealliance.com/api/v3/team/${teamKey}`, {
      headers: {
        'X-TBA-Auth-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from TBA API:', error);
    console.log(teamKey);
    res.status(500).json({ error: 'An error occurred while fetching data from TBA.' });
  }
});

//using bluealliance TBA API v3 - get name, number, city, and country of all teams
app.get('/teams', async (req, res) => {
    // const pageNum = req.params.page;
    let page = 0;
    let moreTeams = true;
    var allTeams = [];
  
    try {
        while(moreTeams){
            const response = await axios.get(`https://www.thebluealliance.com/api/v3/teams/${page}/simple`, {
            headers: {
                'X-TBA-Auth-Key': API_KEY,
                'Content-Type': 'application/json',
            },
            });
            
            const teamInfo = response.data;

            if (teamInfo.length === 0) {
                moreTeams = false;
                break;
            }
            
            const fTeams = teamInfo.map(team => ({
            name: team.nickname,
            number: team.team_number,
            country: team.country,
            city: team.city,
            }));

            allTeams = allTeams.concat(fTeams);

            page++;
        }
        res.json(allTeams);
    } catch (error) {
      console.error('Error fetching data from TBA API:', error);
      res.status(500).json({ error: 'An error occurred while fetching data from TBA.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});