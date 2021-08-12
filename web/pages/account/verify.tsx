import { useState } from "react";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import SearchEntities from "components/SearchEntities";

const AccountVerify = () => {
	const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] =
		useState(false);

	return (
		<Layout>
			<RequireUser>
				<h1 className="mb-4">Verify yourself and claim Person tag</h1>
				<div className="mb-6 text-gray-500">
					This project exists to help serve the community. As a community
					member, you should have control over any material that is posted of
					you. By verifying your identity you'll be able to link your account to
					the Person entity in the system. For example, if you are Michael
					Coleman, you would be verified as the real "Michael Coleman" wherever
					that tag is applied. Then you can immediately take down any content
					that is tagged with you, if you so choose. You'll also get a verified
					badge next to your username. Verification is completely free.
				</div>

				<div className="mb-2">
					Search for your name and click on the Person if found. If it doesn't
					exist, go ahead and create it.
				</div>
				<div className="flex flex-col max-w-xs">
					<SearchEntities
						className="mb-8"
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
