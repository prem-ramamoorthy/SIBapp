export default function FormHeader({ title, subtitle }) {
    return (
        <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <p className="mt-1 text-sm text-gray-700">{subtitle}</p>
        </header>
    );
}
