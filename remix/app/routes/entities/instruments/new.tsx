import { useNavigate } from "@remix-run/react";

import type { Instrument } from "types";

import Layout from "~/components/Layout";
import RequireUser from "~/components/RequireUser";
import CreateInstrumentForm from "~/components/CreateInstrumentForm";

const NewInstrument = () => {
	const navigate = useNavigate();

	const onCreateSuccess = (instrument: Instrument) => {
		navigate(`/entities/instruments/${instrument.slug}`);
	};

	return (
		<Layout>
			<RequireUser>
				<div className="max-w-md">
					<h1 className="mb-4">Create Instrument</h1>
					<CreateInstrumentForm onSuccess={onCreateSuccess} />
				</div>
			</RequireUser>
		</Layout>
	);
};

export default NewInstrument;
