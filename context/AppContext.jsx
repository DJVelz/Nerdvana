'use client';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter();
  
  // For now using a hard-coded test user id:
  const testUserId = "94d08ac6-490c-4bd7-9f16-79850d3e3a85";

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});

  // Fetch products once
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data);
      console.log("Fetched products:", data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch wishlist for test user id
  const fetchWishlist = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', userId);

      if (error) throw error;

      const wishlistMap = {};
      data.forEach((item) => {
        wishlistMap[item.product_id] = true;
      });
      setWishlistItems(wishlistMap);
      console.log("Fetched wishlist:", wishlistMap);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const addToWishlist = async (itemId) => {
    try {
      const productId = String(itemId).trim();
      const { error } = await supabase
        .from("wishlist")
        .insert([{ user_id: testUserId, product_id: productId }]);

      if (error) throw error;

      // refresh wishlist
      await fetchWishlist(testUserId);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const productId = String(itemId).trim();
      console.log("🗑️ Attempting to remove from wishlist:", { userId: testUserId, productId });

      // Optional debugging before delete
      const { data: existing, error: checkError } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", testUserId)
        .eq("product_id", productId);
      console.log("🔍 Wishlist entries matching before delete:", existing, checkError);

      const { data, error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", testUserId)
        .eq("product_id", productId)
        .select(); // return deleted rows

      if (error) throw error;

      if (!data || data.length === 0) {
        console.warn("⚠️ No wishlist item matched the delete query. Check IDs or FK relationships.");
      } else {
        console.log("✅ Removed from wishlist:", data);
      }

      // Update local state
      setWishlistItems(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const isInWishlist = (itemId) => {
    return !!wishlistItems[String(itemId).trim()];
  };

  const getWishlistProducts = () => {
    return products.filter(p => wishlistItems[String(p.id)]);
  };

  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [String(itemId)]: (prev[String(itemId)] || 0) + 1
    }));
    console.log("Cart updated:", cartItems);
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (quantity === 0) {
        delete updated[String(itemId)];
      } else {
        updated[String(itemId)] = quantity;
      }
      return updated;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find(p => String(p.id) === String(id));
      return item ? total + (item.offerPrice * qty) : total;
    }, 0);
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist(testUserId);
  }, []);

  const value = {
    currency,
    router,
    products,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistProducts,
    wishlistItems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
