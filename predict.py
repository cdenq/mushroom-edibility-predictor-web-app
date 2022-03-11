import joblib
import os
from main_preprocessing import preprocessing
import supervised_ml
import pandas as pd
from sklearn.preprocessing import StandardScaler
import numpy as np

initial_data = preprocessing()[0]

def make_predictions(data):

    model_results = {'amodelName': [],
                    'bmodelPrediction': [],
                    'cmodelAccuracy': [],
                    'dmodelF1': [],
                    'emodelPrecision': [],
                    'fmodelRecall': []}
    
    print(data)

    data['cap-diameter'] = float(data['cap-diameter'])
    data['stem-height'] = float(data['stem-height'])
    data['stem-width'] = float(data['stem-width'])

    print(data)

    # for feature in data.keys():
    #     if '_' in feature:
    #         renamed_feature = feature.replace('_', '-')
    #         data[renamed_feature] = data.pop(feature)
    #     else:
    #         pass

    input_df = pd.DataFrame(data, index=[0])
    input_dummies = pd.get_dummies(input_df)

    # print(input_dummies.columns)
    # print(initial_data.columns)

    merged_df = initial_data.merge(input_dummies, how = 'outer')
    merged_df.fillna(0.0, inplace = True)
    input_data = merged_df.iloc[1, :].values

    # print(merged_df)
    # print(merged_df.columns)
    # print(input_data)
    # print(len(input_data))

    scaler = StandardScaler()
    X_train = preprocessing()[1]
    # print(len(X_train))
    scaler.fit(X_train)
    # reshaped_data = np.array(input_data).reshape(-1, 1)
    scaled_input_data = scaler.transform([input_data])
    # if not os.path.exists('Main/Resources/Models'):
    #     print("File Error")
    # elif os.path.exists('Main/Resources/Models'):
    #     print("You're dogwater")
    # test = os.listdir('Main/Resources/Models')
    # print(test)

    for index, file in enumerate(os.listdir('static/models/')):
        # print(file)
        filename = os.fsdecode(file)
        # print(filename)
        model_list = ['Extremely Random Forest', 'K-Nearest Neighbor', 'Logistic Regression', 'Random Forest Classifier', 'SVM']
        model = joblib.load('Main/Resources/Models/' + filename)
        prediction = model.predict(scaled_input_data)
        # print(prediction)
        model_scores = supervised_ml.model_score(model)
        model_scores = [float(score) for score in model_scores]
        model_results['amodelName'].append(model_list[index])
        model_results['bmodelPrediction'].append(float(prediction[0]))
        model_results['cmodelAccuracy'].append(model_scores[0])
        model_results['dmodelF1'].append(model_scores[1])
        model_results['emodelPrecision'].append(model_scores[2])
        model_results['fmodelRecall'].append(model_scores[3])
    # print(model_results)
    return model_results