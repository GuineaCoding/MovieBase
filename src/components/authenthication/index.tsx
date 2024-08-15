import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {supabase} from '../../../src/supbase'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const session = supabase.auth.session();
        setUser(session?.user ?? null);
        setLoading(false);

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        try {
            setLoading(true);
            const { error, user } = await supabase.auth.signIn({ email, password });
            setUser(user);
            setLoading(false);
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            setUser(null);
            setLoading(false);
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
            setLoading(false);
        }
    };

    const value = {
        user,
        signIn,
        signOut,
        loading
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
