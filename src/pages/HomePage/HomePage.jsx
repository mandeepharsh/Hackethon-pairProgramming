import React, { useState, useEffect } from "react";
import axios from "axios";
import "../HomePage/HomePage.scss";
import Hero from "../../../components/hero/hero";

const HomePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    setIsLoading(true);
    axios
      .get("https://type.fit/api/quotes")
      .then((response) => {
        setQuotes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const Quote = ({ text, author }) => (
    <div>
      <p>{text}</p>
      <p>{author}</p>
    </div>
  );

  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <>
      <div className="home-page">
        {isLoading ? (
          <p className="home-page__loading">Loading...</p>
        ) : quotes.length > 0 ? (
          <div className="home-page__quote" onClick={nextQuote}>
            <Quote text={currentQuote.text} author={currentQuote.author} />
          </div>
        ) : (
          <p>No quotes available.</p>
        )}
      </div>
      <Hero />
    </>
  );
};

export default HomePage;
