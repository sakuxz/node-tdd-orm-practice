var ReactRouter = require('react-router'),
  Route = ReactRouter.Route,
  IndexRoute = ReactRouter.IndexRoute,
  Link = ReactRouter.Link;

var App = require('App.jsx');
var IndexPage = require('Index/IndexPage.jsx');
// var AboutPage = require('About/AboutPage.jsx');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage}/>
    {/*<Route path="about" component={AboutPage}/>*/}
  </Route>
);

module.exports = routes;
