class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.sortByName = false;
        
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.taskCounter = document.getElementById('taskCounter');
        this.filterButtons = document.querySelectorAll('.filter-button');
        this.sortCheckbox = document.getElementById('sortCheckbox');
        
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        if (this.sortCheckbox) {
            this.sortCheckbox.addEventListener('change', (e) => {
                this.sortByName = e.target.checked;
                this.render();
            });
        }

        this.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = parseInt(taskItem.dataset.id);

            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTask(taskId);
            } else if (e.target.classList.contains('delete-button')) {
                this.deleteTask(taskId);
            } else if (e.target.classList.contains('task-text')) {
                this.startEditing(taskId);
            }
        });

        this.taskList.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('task-text')) {
                const taskItem = e.target.closest('.task-item');
                const taskId = parseInt(taskItem.dataset.id);
                this.startEditing(taskId);
            }
        });

        this.taskList.addEventListener('keydown', (e) => {
            if (this.editingId === null) return;

            if (e.key === 'Enter') {
                e.preventDefault();
                this.finishEditing();
            } else if (e.key === 'Escape') {
                this.cancelEditing();
            }
        });

        this.taskList.addEventListener('blur', (e) => {
            if (e.target.classList.contains('task-text') && e.target.isContentEditable) {
                this.finishEditing();
            }
        }, true);
    }

    loadTasks() {
        this.tasks = Storage.load();
    }

    saveTasks() {
        Storage.save(this.tasks);
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date()
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.saveTasks();
        this.render();
        
        setTimeout(() => {
            const taskElement = document.querySelector(`[data-id="${task.id}"]`);
            if (taskElement) {
                taskElement.classList.add('adding');
                setTimeout(() => {
                    taskElement.classList.remove('adding');
                }, 300);
            }
        }, 10);
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('removing');
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.saveTasks();
                this.render();
            }, 300);
        }
    }

    startEditing(id) {
        if (this.editingId !== null) {
            this.finishEditing();
        }

        this.editingId = id;
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const taskElement = document.querySelector(`[data-id="${id}"] .task-text`);
        if (taskElement) {
            taskElement.classList.add('editing');
            taskElement.contentEditable = true;
            taskElement.focus();
            
            const range = document.createRange();
            range.selectNodeContents(taskElement);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    finishEditing() {
        if (this.editingId === null) return;

        const taskElement = document.querySelector(`[data-id="${this.editingId}"] .task-text`);
        if (taskElement) {
            const newText = taskElement.textContent.trim();
            const task = this.tasks.find(t => t.id === this.editingId);
            
            if (newText && task) {
                task.text = newText;
                this.saveTasks();
            }
            
            taskElement.classList.remove('editing');
            taskElement.contentEditable = false;
            taskElement.blur();
        }

        this.editingId = null;
        this.render();
    }

    cancelEditing() {
        if (this.editingId === null) return;

        const taskElement = document.querySelector(`[data-id="${this.editingId}"] .task-text`);
        if (taskElement) {
            taskElement.classList.remove('editing');
            taskElement.contentEditable = false;
            taskElement.blur();
        }

        this.editingId = null;
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        this.filterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.filter === filter);
        });

        this.render();
    }

    getFilteredTasks() {
        let filteredTasks;
        switch (this.currentFilter) {
            case 'active':
                filteredTasks = this.tasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = this.tasks.filter(task => task.completed);
                break;
            default:
                filteredTasks = [...this.tasks];
        }
        
        if (this.sortByName) {
            filteredTasks.sort((a, b) => a.text.localeCompare(b.text, 'ja'));
        }
        
        return filteredTasks;
    }

    render() {
        this.renderTasks();
        this.renderCounter();
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.taskList.innerHTML = '<li class="empty-state">タスクがありません</li>';
            return;
        }

        this.taskList.innerHTML = filteredTasks.map(task => {
            const isEditing = this.editingId === task.id;
            return `
                <li class="task-item" data-id="${task.id}" role="listitem">
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        ${task.completed ? 'checked' : ''}
                        aria-label="タスクを${task.completed ? '未完了' : '完了'}にする"
                    >
                    <span 
                        class="task-text ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}"
                        ${isEditing ? 'contenteditable="true"' : ''}
                        aria-label="タスクの内容: ${task.text}"
                    >${task.text}</span>
                    <button 
                        class="delete-button" 
                        aria-label="タスクを削除"
                        title="削除"
                    >×</button>
                </li>
            `;
        }).join('');
    }

    renderCounter() {
        const activeTasks = this.tasks.filter(task => !task.completed);
        const count = activeTasks.length;
        
        let counterText;
        if (count === 0) {
            counterText = 'すべてのタスクが完了しました！';
        } else if (count === 1) {
            counterText = '1 個のタスクが残っています';
        } else {
            counterText = `${count} 個のタスクが残っています`;
        }
        
        this.taskCounter.textContent = counterText;
    }
}