# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

PDFをアップロード・管理するSPAアプリ（ビラホスト）。Firebase上で動作し、管理者ユーザーがPDFを管理する。

## 開発コマンド

```bash
# 依存パッケージインストール
npm i

# 開発サーバー起動
make dev

# ビルド
make build

# デプロイ（Hosting）
make deploy

# ビルド＆デプロイ
make build-deploy

# Firestore/Storage ルールのデプロイ
make deploy-rules

# Cloud Storage CORS設定
make cors

# Lint
npm run lint
```

## 技術スタック

- **フレームワーク**: React 18 + TypeScript + Vite
- **スタイリング**: Tailwind CSS
- **バックエンド**: Firebase (Hosting, Authentication, Firestore, Cloud Storage)
- **PDF表示**: react-pdf
- **QRコード生成**: qrcode.react

## アーキテクチャ

```
src/
├── domain/          # ドメインモデルとリポジトリ
│   ├── bira/        # Bira（PDF）エンティティ
│   │   ├── model.ts       # Biraインターフェース定義
│   │   └── repository.ts  # Firestoreへのアクセス（BiraRepository）
│   └── admin/       # 管理者ユーザーエンティティ
│       ├── model.ts       # Userインターフェース定義
│       └── repository.ts
├── lib/             # インフラ層（Firebase関連）
│   ├── firebase.ts  # Firebase初期化
│   ├── storage.ts   # Cloud Storageアクセス（Storageクラス）
│   └── auth.ts      # 認証関連（login, logout, isAdmin等）
└── view/            # UIレイヤー
    ├── App.tsx      # ルーティング設定
    ├── route.ts     # パス定数
    ├── page/        # ページコンポーネント（Home, Login, Upload, Detail）
    ├── component/   # 共通コンポーネント（PDFViewer, DetailOverlay等）
    ├── context/     # Reactコンテキスト（AdminContext）
    └── layout/      # レイアウトコンポーネント
```

## 主要なルート

- `/` - ホーム（PDF一覧）
- `/login` - ログイン
- `/upload` - PDFアップロード（要管理者権限）
- `/detail/:id` - PDF詳細表示

## 環境切り替え

- `bira-host-ts`でプロジェクト全体検索し、対象のホスト・ストレージに書き換える
- ローカル開発時は`cors.json`のoriginに`"*"`を追加

## Firebase設定ファイル

- `firestore.rules` - Firestoreのセキュリティルール
- `storage.rules` - Cloud Storageのセキュリティルール（管理者UIDで制限）
- `cors.json` - Cloud StorageのCORS設定
