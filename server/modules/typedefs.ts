// src/schema/index.ts
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";
import path from "path";

/**
 * do this manual dirname with es type "module" set in package.json
 */
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Load and merge all .graphql files
const typesArray = loadFilesSync(path.join(__dirname, "./**/*.graphql"));
export default mergeTypeDefs(typesArray);
