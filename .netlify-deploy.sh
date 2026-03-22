#!/bin/bash

# DigiGuard - Netlify Hızlı Deploy Script
# Kullanım: bash .netlify-deploy.sh

echo "🚀 DigiGuard - Netlify Deploy Başlatılıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Netlify CLI kontrolü
echo -e "${BLUE}📦 Netlify CLI kontrol ediliyor...${NC}"
if ! command -v netlify &> /dev/null
then
    echo -e "${YELLOW}⚠️  Netlify CLI bulunamadı. Yükleniyor...${NC}"
    npm install -g netlify-cli
    echo -e "${GREEN}✅ Netlify CLI yüklendi${NC}"
else
    echo -e "${GREEN}✅ Netlify CLI zaten yüklü${NC}"
fi
echo ""

# 2. Netlify login kontrolü
echo -e "${BLUE}🔐 Netlify hesabına giriş yapılıyor...${NC}"
netlify status &> /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Netlify'a giriş yapmanız gerekiyor...${NC}"
    netlify login
else
    echo -e "${GREEN}✅ Netlify'a giriş yapıldı${NC}"
fi
echo ""

# 3. Dependencies kontrolü
echo -e "${BLUE}📚 Dependencies kontrol ediliyor...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules bulunamadı. Yükleniyor...${NC}"
    npm install
    echo -e "${GREEN}✅ Dependencies yüklendi${NC}"
else
    echo -e "${GREEN}✅ Dependencies mevcut${NC}"
fi
echo ""

# 4. Build
echo -e "${BLUE}🔨 Proje build ediliyor...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build başarılı${NC}"
else
    echo -e "${RED}❌ Build hatası!${NC}"
    exit 1
fi
echo ""

# 5. Deploy
echo -e "${BLUE}🌐 Netlify'a deploy ediliyor...${NC}"
netlify deploy --prod --dir=dist

echo ""
echo -e "${GREEN}✅ Deploy tamamlandı!${NC}"
echo ""
echo -e "${BLUE}📋 Site bilgileri için:${NC}"
echo "   netlify sites:list"
echo ""
echo -e "${BLUE}🔗 Site açmak için:${NC}"
echo "   netlify open"
echo ""
echo -e "${GREEN}🎉 DigiGuard başarıyla deploy edildi!${NC}"
