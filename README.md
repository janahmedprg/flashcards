## 1st Place -- Best Use of AI in Education 🐔Hen Hacks 2024🐔
Servers have been shut down because the hackathon is over and we can't pay for the operating costs.


## Inspiration
Our inspiration was fueled by the recent push towards Augmented and Mixed reality coupled with our collegiate desires to make methods of studying more efficient and enjoyable. We were also inspired by a paper from the University of Delawares very own [HCI lab](https://sites.udel.edu/hci-lab/) that highlights the beneficial impacts AI based virtual assistants can have on learning. [arXiv:2306.17278](https://arxiv.org/abs/2306.17278) 

## What it does
Our application empowers students by utilizing Googles Gemini AI to swiftly convert audio files, pdfs, and images into flashcards relating to the inputs subject matter. On top of this, users can also review their <u>flash</u>cards in augmented reality using the Microsoft <u>Holo</u>lens, hence the name of our project <u>"Holo-Flash"</u>. This provides students with a new interactive way to study which that hasn't been exercised much in the past. With this new method of studying students may be more willing to study as it makes the experience simple, fun, and engaging.


## Video Demonstration

[https://devpost.com/software/holoflash](https://devpost.com/software/holoflash)


## How we built it
We started by creating a Python Flask server, deployed on a Debian virtual machine to establish easy isolation between the frontend and backend codebases. On this Debian virtual machine we deployed the Google Cloud Vision API to extract text from images, Google Cloud Speech-to-Text API to transcribe audio files, and Google Gemini to generate flashcards from the extracted text. We also used MongoDB Atlas to store the flashcards and user data. Within the Flask server, we constructed a rich RESTful API so that our frontend could interface with the previously mentioned models as well as our MongoDB Atlas database. 

For the frontend, we created a React app that allows users to upload files to be fed to the models, and subsequently receive their flashcards. We also created a user authentication system, which bridged the gap between our server and React app. Since our app is designed to be an interactive medium for learning, we decided to integrate the Microsoft HoloLens 2 into our project. Using Unity, we created a 3D environment in which our users could use their login credentials to access their flashcards in augmented reality.

## Challenges we ran into

1. **AI Integration**
   1. Google Gemini
      1. How to use the Google Gemini API 
      2. Deploying the Google cloud models on a virtual machine making sure to utilize a C3DAMD Genoa GPU to decrease model runtime to make the user experience more enjoyable.
2. **Backend Development**
   1. MongoDB Atlas
      1. We had to learn how to use MongoDB Atlas to store the flashcards and user data in a secure and efficient manner.
      2. Manipulating the ouptuts of the models to fit into our database schema was difficult to say the least
3. **Frontend Development**
   1. Unity and Augmented Reality
      1. Implementing BackEnd conversation onto an Augmented Reality program supported by a GameEngine
   2. React integration
      1. Creating a user authentication system
      2. Routing webpages and storing components in an organized manner
4. **Time**
   1. We had to learn how to utilize these technologies in harmony in only 24 hours, and none of us slept lol


## Accomplishments that we're proud of

Building a full stack application by using technologies that we discovered the day of the hackathon. We were full stack engineers and that is enough to be proud of.


## What we learned
Major Learnings
1. Full Stack Development
   1. MongoDB Atlas
   2. Google Cloud Platform
   3. Python Flask
2. AI Integration
   1. Google Gemini
   2. ChatGPT API
   3. Google Cloud Speech-to-Text API
   4. Google Cloud Vision API
3. Frontend Development
   1. React
   2. Node.js
   3. Unity
   4. CSS
4. Augmented Reality
   1. Microsoft HoloLens
   2. Unity
   3. C#
5. Version Control
   1. Git
   2. GitHub
6. Teamwork
   1. Communication
   2. Collaboration
   3. Task Delegation
   4. Time Management
   5. Determination


## What's next for HoloFlash

Our next steps would to bring support into Virtual reality, mainly on platforms like the meta quest 3 and meta quest 2.


