import { Routes } from "../utils/consts.js";

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = Routes[path] || Routes[404];
  const basePath = window.location.origin;
  let resourcePath = "";
  if (path === "/explore") {
    resourcePath = "/assets/explorejs-djjztg7f.js";
  } else {
    resourcePath = route.startsWith("/") ? route : "/assets/" + route;
  }

  try {
    const response = await fetch(basePath + resourcePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const html = await response.text();
    document.getElementById("main-page").innerHTML = html;

    if (path === "/explore") {
      const scriptElement = document.createElement("script");
      scriptElement.type = "module";
      scriptElement.src = basePath + "/src/js/explore.js";
      document.body.appendChild(scriptElement);
    }
  } catch (error) {
    console.error("Error fetching resource:", error);
  }
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
