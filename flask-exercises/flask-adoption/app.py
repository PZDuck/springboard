from flask import Flask, session, redirect, url_for, render_template, request, flash
from flask_debugtoolbar import DebugToolbarExtension
from flask_wtf.csrf import CSRFProtect
from models import db, connect_db, Pet
from forms import PetForm, EditPetForm
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/static/images'
ALLOWED_EXTENTIONS = {'jpg', 'png', 'jpeg', 'bmp'}

app = Flask(__name__)

app.debug = True

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'yasosalmenyaebali'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

csrf = CSRFProtect(app)

connect_db(app)
db.create_all()

@app.route('/')
def home():
    pets = Pet.query.all()

    return render_template('home.html', pets=pets)


@app.route('/<int:pet_id>')
def detail_pet(pet_id):
    pet = Pet.query.get(pet_id)
    return render_template('detail_pet.html', pet=pet)


@app.route('/add-pet', methods=['GET', 'POST'])
def add_new_pet():
    form = PetForm()

    if form.validate_on_submit():
        data = {key: value for key, value in form.data.items()}

        if data.get('photo_url') and data.get('photo_file'):
            flash('Enter a valid URL or upload a file, not both', 'danger')
            return render_template('add_pet.html', form=form)
        
        if data.get('photo_file'):
            img_name = data['photo_file'].filename.split('.')
            img_name[0] = data['name']
            data['photo_file'].filename = ".".join(img_name)
            data['photo_file'].save(secure_filename(data['photo_file'].filename))
            data['photo_url'] = data['photo_file'].filename
        
        data.pop('photo_file')
        data.pop('csrf_token')

        new_pet = Pet(**data)

        db.session.add(new_pet)
        db.session.commit()
        
        flash(f'{new_pet.name} is added to list', 'success')

        return redirect(url_for('home'))

    else:
        return render_template('add_pet.html', form=form)


@app.route('/<int:pet_id>/edit-pet', methods=['GET', 'POST'])
def edit_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        data = {key: value for key, value in form.data.items()}
        data.pop('csrf_token')
        for i in data.keys():
            pet.i = data[i]
            print(pet.i)
        
        db.session.add(pet)
        db.session.commit()
        flash(f'{pet.name} is updated', 'success')
        return redirect(f'/{pet.id}')
    
    else:
        return render_template('edit_pet.html', form=form, pet=pet)
