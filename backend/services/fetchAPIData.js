import 'dotenv/config';
import axios from 'axios';

//---------------> Fetches data from external APIs <---------------

export async function getTeamBA(teamNum){
  try {
    const teamKey = "frc" + teamNum;

    const result = await axios.get(`https://www.thebluealliance.com/api/v3/team/${teamKey}`, {
      headers: {
        'X-TBA-Auth-Key': process.env.TBA_KEY,
        'Content-Type': 'application/json',
      },
    });

    return result.data;
  } catch (error){
    throw error;
  }
}

export async function getTeamsBA(page){
  try {
    const result = await axios.get(`https://www.thebluealliance.com/api/v3/teams/${page}`, {
      headers: {
        'X-TBA-Auth-Key': process.env.TBA_KEY,
        'Content-Type': 'application/json',
      },
    });

    return result.data;
  } catch (error){
    throw error;
  }
}

export async function getTeamsSimpleBA(page){
  const result = await axios.get(`https://www.thebluealliance.com/api/v3/teams/${page}/simple`, {
    headers: {
      'X-TBA-Auth-Key': process.env.TBA_KEY,
      'Content-Type': 'application/json',
    },
  });

  return result.data;
}


export async function getAllTeamsBA(){
  let page = 0;
  let moreTeams = true;
  var teamList = [];
  
  while(moreTeams){
    const response = await getTeamsBA(page);

    if (response.length == 0) {
      moreTeams = false;
      break;
    }
        
    teamList.push(response);

    page++;
  }

  return teamList.flat();
}

export async function getTeamSB(teamNum){
  try {
    const result = await axios.get(`https://api.statbotics.io/v3/team/${teamNum}`, {
    });

    return result.data;
  } catch (error){
    throw error;
  }
}

export async function getTeamsSB(pageLen, page){
  try {
    const result = await axios.get(`https://api.statbotics.io/v3/teams?limit=${pageLen}&offset=${page}`, {
      headers: {
        'X-TBA-Auth-Key': process.env.TBA_KEY,
        'Content-Type': 'application/json',
      },
    });

    return result.data;
  } catch (error){
    throw error;
  }
}

export async function getAllTeamsSB(){
  let page = 0;
  let moreTeams = true;
  var teamList = [];
  
  while(moreTeams){
    const response = await getTeamsSB(1000, page*1000);

    if (response.length == 0) {
      moreTeams = false;
      break;
    }
        
    teamList.push(response);

    page++;
  }

  return teamList.flat();
}

export async function getTeamFRC(teamNum){
  try {
    const result = await axios.get(`https://frc-api.firstinspires.org/v3.0/2023/teams?teamNumber=${teamNum}`, {
      headers: {
        'Authorization': `Basic ${process.env.FRC_KEY}`,
        'Accept': 'application/json',
      },
    });

    return result.data;
  } catch (error){
    throw error;
  }
}