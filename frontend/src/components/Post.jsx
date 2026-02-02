import { useState } from "react"
import Comment from "./Comment"

export default function Post({ post, addComment, togglePostLike, toggleCommentLike }) {
  const [commentText, setCommentText] = useState("")

  const submitComment = () => {
    if (!commentText.trim()) return
    addComment(post.id, commentText)
    setCommentText("")
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-gray-800">{post.author}</span>
        <span className="text-gray-400">just now</span>
      </div>

      <p className="mt-2 text-gray-700">{post.content}</p>

      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={() => togglePostLike(post.id)}
          className={`text-sm px-3 py-1 rounded-md transition
            ${post.liked ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:bg-gray-100"}`}
        >
          👍 {post.likes}
        </button>
      </div>

      <div className="mt-4">
        <textarea
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          rows="2"
          className="w-full border border-gray-200 rounded-lg p-2 text-sm"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={submitComment}
            className="bg-gray-900 text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-800"
          >
            Comment
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {post.comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            postId={post.id}
            addComment={addComment}
            toggleCommentLike={toggleCommentLike}
          />
        ))}
      </div>
    </div>
  )
}
