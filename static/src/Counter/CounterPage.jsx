require('Counter/CounterPage.scss');

var Counter = require('Counter/Counter.jsx');
var CounterPage = React.createClass({
  getInitialState: function() {
    return {
      increment: 10
    };
  },
  randIncrement: function() {
    this.setState({
      increment: Math.floor((Math.random() * 50) + 1)
    });
  },
  render: function() {
    return (
      <div>
        <Counter increment={this.state.increment}/>
        <Counter increment={5}/>
        <button onClick={this.randIncrement} className="btn btn-primary">Random first counter's increment</button>
      </div>
    );
  }
});

module.exports = CounterPage;
