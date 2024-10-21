import express from 'express';
import "dotenv/config";
import fs from "fs";
import axios from 'axios';

const path = "./data.json";
const API_KEY = process.env.TBA_KEY;
const FRC_KEY = process.env.FRC_KEY;

export function start(){
  const server = express();
  return server;
}

//reads data from data.json
export function readData() {
  try {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify({ teams: [] }, null, 2));
    }
    const d = fs.readFileSync(path, "utf8");
    return JSON.parse(d);
  } catch (error) {
    console.error("Error reading data:", error);
    return {};
  }
}

//writes data to data.json
export function writeData(d) {
  try {
    fs.writeFileSync(path, JSON.stringify(d, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
  }
}

//fetches team name, number, city, and country from all frc teams and stores it in data.json
export async function fetchTeamData(){
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
      writeData(allTeams);
  } catch (error) {
    console.error('Error fetching data from TBA API:', error);
    // res.status(500).json({ error: 'An error occurred while fetching data from TBA.' });
  }
}

//filters teams by name
export async function filterByName(str, pageLen, pageNum){
  const data = readData();
  var matchCount = 0;
  var page = [];

  for(var i = 0; i < data.length; i++){
    if(data[i].name.toLowerCase().includes(str)){
      matchCount++;
      if(matchCount > (pageNum-1)*pageLen && matchCount <= pageNum*pageLen){
        page.push(data[i]);
      }
    }
  }

  return page;
}

//fetches team info from Blue Alliance using the team key
export async function BATeamInfoByKey(teamKey){
  try {
    const response = await axios.get(`https://www.thebluealliance.com/api/v3/team/${teamKey}`, {
      headers: {
        'X-TBA-Auth-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TBA API:', error);
    console.log(teamKey);
    res.status(500).json({ error: 'An error occurred while fetching data from TBA.' });
  }
}

//fetches team info from Statbotics using the team key
export async function SBTeamInfoByNum(teamNum){
  try {
    const response = await axios.get(`https://api.statbotics.io/v3/team/${teamNum}`, {
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Statbotics API:', error);
    console.log(teamNum);
    res.status(500).json({ error: 'An error occurred while fetching data from Statbotics.' });
  }
}

//fetches team info from FRC API using the team key
export async function FRCTeamInfoByNum(teamNum){
  try {
    const response = await axios.get(`https://frc-api.firstinspires.org/v3.0/2023/teams?teamNumber=${teamNum}`, {
      headers: {
        'Authorization': `Basic ${FRC_KEY}`,
        'Accept': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data from FRC API', error);
    console.log(teamNum);
    res.status(500).json({ error: 'An error occurred while fetching data from FRC.' });
  }
}