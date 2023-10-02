resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "${local.prefix2}-src"
}

resource "aws_s3_bucket_policy" "cf_distribution_s3_access_policy" {
  policy = data.aws_iam_policy_document.cf_distribution_s3_access_policy.json
  bucket = aws_s3_bucket.frontend_bucket.id
}

data "aws_iam_policy_document" "cf_distribution_s3_access_policy" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cf_distribution.arn]
    }

    actions = ["s3:GetObject"]

    resources = ["${aws_s3_bucket.frontend_bucket.arn}/*"]
  }
}

resource "aws_cloudfront_origin_access_control" "cf_access_control" {
  description                       = "ACL for the ${local.prefix} CF Distribution"
  name                              = aws_s3_bucket.frontend_bucket.bucket_domain_name
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}


resource "aws_cloudfront_distribution" "cf_distribution" {
  comment             = local.prefix
  default_root_object = "index.html"
  enabled             = true
  http_version        = "http2"
  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  retain_on_delete    = false
  staging             = false
  wait_for_deployment = true
  origin {
    connection_attempts      = 3
    connection_timeout       = 10
    domain_name              = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.frontend_bucket.id
    origin_access_control_id = aws_cloudfront_origin_access_control.cf_access_control.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    smooth_streaming       = false
    target_origin_id       = aws_s3_bucket.frontend_bucket.id
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
