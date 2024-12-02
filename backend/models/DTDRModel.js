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

    const [result] = await pool.execute(`
      INSERT IGNORE INTO detailed_team_data_records (team_number)
      VALUES ${placeholders}`,
      values.flat()
    );
      
    return result;
  } catch (error) {
    throw error;
  }
}

//upsert using SB team info
export async function upsert(team){
  try {
    const [result] = await pool.execute(`
      INSERT INTO detailed_team_data_records (team_number, season_wins, season_losses, season_ties, season_count, season_winrate, full_wins, full_losses, full_ties, full_count, full_winrate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE season_wins = VALUES(season_wins), season_losses = VALUES(season_losses), season_ties = VALUES(season_ties), season_count = VALUES(season_count), season_winrate = VALUES(season_winrate), full_wins = VALUES(full_wins), full_losses = VALUES(full_losses), full_ties = VALUES(full_ties), full_count = VALUES(full_count), full_winrate = VALUES(full_winrate)`,
      [team.team, team.record.season.wins, team.record.season.losses, team.record.season.ties, team.record.season.count, team.record.season.winrate, team.record.full.wins, team.record.full.losses, team.record.full.ties, team.record.full.count, team.record.full.winrate]
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
      team.team, team.record.season.wins, team.record.season.losses, team.record.season.ties, team.record.season.count, team.record.season.winrate, team.record.full.wins, team.record.full.losses, team.record.full.ties, team.record.full.count, team.record.full.winrate
    ]);
    const placeholders = teamList
    .map(() => `(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .join(", ");

    const [result] = await pool.execute(`
      INSERT INTO detailed_team_data_records (team_number, season_wins, season_losses, season_ties, season_count, season_winrate, full_wins, full_losses, full_ties, full_count, full_winrate)
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE season_wins = VALUES(season_wins), season_losses = VALUES(season_losses), season_ties = VALUES(season_ties), season_count = VALUES(season_count), season_winrate = VALUES(season_winrate), full_wins = VALUES(full_wins), full_losses = VALUES(full_losses), full_ties = VALUES(full_ties), full_count = VALUES(full_count), full_winrate = VALUES(full_winrate)`,
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
    const [result] = await pool.execute(`SELECT ${field} FROM detailed_team_data_records WHERE team_number = ?`, [teamNum]);
    if (result.length == 0) {
      return null;
    }
    return result;
  } catch (error) {
    throw error;
  }
}