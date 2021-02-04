#!/bin/bash

rm -rf Dobelt_FruitDetectionSystem
git clone https://github.com/chayapat09/Dobelt_FruitDetectionSystem.git

cd Dobelt_FruitDetectionSystem/frontend
npm install
npm run-script build
cd ../../

cd Dobelt_FruitDetectionSystem/server/client-endpoints
npm install
npm run-script build
npm start