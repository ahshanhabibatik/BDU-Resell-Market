import React, { useEffect, useState, createContext } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/firebase.config";

// Create AuthContext
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    // Create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign out user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user; // Get the user information
            console.log("Google login successful:", user);
            return {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            }; // Return a more structured user object
        } catch (error) {
            console.error("Google login failed:", error);
            throw error; // Propagate error to handle in the component
        } finally {
            setLoading(false);
        }
    };

    // OnAuthStateChanged listener to set user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            return unsubscribe();
        };
    }, []);

    // Auth context value
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle // Add the Google sign-in method here
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
