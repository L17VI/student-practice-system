#!/bin/sh
set -e

# Если есть requirements.txt в рабочей директории - установить зависимости (на случай bind-mount в dev)
if [ -f /code/requirements.txt ]; then
  echo "Installing Python dependencies from /code/requirements.txt..."
  pip install --no-cache-dir -r /code/requirements.txt || {
    echo "Failed to install requirements, continuing anyway (you may run container shell to fix)."
  }
fi

# Выполняем команду контейнера
exec "$@"
