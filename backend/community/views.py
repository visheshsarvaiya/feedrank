from django.db.models import Count, Q
from django.utils.timezone import now, timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Post, Like
from .serializers import PostSerializer


@api_view(["GET", "POST"])
def feed(request):
    if request.method == "POST":
        user = User.objects.first()
        if not user:
            return Response(
                {"error": "No users exist. Create a superuser first."},
                status=400
            )

        text = request.data.get("text", "").strip()
        if text:
            Post.objects.create(author=user, text=text)

    posts = (
        Post.objects
        .annotate(likes=Count("like"))
        .prefetch_related("comments__children")
        .order_by("-created_at")
    )

    return Response(PostSerializer(posts, many=True).data)


@api_view(["POST"])
def like_post(request, post_id):
    user = User.objects.first()
    if not user:
        return Response(
            {"error": "No users exist. Create a superuser first."},
            status=400
        )

    Like.objects.get_or_create(user=user, post_id=post_id)
    return Response({"ok": True})


@api_view(["GET"])
def leaderboard(request):
    since = now() - timedelta(hours=24)

    users = (
        User.objects
        .annotate(
            karma=
            Count("like", filter=Q(
                like__post__isnull=False,
                like__created_at__gte=since
            )) * 5
            +
            Count("like", filter=Q(
                like__comment__isnull=False,
                like__created_at__gte=since
            ))
        )
        .order_by("-karma")[:5]
    )

    return Response(
        [{"user": u.username, "karma": u.karma} for u in users]
    )
