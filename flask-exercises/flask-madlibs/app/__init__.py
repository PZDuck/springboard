from flask import Flask, render_template, request, redirect, url_for

from app import stories

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def start():
    return render_template('form.html')


@app.route('/story')
def story():
    words = [i for i in request.args.values()]
    story = stories.generate(words)
    return render_template('story.html', story=story)


@app.route('/story/create', methods=['GET'])
def create_story_form():
    return render_template('create_story.html')


@app.route('/story/create', methods=['POST'])
def create_story():
    story_parts = request.form.to_dict()
    stories.add_story(story_parts)
    return redirect(url_for('start'))
