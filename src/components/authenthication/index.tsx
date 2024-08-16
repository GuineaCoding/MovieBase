import React, { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../../../src/supbase';

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            const session = await supabase.auth.session();
            setSession(session);
            const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
                setSession(session);
            });
            return () => listener.subscription.unsubscribe();
        };
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ session, setSession, supabase }}>
            {children}
        </AuthContext.Provider>
    );
};
