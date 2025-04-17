import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FoodDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Failed to fetch meal detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMealDetail();
  }, [id]);

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <div className=" text-cyan-600 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-600 border-opacity-50"></div>
          </div>
        ) : (
          meal && (
            <>
              <h1 className="text-4xl font-bold mb-6">{meal.strMeal}</h1>

              <div className="flex flex-col md:flex-row gap-8">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full md:w-1/2 rounded-lg border border-white"
                />

                <div className="flex-1 space-y-4">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {meal.strCategory}
                  </p>
                  <p>
                    <span className="font-semibold">Area:</span> {meal.strArea}
                  </p>

                  <h3 className="text-2xl font-semibold mt-4">Ingredients:</h3>
                  <ul className="list-disc list-inside">
                    {getIngredients().map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  {meal.strYoutube && (
                    <div className="mt-6">
                      <p className="font-semibold">Watch Recipe:</p>
                      <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        {meal.strYoutube}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-2">Instructions:</h3>
                <p className="whitespace-pre-line">{meal.strInstructions}</p>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default FoodDetail;
