FROM ghcr.io/puppeteer/puppeteer:21.7.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "node" , "index.js" ]
