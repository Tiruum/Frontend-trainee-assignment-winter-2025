# Frontend Trainee Assignment Winter 2025

## Обоснование выбора технологий

1. **React Hook Form + Zod**:
   - Производительная работа с формами без лишних ререндеров
   - Типобезопасная валидация данных
   - Удобная интеграция с TypeScript
   - Поддержка со стороны Shadcn/ui

2. **TailwindCSS + Shadcn/ui**:
   - Быстрая разработка интерфейса без написания CSS
   - Консистентный и апаптивный дизайн
   - Готовые доступные компоненты с полной возможностью кастомизации

## Запуск проекта

### Локальный запуск

1. Убедитесь, что установлен Node.js версии 18+
2. Склонируйте репозиторий
```bash
git clone https://github.com/Tiruum/Frontend-trainee-assignment-winter-2025.git
cd Frontend-trainee-assignment-winter-2025
```
3. Установите зависимости для клиента и сервера:
```bash
# Установка зависимостей клиента
cd client
npm install

# Установка зависимостей сервера
cd ../server
npm install
```

4. Запустите сервер:
```bash
cd server
npm run start
```

5. В другом терминале запустите клиент:
```bash
cd client
npm run dev
```

6. Откройте в браузере:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Через Docker

1. Склонируйте репозиторий:
```bash
git clone https://github.com/Tiruum/Frontend-trainee-assignment-winter-2025.git
cd Frontend-trainee-assignment-winter-2025
```

2. Запустите проект:
```bash
docker-compose up --build
```

3. Откройте в браузере:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Структура проекта

```
├── client/                # Frontend приложение
│   ├── src/
│   │   ├── components/   # Переиспользуемые компоненты
│   │   ├── pages/        # Страницы приложения
│   │   ├── types/        # TypeScript типы
│   │   └── helpers/      # Вспомогательные функции
│   └── ...
├── server/               # Backend (JSON Server)
│   ├── db.json          # База данных
│   └── ...
└── docker-compose.yml   # Конфигурация Docker
```
