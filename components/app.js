
import React from "react";
import { withRouter } from "react-router";

import AddLink from "./addLink";
import Header from "./header";
import ReferralsList from "./referralsList";

const App = withRouter(({ params, location }) => {
  if (params.path === "landing" && location.query.link) {
    let link = location.query.link;

    console.log(`Landing Page for link '${link}' should be displayed.`);
  } else {
    console.log("Should display Link Page");
  }

  return (
    <div>
      <Header></Header>
      <AddLink></AddLink>
      <ReferralsList></ReferralsList>
    </div>
  );
});

export default App;

