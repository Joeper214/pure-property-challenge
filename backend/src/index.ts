import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/agents', agentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
