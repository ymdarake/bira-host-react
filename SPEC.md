# アプリケーション仕様書 (SPEC.md)

## 1. 概要
**プロジェクト名**: bira-host-react (ビラホスト)
**目的**: PDFファイル（チラシ、ビラ等）をクラウド上にホストし、管理者がアップロード・管理し、一般ユーザーが閲覧できるWebアプリケーション。

## 2. 機能一覧

### 2.1 一般ユーザー向け機能
*   **ホーム画面 (PDF一覧)**
    *   登録されているPDFを日付順（新しい順）に一覧表示。
    *   日付によるフィルタリング機能（指定日以降のデータを表示）。
*   **詳細画面 (PDF閲覧)**
    *   選択したPDFのプレビュー表示。
    *   ページ送り機能。
    *   全画面表示モード。
    *   PDFファイルのダウンロード機能。
    *   共有用QRコードの表示。

### 2.2 管理者向け機能
*   **ログイン**
    *   Googleアカウントを使用した認証（Firebase Authentication）。
*   **PDFアップロード**
    *   日付を指定してPDFファイルをアップロード。
    *   ファイルサイズ上限: 20MB。
    *   自動的にUUIDベースのファイル名を生成して保存。
*   **PDF管理**
    *   登録済みPDFの日付変更。
    *   登録済みPDFの削除（FirestoreデータとStorageファイルの両方を削除）。

## 3. 技術スタック

*   **フロントエンド**: React 18, TypeScript, Vite
*   **スタイリング**: Tailwind CSS
*   **PDF表示**: react-pdf
*   **その他ライブラリ**: react-router-dom, react-hot-toast, uuid, qrcode.react
*   **バックエンド / インフラ**: Firebase
    *   **Hosting**: 静的ファイルの配信
    *   **Authentication**: Googleログイン認証
    *   **Firestore**: メタデータ管理、管理者権限管理
    *   **Cloud Storage**: PDFファイルの実体保存

## 4. データ構造 (Firestore)

### 4.1 `image` コレクション (PDFデータ)
PDFのメタデータを管理します。
*   `name` (string): Cloud Storage上のファイル名（例: `uuid.pdf`）。
*   `url` (string): Cloud StorageのダウンロードURL。
*   `date` (string): PDFに紐付けられた日付 (`yyyy-MM-dd` 形式)。

### 4.2 `admin` コレクション (管理者データ)
管理者権限を持つユーザーを管理します。
*   `userUid` (string): Firebase AuthenticationのUser UID。
*   **現状の課題**: ドキュメントIDは自動生成されていますが、将来的にUser UIDと一致させることが推奨されています。

## 5. セキュリティ仕様

### 5.1 認証・認可
*   **認証**: Google Providerを使用したFirebase Authentication。
*   **管理者判定**:
    *   フロントエンド: Firestoreの `admin` コレクションに自身のUIDが存在するかチェック。
    *   バックエンド（Firestore/Storage Rules）:
        *   **現状**: ルールファイル内に許可されたUIDをハードコード。
        *   **計画**: `admin` コレクションの参照による動的判定へ移行予定（Custom Claims等の検討含む）。

### 5.2 アクセス制御
*   **読み取り**: 誰でも可能（public）。
*   **書き込み**: 認証済みかつ、管理者リストに含まれるユーザーのみ可能。

## 6. ディレクトリ構造
*   `src/domain/`: ビジネスロジック、データモデル、リポジトリ。
*   `src/view/`: UIコンポーネント、ページ、ルーティング。
*   `src/lib/`: Firebase初期化、ユーティリティ関数。
