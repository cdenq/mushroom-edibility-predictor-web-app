#imports
from flask import Flask, render_template, redirect, jsonify
import predict

#create flask instance
app = Flask(__name__)

# Set root route
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict')
def prediction():
    data = predict.make_predictions()
    return jsonify(data)

@app.route('/mushroom_facts')
def facts():
    return render_template('mushroom_facts.html')

@app.route('/compare_models')
def models():
    return render_template('compare_models.html')

@app.route('/about')
def about():
    return render_template('about.html')
   
if __name__ == "__main__":
    app.run(debug=True)