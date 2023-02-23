/**
 * Note: This is a messy pseudo test file that I created because I couldn't be bothered 
 * to find out how Jest handles arrays. Maybe one day.
 * 
 * TODO: document
 * TODO: use errors array for summary
 * TODO: check AWS folders exist
 */
import { BasicGoal, FormattedPlayer, FormattedTeam } from '../custom-types';
import { getAndParseExistingFile } from './footballData/utils';

type Error = {
  i: number,
  error: string,
  id?: string
}

const addGoalErrorToArr = (errors: Error[], error: Error) => {
  console.log(`❌ Goal ${error.id || `#${error.i}`}: ${error.error}`)
  errors.push(error);
  return errors;
}

/** Test the goals file is internally consistent, ie object ids match up */
const testGoals = async () => {
  let errors: Error[] = [];
  const goals = await getAndParseExistingFile('goals') as BasicGoal[];

  goals.forEach((goal, i: number) => {
    let goalErrors: Error[] = [];
    const id = goal.id;

    if (!id) {
      goalErrors = addGoalErrorToArr(goalErrors, {
        i,
        error: 'No id',
      });
      return;
    }

    const idParts = id.split('-');
    const teamA = `${idParts[0]}-${idParts[1]}`;
    const teamB = `${idParts[2]}-${idParts[3]}`;
    const year = `${idParts[4]}`;
    const competition = `${idParts[5]}`;

    if (teamA !== goal.teamA) {
      goalErrors = addGoalErrorToArr(goalErrors, {
        i,
        id: goal.id,
        error: `Team A: ${teamA} - ${goal.teamA}`,
      });
    }

    if (teamB !== goal.teamB) {
      goalErrors = addGoalErrorToArr(goalErrors, {
        i,
        id: goal.id,
        error: `Team B: ${teamB} - ${goal.teamB}`,
      });
    }

    if (year !== goal.year) {
      goalErrors = addGoalErrorToArr(goalErrors, {
        i,
        id: goal.id,
        error: `Year: ${year} - ${goal.year}`,
      });
    }

    if (competition !== goal.competition) {
      goalErrors = addGoalErrorToArr(goalErrors, {
        i,
        id: goal.id,
        error: `Competition: ${competition} - ${goal.competition}`,
      });
    }

    if (goal.goalScoredFor !== teamA && goal.goalScoredFor !== teamB) {
      goalErrors = addGoalErrorToArr(goalErrors, {
        i,
        id: goal.id,
        error: `Goal scored for: ${goal.goalScoredFor} - ${teamA} or ${teamB}`,
      });
    }

    errors.concat(goalErrors);

    if (!goalErrors.length) {
      console.log(`✅ Goal ${id}: Passed ID Check`);
    }
  })
}

const testPlayersAndTeamsExist = async () => {
  let errors: Error[] = [];
  const goals = await getAndParseExistingFile('goals') as BasicGoal[];
  const teams = await getAndParseExistingFile('teams') as FormattedTeam[];
  const players = await getAndParseExistingFile('players') as FormattedPlayer[];


  goals.forEach((goal, i: number) => {
    let isError = false;
    const teamA = goal.teamA;
    const teamB = goal.teamB;
    const player = goal.player;

    const foundA = teams.find(t => t.id === teamA);
    if (!foundA) {
      isError = true;
      console.log(`❌ Goal ${goal.id || `#${i}`}: Team A (${teamA}) not found`);
    }
    const foundB = teams.find(t => t.id === teamB);
    if (!foundB) {
      isError = true;
      console.log(`❌ Goal ${goal.id || `#${i}`}: Team B (${teamB}) not found`);
    }
    const foundPlayer = players.find(p => p.id === player);
    if (!foundPlayer) {
      isError = true;
      console.log(`❌ Goal ${goal.id || `#${i}`}: Player (${player}) not found`);
    }

    if (!isError) {
      console.log(`✅ Goal ${goal.id || `#${i}`}: Passed Teams/Player Check`);
    }
  });

  console.log(`${goals.length} goals checked.`)

}

const init = async () => {
  await testGoals();
  console.log('==================');
  await testPlayersAndTeamsExist();
}

init();