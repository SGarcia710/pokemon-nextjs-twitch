import React, { useState } from 'react';
import styled from 'styled-components';

const PokemonItem = styled.li`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
const PokemonData = styled.div`
  height: fit-content;
  background-color: '#212121';
  border-radius: 6px;
  padding: 16px;
`;

const PokemonImage = styled.img``;

const ListPage = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  console.log('Hola desde el cliente', pokemons);

  const fetchPokemon = async (pokemonUrl) => {
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonJSON = await pokemonResponse.json();

    console.log('La info del  pokemon es: ', pokemonJSON);

    setSelectedPokemon({
      image: pokemonJSON.sprites.front_default,
    });
  };

  return (
    <div>
      <ul>
        {React.Children.toArray(
          pokemons.map((pokemon) => (
            <PokemonItem
              onClick={() => {
                fetchPokemon(pokemon.url);
              }}
            >
              {pokemon.name}
            </PokemonItem>
          ))
        )}
      </ul>

      {selectedPokemon !== null && (
        <PokemonData>
          <PokemonImage src={selectedPokemon.image} />
        </PokemonData>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const pokemonList = await fetch('https://pokeapi.co/api/v2/pokemon');
  const pokemonJSON = await pokemonList.json();

  console.log('ESTOS SON LOS POKEMON', pokemonJSON);

  return {
    props: {
      pokemons: pokemonJSON.results,
    }, // will be passed to the page component as props
  };
}

export default ListPage;
