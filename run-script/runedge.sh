#!/bin/bash

rm -rf Dobelt_FruitDetectionSystem
git clone https://github.com/chayapat09/Dobelt_FruitDetectionSystem.git

cd Dobelt_FruitDetectionSystem/server/edge-server
npm install
npm run start:dev