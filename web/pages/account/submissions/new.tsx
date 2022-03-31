import Link from "next/link";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";
import CreateSubmissionForm from "components/CreateSubmissionForm";

const SubmissionsNew = () => {
	return (
		<Layout>
			<RequireUser>
				<Breadcrumb
					items={[
						{
							label: "Account",
							href: "/account",
						},
						{
							label: "Submissions",
							href: "/account/submissions",
						},
						{ label: "Create a New Submission" },
					]}
					className="mb-4"
				/>
				<div className="max-w-full md:max-w-xl">
					<div className="mb-6 text-gray-500">
						Welcome! Please use this page if you would like to submit material
						to be considered for acceptance into ITMA's permanent collection.
						Submission is easy: just fill in the form below to provide
						information about the sound recordings, videos, photographs or
						documents you are sharing, then upload your files. Thank you for
						your contribution.
					</div>
					<CreateSubmissionForm />
				</div>
			</RequireUser>
		</Layout>
	);
};

export default SubmissionsNew;
