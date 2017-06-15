import React, { Component } from 'react'
import { mapStateToProps, mapDispatchToProps, connect } from 'react-redux'

import { fetchPosts } from './actionCreators'
import { select } from 'redux-crud-store'

class List extends Component {
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
        {posts.data.map(post => <li key={post.id}>{post.title}</li>)}
      </div>
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { posts: select(fetchPosts({ page: 1 }), state.models) }
}

export default connect(mapStateToProps)(List)
