#!/bin/sh

# Run this script as sudo to to manually update your environment after homestead is (re)provisioned.  You will need to
# confirm a few questions manually.

echo ""
echo "++++++++++++++++++++++++++++"
echo "STARTING PROVISIONING SCRIPT"
echo "++++++++++++++++++++++++++++"
echo ""
echo ""

echo "export PS1=\"${debian_chroot:+($debian_chroot)}\[\033[01;31m\]\u@\h\[\033[01;35m\] \w \$\[\033[00m\] \"" \
    | tee -a /home/vagrant/.bashrc

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn -y

echo "Updating package information"
sudo apt-get update 1> /dev/null

# Update npm to the latest stable release to fix race-conditions.
sudo npm -g install npm@latest

sudo apt-get install -y php-ssh2

# Rebuild node-sass
sudo chown -R $USER:$(id -gn $USER) /home/vagrant/.config
npm rebuild node-sass

echo "Making the composer directory available"
if [ -d /home/vagrant/.composer/cache ]; then
    chmod -R 0777 /home/vagrant/.composer/cache
fi

sudo service nginx restart
