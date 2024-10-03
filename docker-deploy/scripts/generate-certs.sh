if [ "$(. "docker-deploy/$1"; echo "$ENABLE_HTTPS")" = "true" ]; then
  cd docker-deploy || exit
  docker compose --env-file "$1" --env-file ../.env down
  docker compose --env-file "$1" --env-file ../.env up -d nginx-certbot
  docker compose --env-file "$1" --env-file ../.env run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d "$(. "$1"; echo "$DOMAIN_URL")"
  sudo chmod ugo+rwx -R ./certbot-"$1"/;
else
  echo "If you want to get certificates, you must set ENABLE_HTTPS in '$1' to 'true' value firstly.";
fi
