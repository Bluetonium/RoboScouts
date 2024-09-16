import "dotenv/config";
import fs from "fs";
import axios from 'axios';

const path = "./data.json";
const API_KEY = process.env.TBA_KEY;

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

export function writeData(d) {
  try {
    fs.writeFileSync(path, JSON.stringify(d, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
  }
}

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