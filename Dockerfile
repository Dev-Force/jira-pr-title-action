FROM node:10-alpine

# A bunch of `LABEL` fields for GitHub to index
LABEL "com.github.actions.name"="trap-bot"
LABEL "com.github.actions.description"="Force valid Jira issues in PR titles"
LABEL "com.github.actions.icon"="gear"
LABEL "com.github.actions.color"="red"
LABEL "repository"="http://github.com/beatlabs/trap-bot"
LABEL "homepage"="http://github.com/beatlabs/trap-bot"
LABEL "maintainer"="Apostolos Tsaganos <apostolos94@gmail.com>"


COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY . .

ENTRYPOINT ["node","/lib/main.js"]
