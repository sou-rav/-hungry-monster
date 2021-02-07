const search = () => {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
    fetch(url)
        .then(res => res.json())
        .then((data) => displayMeals(data));
}


const displayMeals = (foods) => {
    document.getElementById("ingredients").style.display = "none";
    const foodListDiv = document.getElementById("foodListDiv");
    const meals = foods.meals;

    if (meals === null) {
        foodListDiv.innerHTML = "<h3>No matching food found.</h3>";
    } else {
        foodListDiv.innerHTML = "";
        meals.forEach((meal) => {
            const foodDiv = document.createElement("div");
            const foodId = meal.idMeal;

            const foodInfo = `
            <div onclick=displayFoodDetails('${foodId}')>
                <img src="${meal.strMealThumb}" class="food-image"/>
                <h4>${meal.strMeal}</h4>
            </div>
        `;

            foodDiv.innerHTML = foodInfo;
            foodListDiv.appendChild(foodDiv);
        });
    }
};


const displayFoodDetails = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayIngredients(data));
};


const displayIngredients = (food) => {
    document.getElementById("ingredients").style.display = "block";
    const mealImage = document.getElementById("mealImage");
    const mealName = document.getElementById("mealName");
    const ingredientList = document.getElementById("ingredientList");
    mealImage.src = food.meals[0].strMealThumb;
    mealName.innerHTML = food.meals[0].strMeal;
    ingredientList.innerHTML = "";

    for (let i = 1; i < 10; i++) {
        const ingredientItem = food.meals[0][`strIngredient${i}`];
        const ingredientAmount = food.meals[0][`strMeasure${i}`];
        if (ingredientItem) {
            const li = document.createElement("li");
            li.innerHTML = `${ingredientAmount} ${ingredientItem}`;
            ingredientList.appendChild(li);
            console.log(ingredientItem);
        }
    }
};