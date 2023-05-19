import { Link, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Layout from "./Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <NotFoundContainer class='flex-container'>
        <TextCenter class='text-center'>
          <h1>
            <span class='fade-in' id='digit1'>
              4
            </span>
            <span class='fade-in' id='digit2'>
              0
            </span>
            <span class='fade-in' id='digit3'>
              4
            </span>
          </h1>
          <h3 class='fadeIn'>PAGE NOT FOUND</h3>
          <Link href='/'>
            <Button type='button' name='button'>
              Return To Home
            </Button>
          </Link>
        </TextCenter>
      </NotFoundContainer>
    </Layout>
  );
}

const NotFoundContainer = styled("div")`
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  color: white;

  border-radius: 8px;
  animation: colorSlide 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;

  @keyframes colorSlide {
    0% {
      background-color: #fbacbe;
    }
    20% {
      background-color: #e16f7c;
    }
    40% {
      background-color: #dd5e98;
    }
    60% {
      background-color: #ed7b84;
    }
    80% {
      background-color: #af7595;
    }
    100% {
      background-color: #fbacbe;
    }
  }
`;

const TextCenter = styled("div")`
  text-align: center;
  & > h1,
  h3 {
    margin: 10px;
    cursor: default;

    .fade-in {
      animation: fadeIn 2s ease infinite;
    }
  }

  h1 {
    font-size: 8em;
    transition: font-size 200ms ease-in-out;
    border-bottom: 1px dashed white;

    span#digit1 {
      animation-delay: 200ms;
    }
    span#digit2 {
      animation-delay: 300ms;
    }
    span#digit3 {
      animation-delay: 400ms;
    }
  }

  button {
    border: 1px solid white;
    background: transparent;
    outline: none;
    padding: 10px 20px;
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
    transition: background-color 200ms ease-in;
    margin: 20px 0;

    &:hover {
      background-color: white;
      color: #555;
      cursor: pointer;
    }
  }

  /* @keyframes fadeIn {
    from {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */
`;
