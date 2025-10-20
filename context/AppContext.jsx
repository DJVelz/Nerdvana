'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const [wishlistItems, setWishlistItems] = useState({});

    const fetchProducts = async () => {
        const { data, error } = await supabase.from('products').select('*');
        if (error) console.error('Error fetching products:', error);
        else setProducts(data);
    };

    const fetchWishlist = async (userId) => {
        const {data, error } = await supabase
            .from('wishlist')
            .select(`
                id,
                product_id,
                products(*)
                `)
                .eq('user_id', userId);

            if (error) console.error(error);
            return data;

            const wishlistMap = {};
        data.forEach((item) => {
            wishlistMap[item.product_id] = true;
        });   
        setWishlistItems(wishlistMap);
    };


    const addToWishlist = async (productId) => {
        const { error } = await supabase.from("wishlist").insert([{ user_id: userId, product_id: productId }]);
        if (error) console.error("Error adding to wishlist:", error);
        else fetchWishlist(userId);
    }

    const removeFromWishlist = async (productId) => {
        const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

        if (error) console.error("Error removing from wishlist:", error);
        else fetchWishlist(userId);
    }

    const isInWishlist = (itemId) => {
        return !!wishlistItems[productId];
    }

    const getWishlistProducts = () => {
    return products.filter((product) => wishlistItems[product.id]);
    };    

    const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    };

    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    

    

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        addToWishlist, removeFromWishlist,
        isInWishlist, getWishlistProducts
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}