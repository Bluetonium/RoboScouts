import express from 'express';
import { APIController, CTDController, DTDController, searchController } from '../controllers/index.js';
import * as validate from '../middleware/validation.js';

const router = express.Router();

// endpoints
//---------------> Goes to APIController <---------------
router.get('/team/:teamNum/ba', validate.teamNum, APIController.BATeamInfo);
router.get('/team/:teamNum/frc', validate.teamNum, APIController.FRCTeamInfo);
router.get('/team/:teamNum/sb', validate.teamNum, APIController.SBTeamInfo);
// router.get('/team/:teamNum/all', validate.teamNum, APIController.allTeamInfo);

//---------------> Goes to CTDController <---------------
router.post('/team/:teamNum/custom', validate.teamNum, CTDController.addTeam);
router.get('/team/:teamNum/custom', validate.teamNum, CTDController.getTeam);
router.get('/team/:teamNum/:field/custom', validate.teamNum, validate.customField, CTDController.getField);
router.delete('/team/:teamNum/custom', validate.teamNum, CTDController.deleteTeam);
router.patch('/team/:teamNum/custom', validate.teamNum, validate.body, CTDController.editTeam);

//---------------> Goes to DTDController <---------------
router.get('/team/:teamNum/detailed', validate.teamNum, DTDController.getTeam);
  
//---------------> Goes to searchController <---------------
router.get('/teams/search/number/:teamNum', validate.teamNum, searchController.findNameByNum);
router.get('/teams/search/name/:teamName', validate.teamName,  searchController.findNumByName);
router.get('/teams/search/:pageNum/:pageLen', validate.page, searchController.getAllTeams);
router.get('/teams/search/:pageNum/:pageLen/:string', validate.string, validate.page, searchController.filterByName);

export default router;