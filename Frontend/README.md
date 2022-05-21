# Frontend

### How to do initial setup

1. Run `yarn install`
2. Go to `globals/firebase.js` and change the following line with your internal IP (run `ipconfig` on windows or `ifconfig` if you are on UNIX) and get the IP that starts with `192.168.x.x` or `10.10.x.x`
```
  const origin = "10.10.x.x";
```
3. Run `npm run start`
