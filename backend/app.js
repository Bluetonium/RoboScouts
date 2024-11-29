import express from 'express';
import 'dotenv/config';
import { utils, DBUtils } from './utils/index.js';
import cron from 'node-cron';
import routes from './routes/routes.js';

const PORT = process.env.PORT || 3001;
export const app = express();

app.use(express.json());

app.use(`/api`, routes);

cron.schedule(
  "0 0 * * *",
  async () => {
    DBUtils.addAllBTD();
    DBUtils.addAllCTD();
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});