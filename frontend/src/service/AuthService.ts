export interface AuthService {
	login(email: string, password: string);
	logout();
	register(name: string, email: string, password: string);
	reset(email: string);
}
