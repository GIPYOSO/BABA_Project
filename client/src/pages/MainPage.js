import * as React from "react";
import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import Jumbotron from "../components/Main/Jumbotron";
import SectionBox from "../components/Main/SectionBox";
import SectionBox2 from "../components/Main/SectionBox2";

let MainPage = () => {
  return (
    <>
      <Header />
      <Jumbotron />
      <SectionBox />
      <SectionBox2 />
      <Footer />
    </>
  );
};
export default MainPage;
