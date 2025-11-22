'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  // ----- STATE -----
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [isSeller, setIsSeller] = useState(true);

  // ----- AUTH -----
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // ----- PRODUCTS -----
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ----- WISHLIST -----
  const fetchWishlist = async (userId) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("id, product_id")
        .eq("user_id", userId);

      if (error) throw error;

      const map = {};
      data?.forEach(item => {
        if (item.product_id != null) map[item.product_id] = item.id;
      });

      setWishlistItems(map);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchWishlist(user.id);
  }, [user]);

  const addToWishlist = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      router.push("/user");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("wishlist")
        .insert([{ user_id: user.id, product_id: productId }])
        .select();

      if (error) throw error;

      setWishlistItems(prev => ({ ...prev, [productId]: data[0].id }));
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;

    const wishlistRowId = wishlistItems[productId];
    if (!wishlistRowId) return;

    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistRowId);

      if (error) throw error;

      setWishlistItems(prev => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const isInWishlist = (id) => !!wishlistItems[id];
  const getWishlistProducts = () => products.filter(p => wishlistItems[p.id]);

  // ----- CART -----
  const addToCart = (id) => {
    setCartItems(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const item = products.find(p => p.id === id);
    toast.success(`${item?.name || "Product"} added to cart!`);
  };

  const updateCartQuantity = (id, qty) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (qty === 0) delete updated[id];
      else updated[id] = qty;
      return updated;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, n) => sum + n, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find(p => String(p.id) === String(id));
      return item ? total + item.offerPrice * qty : total;
    }, 0);

  // ----- LOGOUT -----
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setWishlistItems({});
    router.push("/user");
    toast.success("You've been logged out.");
  };

  // ----- CONTEXT VALUE -----
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
