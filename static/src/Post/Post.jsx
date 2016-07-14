var colors = ["rgb(187, 243, 247)", "rgb(218, 189, 252)", "rgb(148, 132, 255)", "rgb(145, 233, 234)", "rgb(255, 179, 165)", "rgb(155, 255, 183)", "rgb(255, 222, 204)", "rgb(149, 244, 195)", "rgb(221, 146, 244)", "rgb(144, 112, 239)", "rgb(240, 152, 242)", "rgb(134, 249, 165)", "rgb(119, 255, 171)", "rgb(250, 159, 252)", "rgb(249, 159, 225)", "rgb(153, 247, 222)", "rgb(232, 247, 136)", "rgb(127, 239, 107)", "rgb(129, 239, 136)", "rgb(131, 252, 187)", "rgb(234, 137, 105)", "rgb(178, 182, 255)", "rgb(246, 249, 159)", "rgb(163, 255, 187)"];


var Post = React.createClass({
  getInitialState: function() {
    return {
      editMode: false
    }
  },
  render: function() {
    var icon_background_index = this.props.data.username[0].charCodeAt()%24;
    var icon_background = colors[icon_background_index];
    return (
      <div className={(this.state.editMode)?"post edit-mode":"post"} style={{animationDelay:this.props.index*0.1+"s"}}>
        <div className="p-icon" style={{background:icon_background}}>{this.props.data.username[0].toLocaleUpperCase()}</div>
        <div className="p-content">
          <h3>{this.props.data.username}</h3>
          {
            this.props.data.content.split('\n').map(function(e, i) {
              return <p key={i}>{e}</p>;
            })
          }
          <textarea ref="edit" className="edit-content" name="content" defaultValue={this.props.data.content} />
          <button className="submit ui blue basic button" onClick={this.editPost} >update post</button>
          <div className="ctrl-group">
            <button className="ui circular blue icon button" onClick={this.toggleEditPost}>
              <i className="edit icon"></i>
            </button>
            <button className="ui circular red icon button" onClick={this.deletePost}>
              <i className="remove icon"></i>
            </button>
          </div>
          <span>{new Date(this.props.data.createdAt).toLocaleDateString()+" "+new Date(this.props.data.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    );
  },
  deletePost: function() {
    var data = {
      id: this.props.data.id
    }
    deletePost(data).then(function() {
      this.props.updatePostData();
    }.bind(this), function (e) {
      e = JSON.parse(e.responseText);
      if(e.data === 'no auth')
        alert('this is not your post');
      else
        alert('network error');
    });
  },
  toggleEditPost: function() {
    this.setState({
      editMode: !this.state.editMode
    },function() {
      this.refs.edit.focus();
      this.refs.edit.value = this.props.data.content;
    });
  },
  editPost: function() {
    var data = {
      id: this.props.data.id,
      content: this.refs.edit.value
    }
    updatePost(data).then(function() {
      this.toggleEditPost();
      this.props.updatePostData();
    }.bind(this), function (e) {
      e = JSON.parse(e.responseText);
      if(e.data === 'no auth')
        alert('this is not your post');
      else
        alert('network error');
    });
  }
});

export default Post;

function deletePost(data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/post',
      type: 'DELETE',
      data: data
    })
    .done(function(mes) {
      resolve(mes)
    })
    .fail(function(mes) {
      reject(mes)
    })
  });
}

function updatePost(data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/post',
      type: 'PATCH',
      data: data
    })
    .done(function(mes) {
      resolve(mes)
    })
    .fail(function(mes) {
      reject(mes)
    })
  });
}
