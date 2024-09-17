import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import {
  readData,
  writeData,
  fetchTeamData,
  filterName,
  searchByKey,
} from "./utils.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const API_KEY = process.env.TBA_KEY;

// endpoints - not needed right now
//using bluealliance TBA API v3 - get a specific team using team key
app.get('/team/:team_key', async (req, res) => {
  const teamKey = req.params.team_key;

 res.json(await searchByKey(teamKey));
});

//using bluealliance TBA API v3 - stores and gets name, number, city, and country of all teams
app.get('/teams', async (req, res) => {
    // const pageNum = req.params.page;
    await fetchTeamData();
    res.json(readData());
});

//testing
// console.log(filterName("a", 20, 2));
// console.log(await searchByKey("frc254"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});