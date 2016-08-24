
import React from "react";
import { render } from "react-dom";

const rootEl = document.getElementById("root");

const root = (
  <div>
    <h1>Grow the web with referrals!</h1>
    <div>
      <span>Add a link:</span>
      <input type="text" placeholder="Enter a title…" />
      <button name="add">Add</button>
    </div>
    <div>
    <table>
      <thead>
        <tr>
          <th>Link title</th>
          <th>Clicks</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>0</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
);

render(root, rootEl);

