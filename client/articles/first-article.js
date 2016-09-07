
import React, { Component } from "react";
import { Link } from "react-router";

const slug = "first-article";
const time = new Date(2016, 8, 7);
const title = "This is the first article";

const text = (

<div>

<p>
This is the first article on this website.  I've created a new web
application, this time with React instead of Angular.  It's also using webpack
instead of browserify.  I was initially in favor of browserify and gulp, but
the configuration was too time consuming for what I need presently.  Webpack
does what I want with very little configuration, which is to watch files for
changes and to rebuild the client bundle quickly.  Browserify required too
much effort to get efficient recompilation.  I've seen the hot module
reloading and server-side rendering, and will likely add them into this
project in the future.
</p>

<p>
I've attempted setting up similar websites previously but they never get much
attention after I learn that I could be using some other technologies to build
the website.  JavaScript's toolset is changing rapidly these days.  The way
I'm writing these articles is free-form; I'm not thinking of anything in
advance and writing about it specifically, and I don't plan on doing any
significant editing to this article.
</p>

<p>
I obviously need to create a separate production instance of this website so
that the client bundle is not 2MB in size.  I'm breaking stuff all the time
and everything is changing.  OK, trying out a list.
</p>

<h3>A list</h3>

<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

<p>
Added a margin around everything inside the article so that the list items
line up with the article text.  There are a lot of problems to fix here.  I'm
trying out inline styles for the components, but some things, like the styling
of this file, really should be left in a stylesheet.  I could override
anything I want since this article is written in JSX, but some standard
styling is called for.
</p>

<p>
How about a link? <Link to="/">Back to home</Link>.  That link is rendered
with React Router, so it doesn't do a full page reload like other links would.
</p>

<p>
I don't yet have a script watching for changes to the server files and
reloading the systemd daemon when that happens.  This service also does not
seem to be reloading when my system restarts.  More reason to deploy this
somewhere other than my own computer.
</p>

<p>
I've successfully added server-side rendering of the React application.
This was trickier because I have some wrappers on my React components, such as
Radium and react-router, but it seems to be working now.  I added a loading
class to the Radium style-root element to avoid visibly rendering anything
before Radium's media queries kick in.  This is an obvious disadvantage to
using inline styling.  React is complaining that the server-side markup
differs from the client-side markup due to the differences in classes and
inline styles, but without making both render to an even more basic view, I
can't resolve this easily.
</p>

<p>
</p>

</div>

);

export default {
  slug,
  text,
  time,
  title
};

