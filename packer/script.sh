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
sudo mv ~/webapp1.zip /opt/csye6225/webapp1.zip
sudo mv ~/users.csv /opt/csye6225/users.csv
cd /opt/csye6225 || exit
sudo unzip -o webapp.zip -d webapp
cd /opt/csye6225/webapp || exit
sudo -u csye6225 npm install

sudo cp /opt/csye6225/webapp/webapp.service /etc/systemd/system/webapp.service
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo chmod -R 750 /opt/csye6225/webapp
systemctl daemon-reload
sudo systemctl enable webapp
sudo systemctl start webapp



# sudo unzip /home/admin/webapp1.zip
# sudo mv -i /home/admin/webapp1 root@67.205.157.186:/opt/
# sudo mkdir /home/webapp
# sudo mv /tmp

# sudo mkdir /home/admin/webapp
# sudo mv /home/admin/webapp1.zip /home/admin/webapp/
# cd webapp/ || exit




# sudo unzip webapp1.zip -d /home/ec2-user/webapp
# cd /home/ec2-user/webapp || exit
# sudo -u ec2-user npm install

# source_path="/home/ec2-user/webapp/users.csv"
# destination_path="/opt/"


# # Move the file if it exists
# [ -e "$source_path" ] && sudo mv "$source_path" "$destination_path" && echo "File 'users.csv' moved to '$destination_path'"


# echo "setting up and starting the webapp service"
# sudo cp /home/admin/webapp/packer/webapp.service /etc/systemd/system


