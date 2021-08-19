import { useState } from "react";

import { EntityType } from "types";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import SearchEntities from "components/SearchEntities";

const AccountVerify = () => {
	const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] =
		useState(false);

	return (
		<Layout>
			<RequireUser>
				<h1 className="mb-4">Verify yourself and link Person tag</h1>
				<div className="mb-8 text-gray-500">
					By verifying yourself, you can link your account to a Person tag. For
					example, if you are Michael Coleman (bear with us here) you can link
					yourself to the "Michael Coleman" tag on the site. You'll get a
					verified badge next to your username, and you'll be able to
					immediately take down any content that you're tagged in, if you so
					choose. Verification is completely free.
				</div>

				<div className="mb-2">
					Search for your name and click the Person if found. If it doesn't
					exist yet, go ahead and create it.
				</div>
				<div className="flex flex-col max-w-xs">
					<SearchEntities
						className="mb-8"
						entityTypes={[EntityType.Person]}
						take={15}
						onSelect={() => {}}
						onNewEntityCreated={() => {}}
					/>
				</div>

				<div className="mb-2">
					Please attach a photo proving your identity (utility bill, ID, etc):
				</div>
				<button className="block btn mb-8">Choose image</button>

				<div className="mb-2">
					Do you give ITMA permission to make recordings of you publicly
					available for non-commercial use, as long as you can take them down at
					any time?
				</div>
				<div className="mb-8 flex flex-row items-center justify-start">
					<input
						type="checkbox"
						id="copyright-permission"
						checked={copyrightPermissionIsGranted}
						onChange={(event) =>
							setCopyrightPermissionIsGranted(event.target.checked)
						}
					/>
					<label htmlFor="copyright-permission" className="ml-2">
						Yes, I give permission
					</label>
				</div>

				<button className="btn" disabled>
					Submit
				</button>
			</RequireUser>
		</Layout>
	);
};

export default AccountVerify;
