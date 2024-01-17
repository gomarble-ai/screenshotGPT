FROM ghcr.io/puppeteer/puppeteer:21.7.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir screenshots

RUN chmod 777 screenshots

CMD [ "node" , "index.js" ]