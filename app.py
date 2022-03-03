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
   
if __name__ == "__main__":
    app.run(debug=True)