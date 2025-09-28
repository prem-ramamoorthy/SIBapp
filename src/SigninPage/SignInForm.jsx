import { useState } from 'react';
import TextField from './components/TextField';
import PasswordField from './components/PasswordField';
import SubmitButton from './components/SubmitButton';
import SocialButton from './components/SocialButton';
import Alert from './components/Alert';
import { validateEmail, validatePassword } from './utils/validators';

export default function SignInForm() {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [globalError, setGlobalError] = useState('');
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { id, value } = e.target;
        setValues((v) => ({ ...v, [id]: value }));
        if (id === 'email') setErrors((e) => ({ ...e, email: '' }));
        if (id === 'password') setErrors((e) => ({ ...e, password: '' }));
    };

    const validate = () => {
        const emailErr = validateEmail(values.email);
        const passErr = validatePassword(values.password);
        setErrors({ email: emailErr, password: passErr });
        return !emailErr && !passErr;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setGlobalError('');
        if (!validate()) return;
        try {
            setLoading(true);
            // Replace with real API call
            await new Promise((r) => setTimeout(r, 800));
            // Simulated failure example:
            //   throw new Error('Invalid credentials');
        } catch (err) {
            console.log(err);
            setGlobalError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-3" role="form" aria-describedby={globalError ? 'form-alert' : undefined}>
            {globalError && <Alert tone="error" message={globalError} id="form-alert" />}

            <TextField
                id="email"
                label="Email address"
                type="email"
                placeholder="name@example.com"
                value={values.email}
                onChange={onChange}
                error={errors.email}
                autoComplete="email"
            />

            <PasswordField
                id="password"
                label="Password"
                value={values.password}
                onChange={onChange}
                error={errors.password}
            />

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400" />
                    Remember me
                </label>
                <a href="#" className="text-sm text-red-600 hover:underline">Forgot password?</a>
            </div>

            <SubmitButton text="Sign in" loading={loading} />

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-600">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <SocialButton provider="Google" onClick={() => { }} />
                <SocialButton provider="GitHub" onClick={() => { }} />
            </div>
        </form>
    );
}
