import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { _ } from "@reactor/core";
import { intl } from "@reactor/intl";
import {
  Badge,
  Button,
  ContentSwitcher,
  DataWidgetDetails,
  DatePicker,
  Grid,
  Icon,
  IconButton,
  Link,
  Page,
  Pagination,
  PrimaryButton,
  ReactorTheme,
  Select,
  Text,
  Tile,
} from "@reactor/reactor";
import { Table } from "@reactor/table";
import { Menu } from "@reactor/scaffold-ui";
import "./styles.css";

const questions = [
  { date: "23 октября 2025, 15:13", topic: "Контакты", question: "Как далеко находится гостиница от аэропорта?", answered: false },
  { date: "22 октября 2025, 15:13", topic: "Проживание с животными", question: "pet-friendly?", answered: false },
  { date: "21 октября 2025, 15:13", topic: "Адрес", question: "А с какой стороны подъезжает такси, если тут перекрыто?", answered: true },
  { date: "20 октября 2025, 15:13", topic: "Описание и концепция", question: "Подскажите, у вас есть услуги Батлера?", answered: false },
  { date: "19 октября 2025, 15:13", topic: "Бассейн", question: "Добрый день! В отеле есть бассейн?", answered: false },
  { date: "18 октября 2025, 15:13", topic: "Адрес", question: "Точка на карте для Навигатора?", answered: true },
  { date: "17 октября 2025, 15:13", topic: "Адрес", question: "Можно ли добраться на метро?", answered: true },
];

const menu = [
  ["lamp", "Помощник"], ["hotel", "Управление номерами"], ["house", "Настройки гостиницы"],
  ["apps", "Менеджер каналов"], ["sync", "Интеграция с АСУ"], ["forum", "Репутация"],
  ["desktop", "Конструктор сайтов"], ["chart", "Оптимизатор цен"], ["file", "Управление заказами"],
  ["mail", "Маркетинг"], ["folder", "Документооборот"], ["chart", "Отчёты"],
  ["user", "Онлайн-регистрация"], ["help", "Сравнение цен"], ["users", "Управление гостями"],
  ["list", "Модуль бронирования"],
];

const menuItems = menu.map(([icon, text], index) => index === 0 ? {
  id: "assistant",
  level: 0,
  icon,
  text,
  expanded: true,
  onClick: () => {},
  children: [
    "Стартовая страница", "Новинки платформы", "Статистика бронирований",
    "ИИ-помощник для гостей", "Статистика", "Ответы и настройка чата", "Настройки",
  ].map((childText, childIndex) => ({
    id: `assistant-${childIndex}`,
    level: 1,
    text: childText,
    selected: childText === "Статистика",
    onClick: () => {},
  })),
} : {
  id: `menu-${index}`,
  level: 0,
  icon,
  text,
  onClick: () => {},
});

function App() {
  const [period, setPeriod] = useState("month");
  const [status, setStatus] = useState("all");
  const [topic, setTopic] = useState("all");
  const [from, setFrom] = useState(_.utc(2025, 8, 24));
  const [to, setTo] = useState(_.utc(2025, 9, 24));
  const [page, setPage] = useState(1);

  const rows = useMemo(() => questions
    .filter(item => status === "all" || (status === "answered") === item.answered)
    .filter(item => topic === "all" || item.topic === topic)
    .map(item => [
      <Text text={item.date} typography="caption" />,
      <Link text={item.topic} onClick={() => setTopic(item.topic)} />,
      <Text text={item.question} typography="caption" />,
      <Badge color={item.answered ? "success" : "danger"} text={item.answered ? "отвеченный" : "неотвеченный"} />,
      <Button text="Смотреть диалог" onClick={() => window.alert(item.question)} />,
    ]), [status, topic]);

  return (
    <ReactorTheme>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="provider"><Icon name="more-vert" color="foreground" /><Badge color="info" filled text="P" /><Text text="Имя провайдера" typography="caption" color="background" /></div>
          <div className="menu-list">
            <Menu items={menuItems} />
          </div>
          <div className="support">
            <Text text="Служба поддержки TravelLine" typography="caption" color="background" />
            <Text text="support@travelline.ru" typography="caption" color="neutral" />
            <Text text="будние дни        +7 (499) 703-34-80" typography="caption" color="neutral" />
            <Text text="3:00—22:00 МСК     +7 (495) 287-97-28" typography="caption" color="neutral" />
            <Text text="выходные           +7 (499) 681-23-37" typography="caption" color="neutral" />
            <Text text="8:00—19:00 МСК" typography="caption" color="neutral" />
          </div>
        </aside>

        <main className="workspace">
          <div className="topbar">
            <IconButton icon="arrow-left" accent hint="Назад" onClick={() => {}} />
            <div className="top-actions">
              <IconButton icon="settings" hint="Настройки" onClick={() => {}} />
              <IconButton icon="notification" hint="Уведомления" onClick={() => {}} />
              <IconButton icon="help" hint="Помощь" onClick={() => {}} />
              <IconButton icon="search" hint="Поиск" onClick={() => {}} />
              <Button icon="user" text="elena.trosha" onClick={() => {}} />
            </div>
          </div>

          <div className="page-fill"><Page title="Статистика" gap={20}>
            <Tile header="На что обратить внимание сегодня">
              <Grid columns="minmax(0, 1fr) minmax(0, 1fr) minmax(360px, 1.2fr)" gap={20} padding={[16]}>
                <section className="metric">
                  <div className="metric-title"><Text text="Неотвеченные вопросы" typography="subtitle" /><Icon name="cancel" color="danger" size="xs" /><Badge color="danger" text="18" /></div>
                  <DataWidgetDetails details={[
                    { label: { text: "Парковка", link: {} }, color: "danger", part: 10, total: 10, values: ["10"] },
                    { label: { text: "Питание", link: {} }, color: "danger", part: 5, total: 10, values: ["5"] },
                    { label: { text: "Проживание с животными", link: {} }, color: "danger", part: 3, total: 10, values: ["3"] },
                  ]} />
                </section>
                <section className="metric contradiction">
                  <div className="metric-title"><Text text="Противоречия в данных" typography="subtitle" /><Icon name="shuffle" color="demo" size="xs" /><Badge color="demo" text="18" /></div>
                  <DataWidgetDetails details={[
                    { label: { text: "Общая информация", link: {} }, color: "demo", part: 10, total: 10, values: ["10"] },
                    { label: { text: "Номера", link: {} }, color: "demo", part: 5, total: 10, values: ["5"] },
                    { label: { text: "Правила проживания", link: {} }, color: "demo", part: 3, total: 10, values: ["3"] },
                  ]} />
                </section>
                <Tile decoration="assistant-card">
                  <div className="assistant-content">
                    <Icon name="chat" color="accent" size="md" />
                    <div className="assistant-copy"><Text text="Улучшу ответы быстро" typography="subtitle" /><Text text="ИИ-помощник" typography="caption" color="neutral" /></div>
                    <PrimaryButton text="Улучшить ответы" onClick={() => window.alert("Улучшить ответы")} />
                  </div>
                </Tile>
              </Grid>
            </Tile>

            <Text text="История по вопросам" typography="page-title" />
            <Tile>
              <div className="period-row">
                <Text text="Период" typography="caption" />
                <ContentSwitcher value={period} onChange={setPeriod} options={[
                  { value: "month", text: "Месяц" }, { value: "week", text: "Неделя" }, { value: "today", text: "Сегодня" },
                ]} />
                <DatePicker value={from} onChange={value => value && setFrom(value)} />
                <Text text="—" />
                <DatePicker value={to} onChange={value => value && setTo(value)} />
                <Button text="Найти" onClick={() => {}} />
              </div>
            </Tile>

            <Tile header="Вопросы гостей">
              <div className="table-toolbar">
                <ContentSwitcher value={status} onChange={setStatus} options={[
                  { value: "all", text: "Все" }, { value: "unanswered", text: "Неотвеченные" }, { value: "answered", text: "Отвеченные" },
                ]} />
                <Select prefix="Темы вопроса:" type="checkbox" searchable={false} value={topic} onChange={setTopic} options={[
                  { value: "all", text: "все" },
                  ...Array.from(new Set(questions.map(item => item.topic))).map(value => ({ value, text: value })),
                ]} />
                <Pagination count={3} value={page} onChange={setPage} />
              </div>
              <Table fixed head={[
                { content: "Дата", width: 136 }, { content: "Тема", width: 190 }, { content: "Вопрос" },
                { content: "Статус", width: 120 }, { content: "Действие", width: 150 },
              ]} rows={rows} />
              <div className="pagination-bottom"><Pagination count={3} value={page} onChange={setPage} /></div>
            </Tile>
          </Page></div>

          <footer><Text text="© TRAVELLINE SYSTEMS LLC, 2021 – 2024" typography="caption" color="neutral" /><Text text="TravelLine: Platform. Automation solutions for hospitality" typography="caption" color="neutral" /></footer>
        </main>
      </div>
      <div id="reactor-app-portal" />
    </ReactorTheme>
  );
}

intl.Module.init({ locale: "ru-RU" }).then(() => {
  createRoot(document.getElementById("root")).render(<App />);
});
