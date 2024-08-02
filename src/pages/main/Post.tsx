// we want to get the data as post as props inside this post component
// When ever we need props inside of component in Typescript we use an interface named props

import { addDoc,getDocs, collection, query, deleteDoc, doc  } from "firebase/firestore"; // query function is used to get the amount of likes in the collection
import { where } from "firebase/firestore"; // Import where function
import { Auth, db } from "../../config/firebase";
import {Post as IPost} from "./Main"; // From the interface from main
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost // From the interface from main thats why its exported at the top
}

interface Like {
    likeId: string
    userId: string // to get likes and make sure user only likes ones 
}

export const Post = (props: Props) => { // (props: Props) From the interface 
    const {post} = props; // destructuring props to get post property
    const [user] = useAuthState(Auth);
// To hold the like array use Like[]
    const [likes, setLikes] = useState<Like[] | null>(null) // A state to represent the amount of likes so that when we like the amount of likes increase
    
    const likesRef = collection(db, "likes");

    const likeQuery = query(likesRef, where ('postId', '==', post.id)); // Query to get all likes for a specific post

    const likesSnapshot = async() => {
       const data= await getDocs(likeQuery); // Get all likes for a specific post
       setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    };
    
    const addLike = async () => { //since we are using typescript we use the interface and because typescript don't know the schema
      
        try {
            const newLikes = await addDoc(likesRef, { // Add like document to firestore by , description
                userId: user?.uid,
                postId: post.id
            }); 
            // Optimistic rendering
            if (user) {
                setLikes((prev) => 
                prev 
                ? [...prev, {userId: user.uid, likeId: newLikes.id}] 
                : [{userId: user.uid, likeId: newLikes.id}]); // To make it optimistically update i.e the like button quickly updates when user likes
            }
            console.log("Document written with ID:", newLikes.id); // Success message
          } catch (error) {
            console.error("Error adding document:", error); // Error handling
          }
          
    };
        // The Delete part of CRUD operation i.e removeLike so we use the deleteDoc method
        const removeLike = async () => { // use string for likeId
            try {
                const likeToDeleteQuery = query(likesRef, 
                  where ('postId', '==', post.id),
                  where ('userId', '==', user?.uid)); // Query to get all likes for a specific post
                const likeToDeleteData = await getDocs(likeToDeleteQuery)
                const likeId = likeToDeleteData.docs[0].id
                const likeToDelete = (doc(db, "likes", likeId ))
                await deleteDoc(likeToDelete);    
                if (user){
                   setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
                }             
            } catch (error) {
                console.error("Error adding document:", error); // Error handling
            }
        }     
        const hasUserLiked = likes?.find((like) => like.userId === user?.uid) // To Know if a user liked 
        useEffect(() => {
            likesSnapshot(); // When component mounts, fetch data from the database and to call the getPost function
            return () => {
                // cleanup function to stop fetching data when component unmounts
            };
        }, );

    return (
           <div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="description">
                <p> {post.description} </p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={ () => {
                        if(hasUserLiked) {
                            removeLike()
                        } else{
                            addLike();
                        } 
                    }
                    
                }>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} {/* // changes the UI when user likes and dislikes  */}
                </button>
                {likes && <p>Likes: {likes?.length} </p>} {/* we want to display the amount of likes here */}
            </div>
           </div>
    )
}