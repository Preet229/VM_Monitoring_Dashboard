
from flask import Flask, render_template, jsonify
import psutil
import platform
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/stats')
def stats():

    memory = psutil.virtual_memory()
    disk = psutil.disk_usage(os.path.abspath(os.sep))

    data = {
        "cpu": psutil.cpu_percent(interval=0.5),
        "memory": memory.percent,
        "disk": disk.percent,
        "ram_total": round(memory.total / (1024**3), 2),
        "ram_used": round(memory.used / (1024**3), 2),
        "system": platform.system(),
        "processor": platform.processor()
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
