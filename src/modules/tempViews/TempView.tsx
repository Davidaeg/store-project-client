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
  location: Location.Shelf1,
  price: 100,
  image: 'image1',
  priceWithIva: 113,
  stock: 100
};

type ProductItem = { productId: number; quantity: number };

export const TempView = () => {
  const { play } = useAudio('/audios/beep.mp3');
  const [data, setData] = useState<ProductItem[]>([]);

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
          <h2>Product</h2>
          <div>
            <p>Product Id: {product.productId}</p>
            <p>Name: {product.name}</p>
            <p>Location: {product.location}</p>
            <p>Price: {product.price}</p>
            <p>Image: {product.image}</p>
            <p>Price with IVA: {product.priceWithIva}</p>
            <p>Stock: {product.stock}</p>
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
