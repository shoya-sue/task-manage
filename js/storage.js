class Storage {
    static STORAGE_KEY = 'todoapp-tasks';

    static isAvailable() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    static save(tasks) {
        if (!this.isAvailable()) {
            console.warn('localStorage is not available');
            return false;
        }

        try {
            const tasksData = JSON.stringify(tasks);
            localStorage.setItem(this.STORAGE_KEY, tasksData);
            return true;
        } catch (e) {
            console.error('Failed to save tasks:', e);
            return false;
        }
    }

    static load() {
        if (!this.isAvailable()) {
            console.warn('localStorage is not available');
            return [];
        }

        try {
            const tasksData = localStorage.getItem(this.STORAGE_KEY);
            if (!tasksData) {
                return [];
            }

            const tasks = JSON.parse(tasksData);
            
            if (!Array.isArray(tasks)) {
                console.warn('Invalid tasks data format');
                return [];
            }

            return tasks.map(task => ({
                id: task.id || Date.now(),
                text: task.text || '',
                completed: Boolean(task.completed),
                createdAt: task.createdAt ? new Date(task.createdAt) : new Date()
            }));
        } catch (e) {
            console.error('Failed to load tasks:', e);
            return [];
        }
    }

    static clear() {
        if (!this.isAvailable()) {
            return false;
        }

        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (e) {
            console.error('Failed to clear tasks:', e);
            return false;
        }
    }
}