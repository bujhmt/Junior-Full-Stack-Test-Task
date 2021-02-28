# JS Full-Stack Challenge

Vacancy test task

## Demo
[Deployed Chat](https://full-stack-genesis-frontend.herokuapp.com)

## Frameworks and languages
Backend: [NestJS](https://nestjs.com/), [Socket.IO](https://socket.io/)

Frontend:  [Vue 2](https://vuejs.org/)

Databases: [MongoDB](https://www.mongodb.com/), [Mongoose ODM](https://mongoosejs.com/)

Languages: [TypeScript](https://www.typescriptlang.org/), [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
## Scripts

Use the [npm](https://www.npmjs.com/get-npm) package manager to run commands:

## How to start?
1) Set up MongoDB
2) Create `.env` files in `frontend` and `backend` folders. Fill it like in `.env.sample`. Be careful, don't forget to put a link to mongo database as the `MONGO_URL` property in `.env`. 
3) Run `npm install` and `npm install --only-dev` in `backend` and `frontend` folder
## Dev
Frontend:
```bash
cd ./frontend
npm run serve
````

Backend:
```bash
cd ./backend
npm run dev
````

## Build
Frontend:
```bash
cd ./frontend
npm run build
npm run start
````

Backend:
```bash
cd ./backend
npm run build
npm run start:prod
````


