packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9" # Debian 12
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-093c4cd4a21589af4"
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "debian" {
  ami_name      = "webapp-api-debian-aws_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  instance_type = "t2.micro"
  region        = "us-east-1"
  ami_users     = ["835050451967", "007647970566"]
  // ami_users = [var.dev_id, var.demo_id]
  // ami_users = ]
  source_ami_filter {
    filters = {
      name                = "debian-12-amd64-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }

  ssh_username = "admin"
}

locals {
  script_content = file("./script.sh")
}


build {
  sources = ["source.amazon-ebs.debian"]

  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp1.zip"
    destination = "/home/admin/webapp1.zip"
  }


  provisioner "file" {
    source      = "users.csv"
    destination = "/tmp/users.csv"
  }

  provisioner "file" {
    source      = ["package.json", "package-lock.json"]
    destination = "/tmp/"
  }


  provisioner "shell" {
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1"
    ]
    inline = [
      local.script_content
    ]
  }
}
