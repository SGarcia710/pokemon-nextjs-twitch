import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const PokemonPage = (props) => {
  return (
    <Container>
      <h1>{props.pokemon.name}</h1>
      <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
    </Container>
  );
};

export async function getServerSideProps({ query }) {
  let slugs;
  if (query == {} || !query?.slug) {
    slugs = '';
  } else {
    const _slugs = query.slug;

    slugs = _slugs.join('__');
  }

  const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${slugs}`);

  const pokemonDataJSON = await pokemonData.json();

  return {
    props: {
      pokemon: pokemonDataJSON,
    },
  };
}

export default PokemonPage;
