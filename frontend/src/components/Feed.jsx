import { useState } from "react"
import Post from "./Post"

export default function Feed() {
const [posts, setPosts] = useState([])


  const [text, setText] = useState("")

  const addPost = () => {
    if (!text.trim()) return
    setPosts([
      {
        id: Date.now(),
        author: "You",
        content: text,
        likes: 0,
        liked: false,
        comments: []
      },
      ...posts
    ])
    setText("")
  }

  const togglePostLike = postId => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const addComment = (postId, text, parentId = null) => {
    setPosts(posts.map(post => {
      if (post.id !== postId) return post

      if (!parentId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              author: "You",
              text,
              likes: 0,
              liked: false,
              replies: []
            }
          ]
        }
      }

      return {
        ...post,
        comments: post.comments.map(c =>
          c.id === parentId
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: Date.now(),
                    author: "You",
                    text
                  }
                ]
              }
            : c
        )
      }
    }))
  }

  const toggleCommentLike = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id !== postId) return post

      return {
        ...post,
        comments: post.comments.map(c =>
          c.id === commentId
            ? {
                ...c,
                liked: !c.liked,
                likes: c.liked ? c.likes - 1 : c.likes + 1
              }
            : c
        )
      }
    }))
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Share your feedback with the community..."
          rows="3"
          className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={addPost}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>

      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          addComment={addComment}
          togglePostLike={togglePostLike}
          toggleCommentLike={toggleCommentLike}
        />
      ))}
    </>
  )
}
