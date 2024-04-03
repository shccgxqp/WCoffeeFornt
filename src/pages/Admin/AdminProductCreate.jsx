import useSWR from 'swr';
import { useState } from 'react';
const AdminProductCreate = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    category_id: 1,
    origin_id: 1,
    unit_id: 1,
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [units, setUnits] = useState([]);

  const fetcher = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setCategories(data.data.category);
    setOrigins(data.data.origin);
    setUnits(data.data.unit);
    return data;
  };
  const { data } = useSWR(`${process.env.REACT_APP_API}/api/admin/products/create`, fetcher);
  if (data && data.data) console.log(data.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('weight', product.weight);
      formData.append('description', product.description);
      formData.append('category_id', product.category_id);
      formData.append('origin_id', product.origin_id);
      formData.append('unit_id', product.unit_id);
      formData.append('image', e.target.image.files[0]);
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/products`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      console.log(data);
      window.location.href = '/admin/product/?page=1&limit=8&category=0';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-full flex-col md:w-1/2'>
        <h1 className='mx-auto mb-4 mt-8 text-4xl font-bold'>
          新增商品{' '}
          <button
            className='ml-4 rounded bg-crimson px-4 py-2 leading-7 text-black'
            onClick={() => window.history.back()}>
            back
          </button>
        </h1>
        <form onSubmit={handleSubmit} className='flex w-full flex-col justify-center'>
          <label htmlFor='name' className='mb-1 block'>
            商品名稱*
          </label>
          <input
            id='name'
            name='name'
            placeholder='商品名稱'
            type='text'
            value={product.name}
            className='mb-4 w-full border border-slate-200 p-4'
            onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
          />

          <label htmlFor='price' className='mb-1 block'>
            價格*
          </label>
          <input
            id='price'
            name='price'
            placeholder='價格'
            type='number'
            value={product.price}
            className='mb-4 w-full border border-slate-200 p-4 '
            onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
          />

          <label htmlFor='category' className='mb-1 block'>
            種類*
          </label>
          <select
            name='category'
            id='category'
            className='mb-4 w-full border border-slate-200 p-4'
            value={product.category_id}
            onChange={(e) => setProduct((prev) => ({ ...prev, category_id: e.target.value }))}>
            {data &&
              categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          {product.category_id === '2' || product.category_id === '3' ? (
            <>
              <div className='mb-4 flex flex-col md:flex-row'>
                <div className='mb-2 md:mb-0 md:mr-2 md:w-full'>
                  <label htmlFor='origin' className='mb-1 block'>
                    產地*
                  </label>
                  <select
                    name='origin'
                    id='origin'
                    className='mb-4 w-full border border-slate-200 p-4'
                    value={product.origin_id}
                    onChange={(e) => setProduct((prev) => ({ ...prev, origin_id: e.target.value }))}>
                    {origins &&
                      origins.map((origin) => (
                        <option value={origin.id} key={origin.id}>
                          {origin.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='md:w-full'>
                  <label htmlFor='first_name' className='mb-1 block'>
                    研磨度*
                  </label>
                  <input
                    id='first_name'
                    name='first_name'
                    placeholder='First Name'
                    type='text'
                    className='mb-4 w-full border border-slate-200 p-4'
                    onChange={(e) => setProduct((prev) => ({ ...prev, first_name: e.target.value }))}
                  />
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          <label htmlFor='unit' className='mb-1 block'>
            單位*
          </label>
          <select
            name='unit'
            id='unit'
            className='mb-4 w-full border border-slate-200 p-4'
            value={product.unit_id}
            onChange={(e) => setProduct((prev) => ({ ...prev, unit_id: e.target.value }))}>
            {units &&
              units.map((unit) => (
                <option value={unit.id} key={unit.id}>
                  {unit.name}
                </option>
              ))}
          </select>

          <label htmlFor='weight' className='mb-1 block'>
            重量*
          </label>
          <div className='flex items-center'>
            <img src='' alt='' className='mr-2' />
            <input
              id='weight'
              name='weight'
              placeholder='重量 g'
              type='number'
              className='mb-4 w-full border border-slate-200 p-4'
              value={product.weight}
              onChange={(e) => setProduct((prev) => ({ ...prev, weight: e.target.value }))}
            />
          </div>

          <label htmlFor='' className='mb-1 block'>
            商品敘述*
          </label>
          <input
            name='description'
            id='description'
            className='mb-4 w-full border border-slate-200 p-4'
            placeholder='商品敘述'
            type='text'
            value={product.description}
            onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}
          />

          <label htmlFor='image' className='mb-1 block'>
            商品圖片*
          </label>
          <input
            type='file'
            name='image'
            id='image'
            className='mb-4 w-full border border-slate-200 p-4'
            onChange={(e) => setProduct((prev) => ({ ...prev, image: e.target.files[0] }))}
          />

          <button type='submit' className='mb-4 rounded-lg bg-crimson px-6 py-3 text-xl text-black'>
            新增商品
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductCreate;
