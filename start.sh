echo "---------- Installing dependencies ----------" &&
npm install &&
echo "---------- Precompiling assets ----------" &&
npm run build &&
echo "---------- Starting web server ----------" &&
NODE_ENV=production npm start
