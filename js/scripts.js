//IIFE Function:
let pokemonRepository = (function () {
  // Creating Pokemon Objects:
  let pokemon1 = {
    name: "Butterfree",
    height: 5,
    type: ["poision", "grass"],
  };

  let pokemon2 = {
    name: "Weedle",
    height: 3,
    type: ["rock", "fire"],
  };

  let pokemon3 = {
    name: "Rattata",
    height: 1,
    type: ["ice", "water"],
  };

  // Including Pokemon Objects into Pokemon List (Array):
  let pokemonList = [pokemon1, pokemon2, pokemon3];
  console.log(pokemonList);

  //Function to push (add) new pokemon the pokemonList, making sure it is an objective and has a name, height and type key:
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      let newPokemon = {
        name: pokemon.name,
        height: pokemon.height,
        type: pokemon.type,
      };
      pokemonList.push(newPokemon);
    } else {
      console.log("Invalid Pokémon");
    }
  }

  //Function to access pokemonList
  function getAll() {
    return pokemonList;
  }

  //Function to add Pokemons with DOM
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemonButton");
    listItem.classList.add("listItem");
    //Appendes the created elements to its parent
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //This function is called an event handler.
    button.addEventListener("click", function () {
      console.log(button.innerText);
      // Arrow function: button.addEventListener("click", () => { console.log(button.innerText); });
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  //Results accessble from outside the function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

//Add a pokemon:
pokemonRepository.add({
  name: "Ekans",
  height: 1,
  type: ["ice", "water"],
});
console.log("Updated repository", pokemonRepository.getAll());
//"Updated repository" gives a name in the console to the new Array.

// forEach loop: To access the pokemonList one has to use the getAll() function:
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//Filter based on the length of the pokemon name
const result = pokemonRepository
  .getAll()
  .filter((pokemon) => pokemon.name.length >= 7);

console.log(result);

//Filter to search Pokemon pokemon name:
function searchPokemon(pokemonRepository, pokemonName) {
  const filteredPokemon = pokemonRepository.filter(
    (pokemon) => pokemon.name === pokemonName
  );
  return filteredPokemon;
}

const searchResult = searchPokemon(pokemonRepository, "Butterfree");
console.log(searchResult);
