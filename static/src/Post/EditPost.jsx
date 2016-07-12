var EditPost = React.createClass({
  render: function() {
    return (
      <div className={(this.props.open)?"model-wapper open":"model-wapper"}>
        <div className="my-mask" onClick={this.props.toggleEdit}></div>
        <div className="my-modal">
          <div className="header blue">Create New Post</div>
          <div className="content">
            <form className="ui form" ref="form" >
              <div className="field">
               <label>Text</label>
               <textarea name="content"></textarea>
             </div>
              <button className="ui button" type="submit" onClick={this.createPost} >Post</button>
            </form>
          </div>
        </div>
      </div>
    );
  },
  isSend: false,
  createPost: function(e) {
    e.preventDefault();
    if(this.isSend) return;
    var check = true;
    $(this.refs.form).serializeArray().forEach(function(e, i) {
      if(e.value === "")
        check = false;
    });
    if(check){
      this.isSend = true;
      var data = $(this.refs.form).serializeObject();
      postPost(data).then(function () {
        this.isSend = false;
        this.refs.form.reset();
        $('body').trigger('new_mes');
        this.props.toggleEdit();
      }.bind(this), function (e) {
        this.isSend = false;
        this.refs.form.reset();
        e = JSON.parse(e.responseText);
        if(e.data === 'no auth')
          alert('you have been logout');
        else
          alert('network error');
      }.bind(this));
    }
  }
});

function postPost(data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: '/post',
      type: 'POST',
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

module.exports = EditPost;
