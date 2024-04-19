import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useCreateProduct } from '../../../../../shared/datasources/products/products-api/useCreateProduct.hook';
import {
  CreateProduct,
  Location,
  locationsOptions
} from '../../../../../shared/datasources/products/products.types';
import { ProductSchema } from '../../../../../shared/schemas/ProductSchema';
import { useModals } from '../../../../../shared/hooks/modals/useModals.hook';
import { FileUploadComponent } from './FileUploadComponent';
import { Card } from 'primereact/card';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { useShoppingCart } from '../../../../../context/shoppingCartContext';

const initialProduct: CreateProduct = {
  name: '',
  image: '',
  stock: 0,
  price: 0,
  priceWithIva: 0,
  location: Location.Estante1
};

export const ProductForm = () => {
  const { showErrorModal, showSuccessModal } = useModals();
  const { updateProducts } = useShoppingCart();
  const { createProduct } = useCreateProduct();
  const [formData, setFormData] = useState<CreateProduct>(initialProduct);
  const [file, setFile] = useState<File>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDropdownChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      location: e.value
    }));
  };

  const handleNumberChange =
    (name: string) =>
    ({ value }: InputNumberChangeEvent) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

  const isSubmitDisabled = () =>
    !formData.name ||
    !formData.stock ||
    !formData.price ||
    !formData.location ||
    !file;

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const newProduct: CreateProduct = {
      ...formData,
      image: file ? file.name : ''
    };

    const result = ProductSchema.safeParse(newProduct);

    if (!result.success) {
      showErrorModal('Error creando el producto:', result.error.message);
      console.error('Error creando el producto:', result.error);
      return;
    }

    if (!file) {
      showErrorModal('Error creando el producto:', 'No image selected');
      console.error('Error creando el producto: imagen no seleccionada');
      return;
    }

    try {
      const result = await createProduct(newProduct, file);
      if (result) {
        updateProducts();
        setFormData(initialProduct);
        setFile(undefined);
        showSuccessModal('Producto creado con exito!');
      }
    } catch (error: any) {
      showErrorModal('Error creando el producto:', error.message);
      console.error('Error creando el producto:', error);
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      priceWithIva: formData.price * 0.13 + formData.price
    }));
  }, [formData.price]);

  return (
    <Card>
      <form
        onSubmit={onSubmit}
        action="post"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <span className="p-float-label">
          <InputText
            type="text"
            className="p-inputtext-lg"
            keyfilter="alphanum"
            placeholder="Name"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Nombre del Producto</label>
        </span>

        <FileUploadComponent setFile={setFile} />

        <span className="p-float-label">
          <InputNumber
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleNumberChange('stock')}
          />
          <label htmlFor="stock">Cantidad</label>
        </span>

        <span className="p-float-label">
          <InputNumber
            name="price"
            id="price"
            value={formData.price}
            onChange={handleNumberChange('price')}
            currency="CRC"
            mode="currency"
          />
          <label htmlFor="stock">Precio</label>
        </span>

        <span className="p-float-label">
          <InputNumber
            name="priceWithIva"
            id="priceWithIva"
            value={formData.priceWithIva}
            currency="CRC"
            mode="currency"
            disabled
          />
          <label htmlFor="stock">Precio con Iva</label>
        </span>

        <Dropdown
          name="shelf"
          id="shelf"
          value={formData.location}
          onChange={handleDropdownChange}
          options={locationsOptions}
          optionLabel="label"
          placeholder="Ubicación"
          className="w-full md:w-14rem"
        />

        <div className="card flex">
          <Button label="Enviar" type="submit" disabled={isSubmitDisabled()} />
        </div>
      </form>
    </Card>
  );
};
