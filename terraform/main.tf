terraform {
  backend "s3" {
    bucket = "code4bielefeld-tmm-frontend-terraform"
    key    = "frontend.tfstate"
    region = "eu-central-1"
  }

  required_providers {
    aws = {
      version = ">= 5.12.0"
      source  = "hashicorp/aws"
    }
  }
}
