import { useNavigate } from "@remix-run/react";

import type { Person } from "types";

import Layout from "~/components/Layout";
import RequireUser from "~/components/RequireUser";
import CreatePersonForm from "~/components/CreatePersonForm";

const NewPerson = () => {
	const navigate = useNavigate();

	const onCreateSuccess = (person: Person) => {
		navigate(`/entities/people/${person.slug}`);
	};

	return (
		<Layout>
			<RequireUser>
				<div className="max-w-md">
					<h1 className="mb-4">Create Person</h1>
					<CreatePersonForm onSuccess={onCreateSuccess} />
				</div>
			</RequireUser>
		</Layout>
	);
};

export default NewPerson;
