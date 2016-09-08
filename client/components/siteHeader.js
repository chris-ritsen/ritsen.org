
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import { Link } from "react-router";

class SiteHeader extends Component {
  render() {
    const links = [
      {
        "text": "Media Player",
        "to": "/media_player"
      },
      {
        "text": "Audio Player",
        "to": "/audio_player"
      }
    ];

    const style = {
      "header": {
        "alignItems": "center",
        "borderBottom": "1px solid white",
        "display": "flex",
        "flexDirection": "row",
        "flexShrink": 0,
        "justifyContent": "center",
        "margin": "0 0 1.5rem 0",
        "padding": "1.5rem 0"
      },
      "links": {
        [media.huge.portrait]: {
          "display": "flex",
          "flexBasis": "200px",
          "justifyContent": "space-around"
        },
        [media.huge.landscape]: {
          "display": "flex",
          "flexBasis": "200px",
          "justifyContent": "space-around"
        }
      },
      "link": {
        "padding": "0.5rem 0"
      },
      "headerCell": {
        "alignItems": (links.length > 1) ? "center" : "baseline",
        "display": "flex",
        "flexBasis": "700px",
        "flexDirection": "row",
        "justifyContent": "space-between",
        [media.huge.portrait]: {
          "alignItems": "baseline",
          "flexBasis": "920px"
        },
        [media.huge.landscape]: {
          "alignItems": "baseline",
          "flexBasis": "920px"
        },
        [media.mobile.landscape]: {
          "justifyContent": "space-around"
        },
        [media.mobile.portrait]: {
          "justifyContent": "space-around"
        }
      }
    };

    let siteLinks = (() => {
      let mapLinks = (link, index) => {
        return (
          <li style={style.link} key={index}>
            <Link to={link.to}>{link.text}</Link>
          </li>
        );
      };

      return (
        <ul style={style.links}>
        {links.map(mapLinks)}
        </ul>
      );
    })();

    return (
      <header style={style.header}>
        <div style={style.headerCell}>
          <h1>
            <Link to={"/"}>Chris Ritsen</Link>
          </h1>
          {siteLinks}
        </div>
      </header>
    );
  }
}

SiteHeader = Radium(SiteHeader);

export default SiteHeader;

