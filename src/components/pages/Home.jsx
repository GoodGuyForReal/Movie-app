import React from "react";
import Main from "../Main";
import Row from "../Row";
import { request } from "../../Request";
import TopRatedSec from "../TopRatedSec";
import Deneme from "../Deneme";

const Home = () => {
  return (
    <>
      <Main />
      <Row title="UpComing" fetchURL={request.requestUpcoming} />
      <Deneme title="UpComing" fetchURL={request.requestUpcoming} />
      <TopRatedSec title="Popular Movies" fetchURL={request.requestPopular} />
    </>
  );
};

export default Home;
