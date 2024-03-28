import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  collection: string;
  price: string;
  quantity: number;
  image: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const useCartContext = create<CartStore>()(
  persist(
    (set) => {
      return {
        cart: [],
        addToCart: (item) => {
          set((state) => {
            const index = state.cart.findIndex((i) => i.id === item.id);
            if (index === -1) {
              return { cart: [...state.cart, item] };
            }
            const newCart = [...state.cart];
            newCart[index].quantity += item.quantity;
            return { cart: newCart };
          });
        },
        removeFromCart: (id) => {
          set((state) => {
            const newCart = state.cart.filter((item) => item.id !== id);
            return { cart: newCart };
          });
        },
        updateQuantity: (id, quantity) => {
          set((state) => {
            const newCart = state.cart.map((item) => {
              if (item.id === id) {
                return { ...item, quantity };
              }
              return item;
            });
            return { cart: newCart };
          });
        },
      };
    },
    {
      name: "cart-storage",
    }
  )
);