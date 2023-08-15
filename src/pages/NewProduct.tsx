import { addNewProduct } from 'api/firebase';
import { uploadImage } from 'api/uploader';
import Button from 'components/ui/Button';
import React, { ChangeEvent, useState } from 'react';

export type Product = {
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
  id?: string;
  image?: string;
};

export default function NewProduct() {
  const [product, setProduct] = useState<Product>({
    title: '',
    price: 0,
    category: '',
    description: '',
    options: '',
  });
  const [file, setFile] = useState<File | null>();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsUploading(true);

      if (!file) return;
      await uploadImage(file).then((url) => {
        addNewProduct(product, url).then(() => {
          setSuccess('성공적으로 제품이 추가되었습니다.');
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        });
      });

      // 제품의 사진을 cloudinary에 업로드 하고 url을 획득
      // firebase에 새로운 제품을 추가함
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {};
  return (
    <section className='w-full text-center'>
      <h2 className='my-4 text-2xl font-bold'>새로운 제품 등록</h2>

      {success && <p className='my-2'> ✅ {success}</p>}
      {file && (
        <img
          className='mx-auto mb-2 w-96'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}

      <form className='flex flex-col px-12 mb-28' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />

        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />

        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />

        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />

        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />

        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />

        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          onClick={handleClick}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
