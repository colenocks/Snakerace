import React from "react";
import { hot } from "react-hot-loader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";

const App = () => {
  return (
    <section className='main'>
      <Header />
      <Footer />
    </section>
  );
};

export default hot(module)(App);
