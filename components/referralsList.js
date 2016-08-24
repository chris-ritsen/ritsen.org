
import React from "react";
import { connect } from "react-redux";

let ReferralsList = ({ dispatch, state }) => {
  if (!Object.keys(state).length) {
    return (<div></div>);
  }

  let links = Object.keys(state).map((prop, index) => (
    <tr key={prop}>
      <td>{prop}</td>
      <td>{state[prop]}</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
  ));

  return (
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
          {links}
        </tbody>
      </table>
    </div>
  );
};

const mapProps = (state) => {
  console.log(state);
  return {
    state
  };
};

ReferralsList = connect(mapProps)(ReferralsList);

export default ReferralsList;

