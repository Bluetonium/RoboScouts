import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import {
  readData,
  writeData,
  fetchTeamData,
  filterByName,
  BATeamInfo,
  SBTeamInfo,
  FRCTeamInfo,
  AllTeamInfo,
  start,
} from './utils.js';
import cron from 'node-cron';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = start();

// endpoints
//using bluealliance TBA API v3 - get a specific team using team key
app.get('/ba-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await BATeamInfo(teamNum));
});

app.get('/frc-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await FRCTeamInfo(teamNum));
});

app.get('/sb-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await SBTeamInfo(teamNum));
});

app.get('/all-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await AllTeamInfo(teamNum));
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});