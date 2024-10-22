import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
