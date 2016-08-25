
import React from "react";
import { withRouter } from "react-router";

import AddLink from "./addLink";
import Header from "./header";
import ReferralsList from "./referralsList";
import LandingPage from "./landingPage";

const App = withRouter(({ params, location }) => {
  let template;

  if (params.path === "landing" && location.query.link) {
    let link = location.query.link;

    console.log(`Landing Page for link '${link}' should be displayed.`);

    template = (
      <div>
        <LandingPage link={link}></LandingPage>
      </div>
    );
  } else {
    template = (
      <div>
        <Header></Header>
        <AddLink></AddLink>
        <ReferralsList></ReferralsList>
      </div>
    );
  }

  return template;
});

export default App;

