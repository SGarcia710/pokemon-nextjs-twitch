import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 60px;

  display: flex;
  align-items: center;
  padding-left: 30px;
  justify-content: center;
  p {
    font-size: 10px;
    color: gray;
  }
`;

const Footer = () => {
  return (
    <Container>
      <p>Made with {'</>'} by Sebastián García</p>
    </Container>
  );
};

export default Footer;
