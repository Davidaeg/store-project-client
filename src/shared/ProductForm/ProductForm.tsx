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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Update the form data state with the sanitized value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const stockInt: number = Number(formData.stock) || 0;
    const priceInt: number = Number(formData.price) || 0;
    formData.priceWithIva = parseFloat((priceInt * 1.13).toFixed(2));

    const newProduct: CreateProduct = {
      name: formData.name,
      image: formData.image,
      stock: stockInt,
      price: priceInt,
      priceWithIva: formData.priceWithIva,
      location: formData.location
    };

    console.log(newProduct);
    createProduct(newProduct)
      .then(() => {
        console.log('Creating a product');
        console.log('hola hol');
      })
      .catch((error) => console.error('Error creating product:', error));
  };

  return (
    <div className="justify-content-center">
      <form onSubmit={onSubmit} action="" className="justify-content-center">
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
          <small id="name">Enter image name.</small>
        </div>

        <div className="card flex">
          <InputText
            className="p-inputtext-lg"
            placeholder="Image"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="card flex">
          <small id="image">Enter image name.</small>
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
