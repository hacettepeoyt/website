# Hacettepe Özgür Yazılım Topluluğu Websitesi

## Build
0. Install [Node.js](https://nodejs.org/en/) and make sure [Node Package Manager (npm)](https://www.npmjs.com/) is also installed into your machine.
1. Install dependencies with `npm install`. If you are in production, use `npm install --production`.
2. Create `.env` file in the root.
3. Fill the variables from Signal group chat.
4. Run it with `npm start`.

### Seed
0. Make sure your machine has MongoDB installed.
1. Make sure MongoDB is currently working in your machine with `sudo systemctl status mongod`.
2. Seed your local database with `npm run seed`.
