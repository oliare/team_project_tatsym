export interface IHomeworkDto {
    title: string;
    description: string;
    logo?: string;
    filePath?: string;
    issuedDate: string;
    deadline: string;
    subjectId: number;
}

export interface ISubjectDto {
    id: number;
    name: string;
    homeworks: IHomeworkDto[];
}
