The Tree

Nested comments are modeled using a self-referencing foreign key (parent). All comments are fetched in a single query using prefetch_related. The tree is built in memory, avoiding recursive database calls and eliminating N+1 queries.

The Math

Leaderboard karma is calculated dynamically from PostLike and CommentLike tables using aggregation and a rolling 24-hour time window. No cached or stored daily karma is used.

The AI Audit

AI initially suggested storing a daily_karma field on the User model and incrementing it on likes. This was incorrect because it breaks under concurrency and cannot support rolling 24-hour windows. The fix was to treat likes as immutable events and calculate karma dynamically via aggregation queries.