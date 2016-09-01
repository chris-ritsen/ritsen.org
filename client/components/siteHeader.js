
import { Link } from "react-router";
import React, { Component } from "react";

class SiteHeader extends Component {
  render() {
    let style = {
      "header": {
        "alignItems": "center",
        "borderBottom": "1px solid white",
        "display": "flex",
        "flexDirection": "row",
        "flexShrink": 0,
        "justifyContent": "center",
        "margin": "1.5rem 0",
        "padding": "1.5rem 0"
      },
      "headerCell": {
        "alignItems": "baseline",
        "display": "flex",
        "flexBasis": "700px",
        "flexDirection": "row",
        "justifyContent": "space-between"
      }
    };

    return (
      <header style={style.header}>
        <div style={style.headerCell}>
          <h1>
            <Link to={"/"}>Chris Ritsen</Link>
          </h1>
          <ul>
            <li>
              <Link to={"/media_player"}>Media Player</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default SiteHeader;

