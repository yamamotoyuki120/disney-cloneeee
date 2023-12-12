import styled from "styled-components";
import React, { useState } from "react";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Original from "./Originals";
import Trending from "./Trending";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../Features/User/Movies/MovieSlice";
import { selectUsername } from "../Features/User/UserSlice";
import { getAuth } from "firebase/auth";

const Home = () => {
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);

  const Fetchingthedata = async () => {
    const list = collection(db, "movies");
    const data = await getDocs(list);

    const recommends = [];
    const newDisneys = [];
    const originals = [];
    const trending = [];

    data.forEach((doc) => {
      const docData = doc.data();
      switch (docData.type) {
        case "recommend":
          recommends.push({ id: doc.id, ...docData });
          break;
        case "new":
          newDisneys.push({ id: doc.id, ...docData });
          break;
        case "original":
          originals.push({ id: doc.id, ...docData });
          break;
        case "trending":
          trending.push({ id: doc.id, ...docData });
          break;
        default:
          break;
      }
    });

    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending,
      })
    );

    console.log("recommends", recommends);
    console.log("newDisneys", newDisneys);
    console.log("originals", originals);
    console.log("trending", trending);
  };

  useEffect(() => {
    Fetchingthedata();
  }, [username]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />

      <Recommends />
      <NewDisney />
      <Original />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 69px;
  padding: 0 30px;
  background: url("images/home-background.png") center center / cover
      no-repeat fixed;

  &:after {
    background: url("images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -4;
  }
`;

export default Home;
