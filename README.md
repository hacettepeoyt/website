# Hacettepe Özgür Yazılım Topluluğu Websitesi

This project has been archived, and there won't be further development in the future, unless Node.js decides not to be *crappy*.
You can see our new website, written in Django, from [here](https://github.com/hacettepeoyt/oyt-website)

## Build
0. Install [Node.js](https://nodejs.org/en/) and make sure [Node Package Manager (npm)](https://www.npmjs.com/) is also installed into your machine.
1. Install dependencies with `npm install`. If you are in production, use `npm install --production`.
2. Create `.env` file in the root.
    ```
    NODE_LOCAL_PORT=3000
    DB_URL=mongodb://127.0.0.1:27017/oyt-website
    ```
3. Run it with `npm start`.

### Seed
0. Make sure your machine has MongoDB installed.
1. Make sure MongoDB is currently working in your machine with `sudo systemctl status mongod`.
2. Seed your local database with `npm run seed`.
