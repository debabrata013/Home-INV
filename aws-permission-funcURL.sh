aws lambda add-permission \
--function-name "HomeInventoryFunction" \
--action "lambda:invokeFunctionUrl" \
--statement-id "perm-invoke-homeInvFuncURL" \
--principal "*" \
--function-url-auth-type "NONE" \
--output "text"