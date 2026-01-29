import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add backend directory to sys.path to allow imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.application import ApplicationModel
from settings import settings

def delete_all_applications():
    """Connects to the database and deletes all records from the applications table."""
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    session = SessionLocal()
    
    try:
        num_deleted = session.query(ApplicationModel).delete()
        session.commit()
        print(f"Successfully deleted {num_deleted} application(s).")
    except Exception as e:
        session.rollback()
        print(f"An error occurred: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    delete_all_applications()
