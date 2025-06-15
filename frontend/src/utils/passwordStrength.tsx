import {type JSX} from "react";

type PasswordStrengthProps = {
    strengthCount: number       
}

export default function PasswordStrength({strengthCount}:PasswordStrengthProps): JSX.Element {
    
    return (
            <><h1 className="text-white/60 text-2xl mb-1">Password Strength</h1><div className="flex my-1 gap-2">
            <div className={`w-13 h-1 rounded-xl  ${strengthCount > 0 ? "bg-green-600" : "bg-white/40"}`}></div>
            <div className={`w-13 h-1 rounded-xl  ${strengthCount > 1 ? "bg-green-600" : "bg-white/40"}`}></div>
            <div className={`w-13 h-1 rounded-xl  ${strengthCount > 2 ? "bg-green-600" : "bg-white/40"}`}></div>
            <div className={`w-13 h-1 rounded-xl  ${strengthCount > 3 ? "bg-green-600" : "bg-white/40"}`}></div>
        </div>
        </>
    )
}