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
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  // Agregar el script explore.js manualmente
  if (path === "/explore") {
    const scriptElement = document.createElement("script");
    scriptElement.type = "module";
    scriptElement.src = "/src/js/explore.js";
    document.body.appendChild(scriptElement);
  }
};
window.onpopstate = handleLocation;
window.route = route;
handleLocation();
