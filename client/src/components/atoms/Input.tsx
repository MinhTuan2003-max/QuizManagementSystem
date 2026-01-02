import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
                <div className="relative group">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-all
              file:border-0 file:bg-transparent file:text-sm file:font-medium
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              disabled:cursor-not-allowed disabled:opacity-50
              ${leftIcon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs font-medium text-red-500">{error}</p>}
            </div>
        );
    }
);