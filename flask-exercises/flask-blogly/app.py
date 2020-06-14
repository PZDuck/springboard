"""Blogly application."""

from flask import Flask, redirect, url_for, render_template, request
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

@app.route('/')
def home():
    posts = Post.query.order_by(Post.created_at.desc()).all()

    return render_template('home.html', posts=posts)


@app.route('/users/')
def list_users():
    users = User.query.order_by('last_name', 'first_name').all()

    return render_template('list_users.html', users=users)


@app.route('/users/new', methods=['GET', 'POST'])
def create_user():

    if request.method == 'GET':
        return render_template('create_user.html')

    elif request.method == 'POST':
        print(request.form)
        fname = request.form['first_name']
        lname = request.form['last_name']
        image = request.form['image_url'] if request.form['image_url'] else None

        new_user = User(first_name=fname, last_name=lname, image_url=image)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('list_users'))


@app.route('/users/<int:user_id>')
def detail_user(user_id):
    user = User.query.get(user_id)
    posts = Post.query.filter(Post.user_id == user_id).all()

    return render_template('detail_user.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    user = User.query.get(user_id)

    if request.method == 'GET':
        return render_template('edit_user.html', user=user)

    elif request.method == 'POST':
        user.first_name = request.form['first_name']
        user.last_name = request.form['last_name']
        user.image_url = request.form['image_url'] if request.form['image_url'] else None

        db.session.commit()

        return redirect(url_for('detail_user', user_id=user_id))


@app.route('/users/<int:user_id>/delete')
def delete_user(user_id):
    user = db.session.query(User).get(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect(url_for('list_users'))


@app.route('/posts/<int:post_id>')
def detail_post(post_id):
    post = Post.query.get_or_404(post_id)

    return render_template('detail_post.html', post=post)


@app.route('/users/<int:user_id>/posts/new', methods=['POST', 'GET'])
def add_new_post(user_id):
    user = User.query.get(user_id)

    if request.method == 'GET':
        tags = Tag.query.all()
        return render_template('create_post.html', user_id=user_id, tags=tags)

    elif request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        tag_ids = [int(num) for num in request.form.getlist("tags")]
        tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
        new_post = Post(title=title, content=content, user=user, tags=tags)
        db.session.add(new_post)
        db.session.commit()

        return redirect(url_for('detail_user', user_id=user_id))


@app.route('/posts/<int:post_id>/edit', methods=['POST', 'GET'])
def edit_post(post_id):
    post = Post.query.get(post_id)

    if request.method == 'GET':
        tags = Tag.query.all()
        return render_template('edit_post.html', post=post, tags=tags)
    
    elif request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']
        tag_ids = [int(tag) for tag in request.form.getlist('tags')]
        post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

        db.session.add(post)
        db.session.commit()

        return redirect(url_for('detail_post', post_id=post_id)) 


@app.route('/posts/<int:post_id>/delete')
def delete_post(post_id):
    post = db.session.query(Post).get(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect(url_for('list_users'))


@app.route('/tags')
def list_tags():
    tags = Tag.query.all()

    return render_template('list_tags.html', tags=tags)


@app.route('/tags/<int:tag_id>')
def detail_tag(tag_id):
    tag = Tag.query.get(tag_id)

    return render_template('detail_tag.html', tag=tag)


@app.route('/tags/new', methods=['POST', 'GET'])
def create_tag():
    posts = Post.query.all()

    if request.method == 'GET':
        return render_template('create_tag.html', posts=posts)
    
    elif request.method == 'POST':
        post_ids = [int(post) for post in request.getlist('posts')]
        name = request.form['name']
        new_tag = Tag(name=name, posts=posts)

        db.session.add(new_tag)
        db.session.commit()

        return redirect(url_for('list_tags'))


@app.route('/tags/<int:tag_id>/edit', methods=['POST', 'GET'])
def edit_tag(tag_id):
    tag = Tag.query.get(tag_id)
    posts = Post.query.all()

    if request.method == 'GET':
        return render_template('edit_tag.html', tag=tag, posts=posts)
    
    elif request.method == 'POST':
        post_ids = [int(post) for post in request.form.getlist('posts')]
        tag.posts = Post.query.filter(Post.id.in_(post_ids)).all()
        tag.name = request.form['name']

        db.session.commit()

        return redirect(url_for('detail_tag', tag_id=tag_id))


@app.route('/tags/<int:tag_id>/delete')
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect(url_for('home'))