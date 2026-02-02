from rest_framework import serializers
from .models import Post, Comment

class RecursiveCommentSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "text", "children"]

    def get_children(self, obj):
        return RecursiveCommentSerializer(obj.children.all(), many=True).data

class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    likes = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ["id", "text", "likes", "comments"]

    def get_comments(self, obj):
        roots = obj.comments.filter(parent__isnull=True)
        return RecursiveCommentSerializer(roots, many=True).data
