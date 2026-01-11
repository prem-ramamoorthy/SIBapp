import { useState } from "react";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";
import Alert from "./components/Alert";
import { validateEmail, validatePassword } from "./utils/validators";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { id, value } = e.target;
    setValues((v) => ({ ...v, [id]: value }));
    setErrors((e) => ({ ...e, [id]: "" }));
  };

  const validate = () => {
    const emailErr = validateEmail(values.email);
    const passErr = validatePassword(values.password);
    setErrors({ email: emailErr, password: passErr });
    return !emailErr && !passErr;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");
    if (!validate()) return;

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user_id = userCredential.user.uid;
      const idToken = await userCredential.user.getIdToken(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/auth/sessionLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken, user_id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      console.log("Login successful", data);
      if (user_id && data.isadmin === true) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      return;
    } catch (err) {
      console.error(err);
      setGlobalError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 text-gray-900 dark:text-gray-100"
      role="form"
      aria-describedby={globalError ? "form-alert" : undefined}
    >
      {globalError && <Alert tone="error" message={globalError} id="form-alert" />}

      <TextField
        id="email"
        label="Email address"
        type="email"
        placeholder="name@example.com"
        value={values.email}
        onChange={onChange}
        error={errors.email}
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        inputMode="email"
        className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
      />

      <PasswordField
        id="password"
        label="Password"
        value={values.password}
        onChange={onChange}
        error={errors.password}
        autoComplete="current-password"
        className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
      />

      <div className="flex items-center justify-end w-full">
        <a href="/reset-password" className="text-sm text-red-600 hover:underline dark:text-red-400">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-md bg-yellow-500 px-4 py-2 text-gray-900 dark:text-gray-900 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-60"
      >
        {loading ? "Please wait…" : "Sign in"}
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
      </div>
    </form>
  );
}
