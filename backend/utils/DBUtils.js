import { BTDModel, CTDModel, DTDModel } from '../models/index.js';

//---------------> Utility functions that interact with DB <---------------

//uses BlueAlliance to get the name, number, city, and country from each team and store it in a table
export async function addAllBTD() {
  try {
    let page = 0;
    let moreTeams = true;
    var teamsAdded = 0;
    
    while(moreTeams){
    const response = await axios.get(`https://www.thebluealliance.com/api/v3/teams/${page}/simple`, {
    headers: {
        'X-TBA-Auth-Key': process.env.TBA_KEY,
        'Content-Type': 'application/json',
    },
    });

    if (response.data.length == 0) {
        moreTeams = false;
        break;
    }
        
    for(const team of response.data){
      const result = await BTDModel.upsert(team);
      teamsAdded += result.changedRows;
    }

    page++;
    }
    console.log(`Teams added to basic team data: ${teamsAdded}`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message
    console.error('Error adding all teams to basic team data:', errorMessage);
  }
}

//uses the basic_team_data table to fill the team_data table
export async function addAllCTD(){
  try {
    var teamsAdded = 0;
    const teams = await BTDModel.selectAll();
    for(var i = 0; i < teams.length; i++){
      const result = await CTDModel.insertIgnore({team_number: teams[i].team_number, bg_color: "#"+(utils.getRandomInt(16777215)).toString(16).padStart(6, '0')});
      teamsAdded += result.affectedRows;
    }
    console.log(`[RoboScouts] - Teams added to custom team data: ${teamsAdded}`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message
    console.error(`Error adding all teams to custom team data:`, errorMessage);
  }
}

export async function teamExists(teamNum){
  const result = await BTDModel.select(teamNum);
  if(result){
    return true;
  } else {
    return false;
  }
}