import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string | number }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
                <select
                    ref={ref}
                    className={`
            flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-red-500' : 'border-slate-300'}
            ${className}
          `}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <p className="text-xs font-medium text-red-500">{error}</p>}
            </div>
        );
    }
);