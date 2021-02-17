# Плагин модальных окон  
Данный плагин предназначенн для создания модальных окон  

---
# Установка  
 1. Скачать файлы репозитория `git clone https://github.com/Toxic17/modalPlagin.git`;
 2. подключить файл script.min.js и style.min.css;
 3. инициализировать плагин `let res = new modal({options})`;
 4. создать события.  
---
## Возможные опции
| Название опции       | Описание                | Значение по умолчанию |
| ------------- |------------------| -----|
| animationTime   | Время анимации модального окна   | 500 |
| scroll    | Скрывать ли стандартный скроллбар браузера |false|
| closeBtn  | Показывать ли кнопку закрытия|   true |
| openAnimationName  | Имя класса для анимации открытия         |"animate__fadeInDownBig"|
| closeAnimationName  | Имя класса для анимации закрытия         |"animate__fadeOutDownBig"|
| absoluteClass | Имя селектора для блоков с абсолютным позиционированием|".fix-block"|
| useAnimate | Использовать ли библиотеку [animate.css](https://animate.style/)|true|
| dataModal |Значение свойства data-modal для открытия|false|
| modalHTML |HTML код самого модального окна|`"<div class='modal-title'><p>Title</p></div><div class='modal-body'>This is body</div><div class='modal-footer'>This is footer<button>1</button><button>2</button></div>"`|
---
# Доступные события для модального окна
| Название события       | Описание                | Пример использования |
| ------------- |------------------| -----|
| open()   | Открытие модального окна    | `elem.addEventListener('click',()=>{res.open()})` |
| close()   | Закрытие модального окна    | `elem.addEventListener('click',()=>{res.close()})` |
| destroy()  | Уничтожение модального окна    | `elem.addEventListener('click',()=>{res.destroy()`}) 
---
# Внимание 
Если у вас в проекте используется абсолютное позиционирование блоков, необходимо подключить файл `app/reset.min.css`. Для корректного поведения в браузере.

---
# Поддержка браузер
* ##### Edge 12-88
* ##### Firefox 22-87
* ##### Chrome 22-91
* ##### Safari 10-14
* ##### Opera 32-72
* ##### iOS Safari 10-13.7
