const child = require('child_process');
const json = require('../package.json');

const sh = `

rm -rf ./node_modules

@ant-design/pro-layout @apollo/client @emotion/react @emotion/styled @hookform/resolvers @mui/icons-material @mui/material @sentry/react @sentry/tracing clsx cross-env graphql graphql-tag lodash notistack react react-dom react-hook-form rxjs store subscriptions-transport-ws umi yup

@graphql-codegen/cli @graphql-codegen/introspection @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @types/lodash @types/react @types/react-dom @types/store @typescript-eslint/eslint-plugin @typescript-eslint/parser @umijs/preset-react @umijs/test eslint eslint-config-airbnb eslint-config-prettier eslint-config-react-app eslint-import-resolver-typescript eslint-plugin-babel eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks lint-staged prettier typescript yorkie @graphql-codegen/fragment-matcher

yarn add ${Object.keys(json.dependencies).join(' ')}

yarn add -D ${Object.keys(json.devDependencies).join(' ')}

`;

child.exec(sh, function (err, sto) {
  if (err) {
    console.log(err);
  }
  console.log(sto);
});
