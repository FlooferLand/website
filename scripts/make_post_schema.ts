// #!/bin/bun

import { $ } from "bun";
import { postCategories } from "../src/lib/posts";
import path from "path";

const fileName = "post_metadata.json";

const template = {
    $schema: "https://json-schema.org/draft-07/schema",
    $id: path.basename(fileName),
    title: path.basename(fileName),
    description: "The schema used for all the posts on this site.",
    type: "object",
    default: {},
    required: [
        "title",
        "desc",
        "date",
        "category"
    ],
    additionalProperties: true,
    properties: {
        title: {
            title: "The title of the post",
            description: "An explanation about the purpose of this post.",
            type: "string"
        },
        desc: {
            description: "The description of the post",
            type: "string"
        },
        date: {
            description: "The date the post released on",
            type: "string",
            pattern: regexToJson(/\b(0[1-9]|[12][0-9]|30)\/(0[1-9]|1[0-2])\/\d{4}\b/g)
        },
        category: {
            description: "The category of the blog",
            type: "string",
            enum: postCategories
        },
        keywords: {
            description: "The keywords assigned to this blog",
            type: "array",
            maxItems: 10,
            items: {
                type: "string",
                enum: postCategories
            }
        },
        published: {
            description: "Whenever the blog is visible or not",
            type: "boolean",
            default: true
        }
    }
};

// Utility
function regexToJson(regex: RegExp) : string {
    return `${regex.source}`;
}

// Writing the JSON
const rootDir = (await ($`pwd`).text()).trim();
const postsDir = path.join(rootDir, "src/posts/")
const schemaPath = path.join(postsDir, fileName);
await Bun.write(
    Bun.file(schemaPath),
    JSON.stringify(template, null, 4)
);

// Validating YAML
const yamlConfig = /*yaml*/`
    extends: default
    rules:
        document-start: disable
`;

await $`yamllint ${postsDir} -d ${yamlConfig}`;

// for (const filePath of recursiveReadDir(postsDir)) {
//     const ext = path.extname(filePath).replaceAll('.', "").toLowerCase();
//     if (!["yml", "yaml"].includes(ext)) continue;
// }
