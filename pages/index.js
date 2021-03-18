import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Pokemon = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;

  justify-content: flex-start;
  align-items: center;
  justify-content: center;

  padding: 40px 0;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const PokemonCard = styled.div`
  border-radius: 20px;
  background-color: #fff;
  margin-right: 30px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 10px 6px -6px #777;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);

  padding: 16px;
`;

const PokemonNumber = styled.h1`
  position: absolute;
  top: 16px;

  font-size: 100px;
  color: lightgray;
  opacity: 0.8;
`;
const PokemonName = styled.h4`
  font-size: 18px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;
const Types = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;
const PokemonType = styled.p`
  margin: 0 6px;
  text-transform: uppercase;
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 600;
`;

const TypeSeparator = styled.div`
  background-color: black;
  width: 5px;
  height: 5px;
  border-radius: calc(5px / 2);
`;

const PokemonImage = styled.img`
  z-index: 2;
  -webkit-filter: drop-shadow(5px 5px 5px rgb(34, 34, 34, 0.2));
  filter: drop-shadow(5px 5px 5px rgb(34, 34, 34, 0.2));
`;

const CircleStat = styled.div`
  position: absolute;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: calc(50px / 2);
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 12px;
    color: #635d5d;
    font-weight: 600;
  }
`;
const HeightStat = styled(CircleStat)`
  top: -10px;
  left: -10px;
`;
const WeightStat = styled(CircleStat)`
  top: -10px;
  right: -10px;
`;

const PokemonStats = styled.div``;
const Stat = styled.div`
  margin: 10px 0;
  display: flex;

  align-items: center;
  justify-content: flex-end;
`;
const StatName = styled.p`
  font-weight: 600;
  color: gray;
  font-size: 12px;
`;
const StatNumber = styled.p`
  margin: 0 10px;

  font-weight: 600;
  color: #212121;
  font-size: 12px;
`;
const StatBar = styled.div`
  position: relative;
  width: 100px;
  background-color: #abaaa9;
  height: 8px;
  border-radius: 2px;
`;
const StatProgress = styled.div`
  border-radius: 2px;
  position: absolute;
  height: 100%;
  width: ${(props) => `${(props.progress * 100) / 250}%`};
  background-color: ${(props) => props.color};
`;

const PokemonStat = (props) => {
  return (
    <Stat>
      <StatName>{props.name}</StatName>

      <StatNumber>{props.progress}</StatNumber>

      <StatBar>
        <StatProgress color={props.progressColor} progress={props.progress} />
      </StatBar>
    </Stat>
  );
};

const ListPage = ({ pokemons }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'fire':
        return '#C82502';
      case 'grass':
        return '#3C9A08';
      case 'poison':
        return '#632765';
      case 'water':
        return '#1E7EDD';
      case 'bug':
        return '#597956';
      case 'flying':
        return '#5E73D6';
      default:
        return '#C3BFB4';
    }
  };

  const router = useRouter();

  return (
    <Container>
      {React.Children.toArray(
        pokemons.map((pokemon) => (
          <Pokemon
            onClick={() => {
              router.push(`/pokemons/${pokemon.id}`);
            }}
          >
            <PokemonCard>
              <HeightStat>
                <p>{pokemon.height}m</p>
              </HeightStat>
              <WeightStat>
                <p>{pokemon.weight}kg</p>
              </WeightStat>
              <PokemonNumber>#{pokemon.id}</PokemonNumber>
              <PokemonImage src={pokemon.sprites.front_default} />
              <PokemonName>{pokemon.name}</PokemonName>

              <Types>
                {React.Children.toArray(
                  pokemon.types.map((type, index) => (
                    <>
                      <PokemonType color={() => getTypeColor(type.type.name)}>
                        {type.type.name}
                      </PokemonType>
                      {index !== pokemon.types.length - 1 && <TypeSeparator />}
                    </>
                  ))
                )}
              </Types>
            </PokemonCard>

            <PokemonStats>
              <PokemonStat
                progressColor="#B4962F"
                name="Speed"
                progress={pokemon.stats[5].base_stat}
              />
              <PokemonStat
                progressColor="#B4751E"
                name="Special Defense"
                progress={pokemon.stats[4].base_stat}
              />
              <PokemonStat
                progressColor="#4E7938"
                name="Special Attack"
                progress={pokemon.stats[3].base_stat}
              />
              <PokemonStat
                progressColor="#B47C30"
                name="Defense"
                progress={pokemon.stats[2].base_stat}
              />
              <PokemonStat
                progressColor="#43732B"
                name="Attack"
                progress={pokemon.stats[1].base_stat}
              />
              <PokemonStat
                progressColor="#B37214"
                name="Hp"
                progress={pokemon.stats[0].base_stat}
              />
            </PokemonStats>
          </Pokemon>
        ))
      )}
    </Container>
  );
};

export async function getServerSideProps(context) {
  const pokemonsList = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=20'
  );
  const pokemonsJSON = await pokemonsList.json();

  const pokemonsData = await Promise.all(
    pokemonsJSON.results.map(async ({ url }) => {
      const data = await fetch(url);
      const dataJSON = await data.json();

      return dataJSON;
    })
  );

  return {
    props: {
      pokemons: pokemonsData,
    }, // will be passed to the page component as props
  };
}

export default ListPage;
