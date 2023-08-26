class Storage {
  #fs;
  #filepath;

  constructor(filepath, fs) {
    this.#fs = fs;
    this.#filepath = filepath;
  }

  #setup() {
    try {
      this.#fs.mkdirSync('storage');
    } finally {
      this.#fs.writeFileSync(this.#filepath, '[]');
    }
  }

  load() {
    if (this.#fs.existsSync(this.#filepath)) {
      return JSON.parse(this.#fs.readFileSync(this.#filepath, 'utf-8'));
    }

    this.#setup();
    return [];
  }

  write(data, onSave) {
    this.#fs.writeFile(this.#filepath, JSON.stringify(data, null, 2), onSave);
  }
}

module.exports = Storage;