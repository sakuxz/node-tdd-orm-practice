var Counter = React.createClass({
  getInitialState: function(){
    return {
      counter: 0
    }
  },

  tick: function() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  },

  componentWillMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <h1>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
});

module.exports = Counter;
