const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-pokemon-btn");
const pokemonSection = document.querySelector("#pokemon-data");

const typeColors = {
  normal: ["#A8A77A", "#D1C5B2", "#E6E1D6"],
  fire: ["#EE8130", "#FF5733", "#F14F30"],
  water: ["#6390F0", "#005C73", "#4C7D9E"],
  electric: ["#F7D02C", "#FFD700", "#F5A800"],
  grass: ["#7AC74C", "#65D21E", "#97C938"],
  ice: ["#96D9D6", "#00B0B9", "#74B5C8"],
  fighting: ["#C22E28", "#D33F2E", "#A93129"],
  poison: ["#A33EA1", "#6A2E8C", "#9F4B9F"],
  ground: ["#E2BF65", "#D67B1E", "#9A5C2E"],
  flying: ["#A98FF3", "#82C8FF", "#B5D8FF"],
  psychic: ["#F95587", "#D16F93", "#E5A3C3"],
  bug: ["#A6B91A", "#8A9E00", "#9EBD15"],
  rock: ["#B6A136", "#9C7F3B", "#B59A49"],
  ghost: ["#735797", "#8E46B9", "#B284D6"],
  dragon: ["#6F35FC", "#5D3FD3", "#4F2EC7"],
  dark: ["#705746", "#4A4A4A", "#2C2C2C"],
  fairy: ["#D685AD", "#F1A7C4", "#F1B5D7"],
  steel: ["#B7B7CE", "#A6A6A6", "#C2C2C2"],
  unknown: ["#68A090", "#7B7B7B", "#9C9C9C"],
  shadow: ["#6A6A6A", "#505050", "#383838"],
};

let data;
async function fetchData() {
  const pokemonIdorName = searchInput.value.toLowerCase().trim();
  searchInput.value = "";

  if (pokemonIdorName.length === 0) {
    // Remove instead add a function
    console.log("please enter valid name or id");
    return;
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonIdorName}`
  );
  if (response.status < 200 || response.status >= 300) {
    console.log("pokemon does not exist");
    return;
  }
  data = await response.json();
  pokemonSection.innerHTML = "";
  updateUI();
  // Remove
  console.log(data);
}

function updateUI() {
  let types = data.types.map((item) => item.type.name);

  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  if (types.length > 1) {
    pokemonCard.style.background = `linear-gradient(135deg, ${
      typeColors[types[0]][1]
    }, ${typeColors[types[1]][2]})`;
  } else {
    pokemonCard.style.background = `linear-gradient(135deg, ${
      typeColors[types[0]][1]
    }, ${typeColors[types[0]][2]})`;
  }
  pokemonSection.appendChild(pokemonCard);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  pokemonCard.appendChild(cardHeader);

  const pokemonName = document.createElement("div");
  pokemonName.classList.add("pokemon-name");
  pokemonName.textContent = data.name;
  cardHeader.appendChild(pokemonName);

  const pokemonType = document.createElement("div");
  pokemonType.classList.add("pokemon-type");
  cardHeader.appendChild(pokemonType);

  types.forEach((type) => {
    const span = document.createElement("span");
    span.textContent = type;
    span.style.backgroundColor = typeColors[type][2];
    pokemonType.appendChild(span);
  });

  pokemonCard.insertAdjacentHTML(
    "beforeend",
    `
        <div class="card-body">
            <div class="pokemon-img-container">
                <img src="${data.sprites.front_shiny}" alt="${data.name}" class="pokemon-img">
            </div>
            <div class="pokemon-stats">
                <p><strong>Height:</strong> ${data.height}</p>
                <p><strong>Weight:</strong> ${data.weight}</p>
            </div>
        </div>
        <div class="card-footer">
            <p class="base-experience">Base Experience: ${data.base_experience}</p>
        </div>
        `
  );
}

searchBtn.addEventListener("click", () => fetchData());
