import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { useState } from 'react';
import useAudio from '../../../../../shared/audio/useAudio.hook';
import { Card } from 'primereact/card';
import Scanner from '../../../../../shared/scanner/Scanner';
import { Product } from '../../../../../shared/datasources/products/products.types';
import { useShoppingCart } from '../../../../../context/shoppingCartContext';
import { CartItem } from '../../../../shopping/components/CartItem';
type ProductItem = Product & { quantity: number };
export const CreateOrder = () => {
  const { currentPoducts } = useShoppingCart();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const { play } = useAudio('/audios/beep.mp3');

  const onDetected = (result: QuaggaJSResultObject) => {
    const code = result.codeResult.code;
    if (!code || Number.isNaN(parseInt(code))) {
      return;
    }
    play();
    const parsedCode = parseInt(code);
    setProducts((prevData) => {
      if (prevData.some((p) => p.productId === parsedCode)) {
        return prevData.map((item) =>
          item.productId === parsedCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log('Detected code:', code);
        const product = currentPoducts.find((p) => p.productId === parsedCode);
        if (!product) {
          return prevData;
        }
        return [...prevData, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div
      title="Crear orden"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%vw',
        margin: 'auto'
      }}
    >
      <div style={{ width: '50%' }}>
        <Scanner onDetected={onDetected} />
      </div>
      <Card style={{ width: '100%' }}>
        {products.map((product) => {
          const item = currentPoducts.find(
            (p) => p.productId === product.productId
          );
          return (
            <CartItem
              key={product.productId}
              product={item!}
              quantity={product.quantity}
            />
          );
        })}
      </Card>
    </div>
  );
};
