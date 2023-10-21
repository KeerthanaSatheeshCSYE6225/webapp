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



source "amazon-ebs" "debian-mywebapp" {
  ami_users = ["835050451967", "007647970566"]
  //profile         = "${var.aws_profile}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "Debian AMI for CSYE 6225"
  instance_type   = "t2.micro"
  region          = "${var.aws_regions}"
  source_ami      = "${var.source_ami}"
  ssh_username    = "${var.ssh_username}"
  subnet_id       = "${var.subnet_id}"
  ssh_agent_auth  = false

  launch_block_device_mappings {
    device_name           = "/dev/xvda"
    delete_on_termination = true
    volume_size           = 8
    volume_type           = "gp2"

  }
}

locals {
  script_content = file("./script.sh")
}


build {
  name    = "my-first-build"
  sources = ["source.amazon-ebs.debian-mywebapp"]

  provisioner "file" {
    source      = "/home/runner/work/webapp/webapp/webapp1.zip"
    destination = "/home/admin/webapp1.zip"
  }


  // provisioner "file" {
  //   source      = "/home/runner/work/webapp/webapp/webapp1/users.csv"
  //   destination = "/opt/users.csv"
  // }

  // provisioner "file" {
  //   source      = ["package.json", "package-lock.json"]
  //   destination = "/tmp/"
  // }


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
