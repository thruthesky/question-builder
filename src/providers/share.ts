export interface QuestionForm  {
    first_name:string;
    category: string;
    title : string;
    content?:string;
    choice1 : string;
    choice2 : string;
    choice3 : string;
    choice4 : string;
    answer : number | string;
};