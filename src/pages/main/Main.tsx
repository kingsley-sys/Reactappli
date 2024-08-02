// We want to have a list of post displayed on our homepage and only appear when you are logged in
import {getDocs, collection} from "firebase/firestore" // Used to get the Docs from firestore
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";

interface Post { // An interface to represent what our post will look like
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string
}
export const Main = () => {
    const [postsList, setPostList] = useState<Post[] | null>() // Used to keep track of the data We get null until we get data from firebase
    const postsRef = collection(db, "posts");

    const getPosts = async () => { // Function to get post from our dataBase and make it async because we are getting it from a dataBase
        const data = await getDocs(postsRef) // await the getDocs function above and use postRef to get collection
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]); // This how you get those data from your database and cast Post[]
    };

    useEffect(() => {
        getPosts(); // When component mounts, fetch data from the database and to call the getPost function
        return () => {
            // cleanup function to stop fetching data when component unmounts
        };
    }, []);

    // We should create a separate a component that would represent what a post should look like 
    // We would create a folder called main and move our Main.tsx component inside 
    return <div>{postsList?.map((post) => <Post post={post} />)}</div>; // We want to return a square on our screen showing the title and all details from post
} 

export { Post };
