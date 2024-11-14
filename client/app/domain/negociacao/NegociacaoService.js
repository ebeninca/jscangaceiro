class NegociacaoService {

    constructor() {
        // NOVA PROPRIEDADE!
        this._http = new HttpService();
    }

    obtemNegociacoesDaSemana() {
        return this._http
            .get('http://localhost:3000/negociacoes/semana')
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
}