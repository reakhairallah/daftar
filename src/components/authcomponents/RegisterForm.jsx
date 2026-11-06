import { use, useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
    const [fullname,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [major,setMajor]=useState('');

    const[nameError,setErrorName]=useState('');
    const [emailError, setErrorEmail]=useState('');
    const [passwordError,setErrorPassword]=useState('');
    const[majorError,setErrorMajor]=useState('');


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
        if(!major){
            setErrorMajor('Major can not be empty');
        }
        console.log(email, password.length);
    };


    return (
        <div className="w-full max-w-md rounded-card border border-line bg-surface">
            <div className="border-b border-line px-7 py-5">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Make an account</h1>
                <p className="mt-1 text-sm text-muted">Your university address. One account, one review per course.</p>
            </div>
            <form className="space-y-5 px-7 py-6" onSubmit={handleSubmit}>
                
                <div className="flex flex-col gap-1.5">

                     <div className="field">
                        <label htmlFor="fullName" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">Full Name</label>
                        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                            id="fullName" type="text"
                            placeholder="Rea Khairallah"  
                            required
                            aria-invalid={nameError ? 'true' : 'false'}
                            aria-describedby={nameError ? 'name-error' : undefined}
                            value={fullname}
                            onChange={e => {setName(e.target.value); setErrorName('')}}
                        />
                        {nameError && <div className="mx-auto max-w-md rounded border-l-4 border-red-600 bg-red-50 px-5 py-4"><p id="name-error" className="error" role="alert">{nameError}</p></div>}
                    </div>

                    
                    <div className="field">
                        <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">University Email</label>
                        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                            id="email" type="email" autoComplete="email" 
                            required
                            aria-invalid={emailError ? 'true' : 'false'}
                            aria-describedby={emailError ? 'email-error' : undefined}
                            value={email}
                            onChange={e => {setEmail(e.target.value), setErrorEmail('') }}
                        />
                        <p className="text-xs text-muted">Must end in @lau.edu</p>
                        {emailError && <div className="mx-auto max-w-md rounded border-l-4 border-red-600 bg-red-50 px-5 py-4"><p id="email-error" className="text-sm font-semibold text-red-900" role="alert">{emailError}</p></div>}
                    </div>

                     <div className="field">
                        <label htmlFor="major" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">Major</label>
                        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                            id="major" type="text"  
                            required
                            aria-invalid={majorError ? 'true' : 'false'}
                            aria-describedby={majorError ? 'major-error' : undefined}
                            value={major}
                            onChange={e => {setMajor(e.target.value); setErrorMajor('')}}
                        />
                        {majorError && <div className="mx-auto max-w-md rounded border-l-4 border-red-600 bg-red-50 px-5 py-4"><p id="major-error" className="text-sm font-semibold text-red-900" role="alert">{majorError}</p></div>}
                    </div>


                    <div className="field">
                        <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">Password</label>
                        <input className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-100"
                            id="password" type="password" autoComplete="new-password" 
                            required
                            aria-invalid={passwordError ? 'true' : 'false'}
                            aria-describedby={passwordError ? 'password-error' : undefined}
                            value={password}
                            onChange={e => {setPassword(e.target.value); setErrorPassword('')}}
                        />
                        <p className="text-xs text-muted">At least 8 characters.</p>
                        {passwordError && <div className="mx-auto max-w-md rounded border-l-4 border-red-600 bg-red-50 px-5 py-4"><p id="password-error" className="text-sm font-semibold text-red-900" role="alert">{passwordError}</p></div>}
                    </div>

                   
                </div>


                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-brand-700 text-paper hover:bg-brand-800 focus-visible:outline-brand-700 w-full">Create account</button>

                <p className="text-center text-xs text-muted">Already have one? <Link to="/signin" className="font-semibold text-brand-700 underline decoration-accent-400 decoration-2 underline-offset-4">Sign in</Link></p>

            </form>
        </div>
    );
}