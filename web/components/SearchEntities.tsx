import Link from "next/link";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import debounce from "lodash/debounce";

import { Entity } from "types";
import { EntityFragments } from "fragments";
import EntityService from "services/Entity";

import LoadingCircle from "components/LoadingCircle";
import CreateNewEntities from "components/CreateNewEntities";

const SEARCH_ENTITIES_QUERY = gql`
	query SearchEntities($input: SearchEntitiesInput!) {
		searchEntities(input: $input) {
			...AudioItem
			...Person
			...Instrument
			...Place
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.person}
	${EntityFragments.instrument}
	${EntityFragments.place}
	${EntityFragments.tune}
`;

interface QueryData {
	searchEntities: Entity[];
}
interface QueryVariables {
	input: {
		searchTerm: string;
		take?: number;
	};
}
interface Props {
	onSelect: (entity: Entity) => void;
	onNewEntityCreated?: (entity: Entity) => void;
}
const SearchEntities = ({ onSelect, onNewEntityCreated }: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [searchResults, setSearchResults] = useState<Entity[] | undefined>();

	const onChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const [searchEntities, { loading, data, error }] = useLazyQuery<
		QueryData,
		QueryVariables
	>(SEARCH_ENTITIES_QUERY, {
		fetchPolicy: "no-cache",
	});
	const debouncedSearchEntities = useCallback(
		debounce(searchEntities, 300, { trailing: true }),
		[searchEntities]
	);

	useEffect(() => {
		const cleanedSearchTerm = searchTerm?.trim() ?? "";
		if (cleanedSearchTerm.length >= 3) {
			debouncedSearchEntities({
				variables: { input: { searchTerm: cleanedSearchTerm, take: 30 } },
			});
		}
	}, [searchTerm]);

	useEffect(() => {
		if (data?.searchEntities) {
			setSearchResults(data.searchEntities);
		}
	}, [data]);

	return (
		<>
			<div className="relative">
				<input
					autoFocus
					placeholder="Start typing..."
					value={searchTerm}
					onChange={onChangeSearchTerm}
				/>
				{loading && (
					<div className="absolute top-2 right-2">
						<LoadingCircle />
					</div>
				)}
			</div>

			{error && (
				<div className="text-red-600 mt-4 ml-2">Error fetching results</div>
			)}

			{searchResults && (
				<div className="mt-4">
					<ul className="max-h-40">
						{searchResults.map((entity, index) => (
							<li className="flex flex-row" key={index}>
								<button
									className="flex flex-1 justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200"
									onClick={() => onSelect(entity)}
								>
									<span>{entity.name}</span>
									<span className="uppercase text-gray-500 text-sm">
										{entity.entityType}
									</span>
								</button>

								<Link href={EntityService.makeHrefForView(entity)}>
									<a className="btn-icon w-auto px-2" target="_blank">
										<i className="material-icons text-base">launch</i>
									</a>
								</Link>
							</li>
						))}
					</ul>

					{searchResults.length === 0 && (
						<div className="p-2 block text-gray-500">No results</div>
					)}

					{onNewEntityCreated && (
						<div className="mt-2 ml-2">
							<CreateNewEntities onNewEntityCreated={onNewEntityCreated} />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SearchEntities;
