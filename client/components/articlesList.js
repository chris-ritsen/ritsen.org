
import * as media from "../media";
import Radium from "radium";
import React, { Component } from "react";
import dateformat from "dateformat";

import ArticlesListItem from "./articlesListItem.js";

class ArticlesList extends Component {
  render() {
    const style = {
      "posts": {
        "display": "flex",
        "flexBasis": "700px",
        "flexDirection": "column",
        [media.huge.portrait]: {
          "flexBasis": "920px"
        },
        [media.huge.landscape]: {
          "flexBasis": "920px"
        }
      },
      "post": {
        "display": "flex",
        "flexDirection": "column",
        "fontFamily": "'Open Sans', sans-serif",
        "letterSpacing": "1px",
        "listStyle": "none",
        "padding": "0.25rem",
        "textTransform": "uppercase"
      }
    };

    let articles = require("../articles/index").default;

    let items = (() => {
      let mapArticles = (article, index) => {
        let item = article.default;
        let timestamp = dateformat(item.time, "d mmm yyyy");

        const linkTimestamp = dateformat(item.time, "yyyy/mm/dd");

        const link = `/article/${linkTimestamp}/${item.slug}`;


        return (
          <li style={style.post} key={index}>
            <ArticlesListItem to={link} time={timestamp}>{item.title}</ArticlesListItem>
          </li>
        );
      };

      return (
        <ul style={style.posts}>
        {articles.map(mapArticles)}
        </ul>
      );
    })();

    return items;
  }
}

export default Radium(ArticlesList);

