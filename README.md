# Student Practice System (Docker)

## Быстрый старт (Docker)

### Запуск обоих сервисов (backend + frontend)

```bash
cd /Users/a1111/PycharmProjects/student-practice-system

docker compose up --build
```

- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## Переменные окружения

- `DATABASE_URL` — строка подключения к БД (по умолчанию `sqlite:////tmp/database.db`).
- `SECRET_KEY` — ключ для JWT.
- `REACT_APP_API_URL` — URL API для фронта (по умолчанию `http://localhost:8000`).

## Примечания

- Dockerfile для backend: `backend/Dockerfile`
- Dockerfile для frontend: `frontend/Dockerfile`
- Компоновка для VPS: `docker-compose.yml`

