# constant settings
locals {

  name = "tmm_frontend"

  prefix = "${local.name}_${var.env}"

  prefix2 = replace(local.prefix, "_", "-")

  deploy_subject = "repo:codeforbielefeld/teuto-moisture-map-react:environment:aws_${var.env}"

}

variable "env" {
  description = "Environment"
  type        = string
}

variable "deployment_identity_provider" {
  description = "The ARN of the identity provider for the deploy role"
  type = string
}