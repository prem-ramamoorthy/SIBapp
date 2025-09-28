import { Github, Globe } from "lucide-react";

export default function SocialButton({ provider = 'Google', onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={`Continue with ${provider}`}
        >
            {provider=="Google" ? <Globe /> : <Github />}
            Continue with {provider}
        </button>
    );
}
