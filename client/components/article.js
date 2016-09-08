
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import dateformat from "dateformat";
import { withRouter } from "react-router";

import SiteFooter from "./siteFooter.js";
import SiteHeader from "./siteHeader.js";

class Article extends Component {
  render() {
    const slug = this.props.router.params.slug;
    let article = require("../articles/" + slug + ".js").default;

    let timestamp = dateformat(article.time, "d mmm yyyy");

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
        "justifyContent": "center",
        [media.mobile.landscape]: {
          "margin": "0 0.75rem"
        },
        [media.mobile.portrait]: {
          "margin": "0 0.75rem"
        }
      },
      "article": {
        "fontSize": "1.5rem",
        [media.mobile.landscape]: {
          "fontSize": "1.0rem"
        },
        [media.mobile.portrait]: {
          "fontSize": "1.25rem"
        }
      },
      "articleTime": {
        "display": "flex",
        "fontFamily": "'Open Sans', sans-serif",
        "fontSize": "1.6rem",
        "justifyContent": "center",
        [media.mobile.landscape]: {
          "fontSize": "1.6rem"
        },
        [media.mobile.portrait]: {
          "fontSize": "1.6rem"
        }
      },
      "articleHeader": {
        "display": "flex",
        "justifyContent": "center",
        "fontSize": "2.5rem",
        "margin": "0 0 1.5rem 0",
        [media.mobile.landscape]: {
          "textAlign": 'center',
          "fontSize": "1.9rem"
        },
        [media.mobile.portrait]: {
          textAlign: 'center',
          "fontSize": "1.9rem"
        }
      },
      "sectionHeader": {
        "display": "flex",
        "justifyContent": "center",
        "fontSize": "2.0rem",
        "margin": "0 0 1.5rem 0",
        [media.mobile.landscape]: {
          "fontSize": "1.6rem"
        },
        [media.mobile.portrait]: {
          "fontSize": "1.6rem"
        }
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
        "flexDirection": "column",
        "margin": "0 1.25rem",
        [media.huge.portrait]: {
          "flexBasis": "920px"
        },
        [media.huge.landscape]: {
          "flexBasis": "920px"
        }
      },
      "mainHeader": {
        "margin": "0"
      },
      "postLink": {
        "display": "flex",
        "flexDirection": "column"
      }
    };

    return (
      <div style={style.base}>
        <SiteHeader />
        <main style={style.main}>
          <div style={style.mainCell}>
            <header style={style.mainHeader}>
              <h2 style={style.articleHeader}>{article.title}</h2>
              <time style={style.articleTime}>{timestamp}</time>
            </header>
            <article style={style.article}>
            {article.text}
            </article>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }
}

Article = withRouter(Radium(Article));

export default Article;

