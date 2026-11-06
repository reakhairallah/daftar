import { useState } from "react";

export default function SignInForm() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailError, setErrorEmail]=useState('');
    const [passwordError,setErrorPassword]=useState('');


    function handleSubmit(e) {
        e.preventDefault();

        setErrorEmail('');
        setErrorPassword('');
        
        if(!email.endsWith('@lau.edu')){
            setErrorEmail('Use your LAU email , ending with @lau.edu');
            return;
        }
        if(!password){
            setErrorPassword('password required');
            return;
        }
        if(password.length<8){
            setErrorPassword('Password must be more than 8 characters');
            return;
        }
        console.log(email, password.length);
    };


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign in</h1>

            <div className="field">
                <label htmlFor="email">University Email</label>
                <input id="email" type="email" autoComplete="email" 
                    required
                    aria-invalid={emailError ? 'true' : 'false'}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    value={email}
                    onChange={e => {setEmail(e.target.value), setErrorEmail('') }}
                />
                {emailError && <p id="email-error" className="error" role="alert">{emailError}</p>}
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" autoComplete="current-password" 
                    required
                    aria-invalid={passwordError ? 'true' : 'false'}
                    aria-describedby={passwordError ? 'password-error' : undefined}
                    value={password}
                    onChange={e => {setPassword(e.target.value); setErrorPassword('')}}
                />
                {passwordError && <p id="password-error" className="error" role="alert">{passwordError}</p>}
            </div>

            <button type="submit">Sign In</button>

        </form>
    );
}