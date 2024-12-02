import "dotenv/config";
import { BTDModel } from '../models/index.js';
import { utils } from '../utils/index.js';

//---------------> Filter functions for search page <---------------

export async function getAllTeams(req, res) {
  try {
    const pageNum = req.params.pageNum;
    const pageLen = req.params.pageLen;

    const teams = await BTDModel.selectAll();
    const page = utils.paginate(teams, pageNum, pageLen);
    res.status(200).json(page);
  } catch (error) {
    utils.errorResponse(res, error, 'getAllTeams(req, res)');
  }
}

//filters teams by name
export async function filterByName(req, res){
  try {
    const str = req.params.string;
    const pageNum = req.params.pageNum;
    const pageLen = req.params.pageLen;
    var page = [];
  
    const teams = await BTDModel.selectByName(str);
    if(teams) page = utils.paginate(teams, pageNum, pageLen);
    res.status(200).json(page);
  } catch (error) {
    utils.errorResponse(res, error, 'filterByName(req, res)');
  }
}
  
//get team name by num
export async function findNameByNum(req, res){
  try {
  const teamNum = req.params.teamNum;

  const names = await BTDModel.select(teamNum, 'name');

  if(names){
    res.status(200).json(names[0].name);
  } else{
    res.status(400).json(`Could not find team with the number ${teamNum}.`);
  }
  } catch (error){
    utils.errorResponse(res, error, 'findNameByNum(req, res)');
  }
}
  
//returns the number of the first team that contains the input string
export async function findNumByName(req, res){
  try {
    const teamName = req.params.teamName; 

    var result = await BTDModel.selectByName(teamName);

    if(result){
      res.status(200).json(result[0].team_number);
    } else{
      res.status(400).json(`Could not find team with the name ${teamNum}.`);
    }
  } catch (error) {
    utils.errorResponse(res, error, 'findNumByName(req, res)');
  }
}