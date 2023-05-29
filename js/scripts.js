//IIFE Function:
let pokemonRepository = (function () {
  // Creating Pokemon Objects:
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Function to push (add) new pokemon the pokemonList, making sure it is an objective and has a name, height and type key and the right "structure" through a new varible let newPokemon:
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      let newPokemon = {
        name: pokemon.name,
        detailsUrl: pokemon.detailsUrl,
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
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
      // Arrow function: button.addEventListener("click", () => { showDetails(pokemon)); });
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        //json.results comes form the data of the api key (that is how the result is presented in the api - see in the url link)
        json.results.forEach(function (item) {
          let pokemon = {
            //Comes as well from the structure of the data in the API
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // details (parameter of the this function).sprites.front_default (as named in the api data)
        item.imageUrl = details.sprites.front_default;
        item.heigt = details.height;
        item.type = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //Results accessble from outside the function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Filter based on the length of the pokemon name
//Filter with Arrow function based on the length of the pokemon name

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
