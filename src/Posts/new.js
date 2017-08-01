import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectActionStatus } from 'redux-crud-store'

import { createPost } from './actionCreators'

class NewPost extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.status.response) {
      nextProps.history.push(`/posts/${nextProps.status.response.id}`)
    }
  }

  update = field => e => {
    this.setState({ [field]: e.target.value })
  }

  submit = e => {
    e.preventDefault()
    const { post } = this.props
    if (this.state !== null) {
      this.props.dispatch(createPost(this.state))
    }
  }

  renderForm = () => {
    return <div>
      <ul>
        <li>Title: <input defaultValue="" onChange={this.update('title')}/></li>
        <li>Author: <input defaultValue="" onChange={this.update('author')}/></li>
        <li>Body: <textarea defaultValue="" onChange={this.update('body')}/></li>
      </ul>
      <button onClick={this.submit}>Save</button>
    </div>
  }

  render() {
    const { post } = this.props
    return <div>
      <p><Link to="/posts">Back to posts</Link></p>
      {this.renderForm()}
    </div>
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params
  return {
    status: selectActionStatus('posts', state.models, 'create')
  }
}

export default connect(mapStateToProps)(NewPost)
