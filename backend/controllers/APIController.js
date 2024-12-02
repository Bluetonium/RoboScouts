import "dotenv/config";
import axios from 'axios';
import { utils } from '../utils/index.js';
import { fetchAPIData } from '../services/index.js';

//---------------> External API calls that do not interact with DB <---------------

//fetches team info from Blue Alliance using the team num
export async function BATeamInfo(req, res){
  const teamNum = req.params.teamNum;

  try {
    const response = await fetchAPIData.getTeamBA(teamNum);
    
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error(`Error from 'BATeamInfo':`, errorMessage);
    res.status(400).json({ error: `Team ${teamNum} not found.` });
  }
}

//fetches team info from Statbotics using the team num
export async function SBTeamInfo(req, res){
  const teamNum = req.params.teamNum;
  try {
    const response = await fetchAPIData.getTeamSB(teamNum);
    
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error(`Error from 'SBTeamInfo':`, errorMessage);
    res.status(400).json({ error: `Team ${teamNum} not found.` });
  }
}

//fetches team info from FRC API using the team num
export async function FRCTeamInfo(req, res){
  const teamNum = req.params.teamNum;

  try {
    const response = await fetchAPIData.getTeamFRC(teamNum);
    
    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error(`Error from 'FRCTeamInfo':`, errorMessage);
    res.status(400).json({ error: `Team ${teamNum} not found.` });
  }
}