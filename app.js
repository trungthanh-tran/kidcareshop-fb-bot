// ===== MODULES ===============================================================
import express from 'express';
import bodyParser from 'body-parser';
import webhooks from "./routes/webhooks";

const
  appPort = process.env.PORT || 1337,
  app = express().use(bodyParser.json());


app.use(bodyParser.urlencoded({extended: false}));

console.log("Hello world")
app.use('/webhook', webhooks);
/* ----------  Messenger setup  ---------- */


app.listen(appPort, () => {
  console.log('Node app is running on port', appPort); // eslint-disable-line
});
