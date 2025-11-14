import importlib
import traceback
import sys
from pathlib import Path

# Добавляем папку backend в sys.path, чтобы пакет app был виден
backend_dir = Path(__file__).resolve().parent  # backend/
sys.path.insert(0, str(backend_dir))

try:
    importlib.import_module('app.main')
    print('IMPORT_OK')
except Exception as e:
    traceback.print_exc()

