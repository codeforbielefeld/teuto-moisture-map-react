# Output value definitions

output "distribution_url" {
  description = "URL of the distrubution"
  value       = aws_cloudfront_distribution.cf_distribution.domain_name
}

output "distrubution_id" {
  description = "Distribution ID"
  value       = aws_cloudfront_distribution.cf_distribution.id

}

output "frontend_bucket" {
  description = "S3 Bucket"
  value       = aws_s3_bucket.frontend_bucket.id

}

output "frontend_deploy_role" {
  description = "Deploy role for the website"
  value       = aws_iam_role.frontend_deploy_role.arn

}
