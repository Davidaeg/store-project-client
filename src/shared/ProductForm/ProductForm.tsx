import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useCreateProduct } from '../datasources/products/products-api/useCreateProduct.hook';
import {
  CreateProduct,
  Location
} from '../datasources/products/products.types';

export const ProductForm = () => {
  const { createProduct } = useCreateProduct();

  const [formData, setFormData] = useState<CreateProduct>({
    name: '',
    image: '',
    stock: 0,
    price: 0,
    priceWithIva: 0,
    location: Location.Shelf1
  });
  const [file, setFile] = useState<File | undefined>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  function getImageName(filePath: string): string {
    const lastIndex = filePath.lastIndexOf('\\');

    const imageName = filePath.substring(lastIndex + 1);

    return imageName;
  }

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const stockInt: number = Number(formData.stock) || 0;
    const priceInt: number = Number(formData.price) || 0;
    formData.priceWithIva = parseFloat((priceInt * 1.13).toFixed(2));

    const newProduct: CreateProduct = {
      name: formData.name,
      image: getImageName(e.target.image.value),
      stock: stockInt,
      price: priceInt,
      priceWithIva: formData.priceWithIva,
      location: formData.location
    };

    createProduct(newProduct, file)
      .then(() => {
        console.log('Product Created');
      })
      .catch((error) => console.error('Error creating product:', error));
  };

  return (
    <div className="justify-content-center">
      <form
        onSubmit={onSubmit}
        action="post"
        className="justify-content-center"
      >
        <div className="card flex">
          <InputText
            className="p-inputtext-lg"
            keyfilter="alphanum"
            placeholder="Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="card flex">
          <small id="name">Enter product name.</small>
        </div>

        <div className="card flex">
          <input type="file" name="image" onChange={handleFile} />
        </div>
        <div className="card flex">
          <small id="image">Enter image file.</small>
        </div>

        <div className="card flex">
          <InputText
            className="p-inputtext-lg"
            name="stock"
            placeholder="Stock"
            id="stock"
            keyfilter="int"
            value={formData.stock.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="card flex">
          <small id="stock">Enter the current stock.</small>
        </div>

        <div className="card flex">
          <InputText
            className="p-inputtext-lg"
            name="price"
            placeholder="Price"
            keyfilter="num"
            value={formData.price.toString()}
            onChange={handleChange}
          />
        </div>
        <div className="card flex">
          <small id="price">Enter the price.</small>
        </div>

        <div className="card flex">
          <InputText
            className="p-inputtext-lg"
            placeholder="Location"
            name="location"
            id="shelf"
            value={formData.location}
            onChange={handleChange}
          />
          `
        </div>
        <div className="card flex">
          <small id="shelf">Enter the location.</small>
        </div>

        <div className="card flex">
          <Button label="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};
