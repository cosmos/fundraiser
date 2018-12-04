terragrunt = {
  terraform {
    source = "git::ssh://git@github.com/tendermint/devops.git//iac/src/modules/website"
  }

  remote_state {
    backend = "s3"

    config {
      bucket         = "${get_env("STATE_BUCKET", "not_valid")}"
      region         = "us-east-1"
      key            = "${get_env("TF_VAR_WEBSITE_FQDN", "not_valid")}/terraform.tfstate"
      encrypt        = true
      dynamodb_table = "${get_env("DYNAMODB_LOCK", "not_valid")}"
    }
  }
}
