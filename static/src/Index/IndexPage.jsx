import Post from '../Post/Post';

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
    $('body').on('new_mes',function() {
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
