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

  //Function to push (add) new pokemon the pokemonList
  function add(pokemon) {
    pokemonList.push(pokemon);
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

// forEach loop: To access the pokemonList one has to use the getAll() function:
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
