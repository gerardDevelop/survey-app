FROM node:10-alpine 

WORKDIR /app 

COPY package.json package.json 

RUN npm install 

COPY . . 

EXPOSE 8080 

CMD [ "node", "index.js" ] // start server inside container