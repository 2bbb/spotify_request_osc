const fs = require('fs');
const path = require('path');

class Cache {
    constructor(client_id) {
        this.client_id = client_id;
        this.cache = {};
        this.path = path.join(__dirname, '../caches', `${client_id}.json`);
        if(!fs.existsSync(this.path)) this.save();
        this.load();
    }

    load() {
        this.cache = JSON.parse(fs.readFileSync(this.path, 'utf8'));
    }
    
    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.cache, null, '  '));
    }

    clear() {
        this.cache = {};
        this.save();
    }

    update(response_body) {
        this.cache = response_body;
        this.save();
    }

    getAccessToken() {
        return this.cache.access_token;
    }

    getRefreshToken() {
        return this.cache.refresh_token;
    }
};

module.exports = Cache;