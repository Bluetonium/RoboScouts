import "dotenv/config";
import mysql from 'mysql2/promise';
import Joi from 'joi';
import { utils } from '../utils/index.js';
import { DTDGModel, DTDEModel, DTDRModel } from '../models/index.js';

//---------------> Functions that interact with the DTD tables <---------------

//gets team info from all 3 DTD tables
export async function getTeam(req, res){
  try {
    const teamNum = req.params.teamNum;

    const DTDGResponse = await DTDGModel.select(teamNum);
    const DTDEResponse = await DTDEModel.select(teamNum);
    const DTDRResponse = await DTDRModel.select(teamNum);
    if(DTDGResponse){
      const combinedResponse = {...DTDGResponse[0], "record": {...DTDRResponse[0]}, "epa": {...DTDEResponse[0]}};
      res.status(200).json(combinedResponse);
    } else {
      res.status(400).json({ error: `Team ${teamNum} not found.` });
    }
  } catch (error) {
    utils.errorResponse(res, error, 'getTeam(req, res)');
  }
}