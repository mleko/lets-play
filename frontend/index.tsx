import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContext} from "./src/AppContext";

// Render a simple React component into the body.
const element = document.createElement("div");
document.getElementsByTagName("body")[0].appendChild(element);
ReactDOM.render(<AppContext/>, element);
