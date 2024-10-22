import { loadGameAssets } from "./assets.js";

const initServer = async () => {
  try {
    await loadGameAssets();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
