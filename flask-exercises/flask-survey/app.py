from flask import Flask, request, render_template, redirect, session, flash, url_for, make_response
import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'eThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u'

all_surveys = list(surveys.surveys.items())


@app.route('/')
def index():
    return render_template('home.html', all_surveys=all_surveys)


@app.route('/<int:s_id>')
def start_survey(s_id):
    
    session['current_survey'] = all_surveys[s_id][0]
    survey = session['current_survey']

    if request.cookies.get(f"{survey}_submitted"):
        flash("You have already completed this survey")
        return redirect(url_for('index'))

    session['responses'] = []
    return render_template('start_survey.html', survey=all_surveys[s_id], s_id=s_id)


@app.route('/<int:s_id>/question/<int:q_id>', methods=['POST','GET'])
def question(s_id, q_id):
    responses = session['responses']
    
    if request.method == 'GET':
        if q_id != len(responses):
            flash(f"You sneaky hacker, not this time")
            q_id = len(responses)
            return redirect(f"/{s_id}/question/{q_id}")
    
    if request.method == 'POST':
        if len(request.form) == 1:
            responses.append((request.form.get('choice')))
        else:
            responses.append(tuple(request.form.values()))
        session['responses'] = responses

        if q_id == len(all_surveys[s_id][1].questions):
            return redirect(url_for('thanks'))

    return render_template('question.html', survey=all_surveys[s_id], s_id=s_id, q_id=q_id, q_num=len(all_surveys[s_id][1].questions))


@app.route('/thanks')
def thanks():
    survey = session['current_survey']
    responses = session['responses']
    session[survey] = responses
    
    render = render_template('thanks.html')
    response = make_response(render)
    response.set_cookie(f"{survey}_submitted", "true", max_age=60)
    return response