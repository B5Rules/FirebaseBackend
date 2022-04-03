import {getAuth,onAuthStateChanged} from 'firebase/auth'

const requireSignIn = document.getElementsByClassName('requireSignIn');
const requireSignOut = document.getElementsByClassName('requireSignOut');
const auth = getAuth();
onAuthStateChanged(getAuth(),user=>{    
    //if user is signed in, show the sign out button and the other signed-in-only elements
    if(!!auth.currentUser){
        for(let element of requireSignIn){element.classList.remove('w3-hide');}
        for(let element of requireSignOut){element.classList.add('w3-hide');}
        if(!auth.currentUser.emailVerified){
            document.getElementById('btnSendVerificationEmail').classList.remove('w3-hide');
        }else{
            document.getElementById('btnSendVerificationEmail').classList.add('w3-hide');
        }
    }else{
        for(let element of requireSignIn){element.classList.add('w3-hide');}
        for(let element of requireSignOut){element.classList.remove('w3-hide');}
        //TODO: Reset clientside data HERE if needed

    }
});

