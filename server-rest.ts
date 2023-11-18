import cors from 'cors';
import express from 'express';

import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 3213;

const app = express();
app.use(cors());

app.get('/api/products', async (req, res) => {

  const fetchData = async () => {
      const prisma = new PrismaClient();
      const data = await prisma.scrappedData.findMany({where:{
        price: {
          lte: 100
        }
      }});
      return data;
    }

  return res.json(await fetchData());
})

app.listen(PORT, () => {
  console.log(`Server Listening on: http://localhost:${PORT}` );
});