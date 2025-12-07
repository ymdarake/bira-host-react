# コードスタイル・規約

## TypeScript/React

- ES modules (import/export) を使用
- 関数コンポーネントを使用
- TypeScriptの厳格モード

## ESLint設定

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-react-hooks` recommended
- `eslint-plugin-react-refresh`
- `react-hooks/exhaustive-deps`: warn

## Prettier

デフォルト設定（`.prettierrc`は空オブジェクト）

## スタイリング

- Tailwind CSS を使用
- カスタムCSSは `src/style/` 配下

## 命名規則

- コンポーネント: PascalCase（例: `PDFViewer.tsx`）
- ユーティリティ関数: camelCase（例: `biraFromDoc`）
- 定数: UPPER_SNAKE_CASE（例: `COLLECTION_PATH`）
- ファイル名: 
  - コンポーネント: PascalCase
  - その他: camelCase

## ディレクトリ構造パターン

```
src/
├── domain/          # ドメインモデルとリポジトリ
│   └── [entity]/
│       ├── model.ts      # インターフェース定義
│       └── repository.ts # データアクセス
├── lib/             # インフラ層（Firebase等）
└── view/            # UIレイヤー
    ├── page/        # ページコンポーネント
    ├── component/   # 共通コンポーネント
    ├── context/     # Reactコンテキスト
    └── layout/      # レイアウト
```
