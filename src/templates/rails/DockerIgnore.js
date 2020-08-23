module.exports.default = `
# Ignore all files from .gitignore
# echo .git > .dockerignore && cat .gitignore >> .dockerignore
.git

/log/*
/tmp/*

.byebug_history

public/packs
public/packs-test
public/uploads

node_modules
coverage
yarn-error.log
.DS_Store
`;
