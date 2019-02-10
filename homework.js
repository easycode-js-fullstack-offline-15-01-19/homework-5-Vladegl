// -------------------------- Home work --------------------------
// -------------------------- Еглевский Владислав Александрович --------------------------

// ---------------------------------DOM. Задачи.---------------------------------

// Зная структуру html, с помощью изученных
// методов получить (в консоль):
// 1. head
// 2. body
// 3. все дочерние элементы body и вывести их в
// консоль.
// 4. первый div и все его дочерние узлы
// а) вывести все дочерние узлы в консоль
// б) вывести в консоль все дочерние узлы,
//     кроме первого и последнего
// Для навигации по DOM использовать методы,
//     которые возвращают только элементы


let head = document.head;
console.log(head);

let body = document.body;
console.log(body);

let bodyChildren = body.children;
console.log(bodyChildren);

let firstDiv = body.firstElementChild;

console.log(firstDiv);
console.log(firstDiv.children);

for (let i = 1; i < firstDiv.children.length - 1; i++) {
    console.log(firstDiv.children[i]);
}


// 1. Создать функцию, которая принимает два элемента. Функция проверяет, является ли первый элемент родителем для второго:
//
//     isParent(parent, child);
// isParent(document.body.children[0], document.querySelector('mark'));
// // true так как первый див является родительским элементом для mark
//
// isParent(document.querySelector('ul'), document.querySelector('mark'));
// // false так ul НЕ является родительским элементом для mark


/**
 * Проверка, являетс ли первый переданный элемент родителем второго
 *
 * @param {DOMElement} parent
 * @param {DOMElement} child
 * @returns {Boolean}
 */
function isParent(parent, child) {


    if (parent.querySelector(child.nodeName)) {
        return true;
    }

    return false;
}

console.log(isParent(document.body.children[3], document.querySelector('mark')));
console.log(isParent(document.querySelector('ul'), document.querySelector('mark')));

//2. Получить список всех ссылок, которые не находятся внутри списка ul.

let allLinks = document.links;
let neededLinks = [];

for (let i = 0; i < allLinks.length; i++) {
    if (!allLinks[i].closest('ul')) neededLinks.push(allLinks[i]);
}

console.log(neededLinks);

//3. Найти элемент, который находится перед и после списка ul

let documentChildren = document.children;

let ulElement = document.getElementsByTagName('ul')[0];
let prevElement = ulElement.previousElementSibling;
console.log(prevElement);

let nextElement = ulElement.nextElementSibling;
console.log(nextElement);


//4. Посчитать количество элементов li в списке

let liNumber = ulElement.getElementsByTagName('li').length;

console.log(liNumber);

// Свойства. Задачи.


//1. Найти параграф и получить его текстовое содержимое (только текст!)

let paragraphTextContent = document.getElementsByTagName('p')[4].textContent;

console.log(paragraphTextContent);

//2. Создать функцию, которая принимает в качестве аргумента узел DOM и
// возвращает информацию (в виде объекта) о типе узла, об имени узла и о количестве дочерних узлов (если детей нет - 0)

/**
 * Вохвращат объект с информацией о типе узла, имени узла и о дочерних элементах
 *
 * @param {Object} DOMNode DOM element
 * @returns {Object}
 */
function nodeInfo(node) {

    let nodeInfoObj = {};

    nodeInfoObj.type = node.nodeType;
    nodeInfoObj.name = node.nodeName;
    nodeInfoObj.children = node.children.length ? node.children.length : 0;

    return nodeInfoObj;
}

console.log(nodeInfo(document.getElementsByTagName('p')[4]));


//3. Получить массив, который состоит из текстового содержимого ссылок внутри
// списка: getTextFromUl(ul) ---> ["Link1", "Link2", "Link3"]

/**
 * Возвращает выборку текстового содержимого ссылок переданного элемента
 *
 * @param {DOMElement} DOMNode
 * @returns {array}
 */
function getTextFromUl(ul) {

    if (ul.tagName !== 'UL') return console.log('Ul element needed');

    let linksArray = [];
    let linksElements = ul.getElementsByTagName('a');

    for (let i = 0; i < linksElements.length; i++) {
        linksArray.push(linksElements[i].textContent);
    }

    return linksArray;
}

console.log(getTextFromUl(ulElement));


//4. В параграфе заменить все дочерние текстовые узлы на “-text-”
// (вложенные теги должны остаться). Конечный результат:
// -text-<a href="#">reprehendunt</a>-text-<mark>nemore</mark>-text-


let paragraph = document.getElementsByTagName('p')[4];

let paragraphChildren = paragraph.childNodes;

for (let i = 0; i < paragraphChildren.length; i++) {
    if (paragraphChildren[i].nodeType === 3) {
        paragraphChildren[i].textContent = "-text-";
    }
}

//Другие задачи

//1. Найти в коде список ul и добавить класс “list”

ulElement.classList.add('list');

//2. Найти в коде ссылку, находящуюся после списка ul, и добавить id=link

let ulElement2 = ulElement;

while (ulElement2) {

    ulElement2 = ulElement2.nextElementSibling;

    if (ulElement2.tagName === "A") {
        ulElement2.setAttribute("id", "link");
        break;
    }
}

console.log(document.links);

//3. На li через один (начиная с самого первого) установить класс “item”

for (let i = 0; i < document.getElementsByTagName('li').length; i += 2) {
    document.getElementsByTagName('li')[i].classList.add('item');
}


//4. На все ссылки в примере установить класс “custom-link”


for (let i = 0; i < document.getElementsByTagName('a').length; i++) {
    document.getElementsByTagName('a')[i].classList.add('custom-link');
}


// 1. Не используя innerHTML, добавить в список несколько li с классом ‘new-item’ и текстом ‘item’ + номер li:
//     <ul>
// <li><a href="#">Link1</a></li>
// ...
// <li class=”new-item”>item 5</li>
// <li class=”new-item”>item 6</li>
// </ul>
// Вручную номер li не ставить оно должно подставляться в зависимости от кол-ва лишек в списке.

let wantedNum = 2;

for (let i = 1; i <= wantedNum; i++) {

    let createLi = document.createElement('li');

    createLi.classList.add('new-item');
    createLi.textContent = `item ${++ulElement.getElementsByTagName('li').length}`;

    ulElement.insertAdjacentElement('beforeend', createLi);
}

//2. В каждую ссылку, которая находятся внутри списка ul  добавить по тегу strong (в каждую ссылку один - strong).

for(let i = 0; i < ulElement.getElementsByTagName('a').length; i++) {
    let createStrong = document.createElement('strong');
    ulElement.getElementsByTagName('a')[i].appendChild(createStrong);
}


console.log(ulElement);



//3. В начало документа (в начало body) добавить картинку img с атрибутами src и alt (текст придумайте сами).
// В src добавьте реальный url к картинке. Для создания элемента используйте метод createElement.


let createImg = document.createElement('img');
createImg.setAttribute('src', 'https://img.devrant.com/devrant/rant/r_1883915_x59qk.jpg');
createImg.setAttribute('alt', 'js meme');


body.insertAdjacentElement('afterbegin', createImg);

//4. Найти на странице элемент mark, добавить в конец содержимого текст “green” и на элемент установить класс green

let mark = document.querySelector('mark');
mark.textContent += ' green';
mark.classList.add('green');

console.log(mark);

//5. Отсортировать li внутри списка в обратном порядке (по тексту внутри)

let liInUl = ulElement.getElementsByTagName('li');


let newArray = [];

for (let i = 0; i < liInUl.length; i++) {
    newArray[i] = liInUl[i].innerHTML;
}

function compare(a, b) {
    if (a > b) return -1;
    if (a < b) return 1;
}

let sortedLiArray = newArray.sort(compare);

for (let i = 0; i < liInUl.length; i++) {
    liInUl[i].innerHTML = sortedLiArray[i];
}
















