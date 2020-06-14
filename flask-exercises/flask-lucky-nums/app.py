from flask import Flask, render_template, request, jsonify
from werkzeug.datastructures import MultiDict
from forms import InfoForm

import requests

app = Flask(__name__)


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")



@app.route("/api/get-lucky-num", methods=["POST"])
def get_lucky_num():
    data = request.get_json()
    form = InfoForm(MultiDict(mapping=data['data']), csrf_enabled=False)
    if form.validate():
        print(form.data)
        from random import randint
        num = randint(0,100)
        resp = {
            "num": {
                "fact": requests.get(f"http://numbersapi.com/{num}/trivia").text,
                "num": num
            },
            "year": {
                "fact": requests.get(f"http://numbersapi.com/{data['data']['year']}/year").text,
                "year": data['data']['year']
            }
        }

        return jsonify(resp)
    
    else:
        resp = {'errors': {}}
        for error in form.errors:
            resp['errors'][error] = eval(f'form.{error}.errors')[0]
    
        return jsonify(resp)