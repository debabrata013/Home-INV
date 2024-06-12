aws lambda create-function \
--function-name "HomeInventoryFunction" \
--runtime "python3.8" \
--role "arn:aws:iam::579050547695:role/LambdaServiceRole" \
--handler "app.service_handler" \
--zip-file "fileb://home-inv-be.zip" \
--output "text"