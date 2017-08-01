import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { select, selectActionStatus } from 'redux-crud-store'

import { fetchPost, updatePost, deletePost } from './actionCreators'

class EditPost extends Component {
  componentWillMount() {
    this.init(this.props.post, this.props.dispatch)
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps.post, nextProps.dispatch)
    if (nextProps.updateStatus.response) {
      nextProps.history.push(`/posts/${nextProps.post.data.id}`)
    } else if (nextProps.deleteStatus.response) {
      nextProps.history.push("/posts")
    }
  }

  init = (post, dispatch) => {
    if (post.needsFetch) {
      dispatch(post.fetch)
    }
  }

  update = field => e => {
    this.setState({ [field]: e.target.value })
  }

  delete = e => {
    this.props.dispatch(deletePost(this.props.post.data.id))
  }

  submit = e => {
    e.preventDefault()
    const { post } = this.props
    if (this.state !== null) {
      const newPost = Object.assign(post.data, this.state)
      this.props.dispatch(updatePost(post.data.id, newPost))
    }
  }

  renderPost = () => {
    const { post } = this.props
    if (post.isLoading) {
      return <div>
        <p>loading...</p>
      </div>
    } else {
      return <div>
        <ul>
          <li>Title: <input defaultValue={post.data.title} onChange={this.update('title')}/></li>
          <li>Author: <input defaultValue={post.data.author} onChange={this.update('author')}/></li>
          <li>Body: <textarea defaultValue={post.data.body} onChange={this.update('body')}/></li>
        </ul>
        <button onClick={this.submit}>Save</button>
      </div>

    }
  }

  render() {
    const { post } = this.props
    return <div>
      <p><Link to="/posts">Back to posts</Link></p>
      {this.renderPost()}
      {post.data && (
        <p><Link to={`/posts/${post.data.id}`}>Stop editing</Link></p>
      )}
      {post.data && (
        <p><button onClick={this.delete}>Delete post</button></p>
      )}
    </div>
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  return {
    post: select(fetchPost(id), state.models),
    updateStatus: selectActionStatus('posts', state.models, 'update'),
    deleteStatus: selectActionStatus('posts', state.models, 'delete')
  }
}

export default connect(mapStateToProps)(EditPost)
