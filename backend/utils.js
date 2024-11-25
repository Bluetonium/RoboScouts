import express from 'express';
import "dotenv/config";
import { promises as fs } from 'fs';
import axios from 'axios';
import mysql from 'mysql2/promise';
import Joi from 'joi';

const API_KEY = process.env.TBA_KEY;
const FRC_KEY = process.env.FRC_KEY;

const DBconfig = {
  host: 'localhost',    // Your MySQL server hostname
  user: 'root',         // Your MySQL username
  password: 'FHSroboscouts2024$root', // Your MySQL password
  database: 'roboscouts'   // Your database name
};

export function start(){
  const server = express();
  return server;
}

//reads data from specified file
export async function readData(path) {
  try {
    const d = await fs.readFile(path, "utf8");
    return JSON.parse(d);
  } catch (error) {
    console.error("Error reading from file: ", error);
  } 
}

//writes data to specified file
export async function writeData(path, d) {
  try {
    await fs.writeFile(path, JSON.stringify(d, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to file: ", error);
  }
}

//uses BlueAlliance to get the name, number, city, and country from each team and store it in a table
export async function addAllBasicTeamData(){
  try {
    const connection = await mysql.createConnection(DBconfig);
  
    let page = 0;
    let moreTeams = true;
    
    while(moreTeams){
      const response = await axios.get(`https://www.thebluealliance.com/api/v3/teams/${page}/simple`, {
      headers: {
          'X-TBA-Auth-Key': API_KEY,
          'Content-Type': 'application/json',
      },
      });

      if (response.data.length == 0) {
        moreTeams = false;
        break;
      }
        
      response.data.forEach(team => {
        connection.execute('INSERT INTO basic_team_data (number, name, city, country) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), country = VALUES(country), city = VALUES(city);', [team.team_number, team.nickname, team.city, team.country]);
      });

      page++;
    }
      console.log("[RoboScouts] - Team List Updated!");
      await connection.end();
  } catch (error) {
    console.error('Error fetching data from TBA API:', error);
    // res.status(500).json({ error: 'An error occurred while fetching data from TBA.' });
  }
}

//gets a random integer between 0-max
async function getRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

//uses the basic_team_data table to fill the team_data table
export async function addAllTeamData(){
  try {
    const connection = await mysql.createConnection(DBconfig);
    var teamsAdded = [];
    const [rows] = await connection.execute("SELECT * FROM basic_team_data");
    for(var i = 0; i < rows.length; i++){
        // teamsAdded.push(rows[i].number);
        await connection.execute("INSERT IGNORE INTO team_data (number, bg_color) VALUES (?, ?)", [rows[i].number, "#"+(await getRandomInt(16777215)).toString(16).padStart(6, '0')]);
    }
    connection.end();
    console.log(`[RoboScouts] - Team Files Added: ${teamsAdded}`);
  } catch (error) {
    console.error("Error creating files:", error);
  }
}

export async function addTeamData(teamNum){
  try{
    const connection = await mysql.createConnection(DBconfig);
    const [rows] = await connection.execute(`SELECT COUNT(*) AS count FROM team_data WHERE number = ?`, [teamNum]);
    if(rows[0].count == 0){
      await connection.execute("INSERT IGNORE INTO team_data (number, bg_color) VALUES (?, ?)", [teamNum, "#"+(await getRandomInt(16777215)).toString(16).padStart(6, '0')]);
      console.log(`[RoboScouts] - Team File Added: ${teamNum}`);
    } else {
      console.log(`[RoboScouts] - File ${teamNum} already exists.`);
    }
    connection.end();
  } catch (err){
    console.error(`Error adding team ${teamNum} to team_data: `, err);
  }
}

export async function deleteAllTeamData(){
  try {
    const connection = await mysql.createConnection(DBconfig);
    await connection.execute(`TRUNCATE TABLE team_data`);
    console.log(`[RoboScouts] - All Team Files Deleted!`);
    connection.end();
  } catch (err) {
    console.error(`Error deleting all team data: `, err);
  }
}

export async function deleteTeamData(teamNum){
  try {
    const connection = await mysql.createConnection(DBconfig);
    await connection.execute(`DELETE FROM team_data WHERE number = ?`, [teamNum]);
    console.log(`[RoboScouts] - Team ${teamNum} Deleted!`);
    connection.end();
  } catch (err) {
    console.error(`Error deleting team ${teamNum}:`, err);
  }
}

export async function editProperty(teamNum, property, newVal){
  try {
    const connection = await mysql.createConnection(DBconfig);
    const [rows] = await connection.execute(`SELECT * FROM team_data WHERE number = ?`, [teamNum]);
    if(rows.length > 0){
      const schemas = {
        number: Joi.number().required(),
        bg_color: Joi.string().regex(/^#[0-9A-Fa-f]{6}$/).required(),
      };

      const schema = schemas[property];

      if(schema){
        const valid = schema.validate(newVal);
        if(valid){
          await connection.execute(`UPDATE team_data SET ${property} = ? WHERE number = ?`, [newVal, teamNum]);
          console.log(`${property} edited successfully!`);
        } else {
          console.error(`New value invalid. Edit property ${property} failed.`);
        }
      } else {
        console.error(`Property ${property} not found.`);
      }
    } else {
      console.error(`Team ${teamNum} not found.`);
    }
    connection.end();
  } catch (err) {
    console.error(`Error editing file ${teamNum}: `, err);
  }
}

export async function deleteProperty(teamNum, property){
  try {
    const connection = await mysql.createConnection(DBconfig);
    const [columns] = await connection.execute(`SHOW COLUMNS FROM team_data WHERE Field = ?`, [property]);
    if(columns.length > 0){
      if(columns[0].Null == 'YES'){
        const [result] = await connection.execute(`UPDATE team_data SET ${property} = NULL WHERE number = ?`, [teamNum]);
        if(result > 0){
          console.log(`Property ${property} deleted successfully!`);
        } else {
          console.error(`Team ${teamNum} not found.`);
        }
      } else {
        console.error(`Property ${property} cannot be null.`);
      }
    } else {
      console.error(`Property ${property} not found.`);
    }
    connection.end();
  } catch (err) {
    console.error(`Error deleting property ${property}: `, err);
  }
}

export async function getProperty(teamNum, property){
  try {
    const connection = await mysql.createConnection(DBconfig);
    const [rows] = await connection.execute(`SELECT ${property} FROM team_data WHERE number = ?`, [teamNum]);
    if(rows.length > 0){
      return rows[0][property];
    } else {
      console.error(`Could not find property ${property} from team ${teamNum}`);
    }
    connection.end();
  } catch (err) {
    console.error(`Error getting property ${property}: `, err);
  }
}

//filters teams by name
export async function filterByName(str, pageLen, pageNum){
  try{
    const connection = await mysql.createConnection(DBconfig);
    const [rows] = await connection.execute(`SELECT * FROM basic_team_data WHERE LOWER(name) LIKE LOWER(CONCAT('%', ?, '%'))`, [str]);
    connection.end();
    var matchCount = 0;
    var page = [];

    for(var i = (pageNum-1)*pageLen; i < pageNum*pageLen; i++){
        page.push(rows[i]);
    }

    return page;
  } catch (err) {
    console.error("Filter by name failed:", err);
  }
}

//get team name by num
export async function findNameByNum(teamNum){
  const connection = await mysql.createConnection(DBconfig);
  const [rows] = await connection.execute(`SELECT name FROM basic_team_data WHERE number = ?`, [teamNum]);
  connection.end();

  if(rows.length > 0){
    return rows[0].name;
  } else{
    return null;
  }
}

//get team num by name
export async function findNumByName(teamName){
  const connection = await mysql.createConnection(DBconfig);
  var [rows] = await connection.execute(`SELECT number FROM basic_team_data WHERE LOWER(REPLACE(name, ' ', '')) = LOWER(REPLACE(?, ' ', ''))`, [teamName]);
  connection.end();

  if(rows.length > 0){
    return rows[0].number;
  } else{
    return null;
  }
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