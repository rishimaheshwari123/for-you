import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CategoryPage = () => {
  const { name } = useParams();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
        );
        const data = await res.json();
        setFoods(data.meals || []);
      } catch (error) {
        console.error("Failed to fetch foods", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [name]);

  return (
    <div className=" text-cyan-600 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl flex justify-center  font-bold mb-8 border-b w-fit mx-auto border-white pb-2">
          {name} Foods ({foods.length})
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-600 border-opacity-50"></div>
          </div>
        ) : (
          <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-6">
            {foods.map((food) => (
              <div
                onClick={() => navigate(`/food/${food.idMeal}`)}
                key={food.idMeal}
                className="border cursor-pointer border-white rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={food.strMealThumb}
                  alt={food.strMeal}
                  className="  object-cover grayscale hover:grayscale-0 transition duration-300"
                />
                <div className="p-3 text-center font-semibold">
                  {food.strMeal}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
