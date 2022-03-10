import joblib
import os
from main_preprocessing import preprocessing
import supervised_ml
import pandas as pd
initial_data = preprocessing()[0]

# save models into a list
# model_results = {'modelName': [],
#                 'modelPrediction': [],
#                 'modelAccuracy': [],
#                 'modelF1': [],
#                 'modelPrecision': [],
#                 'modelRecall': []}

# for key, file in enumerate(os.listdir('Main/Resources/Models/')):
#     filename = os.fsdecode(file)
#     print(filename)
#     model_name = filename.split(sep = '.')[0]
#     print(model_name)
#     model_list = ['Extreme Random Forest', 'K-Nearest Neighbor', 'Logistic Regression', 'Random Forest Classifier', 'SVM']
#     model = joblib.load('Main/Resources/Models/' + filename)
#     model_scores = supervised_ml.model_score(model)
#     model_results['modelName'].append(model_list[key])
#     model_results['modelPrediction'].append('y')
#     model_results['modelAccuracy'].append(model_scores[0])
#     model_results['modelF1'].append(model_scores[1])
#     model_results['modelPrecision'].append(model_scores[2])
#     model_results['modelRecall'].append(model_scores[3])
 
# print(model_results)

def make_predictions(data):

    model_results = {'amodelName': [],
                    'bmodelPrediction': [],
                    'cmodelAccuracy': [],
                    'dmodelF1': [],
                    'emodelPrecision': [],
                    'fmodelRecall': []}

    X = [] #15 features 
    print(data)
    data['cap_diameter'] = float(data['cap_diameter'])
    data['stem_height'] = float(data['stem_height'])
    data['stem_width'] = float(data['stem_width'])
    print(initial_data)
    for feature in data.keys():
        if '_' in feature:
            renamed_feature = feature.replace('_', '-')
            data[renamed_feature] = data.pop(feature)
        else:
            pass

    input_df = pd.DataFrame(data, index=[0])
    # print(input_df)
    input_dummies = pd.get_dummies(input_df)
    print(input_dummies.columns)
    print(initial_data.columns)
    merged_df = initial_data.merge(input_dummies, how = 'outer')
    print(merged_df)


    for index, file in enumerate(os.listdir('Main/Resources/Models')):
        filename = os.fsdecode(file)
        # model_name = filename.split(sep = '.')[0]
        model_list = ['Extreme Random Forest', 'K-Nearest Neighbor', 'Logistic Regression', 'Random Forest Classifier', 'SVM']
        model = joblib.load('Main/Resources/Models/' + filename)
        # model.predict()
        model_scores = supervised_ml.model_score(model)
        model_results['amodelName'].append(model_list[index])
        model_results['bmodelPrediction'].append('y')
        model_results['cmodelAccuracy'].append(model_scores[0])
        model_results['dmodelF1'].append(model_scores[1])
        model_results['emodelPrecision'].append(model_scores[2])
        model_results['fmodelRecall'].append(model_scores[3])

    return model_results, data