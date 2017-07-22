import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { select } from 'redux-crud-store'

import { fetchPost } from './actionCreators'

class Post extends Component {
  componentWillMount() {
    const { post, dispatch } = this.props
    if (post.needsFetch) {
      dispatch(post.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { post } = nextProps
    const { dispatch } = this.props
    if (post.needsFetch) {
      dispatch(post.fetch)
    }
  }

  renderPost = () => {
    const { post } = this.props
    if (post.isLoading) {
      return <div>
        <p>loading...</p>
      </div>
    } else {
      return <ul>
        <li>Title: {post.data.title}</li>
        <li>Author: {post.data.author}</li>
        <li>Body: {post.data.body}</li>
      </ul>
    }
  }

  render() {
    const { post } = this.props
    return <div>
      <p><Link to="/posts">Back to posts</Link></p>
      {this.renderPost()}
      { post.data && (
        <p><Link to={`/posts/${post.data.id}/edit`}>Edit</Link></p>
      )}
    </div>
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  return { post: select(fetchPost(id), state.models) }
}

export default connect(mapStateToProps)(Post)
