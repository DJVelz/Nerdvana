'use client';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});

  // Auth Handling
  useEffect(() => {
    // Get session on load
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    fetchSession();

    // Listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

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
  const { data, error } = await supabase
    .from("wishlist")
    .select("id, product_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching wishlist:", error);
    return;
  }

  // Map product_id → wishlist row id
  const wishlistMap = {};
  data.forEach((item) => {
    wishlistMap[item.product_id] = item.id;
  });

  setWishlistItems(wishlistMap);
};


  // Add to wishlist
  const addToWishlist = async (productId) => {
  const userId = "94d08ac6-490c-4bd7-9f16-79850d3e3a85";
  const { data, error } = await supabase
    .from("wishlist")
    .insert([{ user_id: userId, product_id: productId }])
    .select();

  if (error) {
    console.error("Error adding to wishlist:", error);
  } else {
    // The inserted row will have an id; update local state
    setWishlistItems((prev) => ({
      ...prev,
      [productId]: data[0].id,
    }));
  }
};

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    const wishlistRowId = wishlistItems[productId];

    if (!wishlistRowId) {
        console.warn("No wishlist row found for product:", productId);
        return;
    }

    const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistRowId);

    if (error) {
        console.error("Error removing from wishlist:", error);
    } else {
        // Update local state immediately
        setWishlistItems((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
        });
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
    //fetchUserData(userId);
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
