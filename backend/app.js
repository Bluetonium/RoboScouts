import express from 'express';
import 'dotenv/config';
import { processAPIData } from './services/index.js';
import cron from 'node-cron';
import routes from './routes/routes.js';

const PORT = process.env.PORT || 3001;
export const app = express();

app.use(express.json());

app.use(`/api`, routes);

//update daily
cron.schedule(
  "0 0 * * *",
  async () => {
    processAPIData.addAllBTD();
    processAPIData.addAllCTD();
    processAPIData.addAllDTDER();
  }
);

//update detailed team data general every sunday
cron.schedule(
  "0 0 * * 0",
  async () => {
    processAPIData.addAllDTDG();
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});