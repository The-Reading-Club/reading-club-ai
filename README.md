# reading-club-ai

https://chat.openai.com/c/3d899e2e-6846-4581-a65c-1ed823434f06

```
pnpm turbo run build

cd packages/core
pnpm pack

cd ..

cd ..

git tag v0.0.2

git push origin v0.0.2

gh release create v0.0.2 ./packages/core/novel-0.1.22.tgz --title "Release v0.0.2" --notes "Initial release of novel package"

yarn add https://github.com/josealvarez97/novel/releases/download/v0.0.2/novel-0.1.22.tgz

```
