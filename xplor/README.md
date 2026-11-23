# Xplor — portfolio immersif

Xplor est la version exploratoire du portfolio d'Arthur Bayard. Elle présente le parcours et les projets sous la forme d'un décor horizontal inspiré des jeux de plateforme et des metroidvania. Le portfolio responsive classique reste disponible séparément.

## Accéder à l'expérience

Ouvrir [`index.html`](./index.html) pour afficher l'écran de sélection, puis choisir l'un des six univers. Chaque univers est une page indépendante.

Pour tester le site en local, servir le dépôt avec un serveur HTTP statique et ouvrir `/xplor/`. Cela permet notamment de charger correctement les pages et les ressources partagées depuis `assets/`.

## Navigation

- Utiliser la molette ou le pavé tactile pour passer à la zone suivante ou précédente.
- Utiliser les flèches gauche et droite pour avancer ou reculer d'une zone dans le parcours.
- Cliquer sur les liens d'une page pour ouvrir une autre section, un autre univers, le CV ou une ressource externe.
- Utiliser les flèches latérales pour rejoindre l'univers précédent ou suivant.
- Le repère en haut à droite indique la section active, la progression et les commandes de déplacement.

L'interface est conçue principalement pour ordinateur : les commandes de déplacement reposent sur la molette et le clavier. La version responsive du portfolio est accessible depuis le début de chaque univers.

## Univers

| Dossier | Thème | Contenu |
| --- | --- | --- |
| [`jungle/`](./jungle/) | Présentation | Présentation, situation actuelle, objectif professionnel et profils en ligne. |
| [`bones/`](./bones/) | Études | Premiers projets, baccalauréat, BTS SIO et formation RGPD. |
| [`hexagon/`](./hexagon/) | Expériences | Stage, CTF, mission en grande distribution et alternance chez VA Telecom. |
| [`ocean/`](./ocean/) | Projets | Projets playlist, jeu 3D, Loup Garou, templates (à venir) et portfolio. |
| [`snow/`](./snow/) | Veille et intérêts | Découverte du développement, jeux vidéo, judo, randonnée et veille scientifique. |
| [`crystal/`](./crystal/) | Contact | Coordonnées et CV. |

## Organisation technique

Xplor est construit en HTML, CSS et JavaScript, sans dépendance ni étape de compilation.

- `index.html` affiche la sélection des univers.
- Chaque dossier d'univers contient sa page `index.html` et son contenu éditorial.
- Chaque page d'univers déclare ses flèches de navigation en HTML, avec les liens vers l'univers précédent et suivant.
- `../assets/css/accueilXplor.css` met en forme l'écran de sélection.
- `../assets/css/xplor.css` définit le décor, les panneaux de contenu, les thèmes colorés, le repère de progression et les animations.
- `../assets/js/xplor.js` gère le déplacement horizontal, l'animation du personnage, le défilement différentiel des couches de décor, l'actualisation du repère de progression et le positionnement de la flèche suivante.
- `../assets/Landscapes/` contient les illustrations de sélection et les cinq couches de fond de chaque univers.
- `../assets/Fantasy Warrior/` contient les sprites du personnage ; les animations actuellement utilisées sont `Idle.png` et `Run.png`.

Les pages d'univers partagent le même moteur CSS et JavaScript. Pour ajouter ou modifier un univers, créer ou mettre à jour son dossier sous `xplor/`, reprendre la structure d'une page existante, choisir une classe de thème, déclarer ses couches de décor dans `xplor.css` et mettre à jour ses liens de navigation HTML. Ajouter également son lien et son visuel à l'écran de sélection.
