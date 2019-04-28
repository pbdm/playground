import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// styled("h1") 相当于 styled.h1
const Title = styled("h1")`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.primary ? "white" : "palevioletred"};
  ::before {
    content: '🚀';
  }
  :hover {
    color: green;
  }
`;

const TomatoTitle = styled(Title)`
  color: tomato;
  border-color: tomato;
`;

const ReversedTitle = props => <button {...props} children={props.children.split('').reverse()} />

const Link = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);
const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input.attrs({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  margin: props => props.size || "1em",
  padding: props => props.size || "1em"
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Title>Title</Title>
        <Title primary>Primary Title</Title>
        <TomatoTitle>Tomato Title</TomatoTitle>
        <Title as="a" href="/">Link with Title styles</Title>
        <Title as={ReversedTitle}>Custom Title with Normal Title styles</Title>
        <StyledLink>Styled, exciting Link</StyledLink>
        <Input placeholder="A small text input" size="1em" />
        <br />
        <Input placeholder="A bigger text input" size="2em" />
        <Rotate>y</Rotate>
      </Wrapper>
    );
  }
}

export default App;
