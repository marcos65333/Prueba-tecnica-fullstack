from datetime import datetime
from src import logger
from email.utils import parsedate_to_datetime

def remove_time_from_date(date_obj):
    print(
        f"remove_time_from_date: {date_obj} - {type(date_obj)}"
    )  # Debugging line
    """
    Receives a datetime.date object and returns it as 'YYYY-MM-DD'
    """
    if isinstance(date_obj, (datetime, datetime.date)):
        return date_obj.strftime("%Y-%m-%d")
    return date_obj  # ya está limpio o no se puede formatear

def parse_http_date(date_str):
    """
    Converts a date string like 'Mon, 03 Mar 2025 00:00:00 GMT' to '2025-03-03'
    """
    try:
        return parsedate_to_datetime(date_str).date().strftime("%Y-%m-%d")
    except Exception as e:
        logger.error(f"Error parsing date: {e}")
        return None
