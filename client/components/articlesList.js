
import React, { Component } from "react";
import { Link } from "react-router";

import ArticlesListItem from "./articlesListItem.js";

class ArticlesList extends Component {
  render() {
    const style = {
      "posts": {
        display: "flex",
        flexBasis: "700px",
        flexDirection: "column"
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

    return (
      <ul style={style.posts}>
        <li style={style.post}>
          <ArticlesListItem />
        </li>
        <li style={style.post}>
          <ArticlesListItem />
        </li>
        <li style={style.post}>
          <ArticlesListItem />
        </li>
        <li style={style.post}>
          <ArticlesListItem />
        </li>
        <li style={style.post}>
          <ArticlesListItem />
        </li>
      </ul>
    );
  }
}

export default ArticlesList;

