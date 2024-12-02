import "dotenv/config";
import mysql from 'mysql2/promise';
import Joi from 'joi';
import { utils } from '../utils/index.js';
import { CTDModel } from '../models/index.js';

//---------------> Functions that interact with custom_team_data table <---------------

export async function addTeam(req, res) {
  const teamNum = req.params.teamNum;

  try{
    const teams = CTDModel.select(teamNum);
    if(teams == null){
      await CTDModel.insertIgnore({team_number: teamNum, bg_color: "#"+(utils.getRandomInt(16777215)).toString(16).padStart(6, '0')});
      res.status(200).json(`Team added: ${teamNum}`);
    } else {
      res.status(400).json({ error: `Team ${teamNum} already exists.` });
    }
  } catch (error){
    utils.errorResponse(res, error, 'addTeam(req, res)');
  }
}

export async function getTeam(req, res){
  const teamNum = req.params.teamNum;

  try {
    const teams = await CTDModel.select(teamNum);
    if(teams) res.status(200).json(teams[0]);
    else res.status(400).json({ error: `Could not find team ${teamNum}.` });
  } catch (error) {
    utils.errorResponse(res, error, 'getTeam(req, res)');
  }
}

export async function getField(req, res){
  const teamNum = req.params.teamNum;
  const field = req.params.field;

  try {
    const result = await CTDModel.select(teamNum, field);
    if(result) res.status(200).json(result[0][field]);
    else res.status(400).json({ error: `Could not find field ${field} from team ${teamNum}.` });
  } catch (error) {
    utils.errorResponse(res, error, 'getField(req, res)');
  }
}

export async function editTeam(req, res){
  const teamNum = req.params.teamNum;
  const data = req.body;

  try {
    const result = await CTDModel.update(teamNum, data);
    if(result) res.status(200).json(result);
    else res.status(400).json({ error: `Could not find team ${teamNum}.`});
  } catch (error) {
    utils.errorResponse(res, error, 'editTeam(req, res)');
  }
}

export async function deleteTeam(req, res){
  const teamNum = req.params.teamNum;

  try {
    const result = await CTDModel.remove(teamNum);
    if(result) res.status(200).json(result);
    else res.status(400).json({ error: `Could not find team ${teamNum}.`});
  } catch (error) {
    utils.errorResponse(res, error, 'deleteTeam(teamNum)');
  }
}

// export async function deleteField(teamNum, field){
//   try {
//     if(await utils.fieldExists(field)){
//       if(field.Null == 'YES'){
//         const [result] = CTDModel.update(teamNum, field, 'NULL');
//         if(result > 0){
//           console.log(`Field ${field} deleted successfully!`);
//         } else {
//           console.error(`Team ${teamNum} not found.`);
//         }
//       } else {
//         console.error(`Field ${field} cannot be null.`);
//       }
//     } else {
//       console.error(`Field ${field} not found.`);
//     }
//   } catch (err) {
//     utils.errorResponse(res, error, 'deleteField(req, res)');
//   }
// }