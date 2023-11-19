import cors from 'cors';
import express from 'express';

import { prisma } from './src/lib/prisma';

const PORT = process.env.PORT || 3213;

const app = express();
app.use(cors());

app.get('/api/products', async (req, res) => {

  const maxPrice = parseInt(req.query.price_lte) ?? 100;
  const sortBy = req.query.sortBy ?? '';
  const sortOrder = req.query.sortOrder;


  const sortByQuery = req.query.sortBy !== '' ? {
    orderBy: {
      [sortBy]: sortOrder
    }
  } : undefined;


  const fetchData = async () => {
      const data = await prisma.scrappedData.findMany({where:{
        price: {
          lte: maxPrice
        }
      },
      ...sortByQuery

    });
      return data;
    }

  return res.json(await fetchData());
})

app.listen(PORT, () => {
  console.log(`Server Listening on: http://localhost:${PORT}` );
});
