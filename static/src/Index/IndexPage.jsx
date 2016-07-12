var colors = ["rgb(187, 243, 247)", "rgb(218, 189, 252)", "rgb(148, 132, 255)", "rgb(145, 233, 234)", "rgb(255, 179, 165)", "rgb(155, 255, 183)", "rgb(255, 222, 204)", "rgb(149, 244, 195)", "rgb(221, 146, 244)", "rgb(144, 112, 239)", "rgb(240, 152, 242)", "rgb(134, 249, 165)", "rgb(119, 255, 171)", "rgb(250, 159, 252)", "rgb(249, 159, 225)", "rgb(153, 247, 222)", "rgb(232, 247, 136)", "rgb(127, 239, 107)", "rgb(129, 239, 136)", "rgb(131, 252, 187)", "rgb(234, 137, 105)", "rgb(178, 182, 255)", "rgb(246, 249, 159)", "rgb(163, 255, 187)"];

var Post = React.createClass({
  render: function() {
    var icon_background_index = this.props.data.User.username[0].charCodeAt()%24;
    var icon_background = colors[icon_background_index];
    return (
      <div className="post" style={{animationDelay:this.props.index*0.1+"s"}}>
        <div className="p-icon" style={{background:icon_background}}>{this.props.data.User.username[0].toLocaleUpperCase()}</div>
        <div className="p-content">
          <h3>{this.props.data.User.username}</h3>
          {
            this.props.data.content.split('\n').map(function(e, i) {
              return <p key={i}>{e}</p>;
            })
          }
          <span>{new Date(this.props.data.createdAt).toLocaleDateString()+" "+new Date(this.props.data.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    );
  }
});

var IndexPage = React.createClass({
  getInitialState: function() {
    getPost().then(function (data) {
      this.setState({
        posts: data.data
      });
    }.bind(this), function () {
      alert('network error');
    });
    return {
      posts: [
        // {
        //   username: 'ken',
        //   content: "hfg sdfsdfsdf hfg hfgh\ngdfgfdgfdg\ngfdgdfg",
        //   createdAt: 1321323133
        // },
        // {
        //   username: 'ken',
        //   content: "hfghfghfgh\ngdfgfdgfdg\ngfdgdfg",
        //   createdAt: 1321323133
        // },
        // {
        //   username: 'ken',
        //   content: "hfghfghfgh\ngdfgfdgfdg\ngfdgdfg",
        //   createdAt: 1321323133
        // }
      ]
    };
  },
  render: function() {
    return (
      <div className="ui container">
        <div className="post-wrapper">
          {
            this.state.posts.map(function(e, i) {
              return <Post data={e} key={i} index={i} />;
            })
          }
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    console.log('in');
    $('body').on('new_mes',function() {
      console.log('fsdfsdfsd');
      getPost().then(function (data) {
        this.setState({
          posts: data.data
        });
      }.bind(this), function () {
        alert('network error');
      });
    }.bind(this));
  }
});

module.exports = IndexPage;

function getPost() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/post',
      type: 'GET'
    })
    .done(function(mes) {
      resolve(mes)
    })
    .fail(function(mes) {
      reject(mes)
    })
  });
}
