"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request, render_template
from models import connect_db, db, Cupcake
from forms import CupcakeForm, SearchForm
from flask_wtf.csrf import CSRFProtect
import api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'ebatmoyhuy'

connect_db(app)
db.create_all()

csrf = CSRFProtect(app)


@app.route('/api/cupcakes')
def list_cupcakes():
    if 'flavor' in request.args:
        flavor = request.args['flavor'].lower()
        if flavor == 'all':
            cupcakes = Cupcake.query.all()
        else:
            cupcakes = Cupcake.query.filter(Cupcake.flavor.ilike(f"%{flavor}%")).all()
    else:
        cupcakes = Cupcake.query.all()

    c = [cupcake.serialize() for cupcake in cupcakes]
    return jsonify({'cupcakes': c})


@app.route('/api/cupcakes/<int:c_id>')
def detail_cupcake(c_id):
    cupcake = Cupcake.query.get_or_404(c_id)
    return jsonify({'cupcake': cupcake.serialize()})


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    new_cupcake = Cupcake(**request.get_json())
    
    db.session.add(new_cupcake)
    db.session.commit()

    return jsonify({'cupcake': new_cupcake.serialize()}), 201


@app.route('/api/cupcakes/<int:c_id>', methods=['PATCH'])
def edit_cupcake(c_id):
    cupcake = Cupcake.query.get_or_404(c_id)
    for key, value in request.get_json().items():
        setattr(cupcake, key, value)

    db.session.commit()

    return jsonify({'cupcake': cupcake.serialize()})


@app.route('/api/cupcakes/<int:c_id>', methods=['DELETE'])
@csrf.exempt
def delete_cupcake(c_id):
    cupcake = Cupcake.query.get_or_404(c_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify({'message': 'Deleted'})



@app.route('/', methods=['GET', 'POST'])
def home():
    cupcakes = Cupcake.query.all()

    form = CupcakeForm()
    search_form = SearchForm()

    if form.validate_on_submit():
        print("hi")
        return render_template('index.html', cupcakes=cupcakes, form=form, search_form=search_form)
    else:
        print("Validation failed")


    return render_template('index.html', cupcakes=cupcakes, form=form, search_form=search_form)

@app.route('/search', methods=['GET', 'POST'])
def search():
    form = SearchForm()
    return render_template('search.html', form=form)