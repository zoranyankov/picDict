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
$ npm start

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
     ├── PicWords
     |   ├── All PicWords
     |   ├── Find PicWord (searched in PexelWord)
     |   └── Create PicWord
     ├── Profile
     |   └── Created PicWords
     |       ├── Edit PicWord
     |       └── Delete PicWord
     └── Logout
```

Guest page
----------

Not logged users can see the Welcome page and the About page - with ability to register or login (if already have an account).


<!-- ![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618060032/GuestPage_ppysym.png) -->


User page
---------

Logged in users can navigate through header-navigation menu. All PicWords is populated only when there is created PicWords in the database - if not? - be the first to create some. Find PexelWord helps you in an easy and straight-forward way to find new pictures to be used.


<!-- ![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618059650/UserPage_fgvedj.png) -->

Logged in users has also access to a Profile page which has an options to shows a list with created form current user PicWords. Every PicWord in the list has creaton date/time. Every PicWord has also Edit and Delete buttons for managing the current PicWord.


<!-- ![alt text](https://res.cloudinary.com/softquizy/image/upload/c_scale,w_600/v1618059654/ProfilePage_cejqo5.png) -->


Notes
---------


All images used in the application are stored via claud-base platform for image and video managing service called Claudinary. More info at the link below:

[Claudinary](https://cloudinary.com/)
