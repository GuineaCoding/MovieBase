import { createContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../../../src/supbase';

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        setLoading(true);
        const checkSession = async () => {
            const session = await supabase.auth.session();
            setSession(session);
            setLoading(false); 
        };

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            if (!session) {
                setLoading(true);
            } else {
                setLoading(false);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading, setSession, supabase }}>
            {children}
        </AuthContext.Provider>
    );
};
