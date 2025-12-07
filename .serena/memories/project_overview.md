# プロジェクト概要

## ビラホスト (bira-host-react)

PDFをアップロード・管理するSPAアプリケーション。

### 主な機能
- PDFのアップロード・削除（管理者のみ）
- PDF一覧表示
- PDF詳細表示（react-pdf使用）
- QRコード生成（qrcode.react使用）

### インフラ構成
- **Firebase Hosting**: SPAアプリを配信
- **Firebase Authentication**: 管理者ユーザーの管理
- **Cloud Storage for Firebase**: PDFの保管・配信
- **Firestore**: PDFの保管パス管理、管理者ユーザーのID管理

### 技術スタック
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Firebase SDK
- react-pdf
- qrcode.react
- react-router-dom
- react-hot-toast
