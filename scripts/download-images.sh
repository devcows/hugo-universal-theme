#!/bin/bash

# Create the blog images directory if it doesn't exist
mkdir -p public/img/blog

# Download images from Unsplash with appropriate licenses
# QA Service image
curl "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80" -o public/img/blog/qa-service.jpg

# Testing Strategy image
curl "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80" -o public/img/blog/testing-strategy.jpg

# Workflow Automation image
curl "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" -o public/img/blog/workflow-automation.jpg

# AI Testing image
curl "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" -o public/img/blog/ai-testing.jpg

# Startup QA image
curl "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" -o public/img/blog/startup-qa.jpg

echo "All blog images have been downloaded successfully!" 