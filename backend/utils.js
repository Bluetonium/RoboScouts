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

//gets a random integer between 0-max
function getRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

export function createAllTeamFiles(){
  try {
    var teamsAdded = [];
    const data = readData();
    for(var i = 0; i < data.length; i++){
      var path = `./teamData/${data[i].number}.json`;
      if (!fs.existsSync(path)) {
        teamsAdded.push(data[i].number);
        fs.writeFileSync(path, JSON.stringify({ randomColor: [getRandomInt(255), getRandomInt(255), getRandomInt(255)]}, null, 2));
      }
    }
    console.log(`[RoboScouts] - Team Files Added: ${teamsAdded}`);
  } catch (error) {
    console.error("Error creating files:", error);
  }
}

export function createTeamFile(teamNum){
  try {
    var path = `./teamData/${teamNum}.json`;
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify({ randomColor: [getRandomInt(255), getRandomInt(255), getRandomInt(255)]}, null, 2));
      console.log(`[RoboScouts] - Team File Added: ${teamNum}`);
    }
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

export function deleteAllTeamFiles(){
  const data = readData();
  for(var i = 0; i < data.length; i++){
    var path = `./teamData/${data[i].number}.json`;
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if(err) console.error(`Error deleting file ${teamNum}:`, err);
      });
    }
  }
  console.log(`[RoboScouts] - All Team Files Deleted!`);
}

export function deleteTeamFile(teamNum){
  var path = `./teamData/${teamNum}.json`;
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if(err) console.error(`Error deleting file ${teamNum}:`, err);
      else console.log(`[RoboScouts] - Team File Deleted: ${teamNum}`);
    });
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
      console.log("[RoboScouts] - Team List Updated!");
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

//get team name by num
export async function findNameByNum(teamNum){
  const data = readData();

  for(var i = 0; i < data.length; i++){
    if(data[i].number == teamNum){
      return data[i].name;
    }
  }

  return null;
}

//get team num by name
export async function findNumByName(teamName){
  const data = readData();

  for(var i = 0; i < data.length; i++){
    if(data[i].name.replace(/\s+/g, '').toLowerCase() == teamName.replace(/\s+/g, '').toLowerCase()){
      return data[i].number;
    }
  }

  return null;
}

//fetches team info from Blue Alliance using the team num
export async function BATeamInfo(teamNum){
  const teamKey = "frc" + teamNum;
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

//fetches team info from FRC API using the team num
export async function FRCTeamInfo(teamNum){
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

//fetches team info from Statbotics using the team num
export async function SBTeamInfo(teamNum){
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

//get team info from all 3 sources; TO-DO: fix error with robotName, homeCMP, and website fields not showing up
export async function AllTeamInfo(teamNum){
  const teamKey = "frc" + teamNum;
  var BAResponse;
  var FRCResponse;
  var SBResponse;
  var response;

  try {
    BAResponse = await axios.get(`https://www.thebluealliance.com/api/v3/team/${teamKey}`, {
      headers: {
        'X-TBA-Auth-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    FRCResponse = await axios.get(`https://frc-api.firstinspires.org/v3.0/2023/teams?teamNumber=${teamNum}`, {
      headers: {
        'Authorization': `Basic ${FRC_KEY}`,
        'Accept': 'application/json',
      },
    });
    SBResponse = await axios.get(`https://api.statbotics.io/v3/team/${teamNum}`, {
    });

    response = {
      nameFull: BAResponse.data.name || FRCResponse.data.teams[0].name,
      nameShort: BAResponse.data.nickname || FRCResponse.data.teams[0].nameShort,
      teamNumber: BAResponse.data.team_number || FRCResponse.data.teams[0].teamNumber,
      rookieYear: BAResponse.data.rookie_year || FRCResponse.data.teams[0].rookieYear,
      city: BAResponse.data.city || FRCResponse.data.teams[0].city,
      state: BAResponse.data.state_prov || FRCResponse.data.teams[0].stateProv || SBResponse.data.state,
      country: BAResponse.data.country || FRCResponse.data.teams[0].country || SBResponse.data.country,
      district: FRCResponse.data.districtCode || SBResponse.data.district,
      schoolName: BAResponse.data.school_name || FRCResponse.data.schoolName,
      postalCode: BAResponse.data.postal_code,
      address: BAResponse.data.address,
      gmapsPlaceID: BAResponse.data.gmaps_place_id,
      gmapsURL: BAResponse.data.gmaps_url,
      lat: BAResponse.data.lat,
      lng: BAResponse.data.lng,
      locationName: BAResponse.data.location_name,
      offseason: SBResponse.data.offseason,
      active: SBResponse.data.active,
      robotName: FRCResponse.data.robotName,
      motto: BAResponse.data.motto,
      homeCMP: FRCResponse.data.homeCMP,
      website: BAResponse.data.website || FRCResponse.data.website,
      colors: {
        primary: SBResponse.data.colors.primary,
        secondary: SBResponse.data.colors.secondary,
      },
      record: {
        season: {
          wins: SBResponse.data.record.season.wins,
          losses: SBResponse.data.record.season.losses,
          ties: SBResponse.data.record.season.ties,
          count: SBResponse.data.record.season.count,
          winrate: SBResponse.data.record.season.winrate,
        },
        full: {
          wins: SBResponse.data.record.full.wins,
          losses: SBResponse.data.record.full.losses,
          ties: SBResponse.data.record.full.ties,
          count: SBResponse.data.record.full.count,
          winrate: SBResponse.data.record.full.winrate,
        }
      },
      normEPA: {
        current: SBResponse.data.norm_epa.current,
        recent: SBResponse.data.norm_epa.recent,
        mean: SBResponse.data.norm_epa.mean,
        max: SBResponse.data.norm_epa.max,
      }
    }
    
    return await response;
  } catch (error) {
    console.error('Error fetching data.', error);
    console.log(teamNum);
    return "Error fetching data.";
  }
}