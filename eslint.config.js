// If using ES modules and "type": "module" in package.json:
import tsParser from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                // If needed, specify project, etc.
            }
        },
        rules: {
            // Your linting rules go here
        }
    }
];
