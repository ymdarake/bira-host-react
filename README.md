# ビラホスト

PDFをアップロード、管理するSPAアプリ。

## 目次

1.  [プロジェクト概要](#1-プロジェクト概要)
2.  [アプリケーション仕様書](#2-アプリケーション仕様書)
3.  [運用手順書](#3-運用手順書)
4.  [開発に必要なツール](#4-開発に必要なツール)
5.  [インフラ構成](#5-インフラ構成)
6.  [環境ごとの設定](#6-環境ごとの設定)
7.  [開発で使うコマンド](#7-開発で使うコマンド)

---

## 1. プロジェクト概要
PDFをアップロード、管理するSPAアプリです。主な機能や技術スタックについては、[アプリケーション仕様書](SPEC.md)を参照してください。

## 2. アプリケーション仕様書
詳細なアプリケーションの機能、データ構造、セキュリティ仕様などは、以下のドキュメントを参照してください。

*   [**SPEC.md**](SPEC.md)

## 3. 運用手順書
開発環境のセットアップ、デプロイ手順、管理者追加方法、トラブルシューティングなどの運用に関する情報は、以下のドキュメントを参照してください。

*   [**OPERATION.md**](OPERATION.md)

## 4. 開発に必要なツール
- make
- Node.js
- v20.16.0で開発(適宜アプデ)
- Firebase CLI

## 5. インフラ構成

- Firebase Hosting: SPAアプリを配信
- Firebase Authentication: 管理者ユーザーの管理
- Cloud Storage for Firebase: PDFの保管、配信
- Firestore: PDFの保管パス管理、管理者ユーザーのID管理

## 6. 環境ごとの設定
- `bira-host-ts`でプロジェクト全体検索をして出てくる箇所を、対象のホスト、ストレージに書き換える。

## 7. 開発で使うコマンド

```sh
# 依存パッケージインストール
npm i

# Firebaseにcliでログイン
firebase login

# Firebaseプロジェクトの選択
firebase use <プロジェクト名>

# 開発モードで起動
make dev

# ビルド
make build

# デプロイ
make deploy

# ビルドしてデプロイ
make build-deploy

# Firestore, Cloud Storageのルールのデプロイ
make deploy-rules
# firestore.rules, storage.rulesで、PDFアップロード・削除が出来るユーザーを限定している.
# request.auth.uidはFirebase AuthenticationのユーザーのUID.
########################################

# Cloud StorageのCORS設定のデプロイ
make cors
# ローカル開発中はcors.jsonのoriginに"*"を追加しておくとlocalhostその他からCloud Storage（PDF）にアクセスできるようになる。
########################################
```