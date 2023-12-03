FROM node:alpine
MAINTAINER info@canadidandataguy.com

ENV HUGO_VERSION 0.74.3
ENV HUGO_BINARY hugo_${HUGO_VERSION}_Linux-64bit

# install hugo
RUN set -x && \
  apk add --no-cache wget ca-certificates && \
  update-ca-certificates && \
  cd /tmp &&\
  wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz -O hugo.tar.gz && \
  tar xzf hugo.tar.gz && \
  mv hugo /usr/bin/hugo && \
  rm -r * && \
  apk del wget

RUN npm install -g firebase-tools

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["sh", "/entrypoint.sh"]