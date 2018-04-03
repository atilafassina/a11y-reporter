FROM alekzonder/puppeteer:latest

COPY package.json /app
WORKDIR /app
RUN npm install
COPY src /app/src

# copy project
ADD . /app

EXPOSE 3000

CMD ["npm", "start"]
