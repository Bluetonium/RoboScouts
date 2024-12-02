import Joi from 'joi';
import pool from '../config/DBConfig.js';

export async function SBBulkUpsert(teamList){
  try {
    const values = teamList.map((team) => [
      team.team, null, team.name, team.rookie_year, null, team.state, team.country, team.district, null, null,
      team.offseason, team.active, null, team.colors.primary, team.colors.secondary
    ]);
    const placeholders = teamList
    .map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .join(", ");

    const [result] = await pool.execute(`
      INSERT INTO detailed_team_data_general (team_number, name_full, name_short, rookie_year, city, state, country, district, school_name, postal_code, offseason, active, website, primary_color, secondary_color) 
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE name_short = COALESCE(VALUES(name_short), name_short), rookie_year = COALESCE(VALUES(rookie_year), rookie_year), state = COALESCE(VALUES(state), state), country = COALESCE(VALUES(country), country), district = COALESCE(VALUES(district), district), offseason = COALESCE(VALUES(offseason), offseason), active = COALESCE(VALUES(active), active), primary_color = COALESCE(VALUES(primary_color), primary_color), secondary_color = COALESCE(VALUES(secondary_color), secondary_color)`,
      values.flat()
    );
      
    return result;
  } catch (error) {
    throw error;
  }
}

export async function BABulkUpsert(teamList){
  try {
    const values = teamList.map((team) => [
      team.team_number, team.name, team.nickname, team.rookie_year, team.city, team.state_prov, team.country, null, team.school_name,
      team.postal_code, null, null, team.website, null, null
    ]);
    const placeholders = teamList
    .map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .join(", ");

    const [result] = await pool.execute(`
      INSERT INTO detailed_team_data_general (team_number, name_full, name_short, rookie_year, city, state, country, district, school_name, postal_code, offseason, active, website, primary_color, secondary_color) 
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE name_full = COALESCE(VALUES(name_full), name_full), name_short = COALESCE(VALUES(name_short), name_short), rookie_year = COALESCE(VALUES(rookie_year), rookie_year), city = COALESCE(VALUES(city), city), state = COALESCE(VALUES(state), state), country = COALESCE(VALUES(country), country), school_name = COALESCE(VALUES(school_name), school_name), postal_code = COALESCE(VALUES(postal_code), postal_code), website = COALESCE(VALUES(website), website)`,
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
    const [result] = await pool.execute(`SELECT ${field} FROM detailed_team_data_general WHERE team_number = ?`, [teamNum]);
    if (result.length == 0) {
      return null;
    }
    return result;
  } catch (error) {
    throw error;
  }
}