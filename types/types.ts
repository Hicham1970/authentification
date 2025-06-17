export type DataType ={
    id: string;
    title: string;
    description: string;
    image: string;
    authorName: string;
    authorId: string;
    createdAt: Date;
}

export type DataFormType = {
    title: string;
    description: string;
    image: string;

}

export type DbContextType = {
    articles: DataType[];
    addArticle: (articleData: Omit<DataType, "id" | "createdAt">) =>Promise<void>;
    updateArticle: (id: string, articleData: Omit<DataType, "id" | "createdAt">) =>Promise<void>;
    deleteArticle: (id: string, authorId: string, authorName: string) => Promise<void>;

}