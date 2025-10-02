import { useState } from 'react';
import TextField from './components/TextField';
import PasswordField from './components/PasswordField';
import SubmitButton from './components/SubmitButton';
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

            <div className="flex items-center justify-end w-full">
                <a href="#" className="text-sm text-red-600 hover:underline">Forgot password?</a>
            </div>

            <SubmitButton text="Sign in" loading={loading} />

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
            </div>
        </form>
    );
}
