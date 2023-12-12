import React from "react";
import styled from "styled-components";
import { collection, getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { useParams } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieRef = doc(collection(db, "movies"), id);
        const movieDoc = await getDoc(movieRef);

        if (movieDoc.exists()) {
          setDetailData(movieDoc.data());
        } else {
          console.log("No such document in Firebase 🔥");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>

      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>

          <AddList>
            <span>
              <AiOutlinePlusCircle
                fontSize={50}
                style={{ marginRight: "10px" }}
              />
            </span>
            <span>
              <BsPersonCircle fontSize={45} />
            </span>
          </AddList>
        </Controls>

        <SubTitle>{detailData.subTitle}</SubTitle>

        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);

  overflow-x: hidden;

  display: block;
  top: 72px;
  padding: 0 20px;
`;

const Background = styled.div`
  left: 0;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -3;

  img {
    width: 100vw;
    height: 100vh;
  }
  @media screen and (max-width: 768px) {
    width: initial;
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;
const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 50px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.6px;
  text-align: center;
  text-transform: uppercase;
  background-color: rgb(249, 249, 249);
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }
  &:hover {
    background-color: rgb(198, 198, 198);
  }

  @media screen and (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;
  }
`;

const Trailer = styled(Player)`
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  &:hover {
    background-color: black;
  }
`;

const AddList = styled.div`
  cursor: pointer;
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
