
import React, { Component } from "react";
import { Link, withRouter } from "react-router";

import ArticlesList from "./articlesList.js";
import SiteFooter from "./siteFooter.js";
import SiteHeader from "./siteHeader.js";

class HomePage extends Component {
  render() {
    const style = {
      base: {
        "backgroundColor": "black",
        "display": "flex",
        flexDirection: "column",
        "flexGrow": "1"
      },
      "main": {
        "display": "flex",
        "flexShrink": 0,
        "justifyContent": "center"
      }
    };

    return (
      <div style={style.base}>
        <SiteHeader />
        <main style={style.main}>
          <ArticlesList />
        </main>
        <SiteFooter />
      </div>
    );
  }
}

HomePage = withRouter(HomePage);

export default HomePage;

