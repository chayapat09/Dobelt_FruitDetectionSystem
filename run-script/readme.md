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

or can be run using single command
```
curl -o 41470a612927573a23339e46cbfaad259d1f63f93aee8b12f4e897844674ee8f.sh https://raw.githubusercontent.com/chayapat09/Dobelt_FruitDetectionSystem/master/run-script/rundev.sh && sh 41470a612927573a23339e46cbfaad259d1f63f93aee8b12f4e897844674ee8f.sh
```

Production server can be run by
1. created a new empty folder
2. copied run.sh into that folder
3. run these script in (bash) terminal
```
sh run.sh
```

or can be run using single command
```
curl -o 643249c658042f41ef5a4eef572696c8186190a27131df98a316164b4f2ddcda.sh https://raw.githubusercontent.com/chayapat09/Dobelt_FruitDetectionSystem/master/run-script/run.sh && sh 643249c658042f41ef5a4eef572696c8186190a27131df98a316164b4f2ddcda.sh
```
# Note : 
- start server again in old folder only step 3 is required
- server is automatically update with repository when step 3 is execute