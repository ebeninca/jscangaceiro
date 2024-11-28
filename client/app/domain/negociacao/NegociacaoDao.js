class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            /* lidaremos com a inclusão aqui */
        });

    }
    listaTodos() {
        return new Promise((resolve, reject) => {
            /* lidaremos com os cursos 	aqui */
        });
    }
}
