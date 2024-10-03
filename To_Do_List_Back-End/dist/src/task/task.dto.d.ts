export declare enum TaskStatusEnum {
    TO_DO = "TO_DO",
    DONE = "DONE"
}
export declare class TaskDto {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
    expirationDate: string;
}
export interface FindAllParameters {
    user_id: string;
}
export declare class TaskRouteParameters {
    id: string;
}
