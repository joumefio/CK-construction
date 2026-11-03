# Implementation Plan: Correction de la page de location d'engins sur mobile

## Overview

Le site CAK Construction présente un problème critique : la section "Location d'engins lourds" (#location-engins) apparaît vide ou mal affichée sur les appareils mobiles. Cette spécification décrit le plan d'implémentation pour diagnostiquer et résoudre ce problème, en se concentrant sur le CSS responsive, les media queries, l'optimisation des ressources et la compatibilité multi-navigateurs.

## Tasks

- [ ] 1. Diagnostic du problème d'affichage mobile  
  **ID:** `diagnostic`  
  **Type:** analysis  
  **Status:** not_started  
  **Dependencies:** none  
  **Requirement:** FR-1

  **Action Items:**
  1. Vérifier que le fichier `/src/location.css` est correctement référencé dans le `<head>` de index.html
  2. Analyser les erreurs dans la console DevTools sur différentes résolutions mobiles (320px, 375px, 768px)
  3. Tester les chemins des ressources (images dans `/assets/engins/`, vidéo `engin-action.mp4`)
  4. Émuler les appareils iPhone, iPad et Android avec Chrome DevTools Device Toolbar
  5. Capturer des screenshots de l'affichage problématique pour documentation

  **Acceptance Criteria:**
  - ✅ Rapport de diagnostic complet généré avec liste des problèmes identifiés
  - ✅ Validation que `location.css` est chargé et accessible
  - ✅ Screenshots avant correction pour référence future
  - ✅ Identification des media queries défaillantes et conflits CSS

- [ ] 2. Correction du chargement et priorité CSS  
  **ID:** `css-loading-fix`  
  **Type:** implementation  
  **Status:** not_started  
  **Dependencies:** diagnostic  
  **Requirement:** FR-3

  **Action Items:**
  1. Optimiser l'ordre d'inclusion CSS dans index.html (style.css avant location.css)
  2. Ajouter un preload pour `location.css` dans le `<head>`
  3. Minifier le fichier `location.css` en retirant les commentaires et espaces inutiles
  4. Tester le temps de chargement CSS et vérifier l'absence de FOUC (Flash of Unstyled Content)

  **Acceptance Criteria:**
  - ✅ Fichiers CSS chargés dans l'ordre correct (style.css → location.css)
  - ✅ Pas d'erreurs 404 pour les ressources CSS
  - ✅ Temps de chargement CSS ≤ 500ms sur mobile
  - ✅ Validation avec audit Lighthouse Performance

- [ ] 3. Correction et optimisation des media queries  
  **ID:** `media-queries-fix`  
  **Type:** implementation  
  **Status:** not_started  
  **Dependencies:** css-loading-fix  
  **Requirement:** FR-2

  **Action Items:**
  1. Audit complet des media queries existantes dans `location.css`
  2. Renforcer les points de rupture : 1024px (tablette), 768px (mobile), 480px, 360px
  3. Ajouter le support orientation : `@media (max-width: 768px) and (orientation: landscape)`
  4. Corriger les unités responsives (remplacer px fixes par `clamp()` et `vw`)

  **Acceptance Criteria:**
  - ✅ Tous les breakpoints fonctionnels sur 320px à 768px
  - ✅ Affichage correct en orientation portrait et paysage
  - ✅ Unités responsives adaptées (`clamp()`, `vw`, `%`)
  - ✅ Tests sur 5 résolutions différentes validés

- [ ] **Task 4: Optimisation des grilles et layout responsive**  
  **ID:** `grid-layout-fix`  
  **Type:** implementation  
  **Status:** not_started  
  **Dependencies:** media-queries-fix  
  **Requirement:** FR-2

  **Action Items:**
  1. Corriger les grilles responsives : `grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr))`
  2. Ajouter des fallbacks Flexbox pour anciens navigateurs
  3. Optimiser les espacements avec `clamp()` au lieu de valeurs fixes
  4. Gérer l'overflow horizontal avec `overflow-x: hidden` si nécessaire

  **Acceptance Criteria:**
  - ✅ Grilles adaptatives fonctionnelles sur toutes les tailles d'écran
  - ✅ Pas de scroll horizontal non désiré sur mobile
  - ✅ Espacements cohérents entre desktop et mobile
  - ✅ Fallbacks fonctionnels pour navigateurs sans support Grid

- [ ] **Task 5: Optimisation des images et ressources média**  
  **ID:** `media-optimization`  
  **Type:** implementation  
  **Status:** not_started  
  **Dependencies:** grid-layout-fix  
  **Requirement:** FR-4

  **Action Items:**
  1. Optimiser les images des engins (compression sans perte visible)
  2. Implémenter lazy loading : `<img loading="lazy" alt="...">`
  3. Gérer l'aspect-ratio avec `aspect-ratio: 16/10` et fallback padding
  4. Optimiser la vidéo `engin-action.mp4` pour mobile (compression, poster)

  **Acceptance Criteria:**
  - ✅ Images optimisées ≤ 100KB chacune
  - ✅ Lazy loading fonctionnel sur toutes les images
  - ✅ Aspect-ratio préservé sur tous les devices
  - ✅ Vidéo lisible sur connexion 3G mobile

- [ ] **Task 6: Amélioration de l'accessibilité mobile**  
  **ID:** `mobile-accessibility`  
  **Type:** implementation  
  **Status:** not_started  
  **Dependencies:** media-optimization  
  **Requirement:** NF-3

  **Action Items:**
  1. Agrandir les zones tactiles : `min-height: 44px; min-width: 44px`
  2. Améliorer les contrastes (ratio ≥ 4.5:1 texte/fond)
  3. Optimiser la typographie : `font-size: clamp(16px, 1.5vw, 18px)`
  4. Tester la navigation clavier et focus states

  **Acceptance Criteria:**
  - ✅ Taille tactile ≥ 44px sur tous les boutons interactifs
  - ✅ Contraste WCAG AA respecté sur tous les textes
  - ✅ Texte lisible sans zoom obligatoire
  - ✅ Navigation clavier fonctionnelle et logique

- [ ] **Task 7: Tests multi-navigateurs mobiles**  
  **ID:** `cross-browser-testing`  
  **Type:** test  
  **Status:** not_started  
  **Dependencies:** mobile-accessibility  
  **Requirement:** FR-5

  **Action Items:**
  1. Tests Chrome Mobile (Android, iOS via WebKit)
  2. Tests Safari Mobile (iPhone, iPad, iOS 12+)
  3. Tests Firefox Mobile (Android)
  4. Tests autres navigateurs (Samsung Internet si pertinent)

  **Acceptance Criteria:**
  - ✅ Tests validés sur minimum 3 navigateurs mobiles
  - ✅ Compatibilité ≥ 95% des utilisateurs cibles
  - ✅ Documentation des différences entre navigateurs
  - ✅ Correctifs appliqués pour bugs spécifiques

- [ ] **Task 8: Tests de performance mobile**  
  **ID:** `performance-testing`  
  **Type:** test  
  **Status:** not_started  
  **Dependencies:** cross-browser-testing  
  **Requirement:** NF-1

  **Action Items:**
  1. Audit Lighthouse mobile (Performance, Accessibility, Best Practices, SEO)
  2. Mesurer Core Web Vitals (FCP ≤ 2s, LCP ≤ 3s, CLS ≤ 0.1)
  3. Analyser bundle size (CSS total ≤ 100KB)
  4. Tests avec throttling réseau (3G Fast, 4G)

  **Acceptance Criteria:**
  - ✅ Score Lighthouse ≥ 90 sur mobile
  - ✅ Toutes les métriques Core Web Vitals vertes
  - ✅ Bundle size optimisé pour mobile
  - ✅ Performances acceptables sur connexion 3G

- [ ] **Task 9: Tests de régression**  
  **ID:** `regression-testing`  
  **Type:** test  
  **Status:** not_started  
  **Dependencies:** performance-testing  
  **Requirement:** FR-7

  **Action Items:**
  1. Tester que les corrections ne cassent pas les autres sections
  2. Tests responsive complets (320px à 1920px)
  3. Tests utilisateurs simulés (scrolling, clics, navigation)
  4. Tests avec contenu dynamique (images manquantes, JS désactivé)

  **Acceptance Criteria:**
  - ✅ Aucune régression détectée dans les autres sections
  - ✅ Toutes les sections fonctionnelles sur toutes résolutions
  - ✅ Documentation complète des tests effectués
  - ✅ Plan de rollback préparé en cas de problème

- [ ] **Task 10: Déploiement et monitoring**  
  **ID:** `deployment-monitoring`  
  **Type:** deployment  
  **Status:** not_started  
  **Dependencies:** regression-testing  
  **Requirement:** NF-4

  **Action Items:**
  1. Préparer le déploiement (backup, branches Git, documentation)
  2. Déploiement incrémental (staging puis production)
  3. Configurer le monitoring (analytics, error tracking)
  4. Documentation finale (guide maintenance, rollback, contacts)

  **Acceptance Criteria:**
  - ✅ Déploiement réussi sans downtime
  - ✅ Monitoring configuré et fonctionnel
  - ✅ Documentation technique complète
  - ✅ Support prêt pour incidents post-déploiement

## Task Dependency Graph

```json
[
  {
    "id": "diagnostic",
    "name": "Task 1: Diagnostic du problème d'affichage mobile",
    "status": "not_started",
    "type": "analysis",
    "dependencies": []
  },
  {
    "id": "css-loading-fix",
    "name": "Task 2: Correction du chargement et priorité CSS",
    "status": "not_started",
    "type": "implementation",
    "dependencies": ["diagnostic"]
  },
  {
    "id": "media-queries-fix",
    "name": "Task 3: Correction et optimisation des media queries",
    "status": "not_started",
    "type": "implementation",
    "dependencies": ["css-loading-fix"]
  },
  {
    "id": "grid-layout-fix",
    "name": "Task 4: Optimisation des grilles et layout responsive",
    "status": "not_started",
    "type": "implementation",
    "dependencies": ["media-queries-fix"]
  },
  {
    "id": "media-optimization",
    "name": "Task 5: Optimisation des images et ressources média",
    "status": "not_started",
    "type": "implementation",
    "dependencies": ["grid-layout-fix"]
  },
  {
    "id": "mobile-accessibility",
    "name": "Task 6: Amélioration de l'accessibilité mobile",
    "status": "not_started",
    "type": "implementation",
    "dependencies": ["media-optimization"]
  },
  {
    "id": "cross-browser-testing",
    "name": "Task 7: Tests multi-navigateurs mobiles",
    "status": "not_started",
    "type": "test",
    "dependencies": ["mobile-accessibility"]
  },
  {
    "id": "performance-testing",
    "name": "Task 8: Tests de performance mobile",
    "status": "not_started",
    "type": "test",
    "dependencies": ["cross-browser-testing"]
  },
  {
    "id": "regression-testing",
    "name": "Task 9: Tests de régression",
    "status": "not_started",
    "type": "test",
    "dependencies": ["performance-testing"]
  },
  {
    "id": "deployment-monitoring",
    "name": "Task 10: Déploiement et monitoring",
    "status": "not_started",
    "type": "deployment",
    "dependencies": ["regression-testing"]
  }
]
```

## Notes

**Priorité d'exécution:**
1. **Critique** : Tâches 1-3 (diagnostic et corrections de base)
2. **Important** : Tâches 4-6 (optimisations responsive et accessibilité)
3. **Recommandé** : Tâches 7-10 (tests et déploiement)

**Ressources nécessaires:**
- Chrome DevTools pour l'émulation mobile et debugging
- Lighthouse pour les audits de performance
- Outils de compression d'images (Sharp, ImageOptim)
- Navigateurs mobiles physiques ou émulateurs pour tests réels

**Points d'attention:**
- Conserver la compatibilité avec l'affichage desktop existant
- Respecter les conventions CSS du projet existant
- Documenter tous les changements pour faciliter la maintenance
- Tester chaque correction individuellement avant de passer à la suivante

**Risques identifiés:**
1. Conflits CSS avec d'autres sections du site
2. Support navigateur limité pour certaines propriétés CSS modernes
3. Performance dégradée si les images ne sont pas correctement optimisées
4. Problèmes d'accessibilité non détectés lors des tests