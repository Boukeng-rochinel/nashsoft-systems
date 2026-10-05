# Nashsoft Systems — site web

IDEAS · CODE · SOLUTIONS — site de Nashsoft Systems (Douala), en production sur https://nashsoft.orviat.com.

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · React Router · Framer Motion · React Hook Form + Zod.

## Démarrage

```bash
npm ci
cp .env.example .env.local   # puis renseigner les valeurs utiles
npm run dev                  # http://localhost:5173 (sert aussi /api/chat et /api/contact)
```

| Script | Rôle |
| --- | --- |
| `npm run build` | Typecheck + build du site dans `dist/` (avec `sitemap.xml` et une page HTML par route) |
| `npm run build:server` | Build de l’API Node dans `dist-server/` |
| `npm run start:server` | Lance l’API (`/api/contact`, `/api/chat`) en lisant `.env` |
| `npm run lint` / `npm run typecheck` | Vérifications |

## Variables d’environnement

Voir [.env.example](.env.example). Les variables `VITE_*` sont **intégrées au build** : elles doivent être présentes dans `.env` **avant** `npm run build`. Les autres (secrets) ne sont lues que par l’API et ne doivent jamais être préfixées par `VITE_`.

| Variable | Où | Rôle |
| --- | --- | --- |
| `VITE_CONTACT_ENDPOINT` | build | `/api/contact` en production. Vide ⇒ les formulaires ouvrent un e-mail pré-rempli (mailto), sans captcha. |
| `VITE_TURNSTILE_SITE_KEY` | build | Clé publique Cloudflare Turnstile (captcha) |
| `TURNSTILE_SECRET_KEY` | API | Clé secrète Turnstile — vérification côté serveur |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | API | Compte SMTP qui envoie les demandes |
| `CONTACT_TO`, `CONTACT_FROM` | API | Destinataire et expéditeur (par défaut `SMTP_USER`) |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | API | Assistant du site |
| `API_PORT`, `API_HOST` | API | Écoute de l’API (défaut `127.0.0.1:3001`) |

## Formulaires de contact et captcha

Les formulaires « Démarrer un projet » et « Contact » sont protégés par [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (gratuit, généralement invisible pour les visiteurs) :

1. le widget Turnstile produit un jeton à usage unique dans le navigateur ;
2. `POST /api/contact` envoie le formulaire + le jeton ;
3. l’API ([server/contact.ts](server/contact.ts)) vérifie le jeton auprès de Cloudflare, revalide les champs avec les mêmes schémas Zod que le site, limite à 5 envois / 10 min par IP, filtre le champ piège (honeypot), puis envoie l’e-mail via SMTP avec `Reply-To` = l’adresse du visiteur.

Sans jeton valide, rien n’est envoyé — un bot qui appelle l’API directement est bloqué.

**Créer les clés :** dash.cloudflare.com → Turnstile → *Add widget* → domaine `nashsoft.orviat.com` (ajouter `localhost` pour les tests) → mode *Managed*. Pour tester en local, les clés de test Cloudflare sont indiquées dans `.env.example`.

## Déploiement sur le VPS

```bash
cd ~/tthh/nash/nashsoft-systems
git pull
npm ci
npm run build          # site → dist/
npm run build:server   # API → dist-server/
sudo systemctl restart nashsoft-api
```

### Service systemd pour l’API

`/etc/systemd/system/nashsoft-api.service` :

```ini
[Unit]
Description=Nashsoft Systems API (contact + chat)
After=network.target

[Service]
User=it
WorkingDirectory=/home/it/tthh/nash/nashsoft-systems
ExecStart=/usr/bin/node --env-file=.env dist-server/index.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now nashsoft-api
journalctl -u nashsoft-api -f   # logs
```

### Nginx

```nginx
server {
    server_name nashsoft.orviat.com;
    root /home/it/tthh/nash/nashsoft-systems/dist;
    index index.html;

    # API Node (captcha + SMTP, assistant)
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;   # utilisé pour la limite par IP
        client_max_body_size 64k;
    }

    # Fichiers versionnés par Vite : cache long
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Chaque route a son propre index.html (titre, description, Open Graph) ;
    # les URL inconnues retombent sur l’application (page 404).
    location / {
        try_files $uri $uri/index.html /index.html;
    }

    # listen 443 ssl; … (certificat géré par certbot)
}
```

## SEO et indexation Google

Le build génère automatiquement, à partir de [src/data/seo.ts](src/data/seo.ts) :

- `dist/sitemap.xml` — toutes les pages indexables (services, projets, articles inclus) ;
- `dist/<route>/index.html` — une page par route avec titre, description, URL canonique et balises Open Graph/Twitter déjà présents dans le HTML (Google et les aperçus WhatsApp/LinkedIn/Facebook les lisent sans exécuter le JavaScript) ;
- `robots.txt` pointe vers le sitemap ; `index.html` contient les données structurées `Organization` (schema.org).

Une nouvelle page, un projet ou un article ajouté dans `src/data/` apparaît automatiquement dans le sitemap au prochain build.

**Soumettre le site à Google :**

1. Ouvrir [Google Search Console](https://search.google.com/search-console) → *Ajouter une propriété*.
2. Choisir **Préfixe d’URL** → `https://nashsoft.orviat.com/` (ou **Domaine** si vous gérez le DNS de `orviat.com`).
3. Vérifier la propriété : enregistrement DNS TXT (propriété *Domaine*), ou fichier HTML fourni par Google à déposer dans `public/` puis redéployer (propriété *Préfixe d’URL*).
4. Menu **Sitemaps** → saisir `sitemap.xml` → *Envoyer*.
5. Optionnel : **Inspection de l’URL** → coller l’URL d’une page importante → *Demander l’indexation*.

L’indexation prend généralement de quelques jours à quelques semaines. Le rapport *Pages* de Search Console indique ensuite les pages indexées et les éventuels problèmes.
