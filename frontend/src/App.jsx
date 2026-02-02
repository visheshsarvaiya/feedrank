import Feed from "./components/Feed"
import Leaderboard from "./components/Leaderboard"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FeedRank</h1>
          <p className="text-gray-500 mt-1">Community Feedback Platform</p>
        </div>

        <Feed />
        <Leaderboard />

      </div>
    </div>
  )
}
