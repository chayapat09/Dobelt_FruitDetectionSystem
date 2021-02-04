# RUN SCRIPT
This script can be copied to Cloud/Edge Server to automatically start a server
only one file needed for start a entire server

## Cloud + Dashboard
- MongoDB is requried on host machine

Development server can be run by
1. created a new empty folder
2. copied rundev.sh into that folder
3. run these script in (bash) terminal
```
sh rundev.sh
```

or can be run using single command sh file will automatically downloaded
```
curl -o start-dev-dobelt-cloud.sh https://raw.githubusercontent.com/chayapat09/Dobelt_FruitDetectionSystem/master/run-script/rundev.sh && sh start-dev-dobelt-cloud.sh
```

Production server can be run by
1. created a new empty folder
2. copied run.sh into that folder
3. run these script in (bash) terminal
```
sh run.sh
```

or can be run using single command sh file will automatically downloaded
```
curl -o start-dobelt-cloud.sh.sh https://raw.githubusercontent.com/chayapat09/Dobelt_FruitDetectionSystem/master/run-script/run.sh && sh start-dobelt-cloud.sh
```
# Note : 
- start server again in old folder only step 3 is required
- server is automatically update with repository when step 3 is execute