import AuthLayout from './components/AuthLayout';
import FormHeader from './components/FormHeader';
import SignInForm from './SignInForm';

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto bg-white shadow rounded-lg border border-gray-200">
        <div className="p-6">
          <FormHeader
            title="SIB - Sengundhar in business"
            subtitle="Welcome back! signin to continue"
          />
          <SignInForm />
        </div>
      </div>
    </AuthLayout>
  );
}
