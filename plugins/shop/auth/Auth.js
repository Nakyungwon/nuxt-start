class Authentication {
  constructor({ Storage, expires = 30 } = {}) {
    this.Storage = Storage
    this.expires = expires
  }
}

export default Authentication
