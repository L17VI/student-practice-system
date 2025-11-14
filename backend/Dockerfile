FROM python:3.11-slim

# Рабочая директория должна совпадать с тем, что используется в docker-compose (./backend -> /code)
WORKDIR /code

# Копируем только requirements и устанавливаем зависимости на этапе сборки (ускоряет запуск)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальной код
COPY . .

# Копируем entrypoint, который будет повторно устанавливать зависимости при первом запуске контейнера
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
