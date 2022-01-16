import React, { useState, useEffect } from "react";
import GeoAPI from "./geoAPI.js";

function App() {
  let [search, setSearch] = useState("");
  let [data, setData] = useState(null);

  function checkSearchInput() {
    if (
      document.querySelector("input") &&
      document.querySelector("input").value == ""
    ) {
      if (document.querySelector("#searchButton")) {
        document
          .querySelector("#searchButton")
          .setAttribute("disabled", "disabled");
      }
    } else {
      if (document.querySelector("#searchButton")) {
        document.querySelector("#searchButton").removeAttribute("disabled");
      }
    }
  }
  checkSearchInput();

  function onInputChange(event) {
    setSearch(event.target.value);
    checkSearchInput();
  }

  useEffect(() => {
    checkSearchInput();
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    setData("loading");

    let baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json`;
    let apiKey = process.env.REACT_APP_GIG_API_KEY;
    let geoco = document.querySelector("#coordinates").innerText;
    let queryParams = `?apikey=${apiKey}&keyword=${search}&latlong=${geoco}`;
    let endpoint = baseUrl + queryParams;

    fetch(endpoint)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setData(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  let markup = (
    <h3>
      Search for your favourite artist and see the nearest place they are
      playing!
    </h3>
  );

  if (data === "loading") {
    markup = <h3>Loading...</h3>;
  } else if (data !== null) {
    let GigInfo = data;
    if (!GigInfo._embedded) {
      markup = (
        <div id="noResults">
          Oh no, looks like there's nothing available - please search again.
        </div>
      );
    } else {
      markup = (
        <div>
          <div id="artist">
            <strong>Artist:</strong> {GigInfo._embedded.events[0].name}
          </div>
          <div id="venue">
            <strong>Venue:</strong>{" "}
            {GigInfo._embedded.events[0]._embedded.venues[0].name}
          </div>
          <div id="city">
            <strong>City:</strong>{" "}
            {GigInfo._embedded.events[0]._embedded.venues[0].city.name}
          </div>
          <div id="artist">
            You're only{" "}
            <span id="miles">
              {" "}
              {GigInfo._embedded.events[0]._embedded.venues[0].distance}
            </span>{" "}
            miles away from this gig!
          </div>
          <img src={GigInfo._embedded.events[0].images[0].url} />
          <div id="buttonSection">
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = GigInfo._embedded.events[0].url;
                }}
              >
                Want to go to this gig?
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `http://www.youtube.com/results?search_query=${search}`;
                }}
              >
                Or listen to them now?
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  function onButtonClick(e) {
    if (e.target.innerText.indexOf("Click to show") > -1) {
      document.querySelector("#coordinates").classList.add("showing");
      document.querySelector("#coordinates").classList.remove("hidden");
      e.target.innerText = "Click to hide";
    } else {
      e.target.innerText = "Click to show";
      document.querySelector("#coordinates").classList.add("hidden");
      document.querySelector("#coordinates").classList.remove("showing");
    }
  }
  return (
    <div>
      <h1>COVID be damned, I want to go see something!</h1>
      <div>
        <p>
          Getting fed up of this COVID nonsense? Looking to be somewhere that's
          not your house? We're here to help - by getting you on your way to
          seeing your favourite artists!
        </p>
        <p>
          There's a gig out there for everyone and we're ready to help! In fact,
          it's not creepy, but we know where you (roughly) are right now...
        </p>
        <div id="coordContainer">
          <div id="coordCheck">
            <p>We can prove it, want to see?</p>
            <span>Your coordinates are: </span>
            <button onClick={onButtonClick}>Click to show</button>
            <span id="coordinates" className="hidden">
              <GeoAPI />
            </span>
          </div>
        </div>
      </div>
      <div id="searchDiv">
        <div id="searchContainer">
          <div>Anyway, let's search for a gig:</div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Search for your artist"
              onChange={onInputChange}
              value={search}
            />
            <button id="searchButton" disabled="disabled">
              Search
            </button>
          </form>
        </div>
      </div>
      <div id="gigInfo"> {markup}</div>
    </div>
  );
}

export default App;
