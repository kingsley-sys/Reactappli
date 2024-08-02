// install this before creating the form:  npm install react-hook-form yup @hookform/resolvers
// addDoc is a function you call when you want to add a document too your collection in the database
// While the collection function is used to specify which collection we want t add a document to
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {addDoc, collection} from "firebase/firestore" // import this for your firestore since there is add document and collection in our firestore database: the addDoc function and the collection function
import {Auth, db} from "../../config/firebase" // from config file firebase 
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from "react-router-dom";

interface CreateFormData { //since we are using typescript we use the interface and because typescript don't know the schema
    title: string;
    description: string;
}

export const CreateForm = () => { // we are getting the description and the title from the user database i.e firestore database

    const [user] = useAuthState(Auth); //This way you can choose to log in to different account

    const schema = yup.object().shape({
        title: yup.string().required("you must add a title."),
        description: yup.string().required("you must add a description"),
        // we are using the yup library to create a schema for our form
    });
    // pass the kind of data that you are using close to the useForm like this: useForm<CreateFormData>
    // pass the register function
    const {register, handleSubmit, formState:{errors}} = useForm<CreateFormData>({ // using react hook form and passing an object which is the resolve imported at the top
        resolver: yupResolver(schema) // pass the schema argument to resolve both yup and hook form
    })

    const postsRef = collection(db, "posts");
    const navigate = useNavigate();

    const onCreatePost = async (data:CreateFormData) => { //since we are using typescript we use the interface and because typescript don't know the schema
      
        try {
            const newPost = await addDoc(postsRef, { // Add document to firestore by title, description
              title: data.title,
              description: data.description,
              username: user?.displayName, // Add username if available in the firestore
              userId: user?.uid, // Add userId because its used as an object in the firestore
            });
            console.log("Document written with ID:", newPost.id); // Success message
          } catch (error) {
            console.error("Error adding document:", error); // Error handling
          }
          navigate("/"); // Takes you back to homepage after creating a post
        };
    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
          <input placeholder='Title...'{...register("title")}/>
          <p style={{color: "red"}}>{errors.title?.message}</p> {/* For the error message */}
          <textarea placeholder='Description...' {...register("description")}/>
          <p style={{color: "red"}}>{errors.description?.message}</p>
          <input type="submit"/>
        </form>
      );
};
