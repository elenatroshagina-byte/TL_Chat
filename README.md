# TL Chat — готово для GitHub Pages

Корень этой папки является готовым статическим сайтом:

- `index.html` — стартовая страница;
- `assets` — JavaScript, CSS, Reactor-шрифты и иконки;
- `.nojekyll` — отключает обработку файлов через Jekyll.

Загрузите содержимое этой папки в корень ветки, выбранной в
**Settings → Pages → Deploy from a branch**. Дополнительная сборка на GitHub не
требуется.

Исходный Vite-проект находится в `source-project`. Для локальной разработки:

```bash
cd source-project
npm install --cache ./.npm-cache
npm run dev
```

Для установки зависимостей Reactor потребуется рабочий приватный `.npmrc`;
файл с данными доступа в комплект не включён.
