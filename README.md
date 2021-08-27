# PicDict

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

# Have Fun and learn English words with PicWord Angular App

A JavaScript application built with Angular. It offers Guest and User page views. You can view and create "PicWords" (a Picture with Word cards) and learn English words in a funny way. If you want to create a new "PicWord", but you don't have an idea where to get a picture from, then in help comes the build in search functionality to get pictures for you from external REST-API covered by www.pexels.com - only by giving word as search criteria (so easy).

Own created PicWords are stored in Node.js Back-end with Mongo DB – Express and Mongoose are used.

[Go to Pexels](https://www.pexels.com/)

[Try PicWord (live demo)](https://picdict.netlify.app/)

Getting Started
---------------

```shell
$ git clone https://github.com/davidrayoussef/react-quiz.git

For client side
$ cd client
$ npm install
$ ng serve

For server side
$ cd server
$ npm install
$ npm start

```

App Structure
-------------

```
PicDictApp
├───Guest
|    ├── Welcome page
|    ├── Login
|    ├── Register
|    └── About
└─── User
     ├── Welcome page
     ├── Test (Option to test yourself)
     ├── PicWords Menu
     |   ├── All PicWords
     |   ├── Find PexelWord (searched in PexelWord)
     |   └── Create PicWord
     ├── Profile Page // still not implemented! (TODO...)
     |   ├──Profile Page
     |   ├── Profile PicWords (Created from current user PicWords)
     |   |   ├── Edit PicWord
     |   |   └── Delete PicWord
     |   └── Profile Results (List of Tables with Test Results)
     └── Logout
```

Guest page
----------


Not logged users can see the Welcome page and the About page - with ability to register or login (if already have an account).


![alt text](https://res.cloudinary.com/dwacfzgzg/image/upload/v1628196258/GitHub%20ScreenShots/guest_3_tihdrc.png)


User page
---------

Logged in users can navigate through header-navigation menu. All PicWords page is populated only when there is created PicWords in the database - if not? - be the first to create some. Find PexelWord helps you in an easy and straight-forward way to find new pictures to be used.


![alt text](https://res.cloudinary.com/dwacfzgzg/image/upload/v1630097793/GitHub%20ScreenShots/all_pws_new_2_cixhqk.png)

Logged in users have also access to a Profile page which has an options to shows a list with created from current user PicWords and Results from the Tests in table view. 

![alt text](https://res.cloudinary.com/dwacfzgzg/image/upload/v1630097322/GitHub%20ScreenShots/profile_picwords_ecjlhb.png)

Every PicWord in the Profile PicWords list has creaton date/time and after choose (by click) - user has the options to Edit or Delete the current PicWord.
There is also option to search in the list.

![alt text](https://res.cloudinary.com/dwacfzgzg/image/upload/v1630097793/GitHub%20ScreenShots/edit_delete_w2qkf4.png)

In the Test Result page the results are listed sorted by date of Test completion. After click a pretty color table is opened with the result  details.

![alt text](https://res.cloudinary.com/dwacfzgzg/image/upload/v1630097321/GitHub%20ScreenShots/profile_results_tzsa9k.png)

Notes
---------


All images used in the application are stored via claud-base platform for image and video managing service called Claudinary. More info at the link below:

[Claudinary](https://cloudinary.com/)
