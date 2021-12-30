import { User, UserRole } from "types";

const isAdmin = (user?: User) => {
	if (!user) {
		return false;
	}
	return user.role === UserRole.Admin;
};

const UserService = {
	isAdmin,
};
export default UserService;
