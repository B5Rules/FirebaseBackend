# FirebaseBackend 
Instalati unealta de commandline git sau aplicatia Github
Instalati Node.JS. Daca a fost instalat corect, comanda "npm -v" rulata de oriunde in terminal ar trebui sa arate un numar de versiune

Faceti fork la acest repository
Deschideti folderul unde vreti sa lucrati la proiect

rulati, avand terminalul deschis pe acel folder:
git init
git remote add origin LINK_GITHUB_FORK      (inlocuiti cu link-ul forkului vostru)
git pull origin NUME_BRANCH         (inlocuiti cu numele branch-ului, in functie de ce vreti sa lucrati; le puteti vedea pe Github)

npm install -g firebase-tools
npm install --save
firebase login
firebase init     (folosind sagetile si spacebar, selectati functions, firestore si hosting; dati enter pana la capat)

De fiecare data cand vreti sa faceti modificari, dati

git commit (apoi urmati instructiunile)
git push origin NUME