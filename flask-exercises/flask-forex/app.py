from flask import Flask, session, redirect, url_for, render_template, request, flash
from forms import CurrencyForm
from forex_python.converter import CurrencyCodes, CurrencyRates

app = Flask(__name__)
app.config['SECRET_KEY'] = 'yasosalmenyaebali'


@app.route('/', methods=['GET', 'POST'])
def home():
    """Default home route with conversion form"""

    form = CurrencyForm()

    if form.validate_on_submit():
        session.clear()

        convert_from = form.convert_from.data.upper()
        convert_to = form.convert_to.data.upper()
        amount = form.amount.data
        
        cc = CurrencyCodes()

        for curr in (convert_from, convert_to):
            if not cc.get_currency_name(curr):
                flash(f'Incorrect currency code: {curr}', 'error')
                return redirect(url_for('home'))
        
        if amount < 1:
            flash('Not a valid amount', 'error')
            return redirect(url_for('home'))
                
        symbol = cc.get_symbol(convert_to)

        cr = CurrencyRates()
        
        session['symbol'] = symbol
        session['amount'] = f"{cr.convert(convert_from, convert_to, amount):.2f}"

        return redirect(url_for('converted'))
    
    else:
        return render_template('home.html', form=form)


@app.route('/converted')
def converted():
    """A view for the page where the converted amount is displayed"""

    return render_template('converted.html', symbol=session.get('symbol'), amount=session.get('amount'))