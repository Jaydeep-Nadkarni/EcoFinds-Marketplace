#!/bin/bash
BASE_URL="http://localhost:5000/api"

echo "🚀 Testing Health Check..."
curl -s http://localhost:5000/health | jq .

echo "📝 Registering a new user..."
REGISTER=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Test1234",
    "firstName": "Test",
    "lastName": "User"
  }')
echo $REGISTER | jq .

TOKEN=$(echo $REGISTER | jq -r '.data.token')

if [ "$TOKEN" = "null" ]; then
  echo "⚠️ Registration may have failed, trying login..."
  LOGIN=$(curl -s -X POST $BASE_URL/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "testuser@example.com",
      "password": "Test1234"
    }')
  echo $LOGIN | jq .
  TOKEN=$(echo $LOGIN | jq -r '.data.token')
fi

echo "🔑 Token: $TOKEN"

echo "🙋 Getting current user (/me)..."
curl -s -X GET $BASE_URL/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq .

echo "📦 Fetching products..."
curl -s $BASE_URL/products | jq .

echo "✅ Done."
