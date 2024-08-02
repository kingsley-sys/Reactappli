// Use the import { Link } from "react-router-dom"; before using the link tag 

import { Link } from "react-router-dom";
import { Auth } from "../config/firebase"; //To redirect user to the homepage after user login at the login page using the auth variable from the config file 
import { useAuthState } from "react-firebase-hooks/auth"; // To make it update when i click on another Gmail account install react-firebase-hooks in your terminal
import {signOut} from "firebase/auth" // import from firebase library the signOut function

export const NavBar = () => {
    const [user] = useAuthState(Auth); //This way you can choose to log in to different account

    const logOut = async () => {
        await signOut(Auth); //use the signOut function imported from firebase

    }
   
    return (
            <div>
                <Link to="/">Home</Link>
                { !user ? (
                    <Link to="/login">Login</Link> // If user is not logged in do not show the login Nav Button
                    ) : (
                    <Link to="/create-post">Create-Post</Link> // If user is logged in show the create-post Nav Button
                )}
                
                
                <div>
                    {user && ( // If user exist show user else do not show user in the use auth state
                        <>
                        <p> {user?.displayName} </p> {/* To access user information */}
                        <img src={user?.photoURL !== null && user?.photoURL !== undefined ? user?.photoURL : '' } 
                            width={100} height={100} alt={user?.photoURL ? 'User profile picture' : 'Placeholder image'}    
                        />
                        <br/>
                        <button onClick={logOut} >Sign Out</button>
                        </>

                    ) } 
                    
                </div> 
            </div> 
            )
            
    }