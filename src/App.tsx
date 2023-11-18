// import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

type Product = {
    id: string;
    url: string;
    price: number;
    data: string;
    dataType: string;
    createdAt: Date;
    updatedAt: Date;
}
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = (await axios.get('http://localhost:3213/api/products')).data;

      console.log('products', products);
      setProducts(products);
    }

    fetchData();
  },[])


  return (
    <>
      <div className='w-full grid grid-cols-3 gap-4'>
        {products?.map((data) =>  {

          const metadata = JSON.parse(data.data);
          return (
          <div key={data.url}>
            <h1>{metadata.name}</h1>
            <img src={metadata.image} alt={metadata.name} />
            <p>{metadata.currency}{data.price}</p>
          </div>
        )
        }
        )}

      </div>
    </>
  )
}

export default App
