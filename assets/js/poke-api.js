const pokeApi = {};

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type; 

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()) //Aqui estou transformando essa lista em uma lista de promessas da nova requisição que estou fazendo (dos detalhes dos pokemons) e já estou transformando ela um uma lista Json.
    .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) // O fetch é uma maneira de fazer requisições HTP para APIs, ele retorna uma Promisse. // Aqui estou indo no servidor e buscando a lista de pokemons.
    .then((response) => response.json())// O método .then   permite executar uma função quando a Promisse é resolvida com sucesso. // Transforma os dados em da API em dados Json.
    .then((jsonBody) => jsonBody.results) // Aqui estou pegando a lista que foi convertida pra Json. Nesse caso, são os pokemons.
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest => Promise.all(detailRequest))) 
    .then((pokemonDetails) => pokemonDetails);
}

