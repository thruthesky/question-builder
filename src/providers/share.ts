export interface QuestionForm  {
    ID:number;
    password?:string;
    category: string;
    post_title : string;
    content?:string;
    meta:{
    choice1 : string;
    choice2 : string;
    choice3 : string;
    choice4 : string;
    answer : number | string;
    }

};


export interface PostQuery {
  ID:number;
  password?:string;
  category: string;
  post_title : string;
  category_name: string;
  paged: number;
  per_page?: number;
}
