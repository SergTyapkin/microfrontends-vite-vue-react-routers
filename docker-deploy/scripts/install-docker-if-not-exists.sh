# fully copied from https://docs.docker.com/engine/install/ubuntu/
if ! command -v docker; then
  sudo apt-get update;
  sudo apt-get install -y --no-install-recommended ca-certificates curl;
  sudo install -m 0755 -d /etc/apt/keyrings;
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc;
  sudo chmod a+r /etc/apt/keyrings/docker.asc;
  # Add the repository to Apt sources:
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$${VERSION_CODENAME}") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null;
  sudo apt-get update;
  sudo apt-get install -y --no-install-recommended docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin;
  make set-docker-not-sudo;
else
  echo "Docker already installed!";
fi
