'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('natal-wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('natal-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        setWishlist(prev => [...prev, product]);
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: number) => {
        return wishlist.some(item => item.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            toggleWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};