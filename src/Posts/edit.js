import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { select, selectActionStatus } from 'redux-crud-store'

import { fetchPost, updatePost } from './actionCreators'

class PostEdit extends Component {
  componentWillMount() {
    this.init(this.props.post, this.props.dispatch)
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps.post, nextProps.dispatch)
    if (nextProps.status.response) {
      nextProps.history.push(`/posts/${nextProps.post.data.id}`)
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
      { post.data && (
        <p><Link to={`/posts/${post.data.id}`}>Stop editing</Link></p>
      )}
    </div>
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  return {
    post: select(fetchPost(id), state.models),
    status: selectActionStatus('posts', state.models, 'update')
  }
}

export default connect(mapStateToProps)(PostEdit)
