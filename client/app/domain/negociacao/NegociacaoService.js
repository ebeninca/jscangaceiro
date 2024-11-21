class NegociacaoService {

    constructor() {
        // NOVA PROPRIEDADE!
        this._http = new HttpService();
        this._url = 'http://localhost:3000';
    }

    obtemNegociacoesDaSemana() {
        return this._http
            .get(this._url + '/negociacoes/semana')
            .then(
                dados => {
                    const negociacoes = dados.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    // ATENÇÃO AQUI! 
                    return negociacoes;
                },
                err => {
                    // ATENÇÃO AQUI!
                    throw new Error('Não foi possível obter as negociações');
                }
            );
    }

    obtemNegociacoesDaSemanaAnterior() {
        return this._http
            .get(this._url + '/negociacoes/anterior')
            .then(
                dados => {
                    const negociacoes = dados.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    return negociacoes;
                },
                err => {
                    //	ATENÇÃO	AQUI!
                    throw new Error('Não foi possível obter as negociações da semana anterior');
                }
            );
    }

    obtemNegociacoesDaSemanaRetrasada() {
        return this._http
            .get(this._url + '/negociacoes/retrasada')
            .then(
                dados => {
                    const negociacoes = dados.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.
                            quantidade, objeto.valor));
                    return negociacoes;
                },
                err => {
                    throw new Error('Não foi possível obter as negociações da semana retrasada');
                }
            );
    }

    obtemNegociacoesDoPeriodo() {
        return Promise.all([
            this.obtemNegociacoesDaSemana(),
            this.obtemNegociacoesDaSemanaAnterior(),
            this.obtemNegociacoesDaSemanaRetrasada()
        ]).then(periodo => periodo
            .reduce((novoArray, item) => novoArray.concat(item), [])
            .sort((a, b) => b.data.getTime() - a.data.getTime())
        ).catch(err => {
            console.log(err);
            throw new Error('Não foi possível obter as negociações do período')
        });
    }

}