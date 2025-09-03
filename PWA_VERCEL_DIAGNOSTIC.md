# 🔍 Diagnostic PWA sur Vercel - Usemy

## 🚨 Problème : PWA ne fonctionne pas sur Vercel

### 📋 Checklist de diagnostic

#### 1. **Vérification de l'URL**
- ✅ Votre app est déployée sur Vercel
- ❓ URL : `https://votre-app.vercel.app` (remplacez par votre vraie URL)

#### 2. **Test dans Chrome**
1. **Ouvrez Chrome** (pas Firefox ou Safari)
2. **Allez sur votre URL Vercel**
3. **Ouvrez les DevTools** (F12)
4. **Onglet Application** → **Manifest**
5. **Vérifiez que** :
   - ✅ Le manifest se charge sans erreur
   - ✅ Les icônes sont visibles
   - ✅ `display: standalone` est présent

#### 3. **Test d'installation**
1. **Cliquez sur "Télécharger sur Google Play"**
2. **Que se passe-t-il ?**
   - ✅ Prompt d'installation apparaît
   - ❌ Rien ne se passe
   - ❌ Erreur dans la console

#### 4. **Vérification du Service Worker**
1. **DevTools** → **Application** → **Service Workers**
2. **Vérifiez que** :
   - ✅ Le service worker est actif
   - ✅ Pas d'erreurs dans les logs

## 🔧 Solutions selon le problème

### Problème 1: Pas de prompt d'installation
**Cause** : Le navigateur ne détecte pas l'app comme installable

**Solution** :
```javascript
// Dans la console (F12), tapez :
console.log('Installable:', 'beforeinstallprompt' in window);
console.log('HTTPS:', window.location.protocol === 'https:');
console.log('Service Worker:', 'serviceWorker' in navigator);
```

### Problème 2: Erreur de manifest
**Cause** : Le manifest.json n'est pas accessible

**Solution** :
1. **Vérifiez** `https://votre-app.vercel.app/manifest.json`
2. **Doit retourner** le contenu JSON sans erreur

### Problème 3: Service Worker ne se charge pas
**Cause** : Le service worker n'est pas enregistré

**Solution** :
1. **Vérifiez** `https://votre-app.vercel.app/sw.js`
2. **Doit retourner** le code JavaScript du service worker

## 🚀 Test rapide

### Étape 1: Vérification de base
```bash
# Testez ces URLs (remplacez par votre URL Vercel) :
curl https://votre-app.vercel.app/manifest.json
curl https://votre-app.vercel.app/sw.js
```

### Étape 2: Test d'installation
1. **Ouvrez Chrome** sur votre URL Vercel
2. **F12** → **Console**
3. **Tapez** :
```javascript
// Vérifier l'état PWA
console.log('URL:', window.location.href);
console.log('HTTPS:', window.location.protocol === 'https:');
console.log('Standalone:', window.matchMedia('(display-mode: standalone)').matches);
console.log('Service Worker:', navigator.serviceWorker ? 'Supporté' : 'Non supporté');

// Vérifier le manifest
fetch('/manifest.json')
  .then(r => r.json())
  .then(m => console.log('Manifest:', m))
  .catch(e => console.error('Erreur manifest:', e));
```

### Étape 3: Test d'installation manuelle
```javascript
// Dans la console, forcez l'installation
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW enregistré:', reg))
    .catch(err => console.error('Erreur SW:', err));
}
```

## 🎯 Résultats attendus

### ✅ PWA fonctionne si :
1. **Manifest accessible** : `https://votre-app.vercel.app/manifest.json` retourne du JSON
2. **Service Worker actif** : Visible dans DevTools → Application → Service Workers
3. **Prompt d'installation** : Apparaît quand vous cliquez sur "Télécharger"
4. **Installation réussie** : L'icône apparaît sur le bureau
5. **Lancement PWA** : L'app s'ouvre en mode standalone

### ❌ PWA ne fonctionne pas si :
1. **Erreur 404** sur manifest.json ou sw.js
2. **Erreur CORS** dans la console
3. **Service Worker inactif** ou en erreur
4. **Pas de prompt** d'installation

## 🚨 Solutions d'urgence

### Si rien ne fonctionne :
1. **Vérifiez la build** : `npm run build` fonctionne-t-il ?
2. **Vérifiez le déploiement** : Les fichiers sont-ils bien déployés ?
3. **Testez en local** : `npm run preview` fonctionne-t-il ?

### Redéploiement :
```bash
# Forcer un nouveau déploiement
git add .
git commit -m "Fix PWA"
git push
```

---

**🎯 Objectif** : Identifier exactement où le problème se situe dans votre PWA sur Vercel.
