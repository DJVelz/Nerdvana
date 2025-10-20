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


    const addToWishlist = (itemId) => {

        let wishlistData = structuredClone(wishlistItems);
        wishlistData[itemId] = true
        setWishlistItems(wishlistData);
    }

    const removeFromWishlist = (itemId) => {
        let wishlistData = structuredClone(wishlistItems);
        delete wishlistData[itemId];
        setWishlistItems(wishlistData);
    }

    const isInWishlist = (itemId) => {
        return !!wishlistItems[itemId];
    }

    const getWishlistProducts = () => {
    return products.filter((product) => wishlistItems[product._id]);
    };    

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
    }

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