echo "Now read README.md and setup another deploy environments variables."
echo "It seems like values must be:"
echo ""
echo "SERVER_USERNAME=$(whoami)  [! MUST BE SECRET VARIABLE !]"
echo "DEPLOY_HOST=$(. ./docker-deploy/.env.host; echo "$DOMAIN_URL")"
echo "PROJECT_PATH=$(pwd)"
echo ""
echo "[press Enter to finish setup]"
read ENTER
