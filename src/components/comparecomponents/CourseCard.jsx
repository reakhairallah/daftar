import { useState } from "react";
import { Link } from "react-router-dom";

export default function courseCard(){
    return (
        <div className="rounded-card border border-line bg-surface p-5">
            <p className="font-display font-semibold tabular-nums tracking-tight text-xs text-brand-700">CSC443</p>
            <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">Web Programming</h3>
        </div>
    );
}