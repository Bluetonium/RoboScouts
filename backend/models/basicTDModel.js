import 'dotenv/config';
import Joi from 'joi';
import pool from '../config/DBConfig.js';

export const BTDSchema = Joi.object({
  team_number: Joi.number().integer().min(1).max(99999),
  name: Joi.string().min(1).max(100),
  city: Joi.string().min(1).max(100),
  country: Joi.string().min(1).max(100)
});

export async function upsert(team){
  try {
    const [result] = await pool.execute('INSERT INTO basic_team_data (team_number, name, city, country) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), country = VALUES(country), city = VALUES(city);', [team.team_number, team.nickname, team.city, team.country]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function selectAll(){
  try {
    const [result] = await pool.execute('SELECT * FROM basic_team_data');
    return result;
  } catch (err) {
    throw err;
  }
}

//selects specified field from specified team
export async function select(teamNum, field = '*') {
  try {
    const [result] = await pool.execute(`SELECT ${field} FROM basic_team_data WHERE team_number = ?`, [teamNum]);
    if (result.length == 0) {
      return null;
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function selectByName(str){
  try {
    const [result] = await pool.execute(`SELECT * FROM basic_team_data WHERE LOWER(REPLACE(name, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(?, ' ', ''), '%'))`, [str]);
    if (result.length == 0) {
      return null;
    }
    return result;
  } catch (err) {
    throw err;
  }
}