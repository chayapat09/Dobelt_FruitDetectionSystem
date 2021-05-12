#!/usr/bin/env python
# coding: utf-8

# In[25]:


import time
import numpy as np
import pandas as pd 
from keras.preprocessing.image import ImageDataGenerator, load_img
from keras.utils import to_categorical
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import random
import os


# In[26]:


FAST_RUN = False
IMAGE_WIDTH=128
IMAGE_HEIGHT=128
IMAGE_SIZE=(IMAGE_WIDTH, IMAGE_HEIGHT)
IMAGE_CHANNELS=3
batch_size=15



# In[27]:


from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense, Activation, BatchNormalization

startOpenModel = time.time()

model = Sequential()

model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS)))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(512, activation='relu'))
model.add(BatchNormalization())
model.add(Dropout(0.5))
model.add(Dense(2, activation='softmax')) # 2 because we have cat and dog classes

model.compile(loss='categorical_crossentropy', optimizer='rmsprop', metrics=['accuracy'])


model.load_weights('model.h5')

endOpenModel = time.time()
#print("Open Model", endOpenModel - startOpenModel)


# In[28]:
def prediction() :
    test_filenames = os.listdir("./fromPiCamera")
    test_df = pd.DataFrame({
        'filename': test_filenames
    })
    nb_samples = test_df.shape[0]

    test_gen = ImageDataGenerator(rescale=1./255)
    test_generator = test_gen.flow_from_dataframe(
        test_df, 
        "./fromPiCamera", 
        x_col='filename',
        y_col=None,
        class_mode=None,
        target_size=IMAGE_SIZE,
        batch_size=batch_size,
        shuffle=False
    )

#startPredict = time.time()

    predict = model.predict(test_generator, steps=np.ceil(nb_samples/batch_size))

    #endPredict = time.time()
    #print("Predict  time", endPredict - startPredict)
    test_df['category'] = np.argmax(predict, axis=-1)
    test_df = test_df.sort_values("category")
    ans = list()
    ans.append("Cat Coin") if test_df.iloc[0]["category"] == 0 else ans.append("Doge Coin")
    print(ans[0])  


while True :
    x = input()
    prediction()