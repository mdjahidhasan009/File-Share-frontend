// import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_ENDPOINT;

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen font-serif bg-gray-900 text-white grid place-content-center">
      <div className="">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
