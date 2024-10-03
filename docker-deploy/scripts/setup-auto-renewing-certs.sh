if [ "$(. "docker-deploy/$1"; echo "$ENABLE_HTTPS")" = "true" ]; then
  sudo apt-get update
  sudo apt-get install cron
  echo "----------------------------------------------------------------------------------------------"
  echo "Now you must add this string-command in your crontab to auto executing it each 1 month. Command:"
  echo ""
  echo "0 0 1 * * cd $(pwd) && make renew-certs ENV_FILE_NAME=$1 >> ./certbot-renew-$1.log"
  echo ""
  echo "Copy that command and [press Enter]. Then add this string in end of opened file."
  read ENTER
  crontab -e;
else
  echo "If you want to get certificates, you must set ENABLE_HTTPS in '$1' to 'true' value firstly.";
fi
