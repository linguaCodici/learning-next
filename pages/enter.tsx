import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

export default function EnterPage(props) {
    const {user, username} = useContext(UserContext);
    console.log(`user exists? : ${user ? true : false}`);
    console.log(`username exists? : ${username ? true : false}`);

    return (
        <main>
            {user ? 
                (!username ? <UsernameForm /> : <SignOutButton />)
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton() {
    // const signInWithGoogle = () => { }
    const provider = new GoogleAuthProvider();
    
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then(
                (user) => console.log(user)
            )
            .catch(
                (error) => console.error(error)
            );
    };

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <img src={'/google.png'} /> Sign in with Google
        </button>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {
    return null;
}