import { Panel } from 'primereact/panel';
import {
  Location,
  Product
} from '../../shared/datasources/products/products.types';
import Barcode from 'react-barcode';
import { useState } from 'react';
import { Card } from 'primereact/card';
import Scanner from '../../shared/scanner/Scanner';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import useAudio from '../../shared/audio/useAudio.hook';

const product: Product = {
  productId: 1,
  name: 'product1',
  location: Location.Estante1,
  price: 100,
  image: 'image1',
  priceWithIva: 113,
  stock: 100
};

type ProductItem = { productId: number; quantity: number };

export const TempView = () => {
  const { play } = useAudio('/audios/beep.mp3');
  const [_data, setData] = useState<ProductItem[]>([]);

  const onDetected = (result: QuaggaJSResultObject) => {
    const code = result.codeResult.code;
    if (!code || Number.isNaN(parseInt(code))) {
      return;
    }
    play();
    const parsedCode = parseInt(code);
    setData((prevData) => {
      if (prevData.some((p) => p.productId === parsedCode)) {
        return prevData.map((item) =>
          item.productId === parsedCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log('Detected code:', code);
        return [...prevData, { productId: parsedCode, quantity: 1 }];
      }
    });
  };

  return (
    <Panel header="Temp View">
      <div className="p-d-flex p-jc-center">
        <h1>Temp View</h1>
        <div>
          <h2>Producto</h2>
          <div>
            <p>Producto Id: {product.productId}</p>
            <p>Nombre: {product.name}</p>
            <p>Localización: {product.location}</p>
            <p>Precio: {product.price}</p>
            <p>Imagen: {product.image}</p>
            <p>Price con IVA: {product.priceWithIva}</p>
            <p>Inventario: {product.stock}</p>
          </div>
        </div>
        <Barcode value={product.productId.toString()} />
        <Card>
          <Scanner onDetected={onDetected} />
        </Card>
      </div>
    </Panel>
  );
};
