
import * as actions from "../actions/index";
import React from "react";
import { connect } from "react-redux";

let ReferralsList = ({ dispatch, state }) => {
  if (!Object.keys(state).length) {
    return (<div></div>);
  }

  let links = Object.keys(state).map((prop, index) => {
    const editLink = () => {
      // TODO: Decide how the user will enter a new link title.
    };

    const removeLink = () => {
      dispatch(actions.removeLink(prop));
    }

    return (
      <tr key={prop}>
        <td>{prop}</td>
        <td>{state[prop]}</td>
        <td onClick={editLink}>Edit</td>
        <td onClick={removeLink}>Delete</td>
      </tr>
    );
  });

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
  return {
    state
  };
};

ReferralsList = connect(mapProps)(ReferralsList);

export default ReferralsList;

