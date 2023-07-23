export interface Chamado {//Ponto de interrogação indica que não será necessário passar os valores na instância do chamado
    id?: any; 
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    descricao: string;
    tecnico: any;
    cliente: any;
    nomeCliente: string;
    nomeTecnico: string;
}