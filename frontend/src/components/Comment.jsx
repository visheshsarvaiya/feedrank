import { useState } from "react"

export default function Comment({ comment, postId, addComment, toggleCommentLike }) {
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")

  const submitReply = () => {
    if (!replyText.trim()) return
    addComment(postId, replyText, comment.id)
    setReplyText("")
    setShowReply(false)
  }

  return (
    <div className="border-l-2 border-gray-200 pl-3">
      <p className="text-sm text-gray-800">
        <span className="font-medium">{comment.author}:</span> {comment.text}
      </p>

      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={() => toggleCommentLike(postId, comment.id)}
          className={`text-xs px-2 py-0.5 rounded transition
            ${comment.liked ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:bg-gray-100"}`}
        >
          👍 {comment.likes}
        </button>

        <button
          onClick={() => setShowReply(!showReply)}
          className="text-xs text-blue-600"
        >
          Reply
        </button>
      </div>

      {showReply && (
        <div className="mt-2">
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows="2"
            placeholder="Write a reply..."
            className="w-full border border-gray-200 rounded-md p-2 text-sm"
          />
          <div className="flex justify-end mt-1">
            <button
              onClick={submitReply}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-3 ml-4 space-y-2">
          {comment.replies.map(reply => (
            <p key={reply.id} className="text-sm text-gray-700">
              <span className="font-medium">{reply.author}:</span> {reply.text}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
