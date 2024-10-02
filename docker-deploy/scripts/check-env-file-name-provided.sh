if [ "$1" = "" ]; then
  echo ""
  echo "--------------------------------------------------------"
  echo "! Please run this command with providing ENV_FILE_NAME !"
  echo "Example: make update ENV_FILE_NAME=.env.[app-name]"
  echo "--------------------------------------------------------"
  echo ""
  exit;
fi
