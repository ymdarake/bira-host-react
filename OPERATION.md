# 運用手順書 (OPERATION.md)

## 1. 開発環境セットアップ

### 必要ツール
*   Node.js (v20推奨)
*   npm
*   make
*   Firebase CLI (`npm install -g firebase-tools`)
*   Python 3 (gsutilコマンド用)

### 初回セットアップ
```bash
# 依存パッケージのインストール
npm install

# Firebaseへのログイン
firebase login

# プロジェクトの選択
firebase use bira-host-ts
```

### 環境変数の設定
`.env` ファイルを作成し、以下のFirebase設定値を記述します（値はFirebaseコンソールから取得）。
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 2. 開発・デプロイコマンド

Makefileにより、主要な操作がコマンド化されています。

| コマンド | 説明 | 備考 |
| :--- | :--- | :--- |
| `make dev` | ローカル開発サーバー起動 | `http://localhost:5173` |
| `make build` | 本番用ビルド | `dist/` ディレクトリ生成 |
| `make deploy` | Hostingへのデプロイ | フロントエンドのみ |
| `make build-deploy` | ビルドしてHostingへデプロイ | 推奨 |
| `make deploy-rules` | Firestore/Storageルールのデプロイ | セキュリティルール変更時 |
| `make cors` | Cloud StorageのCORS設定反映 | PDF閲覧エラー時などに実行 |

## 3. 管理者ユーザーの追加・削除手順

**現状（ハードコード運用）の場合:**
1.  `firestore.rules` と `storage.rules` を開き、`allow write` の条件部分に対象ユーザーのUIDを追加（または削除）します。
    ```javascript
    // firestore.rules / storage.rules
    (request.auth.uid == 'EXISTING_UID' || request.auth.uid == 'NEW_UID')
    ```
2.  以下のコマンドでルールを適用します。
    ```bash
    make deploy-rules
    ```
3.  Firestoreの `admin` コレクションに、同ユーザーのドキュメントを追加します（フロントエンドの表示制御用）。
    *   フィールド: `userUid` = 対象のUID

**将来（動的運用へ移行後）:**
1.  FirebaseコンソールのFirestore画面を開きます。
2.  `admin` コレクションに新しいドキュメントを追加します。
    *   **ドキュメントID**: 対象ユーザーのUID
    *   フィールド: 不要（IDのみで判定可能にする場合）

## 4. トラブルシューティング

### PDFが表示されない / CORSエラー
*   `make cors` を実行して、CORS設定を再適用してください。
*   `cors.json` にローカル開発環境のオリジン（例: `http://localhost:5173`）が含まれているか確認してください。

### ログインしてもアップロードボタンが出ない
*   Firestoreの `admin` コレクションに、自分のUIDを持つドキュメントが存在するか確認してください。
*   `src/lib/auth.ts` の `isAdmin` ロジックが、Firestoreのデータと整合しているか確認してください。

### デプロイしたが反映されない
*   ブラウザのキャッシュを削除（スーパーリロード）してみてください。
*   `make build-deploy` を実行したか（ただの `deploy` だと古いビルドが飛ぶ可能性があります）確認してください。
