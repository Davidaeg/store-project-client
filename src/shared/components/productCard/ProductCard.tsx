import { Button } from 'primereact/button';
import { Product } from '../../datasources/products/products.types';
import '../../../modules/home/components/carrousel/Carrousel.styles.css';
import 'primereact/resources/themes/saga-blue/theme.css';

import { AuthenticationContext } from '../../../modules/auth/Authentication.context';
import { useContext } from 'react';
import { UserType } from '../../datasources/user/user.types';
import { useShoppingCart } from '../../../context/shoppingCartContext';

export const ProductCard = (product: Product) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, getItemColor } = useShoppingCart();
  const { user } = useContext(AuthenticationContext);
  const quantity = getItemQuantity(product.productId);
  
  const colors = getItemColor(product.productId);

  console.log("PRODUCT ID:",product.productId," colors: ",  colors);

  return (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 product-card">
      <div>
        <img
          src={`${product.image}`}
          alt={product.name}
          className="w-4 h-4 shadow-4 "
        />
      </div>

      <div className="color-circles">
        {colors && colors.map((color, index) => (
          <div key={index} style={{ backgroundColor: color.color, width: '20px', height: '20px', borderRadius: '50%', display: 'inline-block', margin: '5px' }}></div>
        ))}
      </div>

      <div>
        <h4 className="mb-1">{product.name}</h4>
        <h6 className="mt-0 mb-1">₡{product.price}</h6>
        {user?.userType === UserType.GUEST ? null : (
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                style={{ background: '#fba855', border: '#fba855' }}
                icon="pi pi-cart-plus"
                rounded
                label="Añadir al carrito"
                onClick={() =>
                  increaseCartQuantity(product.productId, product.price)
                }
              />
            ) : (
              <div className="d-flex align-content-center justify-content-center">
                <div>{quantity}</div>
                <Button
                  style={{ background: '#fba855', border: '#fba855' }}
                  icon="pi pi-minus"
                  rounded
                  className="mr-1"
                  onClick={() =>
                    decreaseCartQuantity(product.productId, product.price)
                  }
                />
                <Button
                  style={{ background: '#fba855', border: '#fba855' }}
                  icon="pi pi-plus"
                  rounded
                  className="ml-1"
                  onClick={() =>
                    increaseCartQuantity(product.productId, product.price)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};