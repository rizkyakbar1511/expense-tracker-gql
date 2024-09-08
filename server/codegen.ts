import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./modules/**/typedefs/*.graphql",
  generates: {
    "./types/resolver.types.ts": {
      config: {
        useIndexSignature: true,
        mappers: {
          Transaction: "TransactionDbObject",
          User: "UserDbObject",
        },
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
    },
  },
};

export default config;
