import 'dotenv/config';
import Joi from 'joi';
import pool from '../config/DBConfig.js';

export const CTDSchema = Joi.object({
  team_number: Joi.number().integer().min(1).max(99999),
  bg_color: Joi.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

//takes in a data object and inserts to table
export async function insertIgnore(data) {
  try {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => '?').join(', ');

    const [result] = await pool.execute(`INSERT IGNORE INTO custom_team_data (${fields.join(', ')}) VALUES (${placeholders})`, values);
    return result;
  } catch (err) {
    throw err;
  }
}

//selects specified field from specified team, or all if left empty
export async function select(teamNum, field = '*') {
  try {
    const [result] = await pool.execute(`SELECT ${field} FROM custom_team_data WHERE team_number = ?`, [teamNum]);
    if (result.length == 0) {
      return null;
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function update(teamNum, data) {
  try {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const [result] = await pool.execute(`UPDATE custom_team_data SET ${setClause} WHERE team_number = ?`, [...values, teamNum]);
    return result;
  } catch (err) {
    throw err;
  }
}

export async function remove(teamNum){
  try {
    const [result] = await pool.execute(`DELETE FROM custom_team_data WHERE team_number = ?`, [teamNum]);
    return result;
  } catch (err) {
    throw err;
  }
}

// export async function fieldExists(field){
//   try {
//     const [columns] = await pool.execute(`SHOW COLUMNS FROM custom_team_data WHERE Field = ?`, [field]);
//     if(columns.length > 0){
//       return true;
//     } else {
//       return false;
//     }
//   } catch (err) {
//     throw err;
//   }
// }