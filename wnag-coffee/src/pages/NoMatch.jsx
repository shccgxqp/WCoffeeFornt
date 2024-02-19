import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Page Not Found ಥ_ಥ!</h1>
      <Link to="/">
        <button className="px-4 py-2 bg-crimson text-black leading-7 rounded">
          Go to the home page
        </button>
      </Link>
    </div>
  );
}

export default NoMatch;