import express from 'express';
import { apiControl, CTDControl, DTDControl, searchControl } from '../controllers/index.js';
import * as validate from '../middleware/validation.js';

const router = express.Router();

// endpoints
//---------------> Goes to apiControl <---------------
router.get('/team/:teamNum/ba', validate.teamNum, apiControl.BATeamInfo);
router.get('/team/:teamNum/frc', validate.teamNum, apiControl.FRCTeamInfo);
router.get('/team/:teamNum/sb', validate.teamNum, apiControl.SBTeamInfo);
router.get('/team/:teamNum/all', validate.teamNum, apiControl.allTeamInfo);

//---------------> Goes to CTDControl <---------------
router.post('/team/:teamNum/custom', validate.teamNum, CTDControl.addTeam);
router.get('/team/:teamNum/custom', validate.teamNum, CTDControl.getTeam);
router.get('/team/:teamNum/:field/custom', validate.teamNum, validate.customField, CTDControl.getField);
router.delete('/team/:teamNum/custom', validate.teamNum, CTDControl.deleteTeam);
router.patch('/team/:teamNum/custom', validate.teamNum, validate.body, CTDControl.editTeam);
  
//---------------> Goes to searchControl <---------------
router.get('/teams/search/number/:teamNum', validate.teamNum, searchControl.findNameByNum);
router.get('/teams/search/name/:teamName', validate.teamName,  searchControl.findNumByName);
router.get('/teams/search/:pageNum/:pageLen', validate.page, searchControl.getAllTeams);
router.get('/teams/search/:pageNum/:pageLen/:string', validate.string, validate.page, searchControl.filterByName);

export default router;