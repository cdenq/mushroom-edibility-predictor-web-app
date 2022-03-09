# import joblib
# import os
# from supervised_ml import score, variables

# #save models into a list
# model_results = {'modelName': [],
#                 'modelPrediction': [],
#                 'modelAccuracy': []}

# for key, file in enumerate(os.listdir('Main/Resources/Models')):
#     filename = os.fsdecode(file)
#     print(filename)
#     model_name = filename.split(sep = '.')[0]
#     print(model_name)
#     model_list = ['Extreme Random Forest', 'K-Nearest Neighbor', 'Logistic Regression', 'Random Forest Classifier', 'SVM']
#     model = joblib.load('Main/Resources/Models/' + filename)
#     model_results['modelName'].append(model_list[key])
#     model_results['modelPrediction'].append('y')
#     model_results['modelAccuracy'].append(50)
 
# print(model_results)

# model_list = ['Extreme Random Forest', 'K-Nearest Neighbor', 'Logistic Regression', 'Random Forest Classifier', 'SVM']
# model_scores = []

# def make_predictions(data):

#     model_results = {'modelName': [],
#                     'modelPrediction': [],
#                     'modelAccuracy': []}

#     X = []
#     print(data)


#     for key, file in enumerate(os.listdir('Main/Resources/Models')):
#         filename = os.fsdecode(file)
#         model_list = ['Extreme Random Forest', 'K-Nearest Neighbor', 'Logistic Regression', 'Random Forest Classifier', 'SVM']
#         model = joblib.load('Main/Resources/Models/' + filename)
#         prediction = model.predict(data)
#         model_results['modelName'].append(model_list[key])
#         model_results['modelPrediction'].append(prediction[0])
#         model_results['modelAccuracy'].append('placeholder')

#     return model_results, data

def make_predictions(data):
    if (data):
        model_results = {'modelName': ['Extremely Random Forest','K-Nearest Neighbor'],
                    'modelPrediction': ["edible",'inedible'],
                    'modelAccuracy': [89,98]}
        return(model_results)