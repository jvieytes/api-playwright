export interface NewPetResponseModel {
    status: string;
    message: string;
    data: {
        id: number;
        name: string;
        type: string;
        age: number;
    };
}