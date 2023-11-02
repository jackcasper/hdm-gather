# HDM Gather 

HDM Gather fonctionne sur tous les navigateurs PC (les navigateurs mobiles ne sont actuellement pas pris en charge).

## Construit avec

- [Phaser3](https://github.com/photonstorm/phaser) - Moteur de jeu
- [Colyseus](https://github.com/colyseus/colyseus) - Cadre de serveur basé sur WebSocket
- [React/Redux](https://github.com/facebook/react) - Cadre de travail frontal
- [PeerJS](https://github.com/peers/peerjs) - WebRTC pour le partage de vidéo/écran
- [TypeScript](https://github.com/microsoft/TypeScript) et [ES6](https://github.com/eslint/eslint) - pour les côtés client et serveur

## Contrôles

- `W, A, S, D, ou les touches fléchées` pour se déplacer (le chat vidéo commencera si vous êtes proche de quelqu'un d'autre)
- `E` pour s'asseoir
- `R` pour utiliser l'ordinateur (pour le partage d'écran)
- `Entrée` pour ouvrir le chat
- `ESC` pour fermer le chat

## Conditions préalables

Vous devez avoir installé [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/).

## Démarrage

Pour démarrer un serveur, utilisez cette commande :

```bash
cd server
yarn && yarn start
```

Pour démarrer un client, utilisez cette commande :

```bash
cd client
yarn && yarn dev
```