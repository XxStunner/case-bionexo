module.exports = {
    getScore: function(string){
        switch(string){
            case 'Desempenho mediano ou  um pouco abaixo da média':
                return 1;
            case 'Desempenho acima da média':
                return 2;
            case 'Desempenho muito acima da média':
                return 3;            
        }
    }
};