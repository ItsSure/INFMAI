import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  const port = 3000;

  if (mode === "development") {
    return {
      server: {
        port,
      },
    };
  } else {
    return {
      base: process.env.VITE_BASE_URL || "/",
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.html"),
            home: resolve(__dirname, "src", "pages", "home.html"),
            404: resolve(__dirname, "src", "pages", "404.html"),
            about: resolve(__dirname, "src", "pages", "about.html"),
            contact: resolve(__dirname, "src", "pages", "contact.html"),
            explore: resolve(__dirname, "src", "pages", "explore.html"),
          },
        },
      },
    };
  }
});
