from flask import Flask

from backtester.loop import loop

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"

@app.route("/loop")
def run_loop():
    loop()

if __name__ == "__main__":
    app.run()
