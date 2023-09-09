/**
 * Робимо пустий масив в якому будуть збиратися товари (з часом має цей масив формаутвати з localstorage) ++
 * Вішаємо подію кліку на кнопки "Добавити в корзину" ++
 * При кліку відбираємо всю інфомрацію з data атрибутів ++
 * Об'єкт data атрибутів записуємо в масив ++
 * І виводимо список добавлених товарів в корзину ++
 */

// Отримуємо збережену інфо з localStorage та ініціалізуємо масив cartSavedData
const cart = loadCartFromLocalStorage();

// Відбираємо список в якому будуть виведені всі товари (потрібно для кліку)
const productList = document.querySelector('#productList');

// Виводимо масив з новими товарами до елементу #js-cart-added-list
const cartAddedList = document.querySelector('#js-cart-added-list');

// Функція для зберігання масиву cart в локальному сховищі
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функція для завантаження масиву cart з локального сховища
function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');

    if (cartData) {
        return JSON.parse(cartData);
    } else {
        return [];
    }
}

// Функція для виведення товарів з масиву cart в HTML
function displayCartItems() {
    cart.forEach(el => {
        const { thumbnail, title, price } = el;

        cartAddedList.insertAdjacentHTML(
            'beforeend',
            `<div class="cart-added-list__item">
                <button class="cart-added-list__item-btn-delete btn-light">
                    <svg class='icon icon-close'>
                        <use xlink:href='#icon-close'></use>
                    </svg>
                </button>
                <img src=${thumbnail} alt="" class="cart-added-list__item-img">
                <p class="cart-added-list__item-text-hold">
                    <a href="#" class="cart-added-list__item-title-link">Назва товару: ${title}</a>
                    <span class="cart-added-list__item-meta-list">
                    <span class="cart-added-list__item-meta">Ціна: ${price} грн</span>
                    </span>
                </p>
                <input type="text" class="cart-added-list__item-count" placeholder="0" value="1">
                <button class="cart-added-list__item-btn-plus btn-light"></button>
                <button class="cart-added-list__item-btn-minus btn-light"></button>
            </div>`
        );
    });
}

// Виклик функції для виведення товарів з локального сховища
displayCartItems();


// Слідкуємо за кліком по цьому списку
productList.onclick = (event) => {

    // Поточний елемент по якому був клік
    const el = event.target

    // Перевіряєо чи клік був по потрібно нам елементі
    if (el.classList.contains('js-add-product')) {
        addNewProduct(el);
    }
}

function addNewProduct(el) {
    // Збираємо дані про добавлений товар
    //dataset - ми додали атрибути до кнопки + в файлі getProduct.js, щоб витягти їх тут
    const product = el.dataset;

    // Добавляємо до масива товарів
    cart.push(product);
    console.log("cart: ", cart);

    cartAddedList.innerHTML = '';

    cart.forEach(el => {
        //Диструктуризація dataset атрибутів
        const { thumbnail, title, price } = el;

        //Виводимо інфо в корзину-см
        cartAddedList.innerHTML = cartAddedList.innerHTML +
            `<div class="cart-added-list__item">
                <button class="cart-added-list__item-btn-delete btn-light">
                    <svg class='icon icon-close'>
                        <use xlink:href='#icon-close'></use>
                    </svg>
                </button>
                <img src=${thumbnail} alt="" class="cart-added-list__item-img">
                <p class="cart-added-list__item-text-hold">
                    <a href="#" class="cart-added-list__item-title-link">Назва товару: ${title}</a>
                    <span class="cart-added-list__item-meta-list">
                    <span class="cart-added-list__item-meta">Ціна: ${price} грн</span>
                    </span>
                </p>
                <input type="text" class="cart-added-list__item-count" placeholder="0" value="1">
                <button class="cart-added-list__item-btn-plus btn-light"></button>
                <button class="cart-added-list__item-btn-minus btn-light"></button>
            </div>`
    })

    saveCartToLocalStorage();
}