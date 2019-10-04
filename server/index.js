import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import userRoute from './routes/userRoute';
import articleRoute from './routes/articleRoute';
import swaggerDoc from '../app.json';

dotenv.config();

const app = express();
app.use(bodyParse.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
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
