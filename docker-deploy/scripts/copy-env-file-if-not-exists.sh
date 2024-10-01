if [ ! -f .env ]; then
  echo "Let's setup .env file in your project root"
  echo "[Press ENTER]"
  read ENTER

  cp .env.example .env
  nano .env
fi
