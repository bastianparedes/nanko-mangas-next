# Nanko mangas
Store created using NextJS 14, tRPC, Postgres and Dropbox API

### Environment variables
Variable | Mandatory | Description
--- | --- | ---
EMAIL | No | Emeil sender and receiver
EMAIL_PASSWORD | No | Password no hashed. Mandatory if EMAIL
PHONE_NUMBER | No | Number for WhatsApp
--- | --- | ---
ADMIN_USER | Yes | User for admin
ADMIN_PASSWORD | Yes | Password no hashed for admin
--- | --- | ---
NEXTAUTH_SECRET | Yes | Password for JWT
NEXTAUTH_URL | Yes | Domain
--- | --- | ---
DATABASE_URL | Yes | URI for postgres
--- | --- | ---
DROPBOX_APP_KEY | Yes | Dropbox ap key from app
DROPBOX_APP_SECRET | Yes | Dropbox ap secret from app
DROPBOX_REFRESH_TOKEN | Yes | Dropbox refresh token from app
--- | --- | ---
basePath | No | Base path for NextJS
