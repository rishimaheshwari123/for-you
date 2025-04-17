import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchFood = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setResults(data.meals || []);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" text-cyan-600 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food by name..."
            className="w-full px-4 py-2 rounded-md bg-transparent text-cyan-600 border border-cyan-500 placeholder-white outline-none"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white cursor-pointer  px-6 py-2 rounded-md font-semibold hover:bg-cyan-600 transition"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-600 border-opacity-50 border-solid"></div>
          </div>
        ) : (
          results.length > 0 && (
            <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-6">
              {results.map((food) => (
                <div
                  key={food.idMeal}
                  onClick={() => navigate(`/food/${food.idMeal}`)}
                  className="cursor-pointer border border-white rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={food.strMealThumb}
                    alt={food.strMeal}
                    className="w-full  object-cover grayscale hover:grayscale-0 transition"
                  />
                  <div className="p-3 text-center font-semibold">
                    {food.strMeal}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchFood;
