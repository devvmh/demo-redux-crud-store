import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { select } from 'redux-crud-store'

import { fetchPosts } from './actionCreators'

class PostIndex extends Component {
  componentWillMount() {
    const { posts, dispatch } = this.props
    if (posts.needsFetch) {
      dispatch(posts.fetch)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { posts } = nextProps
    const { dispatch } = this.props
    if (posts.needsFetch) {
      dispatch(posts.fetch)
    }
  }

  render() {
    const { posts } = this.props
    if (posts.isLoading) {
      return <div>
        <p>loading...</p>
      </div>
    } else {
      return <div>
        {posts.data.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </div>
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { posts: select(fetchPosts({}), state.models) }
}

export default connect(mapStateToProps)(PostIndex)
