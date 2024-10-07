const listaPokemons = document.getElementById("ListaPokemons");

const loadMoreButton = document.getElementById("LoadMore");

const limit = 10;
let offset = 0;

const maxRecords = 151;

function ConvertPokemnLi(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
          <span class="pokemonNumber">#${pokemon.number}</span>
          <span id="pokemonName">${pokemon.name}</span>
          <div class="pokemonDetail">
            <ol class="pokemonTypes ">
              ${pokemon.types
                .map((type) => `<li class=" pokemonTypes ${type}">${type}</li>`)
                .join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}"/>
          </div>
        </li>`;
}

function loadPokemonItens() {
  pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
    const newList = pokemonList.map((pokemon) => {
      return ConvertPokemnLi(pokemon);
    });

    listaPokemons.innerHTML += newList.join("");
  });
}


loadPokemonItens(limit,offset);

loadMoreButton.addEventListener('click',()=>{
  offset += limit
  let qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset,newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
    return

  }else{
    loadPokemonItens(offset,limit)
  }
  
  
})