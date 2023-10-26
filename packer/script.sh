#!/bin/bash
sudo apt-get update
sudo apt-get upgrade -y


# Install MySQL
sudo apt-get install -y nodejs npm unzip
sudo apt install -y mariadb-server
sudo apt install unzip

# Create a database
sudo mysql -u root -pKaran@123 <<EOF
CREATE DATABASE cloud_db;
EOF

# Grant user privileges
sudo mysql -u root -pKaran@123 <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Karan@123'; 
GRANT ALL PRIVILEGES ON cloud_db.* TO 'root'@'localhost' IDENTIFIED BY 'Karan@123';
FLUSH PRIVILEGES;
EOF

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
sudo apt install -y nodejs npm unzip
cd /opt || exit
mkdir csye6225
sudo mv ~/webapp.zip /opt/csye6225/webapp.zip

cd /opt/csye6225 || exit
sudo unzip -o webapp.zip -d webapp
sudo mv /opt/csye6225/webapp/users.csv /opt/csye6225/users.csv
cd /opt/csye6225/webapp || exit
sudo -u csye6225 npm install

sudo cp /opt/csye6225/webapp/webapp.service /etc/systemd/system/webapp.service
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 750 /opt/csye6225/webapp
systemctl daemon-reload
sudo systemctl enable webapp
sudo systemctl start webapp