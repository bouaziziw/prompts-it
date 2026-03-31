# Prompt It - Angular + NestJS + GitHub + Vercel

Ce repo contient:
- Frontend Angular: `apps/frontend`
- Backend NestJS: `apps/backend`

## 1) Prerequis

- Node.js 20+ et npm
- Git
- Vercel CLI (`npm i -g vercel`)
- GitHub CLI (`gh`) optionnel mais recommande

## 2) Installation locale

```bash
npm install
cd apps/frontend && npm install
cd ../backend && npm install
```

## 3) Lancer en local

Backend:

```bash
cd apps/backend
npm run start:dev
```

Frontend:

```bash
cd apps/frontend
npm start
```

- Frontend: `http://localhost:4200`
- API: `http://localhost:3000`

## 4) Variables d'environnement backend

Le backend accepte `CORS_ORIGINS` (liste separee par virgule):

```bash
CORS_ORIGINS=https://frontend-app.vercel.app,http://localhost:4200
```

Cette variable est utilisee dans:
- `apps/backend/src/main.ts`
- `apps/backend/api/index.ts` (runtime Vercel serverless)

## 5) Connexion GitHub

Si `gh` est installe:

```bash
gh auth login
```

Sinon, poussez simplement avec Git:

```bash
git add .
git commit -m "chore: configure angular + nest + vercel"
git push origin main
```

## 6) Deploiement Vercel

Vous avez 2 options.

### Option A (recommandee): 2 projets Vercel (frontend + backend)

1. Sur [Vercel](https://vercel.com), importez le repo GitHub.
2. Creez un projet Frontend avec `Root Directory = apps/frontend`.
3. Creez un projet Backend avec `Root Directory = apps/backend`.
4. Sur le projet backend, ajoutez la variable:
   - `CORS_ORIGINS=https://<frontend-project>.vercel.app,http://localhost:4200`
5. Dans le frontend, configurez l'URL API de prod si necessaire.

### Option B: 1 seul projet Vercel (monorepo)

Le fichier `vercel.json` racine est configure pour builder:
- `apps/frontend` (static build Angular)
- `apps/backend/api/index.ts` (serverless NestJS)

## 7) Commandes utiles Vercel CLI

```bash
vercel login
vercel link
vercel env add CORS_ORIGINS production
vercel --prod
```

## 8) Verification rapide apres deploy

- Le frontend charge correctement sur `https://...vercel.app`
- Les appels `/api/*` retournent des reponses backend
- Le CORS fonctionne (pas d'erreur navigateur)