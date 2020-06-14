from flask import Flask, request
import operations as mth

app = Flask(__name__)

@app.route('/add')
def add_page():
    return str(mth.add(int(request.args.get('a')), int(request.args.get('b'))))

@app.route('/sub')
def sub_page():
    return str(mth.sub(int(request.args.get('a')), int(request.args.get('b'))))

@app.route('/mult')
def mult_page():
    return str(mth.mult(int(request.args.get('a')), int(request.args.get('b'))))

@app.route('/div')
def div_page():
    return str(mth.div(int(request.args.get('a')), int(request.args.get('b'))))

@app.route('/math/<oper>')
def math_page(oper):
    operations = {
        'add': mth.add,
        'sub': mth.sub,
        'mult': mth.mult,
        'div': mth.div
    }

    return str(operations[oper](int(request.args.get('a')), int(request.args.get('b'))))

