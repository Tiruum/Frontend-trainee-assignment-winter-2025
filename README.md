# Frontend Trainee Assignment Winter 2025

## Технологический стек

### Frontend
- **TypeScript** - для типобезопасной разработки и улучшенной поддержки кода
- **React Hook Form** - управление формами с валидацией и оптимизированным ререндерингом
- **Zod** - типобезопасная валидация данных
- **TailwindCSS** - для быстрой стилизации компонентов
- **Shadcn/ui** - готовые компоненты с возможностью кастомизации
- **Axios** - для типизированных HTTP-запросов
- **React Router** - для клиентской маршрутизации

### DevOps
- **Docker** - для контейнеризации и упрощения развертывания
- **Docker Compose** - для оркестрации контейнеров

## Обоснование выбора технологий

1. **React Hook Form + Zod**:
   - Производительная работа с формами без лишних ререндеров
   - Типобезопасная валидация данных
   - Удобная интеграция с TypeScript
   - Поддержка со стороны Shadcn/ui

2. **TailwindCSS + Shadcn/ui**:
   - Быстрая разработка интерфейса без написания CSS
   - Консистентный дизайн
   - Готовые доступные компоненты с возможностью кастомизации

## Запуск проекта

### Локальный запуск

1. Убедитесь, что установлен Node.js версии 18+
2. Склонируйте репозиторий
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

1. Убедитесь, что установлены Docker и Docker Compose
2. Склонируйте репозиторий:
```bash
git clone <repository-url>
cd Frontend-trainee-assignment-winter-2025
```

3. Запустите проект:
```bash
docker-compose up --build
```

4. Откройте в браузере:
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
