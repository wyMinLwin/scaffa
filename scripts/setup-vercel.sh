#!/bin/bash

# chmod +x scripts/setup-vercel.sh
# ./scripts/setup-vercel.sh
# Script to set up Vercel projects for all templates
# Run this script once to initialize all Vercel projects

echo "Setting up Vercel projects for Scaffa templates..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to setup a Vercel project
setup_vercel_project() {
    local project_path=$1
    local project_name=$2
    
    echo -e "${YELLOW}Setting up Vercel project: $project_name${NC}"
    
    cd "$project_path" || {
        echo -e "${RED}Error: Could not change to directory $project_path${NC}"
        return 1
    }
    
    # Check if vercel.json exists
    if [ ! -f "vercel.json" ]; then
        echo -e "${RED}Error: vercel.json not found in $project_path${NC}"
        return 1
    fi
    
    # Initialize Vercel project
    echo "Initializing Vercel project..."
    vercel --confirm
    
    # Link to existing project or create new one
    echo "Linking Vercel project..."
    vercel link --confirm
    
    echo -e "${GREEN}✓ Successfully set up $project_name${NC}"
    echo ""
    
    cd - > /dev/null
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI is not installed. Installing...${NC}"
    pnpm add -g vercel@latest
fi

# Check if user is logged in to Vercel
echo "Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}Please log in to Vercel:${NC}"
    vercel login
fi

# Setup each template project
echo -e "${YELLOW}Setting up all template projects...${NC}"
echo ""

setup_vercel_project "packages/create-scaffa/templates/react/backbone" "scaffa-react-backbone"
setup_vercel_project "packages/create-scaffa/templates/react/colorful" "scaffa-react-colorful"
setup_vercel_project "packages/create-scaffa/templates/vue" "scaffa-vue"

echo -e "${GREEN}All Vercel projects have been set up!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Add your VERCEL_TOKEN to GitHub repository secrets"
echo "2. Make sure each project is properly configured in Vercel dashboard"
echo "3. Test the deployment by pushing changes to the main branch"
echo ""
echo -e "${YELLOW}To get your Vercel token:${NC}"
echo "1. Go to https://vercel.com/account/tokens"
echo "2. Create a new token"
echo "3. Add it as VERCEL_TOKEN in your GitHub repository secrets"
