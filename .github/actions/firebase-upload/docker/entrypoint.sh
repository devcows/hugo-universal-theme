#!/bin/sh -x

# Show env info
node -v
hugo version
firebase --version

# Use input parameters
FIREBASE_TOKEN=$1
FIREBASE_PROJECT=$2

# Build site
hugo

# Publish to Firebase
firebase use --add "$FIREBASE_PROJECT" production
firebase deploy -m "Commit SHA: $GITHUB_SHA" --token "$FIREBASE_TOKEN" --only hosting --project "$FIREBASE_PROJECT"