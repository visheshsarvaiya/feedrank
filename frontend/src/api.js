const API = "http://127.0.0.1:8000/api"

export const getFeed = async () => {
  const res = await fetch(`${API}/feed/`)
  return res.json()
}

export const createPost = async text => {
  await fetch(`${API}/feed/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
}

export const likePost = async id => {
  await fetch(`${API}/posts/${id}/like/`, { method: "POST" })
}

export const getLeaderboard = async () => {
  const res = await fetch(`${API}/leaderboard/`)
  return res.json()
}
