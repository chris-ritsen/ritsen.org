
import React, { Component } from "react";
import { Link } from "react-router";

class ArticlesListItem extends Component {
  render() {
    const style = {
      "postLink": {
        "display": "flex",
        "flexDirection": "column",
        "padding": "0.5rem"
      },
      "title": {
        "margin": "0",
        "padding": "0"
      }
    };

    return (
      <Link style={style.postLink} to={this.props.to}>
      <time>{this.props.time}</time>
      <p style={style.title}>{this.props.children}</p>
      </Link>
    );
  }
}

export default ArticlesListItem;

