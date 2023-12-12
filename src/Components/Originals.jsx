import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOriginal } from '../Features/User/Movies/MovieSlice'
const Original = () => {
  const movies=useSelector(selectOriginal)
  return (
    <Container>
    <h3>Trending</h3>
    <Content>
    {movies &&
          movies.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={`/detail/` + movie.id}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))}
    </Content>
   </Container>
  )
}
const Container=styled.div`
padding:0 0 26px;

`
const Content=styled.div`
display: grid;
grid-gap: 25px;
gap: 25px;
grid-template-columns:repeat(4,minmax(0,1fr)) ;


@media screen and (max-width:768px) {
  grid-template-columns: repeat(2,minmax(0,1fr));
  
}

`
const Wrap=styled.div`
padding-top: 56%;
border-radius: 10px;
box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5);

  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms;
  border: 3px solid rgba(249,249,249,0.1);


  img{
    inset: 0;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out;
    width: 100%;
    z-index: 10;
    top: 0;

  }

  &:hover{
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5);

    transform: scale(1.05);
    border-color: rgba(249,249,249,0.8) ;
  }
`


export default Original