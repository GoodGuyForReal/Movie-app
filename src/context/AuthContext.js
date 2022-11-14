import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../FireBase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState({})

    function SignUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            savedShows: []
        })

    }

    function SignIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const Isonline = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
            return () => {
                Isonline();
            }
        })
    }, [])


    function LogOut() {
        return signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ SignUp, LogOut, SignIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {

    return useContext(AuthContext);
}