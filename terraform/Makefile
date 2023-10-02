ENV ?= dev

.PHONY: plan apply init clean 


plan: $(ENV).tfplan 

$(ENV).tfplan: *.tf *.tfvars .terraform.lock.hcl
	terraform workspace select $(ENV) && \
	terraform plan -var-file terraform.$(ENV).tfvars -out $(ENV).tfplan


apply: $(ENV).tfplan
	terraform workspace select $(ENV) && \
	terraform apply $(ENV).tfplan

init:
	terraform init

clean:
	rm -rf dev.tfplan $(ENV).tfplan