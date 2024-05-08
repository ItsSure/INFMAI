import data from "../utils/data.json";

function createCardElement(element) {
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
}

class AICardsElement extends HTMLElement {
  connectedCallback() {
    this.renderCards(data); // Renderiza todas las tarjetas inicialmente
  }

  renderCards(dataToRender) {
    this.innerHTML = ""; // Limpia el contenido anterior
    dataToRender.forEach((element) => {
      const card = createCardElement(element);
      this.appendChild(card);
    });
  }
}

customElements.define("ai-cards", AICardsElement);

const filterCards = (event) => {
  const selectedCategory = event.target.value;
  const aiCards = document.querySelector("ai-cards");

  if (selectedCategory === "0") {
    aiCards.renderCards(data); // Muestra todas las tarjetas si se selecciona "Todas las IA"
  } else {
    const filteredData = data.filter(
      (item) => item.categoria === Number(selectedCategory),
    );
    aiCards.renderCards(filteredData); // Filtra y muestra las tarjetas según la categoría seleccionada
  }
};

window.filterCards = filterCards;
