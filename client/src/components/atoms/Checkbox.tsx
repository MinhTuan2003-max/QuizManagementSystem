import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        ref={ref}
                        className={`
              peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 
              bg-white transition-all checked:bg-blue-600 checked:border-blue-600
              focus:outline-none focus:ring-2 focus:ring-blue-500/20
              ${className}
            `}
                        {...props}
                    />
                    <svg
                        className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                {label && (
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
            {label}
          </span>
                )}
            </label>
        );
    }
);