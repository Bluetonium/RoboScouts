import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import {
  readData,
  writeData,
  fetchTeamData,
} from "./utils.js";

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
    await fetchTeamData();
    res.json(readData());
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});