##Coding CONVENTION##
This file explains the format at which data flows in and out of the application and some useful tips that will help and make all of us understand backend(API) communication with applications

###Parameters to be passed to home.html (alert page) in form of JSON for the API###

##HOME ALERTS##
---Param names---
userId
userName
userAvatar
datePosted
alertId
alertTitle
alertImage
alertDescription
alertLocation
alertTimeStarted
alertTimeCurrent
alertAreaAffected
alertDiagnosesCount
alertWatchCount

---JSON flow format---
[{"alerts":
{"user": 
{"id": "", "name": "", "avatar": ""},
"id": "", "datePosted": "", "title": "", "image": "", "description": "", "location": "", "timeStarted": "", "timeCurrent": "", "areaAffected": "", "diagnosesCount": "", "watchCount": ""
}}]

----local file-----
server/alerts.json
