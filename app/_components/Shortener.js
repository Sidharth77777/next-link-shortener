import ShortenForm from "./Form";

export default function Shortener() {
  return (
    <div className="w-full flex items-center justify-center py-16 px-1">
      <div className="w-full sm:w-3/5 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h2 className="text-center text-[18px] sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Paste & Shorten Your Link 🚀
        </h2>
        <ShortenForm />
      </div>
    </div>
  );
}
