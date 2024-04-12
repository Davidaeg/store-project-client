import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useGetAllProducts } from '../shared/datasources/products/products-api/useGetAllProducts.hook';
import {
  Product,
  ProductForList
} from '../shared/datasources/products/products.types';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  price: number;
};

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, price: number) => void;
  decreaseCartQuantity: (id: number, price: number) => void;
  getAllProductsForList: () => ProductForList[];
  currentPoducts: Product[];
  cartItems: CartItem[];
};
const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { currentPoducts, getAllProducts } = useGetAllProducts();

  useEffect(() => {
    getAllProducts();
  }, []);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number, price: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1, price }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + price
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number, price: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - price
            };
          } else {
            return item;
          }
        });
      }
    });
  }

  const getAllProductsForList = () =>
    currentPoducts.map((product) => {
      return {
        id: product.productId,
        code: product.productId.toString(),
        name: product.name,
        image: product.image,
        price: product.priceWithIva,
        quantity: product.stock,
        rating: 5,
        inventoryStatus: product.stock > 0 ? 'INSTOCK' : 'OUTOFSTOCK',
        location: product.location
      };
    });

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        getAllProductsForList,
        currentPoducts,
        cartItems
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
