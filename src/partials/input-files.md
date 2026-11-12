## Input files

- File fields take public http(s) links. Put each link straight into the field the schema names: one URL for a single file field, an array for a combined field (`combinefileinput`), and comma-separated URLs in the matching `...UrlMultiple` field for a multi-file field.
- For a file in this project, upload it to Wiro when `WIRO_API_KEY` is set in the shell, then use the link it returns (`list[0].url`, files up to 100 MB):

  ```bash
  curl -fsS -X POST "https://api.wiro.ai/v1/File/Upload" \
    -H "x-api-key: $WIRO_API_KEY" -F "file=@path/to/file"
  ```

  When `WIRO_API_SECRET` is set too, the project signs its requests: compute `NONCE=$(date +%s)` and `SIG=$(printf '%s' "$WIRO_API_SECRET$NONCE" | openssl dgst -sha256 -hmac "$WIRO_API_KEY" | awk '{print $NF}')` in the same command and add `-H "x-nonce: $NONCE" -H "x-signature: $SIG"`.
- Never print the key, and never ask the user to paste a key into the chat. Without a key in the shell, ask the user for a public link to the file. A file that was only attached to the chat has no link either: ask for one.
