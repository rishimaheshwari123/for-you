import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleCategoryClick = (name) => {
    navigate(`/category/${name}`);
  };

  return (
    <div className=" text-cyan-600 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl flex justify-center  font-bold mb-8 border-b w-fit mx-auto border-white pb-2">
          Explore Categories
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-600 border-opacity-50"></div>
          </div>
        ) : (
          <>
            <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-6">
              {categories.slice(0, visibleCount).map((cat) => (
                <div
                  key={cat.idCategory}
                  className="cursor-pointer border border-white rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                  onClick={() => handleCategoryClick(cat.strCategory)}
                >
                  <img
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    className="w-full  object-cover grayscale hover:grayscale-0 transition duration-300"
                  />
                  <div className="p-3 text-center font-semibold text-cyan-600">
                    {cat.strCategory}
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < categories.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleLoadMore}
                  className="text-white px-6 py-2  rounded hover:bg-cyan-600 bg-cyan-500  cursor-pointer transition duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
