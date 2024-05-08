import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  const port = 3000;

  // console.log(command, mode);
  // const env = loadEnv(mode, process.cwd());
  // console.log(env.VITE_NAME);

  if (mode === "development") {
    // console.log("modo desarrollo");
    return {
      server: {
        port,
      },
    };
  } else {
    // console.log("modo produccion");
    return {
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
            home: resolve(__dirname, "src", "pages", "home.html"),
            404: resolve(__dirname, "src", "pages", "404.html"),
            about: resolve(__dirname, "src", "pages", "about.html"),
            contact: resolve(__dirname, "src", "pages", "contact.html"),
            explore: resolve(__dirname, "src", "pages", "explore.html"),
            explorejs: resolve(__dirname, "src", "js", "explore.js"),
          },
        },
      },
    };
  }
});
