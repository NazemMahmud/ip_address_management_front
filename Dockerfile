FROM node:16-alpine3.15

WORKDIR /app

RUN chown -R node:node /app

COPY --chown=node:node package.json ./

# To Fix Permissions for Packages
RUN npm config set unsafe-perm true

RUN npm install

COPY --chown=node:node . .

RUN chown -R node /app/node_modules

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
