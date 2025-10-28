'use client';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  const userId = "94d08ac6-490c-4bd7-9f16-79850d3e3a85"; // temp hardcoded
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});

  // Fetch user
  const fetchUserData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      setUserData(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data);
      console.log("Fetched products:", data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch wishlist
  const fetchWishlist = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", userId);

      if (error) throw error;

      const wishlistMap = {};
      data.forEach((item) => {
        wishlistMap[item.product_id] = true;
      });
      setWishlistItems(wishlistMap);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  // Add to wishlist
  const addToWishlist = async (itemId) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .insert([{ user_id: userId, product_id: itemId }]);
      if (error) throw error;
      await fetchWishlist(userId);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", itemId);
      if (error) throw error;
      await fetchWishlist(userId); // keep sync with Supabase
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const isInWishlist = (itemId) => !!wishlistItems[itemId];

  const getWishlistProducts = () =>
    products.filter((product) => wishlistItems[product.id]);

  // CART HANDLERS
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity === 0) delete updated[itemId];
      else updated[itemId] = quantity;
      return updated;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => String(p.id) === String(id));
      return item ? total + item.offerPrice * qty : total;
    }, 0);

  useEffect(() => {
    fetchUserData(userId);
    fetchProducts();
    fetchWishlist(userId);
  }, []);

  const value = {
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    products,
    fetchProducts,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
