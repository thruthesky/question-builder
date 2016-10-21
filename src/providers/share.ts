export interface QuestionForm  {
    ID:number;
    password?:string;
    category: string;
    post_title : string;
    content?:string;
    choice1 : string;
    choice2 : string;
    choice3 : string;
    choice4 : string;
    answer : number | string;
};