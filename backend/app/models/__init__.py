from .user import User
from .practice import Practice
from .application import Application
from .company import Company

# Уберите UserRole если он не используется
__all__ = ["User", "Practice", "Application", "Company"]