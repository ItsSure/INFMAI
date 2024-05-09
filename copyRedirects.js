import { copy } from "fs-extra";

(async () => {
  try {
    await copy("_redirects", "dist/_redirects");
    console.log("Redirects copied successfully.");
  } catch (err) {
    console.error("Error copying redirects:", err);
    process.exit(1);
  }
})();
