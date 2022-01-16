import React, { useState, useEffect } from "react";

function GeoAPI() {
  let [location, setLocation] = useState(null);

  function getUserIP() {
    let baseUrl = `https://api.freegeoip.app/json`;
    let apiKey = process.env.REACT_APP_GEO_API_KEY;
    let queryParams = `?apikey=${apiKey}`;
    let endpoint = baseUrl + queryParams;

    fetch(endpoint)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setLocation(res.latitude + "," + res.longitude);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getUserIP();
  }, []);
  return location;
}
export default GeoAPI;
