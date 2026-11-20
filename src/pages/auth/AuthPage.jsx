import { useState } from "react";
import SignInForm from "../../components/authcomponents/SignInForm";
import RegisterForm from "../../components/authcomponents/RegisterForm";


export default function AuthPage({mode}) {
    const [showSignin,setShowSignIn]=useState(false);

    return (
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-md lg:pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">What The Course Is Actually Like</p>
                <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-ink">One person,<br />one review.</h1>
            </div>
            { mode==='signin'? <SignInForm/> : <RegisterForm/>

            }
        </div>  
        
    );

}