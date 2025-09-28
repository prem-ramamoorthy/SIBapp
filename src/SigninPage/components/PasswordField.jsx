import { useState } from 'react';

export default function PasswordField({
    id = 'password',
    label = 'Password',
    value,
    onChange,
    placeholder = '••••••••',
    error,
    autoComplete = 'current-password',
}) {
    const [show, setShow] = useState(false);
    const type = show ? 'text' : 'password';

    return (
        <div className="mb-2">
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute inset-y-0 right-0 px-3 text-sm text-gray-700 hover:text-gray-900"
                    aria-label={show ? 'Hide password' : 'Show password'}
                >
                    {show ? 'Hide' : 'Show'}
                </button>
            </div>
            {error && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
