import { Link, useFetcher } from "@remix-run/react";
import { type ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { EntityType } from "@prisma/client";

import { type Entity } from "~/types";
import EntityService from "~/services/Entity";

import LoadingCircle from "~/components/LoadingCircle";

interface Props {
	entityTypes?: EntityType[];
	take?: number;
	onSelect: (entity: Entity) => void;
	className?: string;
}
const SearchEntities = ({ entityTypes, take, onSelect, className }: Props) => {
	const fetcher = useFetcher<{ results: Entity[]; error?: string }>();
	const searchResults = fetcher.data?.results;

	function onChangeSearchTerm(e: ChangeEvent<HTMLInputElement>) {
		const searchTerm = e.target.value;
		if (searchTerm.length < 3) {
			return;
		}
		const params = new URLSearchParams({
			searchTerm,
		});
		if (typeof take === "number") {
			params.set("take", String(take));
		}
		if (entityTypes) {
			entityTypes.forEach((e) => params.append("entityTypes", e));
		}
		fetcher.load(`/search?${params.toString()}`);
	}

	return (
		<div className={className ?? ""}>
			<div className="relative">
				<input
					autoFocus
					placeholder="Start typing..."
					onChange={debounce(onChangeSearchTerm, 300, {
						trailing: true,
					})}
				/>
				{fetcher.state !== "idle" && (
					<div className="absolute top-2 right-2">
						<LoadingCircle />
					</div>
				)}
			</div>

			{fetcher.data?.error && (
				<div className="text-red-600 mt-4 ml-2">{fetcher.data.error}</div>
			)}

			{searchResults && (
				<div className="mt-4">
					<ul>
						{searchResults.map((entity, index) => (
							<li className="flex flex-row" key={index}>
								<button
									className="flex flex-1 justify-between items-center text-left p-2 rounded cursor-pointer hover:bg-gray-200"
									onClick={() => onSelect(entity)}
								>
									<span>
										{entity.name}
										{entity.entityType === EntityType.Tune
											? ` (${entity.entityType})`
											: ""}
									</span>
									<span className="uppercase text-gray-500 text-sm">
										{entity.entityType}
									</span>
								</button>

								<Link
									to={EntityService.makeHrefForView(entity)}
									target="_blank"
									aria-label={`Open ${entity.name} in New Tab`}
									className="btn-icon w-auto"
								>
									<span className="px-1.5">↗</span>
								</Link>
							</li>
						))}
					</ul>

					{searchResults.length === 0 && (
						<div className="p-2 block text-gray-500">No results</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchEntities;
