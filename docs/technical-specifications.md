# 技術仕様書

## 1. 使用技術

### 1.1 フロントエンド
- **HTML5**: セマンティックなマークアップ
- **CSS3**: モダンなスタイリング
  - Flexbox レイアウト
  - CSS Grid レイアウト
  - CSS Variables（カスタムプロパティ）
- **JavaScript**: ES6+仕様
  - モジュール機能
  - アロー関数
  - 分割代入
  - テンプレートリテラル

### 1.2 ブラウザAPI
- **localStorage**: データ永続化
- **addEventListener**: イベントハンドリング
- **querySelector/querySelectorAll**: DOM操作

### 1.3 外部依存関係
- **なし**: 純粋なVanilla JavaScript使用
- **CDN不使用**: 全てのコードは自前で実装

## 2. データ構造

### 2.1 タスクオブジェクト
```javascript
const task = {
  id: number,          // 一意のID（タイムスタンプベース）
  text: string,        // タスクの内容
  completed: boolean,  // 完了状態（true: 完了, false: 未完了）
  createdAt: Date     // 作成日時
}
```

### 2.2 アプリケーション状態
```javascript
const appState = {
  tasks: Task[],       // タスク配列
  filter: string,      // 現在のフィルター（'all', 'active', 'completed'）
  editingId: number    // 編集中のタスクID（nullの場合は編集なし）
}
```

## 3. アーキテクチャ

### 3.1 ファイル構成
```
/
├── index.html          # メインHTML
├── css/
│   └── style.css      # スタイルシート
├── js/
│   ├── app.js         # メインアプリケーション
│   ├── todo.js        # タスク管理クラス
│   └── storage.js     # データ永続化
└── docs/              # ドキュメント
```

### 3.2 クラス設計
```javascript
class TodoApp {
  constructor()
  init()
  render()
  addTask(text)
  toggleTask(id)
  deleteTask(id)
  editTask(id, text)
  setFilter(filter)
  getFilteredTasks()
}

class Storage {
  static save(tasks)
  static load()
  static isAvailable()
}
```

## 4. パフォーマンス仕様

### 4.1 レスポンス時間
- **操作レスポンス**: 100ms以下
- **初期読み込み**: 1秒以下
- **フィルター切り替え**: 50ms以下

### 4.2 メモリ使用量
- **最大タスク数**: 1000件
- **メモリ使用量**: 10MB以下（1000タスク時）

### 4.3 ストレージ容量
- **localStorage使用量**: 1MB以下（1000タスク時）
- **1タスク当たり**: 約1KB

## 5. ブラウザ対応

### 5.1 サポート対象
- **Chrome**: 最新版
- **Firefox**: 最新版
- **Safari**: 最新版
- **Edge**: 最新版

### 5.2 モバイル対応
- **iOS Safari**: 最新版
- **Android Chrome**: 最新版
- **レスポンシブ**: viewport meta tag使用

### 5.3 必要な機能
- **localStorage**: 必須
- **ES6+ JavaScript**: 必須
- **CSS3**: 必須

## 6. セキュリティ

### 6.1 XSS対策
- **innerHTML使用禁止**: textContentを使用
- **ユーザー入力のサニタイズ**: 特殊文字のエスケープ

### 6.2 データ検証
- **入力値検証**: 空文字・型チェック
- **localStorage検証**: JSON.parseのエラーハンドリング

## 7. エラーハンドリング

### 7.1 localStorage関連
- **使用不可時**: メモリ内での一時保存
- **容量不足時**: 古いデータの削除
- **データ破損時**: 初期化処理

### 7.2 DOM操作関連
- **要素不存在**: null チェック
- **イベントリスナー**: エラー時の復旧処理

### 7.3 ユーザー通知
- **エラーメッセージ**: 分かりやすい表示
- **操作失敗時**: 視覚的フィードバック