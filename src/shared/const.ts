export interface User {
	id: number;
	name: string;
	email: string;
}

export enum UserRole {
	Admin = "ADMIN",
	Member = "MEMBER",
	Guest = "GUEST",
}
