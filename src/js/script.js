const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#pokemon-search-form");
const mainElement = document.querySelector("main");

const typeColors = {
  normal: ["#A8A77A", "#D1C5B2", "#E6E1D6"],
  fire: ["#EE8130", "#FF5733", "#F14F30"],
  water: ["#6390F0", "#005C73", "#4C7D9E"],
  electric: ["#F7D02C", "#FFC107", "#F49F00"],
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

const pokemonSection = document.createElement("section");
const evolutionSection = document.createElement("section");
mainElement.appendChild(pokemonSection);
mainElement.appendChild(evolutionSection);

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pokemonIdorName = searchInput.value.toLowerCase().trim();
  searchInput.value = "";

  try {
    if (pokemonIdorName.length === 0) {
      throw new Error("OOPS! You forgot to enter a Pokémon name or ID.");
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonIdorName}`
    );

    if (!response.ok) {
      throw new Error(
        "Oops! That Pokémon doesn't exist. Try another name or ID."
      );
    }
    const data = await response.json();
    pokemonSection.innerHTML = "";
    evolutionSection.innerHTML = "";
    renderPokemon(data);
    await fetchEvolutionChain(data);
  } catch (error) {
    errorMessage(error.message);
  }
});

function renderPokemon(data) {
  pokemonSection.innerHTML = "";
  // Creates a new array with name of types
  let types = data.types.map((item) => item.type.name);

  const { name, height, weight, base_experience, stats, sprites, cries } = data;

  const pokemonSectionTitle = document.createElement("h2");
  pokemonSectionTitle.textContent = "Meet Your Pokémon";
  pokemonSection.appendChild(pokemonSectionTitle);

  const pokemonContainer = document.createElement("div");
  pokemonContainer.classList.add("pokemon-container");
  pokemonSection.appendChild(pokemonContainer);

  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  pokemonCard.style.background = getBackgroundGradient(types);

  pokemonContainer.appendChild(pokemonCard);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  pokemonCard.appendChild(cardHeader);

  const pokemonName = document.createElement("div");
  pokemonName.classList.add("pokemon-name");
  pokemonName.textContent = name;
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

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const pokemonImgContainer = document.createElement("div");
  pokemonImgContainer.classList.add("pokemon-img-container");
  const pokemonImg = document.createElement("img");
  pokemonImg.src = sprites.front_default;
  pokemonImg.alt = name;
  pokemonImg.classList.add("pokemon-img");
  pokemonImgContainer.appendChild(pokemonImg);

  pokemonImg.addEventListener("click", () => {
    if (cries) {
      pokemonImg.classList.add("playing-cry");
      const audioUrl = cries.legacy;
      const audio = new Audio(audioUrl);
      audio.volume = 0.4;
      audio.play();
    }
    setTimeout(() => pokemonImg.classList.remove("playing-cry"), 500);
  });

  const pokemonStats = document.createElement("div");
  pokemonStats.classList.add("pokemon-stats");
  pokemonStats.innerHTML = `
    <p><strong>Height:</strong> ${height}</p>
    <p><strong>Weight:</strong> ${weight}</p>
  `;

  cardBody.appendChild(pokemonImgContainer);
  cardBody.appendChild(pokemonStats);
  pokemonCard.appendChild(cardBody);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");
  cardFooter.innerHTML = `<p class="base-experience"><strong>Base Experience:</strong> ${base_experience}</p>`;
  pokemonCard.appendChild(cardFooter);

  const statsCard = document.createElement("div");
  statsCard.classList.add("stats-card");

  statsCard.style.background = getBackgroundGradient(types);

  const statsContent = document.createElement("div");
  statsContent.classList.add("stats-content");

  stats.forEach((stat) => {
    const statElement = document.createElement("p");
    statElement.innerHTML = `<strong>${stat.stat.name}:</strong> ${stat.base_stat}`;
    statsContent.appendChild(statElement);
  });

  statsCard.appendChild(statsContent);
  pokemonContainer.appendChild(statsCard);
}

async function fetchEvolutionChain(data) {
  try {
    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok) {
      throw new Error(
        "Unable to retrieve Pokémon evolution data. Please try again later."
      );
    }

    const speciesData = await speciesResponse.json();

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    if (!evolutionResponse.ok) {
      throw new Error(
        "Unable to fetch the Pokémon evolution chain. Please try again later."
      );
    }

    const evolutionData = await evolutionResponse.json();
    renderEvolutionTree(evolutionData);
  } catch (error) {
    errorMessage(error.message);
  }
}

function renderEvolutionTree(evolutionData) {
  const evolutionContainer = document.createElement("div");
  evolutionContainer.classList.add("evolution-container");

  const evolutionTitle = document.createElement("h2");
  evolutionTitle.textContent = "Evolution Chain";
  evolutionSection.appendChild(evolutionTitle);

  const evolutionTree = document.createElement("div");
  evolutionTree.classList.add("evolution-tree");

  let currentEvolution = evolutionData.chain;

  while (currentEvolution) {
    const evoName = currentEvolution.species.name;
    const pokeID = currentEvolution.species.url.split("/").slice(-2, -1);

    const evoStepContainer = document.createElement("div");
    evoStepContainer.classList.add("evolution-step");

    const evoImgContainer = document.createElement("div");
    evoImgContainer.classList.add("evo-img-container");

    const evoImg = document.createElement("img");
    evoImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
    evoImg.alt = evoName;
    evoImg.classList.add("evo-img");
    evoImgContainer.appendChild(evoImg);

    const evoNameElement = document.createElement("p");
    evoNameElement.textContent = evoName;

    evoStepContainer.appendChild(evoImgContainer);
    evoStepContainer.appendChild(evoNameElement);

    evolutionTree.appendChild(evoStepContainer);

    if (currentEvolution.evolves_to.length > 0) {
      currentEvolution = currentEvolution.evolves_to[0];
    } else {
      currentEvolution = false;
    }
  }

  evolutionContainer.appendChild(evolutionTree);
  evolutionSection.appendChild(evolutionContainer);
}

const errorMessage = (message) => {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("flex");

  const existingErrorDiv = document.querySelector(".error-message");
  if (existingErrorDiv) {
    existingErrorDiv.remove();
  }
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;
  errorDiv.appendChild(errorMessage);

  pokemonSection.prepend(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
};

function getBackgroundGradient(types) {
  if (types.length > 1) {
    return `linear-gradient(135deg, ${typeColors[types[0]][1]}, ${
      typeColors[types[1]][2]
    })`;
  }
  return `linear-gradient(135deg, ${typeColors[types[0]][1]}, ${
    typeColors[types[0]][2]
  })`;
}
