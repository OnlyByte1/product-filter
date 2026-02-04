const products = [
    {
        name: "Phone",
        price: 500,
        category: "electronics",
        inStock: true,

        rating: 4.5
    },
    {
        name: "Laptop",
        price: 1500,
        category: "electronics",
        inStock: true,
        rating: 4.8
    },
    {
        name: "Tablet",
        price: 300,
        category: "electronics",
        inStock: false,
        rating: 4.2
    },
    {
        name: "Headphones",
        price: 200,
        category: "accessories",
        inStock: true,
        rating: 4.0
    },
    {
        name: "Charger",
        price: 50,
        category: "accessories",
        inStock: true,
        rating: 3.5
    }
];

function filterProducts() {
    const maxPrice = Number(document.getElementById("maxPrice").value);
    const category = document.getElementById('category').value
    const minRating = Number(document.getElementById("minRating").value);
    const onlyInStock = document.getElementById("onlyInStock").checked;

    const filtered = [];

    // 1. Фильтрация товаров
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.price > maxPrice) {
            continue;
        }
        if (category !== "all" && product.category !== category) {
            continue;
        }
        if (product.rating < minRating) {
            continue;
        }
        if (onlyInStock && product.inStock === false) {
            continue;
        }

        filtered.push(product);
    }

    // 2. Сортировка товаров по цене (пузырьковая сортировка)
    for (let i = 0; i < filtered.length - 1; i++) {
        for (let j = 0; j < filtered.length - 1 - i; j++) {
            if (filtered[j].price > filtered[j + 1].price) {
                const temp = filtered[j];
                filtered[j] = filtered[j + 1];
                filtered[j + 1] = temp;
            }
        }
    }

    // 3. Вывод карточек товаров
    const result = document.getElementById("result");
    result.innerHTML = "";

    for (let i = 0; i < filtered.length; i++) {

        const product = filtered[i];

        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = product.price + " ₽";

        const category = document.createElement("div");
        category.className = "category";
        category.textContent = product.category;

        const rating = document.createElement("div");
        rating.className = "rating";
        rating.textContent = "Рейтинг: " + product.rating;

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(category);
        card.appendChild(rating);

        result.appendChild(card);
    }
}