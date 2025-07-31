class Storage {
    static STORAGE_KEY = 'todoapp-tasks';
    static FILTER_KEY = 'todoapp-filter';
    static SORT_KEY = 'todoapp-sort';

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

    static saveFilter(filter) {
        if (!this.isAvailable()) {
            return false;
        }

        try {
            localStorage.setItem(this.FILTER_KEY, filter);
            return true;
        } catch (e) {
            console.error('Failed to save filter:', e);
            return false;
        }
    }

    static loadFilter() {
        if (!this.isAvailable()) {
            return 'all';
        }

        try {
            const filter = localStorage.getItem(this.FILTER_KEY);
            return filter || 'all';
        } catch (e) {
            console.error('Failed to load filter:', e);
            return 'all';
        }
    }

    static saveSort(sortByName) {
        if (!this.isAvailable()) {
            return false;
        }

        try {
            localStorage.setItem(this.SORT_KEY, JSON.stringify(sortByName));
            return true;
        } catch (e) {
            console.error('Failed to save sort:', e);
            return false;
        }
    }

    static loadSort() {
        if (!this.isAvailable()) {
            return false;
        }

        try {
            const sort = localStorage.getItem(this.SORT_KEY);
            return sort ? JSON.parse(sort) : false;
        } catch (e) {
            console.error('Failed to load sort:', e);
            return false;
        }
    }
}