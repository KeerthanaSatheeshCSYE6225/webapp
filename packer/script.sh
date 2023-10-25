#!/bin/bash
sudo apt-get update
sudo apt-get upgrade -y

# sudo apt-get update
# sudo apt-get -y install mariadb-server

# sudo systemctl enable mariadb
# sudo systemctl start mariadb
# sudo mysql_secure_installation <<EOF

# n
# Karan@123
# Karan@123
# y
# y
# y
# y
# EOF


# # sudo mysql -u root -pKaran@123<<EOF
# # CREATE USER 'keerthana'@'localhost' IDENTIFIED BY 'Karan@123';
# # GRANT ALL PRIVILEGES ON *.* TO 'keerthana'@'localhost';
# # FLUSH PRIVILEGES;
# # CREATE DATABASE cloud_db;
# # USE cloud_db;
# # EOF

# sudo mysql -u root -pKaran@123 -e "CREATE USER 'keerthana'@'localhost' IDENTIFIED BY 'Karan@123';"
# sudo mysql -u root -pKaran@123 -e "CREATE DATABASE cloud_db;"
# sudo mysql -u root -pKaran@123 -e "GRANT ALL PRIVILEGES ON cloud_db.* TO 'keerthana'@'localhost';"
# sudo mysql -u root -pKaran@123 -e "GRANT CREATE ON cloud_db.* TO 'keerthana'@'localhost';"

# sudo systemctl restart mariadb



#!/bin/bash

# Install MySQL
sudo apt-get install -y nodejs npm unzip
sudo apt install -y mariadb-server


# Create a database
sudo mysql -u root -pKaran@123 <<EOF
CREATE DATABASE cloud_db;
EOF

# Grant user privileges
sudo mysql -u root -pKaran@123 <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Karan@123'; 
GRANT ALL PRIVILEGES ON cloud_db.* TO 'keerthana'@'localhost' IDENTIFIED BY 'Karan@123';
FLUSH PRIVILEGES;
EOF



sudo apt install unzip
# sudo unzip /home/admin/webapp1.zip
# sudo mv -i /home/admin/webapp1 root@67.205.157.186:/opt/
# sudo mkdir /home/webapp
# sudo mv /tmp

sudo mkdir /home/admin/webapp
sudo mv /home/admin/webapp1.zip /home/admin/webapp/
cd webapp/ || exit
sudo unzip webapp1.zip
sudo npm i

source_path="/home/admin/webapp/users.csv"
destination_path="/opt/"

source_path="/home/admin/webapp/users.csv"
destination_path="/opt/"

# Move the file if it exists
[ -e "$source_path" ] && sudo mv "$source_path" "$destination_path" && echo "File 'users.csv' moved to '$destination_path'"


