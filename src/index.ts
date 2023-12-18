import app from './app';
import dotenv from 'dotenv';

dotenv.config({ path: './src/config/.env' });

const port = process.env.PORT;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
