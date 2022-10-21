import * as React from "react";
import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import Jumbotron from "../components/Main/Jumbotron";
import SectionBox from "../components/Main/SectionBox";

let MainPage = () => {
  return (
    <>
      <Header />
      <Jumbotron />
      <SectionBox />
      <Footer />
    </>
  );
};
export default MainPage;
