#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
sudo apt-get update
sudo apt-get upgrade -y

# Install MySQL
sudo apt-get install -y nodejs npm unzip
sudo npm install -g nodemon

sudo apt install -y mariadb-server

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225
 
sudo mkdir -p /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl/

sudo mkdir /opt/csye6225/webapp

sudo mv ~/webapp1.zip /opt/csye6225/webapp/
cd /opt/csye6225/webapp || exit 
sudo unzip -o webapp1.zip

sudo npm install
 
sudo cp /opt/csye6225/webapp/webapp.service /etc/systemd/system/webapp.service
cd webapp || exit
source_path="/opt/csye6225/webapp/users.csv"
destination_path="/opt/csye6225/"

# Move the file if it exists
[ -e "$source_path" ] && sudo mv "$source_path" "$destination_path" && echo "File 'users.csv' moved to '$destination_path'"

 
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp/
sudo chmod -R 750 /opt/csye6225/webapp/

sudo systemctl daemon-reload
sudo systemctl enable webapp

sudo systemctl start webapp

sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb -P /tmp/
sudo dpkg -i /tmp/amazon-cloudwatch-agent.deb
sudo cp /opt/csye6225/webapp/cloudwatch-config.json /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl/
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl/cloudwatch-config.json

sudo systemctl restart amazon-cloudwatch-agent

