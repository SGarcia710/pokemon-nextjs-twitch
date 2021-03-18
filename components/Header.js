import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 60px;

  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const Pokeball = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const Title = styled.h1`
  font-weight: 700;
  letter-spacing: 1.2px;
`;
const Header = () => {
  return (
    <Container>
      <Pokeball src="/images/pokeball.png" alt="Logo" />

      <Title>Pokédex Nextjs</Title>
    </Container>
  );
};

export default Header;
