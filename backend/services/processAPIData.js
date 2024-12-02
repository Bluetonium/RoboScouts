import { response } from 'express';
import { fetchAPIData } from '../services/index.js';
import { BTDModel, CTDModel, DTDGModel, DTDEModel, DTDRModel } from '../models/index.js';

//---------------> Processes API data to be stored in a table or formatted into a response <---------------

//---------------> Functions to autofill team data tables <---------------
export async function addAllBTD() {
  try {
    let page = 0;
    let moreTeams = true;
    var teamsAdded = 0;
    
    while(moreTeams){
      const response = await fetchAPIData.getTeamsSimpleBA(page);

      if (response.length == 0) {
        moreTeams = false;
        break;
      }
          
      for(const team of response){
        const result = await BTDModel.upsert(team);
        teamsAdded += result.changedRows;
      }

      page++;
    }

    console.log(`Teams added to basic team data: ${teamsAdded}`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error('Error adding all teams to basic team data:', errorMessage);
  }
}

//uses the basic_team_data table to fill the custom_team_data table
export async function addAllCTD(){
  try {
    var teamsAdded = 0;
    const teams = await BTDModel.selectAll();
    for(var i = 0; i < teams.length; i++){
      const result = await CTDModel.insertIgnore({team_number: teams[i].team_number, bg_color: "#"+(utils.getRandomInt(16777215)).toString(16).padStart(6, '0')});
      teamsAdded += result.affectedRows;
    }
    console.log(`Teams added to custom team data: ${teamsAdded}`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error(`Error adding all teams to custom team data:`, errorMessage);
  }
}

//uses basic_team_data table to fill the detailed_team_data_general table
export async function addAllDTDG(){
  try {
    //get list of all teams from both sources
    var [BATeamList, SBTeamList] = await Promise.all([
      fetchAPIData.getAllTeamsBA(),
      fetchAPIData.getAllTeamsSB()
    ]);
    var BATeamsAdded = 0;
    var SBTeamsAdded = 0;

    const batchSize = 100;

    //only keep SB teams that are also in BA
    SBTeamList = SBTeamList.filter(SBTeam => 
      BATeamList.some(BATeam => BATeam.team_number == SBTeam.team)
    );

    //add all SB team info first
    for (let i = 0; i < SBTeamList.length; i += batchSize) {
      const batch = SBTeamList.slice(i, i + batchSize);
      const result = await DTDGModel.SBBulkUpsert(batch);
      SBTeamsAdded += result.changedRows;
    }

    //add all BA team info last, if value is NN it will override previous SB value
    for (let i = 0; i < BATeamList.length; i += batchSize) {
      const batch = BATeamList.slice(i, i + batchSize);
      const result = await DTDGModel.BABulkUpsert(batch);
      BATeamsAdded += result.changedRows;
    }

    console.log(`All teams added to detailed team data general:\n- Teams updated from BA: ${BATeamsAdded}\n- Teams updated from SB: ${SBTeamsAdded}`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error(`Error adding all teams to detailed team data general:`, error);
  }
}

export async function addAllDTDER(){
  try {
    //get list of teams from both sources, got simple list for BA since we only need team_number
    var [BATeams, SBTeamList] = await Promise.all([
      BTDModel.selectAll(),
      fetchAPIData.getAllTeamsSB()
    ]);

    var teamsInitDTDE = 0;
    var teamsInitDTDR = 0;
    var teamsAddedDTDE = 0;
    var teamsAddedDTDR = 0;

    const batchSize = 100;

    //only keep SB teams that are also in BA
    SBTeamList = SBTeamList.filter(SBTeam => 
      BATeams.some(BATeam => BATeam.team_number == SBTeam.team)
    );

    //add all team numbers to the tables first
    for (let i = 0; i < BATeams.length; i += batchSize) {
      const batch = BATeams.slice(i, i + batchSize);
      const [resultDTDE, resultDTDR] = await Promise.all([
        DTDEModel.BABulkInitTeams(batch),
        DTDRModel.BABulkInitTeams(batch),
      ]);
      
      teamsInitDTDE += resultDTDE.changedRows;
      teamsInitDTDR += resultDTDR.changedRows;
    }

    //add SB epa + records data
    for (let i = 0; i < SBTeamList.length; i += batchSize) {
      const batch = SBTeamList.slice(i, i + batchSize);
      const [resultDTDE, resultDTDR] = await Promise.all([
        DTDEModel.bulkUpsert(batch),
        DTDRModel.bulkUpsert(batch)
      ]);
      
      teamsAddedDTDE += resultDTDE.changedRows;
      teamsAddedDTDR += resultDTDR.changedRows;
    }

    console.log(`All teams initialized in detailed team data epa and records:\n- Teams initialized in DTDE: ${teamsInitDTDE}\n- Teams initialized in DTDR: ${teamsInitDTDR}\nAll teams added to detailed team data epa and records:\n- Teams updated in DTDE: ${teamsAddedDTDE}\n- Teams updated in DTDR: ${teamsAddedDTDR}`);
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error(`Error adding all teams to detailed team data epa and records:`, errorMessage);
  }
}