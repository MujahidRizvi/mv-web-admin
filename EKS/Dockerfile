FROM node:16.15-alpine
RUN npm set strict-ssl false
#RUN npm update

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]
# RUN npm install -g npm@8.15.1

#RUN npm install next react react-dom --force
#RUN npm i next
RUN yarn add next@latest

COPY . .

EXPOSE 3000

CMD yarn dev
