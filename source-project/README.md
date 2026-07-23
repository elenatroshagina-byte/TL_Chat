# TL Chat — Reactor prototype

Визуальный интерактивный прототип экрана статистики из Figma, собранный на `@reactor/reactor`.

## Запуск из исходников

Перед первой установкой положите в корень этой папки рабочий `.npmrc` с доступом
к локальному registry Reactor. Приватный файл с данными доступа в комплект не
включён.

```bash
npm install --cache ./.npm-cache
npm run dev
```

После запуска откройте `http://127.0.0.1:5173/`.

Production-сборка:

```bash
npm run build:pages
```

## Запуск готовой сборки

Папка `dist` уже собрана и не требует `npm install`. Запустите в корне проекта:

```bash
python3 -m http.server 8080 --directory dist
```

Затем откройте `http://127.0.0.1:8080/`.

Содержимое `dist` также готово для публикации в GitHub Pages.
