import React from "react";
import Main from "../Main";
import Row from "../Row";
import { request } from "../../Request";
import TopRatedSec from "../TopRatedSec";


const Home = () => {
  return (
    <>
      <Main />
      <Row title="UpComing" fetchURL={request.requestUpcoming} />
      <TopRatedSec title="Popular Movies" fetchURL={request.requestPopular} />
    </>
  );
};

export default Home;
