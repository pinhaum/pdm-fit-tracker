## Testes Unitários

- tem como objetivo verificar o funcionamento independente de pequenas porções de código como funçoes, componentes, hooks, etc.
- rodam em ambientes isolados para verificar o funcionamento destas porções de código
- geralmente são rápidos, a depender do tamanho da unidade isolada a ser testada
- utilizados para encontrar problemas fáceis de serem identificados, devido ao escopo reduzido
- de forma simplista, os testes unitários garantem que cada porção de código funcione como uma "engrenagem" deve funcionar, sem nenhum problema nas suas arestas e devidamente lubrificadas

## Testes End-to-End (E2E)

- tem como objetivo simular uma interação do usuário, testando o fluxo completo que o usuário percorre dentro da aplicação
- rodam em ambientes similares aos ambientes de produção real para poder simular um usuário interagindo com a aplicação da mesma forma que aconteceria no mundo real
- geralmente são testes mais lentos a depender dos fluxos e dados testados e persistidos em ambientes de testes
- utilizados para depurar encontrar erros que podem surgir na interação entre múltiplos componentes e também oferecem uma visão geral do funcionamento da aplicação
- de forma também simplis, os testes E2E existem para garantir que, quando combinadas, as "engrenagens" dos sistema estão se comunicando efetivamente uma a outra, sem gerar problemas ou desgaste entre elas.
