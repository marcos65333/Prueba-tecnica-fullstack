# API Config file
from flask import Flask
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_wtf import CSRFProtect
import logging
from flask_limiter import Limiter
from flask import request
import locale
from src.config.api_config import Config

load_dotenv()
app = Flask(__name__)
app.config.from_object(Config)
allowed_origins = app.config['ALLOWED_ORIGINS']
jwt = JWTManager(app) # JWT
csrf = CSRFProtect(app) # CSRF
locale.setlocale(locale.LC_TIME, 'es_ES.utf8')  # Para sistemas Linux/macOS

CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=True)
logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(name)s - %(levelname)s - %(message)s' ) # set log level
logger = logging.getLogger(__name__)

# Lista de IPs permitidas
ALLOWED_IPS = {"167.0.199.16",'167.0.226.116'}  

def get_client_ip():
    """Obtiene la IP real del cliente o del servidor frontend si pasa por un proxy"""
    headers_to_check = [
        "X-Forwarded-For",  # Proxy inverso o balanceador de carga
        "X-Real-IP",  # Algunas configuraciones de proxy usan este encabezado
        "HTTP_X_FORWARDED_FOR",  # Puede estar en `request.environ`
        "REMOTE_ADDR"  # IP directa si no hay proxies
    ]
    
    for header in headers_to_check:
        ip = request.headers.get(header)
        if ip:
            return ip.split(",")[0]  # En caso de múltiples IPs, toma la primera
    return request.remote_addr  # Fallback si no hay proxies

# Configurar rate limit
limiter = Limiter(
    key_func=get_client_ip,
    app=app,
    default_limits=["2400 per day", "100 per hour"],  # LIMIT requests 
)

@app.route('/')
@limiter.limit("5 per minute")  # ADD rate limit to the index route
def index():
    return {"message": "Sistema de registro y Gestión de proyectos de Innovacion  "}

# Importar rutas
from src.routes.projects import *
