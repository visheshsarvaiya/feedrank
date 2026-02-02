from django.urls import path
from .views import feed, leaderboard, like_post

urlpatterns = [
    path("feed/", feed),
    path("posts/<int:post_id>/like/", like_post),
    path("leaderboard/", leaderboard),
]
