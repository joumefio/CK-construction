# Spécification : Correction de la page de location d'engins sur mobile

## Introduction

### Problème
La page/section "Location d'engins lourds" du site CAK Construction apparaît vierge ou non affichée correctement sur les appareils mobiles (smartphones et tablettes), alors qu'elle s'affiche normalement sur les ordinateurs de bureau.

### Contexte
CAK Construction est une entreprise de construction et génie civil qui offre trois services principaux :
1. Construction de bâtiments
2. Vente de matériaux de construction (quincaillerie)
3. Location d'engins lourds

Le site web est développé avec HTML, CSS et JavaScript, et la section de location d'engins utilise des fichiers CSS spécifiques (`location.css`) et des ressources multimédia (images, vidéos).

### Objectif
Résoudre le problème d'affichage de la section "Location d'engins lourds" sur les appareils mobiles pour assurer une expérience utilisateur optimale sur toutes les plateformes.

## Glossaire

| Terme | Définition |
|-------|------------|
| **Section Location** | Section HTML avec id `#location-engins` dans index.html |
| **CSS Location** | Fichier `/src/location.css` contenant les styles spécifiques |
| **Mobile** | Appareils avec écrans ≤ 768px (smartphones et tablettes) |
| **Affichage vierge** | Section qui apparaît vide, sans contenu visible |
| **Responsive Design** | Conception adaptative qui s'ajuste aux différentes tailles d'écran |
| **Media Queries** | Règles CSS conditionnelles basées sur les caractéristiques de l'appareil |

## Exigences fonctionnelles

### FR-1 : Diagnostic du problème
**En tant que** développeur,  
**je veux** identifier la cause racine du problème d'affichage mobile,  
**afin de** appliquer les corrections appropriées.

**Critères d'acceptation :**
1. Analyser le code HTML de la section `#location-engins` dans index.html
2. Examiner le fichier `location.css` pour détecter les erreurs de syntaxe ou de logique
3. Vérifier les chemins des ressources (images, vidéos, CSS) 
4. Tester l'affichage sur différentes tailles d'écran (émulation)
5. Identifier les conflits de style avec le CSS principal (`style.css`)
6. Documenter les problèmes spécifiques trouvés

### FR-2 : Correction du CSS Responsive
**En tant que** utilisateur mobile,  
**je veux** que la section Location s'affiche correctement sur mon appareil,  
**afin de** consulter les informations sur la location d'engins.

**Critères d'acceptation :**
1. Les media queries dans `location.css` doivent être fonctionnelles
2. Les grilles (`grid`) doivent s'adapter correctement aux petits écrans
3. Les images doivent être redimensionnées proportionnellement
4. Le texte doit rester lisible (taille, contraste)
5. Les boutons doivent être accessibles (taille tactile ≥ 44px)
6. L'espacement doit être adapté aux contraintes mobiles
7. Les vidéos doivent être visibles et contrôlables sur mobile

### FR-3 : Résolution des conflits de styles
**En tant que** développeur,  
**je veux** que les styles de location soient prioritaires sur les styles génériques,  
**afin de** éviter les interférences CSS.

**Critères d'acceptation :**
1. Vérifier la spécificité des sélecteurs CSS
2. S'assurer que `location.css` est chargé après `style.css`
3. Utiliser des classes spécifiques pour éviter les collisions
4. Valider l'absence de `!important` inutiles
5. Tester la superposition des styles dans l'ordre correct

### FR-4 : Gestion des ressources média
**En tant que** utilisateur mobile,  
**je veux** voir les images et vidéos des engins,  
**afin de** visualiser l'équipement disponible.

**Critères d'acceptation :**
1. Les chemins d'images dans `/assets/engins/` doivent être corrects
2. Les vidéos doivent être compressées et formatées pour mobile
3. Utiliser `loading="lazy"` pour les images hors écran
4. S'assurer que `aspect-ratio` fonctionne sur tous les navigateurs
5. Implémenter des fallbacks pour les navigateurs non supportés

### FR-5 : Compatibilité multi-navigateur
**En tant que** utilisateur sur différents navigateurs mobiles,  
**je veux** accéder au contenu quelle que soit mon application,  
**afin de** obtenir l'information de manière fiable.

**Critères d'acceptation :**
1. Tester sur Chrome Mobile, Safari Mobile, Firefox Mobile
2. Vérifier la compatibilité CSS (Flexbox, Grid, aspect-ratio)
3. S'assurer que les propriétés CSS vendeur-prefixées sont présentes si nécessaire
4. Valider le support des fonctionnalités JavaScript (si utilisées)
5. Tester sur différentes versions d'iOS et Android

### FR-6 : Performance mobile
**En tant que** utilisateur avec connexion limitée,  
**je veux** une page qui charge rapidement,  
**afin de** économiser mes données mobiles.

**Critères d'acceptation :**
1. Optimiser la taille des images pour mobile
2. Minifier le CSS de location
3. Éviter les ressources inutiles sur mobile
4. Utiliser le cache du navigateur efficacement
5. Charger les vidéos uniquement au besoin

### FR-7 : Tests et validation
**En tant que** développeur,  
**je veux** m'assurer que la solution fonctionne sur tous les appareils,  
**afin de** garantir une qualité de production.

**Critères d'acceptation :**
1. Effectuer des tests manuels sur plusieurs résolutions
2. Utiliser les outils de développement pour émuler différentes tailles
3. Tester l'orientation portrait et paysage
4. Valider l'accessibilité (contraste, navigation clavier)
5. Vérifier la conformité avec les standards web

## Exigences non fonctionnelles

### NF-1 : Performance
- Le temps de chargement sur mobile 3G doit être ≤ 3 secondes
- Le score Lighthouse Performance doit être ≥ 90 sur mobile
- Le CSS de location ne doit pas dépasser 50KB après minification

### NF-2 : Compatibilité
- Support des navigateurs : Chrome 80+, Safari 13+, Firefox 75+
- Support des systèmes : iOS 12+, Android 8+
- Support des résolutions : 320px à 768px de largeur

### NF-3 : Accessibilité
- Contraste texte/fond ≥ 4.5:1
- Taille de police ≥ 16px pour le contenu principal
- Boutons avec zone tactile ≥ 44×44px
- Navigation possible au clavier et au lecteur d'écran

### NF-4 : Maintenance
- Le code doit être documenté avec des commentaires
- Les changements doivent être réversibles
- La solution doit suivre les conventions CSS existantes
- Les tests doivent être reproductibles

## Contraintes

1. **Conservation de la structure existante** : Les modifications doivent respecter l'architecture HTML actuelle
2. **Compatibilité ascendante** : La solution ne doit pas casser l'affichage desktop
3. **Ressources existantes** : Utiliser les images et vidéos déjà présentes dans `/assets/engins/`
4. **Frameworks** : Pas d'ajout de nouveaux frameworks CSS ou JavaScript
5. **Complexité** : Solution la plus simple possible pour résoudre le problème spécifique

## Hypothèses

1. Le problème est spécifique à la section Location, les autres sections fonctionnent
2. Le site est déployé sur un serveur HTTP standard
3. Les ressources sont accessibles via des chemins relatifs
4. L'utilisateur a JavaScript activé (pour certaines fonctionnalités)
5. Les problèmes peuvent inclure : CSS mal chargé, erreurs de syntaxe, conflits de styles, problèmes de responsive design

## Dépendances

1. Structure HTML de la section Location dans index.html
2. Fichiers CSS existants : `style.css` et `location.css`
3. Ressources médias dans `/assets/engins/`
4. Bibliothèques externes : GSAP (pour animations)

## Livrables

1. Fichier `location.css` corrigé et optimisé pour mobile
2. Modifications HTML si nécessaire dans index.html
3. Documentation des changements effectués
4. Scripts de test ou procédures de validation
5. Guide de déploiement des corrections

## Métriques de succès

1. **Affichage correct** : Section Location visible sur tous les appareils mobiles testés
2. **Performance** : Temps de chargement ≤ 3 secondes sur mobile 3G
3. **Accessibilité** : Score Lighthouse Accessibility ≥ 90
4. **Stabilité** : Aucun conflit avec les autres sections du site
5. **Satisfaction** : Tests utilisateurs confirmant la facilité d'utilisation sur mobile

## Questions ouvertes

1. Quels sont les appareils mobiles spécifiques sur lesquels le problème se manifeste ?
2. Y a-t-il des erreurs JavaScript dans la console des développeurs ?
3. Les chemins des ressources sont-ils corrects sur l'environnement de production ?
4. Y a-t-il des restrictions CORS ou des problèmes de permissions ?
5. Les media queries utilisent-elles les bonnes unités (px vs em) ?

## Prochaines étapes

1. Analyser le code existant pour identifier la cause racine
2. Développer des solutions de correction
3. Tester les corrections sur différentes plateformes
4. Optimiser pour la performance mobile
5. Valider avec des tests utilisateurs