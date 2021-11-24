FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV API_PORT=3000
ENV TOKEN_KEY=vdhjpazqit

EXPOSE 3000

CMD ["npm", "start"]