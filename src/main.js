import React from "react";
import { render } from "react-dom";
import App from "./app";

import "./styles.css";

let targetElement = document.querySelector("#app");

render(<App />, targetElement);
