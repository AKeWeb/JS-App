// Creating Pokemon Objects:

let pokemon1 = {
  name: "Butterfree",
  height: 5,
  type: ["poision", "grass"],
};

let pokemon2 = {
  name: "Weedle",
  height: 1,
  type: ["rock", "fire"],
};

let pokemon3 = {
  name: "Rattata",
  height: 3,
  type: ["ice", "water"],
};

// Including Pokemon Objects into Pokemon List (Array):
let pokemonList = [pokemon1, pokemon2, pokemon3];
console.log(pokemonList);

//for loop, whith 2 diferent concepts to write the result - Concatenating Strings & Template literal
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 4) {
    document.write(
      `<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}), ...wow, that
        is a big one! </p>`
    );
  } else if (pokemonList[i].height < 4 && pokemonList[i].height > 2) {
    document.write(
      "<p>" +
        pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        "), that is the medium sized one." +
        "</p>"
    );
  } else {
    document.write(
      `<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}), that is the smallest one! </p>`
    );
  }
}
