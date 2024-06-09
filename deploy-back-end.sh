# Delete existing package
echo "Deleting existing package..."
rm -f home-inv-be.zip

# Build & Package back-end
echo "Building back-end..."
cd back-end
sam build --use-container
cd .aws-sam/build/HomeInventoryFunction
rm -f template.yaml
rm -f README.md
rm -f requirements.txt
echo "Packaging back-end..."
zip -r ../../../../home-inv-be.zip .

# Clean up build files
echo "Cleaning up build files..."
cd /workspace/home-inv-app/back-end
rm -f -R .aws-sam

# Deploy back-end package to AWS Cloud
echo "Deploying back-end package to AWS Cloud..."
cd /workspace/home-inv-app
aws lambda update-function-code \
--function-name "HomeInventoryFunction" \
--zip-file "fileb://home-inv-be.zip" \
--output "text"