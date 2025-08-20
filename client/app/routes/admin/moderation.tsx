import { useState } from "react";
import ReviewPendingAdmin from "~/components/Admin/ReviewPendingAdmin";

export default function Moderation() {
  const [searchReview, setSearchReview] = useState("");
  const [refresh] = useState(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchReview(e.target.value);
  };

  return (
    <div className="sm:ml-80 mr-3 ml-3 flex flex-col gap-3 text-black">
      <h1 className="text-3xl">Modération des Avis</h1>
      <p className="text-gray-700 mb-6">
        Modérez les avis clients en attente de validation
      </p>
      <div className="flex justify-between gap-2">
        <div className="flex-1 flex flex-row items-center border rounded-xl border-gray-200 gap-4 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 h-4 w-4"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <form action="" className="text-sm w-full">
            <label htmlFor=""></label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Rechercher un avis..."
              className="w-full"
              onChange={handleSearch}
              value={searchReview}
            />
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ReviewPendingAdmin searchReview={searchReview} refresh={refresh} />
      </div>
    </div>
  );
}
