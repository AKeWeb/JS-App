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

  //Function to push (add) new pokemon the pokemonList, making sure it is an objective and has a name, height and type key and the right "structure" through a new varible let newPokemon:
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

  //Results accessble from outside the function
  return {
    add: add,
    getAll: getAll,
  };
})();

// forEach loop: To access the pokemonList one has to use the getAll() function (return):
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 4) {
    document.write(
      `<p>${pokemon.name} (height: ${pokemon.height}), ...wow that is a big one!`
    );
  } else if (pokemon.height < 4 && pokemon.height > 2) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})`);
  } else {
    document.write(
      `<p>${pokemon.name} (height: ${pokemon.height}), that is the smallest one!`
    );
  }
});

//Add a pokemon:
pokemonRepository.add({
  name: "Ekans",
  height: 1,
  type: ["ice", "water"],
});
console.log("Updated repository", pokemonRepository.getAll());
//"Updated repository" gives a name in the console to the new Array.

//Filter with Arrow function based on the length of the pokemon name

const result = pokemonRepository
  .getAll()
  .filter((pokemon) => pokemon.name.length >= 7);

console.log(result);
