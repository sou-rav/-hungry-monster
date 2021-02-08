const errorMessage = document.getElementById('error-message');
const fullBody = document.getElementById('container');

// display meals

const searchMeals = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);
        })
};
const displayMeals = meals => {
    const foodDisplay = document.getElementById('meals');
    foodDisplay.innerHTML = '';
    if (meals !== null) {
        meals.map(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meals';
            const mealInfo = `
            <div onclick="displayFoodDetails('${meal.idMeal}')" class="meal-div">
                <img class="meal-img" src="${meal.strMealThumb}" alt="">
                <h4 class="meal-name">${meal.strMeal}</h4>
            </div>
            `
            mealDiv.innerHTML = mealInfo;
            foodDisplay.appendChild(mealDiv);
            errorMessage.style.display = 'none';
        })
    }
    else {
        errorMessage.style.display = 'block';
    }
};

// display Ingredients 

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
            const li = document.createElement("p");
            li.innerHTML = `${ingredientAmount} ${ingredientItem}`;
            ingredientList.appendChild(li);
            console.log(ingredientItem);
        }
    }
};

//close pop-up 

fullBody.addEventListener('click', closeFunction)
function closeFunction() {
    ingredients.style.display = 'none'
}

//Back To Top Button

const mybutton = document.getElementById("myBtn");
window.onscroll = function () {
    scrollFunction()
};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}





