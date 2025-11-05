'use client';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  // State
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [isSeller, setIsSeller] = useState(true);

  // ✅ AUTH HANDLING ---------------------------------------------------
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

  useEffect(() => {
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      setUserData(data.user);
    } else {
      setUserData(null);
    }
  };

  getUser();

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      setUserData(session.user);
    } else {
      setUserData(null);
    }
  });

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

  // ✅ FETCH PRODUCTS --------------------------------------------------
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

  // ✅ WISHLIST --------------------------------------------------------
  const fetchWishlist = async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("wishlist")
      .select("id, product_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist:", error);
      return;
    }

    const wishlistMap = {};
    data.forEach((item) => {
      wishlistMap[item.product_id] = item.id;
    });

    setWishlistItems(wishlistMap);
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("wishlist")
      .insert([{ user_id: user.id, product_id: productId }])
      .select();

    if (error) {
      console.error("Error adding to wishlist:", error);
    } else {
      setWishlistItems((prev) => ({
        ...prev,
        [productId]: data[0].id,
      }));
    }
  };

  const removeFromWishlist = async (productId) => {
    const wishlistRowId = wishlistItems[productId];
    if (!wishlistRowId) return;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", wishlistRowId);

    if (error) console.error("Error removing from wishlist:", error);
    else {
      setWishlistItems((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };

  const isInWishlist = (id) => !!wishlistItems[id];
  const getWishlistProducts = () => products.filter((p) => wishlistItems[p.id]);

  // ✅ CART ------------------------------------------------------------
  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const updateCartQuantity = (id, qty) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (qty === 0) delete updated[id];
      else updated[id] = qty;
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

  // ✅ INIT ------------------------------------------------------------
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) fetchWishlist(user.id);
  }, [user]);

  // ✅ LOGOUT ----------------------------------------------------------
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  // ✅ VALUE -----------------------------------------------------------
  const value = {
    currency,
    router,
    user,
    isSeller,
    setIsSeller,
    products,
    fetchProducts,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistProducts,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
