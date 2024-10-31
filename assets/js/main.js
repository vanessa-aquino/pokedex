
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


fetch(url) // O fetch é uma maneira de fazer requisições HTP para APIs, ele retorna uma Promisse.
    .then((response) => { // O método .then   permite executar uma função quando a Promisse é resolvida com sucesso.
        return response.json() // Transforma os dados em da API em dados Json.
})
    .then((jsonBody) => console.log(jsonBody)) // Pega o body do meu dado que foi transformado em Json.
    .catch((error) => console.error(error)) // Se algo der errado ao linkar com a API, ao invés de executar as funções acima (.then), ele cairá aqui e executará a função de erro.

