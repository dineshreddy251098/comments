import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialCommentsList = []

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    username: '',
    comment: '',
    count: 0,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, like: !eachComment.like}
        }
        return eachComment
      }),
    }))
  }

  onDelete = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {username, comment, count} = this.state
    const color = initialContainerBackgroundClassNames[count % 7]
    const newComment = {
      id: uuidv4(),
      username,
      comment,
      date: new Date(),
      like: false,
      color,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
      count: prevState.count + 1,
    }))
  }

  render() {
    const {commentsList, username, comment} = this.state
    const countComments = commentsList.length

    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="comment-header-container">
          <div className="comment-container">
            <img
              className="comment-image-sm"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
            <form onSubmit={this.onSubmitComment}>
              <p className="input-label">
                say something about 4.0 technologies
              </p>
              <br />
              <input
                onChange={this.onChangeUsername}
                placeholder="Your Name"
                className="input-username"
                id="username"
                type="text"
                value={username}
              />
              <br />
              <textarea
                onChange={this.onChangeComment}
                className="input-comment"
                placeholder="Your Comment"
                value={comment}
                cols="40"
                rows="8"
              />
              <br />
              <button className="submit-btn" type="submit">
                Add Comment
              </button>
            </form>
          </div>
          <div className="comment-image-lg">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr />
        <p className="comments-paragraph">
          <span className="comments-count">{countComments}</span> Comments
        </p>
        <ul className="comments-list-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              onDelete={this.onDelete}
              onLiked={this.onLiked}
              commentDetails={eachComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
