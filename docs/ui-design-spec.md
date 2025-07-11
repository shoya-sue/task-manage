# UI設計仕様書

## 1. デザインシステム

### 1.1 カラーパレット
```css
:root {
  --primary-color: #007bff;    /* プライマリカラー（青） */
  --success-color: #28a745;    /* 成功カラー（緑） */
  --danger-color: #dc3545;     /* 危険カラー（赤） */
  --warning-color: #ffc107;    /* 警告カラー（黄） */
  --info-color: #17a2b8;       /* 情報カラー（水色） */
  
  --background-color: #f8f9fa;  /* 背景色（ライトグレー） */
  --surface-color: #ffffff;     /* サーフェス色（白） */
  --text-primary: #343a40;      /* プライマリテキスト（ダークグレー） */
  --text-secondary: #6c757d;    /* セカンダリテキスト（グレー） */
  --text-muted: #adb5bd;        /* ミューテッドテキスト（ライトグレー） */
  
  --border-color: #dee2e6;      /* ボーダー色 */
  --shadow-color: rgba(0, 0, 0, 0.1); /* シャドウ色 */
}
```

### 1.2 フォント設定
```css
:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                 'Helvetica Neue', Arial, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 600;
  
  --line-height-base: 1.5;
  --line-height-sm: 1.25;
}
```

### 1.3 スペーシング
```css
:root {
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-xxl: 3rem;    /* 48px */
}
```

## 2. コンポーネント設計

### 2.1 アプリケーションヘッダー
```css
.app-header {
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.app-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}
```

### 2.2 タスク入力フォーム
```css
.task-input-form {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
}

.task-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: var(--font-size-base);
  outline: none;
  transition: border-color 0.2s ease;
}

.task-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.add-button {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background: #0056b3;
}
```

### 2.3 フィルターボタン
```css
.filter-buttons {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
}

.filter-button {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background: var(--background-color);
}

.filter-button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
```

### 2.4 タスクリスト
```css
.task-list {
  background: var(--surface-color);
  min-height: 300px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.task-item:hover {
  background: var(--background-color);
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-text {
  flex: 1;
  font-size: var(--font-size-base);
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
}

.task-text.completed {
  text-decoration: line-through;
  color: var(--text-muted);
}

.task-text.editing {
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  outline: none;
}

.delete-button {
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.delete-button:hover {
  background: var(--danger-color);
  color: white;
}
```

### 2.5 フッター
```css
.app-footer {
  background: var(--surface-color);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-md) var(--spacing-lg);
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.task-counter {
  font-weight: var(--font-weight-medium);
}
```

## 3. レスポンシブデザイン

### 3.1 ブレークポイント
```css
/* Mobile First */
@media (max-width: 576px) {
  .task-input-form {
    flex-direction: column;
  }
  
  .filter-buttons {
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  
  .task-item {
    padding: var(--spacing-sm) var(--spacing-md);
  }
}

@media (min-width: 768px) {
  .app-container {
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 4px 6px var(--shadow-color);
  }
}
```

### 3.2 タッチ対応
```css
@media (hover: none) {
  .task-item:hover {
    background: var(--surface-color);
  }
  
  .delete-button,
  .add-button,
  .filter-button {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## 4. アニメーション

### 4.1 トランジション
```css
.task-item {
  transition: all 0.2s ease;
}

.task-item.adding {
  animation: fadeInUp 0.3s ease;
}

.task-item.removing {
  animation: fadeOutRight 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

### 4.2 ホバー効果
```css
.interactive-element {
  position: relative;
  overflow: hidden;
}

.interactive-element::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.interactive-element:hover::before {
  left: 100%;
}
```

## 5. アクセシビリティ

### 5.1 ARIA属性
```html
<div class="task-item" role="listitem" aria-label="タスク項目">
  <input type="checkbox" 
         id="task-1" 
         class="task-checkbox"
         aria-label="タスクを完了としてマーク">
  <span class="task-text" 
        aria-label="タスクの内容">
    タスクの内容
  </span>
  <button class="delete-button" 
          aria-label="タスクを削除">
    ×
  </button>
</div>
```

### 5.2 キーボード操作
```css
*:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 6px;
}
```