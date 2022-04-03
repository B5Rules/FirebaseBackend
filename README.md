# FirebaseBackend 
Requirements: npm, git, and being a collaborator on the b5-uberelectric Firebase project  
 
development Setup:  
Make a fork of this repo. Then, on your computer:  
  
git clone https://github.com/B5Rules/FirebaseBackend  
cd UberElectricFirebase  
git init  
git remote add origin https://github.com/[YOURUSERNAME]/FirebaseBackend  
git pull origin master  
  
npm install firebase firebase-cli --save  
npm install react --save  
npm install webpack webpack-cli -D  
  
firebase init  
 -authenticate with Firebase,  
 -select firestore and hosting without github deploys,  
 -use an existing project,  
 -b5-uberelectric,  
 -enter  
 -enter  
 -enter  
 -type "n" then enter  
 -type "n" then enter  
DONE  
  
Now write your code. To test it, run "npm run build" and access access localhost:5000 in a browser to see your work of art  
When you want to commit, do:  
  
git add src  
git add public  
git add package.json  
git add webpack.config.js  
git commit  
git push --set-upstream origin master  
