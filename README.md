# ToDoリストアプリ

シンプルで使いやすいToDoリスト管理アプリケーションです。Vanilla JavaScriptで構築されており、ブラウザのlocalStorageを使用してデータを永続化します。

## 機能

- ✅ **タスク追加**: 新しいタスクをリストに追加
- ✏️ **タスク編集**: 既存タスクの内容を変更（ダブルクリック）
- ✔️ **タスク完了**: タスクにチェックマークを付けて完了状態に変更
- 🗑️ **タスク削除**: 不要なタスクをリストから削除
- 🔍 **フィルター機能**: 全て・未完了・完了済みでタスクを絞り込み
- 📊 **カウンター表示**: 未完了タスク数の表示
- 💾 **データ永続化**: ブラウザのlocalStorageに自動保存

## 技術仕様

- **HTML5**: セマンティックなマークアップ
- **CSS3**: Flexbox/Gridレイアウト、レスポンシブデザイン
- **Vanilla JavaScript**: ES6+、ライブラリ不使用
- **ブラウザAPI**: localStorage使用

## ブラウザ対応

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- モバイルブラウザ対応

## パフォーマンス

- 1000件のタスクでも快適に動作
- 操作レスポンス: 100ms以下
- 初期読み込み: 1秒以下

## アクセシビリティ

- キーボード操作対応
- スクリーンリーダー対応
- 適切なaria属性の設定

## 使用方法

1. 入力フィールドにタスクを入力してEnterキーまたは追加ボタンをクリック
2. タスクをダブルクリックで編集モード
3. チェックボックスをクリックして完了状態を切り替え
4. ×ボタンでタスクを削除
5. フィルターボタンでタスクを絞り込み

## データ構造

```javascript
const task = {
  id: number,          // 一意のID
  text: string,        // タスクの内容
  completed: boolean,  // 完了状態
  createdAt: Date     // 作成日時
}
```

## カラーパレット

- プライマリ: #007bff（青）
- 成功: #28a745（緑）
- 危険: #dc3545（赤）
- 背景: #f8f9fa（ライトグレー）
- テキスト: #343a40（ダークグレー）

## エラーハンドリング

- localStorage使用不可時の代替処理
- 不正なデータ形式の処理
- ユーザーフレンドリーなエラーメッセージ

## デプロイ

### GitHub Actionsを使用したConoha VPS (AlmaLinux 9)への自動デプロイ

#### 前提条件
- Conoha VPS (AlmaLinux 9)サーバーがセットアップ済み
- Apache (httpd)がインストール済み
- GitHubリポジトリが作成済み
- SELinuxが有効（AlmaLinuxのデフォルト）

#### シンプルなデプロイ設定（環境構築済みの場合）

既にサーバー環境が構築済みの場合は、以下の手順でデプロイを設定できます。

##### 1. サーバー側でリポジトリをクローン

```bash
cd /var/www/vhosts
git clone https://github.com/YOUR_USERNAME/task-manage.git task.sho43.xyz
```

##### 2. GitHub Secretsの設定

GitHubリポジトリの Settings > Secrets and variables > Actions から以下のシークレットを追加：

| Secret Name | 説明 | 例 |
|------------|------|-----|
| `HOST` | サーバーのIPアドレスまたはドメイン | `123.456.789.0` |
| `USERNAME` | SSHユーザー名 | `deploy` |
| `PRIVATE_KEY` | SSHプライベートキー | `-----BEGIN RSA PRIVATE KEY-----...` |
| `PORT` | SSHポート番号 | `22` |

##### 3. デプロイの実行

mainブランチにプッシュすると、自動的に以下が実行されます：
1. サーバーにSSH接続
2. `/var/www/vhosts/task.sho43.xyz`に移動
3. `git pull origin main`で最新コードを取得

#### 詳細なセットアップ（新規環境の場合）

##### 1. deployユーザーの作成

```bash
# rootユーザーで実行
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG apache deploy
sudo mkdir -p /home/deploy/.ssh
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
```

##### 2. SSHキーの生成

```bash
# deployユーザーでログイン
ssh deploy@your-server

# デプロイユーザーのSSHキーを生成（まだない場合）
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 公開鍵を確認
cat ~/.ssh/id_rsa.pub
```

生成した公開鍵を `~/.ssh/authorized_keys` に追加します。

##### 3. プライベートキーの取得

```bash
# deployユーザーでサーバー上で実行
cat /home/deploy/.ssh/id_rsa
```

この内容を GitHub Secrets の `PRIVATE_KEY` に設定します。

##### 4. サーバーの初期セットアップ

提供されている `scripts/setup-server.sh` をサーバーで実行：

```bash
# スクリプトをサーバーにコピー
scp scripts/setup-server.sh deploy@your-server:/tmp/

# サーバーでスクリプトを実行
ssh deploy@your-server
chmod +x /tmp/setup-server.sh
sudo /tmp/setup-server.sh
```

**注意**: スクリプト内の `YOUR_USERNAME` を実際のGitHubユーザー名に置き換えてください。

##### 5. sudoパスワードなしでの実行（deployユーザー用）

```bash
# visudoで編集（rootユーザーで実行）
sudo visudo

# 以下を追加
deploy ALL=(ALL) NOPASSWD: /bin/chown, /bin/chmod, /bin/systemctl, /usr/bin/git, /usr/sbin/semanage, /usr/sbin/restorecon
```

### AlmaLinux 9 環境での追加設定

#### 必要なパッケージのインストール

```bash
# Apache(httpd)のインストール
sudo dnf install httpd -y

# Gitのインストール
sudo dnf install git -y

# SELinux管理ツール
sudo dnf install policycoreutils-python-utils -y
```

#### SELinux設定

AlmaLinux 9ではSELinuxがデフォルトで有効になっています。Webコンテンツが正しく動作するように設定が必要です。

```bash
# httpd_sys_content_tコンテキストを設定
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/vhosts/task.sho43.xyz(/.*)?"
sudo restorecon -Rv /var/www/vhosts/task.sho43.xyz

# Git操作を許可
sudo setsebool -P httpd_use_git 1

# ネットワーク接続を許可（必要な場合）
sudo setsebool -P httpd_can_network_connect 1
```

#### ファイアウォール設定

```bash
# HTTP/HTTPSを許可
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### SSL証明書の設定（推奨）

Let's Encryptを使用してSSL証明書を設定：

```bash
sudo dnf install epel-release
sudo dnf install certbot python3-certbot-apache
sudo certbot --apache -d task.sho43.xyz
```

### トラブルシューティング

#### SSH接続エラー
- ファイアウォール設定を確認
- SSH設定ファイル `/etc/ssh/sshd_config` を確認
- プライベートキーの改行が正しく設定されているか確認

#### パーミッションエラー
```bash
# サーバー側で実行
sudo chown -R deploy:apache /var/www/vhosts/task.sho43.xyz
sudo chmod -R 755 /var/www/vhosts/task.sho43.xyz
```

#### Apacheエラー
```bash
# 設定をテスト
sudo httpd -t

# エラーログを確認
sudo tail -f /var/log/httpd/error_log

# SELinuxが原因の場合
sudo ausearch -m avc -ts recent
sudo setsebool -P httpd_can_network_connect 1
```

#### SELinux関連のエラー

```bash
# SELinuxのログを確認
sudo ausearch -m avc -ts recent

# 一時的にSELinuxを無効化してテスト（本番環境では推奨しません）
sudo setenforce 0  # Permissiveモード
sudo setenforce 1  # Enforcingモードに戻す
```

#### httpd起動エラー

```bash
# 設定ファイルの構文チェック
sudo httpd -t

# httpdの状態確認
sudo systemctl status httpd

# エラーログ確認
sudo journalctl -xe -u httpd
```