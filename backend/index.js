import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import * as utils from './utils.js';
import cron from 'node-cron';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = utils.start();

// endpoints
//find team name using team number
app.get('/teamName/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await utils.findNameByNum(teamNum));
});

//find team number using team name 
app.get('/teamNum/:teamName', async (req, res) => {
  const teamName = req.params.teamName;

 res.json(await utils.findNumByName(teamName));
});

//using bluealliance TBA API v3 - get team info using num
app.get('/ba-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await utils.BATeamInfo(teamNum));
});

//using First Robotics' FRC API - get team info using num
app.get('/frc-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await utils.FRCTeamInfo(teamNum));
});

//using StatBotics REST API - get team info using num
app.get('/sb-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await utils.SBTeamInfo(teamNum));
});

//using all 3 APIs - get team info using num
app.get('/all-team-info/:teamNum', async (req, res) => {
  const teamNum = req.params.teamNum;

 res.json(await utils.AllTeamInfo(teamNum));
});

//using bluealliance TBA API v3 - stores and gets name, number, city, and country of all teams
app.get('/teams', async (req, res) => {
    // const pageNum = req.params.page;
    await utils.fetchTeamData();
    res.json(utils.readData('./data.json'));
});

cron.schedule(
  "0 0 * * *",
  async () => {
    utils.fetchTeamData();
    utils.createAllTeamFiles();
  });

//testing
// console.log(filterByName("a", 20, 2));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});