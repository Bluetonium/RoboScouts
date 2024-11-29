import "dotenv/config";
import axios from 'axios';
import { utils, DBUtils } from '../utils/index.js';

//---------------> External API calls that do not interact with DB <---------------

//fetches team info from Blue Alliance using the team num
export async function BATeamInfo(req, res){
  const teamNum = req.params.teamNum;
  const teamKey = "frc" + teamNum;
  try {
    if(await DBUtils.teamExists(teamNum)){
      const response = await axios.get(`https://www.thebluealliance.com/api/v3/team/${teamKey}`, {
        headers: {
          'X-TBA-Auth-Key': process.env.TBA_KEY,
          'Content-Type': 'application/json',
        },
      });
      
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: `Team ${teamNum} does not exist.`});
    }
  } catch (error) {
    utils.errorResponse(res, error, 'BATeamInfo(req, res)');
  }
}
  
//fetches team info from FRC API using the team num
export async function FRCTeamInfo(req, res){
  const teamNum = req.params.teamNum;
  try {
    if(await DBUtils.teamExists(teamNum)){
      const response = await axios.get(`https://frc-api.firstinspires.org/v3.0/2023/teams?teamNumber=${teamNum}`, {
        headers: {
          'Authorization': `Basic ${process.env.FRC_KEY}`,
          'Accept': 'application/json',
        },
      });
      
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: `Team ${teamNum} does not exist.`});
    }
  } catch (error) {
    utils.errorResponse(res, error, 'FRCTeamInfo(req, res)');
  }
}

//fetches team info from Statbotics using the team num
export async function SBTeamInfo(req, res){
  const teamNum = req.params.teamNum;
  try {
    if(await DBUtils.teamExists(teamNum)){
      const response = await axios.get(`https://api.statbotics.io/v3/team/${teamNum}`, {
      });
      
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: `Team ${teamNum} does not exist.`});
    }
  } catch (error) {
    utils.errorResponse(res, error, 'SBTeamInfo(req, res)');
  }
}

//get team info from all 3 sources; TO-DO: fix error with robotName, homeCMP, and website fields not showing up
export async function allTeamInfo(req, res){
  try {
    const teamNum = req.params.teamNum;
    const teamKey = "frc" + teamNum;
    var BAResponse;
    var FRCResponse;
    var SBResponse;

    if(await DBUtils.teamExists(teamNum)){
      [BAResponse, FRCResponse, SBResponse] = await Promise.all([
        axios.get(`https://www.thebluealliance.com/api/v3/team/${teamKey}`, {
          headers: {
            'X-TBA-Auth-Key': process.env.TBA_KEY,
            'Content-Type': 'application/json',
          },
        }),
        axios.get(`https://frc-api.firstinspires.org/v3.0/2023/teams?teamNumber=${teamNum}`, {
          headers: {
            'Authorization': `Basic ${process.env.FRC_KEY}`,
            'Accept': 'application/json',
          },
        }),
        axios.get(`https://api.statbotics.io/v3/team/${teamNum}`),
      ]);

      const response = {
        team_number: BAResponse.data.team_number || FRCResponse.data.teams[0].teamNumber,
        name_full: BAResponse.data.name || FRCResponse.data.teams[0].name,
        name_short: BAResponse.data.nickname || FRCResponse.data.teams[0].nameShort,
        rookie_year: BAResponse.data.rookie_year || FRCResponse.data.teams[0].rookieYear,
        city: BAResponse.data.city || FRCResponse.data.teams[0].city,
        state: BAResponse.data.state_prov || FRCResponse.data.teams[0].stateProv || SBResponse.data.state,
        country: BAResponse.data.country || FRCResponse.data.teams[0].country || SBResponse.data.country,
        district: SBResponse.data.district || FRCResponse.data.districtCode,
        school_name: BAResponse.data.school_name || FRCResponse.data.schoolName,
        postal_code: BAResponse.data.postal_code,
        address: BAResponse.data.address,
        gmaps_place_id: BAResponse.data.gmaps_place_id,
        gmaps_url: BAResponse.data.gmaps_url,
        lat: BAResponse.data.lat,
        lng: BAResponse.data.lng,
        location_name: BAResponse.data.location_name,
        offseason: SBResponse.data.offseason,
        active: SBResponse.data.active,
        robot_name: FRCResponse.data.robotName,
        motto: BAResponse.data.motto,
        home_cmp: FRCResponse.data.homeCMP,
        website: BAResponse.data.website || FRCResponse.data.website,
        colors: {
          primary: SBResponse.data.colors.primary,
          secondary: SBResponse.data.colors.secondary,
        },
        record: {
          season: {
            wins: SBResponse.data.record.season.wins,
            losses: SBResponse.data.record.season.losses,
            ties: SBResponse.data.record.season.ties,
            count: SBResponse.data.record.season.count,
            winrate: SBResponse.data.record.season.winrate,
          },
          full: {
            wins: SBResponse.data.record.full.wins,
            losses: SBResponse.data.record.full.losses,
            ties: SBResponse.data.record.full.ties,
            count: SBResponse.data.record.full.count,
            winrate: SBResponse.data.record.full.winrate,
          }
        },
        normEPA: {
          current: SBResponse.data.norm_epa.current,
          recent: SBResponse.data.norm_epa.recent,
          mean: SBResponse.data.norm_epa.mean,
          max: SBResponse.data.norm_epa.max,
        }
      }
      
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: `Team ${teamNum} does not exist.`});
    }
  } catch (error) {
    utils.errorResponse(res, error, 'allTeamInfo(req, res)');
  }
}