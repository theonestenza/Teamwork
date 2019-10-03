import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import articleRoute from './routes/articleRoute';

dotenv.config();

const app = express();
app.use(bodyParse.json());
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/', articleRoute);
app.use('/',(req, res) => {
  return res.status(404).send({
    status: 404,
    error: 'Route is not found'
  });
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

export default app;
