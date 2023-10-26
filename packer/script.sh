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

sudo apt-get update
sudo apt-get upgrade -y
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
sudo apt install -y nodejs npm unzip
 
sudo mv ~/webapp1.zip /opt/csye6225/webapp1.zip

cd /opt/csye6225 || exit
sudo unzip -o webapp1.zip -d webapp
sudo cp /opt/csye6225/webapp/webapp.service /etc/systemd/system/webapp.service
cd webapp || exit
source_path="/opt/csye6225/webapp/users.csv"
destination_path="/opt/csye6225/"

# Move the file if it exists
[ -e "$source_path" ] && sudo mv "$source_path" "$destination_path" && echo "File 'users.csv' moved to '$destination_path'"
touch .env
sudo npm i
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 750 /opt/csye6225/webapp
sudo systemctl daemon-reload
sudo systemctl enable webapp
sudo systemctl start webapp

 
