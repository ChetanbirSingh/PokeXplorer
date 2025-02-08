const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-pokemon-btn");


async function fetchData() {
    const pokemonIdorName = searchInput.value.toLowerCase().trim();
    searchInput.value = "";

    if(pokemonIdorName.length === 0) {
        console.log("please enter valid name or id");
        return;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdorName}`);
    if(response.status < 200 || response.status >= 300) {
        console.log("pokemon does not exist");
        return;
    }
    const data = await response.json();

    console.log(data);
}

searchBtn.addEventListener("click", () => fetchData());

