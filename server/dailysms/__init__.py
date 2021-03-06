from dailysms.utils.decorators import init_decorators
from dailysms.extensions import init_extensions
from apscheduler.schedulers import SchedulerAlreadyRunningError
from dailysms.extensions import db, scheduler
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from dailysms.api import init_api
from flask_cors import CORS
from flask import Flask
import os

load_dotenv()


def create_app():
    app = Flask(__name__)

    CORS(app)

    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    jwt = JWTManager(app)

    init_api(app)
    init_extensions(app, db, scheduler)
    init_decorators(app, db, jwt)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {'app': app, 'db': db}

    return app
