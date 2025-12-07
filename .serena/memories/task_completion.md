# タスク完了時のチェックリスト

## 必須

1. **Lintチェック**
   ```bash
   npm run lint
   ```

2. **ビルド確認**
   ```bash
   make build
   ```

## 推奨

3. **開発サーバーで動作確認**
   ```bash
   make dev
   ```

## デプロイ前

4. **環境設定の確認**
   - `bira-host-ts`でプロジェクト検索し、正しい環境を指しているか確認
   - ローカル開発時は`cors.json`のoriginに`"*"`があるか確認

5. **Firebase設定確認**
   ```bash
   firebase use
   ```

6. **ルールの変更がある場合**
   ```bash
   make deploy-rules
   ```
