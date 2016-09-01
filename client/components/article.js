
import React, { Component } from "react";
import { Link, withRouter } from "react-router";

import SiteFooter from "./siteFooter.js";
import SiteHeader from "./siteHeader.js";

class Article extends Component {
  render() {
    const style = {
      "base": {
        "backgroundColor": "black",
        "display": "flex",
        "flexDirection": "column",
        "flexGrow": "1"
      },
      "main": {
        "display": "flex",
        "flexShrink": 0,
        "justifyContent": "center"
      },
      "article": {
        "fontSize": "1.5rem"
      },
      "articleTime": {
        "display": "flex",
        "fontFamily": "'Open Sans', sans-serif",
        "fontSize": "1.6rem",
        "justifyContent": "center"
      },
      "articleHeader": {
        "display": "flex",
        "justifyContent": "center",
        "fontSize": "2.5rem",
        "margin": "0 0 1.5rem 0"
      },
      "sectionHeader": {
        "display": "flex",
        "justifyContent": "center",
        "fontSize": "2.0rem",
        "margin": "0 0 1.5rem 0"
      },
      "post": {
        "display": "flex",
        "flexDirection": "column",
        "fontFamily": "'Open Sans', sans-serif",
        "letterSpacing": "1px",
        "listStyle": "none",
        "textTransform": "uppercase"
      },
      "mainCell": {
        "display": "flex",
        "flexBasis": "700px",
        "flexDirection": "column"
      },
      "mainHeader": {
        "margin": "0 0 2.5rem 0"
      },
      "postLink": {
        "display": "flex",
        "flexDirection": "column"
      }
    };

    let articleBody = (

<div>
  <section>
    <p>
{`

This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.

`}
    </p>
  </section>

  <section>
    <h3 style={style.sectionHeader}>a dumb article</h3>
    <p>
{`

This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.
This is just a dumb article to test out this website.

`}
    </p>
  </section>
</div>

  );

    return (
      <div style={style.base}>
        <SiteHeader />
        <main style={style.main}>
          <div style={style.mainCell}>
            <header style={style.mainHeader}>
              <h2 style={style.articleHeader}>Something to write about</h2>
              <time style={style.articleTime}>1 Sep 2016</time>
            </header>
            <article style={style.article}>
            {articleBody}
            </article>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }
}

Article = withRouter(Article);

export default Article;

