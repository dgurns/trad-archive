import { db } from "~/utils/db.server";
import { redirect } from "@remix-run/node";

export async function loader() {
	const totalAudioItems = await db.audioItem.count();
	const randomSkip = Math.round(Math.random() * (totalAudioItems - 1));
	const [audioItem] = await db.audioItem.findMany({
		take: 1,
		skip: randomSkip,
	});
	return redirect(`/entities/audio-items/${audioItem.slug}`);
}
