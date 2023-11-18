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
      const products = (await axios.get('http://localhost:3213/api/products?price_lte=100')).data;

      console.log('products', products);
      setProducts(products);
    }

    fetchData();
  },[])


  return (
    <>
      <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-8'>
        {products?.map((data) =>  {

          const metadata = JSON.parse(data.data);
          return (
          <div key={data.url} className='border-slate-300 bg-slate-600 border-2 p-4 flex flex-col gap-2'>
            <h1 className='text-4xl font-bold self-center'>{metadata.name}</h1>
            <img src={metadata.image} alt={metadata.name} />
            <p className='bg-slate-300 text-black p-2 inline-block rounded-lg self-start font-bold text-xl tracking-wide'>{metadata.currency}{data.price}</p>
          </div>
        )
        }
        )}

      </div>
    </>
  )
}

export default App
