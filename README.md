## 发布变更

- 运行 `pnpm changeset version` 这将提高先前使用 `pnpm changeset` （以及它们的任何依赖项）的版本，并更新变更日志文件。
- 运行 `pnpm install` 这将更新锁文件并重新构建包。
- 提交更改。
- 运行 `pnpm publish -r` 此命令将发布所有包含被更新版本且尚未出现在包注册源中的包。

## [study-test-demo](https://wjyugutou.github.io/study-test-demo/)
