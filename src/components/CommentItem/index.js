import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onLiked, onDelete} = props
  const {id, username, comment, date, color, like} = commentDetails
  const time = formatDistanceToNow(date)
  const firstLetter = username.slice(0, 1).toUpperCase()

  const onClickedLike = () => {
    onLiked(id)
  }

  const onClickedDelete = () => {
    onDelete(id)
  }

  const liked = like ? 'liked' : ''
  const likedImage = like
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li className="comment-container">
      <div className="username-container">
        <div className={`logo-container ${color}`}>
          <p className="user-logo">{firstLetter}</p>
        </div>
        <div>
          <p className="username">
            {username} <span className="time">{time.concat(' ago')}</span>
          </p>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div>
        <div className="buttons-container">
          <button
            onClick={onClickedLike}
            className="button"
            testid="like"
            type="button"
          >
            <img
              className="like-image"
              id="like-image"
              src={likedImage}
              alt="like"
            />
            <label htmlFor="like-image" className={`like ${liked}`}>
              Like
            </label>
          </button>

          <button
            onClick={onClickedDelete}
            className="button"
            testid="delete"
            type="button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
            />
          </button>
        </div>
        <hr />
      </div>
    </li>
  )
}

export default CommentItem
