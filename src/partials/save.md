## Save into the project

Only when the user asks for it, with `--save`, `--save <path>` or in words ("save it to public/hero.png"):

- Use the path given; one that ends in `/` is a folder. Without a path, use the folder this project already keeps such files in ({{folders}}), or `wiro-output/` when there is none.
- Name each file from the request in kebab-case with the extension of its URL, and add `-2`, `-3` for more files. Never overwrite a file that exists: ask first, or add a number.
- Download each file with `curl -fsSL --create-dirs -o "<path>" "<url>"`, then list where each one went. Leave git to the user.
