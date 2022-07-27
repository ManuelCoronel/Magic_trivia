
from rest_framework import serializers

class correct_answer_serializer(serializers.Serializer):
    answer_selected =serializers.ListField(child=serializers.CharField(),required=True)