Requirements: Node.JS  
  
Rulati pentru instalare globala:  
npm install -g yarn firebase-tools expo expo-cli

Dupa clonarea fork-ului vostru, rulati in folderul local:  
yarn install

Pentru instalarea de pachete noi, rulati  
expo install \[nume_pachet\]

inainte de a testa Firebase functions, rulati:  
firebase init functions  

Si dati enter pana la final  
  
Inainte de a porni mediul de development, rulati ifconfig(pe Linux) sau ipconfig(pe Windows) si treceti adresa locala in variabila origin din firebase.js  
  
Pentru a porni mediul de development, rulati, in doua terminale separate  
firebase serve --only functions -o \[adresa locala gasita mai sus\]  
expo start  