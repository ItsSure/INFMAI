import { Routes } from "../utils/consts.js";
import data from "../utils/data.json";

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const createCardElement = (element) => {
  const cardTemplate = document.createElement("template");
  cardTemplate.innerHTML = /*html*/ `
    <div class="card text-bg-dark mb-3 animation-card" style="max-width: 800px">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${element.imageurl}" class="img-fluid card-img rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${element.enlace}</h6>
            <p class="card-text">
              ${element.descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>`;
  return cardTemplate.content.cloneNode(true);
};

const renderCards = (dataToRender) => {
  const aiCards = document.querySelector("ai-cards");
  aiCards.innerHTML = ""; // Limpiar el contenido anterior
  dataToRender.forEach((element) => {
    const card = createCardElement(element);
    aiCards.appendChild(card);
  });
};

class AICardsElement extends HTMLElement {
  connectedCallback() {
    this.renderCards(data); // Renderiza todas las tarjetas inicialmente
  }

  renderCards(dataToRender) {
    renderCards(dataToRender);
  }
}

customElements.define("ai-cards", AICardsElement);

const filterCards = (event) => {
  const selectedCategory = event.target.value;
  if (selectedCategory === "0") {
    renderCards(data); // Muestra todas las tarjetas si se selecciona "Todas las IA"
  } else {
    const filteredData = data.filter(
      (item) => item.categoria === Number(selectedCategory),
    );
    renderCards(filteredData); // Filtra y muestra las tarjetas según la categoría seleccionada
  }
};

window.filterCards = filterCards;

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = Routes[path] || Routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  if (path === "/explore") {
    renderCards(data);
    const selectElement = document.getElementById("category-filter");
    if (selectElement) {
      selectElement.addEventListener("change", filterCards);
    }
  }
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
