# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Firebase CLI
RUN npm install -g firebase-tools

# Install Hugo
# The following commands fetch the latest version of Hugo, install it, and clean up
RUN wget -q -O hugo.deb https://github.com/gohugoio/hugo/releases/download/$(wget -q -O - https://api.github.com/repos/gohugoio/hugo/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')/hugo_extended_$(wget -q -O - https://api.github.com/repos/gohugoio/hugo/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')_Linux-64bit.deb && \
    dpkg -i hugo.deb && \
    rm -f hugo.deb

# Copy your project files into the container
COPY . .

# Expose ports for Hugo and Firebase (adjust as necessary)
EXPOSE 1313 5000

# (Optional) Define default command to run your application
# For example, starting a Hugo server
# CMD ["hugo", "server", "-D", "--bind", "0.0.0.0"]
