# 開発コマンド

## 基本コマンド

```bash
# 依存パッケージインストール
npm i

# 開発サーバー起動
make dev
# または: npm run dev

# ビルド
make build
# または: npm run build

# Lint
npm run lint

# プレビュー（ビルド後）
npm run preview
```

## Firebase関連

```bash
# Firebaseにログイン
firebase login

# Firebaseプロジェクトの選択
firebase use <プロジェクト名>

# Hostingデプロイ
make deploy

# ビルド＆デプロイ
make build-deploy

# Firestore/Storageルールのデプロイ
make deploy-rules

# Cloud Storage CORS設定
make cors
```

## Git関連（Darwin/macOS）

```bash
git status
git log --oneline -10
git diff
```

## ファイル操作（Darwin/macOS）

```bash
ls -la
find . -name "*.ts"
grep -r "検索文字列" src/
```
