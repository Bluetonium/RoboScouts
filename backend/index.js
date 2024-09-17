import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import {
  readData,
  writeData,
  fetchTeamData,
  filterByName,
  searchByKey,
} from './utils.js';
import cron from 'node-cron';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = start();

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

cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("[RoboScouts] - List Updated!");
    fetchTeamData();
  });

//testing
// console.log(filterByName("a", 20, 2));
// console.log(await searchByKey("frc254"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});