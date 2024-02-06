import {
  getAndParseExistingFile,
  updateExistingFile,
} from "./footballData/utils";

const appendV1Tag = async () => {
  const goals = await getAndParseExistingFile("goals");
  const updatedGoals = goals.map((goal: any) => ({
    ...goal,
    version: 1,
  }));

  await updateExistingFile(updatedGoals, "goals");
};

appendV1Tag();
