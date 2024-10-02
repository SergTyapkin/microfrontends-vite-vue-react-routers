if [ ! -f .env ]; then
  echo "Let's setup .env file in your project root"
  echo "Write right VITE_DOMAIN_URL without https:// and url paths!"
  echo "Write right VITE_CHILD_APP_1_HTTPS (true or false) - it must be equals with ENABLE_HTTPS in '.env.[app-name]' file in './docker-deploy' directory"
  echo "Write right VITE_CHILD_APP_2_HTTPS (true or false) - it must be equals with ENABLE_HTTPS in '.env.[app-name]' file in './docker-deploy' directory"
  echo "Write right VITE_HOST_APP_HTTPS (true or false) - it must be equals with ENABLE_HTTPS in '.env.host' file in './docker-deploy' directory"
  echo "[Press ENTER]"
  read ENTER

  cp .env.example .env
  nano .env
fi
