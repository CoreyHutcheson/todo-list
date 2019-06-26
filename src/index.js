import React from "react";
import { render } from "react-dom";
import { Todo } from "./Todo.jsx";

import "css-reset-and-normalize/css/reset-and-normalize.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

render(<Todo />, document.querySelector("#root"));
