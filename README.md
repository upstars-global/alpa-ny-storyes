# Alpa NY Stories — Новогодние Stories для Alpa

Проект представляет собой интерактивные Stories в стиле Instagram для Нового года, которые показывают индивидуальные достижения игрока на протяжении года. Используется для email-рассылок.

## Технологический стек

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** — сборщик
- **GSAP** — анимация сегментов (таймлайн)
- **SCSS** — стилизация

---

## Архитектура проекта

```
src/
├── components/Stories/
│   ├── your_story.vue      # Основной компонент Stories
│   ├── scripts.js          # Логика компонента (setup)
│   ├── styles.scss         # Стили
│   ├── localization/       # JSON-файлы локализации (en, de, it)
│   ├── img/                # Изображения, иконки, видео
│   │   ├── video/          # Видеофайлы для разных языков
│   │   ├── statuses/       # Иконки VIP/Regular уровней
│   │   └── icons/          # UI-иконки
│   ├── UI/                 # UI-компоненты Stories
│   │   ├── storiesTopBar.vue           # Прогресс-бар сверху
│   │   ├── closeButton.vue             # Кнопка закрытия
│   │   ├── mobileControlArea.vue       # Зоны управления (мобильные)
│   │   ├── desktopControlButton.vue    # Кнопки навигации (десктоп)
│   │   └── desktopPausePlayButton.vue  # Пауза/воспроизведение
```

---

## Параметры URL

Stories получает данные игрока через URL-параметры.

### Пример URL:
```
https://domain.com/your_story_ny_2025/?language=en&currency=USD&name=Denys&vip_level=5&regular_level=3&top_winnings=250&favorite_game_name=ElvisFrog&favorite_game_thumbnail=https://example.com/game.png&cashback=400&bonus=200&sport_winings=300&promocode=VIP2025&end_link=https://example.com
```

### Таблица параметров:

| Параметр | Описание | Значения | По умолчанию | Пропуск сегмента |
|----------|----------|----------|--------------|------------------|
| `language` | Язык интерфейса | `en`, `de`, `it` | Язык браузера | — |
| `currency` | Валюта | Любая | `USD` | — |
| `name` | Имя/ник игрока | Строка | Пусто (без имени) | — |
| `vip_level` | VIP-уровень | `1`-`6` | Пусто | Если пусто — сегмент пропускается |
| `regular_level` | Уровень игрока | `1`-`12` | Пусто | Если пусто — сегмент пропускается |
| `top_winnings` | Топ выигрыш за год | Число | `0` | Если `< 50` — пропускается |
| `favorite_game_name` | Название любимой игры | Строка | Пусто | Если пусто — пропускается |
| `favorite_game_thumbnail` | URL картинки игры | URL | Пусто | — |
| `cashback` | Кэшбек | Число | `0` | Если `0` или пусто — пропускается |
| `bonus` | Бонусы | Число | `0` | Если `< 1` — пропускается |
| `sport_winings` | Ставки/беттинг выигрыши | Число | `0` | Если `< 30` — пропускается |
| `promocode` | Промокод | Строка | `2025` | — |
| `end_link` | Ссылка на кнопку в конце | URL | Пусто | — |

---

## Структура сегментов Stories

Stories состоит из последовательных сегментов, которые анимируются синхронно с видео:

| # | Сегмент ID | Содержимое | Условие показа |
|---|------------|------------|----------------|
| 0 | `stories-segment-0` | Подсказка "Нажми play" | До начала воспроизведения |
| 1 | `stories-segment-1` | Приветствие + имя | Всегда |
| 2 | `stories-segment-2` | "Зажжём 2024!" | Всегда |
| 3 | `stories-segment-3` | VIP-уровень | Если `vip_level` задан (1-6) |
| 4 | `stories-segment-4` | Regular-уровень | Если `regular_level` задан (1-12) |
| 5 | `stories-segment-5` | Топ выигрыш | Если `top_winnings >= 50` |
| 6 | `stories-segment-6` | Любимая игра | Если `favorite_game_name` задан |
| 7 | `stories-segment-7` | Кэшбек | Если `cashback >= 1` |
| 8 | `stories-segment-8` | Бонусы | Если `bonus >= 1` |
| 9 | `stories-segment-9` | Спорт выигрыши | Если `sport_winings >= 30` |
| 10 | `stories-segment-10` | "Время наградить тебя, герой!" | Всегда |
| 11 | `stories-segment-11` | "Прими подарок от нас" | Всегда |
| 12 | `stories-segment-12` | "Упс, может не это" | Всегда |
| 13 | `stories-segment-13` | "Настоящий подарок" | Всегда |
| 16 | `stories-segment-16` | Финальный экран с промокодом | Всегда |

---

## Механизм синхронизации видео и анимации

### Основной принцип

1. **Видео** воспроизводится как фон и является источником времени
2. **GSAP Timeline** (`tl`) управляет анимацией текстовых сегментов
3. **При каждом `timeupdate`** события видео вызывается функция `updateTime()`:
   - Обновляет `currentTime` и `duration`
   - Вызывает `skips()` для проверки пропуска сегментов
   - Синхронизирует GSAP таймлайн с временем видео

### Код синхронизации:

```javascript
// При изменении состояния воспроизведения
watch(isPlaying, (newIsPlaying) => {
  if (newIsPlaying) {
    tl.time(videoPlayer.value.currentTime);
    tl.resume();
  } else {
    tl.time(videoPlayer.value.currentTime);
    tl.pause();
  }
});
```

### Переменные времени сегментов

Для каждого опционального сегмента хранятся временные метки начала и конца:

```javascript
vip_level_start, vip_level_end         // Сегмент VIP-уровня
regular_level_start, regular_level_end // Сегмент Regular-уровня
top_wining_start, top_wining_end       // Сегмент топ выигрыша
faw_game_start, faw_game_end           // Сегмент любимой игры
cashback_start, cashback_end           // Сегмент кэшбека
bonus_start, bonus_end                 // Сегмент бонусов
sport_winings_start, sport_winings_end // Сегмент спорт выигрышей
```

---

## Механизм пропуска сегментов

### Логика пропуска

Функция `skips()` вызывается при каждом обновлении времени видео. Проверяет, нужно ли пропустить текущий сегмент:

```javascript
const skips = () => {
  // Если сегмент должен быть пропущен И текущее время внутри этого сегмента
  if (scip_vip_level.value === true 
      && currentTime.value > vip_level_start.value 
      && currentTime.value < vip_level_end.value) {
    // Перематываем видео и GSAP на конец сегмента
    videoPlayer.value.currentTime = vip_level_end.value;
    tl.time(vip_level_end.value);
  }
  // Аналогично для других сегментов...
}
```

### Флаги пропуска и условия их установки:

```javascript
scip_vip_level = true         // Если vip_level не задан
scip_regular_level = true     // Если regular_level не задан
scip_top_wining = true        // Если top_winnings < 50
scip_thumbnail = true         // Если favorite_game_name пуст
scip_cashback = true          // Если cashback < 1
scip_bonus = true             // Если bonus < 1
scip_spot_winnings = true     // Если sport_winings < 30
```

### Навигация назад с учётом пропуска

При навигации назад (`jumpToSegment('backward')`) также учитываются пропускаемые сегменты:

```javascript
// Если новое время попадает в пропускаемый сегмент — прыгаем к началу предыдущего
if (scip_spot_winnings.value === true 
    && newTime >= sport_winings_start.value 
    && newTime < sport_winings_end.value) {
  newTime = bonus_start.value;
}
```

---

## Управление воспроизведением

### Мобильное управление

- **Короткое нажатие** (< 500ms) — переход вперёд/назад на сегмент
- **Долгое нажатие** (≥ 500ms) — пауза, при отпускании — продолжение

```javascript
const press = () => {
  playerPause();
  pressTimer.value = setTimeout(() => {
    longPress.value = true;
  }, pressDuration); // 500ms
};

const release = (direction) => {
  clearTimeout(pressTimer.value);
  if (longPress.value) {
    playerPlay();
  } else {
    playerPlay();
    jumpToSegment(direction);
  }
};
```

### Десктопное управление

- Кнопки `←` / `→` для навигации
- Кнопка паузы/воспроизведения
- Кнопка закрытия

---

## Поведение кнопки закрытия

```javascript
const close = () => {
  // Если ещё не дошли до подарка (< 90 сек)
  if (videoPlayer.value.currentTime < 90) {
    videoPlayer.value.currentTime = 90;
    tl.time(90);
  } else {
    // Если уже на финальном экране — копируем промокод и переходим
    navigator.clipboard.writeText(promocode).then(() => {
      if (copyPressed.value === true) {
        // Уже копировали — сразу переходим
        window.location.href = end_link.value;
      } else {
        // Показываем иконку "скопировано" и через 3 сек переходим
        copiedIcon.style.opacity = "1";
        setTimeout(() => {
          window.location.href = end_link.value;
        }, 3000);
      }
    });
  }
}
```

---

## GSAP Timeline — структура анимаций

Все анимации сегментов заданы последовательно в `onMounted`:

```javascript
tl.pause();

// Скрываем подсказку, показываем контейнер
tl.set("#stories-segment-0", { className: "hide" });
tl.set("#text_container_stories", { className: "text_container" });

// Сегмент 1: Приветствие (появление через 18 сек)
tl.from("#stories-segment-1", 
  { delay: 18, duration: 1, marginTop: "-22vh", scale: 0.5, opacity: 0 });
tl.to("#stories-segment-1", 
  { delay: 2, duration: 1, marginTop: "-22vh", scale: 0.5, opacity: 0 });

// Сохраняем время начала для функции skip
vip_level_start.value = tl.duration();
// ... далее анимации других сегментов
```

---

## Локализация

### Поддерживаемые языки

- `en` — English
- `de` — Deutsch
- `it` — Italiano

### Определение языка

1. Если передан параметр `language` — используется он
2. Иначе — определяется язык браузера (`navigator.language`)
3. Если язык не поддерживается — fallback на `en`

### Выбор видео по языку

```vue
<source v-if="texts.lang === 'it'" :src="video_it" type="video/mp4">
<source v-else-if="texts.lang === 'de'" :src="video_de" type="video/mp4">
<source v-else :src="video_en" type="video/mp4">
```

---

## Адаптивная верстка

- **Мобильные устройства**: Полноэкранный режим
- **Десктоп (>M breakpoint)**:
  - Видео центрируется с `border-radius: 3vh`
  - Ширина контейнера: `67vh`
  - Высота: `90%`, отступ сверху: `5%`

---

## VIP и Regular уровни

### VIP-уровни (1-6)

| Уровень | Название | Иконка |
|---------|----------|--------|
| 1 | Regular | `regular_512.webp` |
| 2 | Bronze | `bronze_512.webp` |
| 3 | Silver | `silver_512.webp` |
| 4 | Gold | `gold_512.webp` |
| 5 | Platinum | `platinum_512.webp` |
| 6 | Diamond | `diamond_512.webp` |

### Regular-уровни (1-12)

Иконки: `1.webp` ... `12.webp` в папке `img/statuses/level/`

---

## Промокоды

| Промокод | Описание в финале |
|----------|-------------------|
| `VIP2025` | "125% bonus is waiting for you!" |
| `2025` (default) | "50% + 50 FS bonus is waiting for you!" |

---

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build
```

---

## Структура финального экрана

1. Текст с описанием подарка (зависит от промокода)
2. Блок промокода с кнопкой копирования
3. Пояснение как активировать
4. Кнопка "GO TO HOME PAGE" — копирует и переходит
5. Кнопка "Watch again" — перезагружает страницу

---

## Особенности реализации

1. **Цикличность**: При достижении конца видео (90+ сек) видео перематывается на 89 сек
2. **Динамический размер шрифта**: Для больших чисел уменьшается `font-size`
3. **CSS-переменная `--vh`**: Используется для корректной высоты на мобильных устройствах
4. **Анимация пауза/play**: `animation-play-state` синхронизируется с состоянием видео
