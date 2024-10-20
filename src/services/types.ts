export interface success {
    responseCode : 1 ,
    message : string ,
    data : any
}

export interface failure {
    responseCode : number,
    message : string
}

export type  response = success | failure