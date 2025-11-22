'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const router = useRouter();
  const currency = process.env.NEXT_PUBLIC_CURRENCY;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [isSeller, setIsSeller] = useState(true);

  // Restore session
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (!error) setProducts(data || []);
  };

  // Wishlist helpers
  const fetchWishlist = async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("wishlist")
      .select("id, product_id")
      .eq("user_id", userId);
    if (!error && data) {
      const map = {};
      data.forEach((item) => map[item.product_id] = item.id);
      setWishlistItems(map);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      toast.error("Please log in first.");
      router.push("/user");
      return;
    }
    const { data, error } = await supabase
      .from("wishlist")
      .insert([{ user_id: user.id, product_id }])
      .select();

    if (!error && data?.length) {
      setWishlistItems((prev) => ({ ...prev, [productId]: data[0].id }));
      toast.success("Added to wishlist!");
    }
  };

  const removeFromWishlist = async (productId) => {
    const id = wishlistItems[productId];
    if (!id) return;
    const { error } = await supabase.from("wishlist").delete().eq("id", id);
    if (!error) {
      setWishlistItems((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
      toast.success("Removed from wishlist");
    }
  };

  const isInWishlist = (productId) => !!wishlistItems[productId];
  const getWishlistProducts = () => products.filter((p) => wishlistItems[p.id]);

  // Cart helpers
  const addToCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateCartQuantity = (id, qty) => {
    setCartItems((prev) => {
      const copy = { ...prev };
      if (qty <= 0) delete copy[id];
      else copy[id] = qty;
      return copy;
    });
  };

  const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);
  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => String(p.id) === String(id));
      return item ? total + item.offerPrice * qty : total;
    }, 0);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setWishlistItems({});
    setCartItems({});
    router.push("/user");
    toast.success("Logged out");
  };

  // Initial fetch
  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { if (user?.id) fetchWishlist(user.id); }, [user]);

  if (loading) return null; // don't render until session is ready

  return (
    <AppContext.Provider
      value={{
        currency,
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
        router,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
