FROM public.ecr.aws/bitnami/node:15

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "index.js" ]
