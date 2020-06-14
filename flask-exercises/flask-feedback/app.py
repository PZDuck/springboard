"""Feedback Flask app."""

from flask import Flask, render_template, redirect, session, url_for
from werkzeug.exceptions import Unauthorized

from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "neponyalsijuahuel"

connect_db(app)


@app.route("/")
def homepage():
    return redirect(url_for("register"))


@app.route('/register', methods=['GET', 'POST'])
def register():
    
    if "username" in session:
        return redirect(url_for("detail_user", username=session['username']))

    form = RegisterForm()

    if form.validate_on_submit():
        data = {key: value for key, value in form.data.items() if key != 'csrf_token'}

        user = User.register(**data)

        session['username'] = user.username

        db.session.add(user)
        db.session.commit()

        return redirect(url_for("detail_user", username=session['username']))

    else:
        return render_template("users/register.html", form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():

    if "username" in session:
        return redirect(url_for("detail_user", username=session['username']))

    form = LoginForm()

    if form.validate_on_submit():
        data = {key: value for key, value in form.data.items() if key != 'csrf_token'}

        user = User.authenticate(**data)
        
        if user:
            session['username'] = user.username
            return redirect(url_for("detail_user", username=session['username']))
        
        else:
            form.username.errors = ["Invalid username/password."]
            return render_template("users/login.html", form=form)

    return render_template("users/login.html", form=form)


@app.route("/logout")
def logout():
    session.pop("username")
    return redirect("/login")


@app.route("/users/<username>")
def detail_user(username):

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.get(username)

    form = DeleteForm()

    return render_template("users/show.html", user=user, form=form)


@app.route("/users/<username>/delete", methods=["POST"])
def remove_user(username):

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.get(username)

    db.session.delete(user)
    db.session.commit()
    session.pop("username")

    return redirect(url_for("login"))


@app.route("/users/<username>/feedback/new", methods=["GET", "POST"])
def new_feedback(username):

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    form = FeedbackForm()

    if form.validate_on_submit():
        data = {key: value for key, value in form.data.items() if key != 'csrf_token'}
        data['username'] = session['username']

        feedback = Feedback(**data)

        db.session.add(feedback)
        db.session.commit()

        return redirect(url_for("detail_user", username=session['username']))

    else:
        return render_template("feedback/new.html", form=form)


@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def update_feedback(feedback_id):

    feedback = Feedback.query.get(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        form.populate_obj(feedback)

        db.session.commit()

        return redirect(url_for("users", username=session['username']))

    return render_template("/feedback/edit.html", form=form, feedback=feedback)


@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):

    feedback = Feedback.query.get(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(url_for("detail_user", username=session['username']))
