import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./server/modules/**/typedefs/*.graphql",
  generates: {
    "./server/types/resolver.types.ts": {
      config: {
        useIndexSignature: true,
        mappers: {
          User: "../types/schema.types.js#UserDbObject",
          Transaction: "../types/schema.types.js#TransactionDbObject",
        },
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./server/types/schema.types.ts": {
      plugins: ["typescript", "typescript-mongodb"],
    },
  },
};

export default config;
