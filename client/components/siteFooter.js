
import React, { Component } from "react";

class SiteHeader extends Component {
  render() {
    const style = {
      footer: {
        "borderTop": "1px solid white",
        "display": "flex",
        "flexShrink": 0,
        "justifyContent": "center",
        "letterSpacing": "1px",
        "margin": "1.5rem 0",
        "padding": "2.5rem 0",
        "textTransform": "uppercase"
      },
      "links": {
        "display": "flex"
      },
      "link": {
        "fontFamily": "'Open Sans', sans-serif",
        "padding": "0 0.5rem"
      }
    };

    return (
      <footer style={style.footer}>
        <ul style={style.links}>
          <li><a target="_blank" style={style.link} href="mailto:chris.ritsen@gmail.com?su=Hello!">email</a></li>
          <li><a target="_blank" style={style.link} href="https://github.com/chris-ritsen">github</a></li>
        </ul>
      </footer>
    );
  }
}

export default SiteHeader;

