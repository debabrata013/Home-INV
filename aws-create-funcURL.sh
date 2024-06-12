aws lambda create-function-url-config \
--function-name "HomeInventoryFunction" \
--auth-type "NONE" \
--cors '{"AllowOrigins":["*"],"AllowHeaders":["*"],"AllowMethods":["*"],"ExposeHeaders":["*"]}' \
--output "text"