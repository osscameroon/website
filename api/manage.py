from app import blueprint
from app.main import create_app
from app.main.config import app_port, app_host

app = create_app('dev')

app.register_blueprint(blueprint)

if __name__ == '__main__':
    app.run(host=app_host, port=app_port)
