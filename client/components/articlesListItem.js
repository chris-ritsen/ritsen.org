
import React, { Component } from "react";
import { Link } from "react-router";

class ArticlesListItem extends Component {
  render() {
    const style = {
      "postLink": {
        "display": "flex",
        "flexDirection": "column",
        "padding": "0.5rem"
      }
    };

    return (
      <Link style={style.postLink} to={"/article/2016/09/01/something-to-write-about"}>
      <time>1 Sep 2016</time>
      Something to write about
      </Link>
    );
  }
}

export default ArticlesListItem;

