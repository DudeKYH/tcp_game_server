import pools from "../db/database.js";
import { testAllConnections } from "../utils/db/testConnection.js";
import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
    await testAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
