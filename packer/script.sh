#!/bin/bash
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get clean
#!/bin/bash
sudo apt-get update
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
