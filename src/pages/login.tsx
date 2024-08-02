// In order to sign in with google using the button we have to import some stuff from the config  file we created we import the auth and provider variable/function
// And import a method that allows us to sign in from firebase

import { Auth, Provider } from "../config/firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom"; // we want users to be redirected when they tap on login so we create a custom hook called useNavigate

// then we export const login for redirection of users 

export const Login = () => {

    const navigation = useNavigate();
    
    const signInWithGoogle = async() => { // The signInWithGoogle will return a promise so we use async await because its gonna need to get data from firebase
        const result = await signInWithPopup(Auth, Provider); // use the signInWithPopup and pass the auth and provider as argument
        console.log(result);
        navigation("/"); // Takes user to the homePage for login 
    };

    return (
        <div>
            <p>Sign in with google</p>
            <button onClick={signInWithGoogle}>Sign in with google</button>
        </div>
    ); 
        
}