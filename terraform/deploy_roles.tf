resource "aws_iam_role" "frontend_deploy_role" {
  name               = "${local.prefix}_frontend_deploy_role"
  assume_role_policy = data.aws_iam_policy_document.frontend_deploy_assume_role_policy.json
}
data "aws_iam_policy_document" "frontend_deploy_assume_role_policy" {
  version = "2012-10-17"

  statement {
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = [var.deployment_identity_provider]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [local.deploy_subject]
    }
  }
}


resource "aws_iam_role_policy" "frontend_deploy_role_policy" {
  name   = "${local.prefix}_frontend_deploy_role_policy"
  role   = aws_iam_role.frontend_deploy_role.id
  policy = data.aws_iam_policy_document.frontend_deploy_policy.json
}
data "aws_iam_policy_document" "frontend_deploy_policy" {
  version = "2012-10-17"

  statement {
    effect = "Allow"
    actions = [
      "sts:GetCallerIdentity",
    ]
    resources = ["*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation",
    ]
    resources = [aws_s3_bucket.frontend_bucket.arn]
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
    ]
    resources = ["${aws_s3_bucket.frontend_bucket.arn}/*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
    ]
    resources = [aws_cloudfront_distribution.cf_distribution.arn]
  }
}
