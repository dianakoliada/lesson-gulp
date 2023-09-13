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

    return (cartData) ? JSON.parse(cartData) : [];

    // if (cartData) {
    //     return JSON.parse(cartData);
    // } else {
    //     return [];
    // }
}

// Функція для виведення товарів з масиву cart в HTML
function displayCartItems() {

    // Очистити html списку
    cartAddedList.innerHTML = '';

    if (cart.length == 0) {

        cartAddedList.innerHTML = '<p class="no-result">Корзина пуста</p>'

    } else {

        cart.forEach(
            function (el, index) {
                const { thumbnail, title, price, id } = el;

                cartAddedList.insertAdjacentHTML(
                    'beforeend',
                    `<div class="cart-added-list__item">
                        <button class="cart-added-list__item-btn-delete btn-light js-remove-product" data-index="${index}"><svg class='icon icon-close'><use xlink:href='#icon-close'></use></svg></button>
                        <img src="${thumbnail}" alt="" class="cart-added-list__item-img">
                        <p class="cart-added-list__item-text-hold">
                            <a href="#" class="cart-added-list__item-title-link">Назва товару: ${title}</a>
                            <span class="cart-added-list__item-meta-list">
                            <span class="cart-added-list__item-meta">Ціна: ${price} грн</span>
                            </span>
                        </p>
                        <input type="text" class="input-js cart-added-list__item-count" placeholder="0" value="1" id="input-count-${id}" onkeypress="onTypeHandler(event)">
                        <button class="cart-added-list__item-btn-plus btn-light js-count" data-type="plus" data-input="#input-count-${id}"></button>
                        <button class="cart-added-list__item-btn-minus btn-light js-count" data-type="minus" data-input="#input-count-${id}"></button>
                    </div>`
                );
            }
        );

    }

    // Зберігаємо додані товари
    saveCartToLocalStorage();

}

// Виклик функції для виведення товарів з локального сховища
displayCartItems();


/**
 * Вивід товарів до html
 * @param {*} el - Елемент кнопки з якою будемо працювати 
 */
function addNewProduct(el) {
    // Збираємо дані про добавлений товар
    //dataset - ми додали атрибути до кнопки + в файлі getProduct.js, щоб витягти їх тут
    const product = el.dataset;

    // Перевіряємо чи корзина пуста
    if (cart.length == 0) {

        // Добавляємо до масива товарів
        cart.push(product);

    } else {

        // Переключалка для додавання товару
        let ifProductExist = false;

        // Перевірка на дублікат
        cart.forEach(function (el) {

            // Шукаємо елемент в якого id буде подібний на id товару, який додаємо
            if (el.id == product.id) {
                ifProductExist = true;

                // cart[index].count++;
                el.count++;
            }

        })

        // Якщо товара немає тоді добавляємо до масива
        if (ifProductExist == false) {

            // Добавляємо до масива товарів
            cart.push(product);
        }
    }

    // Виводимо додані товари
    displayCartItems();
}

// Видалємо товар з масива cart
function removeProduct(el) {

    // Отримуємо id товару, який треба видалити
    const idToDelete = el.dataset.index;

    // Видаляємо товар з масива cart
    cart.splice(idToDelete, 1)

    // Виводимо товари
    displayCartItems();
}




// Слідкуємо за кліком по цьому списку
productList.onclick = (event) => {

    // Поточний елемент по якому був клік
    const el = event.target;

    // Перевіряєо чи клік був по потрібно нам елементі
    if (el.classList.contains('js-add-product')) {
        addNewProduct(el);
    }
}


// Слідкуємо за кнопками добавлених товарів
cartAddedList.onclick = (event) => {

    // Поточний елемент по якому був клік
    const el = event.target;

    // Перевіряєо чи клік був по потрібно нам елементі
    if (el.classList.contains('js-remove-product')) {
        removeProduct(el)
    }
}


//ПЕРЕМИКАЧ КІЛЬКОСТІ ТОВАРІВ В КОРЗИНІ-СМ

const buttons = document.querySelectorAll('.js-count');
const inputs = document.querySelectorAll('.input-js');

//перебираємо всі кнопки та вішаємо прослушку на елемент (btn)
buttons.forEach((btn) => {
    //вішаємо подію клік на елемент
    btn.onclick = (event) => {
        //зберігаємо значення, який саме елемент ми клікнули
        const el = event.target;

        //отримуємо атрибут із елемента (plus or minus)
        const btnTypeVal = el.getAttribute('data-type');

        //отримуємо атрибут з кнопки, щоб зв'язати з інпутом
        const dataInputVal = el.getAttribute('data-input');

        //зберігаю необхідний інпут
        let input = document.querySelector(dataInputVal);

        // Отримуємо поточне значення інпута 
        const count = parseInt(input.value);

        if (btnTypeVal === 'plus') {
            input.value++;
        }

        //робимо перевірку для того щоб НЕ можна було отримати 0 або від'ємне значення інпута
        if (btnTypeVal === 'minus' && count > 1) {
            input.value--;
        }
    }
})