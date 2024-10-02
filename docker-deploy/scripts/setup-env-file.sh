cp --no-clobber ./docker-deploy/"$1".example ./docker-deploy/"$1"
echo ""
echo "You must edit $1 file."
echo "Set right API_HOST - it's host of backend. If backend deployed in local docker - it's the name of docker container"
echo "Set right API_PORT - it's port of backend"
echo "Set right ENABLE_HTTPS (true or false)"
echo "Set right PORT_HTTP and PORT_HTTPS - (if you don't need https, set any number that > 8000 and < 64000)"
echo "Set right DEPLOY_BRANCH (if it's not 'main')"
echo "[press Enter...]"
read ENTER
nano ./docker-deploy/"$1"
sudo chmod ugo+rwx -R ./docker-deploy/"$1"

echo ""
echo "Is your backend deployed on this computer or docker-cluster in docker container? (y/N): "
read USER_ANSWER
cat ./docker-deploy/docker-compose.template.yaml > ./docker-deploy/docker-compose.yaml
if [[ $USER_ANSWER == "Y" ]] || [[ $USER_ANSWER == "y" ]] || [[ $USER_ANSWER == "yes" ]] || [[ $USER_ANSWER == "Yes" ]] || [[ $USER_ANSWER == "YES" ]]
then
  echo "Enter the backend container network name (you can edit it after this setting at bottom of docker-compose.yml): "
  read USER_ANSWER
  echo "    external:
      name: $USER_ANSWER" >> ./docker-deploy/docker-compose.yaml
fi
