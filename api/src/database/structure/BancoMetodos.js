
module.exports = class BancoMetodos
{
    constructor()
    {
        this.Int = 0;
        this.Varchar = 1;
        this.Boolean = 2;
    }

    async getPool() {}

    async query(param, pool) {}

    async update(param, pool) {}
}