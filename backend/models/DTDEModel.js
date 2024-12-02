import Joi from 'joi';
import pool from '../config/DBConfig.js';

//insert ignore all team numbers using BA team info
export async function BABulkInitTeams(teamList){
  try {
    const values = teamList.map((team) => [
      team.team_number
    ]);
    const placeholders = teamList
    .map(() => `(?)`)
    .join(", ");

    const [result] = await pool.execute(`INSERT IGNORE INTO detailed_team_data_epa (team_number) VALUES ${placeholders}`, values.flat());
      
    return result;
  } catch (error) {
    throw error;
  }
}

//upsert using SB team info
export async function upsert(team){
  try {
    const [result] = await pool.execute(`
      INSERT INTO detailed_team_data_epa (team_number, current, recent, mean, max) 
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE current = VALUES(current), recent = VALUES(recent), mean = VALUES(mean), max = VALUES(max)`,
      [team.team, team.norm_epa.current, team.norm_epa.recent, team.norm_epa.mean, team.norm_epa.max]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

//bulk upsert using SB team info
export async function bulkUpsert(teamList){
  try {
    const values = teamList.map((team) => [
      team.team, team.norm_epa.current, team.norm_epa.recent, team.norm_epa.mean, team.norm_epa.max
    ]);
    const placeholders = teamList
    .map(() => `(?, ?, ?, ?, ?)`)
    .join(", ");

    const [result] = await pool.execute(`
      INSERT INTO detailed_team_data_epa (team_number, current, recent, mean, max) 
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE current = VALUES(current), recent = VALUES(recent), mean = VALUES(mean), max = VALUES(max)`,
      values.flat()
    );

    return result;
  } catch (error) {
    throw error;
  }
}

//selects specified field from specified team
export async function select(teamNum, field = '*') {
  try {
    const [result] = await pool.execute(`SELECT ${field} FROM detailed_team_data_epa WHERE team_number = ?`, [teamNum]);
    if (result.length == 0) {
      return null;
    }
    return result;
  } catch (error) {
    throw error;
  }
}