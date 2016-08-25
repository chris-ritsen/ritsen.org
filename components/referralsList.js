
import * as actions from "../actions/index";
import React from "react";
import TitleEditor from "./titleEditor";
import { connect } from "react-redux";


let ReferralsList = ({ dispatch, state }) => {
  if (!Object.keys(state).length) {
    return (<div></div>);
  }

  let styles = {
    "base": {
      "display": "flex",
      "justifyContent": "center"
    },
    "numberColumn": {
      "textAlign": "right"
    }
  };

  let links = Object.keys(state).map((prop, index) => {

    const editLink = () => {
      dispatch(actions.startEditing(prop));
    };

    const removeLink = () => {
      dispatch(actions.removeLink(prop));
    }

    return (
      <tr key={prop} style={{backgroundColor: index % 2 === 0 ? "#DEE0E3" : "initial"}}>
        <td style={styles.cell}><TitleEditor editing={state[prop].editing} value={prop} /></td>
        <td style={styles.numberColumn}>{state[prop].hits}</td>
        <td className={"usePointer"} onClick={editLink}>Edit</td>
        <td className={"usePointer"} onClick={removeLink}>Delete</td>
      </tr>
    );
  });

  return (
    <div style={styles.base}>
      <table>
        <thead>
          <tr>
            <th className={"usePointer"}>Link title</th>
            <th className={"usePointer"}>Clicks</th>
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

