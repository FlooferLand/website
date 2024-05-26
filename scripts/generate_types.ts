// #!/bin/bun

import { $ } from "bun";
import { categoriesArray } from "../src/lib/posts";
import path from "path";

const rootDir = (await ($`pwd`).text()).trim();

// Post types
const code = /*ts*/`
    // This file is generated via a script

    export type PostCategory = ${categoriesArray.map(v => `"${v}"`).join(" | ")};
    export type PostTag = ${categoriesArray.map(v => `"${v}"`).join(" | ")};
`;
Bun.write(
    Bun.file(path.join(rootDir, "src/lib/generated/types.ts")),
    code.split('\n').map(e => e.trim()).join('\n').trim() + '\n'
)
