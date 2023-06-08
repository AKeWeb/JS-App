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
    button.classList.add(
      "pokemonButton",
      "btn",
      "btn-light",
      "btn-lg",
      "col-12"
    );
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    listItem.classList.add("list-group-item");
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
        item.height = details.height;
        item.weight = details.weight;
        item.type = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(name, height, weight, type, image) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitle.empty();
    modalBody.empty();

    //Creating name element:
    let nameElement = $("<h1>" + name + "</h1>");

    //Creating height element:
    let heightElement = $("<p>" + "Height: " + height + " cm" + "</p>");

    //Creating weight element:
    let weightElement = $("<p>" + "Weight: " + weight + " gram" + "</p>");

    //Creating types element:
    let types = [];
    type.forEach((element) => types.push(element.type.name));
    let typesElement = $(
      "<p>" + "Types: " + types.join(", ").toUpperCase() + "</p>"
    );

    let imageElement = document.createElement("img");
    imageElement.classList.add("image-pokemon");
    imageElement.setAttribute("src", image);
    imageElement.setAttribute("width", "150");
    imageElement.setAttribute("height", "150");
    imageElement.setAttribute("alt", "Pokemon image");

    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(imageElement);
  }
  /*
  let modalContainer = document.querySelector("#modal-container");
  
  function showModal(name, height, weight, type, image) {
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let nameElement = document.createElement("h1");
    nameElement.innerText = "Pokemon Name: " + name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + height + " cm";

    let weightElement = document.createElement("p");
    weightElement.innerText = "Height: " + weight + " kg";

    let types = [];
    type.forEach((element) => types.push(element.type.name));

    let typeElement = document.createElement("p");
    typeElement.innerText = "Types: " + types.join(", ");

    let imageElement = document.createElement("img");
    imageElement.classList.add("image-pokemon");
    imageElement.setAttribute("src", image);
    imageElement.setAttribute("width", "150");
    imageElement.setAttribute("height", "150");
    imageElement.setAttribute("alt", "Pokemon image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typeElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }
 
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
 */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.type,
        pokemon.imageUrl
      );
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

//Filter with Arrow function based on the length of the pokemon name
/*
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
*/
