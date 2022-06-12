var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react20 = require("@remix-run/react");
var import_client9 = require("@apollo/client");

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-YAYVXH63.css";

// app/apolloClient.ts
var import_client = require("@apollo/client");
var { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;
var graphqlPath = "/graphql";
var apiUrl = `http://localhost:4000${graphqlPath}`;
if (NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "master") {
  apiUrl = `https://api-prod.tradarchive.com${graphqlPath}`;
} else if (typeof NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "string") {
  apiUrl = `https://api-${NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}.tradarchive.com${graphqlPath}`;
}
var API_URL = apiUrl;
var mergeArrayById = (existing, incoming, { readField, mergeObjects }) => {
  const merged = existing ? existing.slice(0) : [];
  const idToIndex = /* @__PURE__ */ Object.create(null);
  if (existing) {
    existing.forEach((item, index) => {
      idToIndex[readField("id", item)] = index;
    });
  }
  if (incoming) {
    incoming.forEach((item) => {
      const id = readField("id", item);
      const index = idToIndex[id];
      if (typeof index === "number") {
        merged[index] = mergeObjects(merged[index], item);
      } else {
        idToIndex[id] = merged.length;
        merged.push(item);
      }
    });
  }
  return merged;
};
var apolloClient = new import_client.ApolloClient({
  uri: API_URL,
  credentials: "include",
  cache: new import_client.InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          audioItems: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          collections: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          comments: {
            keyArgs: false,
            merge: mergeArrayById
          },
          entity: {
            keyArgs: false,
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          instruments: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          people: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          places: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          savedItemsForUser: {
            keyArgs: false,
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          tags: {
            keyArgs: false,
            merge(_, incoming) {
              return incoming;
            }
          },
          tunes: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          }
        }
      },
      AudioItem: {
        fields: {
          comments: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          isSavedByUser: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          createdByUser: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Collection: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Comment: {
        fields: {
          parentAudioItem: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          createdByUser: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Instrument: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Person: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Place: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      SavedItem: {
        fields: {
          audioItem: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          }
        }
      },
      Tag: {
        fields: {
          subjectEntity: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          objectEntity: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          createdByUser: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          }
        }
      },
      Tune: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      }
    }
  })
});

// app/components/PlayerContextProvider.tsx
var import_react6 = __toESM(require("react"));

// app/components/Player.tsx
var import_react4 = require("react");
var import_react5 = require("@remix-run/react");

// app/hooks/usePlayerContext.ts
var import_react2 = require("react");
var usePlayerContext = () => {
  const playerContext = (0, import_react2.useContext)(PlayerContext);
  return playerContext;
};
var usePlayerContext_default = usePlayerContext;

// app/types/index.ts
var PerPage = /* @__PURE__ */ ((PerPage2) => {
  PerPage2[PerPage2["Ten"] = 10] = "Ten";
  PerPage2[PerPage2["Twenty"] = 20] = "Twenty";
  PerPage2[PerPage2["Fifty"] = 50] = "Fifty";
  PerPage2[PerPage2["Hundred"] = 100] = "Hundred";
  return PerPage2;
})(PerPage || {});
function isAudioItem(entity) {
  return entity.entityType === "AudioItem" /* AudioItem */;
}
function isPerson(entity) {
  return entity.entityType === "Person" /* Person */;
}
var TakedownRequestType = /* @__PURE__ */ ((TakedownRequestType2) => {
  TakedownRequestType2["Performer"] = "Performer";
  TakedownRequestType2["Copyright"] = "Copyright";
  return TakedownRequestType2;
})(TakedownRequestType || {});
var isPendingTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Pending";
var isApprovedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Approved";
var isDeniedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Denied";
var isPendingVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Pending";
var isApprovedVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Approved";
var isDeniedVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Denied";

// app/components/AudioPlayer.tsx
var import_react3 = require("react");
var AudioPlayer = ({ item }) => {
  const audioPlayerRef = (0, import_react3.useRef)();
  const {
    setActiveItemDurationSeconds,
    setPlaybackPositionSeconds,
    seekPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default();
  (0, import_react3.useEffect)(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      audioPlayer.ondurationchange = () => {
        const duration = audioPlayer.duration;
        if (typeof duration === "number") {
          const durationSeconds = Math.floor(audioPlayer.duration);
          setActiveItemDurationSeconds(durationSeconds);
        }
      };
      audioPlayer.ontimeupdate = () => {
        const playbackPositionSeconds = Math.floor(audioPlayer.currentTime);
        setPlaybackPositionSeconds(playbackPositionSeconds);
      };
    }
  }, []);
  (0, import_react3.useEffect)(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer && typeof seekPositionSeconds === "number") {
      audioPlayer.currentTime = seekPositionSeconds;
      setSeekPositionSeconds(void 0);
      if (audioPlayer.paused) {
        audioPlayer.play();
      }
    }
  }, [seekPositionSeconds]);
  return /* @__PURE__ */ React.createElement("audio", {
    ref: audioPlayerRef,
    id: "audio",
    preload: "metadata",
    autoPlay: true,
    controls: true,
    controlsList: "nodownload",
    className: "w-full outline-none"
  }, /* @__PURE__ */ React.createElement("source", {
    src: item.urlSource,
    type: "audio/mpeg"
  }));
};
var AudioPlayer_default = AudioPlayer;

// app/components/Player.tsx
var Player = () => {
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  if (!activeAudioItem) {
    return null;
  }
  const itemHref = (0, import_react4.useMemo)(() => {
    if (isAudioItem(activeAudioItem)) {
      return `/entities/audio-items/${activeAudioItem.slug}`;
    }
    return window.location.href;
  }, [activeAudioItem]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-center justify-center px-4 pb-4 pt-2 bg-white"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-between mb-2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "leading-8"
  }, "Now playing:", " ", /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, activeAudioItem.name)), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center ml-4"
  }, /* @__PURE__ */ React.createElement(import_react5.Link, {
    to: itemHref
  }, /* @__PURE__ */ React.createElement("a", {
    className: "whitespace-nowrap"
  }, "View")), /* @__PURE__ */ React.createElement("button", {
    className: "btn-icon flex ml-2 md:ml-4",
    onClick: () => setActiveAudioItem(null)
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close")))), /* @__PURE__ */ React.createElement(AudioPlayer_default, {
    item: activeAudioItem,
    key: activeAudioItem.id
  }));
};
var Player_default = Player;

// app/components/PlayerContextProvider.tsx
var PlayerContext = import_react6.default.createContext(null);
function PlayerContextProvider({ children }) {
  const [activeAudioItem, setActiveAudioItem] = (0, import_react6.useState)(null);
  const [activeItemDurationSeconds, setActiveItemDurationSeconds] = (0, import_react6.useState)(void 0);
  const [playbackPositionSeconds, setPlaybackPositionSeconds] = (0, import_react6.useState)(void 0);
  const [seekPositionSeconds, setSeekPositionSeconds] = (0, import_react6.useState)(void 0);
  (0, import_react6.useEffect)(() => {
    if (!activeAudioItem) {
      setActiveItemDurationSeconds(void 0);
      setPlaybackPositionSeconds(void 0);
      setSeekPositionSeconds(void 0);
    }
  }, [activeAudioItem]);
  return /* @__PURE__ */ import_react6.default.createElement(PlayerContext.Provider, {
    value: {
      activeAudioItem,
      setActiveAudioItem,
      activeItemDurationSeconds,
      setActiveItemDurationSeconds,
      playbackPositionSeconds,
      setPlaybackPositionSeconds,
      seekPositionSeconds,
      setSeekPositionSeconds
    }
  }, children, activeAudioItem && /* @__PURE__ */ import_react6.default.createElement("div", {
    className: "fixed bottom-0 left-0 right-0",
    style: {
      boxShadow: "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)"
    }
  }, /* @__PURE__ */ import_react6.default.createElement(Player_default, null)));
}
var PlayerContextProvider_default = PlayerContextProvider;

// app/components/Header.tsx
var import_react17 = require("react");
var import_react18 = require("@remix-run/react");
var import_react19 = require("@remix-run/react");
var import_react_hotkeys_hook2 = require("react-hotkeys-hook");

// app/hooks/useCurrentUser.ts
var import_react7 = require("react");
var import_client3 = require("@apollo/client");

// app/fragments/index.ts
var import_client2 = require("@apollo/client");
var UserFragments = {
  user: import_client2.gql`
		fragment User on User {
			id
			username
			copyrightPermissionStatus
			verifiedPerson {
				id
				entityType
				slug
				name
			}
			createdAt
		}
	`,
  currentUser: import_client2.gql`
		fragment CurrentUser on User {
			id
			role
			email
			username
			copyrightPermissionStatus
		}
	`
};
var RelationshipFragments = {
  relationship: import_client2.gql`
		fragment Relationship on Relationship {
			id
			name
			subjectEntityType
			objectEntityType
		}
	`
};
var TagEntityFragments = {
  tagAudioItem: import_client2.gql`
		fragment TagAudioItem on AudioItem {
			id
			entityType
			name
			slug
		}
	`,
  tagInstrument: import_client2.gql`
		fragment TagInstrument on Instrument {
			id
			entityType
			name
			slug
		}
	`,
  tagPerson: import_client2.gql`
		fragment TagPerson on Person {
			id
			entityType
			name
			slug
		}
	`,
  tagPlace: import_client2.gql`
		fragment TagPlace on Place {
			id
			entityType
			name
			slug
		}
	`,
  tagTune: import_client2.gql`
		fragment TagTune on Tune {
			id
			entityType
			name
			slug
			type
		}
	`,
  tagCollection: import_client2.gql`
		fragment TagCollection on Collection {
			id
			entityType
			name
			slug
		}
	`
};
var TagFragments = {
  tag: import_client2.gql`
		fragment Tag on Tag {
			id
			relationship {
				...Relationship
			}
			subjectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
			}
			subjectTimeMarkerSeconds
			createdByUser {
				...User
			}
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
		${TagEntityFragments.tagTune}
		${TagEntityFragments.tagCollection}
		${UserFragments.user}
	`,
  tagForEntity: import_client2.gql`
		fragment TagForEntity on Tag {
			id
			relationship {
				...Relationship
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
			}
			subjectTimeMarkerSeconds
			createdByUser {
				...User
			}
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
		${TagEntityFragments.tagTune}
		${TagEntityFragments.tagCollection}
		${UserFragments.user}
	`
};
var EntityFragments = {
  audioItem: import_client2.gql`
		fragment AudioItem on AudioItem {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...TagForEntity
			}
			commentsCount
			isSavedByUser
			status
			createdByUser {
				id
				username
				verifiedPerson {
					id
					entityType
					slug
				}
			}
			createdAt
			updatedAt
			urlSource
			itmaAtomSlug
		}
		${TagFragments.tagForEntity}
	`,
  person: import_client2.gql`
		fragment Person on Person {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			verifiedUser {
				...User
			}
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
			firstName
			middleName
			lastName
		}
		${TagFragments.tag}
		${UserFragments.user}
	`,
  instrument: import_client2.gql`
		fragment Instrument on Instrument {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			createdByUser {
				id
				username
			}
		}
		${TagFragments.tag}
	`,
  place: import_client2.gql`
		fragment Place on Place {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			latitude
			longitude
			createdByUser {
				id
				username
			}
		}
		${TagFragments.tag}
	`,
  tune: import_client2.gql`
		fragment Tune on Tune {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			theSessionTuneId
			type
			meter
			mode
			abc
		}
		${TagFragments.tag}
	`,
  collection: import_client2.gql`
		fragment Collection on Collection {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			itmaAtomSlug
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
		}
		${TagFragments.tag}
		${UserFragments.user}
	`
};
var CommentFragments = {
  comment: import_client2.gql`
		fragment Comment on Comment {
			id
			text
			parentAudioItem {
				...AudioItem
			}
			createdByUser {
				...User
			}
			createdAt
			updatedAt
		}
		${EntityFragments.audioItem}
		${UserFragments.user}
	`,
  commentWithoutParentEntity: import_client2.gql`
		fragment CommentWithoutParentEntity on Comment {
			id
			text
			createdByUser {
				...User
			}
			createdAt
			updatedAt
		}
		${UserFragments.user}
	`
};
var SavedItemFragments = {
  savedItem: import_client2.gql`
		fragment SavedItem on SavedItem {
			id
			audioItem {
				...AudioItem
			}
			createdAt
		}
		${EntityFragments.audioItem}
	`
};
var TakedownRequestFragments = {
  takedownRequest: import_client2.gql`
		fragment TakedownRequest on TakedownRequest {
			id
			entity {
				...AudioItem
			}
			type
			message
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
		${EntityFragments.audioItem}
	`,
  takedownRequestWithoutEntity: import_client2.gql`
		fragment TakedownRequestWithoutEntity on TakedownRequest {
			id
			type
			message
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`
};
var VerificationRequestFragments = {
  verificationRequest: import_client2.gql`
		fragment VerificationRequest on VerificationRequest {
			id
			person {
				id
				entityType
				name
				slug
			}
			presignedImageDownloadUrl
			copyrightPermissionStatus
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`
};
var SubmissionFragments = {
  submission: import_client2.gql`
		fragment Submission on Submission {
			id
			status
			materialTypes
			userControlsCopyright
			copyrightDetails
			description
			s3DirectoryKey
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`
};

// app/hooks/useCurrentUser.ts
var CURRENT_USER_QUERY = import_client3.gql`
	query CurrentUser {
		currentUser {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var useCurrentUser = () => {
  var _a;
  const [getCurrentUser, currentUserQuery] = (0, import_client3.useLazyQuery)(CURRENT_USER_QUERY);
  (0, import_react7.useEffect)(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  const currentUser = (_a = currentUserQuery.data) == null ? void 0 : _a.currentUser;
  return [currentUser, currentUserQuery];
};
var useCurrentUser_default = useCurrentUser;

// app/services/User.ts
var isAdmin = (user) => {
  if (!user) {
    return false;
  }
  return user.role === "Admin" /* Admin */;
};
var UserService = {
  isAdmin
};
var User_default = UserService;

// app/services/Entity.ts
var cleanSlug = (rawSlug) => {
  const slugWithHyphens = rawSlug.replace(/[\s]/g, "-");
  return slugWithHyphens.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
};
var makeHrefForTopLevel = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case "AudioItem" /* AudioItem */:
      return "/entities/audio-items";
    case "Person" /* Person */:
      return "/entities/people";
    case "Instrument" /* Instrument */:
      return "/entities/instruments";
    case "Place" /* Place */:
      return "/entities/places";
    case "Tune" /* Tune */:
      return "/entities/tunes";
    case "Collection" /* Collection */:
      return "/entities/collections";
    default:
      return "";
  }
};
var makeHrefForView = (entity) => {
  return `${makeHrefForTopLevel(entity)}/${entity.slug}`;
};
var makeHrefForEdit = (entity) => {
  return `${makeHrefForView(entity)}/edit`;
};
var makeHrefForAbout = (entity) => {
  return `${makeHrefForView(entity)}/about`;
};
var makeHrefForTags = (entity) => {
  return `${makeHrefForView(entity)}/tags`;
};
var makeReadableNamePlural = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case "AudioItem" /* AudioItem */:
      return "Audio Items";
    case "Person" /* Person */:
      return "People";
    case "Instrument" /* Instrument */:
      return "Instruments";
    case "Place" /* Place */:
      return "Places";
    case "Tune" /* Tune */:
      return "Tunes";
    case "Collection" /* Collection */:
      return "Collections";
    default:
      return "";
  }
};
var EntityService = {
  cleanSlug,
  makeHrefForTopLevel,
  makeHrefForView,
  makeHrefForEdit,
  makeHrefForAbout,
  makeHrefForTags,
  makeReadableNamePlural
};
var Entity_default = EntityService;

// app/components/Modal.tsx
var import_react_hotkeys_hook = require("react-hotkeys-hook");
var Modal = ({
  children,
  isVisible = false,
  onClose,
  title,
  className
}) => {
  (0, import_react_hotkeys_hook.useHotkeys)("esc", onClose, {
    enableOnTags: ["INPUT", "TEXTAREA"]
  }, [onClose]);
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: `${isVisible ? "visible" : "hidden"} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
    onClick: onClose
  }), /* @__PURE__ */ React.createElement("div", {
    className: `bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-9/10 overflow-y-auto overflow-x-hidden md:max-w-md ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-between items-center mb-4 text-black"
  }, /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement("button", {
    className: "btn-icon flex flex-row items-center justify-center ml-4 mb-0.5",
    onClick: onClose,
    "aria-label": "Close"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-0.5 mr-3"
  }, "ESC"), /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close"))), /* @__PURE__ */ React.createElement("div", {
    className: "text-base text-black font-normal whitespace-normal text-left cursor-auto"
  }, children)));
};
var Modal_default = Modal;

// app/components/SearchEntities.tsx
var import_react15 = require("@remix-run/react");
var import_react16 = require("react");
var import_client8 = require("@apollo/client");
var import_debounce = __toESM(require("lodash/debounce"));

// app/components/LoadingCircle.tsx
var LoadingCircle = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: "h-6"
}, /* @__PURE__ */ React.createElement("i", {
  className: `material-icons animate-spin text-gray-500 ${className ?? ""}`
}, "scatter_plot"));
var LoadingCircle_default = LoadingCircle;

// app/components/CreateNewEntities.tsx
var import_react14 = require("react");

// app/hooks/useRequireLogin.ts
var import_react8 = require("react");
var import_react9 = require("@remix-run/react");
var useRequireLogin = () => {
  const navigate = (0, import_react9.useNavigate)();
  const [currentUser] = useCurrentUser_default();
  const requireLogin = (0, import_react8.useCallback)(({ redirectTo } = {}) => navigate({
    pathname: "/login",
    query: {
      redirectTo: redirectTo ?? window.location.pathname
    }
  }), [navigate]);
  return { requireLogin, currentUser };
};
var useRequireLogin_default = useRequireLogin;

// app/components/CreatePersonForm.tsx
var import_react10 = require("react");
var import_client4 = require("@apollo/client");
var CREATE_PERSON_MUTATION = import_client4.gql`
	mutation CreatePerson($input: CreatePersonInput!) {
		createPerson(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var CreatePersonForm = ({ onSuccess }) => {
  const [createPerson, { loading, error, data }] = (0, import_client4.useMutation)(CREATE_PERSON_MUTATION, {
    errorPolicy: "all"
  });
  const [firstName, setFirstName] = (0, import_react10.useState)("");
  const [middleName, setMiddleName] = (0, import_react10.useState)("");
  const [lastName, setLastName] = (0, import_react10.useState)("");
  const [slug, setSlug] = (0, import_react10.useState)("");
  const [aliases, setAliases] = (0, import_react10.useState)("");
  const [description, setDescription] = (0, import_react10.useState)("");
  (0, import_react10.useEffect)(() => {
    let proposedSlug = "";
    if (firstName) {
      proposedSlug = firstName;
    }
    if (middleName) {
      proposedSlug = `${proposedSlug}-${middleName}`;
    }
    if (lastName) {
      proposedSlug = `${proposedSlug}-${lastName}`;
    }
    setSlug(Entity_default.cleanSlug(proposedSlug));
  }, [firstName, middleName, lastName]);
  const onCreatePerson = (event) => {
    event.preventDefault();
    const input = {
      firstName,
      middleName,
      lastName,
      slug,
      aliases,
      description
    };
    createPerson({ variables: { input } });
  };
  (0, import_react10.useEffect)(() => {
    if (data == null ? void 0 : data.createPerson) {
      if (onSuccess) {
        return onSuccess(data.createPerson);
      }
      window.alert("Person created successfully!");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreatePerson
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    autoFocus: true,
    className: "mb-2",
    value: firstName,
    onChange: (event) => setFirstName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Middle name (optional)",
    className: "mb-2",
    value: middleName,
    onChange: (event) => setMiddleName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Last name",
    className: "mb-2",
    value: lastName,
    onChange: (event) => setLastName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. kitty-hayes)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Person, for example", " ", `https://trad-archive.com/entities/people/${slug || "kitty-hayes"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Person. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Tony D, The Tradfather, Tony from the County Calamari")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreatePersonForm_default = CreatePersonForm;

// app/components/CreateInstrumentForm.tsx
var import_react11 = require("react");
var import_client5 = require("@apollo/client");
var CREATE_INSTRUMENT_MUTATION = import_client5.gql`
	mutation CreateInstrument($input: CreateInstrumentInput!) {
		createInstrument(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var CreateInstrumentForm = ({ onSuccess }) => {
  const [createInstrument, { loading, error, data }] = (0, import_client5.useMutation)(CREATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react11.useState)("");
  const [slug, setSlug] = (0, import_react11.useState)("");
  const [aliases, setAliases] = (0, import_react11.useState)("");
  const [description, setDescription] = (0, import_react11.useState)("");
  (0, import_react11.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateInstrument = (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      description
    };
    createInstrument({ variables: { input } });
  };
  (0, import_react11.useEffect)(() => {
    if (data == null ? void 0 : data.createInstrument) {
      if (onSuccess) {
        return onSuccess(data.createInstrument);
      }
      window.alert("Instrument created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateInstrument
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. button-accordion)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Instrument, for example", " ", `https://trad-archive.com/entities/instruments/${slug || "button-accordion"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Instrument. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Stomach Steinway, Squeezebox, Belly Organ")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreateInstrumentForm_default = CreateInstrumentForm;

// app/components/CreatePlaceForm.tsx
var import_react12 = require("react");
var import_client6 = require("@apollo/client");
var CREATE_PLACE_MUTATION = import_client6.gql`
	mutation CreatePlace($input: CreatePlaceInput!) {
		createPlace(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var CreatePlaceForm = ({ onSuccess }) => {
  const [createPlace, { loading, error, data }] = (0, import_client6.useMutation)(CREATE_PLACE_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react12.useState)("");
  const [slug, setSlug] = (0, import_react12.useState)("");
  const [aliases, setAliases] = (0, import_react12.useState)("");
  const [latitude, setLatitude] = (0, import_react12.useState)("");
  const [longitude, setLongitude] = (0, import_react12.useState)("");
  const [description, setDescription] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreatePlace = async (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description
    };
    try {
      await createPlace({ variables: { input } });
    } catch {
    }
  };
  (0, import_react12.useEffect)(() => {
    if (data == null ? void 0 : data.createPlace) {
      if (onSuccess) {
        return onSuccess(data.createPlace);
      }
      window.alert("Place created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setLatitude("");
      setLongitude("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreatePlace
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. galway-city)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Place, for example", " ", `https://trad-archive.com/entities/places/${slug || "galway-city"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Place. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Gaillimh, The City of Tribes")), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Latitude",
    className: "mb-2",
    value: latitude,
    onChange: (event) => setLatitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Longitude",
    className: "mb-2",
    value: longitude,
    onChange: (event) => setLongitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "To find the latitude and longitude, visit", " ", /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/place/${name}`,
    target: "_blank",
    rel: "noreferrer"
  }, name ? `${name} on ` : "", "Google Maps (will open in new tab)"), " ", `and right-click on the exact location you'd like. You'll see numbers like "53.2838294,-9.1888286". Click to copy them to your clipboard. The first one is latitude, and the second is longitude.`), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreatePlaceForm_default = CreatePlaceForm;

// app/components/CreateCollectionForm.tsx
var import_react13 = require("react");
var import_client7 = require("@apollo/client");
var CREATE_COLLECTION_MUTATION = import_client7.gql`
	mutation CreateCollection($input: CreateCollectionInput!) {
		createCollection(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var CreateCollectionForm = ({ onSuccess }) => {
  const [createCollection, { loading, error, data }] = (0, import_client7.useMutation)(CREATE_COLLECTION_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react13.useState)("");
  const [slug, setSlug] = (0, import_react13.useState)("");
  const [aliases, setAliases] = (0, import_react13.useState)("");
  const [description, setDescription] = (0, import_react13.useState)("");
  (0, import_react13.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateCollection = async (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      description
    };
    try {
      await createCollection({ variables: { input } });
    } catch {
    }
  };
  (0, import_react13.useEffect)(() => {
    if (data == null ? void 0 : data.createCollection) {
      if (onSuccess) {
        return onSuccess(data.createCollection);
      }
      window.alert("Collection created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 mb-8"
  }, `A Collection is a logical grouping of other entities. For example, "O'Neill's Music of Ireland" would be a Collection of Tunes. Or the "Alen MacWeeney Collection" would be a Collection of AudioItems.`), /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateCollection
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. alan-macweeney-collection)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Collection, for example", " ", `https://trad-archive.com/entities/collections/${slug || "alan-macweeney-collection"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Collection. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "O'Neill's, 1000 Fiddle Tunes")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreateCollectionForm_default = CreateCollectionForm;

// app/components/CreateNewEntities.tsx
var CreateNewEntities = ({ entityTypes, onNewEntityCreated }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [createPersonModalIsVisible, setCreatePersonModalIsVisible] = (0, import_react14.useState)(false);
  const [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] = (0, import_react14.useState)(false);
  const [createPlaceModalIsVisible, setCreatePlaceModalIsVisible] = (0, import_react14.useState)(false);
  const [createCollectionModalIsVisible, setCreateCollectionModalIsVisible] = (0, import_react14.useState)(false);
  const onCreateNewPersonClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreatePersonModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewInstrumentClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreateInstrumentModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewPlaceClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreatePlaceModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewCollectionClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreateCollectionModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onNewPersonCreated = (0, import_react14.useCallback)((person) => {
    setCreatePersonModalIsVisible(false);
    onNewEntityCreated(person);
  }, [onNewEntityCreated]);
  const onNewInstrumentCreated = (0, import_react14.useCallback)((instrument) => {
    setCreateInstrumentModalIsVisible(false);
    onNewEntityCreated(instrument);
  }, []);
  const onNewPlaceCreated = (0, import_react14.useCallback)((place) => {
    setCreatePlaceModalIsVisible(false);
    onNewEntityCreated(place);
  }, []);
  const onNewCollectionCreated = (0, import_react14.useCallback)((collection) => {
    setCreateCollectionModalIsVisible(false);
    onNewEntityCreated(collection);
  }, []);
  const shouldShowCreatePerson = typeof entityTypes === "undefined" || entityTypes.includes("Person" /* Person */);
  const shouldShowCreateInstrument = typeof entityTypes === "undefined" || entityTypes.includes("Instrument" /* Instrument */);
  const shouldShowCreatePlace = typeof entityTypes === "undefined" || entityTypes.includes("Place" /* Place */);
  const shouldShowCreateCollection = typeof entityTypes === "undefined" || entityTypes.includes("Collection" /* Collection */);
  const shouldShowCommaAfterCreatePerson = !entityTypes || shouldShowCreateInstrument || shouldShowCreatePlace || shouldShowCreateCollection;
  const shouldShowCommaAfterCreateInstrument = !entityTypes || shouldShowCreatePlace || shouldShowCreateCollection;
  const shouldShowCommaAfterCreatePlace = !entityTypes || shouldShowCreateCollection;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Can't find it? Create new:", " ", shouldShowCreatePerson && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewPersonClicked
  }, "Person"), shouldShowCommaAfterCreatePerson && ", "), shouldShowCreateInstrument && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewInstrumentClicked
  }, "Instrument"), shouldShowCommaAfterCreateInstrument && ", "), shouldShowCreatePlace && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewPlaceClicked
  }, "Place"), shouldShowCommaAfterCreatePlace && ", "), shouldShowCreateCollection && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewCollectionClicked
  }, "Collection")), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Person",
    isVisible: createPersonModalIsVisible,
    onClose: () => setCreatePersonModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreatePersonForm_default, {
    onSuccess: onNewPersonCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Instrument",
    isVisible: createInstrumentModalIsVisible,
    onClose: () => setCreateInstrumentModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreateInstrumentForm_default, {
    onSuccess: onNewInstrumentCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Place",
    isVisible: createPlaceModalIsVisible,
    onClose: () => setCreatePlaceModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreatePlaceForm_default, {
    onSuccess: onNewPlaceCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Collection",
    isVisible: createCollectionModalIsVisible,
    onClose: () => setCreateCollectionModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreateCollectionForm_default, {
    onSuccess: onNewCollectionCreated
  })));
};
var CreateNewEntities_default = CreateNewEntities;

// app/components/SearchEntities.tsx
var SEARCH_ENTITIES_QUERY = import_client8.gql`
	query SearchEntities($input: SearchEntitiesInput!) {
		searchEntities(input: $input) {
			...AudioItem
			...Person
			...Instrument
			...Place
			...Tune
			...Collection
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.person}
	${EntityFragments.instrument}
	${EntityFragments.place}
	${EntityFragments.tune}
	${EntityFragments.collection}
`;
var SearchEntities = ({
  entityTypes,
  take,
  onSelect,
  onNewEntityCreated,
  className
}) => {
  const [searchTerm, setSearchTerm] = (0, import_react16.useState)("");
  const [searchResults, setSearchResults] = (0, import_react16.useState)();
  const onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };
  const [searchEntities, { loading, data, error }] = (0, import_client8.useLazyQuery)(SEARCH_ENTITIES_QUERY, {
    fetchPolicy: "no-cache"
  });
  const debouncedSearchEntities = (0, import_react16.useCallback)((0, import_debounce.default)(searchEntities, 300, { trailing: true }), [searchEntities]);
  (0, import_react16.useEffect)(() => {
    const cleanedSearchTerm = (searchTerm == null ? void 0 : searchTerm.trim()) ?? "";
    if (cleanedSearchTerm.length >= 3) {
      debouncedSearchEntities({
        variables: {
          input: {
            searchTerm: cleanedSearchTerm,
            entityTypes,
            take: take ?? 24
          }
        }
      });
    }
  }, [searchTerm]);
  (0, import_react16.useEffect)(() => {
    if (data == null ? void 0 : data.searchEntities) {
      setSearchResults(data.searchEntities);
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement("div", {
    className: className ?? ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("input", {
    autoFocus: true,
    placeholder: "Start typing...",
    value: searchTerm,
    onChange: onChangeSearchTerm
  }), loading && /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-2 right-2"
  }, /* @__PURE__ */ React.createElement(LoadingCircle_default, null))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4 ml-2"
  }, "Error fetching results"), searchResults && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "max-h-40"
  }, searchResults.map((entity, index) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: index
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex flex-1 justify-between items-center text-left p-2 rounded cursor-pointer hover:bg-gray-200",
    onClick: () => onSelect(entity)
  }, /* @__PURE__ */ React.createElement("span", null, entity.name, entity.entityType === "Tune" /* Tune */ ? ` (${entity.type})` : ""), /* @__PURE__ */ React.createElement("span", {
    className: "uppercase text-gray-500 text-sm"
  }, entity.entityType)), /* @__PURE__ */ React.createElement(import_react15.Link, {
    to: Entity_default.makeHrefForAbout(entity)
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn-icon w-auto px-2",
    target: "_blank",
    "aria-label": `Open ${entity.name} in New Tab`
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base"
  }, "launch")))))), searchResults.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "p-2 block text-gray-500"
  }, "No results"), onNewEntityCreated && /* @__PURE__ */ React.createElement("div", {
    className: "mt-2 ml-2"
  }, /* @__PURE__ */ React.createElement(CreateNewEntities_default, {
    entityTypes,
    onNewEntityCreated
  }))));
};
var SearchEntities_default = SearchEntities;

// app/components/Header.tsx
var Header = () => {
  const navigate = (0, import_react19.useNavigate)();
  const [currentUser, { loading }] = useCurrentUser_default();
  const [searchModalIsVisible, setSearchModalIsVisible] = (0, import_react17.useState)(false);
  const openSearchModal = (event) => {
    event.preventDefault();
    setSearchModalIsVisible(true);
  };
  const closeSearchModal = () => {
    setSearchModalIsVisible(false);
  };
  (0, import_react_hotkeys_hook2.useHotkeys)("/", openSearchModal);
  const onSelectSearchResult = (0, import_react17.useCallback)((entity) => {
    setSearchModalIsVisible(false);
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  const onNewEntityCreated = (0, import_react17.useCallback)((entity) => {
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  const userActions = (0, import_react17.useMemo)(() => {
    if (loading || typeof currentUser === "undefined") {
      return null;
    } else if (currentUser) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "flex flex-row items-center"
      }, /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/saved-items"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons"
      }, "bookmark"), /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Saved"))), User_default.isAdmin(currentUser) && /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/admin"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons"
      }, "manage_accounts"), /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Admin"))), /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/account"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons"
      }, "account_circle"), /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Account"))));
    } else {
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/login"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current whitespace-nowrap hover:text-gray-400 ml-4"
      }, "Log In")), /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/signup"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn text-current no-underline whitespace-nowrap hover:text-current ml-4"
      }, "Sign Up")));
    }
  }, [loading, currentUser]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700",
    suppressHydrationWarning: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement(import_react18.Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn-text text-current whitespace-nowrap text-yellow-200 hover:text-gray-400"
  }, "Trad Archive")), /* @__PURE__ */ React.createElement("button", {
    className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 group ml-4",
    onClick: openSearchModal
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "search"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Search"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5"
  }, `/`)), /* @__PURE__ */ React.createElement(import_react18.Link, {
    to: "/entities/audio-items/random"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "flex flex-row items-center link-bare text-current text-white hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "block h-6"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "shuffle")), /* @__PURE__ */ React.createElement("div", {
    className: "md:pl-2 hidden md:block"
  }, "Random")))), userActions), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Search",
    isVisible: searchModalIsVisible,
    onClose: closeSearchModal
  }, /* @__PURE__ */ React.createElement(SearchEntities_default, {
    onSelect: onSelectSearchResult,
    onNewEntityCreated
  })));
};
var Header_default = Header;

// app/components/Footer.tsx
function Footer() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start w-full p-4 pt-7 pb-24 bg-gray-900 text-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "This project is a collaboration between the", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.itma.ie/",
    target: "_blank"
  }, "Irish Traditional Music Archive", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), " ", "and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://dangurney.net",
    target: "_blank"
  }, "Dan Gurney ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Special thanks to", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://thesession.org/",
    target: "_blank"
  }, "The Session ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), " ", "for providing tune data."), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "All of the code is open source on", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/dgurns/trad-archive",
    target: "_blank"
  }, "GitHub ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), ". We welcome community contributors."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/dgurns/trad-archive/discussions",
    target: "_blank"
  }, "Share feedback or report a bug", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/root.tsx
var meta = () => ({
  charset: "utf-8",
  title: "Trad Archive",
  viewport: "width=device-width,initial-scale=1"
});
function links() {
  return [
    { rel: "stylesheet", href: globals_generated_do_not_edit_default },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/favicons/android-chrome-192x192.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png"
    },
    {
      rel: "shortcut icon",
      href: "/favicons/favicon.ico"
    }
  ];
}
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react20.Meta, null), /* @__PURE__ */ React.createElement(import_react20.Links, null)), /* @__PURE__ */ React.createElement(import_client9.ApolloProvider, {
    client: apolloClient
  }, /* @__PURE__ */ React.createElement(PlayerContextProvider_default, null, /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44"
  }, /* @__PURE__ */ React.createElement(import_react20.Outlet, null)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react20.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react20.Scripts, null), /* @__PURE__ */ React.createElement(import_react20.LiveReload, null)))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var upload_exports = {};
__export(upload_exports, {
  default: () => upload_default
});
var import_react25 = require("react");
var import_react26 = require("@remix-run/react");
var import_client10 = require("@apollo/client");

// app/components/Layout.tsx
var import_react21 = require("react");
var { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF2 } = process.env;
var Layout = ({ children, pageTitle }) => {
  const shouldShowPreviewWarning = NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF2 !== "master";
  const fixedHeaderRef = (0, import_react21.useRef)();
  const defaultFixedHeaderHeight = shouldShowPreviewWarning ? 76 : 48;
  const [fixedHeaderHeight, setFixedHeaderHeight] = (0, import_react21.useState)(defaultFixedHeaderHeight);
  (0, import_react21.useEffect)(() => {
    const fixedHeader = fixedHeaderRef.current;
    if (fixedHeader) {
      setFixedHeaderHeight(fixedHeader.offsetHeight);
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    style: { paddingTop: fixedHeaderHeight }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl py-6 px-4 pb-44"
  }, children), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    ref: fixedHeaderRef,
    id: "header"
  }, shouldShowPreviewWarning && /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center justify-center py-1 px-4 bg-black text-white text-sm text-center"
  }, "This is a preview version of the site with fake data."), /* @__PURE__ */ React.createElement(Header_default, null)));
};
var Layout_default = Layout;

// app/components/RequireUser.tsx
var import_react22 = require("@remix-run/react");
var RequireUser = ({
  children,
  requireUserId
}) => {
  const navigate = (0, import_react22.useNavigate)();
  const [currentUser, { data, error }] = useCurrentUser_default();
  if (!data && !error) {
    return /* @__PURE__ */ React.createElement("div", null, "Checking for logged-in user...");
  } else if (requireUserId && (currentUser == null ? void 0 : currentUser.id) !== requireUserId) {
    return /* @__PURE__ */ React.createElement("div", null, "You do not have access to this page");
  } else if (currentUser) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  } else if (typeof window !== "undefined") {
    navigate({
      pathname: "/login",
      query: { redirectTo: window.location.pathname }
    });
    return null;
  }
  return null;
};
var RequireUser_default = RequireUser;

// app/components/Breadcrumb.tsx
var import_react23 = require("@remix-run/react");
var Breadcrumb = ({ items = [], className }) => {
  if (items.length === 0) {
    return null;
  }
  if (items.length === 1) {
    return /* @__PURE__ */ React.createElement("h1", {
      className: className ?? ""
    }, items[0].label);
  }
  const subItems = items.slice(0, items.length - 1);
  const finalItem = items[items.length - 1];
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center mb-1"
  }, subItems.map(({ label, href }, index) => /* @__PURE__ */ React.createElement("div", {
    className: "flex",
    key: index
  }, href ? /* @__PURE__ */ React.createElement(import_react23.Link, {
    to: href
  }, label) : /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, label), /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-gray-500 text-base ml-1"
  }, "keyboard_arrow_right")))), /* @__PURE__ */ React.createElement("h1", null, finalItem.label));
};
var Breadcrumb_default = Breadcrumb;

// app/components/LoadingBlock.tsx
var LoadingBlock = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: `flex flex-col justify-start items-start w-full ${className ?? ""}`
}, /* @__PURE__ */ React.createElement("div", {
  className: "flex h-5 w-2/3 rounded bg-gray-300 mb-4 animate-pulse"
}), /* @__PURE__ */ React.createElement("div", {
  className: "flex h-12 w-full rounded bg-gray-300 mb-4 animate-pulse"
}), /* @__PURE__ */ React.createElement("div", {
  className: "flex h-5 w-5/12 rounded bg-gray-300 mb-4 animate-pulse"
}));
var LoadingBlock_default = LoadingBlock;

// app/components/FileUploader.tsx
var import_react24 = require("react");
var FileUploader = ({ filesWithUploadUrls, onSuccess }) => {
  const queue = (0, import_react24.useRef)({
    pending: filesWithUploadUrls,
    inProgress: [],
    failed: [],
    succeeded: []
  });
  const [ticker, setTicker] = (0, import_react24.useState)(0);
  const moveFromPendingToInProgress = (file) => {
    const updated = __spreadValues({}, queue.current);
    updated.pending = updated.pending.filter((f) => f.uploadUrl !== file.uploadUrl);
    updated.inProgress = [...updated.inProgress, file];
    queue.current = updated;
  };
  const moveFromInProgressToSucceeded = (file) => {
    const updated = __spreadValues({}, queue.current);
    updated.inProgress = updated.inProgress.filter((f) => f.uploadUrl !== file.uploadUrl);
    updated.succeeded = [...updated.succeeded, file];
    queue.current = updated;
  };
  const moveFromInProgressToFailed = (file) => {
    const updated = __spreadValues({}, queue.current);
    updated.inProgress = updated.inProgress.filter((f) => f.uploadUrl !== file.uploadUrl);
    updated.failed = [...updated.failed, file];
    queue.current = updated;
  };
  const uploadFile = async (f) => {
    try {
      moveFromPendingToInProgress(f);
      await fetch(f.uploadUrl, {
        method: "PUT",
        body: f.file
      });
      moveFromInProgressToSucceeded(f);
    } catch {
      moveFromInProgressToFailed(f);
    }
  };
  const checkForFilesToUpload = () => {
    if (queue.current.succeeded.length === filesWithUploadUrls.length) {
      if (onSuccess) {
        setTimeout(() => onSuccess(), 500);
      }
      return;
    }
    if (queue.current.pending.length === 0 || queue.current.inProgress.length >= 2) {
      return;
    }
    uploadFile(queue.current.pending[0]);
  };
  (0, import_react24.useEffect)(() => {
    const interval = setInterval(checkForFilesToUpload, 1e3);
    return () => clearInterval(interval);
  }, [checkForFilesToUpload]);
  (0, import_react24.useEffect)(() => {
    const interval = setInterval(() => setTicker(ticker + 1), 1e3);
    return () => clearInterval(interval);
  }, [ticker]);
  const renderFileStatus = (file) => {
    if (queue.current.inProgress.includes(file)) {
      return /* @__PURE__ */ React.createElement(LoadingCircle_default, null);
    } else if (queue.current.failed.includes(file)) {
      return /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-red-600"
      }, "error");
    } else if (queue.current.succeeded.includes(file)) {
      return /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-teal-600"
      }, "check");
    } else {
      return /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-gray-500"
      }, "schedule");
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col",
    key: ticker
  }, filesWithUploadUrls.map((f, i) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: i
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1"
  }, f.file.name), renderFileStatus(f)))));
};
var FileUploader_default = FileUploader;

// app/services/DateTime.ts
var import_format = __toESM(require("date-fns/format"));
var import_isToday = __toESM(require("date-fns/isToday"));
var import_isYesterday = __toESM(require("date-fns/isYesterday"));
var formatSecondsAsDuration = (inputSeconds) => {
  const hours = Math.floor(inputSeconds / (60 * 60));
  const minutes = Math.floor((inputSeconds - hours * 60 * 60) / 60);
  const minutesAsTwoCharString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = inputSeconds - hours * 60 * 60 - minutes * 60;
  const secondsAsTwoCharString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  let output = `${minutes}:${secondsAsTwoCharString}`;
  if (hours > 0) {
    output = `${hours}:${minutesAsTwoCharString}:${secondsAsTwoCharString}`;
  }
  return output;
};
var formatDateYear = (date, shouldCapitalize = false) => {
  if (!date) {
    return "";
  }
  const dateObject = new Date(date);
  if ((0, import_isToday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "T" : "t"}oday`);
  } else if ((0, import_isYesterday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday`);
  } else {
    return (0, import_format.default)(new Date(date), `LLLL d, y`);
  }
};
var formatDateYearTime = (date, shouldCapitalize = false) => {
  if (!date) {
    return "";
  }
  const dateObject = new Date(date);
  if ((0, import_isToday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "T" : "t"}oday at' h:mm a`);
  } else if ((0, import_isYesterday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday at' h:mm a`);
  } else {
    return (0, import_format.default)(new Date(date), `LLLL d, y 'at' h:mm a`);
  }
};
var DateTimeService = {
  formatSecondsAsDuration,
  formatDateYear,
  formatDateYearTime
};
var DateTime_default = DateTimeService;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var SUBMISSION = import_client10.gql`
	query Submission($input: SubmissionInput!) {
		submission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var CREATE_PRESIGNED_FILE_UPLOAD_URLS = import_client10.gql`
	mutation CreatePresignedFileUploadUrls(
		$input: CreatePresignedFileUploadUrlsInput!
	) {
		createPresignedFileUploadUrls(input: $input) {
			filename
			presignedUploadUrl
		}
	}
`;
var SubmissionsViewByIdUpload = () => {
  const navigate = (0, import_react26.useNavigate)();
  const { id } = navigate.query;
  const submissionId = typeof id === "string" ? id : void 0;
  const { data, error } = (0, import_client10.useQuery)(SUBMISSION, {
    variables: { input: { id: submissionId } },
    skip: !submissionId
  });
  const [files, setFiles] = (0, import_react25.useState)([]);
  const [uploadQueue, setUploadQueue] = (0, import_react25.useState)();
  const [getPresignedUrls] = (0, import_client10.useMutation)(CREATE_PRESIGNED_FILE_UPLOAD_URLS);
  const onUploadClicked = async () => {
    if (!submissionId) {
      return;
    }
    try {
      const filenamesForUrls = files.map((f) => `${f.size}_${f.name}`);
      const response = await getPresignedUrls({
        variables: { input: { submissionId, filenames: filenamesForUrls } }
      });
      const uploadUrls = response.data.createPresignedFileUploadUrls;
      if (uploadUrls.length !== files.length) {
        throw new Error("Unexpected number of presigned upload URLs");
      }
      setUploadQueue(files.map((f, index) => ({
        file: f,
        uploadUrl: uploadUrls[index].presignedUploadUrl
      })));
    } catch {
      alert("Error uploading files. Please try again.");
    }
  };
  if (!data) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, error ? /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600"
    }, error.graphQLErrors.map((e) => e.message).join(", ")) : /* @__PURE__ */ React.createElement(LoadingBlock_default, null)));
  }
  const onFilesSelected = (event) => {
    const updatedFiles = [...files];
    const selected = Array.from(event.target.files);
    for (const s of selected) {
      if (!updatedFiles.find((f) => f.name === s.name && f.size === s.size && f.lastModified === s.lastModified)) {
        updatedFiles.push(s);
      }
    }
    setFiles(updatedFiles);
  };
  const onRemove = (file) => {
    setFiles(files.filter((f) => {
      if (f.name === file.name && f.size === file.size && f.lastModified === file.lastModified) {
        return false;
      }
      return true;
    }));
  };
  const onUploadSuccess = () => {
    alert("Files uploaded successfully!");
    navigate("/account/submissions");
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions", href: "/account/submissions" },
      {
        label: DateTime_default.formatDateYearTime(data.submission.createdAt, true)
      },
      { label: "Upload Files" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-col"
  }, !uploadQueue ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "file-picker"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "btn-text mb-4 cursor-pointer"
  }, files.length === 0 ? "Choose Files" : "Choose More Files")), /* @__PURE__ */ React.createElement("input", {
    id: "file-picker",
    type: "file",
    multiple: true,
    onChange: onFilesSelected,
    style: { display: "none" }
  }), files.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("ul", {
    className: "mb-6"
  }, files.map((f, index) => /* @__PURE__ */ React.createElement("li", {
    key: index
  }, f.name, " ", /* @__PURE__ */ React.createElement("button", {
    className: "btn-text pl-2",
    onClick: () => onRemove(f)
  }, "Remove")))), /* @__PURE__ */ React.createElement("button", {
    className: "btn block",
    onClick: onUploadClicked
  }, "Upload ", files.length, " File", files.length === 1 ? "" : "s"))) : /* @__PURE__ */ React.createElement(FileUploader_default, {
    filesWithUploadUrls: uploadQueue,
    onSuccess: onUploadSuccess
  }))));
};
var upload_default = SubmissionsViewByIdUpload;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/verification-requests.tsx
var verification_requests_exports = {};
__export(verification_requests_exports, {
  default: () => verification_requests_default
});
var import_react28 = require("react");
var import_react29 = require("@remix-run/react");
var import_client11 = require("@apollo/client");
var import_compareDesc = __toESM(require("date-fns/compareDesc"));

// app/components/RequireAdmin.tsx
var import_react27 = require("@remix-run/react");
var RequireAdmin = ({ children }) => {
  const navigate = (0, import_react27.useNavigate)();
  const [currentUser, { data, error }] = useCurrentUser_default();
  if (currentUser && User_default.isAdmin(currentUser)) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  } else if (!data && !error) {
    return /* @__PURE__ */ React.createElement("div", null, "Checking admin permissions...");
  } else if (typeof window !== "undefined") {
    navigate({
      pathname: "/login",
      query: { redirectTo: window.location.pathname }
    });
    return null;
  }
  return null;
};
var RequireAdmin_default = RequireAdmin;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/verification-requests.tsx
var VERIFICATION_REQUESTS = import_client11.gql`
	query VerificationRequests($input: VerificationRequestsInput!) {
		verificationRequests(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var UPDATE_VERIFICATION_REQUEST_STATUS = import_client11.gql`
	mutation UpdateVerificationRequestStatus(
		$input: UpdateVerificationRequestStatusInput!
	) {
		updateVerificationRequestStatus(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var VerificationRequests = () => {
  const [statusToFetch, setStatusToFetch] = (0, import_react28.useState)("Pending" /* Pending */);
  const onChangeStatusToFetch = (event) => {
    const updatedStatus = event.target.value;
    if (!updatedStatus) {
      setStatusToFetch(void 0);
    } else {
      setStatusToFetch(event.target.value);
    }
  };
  const {
    loading: verificationRequestsLoading,
    data: verificationRequestsData,
    error: verificationRequestsError
  } = (0, import_client11.useQuery)(VERIFICATION_REQUESTS, {
    variables: { input: { take: 200, skip: 0, status: statusToFetch } },
    fetchPolicy: "network-only"
  });
  const verificationRequests = (0, import_react28.useMemo)(() => {
    if (!(verificationRequestsData == null ? void 0 : verificationRequestsData.verificationRequests)) {
      return [];
    }
    const sortedVerificationRequests = [
      ...verificationRequestsData.verificationRequests
    ];
    sortedVerificationRequests.sort((a, b) => (0, import_compareDesc.default)(new Date(a.createdAt), new Date(b.createdAt)));
    return sortedVerificationRequests;
  }, [verificationRequestsData]);
  const [
    updateVerificationRequestStatus,
    {
      loading: updateVerificationRequestStatusLoading,
      error: updateVerificationRequestStatusError
    }
  ] = (0, import_client11.useMutation)(UPDATE_VERIFICATION_REQUEST_STATUS, { errorPolicy: "all" });
  const onApproveClicked = (id) => {
    updateVerificationRequestStatus({
      variables: { input: { id, status: "Approved" /* Approved */ } }
    });
  };
  const onDenyClicked = (id) => {
    updateVerificationRequestStatus({
      variables: { input: { id, status: "Denied" /* Denied */ } }
    });
  };
  (0, import_react28.useEffect)(() => {
    if (updateVerificationRequestStatusError) {
      window.alert("Error updating Verification Request status. Please reload the page and try again.");
    }
  }, [updateVerificationRequestStatusError]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Verification Requests" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement("select", {
    className: "mb-6 flex max-w-xs",
    value: statusToFetch,
    onChange: onChangeStatusToFetch
  }, /* @__PURE__ */ React.createElement("option", {
    value: "Pending" /* Pending */
  }, "Pending"), /* @__PURE__ */ React.createElement("option", {
    value: "Approved" /* Approved */
  }, "Approved"), /* @__PURE__ */ React.createElement("option", {
    value: "Denied" /* Denied */
  }, "Denied"), /* @__PURE__ */ React.createElement("option", {
    value: ""
  }, "All")), verificationRequestsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), verificationRequestsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, verificationRequestsError.graphQLErrors.map((error) => error.message).join(", ")), !verificationRequestsLoading && (verificationRequests == null ? void 0 : verificationRequests.map((verificationRequest, index) => {
    const {
      id,
      person,
      presignedImageDownloadUrl,
      createdAt,
      createdByUser,
      status
    } = verificationRequest;
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4",
      key: index
    }, "Created ", DateTime_default.formatDateYearTime(createdAt), /* @__PURE__ */ React.createElement("br", null), "User", " ", /* @__PURE__ */ React.createElement(import_react29.Link, {
      to: `/users/${createdByUser.id}`
    }, /* @__PURE__ */ React.createElement("a", {
      target: "_blank"
    }, createdByUser.username)), " ", "is asking to be verified as Person", " ", /* @__PURE__ */ React.createElement(import_react29.Link, {
      to: Entity_default.makeHrefForView(person)
    }, /* @__PURE__ */ React.createElement("a", {
      target: "_blank"
    }, person.name)), /* @__PURE__ */ React.createElement("br", null), presignedImageDownloadUrl && /* @__PURE__ */ React.createElement(React.Fragment, null, "Proof:", " ", /* @__PURE__ */ React.createElement("a", {
      href: presignedImageDownloadUrl,
      target: "_blank"
    }, "Image"), /* @__PURE__ */ React.createElement("br", null)), "Email: ", createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Status: ", status, /* @__PURE__ */ React.createElement("br", null), isApprovedVerificationRequest(verificationRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny"), isDeniedVerificationRequest(verificationRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), isPendingVerificationRequest(verificationRequest) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
      className: "btn-text mr-4",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny")));
  })))));
};
var verification_requests_default = VerificationRequests;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug].tsx
var slug_exports = {};
__export(slug_exports, {
  AUDIO_ITEM_QUERY: () => AUDIO_ITEM_QUERY2,
  default: () => slug_default
});
var import_react57 = require("@remix-run/react");
var import_react58 = require("@remix-run/react");
var import_client25 = require("@apollo/client");

// app/components/AudioItemCard.tsx
var import_react50 = require("react");
var import_react51 = require("@remix-run/react");
var import_react52 = require("@remix-run/react");

// app/components/Tags.tsx
var import_react35 = require("react");
var import_react36 = require("@remix-run/react");

// app/services/Tag.ts
var import_compareAsc = __toESM(require("date-fns/compareAsc"));
var import_compareDesc2 = __toESM(require("date-fns/compareDesc"));
var TagSortStrategy = /* @__PURE__ */ ((TagSortStrategy2) => {
  TagSortStrategy2["CreatedAtThenTimeMarker"] = "CREATED_AT_THEN_TIME_MARKER";
  TagSortStrategy2["CreatedAtDesc"] = "CREATED_AT_DESC";
  return TagSortStrategy2;
})(TagSortStrategy || {});
var sortByCreatedAtThenTimeMarker = (tags) => {
  const sortedTags = [...tags ?? []];
  sortedTags.sort((a, b) => {
    if (typeof a.subjectTimeMarkerSeconds !== "number" && typeof b.subjectTimeMarkerSeconds !== "number") {
      return (0, import_compareAsc.default)(new Date(a.createdAt), new Date(b.createdAt));
    }
    if (typeof a.subjectTimeMarkerSeconds !== "number" && typeof b.subjectTimeMarkerSeconds === "number") {
      return -1;
    }
    return a.subjectTimeMarkerSeconds - b.subjectTimeMarkerSeconds;
  });
  return sortedTags;
};
var sortByCreatedAtDesc = (tags) => {
  const sortedTags = [...tags ?? []];
  sortedTags.sort((a, b) => {
    return (0, import_compareDesc2.default)(new Date(a.createdAt), new Date(b.createdAt));
  });
  return sortedTags;
};
var sort = (tags = [], sortStrategy = "CREATED_AT_THEN_TIME_MARKER" /* CreatedAtThenTimeMarker */) => {
  switch (sortStrategy) {
    case "CREATED_AT_THEN_TIME_MARKER" /* CreatedAtThenTimeMarker */:
      return sortByCreatedAtThenTimeMarker(tags);
    case "CREATED_AT_DESC" /* CreatedAtDesc */:
      return sortByCreatedAtDesc(tags);
    default:
      return tags;
  }
};
var Tag_default = {
  TagSortStrategy,
  sort
};

// app/components/AddTagButton.tsx
var import_react33 = require("react");
var import_client15 = require("@apollo/client");

// app/components/CreateTagForm.tsx
var import_react32 = require("react");
var import_client14 = require("@apollo/client");

// app/hooks/useTags.ts
var import_react30 = require("react");
var import_client12 = require("@apollo/client");
var TAGS_QUERY = import_client12.gql`
	query Tags($input: TagsInput!) {
		tags(input: $input) {
			...Tag
		}
	}
	${TagFragments.tag}
`;
var useTags = ({
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  var _a;
  const [getTags, tagsQuery] = (0, import_client12.useLazyQuery)(TAGS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = tagsQuery;
  (0, import_react30.useEffect)(() => {
    getTags({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getTags, resultsPerPage]);
  const tags = data == null ? void 0 : data.tags;
  const fetchNextPageOfTags = (0, import_react30.useCallback)(() => {
    fetchMore({
      variables: {
        input: {
          take: resultsPerPage,
          skip: tags.length ?? 0
        }
      }
    });
  }, [fetchMore, resultsPerPage, tags]);
  return {
    tags: (_a = tagsQuery.data) == null ? void 0 : _a.tags,
    getTags,
    tagsQuery,
    fetchNextPageOfTags
  };
};
var useTags_default = useTags;

// app/components/SelectRelationship.tsx
var import_react31 = require("react");
var import_client13 = require("@apollo/client");
var SEARCH_RELATIONSHIPS_QUERY = import_client13.gql`
	query SearchRelationships(
		$subjectEntityType: String!
		$objectEntityType: String!
	) {
		searchRelationships(
			subjectEntityType: $subjectEntityType
			objectEntityType: $objectEntityType
		) {
			...Relationship
		}
	}
	${RelationshipFragments.relationship}
`;
var SelectRelationship = ({
  subjectEntity,
  objectEntity,
  onSelect
}) => {
  const [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react31.useState)("");
  const { loading, data, error } = (0, import_client13.useQuery)(SEARCH_RELATIONSHIPS_QUERY, {
    variables: {
      subjectEntityType: subjectEntity.entityType,
      objectEntityType: objectEntity.entityType
    },
    fetchPolicy: "no-cache"
  });
  const relationshipOptions = (data == null ? void 0 : data.searchRelationships) ?? [];
  (0, import_react31.useEffect)(() => {
    if (relationshipOptions.length > 0) {
      onSelectRelationshipId(relationshipOptions[0].id);
    }
  }, [relationshipOptions]);
  const onSelectRelationshipId = (relationshipId) => {
    setSelectedRelationshipId(relationshipId);
    onSelect(relationshipId);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 text-gray-500"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm uppercase pr-2"
  }, subjectEntity.entityType), subjectEntity.name), loading ? /* @__PURE__ */ React.createElement(LoadingCircle_default, null) : /* @__PURE__ */ React.createElement("select", {
    className: "mb-2",
    value: selectedRelationshipId,
    onChange: (event) => onSelectRelationshipId(event.target.value)
  }, relationshipOptions.map((relationship, index) => /* @__PURE__ */ React.createElement("option", {
    value: relationship.id,
    key: index
  }, relationship.name))), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm uppercase pr-2"
  }, objectEntity.entityType), objectEntity.name), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, error));
};
var SelectRelationship_default = SelectRelationship;

// app/components/TimestampInput.tsx
var TimestampInput = ({ valueInSeconds, onChange, className }) => {
  const hrs = Math.floor(valueInSeconds / 3600);
  const mins = Math.floor((valueInSeconds - hrs * 3600) / 60);
  const secs = valueInSeconds - hrs * 3600 - mins * 60;
  const onChangeHrs = (event) => {
    const newHrs = parseInt(event.target.value, 10) || 0;
    const newValueInSeconds = newHrs * 3600 + mins * 60 + secs;
    onChange(newValueInSeconds);
  };
  const onChangeMins = (event) => {
    const newMins = parseInt(event.target.value, 10) || 0;
    const newValueInSeconds = hrs * 3600 + newMins * 60 + secs;
    onChange(newValueInSeconds);
  };
  const onChangeSecs = (event) => {
    const newSecs = parseInt(event.target.value, 10) || 0;
    const newValueInSeconds = hrs * 3600 + mins * 60 + newSecs;
    onChange(newValueInSeconds);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row items-center ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("input", {
    type: "number",
    id: "hrs",
    className: "flex max-w-[50px]",
    value: hrs || "",
    placeholder: "0",
    onChange: onChangeHrs
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "hours",
    className: "px-2"
  }, "hr", hrs !== 1 && "s"), /* @__PURE__ */ React.createElement("input", {
    type: "number",
    id: "mins",
    className: "flex max-w-[55px]",
    value: mins || "",
    placeholder: "0",
    onChange: onChangeMins
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "mins",
    className: "px-2"
  }, "min", mins !== 1 ? "s" : ""), /* @__PURE__ */ React.createElement("input", {
    type: "number",
    id: "secs",
    className: "flex max-w-[55px]",
    value: secs || "",
    placeholder: "0",
    onChange: onChangeSecs
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "secs",
    className: "px-2"
  }, "sec", secs !== 1 ? "s" : ""));
};
var TimestampInput_default = TimestampInput;

// app/components/CreateTagForm.tsx
var CREATE_TAG_MUTATION = import_client14.gql`
	mutation CreateTag($input: CreateTagInput!) {
		createTag(input: $input) {
			id
		}
	}
`;
var CreateTagForm = ({ entity, onSuccess }) => {
  const {
    activeAudioItem,
    playbackPositionSeconds,
    activeItemDurationSeconds
  } = usePlayerContext_default();
  const isActiveAudioItem = (activeAudioItem == null ? void 0 : activeAudioItem.id) === entity.id;
  const defaultTimeMarkerValue = isActiveAudioItem ? playbackPositionSeconds : void 0;
  const [shouldAddTimeMarker, setShouldAddTimeMarker] = (0, import_react32.useState)(false);
  const [timeMarkerValue, setTimeMarkerValue] = (0, import_react32.useState)(defaultTimeMarkerValue);
  const [selectedEntity, setSelectedEntity] = (0, import_react32.useState)(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react32.useState)("");
  const [shouldCreateInverseRelationship, setShouldCreateInverseRelationship] = (0, import_react32.useState)(true);
  const [selectedInverseRelationshipId, setSelectedInverseRelationshipId] = (0, import_react32.useState)("");
  const [createTag, { data, error }] = (0, import_client14.useMutation)(CREATE_TAG_MUTATION, {
    errorPolicy: "all"
  });
  const [tagsAreCreating, setTagsAreCreating] = (0, import_react32.useState)(false);
  const [primaryCreatedTag, setPrimaryCreatedTag] = (0, import_react32.useState)(void 0);
  const [tagsAreCreated, setTagsAreCreated] = (0, import_react32.useState)(false);
  const {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default({
    queryOptions: { fetchPolicy: "network-only" }
  });
  (0, import_react32.useEffect)(() => {
    if (!tagsAreCreated) {
      return;
    }
    const onCreateSuccess = async (tag) => {
      if (refetchTopLevelTags) {
        await refetchTopLevelTags();
      }
      await onSuccess(tag);
    };
    if (primaryCreatedTag) {
      onCreateSuccess(primaryCreatedTag);
    }
  }, [data, refetchTopLevelTags, onSuccess, tagsAreCreated, primaryCreatedTag]);
  const onSelectEntity = (0, import_react32.useCallback)((selectedEntityFromResults) => {
    if (selectedEntityFromResults.id === entity.id) {
      return window.alert("Cannot tag an entity with itself");
    }
    setSelectedEntity(selectedEntityFromResults);
  }, [entity]);
  const onNewEntityCreated = (0, import_react32.useCallback)((entity2) => {
    setSelectedEntity(entity2);
  }, []);
  const onTimeMarkerValueChanged = (0, import_react32.useCallback)((newTimeMarkerValueSeconds) => {
    setShouldAddTimeMarker(true);
    if (newTimeMarkerValueSeconds >= activeItemDurationSeconds) {
      setTimeMarkerValue(activeItemDurationSeconds);
    } else if (newTimeMarkerValueSeconds <= 0) {
      setTimeMarkerValue(0);
    } else {
      setTimeMarkerValue(newTimeMarkerValueSeconds);
    }
  }, [activeItemDurationSeconds]);
  const onSelectRelationship = (0, import_react32.useCallback)((relationshipId) => {
    setSelectedRelationshipId(relationshipId);
  }, [setSelectedRelationshipId]);
  const onSelectInverseRelationship = (0, import_react32.useCallback)((relationshipId) => {
    setSelectedInverseRelationshipId(relationshipId);
  }, [setSelectedInverseRelationshipId]);
  const onCreateTagClicked = (0, import_react32.useCallback)(async () => {
    var _a;
    setTagsAreCreating(true);
    let subjectTimeMarkerSeconds;
    if (shouldAddTimeMarker && !isNaN(timeMarkerValue)) {
      subjectTimeMarkerSeconds = timeMarkerValue;
    }
    const tagInput = {
      relationshipId: selectedRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
      subjectTimeMarkerSeconds
    };
    const primaryTagQuery = await createTag({ variables: { input: tagInput } });
    setPrimaryCreatedTag((_a = primaryTagQuery.data) == null ? void 0 : _a.createTag);
    if (shouldCreateInverseRelationship && selectedInverseRelationshipId) {
      const inverseTagInput = {
        relationshipId: selectedInverseRelationshipId,
        subjectEntityType: selectedEntity.entityType,
        subjectEntityId: selectedEntity.id,
        objectEntityType: entity.entityType,
        objectEntityId: entity.id,
        subjectTimeMarkerSeconds
      };
      await createTag({ variables: { input: inverseTagInput } });
    }
    setTagsAreCreating(false);
    setTagsAreCreated(true);
  }, [
    selectedRelationshipId,
    shouldCreateInverseRelationship,
    selectedInverseRelationshipId,
    entity,
    selectedEntity,
    createTag,
    shouldAddTimeMarker,
    timeMarkerValue
  ]);
  if (!selectedEntity) {
    return /* @__PURE__ */ React.createElement(SearchEntities_default, {
      onSelect: onSelectEntity,
      onNewEntityCreated
    });
  }
  const shouldShowTimeMarkerCheckbox = entity.entityType === "AudioItem" /* AudioItem */ && typeof defaultTimeMarkerValue !== "undefined";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "What is the relationship between these two entities?"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-2"
  }, /* @__PURE__ */ React.createElement(SelectRelationship_default, {
    subjectEntity: entity,
    objectEntity: selectedEntity,
    onSelect: onSelectRelationship
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 flex flex-row items-center justify-start"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "reverse-relationship",
    checked: shouldCreateInverseRelationship,
    onChange: (event) => setShouldCreateInverseRelationship(event.target.checked)
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "reverse-relationship",
    className: "ml-2"
  }, "Also create the inverse relationship")), shouldCreateInverseRelationship && /* @__PURE__ */ React.createElement("div", {
    className: "mt-2"
  }, /* @__PURE__ */ React.createElement(SelectRelationship_default, {
    subjectEntity: selectedEntity,
    objectEntity: entity,
    onSelect: onSelectInverseRelationship
  })), shouldShowTimeMarkerCheckbox && /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 flex flex-row items-start justify-start"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "time-marker",
    className: "mt-1",
    checked: shouldAddTimeMarker,
    onChange: (event) => setShouldAddTimeMarker(event.target.checked)
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "time-marker",
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Mark this Tag at time:"), /* @__PURE__ */ React.createElement(TimestampInput_default, {
    valueInSeconds: timeMarkerValue,
    onChange: onTimeMarkerValueChanged
  })))), /* @__PURE__ */ React.createElement("button", {
    className: "btn mt-6",
    onClick: onCreateTagClicked,
    disabled: tagsAreCreating || !selectedRelationshipId
  }, "Save"), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, error.message));
};
var CreateTagForm_default = CreateTagForm;

// app/components/AddTagButton.tsx
var PARENT_ENTITY_QUERY = import_client15.gql`
	query Entity($id: String!) {
		entity(id: $id) {
			...AudioItem
			...Collection
			...Person
			...Place
			...Instrument
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.collection}
	${EntityFragments.instrument}
	${EntityFragments.person}
	${EntityFragments.place}
	${EntityFragments.tune}
`;
var AddTagButton = ({ entity, onSuccess, className, children }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [addTagModalIsVisible, setAddTagModalIsVisible] = (0, import_react33.useState)(false);
  const [getParentEntity, { loading: parentEntityLoading }] = (0, import_client15.useLazyQuery)(PARENT_ENTITY_QUERY, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  });
  const onCreateTagSuccess = (0, import_react33.useCallback)(async (tag) => {
    await getParentEntity();
    setAddTagModalIsVisible(false);
    if (onSuccess) {
      onSuccess(tag);
    }
  }, [getParentEntity, setAddTagModalIsVisible, onSuccess]);
  const onAddTagClicked = (0, import_react33.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(entity);
      return await requireLogin({ redirectTo });
    }
    setAddTagModalIsVisible(true);
  }, [currentUser, requireLogin, entity]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: onAddTagClicked
  }, children ?? "+ Add Tag"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Add Tag",
    isVisible: addTagModalIsVisible,
    onClose: () => setAddTagModalIsVisible(false)
  }, parentEntityLoading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : /* @__PURE__ */ React.createElement(CreateTagForm_default, {
    entity,
    onSuccess: onCreateTagSuccess
  })));
};
var AddTagButton_default = AddTagButton;

// app/components/EditTagsButton.tsx
var import_react34 = require("react");
var import_client16 = require("@apollo/client");
var PARENT_ENTITY_QUERY2 = import_client16.gql`
	query Entity($id: String!) {
		entity(id: $id) {
			...AudioItem
			...Collection
			...Person
			...Place
			...Instrument
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.collection}
	${EntityFragments.instrument}
	${EntityFragments.person}
	${EntityFragments.place}
	${EntityFragments.tune}
`;
var DELETE_TAG_MUTATION = import_client16.gql`
	mutation DeleteTag($id: String!) {
		deleteTag(id: $id)
	}
`;
var EditTagsButton = ({ entity, className, children, onSuccess }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [editTagsModalIsVisible, setEditTagsModalIsVisible] = (0, import_react34.useState)(false);
  const [getParentEntity, { loading: parentEntityLoading }] = (0, import_client16.useLazyQuery)(PARENT_ENTITY_QUERY2, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  });
  const [deleteTag, { loading: deleteTagLoading, data: deleteTagData }] = (0, import_client16.useMutation)(DELETE_TAG_MUTATION, { errorPolicy: "all" });
  const {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default();
  const onDeleteTag = (0, import_react34.useCallback)(async (id) => {
    if (!currentUser) {
      return await requireLogin();
    }
    if (window.confirm("Are you sure you want to delete this Tag?")) {
      deleteTag({ variables: { id } });
    }
  }, [deleteTag, currentUser, requireLogin]);
  (0, import_react34.useEffect)(() => {
    const onDeleteSuccess = async () => {
      await Promise.all([refetchTopLevelTags(), getParentEntity()]);
      setEditTagsModalIsVisible(false);
    };
    if (deleteTagData == null ? void 0 : deleteTagData.deleteTag) {
      onDeleteSuccess();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [
    deleteTagData,
    getParentEntity,
    setEditTagsModalIsVisible,
    refetchTopLevelTags,
    onSuccess
  ]);
  const { tags } = entity;
  const sortedTags = (0, import_react34.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    return Tag_default.sort(tags);
  }, [tags]);
  if (!sortedTags || sortedTags.length === 0) {
    return null;
  }
  const isLoading = parentEntityLoading || deleteTagLoading;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: () => setEditTagsModalIsVisible(true)
  }, children ?? "Edit Tags"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Edit Tags",
    isVisible: editTagsModalIsVisible,
    onClose: () => setEditTagsModalIsVisible(false)
  }, isLoading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : sortedTags.map((tag, index) => {
    const { id, relationship, objectEntity, subjectTimeMarkerSeconds } = tag;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-start justify-start",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col flex-1 justify-start align-start mb-4 pr-4"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "italic text-gray-500"
    }, relationship.name), /* @__PURE__ */ React.createElement("div", {
      className: "uppercase text-sm text-gray-500 pr-2"
    }, objectEntity.entityType), objectEntity.name, typeof subjectTimeMarkerSeconds === "number" && /* @__PURE__ */ React.createElement("span", {
      className: "italic text-gray-500"
    }, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`)), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      onClick: () => onDeleteTag(id)
    }, "Delete Tag"));
  })));
};
var EditTagsButton_default = EditTagsButton;

// app/components/Tags.tsx
var TagLink = ({ tag }) => {
  const [tooltipIsVisible, setTooltipIsVisible] = (0, import_react35.useState)(false);
  const [timeoutFunc, setTimeoutFunc] = (0, import_react35.useState)();
  const onMouseEnter = (0, import_react35.useCallback)(() => {
    setTimeoutFunc(setTimeout(() => setTooltipIsVisible(true), 400));
  }, []);
  const onMouseLeave = (0, import_react35.useCallback)(() => {
    if (timeoutFunc) {
      clearTimeout(timeoutFunc);
      setTimeoutFunc(void 0);
    }
    setTooltipIsVisible(false);
  }, [timeoutFunc]);
  (0, import_react35.useEffect)(() => {
    return () => {
      if (timeoutFunc) {
        clearTimeout(timeoutFunc);
        setTimeoutFunc(void 0);
      }
    };
  }, [timeoutFunc]);
  const { objectEntity, relationship } = tag;
  const href = Entity_default.makeHrefForView(objectEntity);
  return /* @__PURE__ */ React.createElement(import_react36.Link, {
    to: href
  }, /* @__PURE__ */ React.createElement("a", {
    className: "relative block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800",
    onMouseEnter,
    onMouseLeave
  }, objectEntity.name, /* @__PURE__ */ React.createElement("div", {
    className: `${tooltipIsVisible ? "flex" : "hidden"} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`
  }, relationship.name, " ", objectEntity.entityType.toUpperCase())));
};
var Tags = ({ entity }) => {
  const { tags } = entity;
  const sortedTags = (0, import_react35.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    const tagsWithoutTimeMarkers = tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds !== "number");
    return Tag_default.sort(tagsWithoutTimeMarkers);
  }, [tags]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center flex-wrap"
  }, sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    className: "mr-2",
    key: index
  }, /* @__PURE__ */ React.createElement(TagLink, {
    tag
  }))), /* @__PURE__ */ React.createElement("div", {
    className: (tags == null ? void 0 : tags.length) > 0 ? "mb-2 ml-1" : void 0
  }, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity
  })), (tags == null ? void 0 : tags.length) > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex ml-1 mb-2"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 mr-1"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity
  })));
};
var Tags_default = Tags;

// app/components/Menu.tsx
var import_react37 = __toESM(require("react"));
var Menu = ({ children }) => {
  const containerRef = (0, import_react37.useRef)();
  const [shouldOpenLeft, setShouldOpenLeft] = (0, import_react37.useState)(true);
  const [isOpen, setIsOpen] = (0, import_react37.useState)(false);
  (0, import_react37.useEffect)(() => {
    const container = containerRef.current;
    if (container) {
      const { x } = container.getBoundingClientRect();
      if (x < 200) {
        setShouldOpenLeft(false);
      }
    }
  }, []);
  const onIconClicked = (0, import_react37.useCallback)((event) => {
    event.stopPropagation();
    setIsOpen(true);
  }, []);
  const onBackgroundClicked = (0, import_react37.useCallback)((event) => {
    event.stopPropagation();
    setIsOpen(false);
  }, []);
  const childrenAsArray = Array.isArray(children) ? children : [children];
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ import_react37.default.createElement("div", {
    className: "relative",
    ref: containerRef
  }, /* @__PURE__ */ import_react37.default.createElement("button", {
    className: "btn-secondary",
    onClick: onIconClicked,
    "aria-label": isOpen ? "Close Menu" : "Show Menu"
  }, /* @__PURE__ */ import_react37.default.createElement("i", {
    className: "material-icons"
  }, "expand_more")), isOpen && /* @__PURE__ */ import_react37.default.createElement(import_react37.default.Fragment, null, /* @__PURE__ */ import_react37.default.createElement("div", {
    className: "fixed top-0 right-0 bottom-0 left-0",
    onClick: onBackgroundClicked
  }), /* @__PURE__ */ import_react37.default.createElement("ul", {
    className: `absolute top-9 ${shouldOpenLeft ? "right-0 text-right" : "left-0 text-left"} flex flex-col bg-white rounded shadow-xl`
  }, childrenAsArray.map((child, index) => /* @__PURE__ */ import_react37.default.createElement("li", {
    className: `cursor-pointer first:rounded-t last:rounded-b text-sm text-gray-500 font-bold whitespace-nowrap hover:bg-gray-200 ${index === 0 ? "hover:rounded-t" : ""} ${index === childrenAsArray.length - 1 ? "hover:rounded-b" : ""}`,
    key: index
  }, child)))));
};
var Menu_default = Menu;

// app/components/SaveItemButton.tsx
var import_react40 = require("react");
var import_react41 = require("@remix-run/react");
var import_client19 = require("@apollo/client");

// app/hooks/useAudioItem.ts
var import_react38 = require("react");
var import_client17 = require("@apollo/client");
var AUDIO_ITEM_QUERY = import_client17.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItem = ({
  slug,
  queryOptions = {},
  skip = false
} = {}) => {
  const [getAudioItem, audioItemQuery] = (0, import_client17.useLazyQuery)(AUDIO_ITEM_QUERY, queryOptions);
  const { data } = audioItemQuery;
  (0, import_react38.useEffect)(() => {
    if (skip) {
      return;
    }
    if (slug) {
      getAudioItem({
        variables: {
          slug
        }
      });
    }
  }, [getAudioItem, slug, skip]);
  const audioItem = data == null ? void 0 : data.audioItem;
  return [audioItem, audioItemQuery];
};
var useAudioItem_default = useAudioItem;

// app/hooks/useSavedItemsForUser.ts
var import_react39 = require("react");
var import_client18 = require("@apollo/client");
var SAVED_ITEMS_FOR_USER_QUERY = import_client18.gql`
	query SavedItemsForUser {
		savedItemsForUser {
			...SavedItem
		}
	}
	${SavedItemFragments.savedItem}
`;
var useSavedItemsForUser = () => {
  var _a;
  const [currentUser] = useCurrentUser_default();
  const [makeQuery, query] = (0, import_client18.useLazyQuery)(SAVED_ITEMS_FOR_USER_QUERY, { fetchPolicy: "cache-first" });
  (0, import_react39.useEffect)(() => {
    if (currentUser) {
      makeQuery();
    }
  }, [makeQuery, currentUser]);
  const savedItemsForUser = (_a = query.data) == null ? void 0 : _a.savedItemsForUser;
  return [savedItemsForUser, query];
};
var useSavedItemsForUser_default = useSavedItemsForUser;

// app/components/SaveItemButton.tsx
var CREATE_SAVED_ITEM_MUTATION = import_client19.gql`
	mutation CreateSavedItem($input: CreateSavedItemInput!) {
		createSavedItem(input: $input) {
			id
		}
	}
`;
var DELETE_SAVED_ITEM_MUTATION = import_client19.gql`
	mutation DeleteSavedItem($input: DeleteSavedItemInput!) {
		deleteSavedItem(input: $input)
	}
`;
var SaveItemButton = ({ audioItem }) => {
  const { id, slug, isSavedByUser } = audioItem;
  const navigate = (0, import_react41.useNavigate)();
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [refetchAudioItem] = (0, import_client19.useLazyQuery)(AUDIO_ITEM_QUERY, {
    fetchPolicy: "network-only"
  });
  const [, { refetch: refetchSavedItemsForUser }] = useSavedItemsForUser_default();
  const [
    createSavedItem,
    { loading: createLoading, data: createData, error: createError }
  ] = (0, import_client19.useMutation)(CREATE_SAVED_ITEM_MUTATION, { errorPolicy: "all" });
  const [
    deleteSavedItem,
    { loading: deleteLoading, data: deleteData, error: deleteError }
  ] = (0, import_client19.useMutation)(DELETE_SAVED_ITEM_MUTATION, { errorPolicy: "all" });
  const onButtonClicked = (0, import_react40.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(audioItem);
      return await requireLogin({ redirectTo });
    } else if (!isSavedByUser) {
      createSavedItem({
        variables: {
          input: { audioItemId: id }
        }
      });
    } else if (isSavedByUser) {
      deleteSavedItem({
        variables: {
          input: { audioItemId: id }
        }
      });
    }
  }, [currentUser, navigate, audioItem, id, createSavedItem, deleteSavedItem]);
  (0, import_react40.useEffect)(() => {
    const refetch = async () => {
      await refetchAudioItem({ variables: { slug } });
      refetchSavedItemsForUser();
    };
    if (createData) {
      refetch();
    }
  }, [createData, refetchAudioItem, refetchSavedItemsForUser, slug]);
  (0, import_react40.useEffect)(() => {
    if (createError) {
      window.alert("Error saving item. Please try again.");
    }
  }, [createError]);
  (0, import_react40.useEffect)(() => {
    const refetch = async () => {
      await refetchAudioItem({ variables: { slug } });
      refetchSavedItemsForUser();
    };
    if (deleteData) {
      refetch();
    }
  }, [deleteData, refetchAudioItem, refetchSavedItemsForUser, slug]);
  (0, import_react40.useEffect)(() => {
    if (deleteError) {
      window.alert("Error removing saved item. Please try again.");
    }
  }, [deleteError]);
  return /* @__PURE__ */ React.createElement("button", {
    className: `btn-secondary ${isSavedByUser ? "btn-secondary-active" : ""} pl-0.5`,
    onClick: onButtonClicked,
    disabled: createLoading || deleteLoading,
    "aria-label": isSavedByUser ? "Unsave" : "Save"
  }, isSavedByUser ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "bookmark"), "Saved") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "bookmark_border"), "Save"));
};
var SaveItemButton_default = SaveItemButton;

// app/components/ViewCommentsButton.tsx
var import_react44 = require("react");
var import_react45 = require("@remix-run/react");
var import_client22 = require("@apollo/client");

// app/components/CreateCommentForm.tsx
var import_react43 = require("react");
var import_client21 = require("@apollo/client");

// app/hooks/useComments.ts
var import_react42 = require("react");
var import_client20 = require("@apollo/client");
var COMMENTS_QUERY = import_client20.gql`
	query Comments($input: CommentsInput!) {
		comments(input: $input) {
			...Comment
		}
	}
	${CommentFragments.comment}
`;
var useComments = ({
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  var _a;
  const [getComments, commentsQuery] = (0, import_client20.useLazyQuery)(COMMENTS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = commentsQuery;
  (0, import_react42.useEffect)(() => {
    getComments({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getComments, resultsPerPage]);
  const comments = data == null ? void 0 : data.comments;
  const fetchNextPageOfComments = (0, import_react42.useCallback)(() => {
    fetchMore({
      variables: {
        input: {
          take: resultsPerPage,
          skip: comments.length ?? 0
        }
      }
    });
  }, [fetchMore, resultsPerPage, comments]);
  return {
    comments: (_a = commentsQuery.data) == null ? void 0 : _a.comments,
    getComments,
    commentsQuery,
    fetchNextPageOfComments
  };
};
var useComments_default = useComments;

// app/components/CreateCommentForm.tsx
var CREATE_COMMENT_MUTATION = import_client21.gql`
	mutation CreateComment($input: CreateCommentInput!) {
		createComment(input: $input) {
			...CommentWithoutParentEntity
		}
	}
	${CommentFragments.commentWithoutParentEntity}
`;
var CreateCommentForm = ({ parentEntity, onSuccess }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [text, setText] = (0, import_react43.useState)("");
  const [createComment, { loading, data, error }] = (0, import_client21.useMutation)(CREATE_COMMENT_MUTATION, { errorPolicy: "all" });
  const {
    commentsQuery: { refetch: refetchTopLevelComments }
  } = useComments_default();
  const onSubmit = (0, import_react43.useCallback)(async (event) => {
    event.preventDefault();
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(parentEntity);
      return await requireLogin({ redirectTo });
    }
    let parentAudioItemId;
    if (isAudioItem(parentEntity)) {
      parentAudioItemId = parentEntity.id;
    }
    const input = { parentAudioItemId, text };
    createComment({ variables: { input } });
  }, [createComment, parentEntity, text]);
  (0, import_react43.useEffect)(() => {
    if (data == null ? void 0 : data.createComment) {
      setText("");
      if (onSuccess) {
        onSuccess(data.createComment);
      }
      refetchTopLevelComments();
    }
  }, [data, refetchTopLevelComments]);
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    className: "w-full"
  }, /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Add a comment...",
    autoFocus: true,
    value: text,
    rows: 3,
    onChange: (event) => setText(event.target.value)
  }), text.length > 0 && /* @__PURE__ */ React.createElement("input", {
    className: "btn mt-3 w-auto",
    type: "submit",
    disabled: loading,
    value: "Add Comment"
  }), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-3"
  }, error.message));
};
var CreateCommentForm_default = CreateCommentForm;

// app/components/ViewCommentsButton.tsx
var COMMENTS_FOR_PARENT_ENTITY_QUERY = import_client22.gql`
	query CommentsForParentEntity($input: CommentsForParentEntityInput!) {
		commentsForParentEntity(input: $input) {
			...CommentWithoutParentEntity
		}
	}
	${CommentFragments.commentWithoutParentEntity}
`;
var ViewCommentsButton = ({ audioItem }) => {
  const { id, slug, entityType, commentsCount } = audioItem;
  const commentsRef = (0, import_react44.useRef)();
  const [modalIsVisible, setModalIsVisible] = (0, import_react44.useState)(false);
  const [, { refetch: refetchParentAudioItem }] = useAudioItem_default({
    slug,
    queryOptions: { fetchPolicy: "cache-only" }
  });
  const [getCommentsForParentEntity, { loading, data, error }] = (0, import_client22.useLazyQuery)(COMMENTS_FOR_PARENT_ENTITY_QUERY, {
    fetchPolicy: "cache-and-network"
  });
  const comments = (data == null ? void 0 : data.commentsForParentEntity) ?? [];
  const fetchCommentsForParent = (0, import_react44.useCallback)(async () => {
    await getCommentsForParentEntity({
      variables: {
        input: { parentEntityType: entityType, parentEntityId: id }
      }
    });
  }, [getCommentsForParentEntity, entityType, id]);
  const onViewCommentsButtonClicked = (0, import_react44.useCallback)(async () => {
    setModalIsVisible(true);
    await fetchCommentsForParent();
  }, [fetchCommentsForParent, commentsCount, comments]);
  const onCreateCommentSuccess = (0, import_react44.useCallback)(async () => {
    await Promise.allSettled([
      fetchCommentsForParent(),
      refetchParentAudioItem({ slug })
    ]);
  }, [fetchCommentsForParent, refetchParentAudioItem]);
  const onCloseModal = (0, import_react44.useCallback)(() => setModalIsVisible(false), []);
  (0, import_react44.useEffect)(() => {
    var _a;
    if (!commentsRef.current) {
      return;
    }
    const commentsHeight = ((_a = commentsRef.current) == null ? void 0 : _a.scrollHeight) ?? 0;
    if (modalIsVisible && commentsHeight > 0 && comments.length > 0) {
      commentsRef.current.scrollTo({
        top: commentsHeight,
        behavior: "smooth"
      });
    }
  }, [comments, modalIsVisible]);
  const modalTitle = commentsCount > 0 ? `${commentsCount} Comment${commentsCount === 1 ? "" : "s"}` : "No Comments";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-secondary",
    onClick: onViewCommentsButtonClicked,
    "aria-label": "View Comments"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-0.5"
  }, "chat_bubble_outline"), commentsCount > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, commentsCount, /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Comment", commentsCount === 1 ? "" : "s")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "md:hidden"
  }, "0"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block"
  }, "No Comments"))), /* @__PURE__ */ React.createElement(Modal_default, {
    title: modalTitle,
    isVisible: modalIsVisible,
    onClose: onCloseModal
  }, error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-2"
  }, error.message), comments.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "max-h-1/2 overflow-auto",
    ref: commentsRef
  }, comments.map(({ createdByUser, createdAt, text }, index) => /* @__PURE__ */ React.createElement("div", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm mb-1 flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(import_react45.Link, {
    to: `/users/${createdByUser.id}`
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mr-1 flex flex-row items-center"
  }, createdByUser.verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "inline"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm mr-1"
  }, "verified")), /* @__PURE__ */ React.createElement("span", null, createdByUser.username))), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm whitespace-pre-line text-gray-900"
  }, text)))), loading && /* @__PURE__ */ React.createElement(LoadingCircle_default, null), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement(CreateCommentForm_default, {
    parentEntity: audioItem,
    onSuccess: onCreateCommentSuccess
  }))));
};
var ViewCommentsButton_default = ViewCommentsButton;

// app/components/TimeMarkers.tsx
var import_react46 = require("react");
var import_react47 = require("@remix-run/react");
var TimeMarkers = ({ audioItem }) => {
  const { tags } = audioItem;
  const {
    activeAudioItem,
    setActiveAudioItem,
    playbackPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default();
  const timeMarkersWithTags = (0, import_react46.useMemo)(() => {
    const output = {};
    if (!tags) {
      return output;
    }
    const filteredTags = tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
    filteredTags.sort((a, b) => a.subjectTimeMarkerSeconds - b.subjectTimeMarkerSeconds);
    filteredTags.forEach((tag) => {
      const existingTagsAtTimeMarker = output[tag.subjectTimeMarkerSeconds] ?? [];
      output[tag.subjectTimeMarkerSeconds] = [...existingTagsAtTimeMarker, tag];
    });
    return output;
  }, [tags]);
  const onTimeMarkerClicked = (0, import_react46.useCallback)((event, timeMarker) => {
    if (event.target.id === "time-marker-tag-link") {
      event.stopPropagation();
      return;
    }
    if ((activeAudioItem == null ? void 0 : activeAudioItem.id) !== audioItem.id) {
      setActiveAudioItem(audioItem);
    }
    setSeekPositionSeconds(parseInt(timeMarker));
  }, [audioItem, activeAudioItem]);
  const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
  const activeTimeMarker = (0, import_react46.useMemo)(() => {
    if (!audioItemIsInPlayer) {
      return void 0;
    }
    let result;
    Object.keys(timeMarkersWithTags).forEach((timeMarker) => {
      if (parseInt(timeMarker) <= playbackPositionSeconds) {
        result = timeMarker;
      }
    });
    return result;
  }, [audioItemIsInPlayer, timeMarkersWithTags, playbackPositionSeconds]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, Object.entries(timeMarkersWithTags).map(([timeMarker, tagsAtTimeMarker], index) => {
    const isActive = activeTimeMarker === timeMarker;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-start md:items-center justify-start mb-2 last:mb-1 text-sm",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row w-16 flex-shrink-0"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "w-3 text-left"
    }, isActive && ">"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text underline hover:underline",
      onClick: (event) => onTimeMarkerClicked(event, timeMarker)
    }, DateTime_default.formatSecondsAsDuration(parseInt(timeMarker)))), /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col md:flex-row"
    }, tagsAtTimeMarker.map((tag, index2) => /* @__PURE__ */ React.createElement("span", {
      className: "flex flex-row items-center",
      key: index2
    }, /* @__PURE__ */ React.createElement(import_react47.Link, {
      to: Entity_default.makeHrefForView(tag.objectEntity)
    }, /* @__PURE__ */ React.createElement("a", {
      id: "time-marker-tag-link"
    }, tag.objectEntity.name, tag.objectEntity.entityType === "Tune" /* Tune */ ? ` (${tag.objectEntity.type})` : "")), index2 !== tagsAtTimeMarker.length - 1 && /* @__PURE__ */ React.createElement("span", {
      className: "hidden md:block mr-1"
    }, ",")))));
  }));
};
var TimeMarkers_default = TimeMarkers;

// app/components/RequestTakedownButton.tsx
var import_react49 = require("react");
var import_client24 = require("@apollo/client");

// app/components/CreateTakedownRequestForm.tsx
var import_react48 = require("react");
var import_client23 = require("@apollo/client");
var CREATE_TAKEDOWN_REQUEST = import_client23.gql`
	mutation CreateTakedownRequest($input: CreateTakedownRequestInput!) {
		createTakedownRequest(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;
var CreateTakedownRequestForm = ({ entity, onSuccess }) => {
  const defaultType = Object.keys(TakedownRequestType)[0];
  const [type, setType] = (0, import_react48.useState)(defaultType);
  const [message, setMessage] = (0, import_react48.useState)("");
  const [validationError, setValidationError] = (0, import_react48.useState)("");
  const [createTakedownRequest, { loading, data, error }] = (0, import_client23.useMutation)(CREATE_TAKEDOWN_REQUEST, { errorPolicy: "all" });
  const getLabelForType = (type2) => {
    switch (TakedownRequestType[type2]) {
      case "Performer" /* Performer */:
        return "I'm a performer in it";
      case "Copyright" /* Copyright */:
        return "I own the copyright";
      default:
        return type2;
    }
  };
  const onSubmitForm = (0, import_react48.useCallback)((event) => {
    event.preventDefault();
    setValidationError("");
    if (!message) {
      return setValidationError("Please include details about your request");
    }
    const input = {
      entityType: entity.entityType,
      entityId: entity.id,
      type,
      message
    };
    try {
      createTakedownRequest({
        variables: {
          input
        }
      });
    } catch {
    }
  }, [message, entity, type, createTakedownRequest]);
  (0, import_react48.useEffect)(() => {
    var _a;
    if (((_a = data == null ? void 0 : data.createTakedownRequest) == null ? void 0 : _a.id) && onSuccess) {
      onSuccess(data.createTakedownRequest);
    }
  }, [data, onSuccess]);
  return /* @__PURE__ */ React.createElement("form", {
    className: "flex flex-col items-start",
    onSubmit: onSubmitForm
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "select-type",
    className: "mb-2"
  }, "Why are you requesting a takedown for this ", entity.entityType, "?"), /* @__PURE__ */ React.createElement("select", {
    id: "select-type",
    className: "mb-4",
    value: type,
    onChange: (event) => setType(event.target.value)
  }, Object.keys(TakedownRequestType).map((type2, index) => /* @__PURE__ */ React.createElement("option", {
    value: type2,
    key: index
  }, getLabelForType(type2)))), /* @__PURE__ */ React.createElement("textarea", {
    className: "mb-4",
    placeholder: "Please include as many details as you can...",
    value: message,
    onChange: (event) => setMessage(event.target.value),
    rows: 4
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "Submit",
    disabled: loading
  }), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, validationError), error && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, "Error submitting Takedown Request. Please reload the page and try again."));
};
var CreateTakedownRequestForm_default = CreateTakedownRequestForm;

// app/components/RequestTakedownButton.tsx
var TAKEDOWN_REQUESTS_FOR_ENTITY = import_client24.gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;
var RequestTakedownButton = ({ entity, onTakedownRequestCreated }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [modalIsVisible, setModalIsVisible] = (0, import_react49.useState)(false);
  const closeModal = (0, import_react49.useCallback)(() => setModalIsVisible(false), []);
  const { loading, data, error, refetch } = (0, import_client24.useQuery)(TAKEDOWN_REQUESTS_FOR_ENTITY, {
    variables: {
      input: {
        entityType: entity.entityType,
        entityId: entity.id
      }
    },
    skip: !modalIsVisible
  });
  const takedownRequests = (data == null ? void 0 : data.takedownRequestsForEntity) ?? [];
  const onButtonClicked = (0, import_react49.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(entity);
      await requireLogin({ redirectTo });
    } else {
      setModalIsVisible(true);
    }
  }, [currentUser, entity, requireLogin]);
  const onSuccess = (0, import_react49.useCallback)(async (takedownRequest) => {
    try {
      await refetch();
      if (onTakedownRequestCreated) {
        await onTakedownRequestCreated(takedownRequest);
      }
    } catch {
    }
  }, [refetch, onTakedownRequestCreated]);
  const modalContent = (0, import_react49.useMemo)(() => {
    const pendingTakedown = takedownRequests.find(isPendingTakedownRequest);
    const approvedTakedown = takedownRequests.find(isApprovedTakedownRequest);
    if (loading) {
      return /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
    } else if (error) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-red-600"
      }, "Error fetching Takedown Request data");
    } else if (approvedTakedown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "This ", entity.entityType, " has an ", /* @__PURE__ */ React.createElement("strong", null, "approved"), " ", approvedTakedown.type, " Takedown Request last updated", " ", DateTime_default.formatDateYearTime(approvedTakedown.updatedAt));
    } else if (pendingTakedown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "This ", entity.entityType, " has a ", /* @__PURE__ */ React.createElement("strong", null, "pending"), " ", pendingTakedown.type, " Takedown Request last updated", " ", DateTime_default.formatDateYearTime(pendingTakedown.updatedAt));
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500 mb-5"
    }, "We exist as a community resource, and as such we place the foremost importance on performers' rights and copyright. You can request a takedown using this form. We will be in touch to verify details."), /* @__PURE__ */ React.createElement(CreateTakedownRequestForm_default, {
      entity,
      onSuccess
    }));
  }, [loading, error, takedownRequests, refetch, entity]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "rounded flex flex-row items-center p-2",
    onClick: onButtonClicked
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-0.5"
  }, "report_problem"), "Request Takedown"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Request Takedown",
    isVisible: modalIsVisible,
    onClose: closeModal
  }, modalContent));
};
var RequestTakedownButton_default = RequestTakedownButton;

// app/components/AudioItemCard.tsx
var AudioItemCard = ({ audioItem, showTitle = true, className }) => {
  const { name, slug, description, tags, status, createdByUser, createdAt } = audioItem;
  const navigate = (0, import_react52.useNavigate)();
  const {
    activeAudioItem,
    setActiveAudioItem,
    activeItemDurationSeconds,
    playbackPositionSeconds
  } = usePlayerContext_default();
  const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
  const tagsWithTimeMarkers = (0, import_react50.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    return tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
  }, [tags]);
  const onPlayPressed = (0, import_react50.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem]);
  const onTakedownRequestCreated = (0, import_react50.useCallback)((takedownRequest) => {
    if (takedownRequest.status === "Approved" /* Approved */) {
      navigate(`/entities/audio-items/${slug}`);
    }
  }, [navigate, slug]);
  const shouldShowPositionAndDuration = audioItemIsInPlayer && typeof playbackPositionSeconds === "number" && typeof activeItemDurationSeconds === "number";
  const positionAndDuration = `${DateTime_default.formatSecondsAsDuration(playbackPositionSeconds)} / ${DateTime_default.formatSecondsAsDuration(activeItemDurationSeconds)}`;
  const isTakenDown = status === "TakenDown" /* TakenDown */;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`
  }, showTitle && /* @__PURE__ */ React.createElement("h2", {
    className: "mb-2"
  }, /* @__PURE__ */ React.createElement(import_react51.Link, {
    to: `/entities/audio-items/${slug}`
  }, /* @__PURE__ */ React.createElement("a", {
    className: "link-bare"
  }, name))), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(Tags_default, {
    entity: audioItem
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full border border-gray-200 rounded mb-2"
  }, isTakenDown ? /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center px-4 py-6 text-gray-500"
  }, "This Audio Item has been removed via an approved Takedown Request") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-start items-center pr-4 h-16"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1"
  }, audioItemIsInPlayer ? /* @__PURE__ */ React.createElement("div", {
    className: "pl-4 text-gray-500"
  }, "Playing") : /* @__PURE__ */ React.createElement("button", {
    style: { lineHeight: 0 },
    onClick: onPlayPressed,
    "aria-label": "Play"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-6xl text-teal-600 hover:text-teal-800"
  }, "play_arrow")), /* @__PURE__ */ React.createElement("div", {
    className: `ml-4 text-gray-500 opacity-0 ${shouldShowPositionAndDuration ? "opacity-100 transition-opacity delay-500 duration-400" : ""}`
  }, positionAndDuration)))), tagsWithTimeMarkers.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "mx-4 mb-2 pt-3 border-t border-gray-200"
  }, /* @__PURE__ */ React.createElement(TimeMarkers_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm flex flex-col sm:flex-row"
  }, "Added", createdByUser && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", "by", " ", /* @__PURE__ */ React.createElement(import_react51.Link, {
    to: `/users/${createdByUser.id}`
  }, /* @__PURE__ */ React.createElement("a", {
    className: "flex flex-row px-0 sm:px-1"
  }, createdByUser.verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "inline"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm mr-1"
  }, "verified")), createdByUser.username))), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm mt-1 text-gray-900 whitespace-pre-wrap"
  }, description || "No description")), /* @__PURE__ */ React.createElement("div", {
    className: "border-t border-gray-200 mt-4 pt-3 w-full flex flex-row justify-between items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(ViewCommentsButton_default, {
    audioItem
  }), /* @__PURE__ */ React.createElement("div", {
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement(SaveItemButton_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement(Menu_default, null, !isTakenDown && /* @__PURE__ */ React.createElement(RequestTakedownButton_default, {
    entity: audioItem,
    onTakedownRequestCreated
  }))));
};
var AudioItemCard_default = AudioItemCard;

// app/components/AudioItemCompact.tsx
var import_react53 = require("react");
var import_react54 = require("@remix-run/react");
var AudioItemCompact = ({ audioItem, className }) => {
  const { name, slug, description, tags, status } = audioItem;
  const isTakenDown = status === "TakenDown" /* TakenDown */;
  const sortedTags = (0, import_react53.useMemo)(() => Tag_default.sort(tags), [tags]);
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  const onPlayPressed = (0, import_react53.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem]);
  const playButtonMarkup = (0, import_react53.useMemo)(() => {
    const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    if (isTakenDown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Taken Down");
    }
    if (audioItemIsInPlayer) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Playing");
    }
    return /* @__PURE__ */ React.createElement("button", {
      style: { lineHeight: 0 },
      onClick: onPlayPressed,
      "aria-label": "Play"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "material-icons text-6xl text-teal-600 hover:text-teal-800"
    }, "play_arrow"));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start bg-white shadow-md rounded pt-2 px-3 pb-1 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react54.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, "Tags:", sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    key: index,
    className: "ml-1 whitespace-pre"
  }, /* @__PURE__ */ React.createElement(import_react54.Link, {
    to: Entity_default.makeHrefForView(tag.objectEntity)
  }, /* @__PURE__ */ React.createElement("a", null, tag.objectEntity.name, tag.objectEntity.entityType === "Tune" /* Tune */ ? ` (${tag.objectEntity.type})` : "")), index !== sortedTags.length - 1 && ", ")), /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: audioItem,
    className: "ml-2"
  }), (tags == null ? void 0 : tags.length) > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex ml-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 mr-1"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: audioItem
  }))), description && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm"
  }, description), /* @__PURE__ */ React.createElement("div", {
    className: "border-t border-gray-200 mt-2 pt-1 w-full flex flex-row justify-between items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(ViewCommentsButton_default, {
    audioItem
  }), /* @__PURE__ */ React.createElement("div", {
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement(SaveItemButton_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement(Menu_default, null, !isTakenDown && /* @__PURE__ */ React.createElement(RequestTakedownButton_default, {
    entity: audioItem
  })))));
};
var AudioItemCompact_default = AudioItemCompact;

// app/components/AudioItemTextOnly.tsx
var import_react55 = require("react");
var import_react56 = require("@remix-run/react");
var AudioItemTextOnly = ({ audioItem, className }) => {
  const { name, slug, tags, status } = audioItem;
  const isTakenDown = status === "TakenDown" /* TakenDown */;
  const sortedTags = (0, import_react55.useMemo)(() => Tag_default.sort(tags), [tags]);
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  const onPlayPressed = (0, import_react55.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem]);
  const playButtonMarkup = (0, import_react55.useMemo)(() => {
    const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    if (isTakenDown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Taken Down");
    }
    if (audioItemIsInPlayer) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Playing");
    }
    return /* @__PURE__ */ React.createElement("button", {
      style: { lineHeight: 0 },
      onClick: onPlayPressed,
      "aria-label": "Play"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "material-icons text-2xl text-teal-600 hover:text-teal-800"
    }, "play_arrow"));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react56.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Tags:"), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    key: index,
    className: "ml-1 whitespace-pre"
  }, /* @__PURE__ */ React.createElement(import_react56.Link, {
    to: Entity_default.makeHrefForView(tag.objectEntity)
  }, tag.objectEntity.name), index !== sortedTags.length - 1 && ", ")))));
};
var AudioItemTextOnly_default = AudioItemTextOnly;

// app/components/AudioItem.tsx
var AudioItemComponent = ({
  viewAs = "Cards" /* Cards */,
  audioItem,
  showTitle,
  className
}) => {
  if (viewAs === "Cards" /* Cards */) {
    return /* @__PURE__ */ React.createElement(AudioItemCard_default, {
      audioItem,
      showTitle,
      className
    });
  } else if (viewAs === "Compact" /* Compact */) {
    return /* @__PURE__ */ React.createElement(AudioItemCompact_default, {
      audioItem,
      className
    });
  } else if (viewAs === "List" /* List */) {
    return /* @__PURE__ */ React.createElement(AudioItemTextOnly_default, {
      audioItem,
      className
    });
  } else {
    return null;
  }
};
var AudioItem_default = AudioItemComponent;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug].tsx
var AUDIO_ITEM_QUERY2 = import_client25.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var ViewAudioItemBySlug = () => {
  const navigate = (0, import_react57.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client25.useQuery)(AUDIO_ITEM_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const { audioItem } = data ?? {};
  const { name } = audioItem ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name ?? ""}`
  }, !data && !error && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("span", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement("div", {
    className: "mb-6"
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: Entity_default.makeReadableNamePlural(audioItem),
        href: Entity_default.makeHrefForTopLevel(audioItem)
      },
      { label: name }
    ],
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement(import_react58.Link, {
    to: Entity_default.makeHrefForAbout(audioItem)
  }, "About")), /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs: "Cards" /* Cards */,
    audioItem,
    showTitle: false
  })));
};
var slug_default = ViewAudioItemBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => about_default
});
var import_client27 = require("@apollo/client");
var import_react61 = require("@remix-run/react");
var import_react62 = require("@remix-run/react");

// app/routes/entities/audio-items/[slug].tsx
var import_react59 = require("@remix-run/react");
var import_react60 = require("@remix-run/react");
var import_client26 = require("@apollo/client");
var AUDIO_ITEM_QUERY3 = import_client26.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/about.tsx
var AudioItemAbout = () => {
  const navigate = (0, import_react62.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client27.useQuery)(AUDIO_ITEM_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.audioItem) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Audio Items", href: "/entities/audio-items" },
      { label: name, href: `/entities/audio-items/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), itmaAtomSlug && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "italic text-gray-500"
  }, "This was sourced from ITMA's AtoM archive"), /* @__PURE__ */ React.createElement("a", {
    href: `https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View on AtoM ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react61.Link, {
    to: `/entities/audio-items/${slug}/edit`
  }, "Edit")));
};
var about_default = AudioItemAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/edit.tsx
var edit_exports = {};
__export(edit_exports, {
  default: () => edit_default
});
var import_react65 = require("@remix-run/react");
var import_client29 = require("@apollo/client");

// app/components/EditAudioItemForm.tsx
var import_react63 = require("react");
var import_client28 = require("@apollo/client");
var import_react64 = require("@remix-run/react");
var UPDATE_AUDIO_ITEM_MUTATION = import_client28.gql`
	mutation UpdateAudioItem($slug: String!, $input: UpdateAudioItemInput!) {
		updateAudioItem(slug: $slug, input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var EditAudioItemForm = ({ audioItem, onSuccess }) => {
  const navigate = (0, import_react64.useNavigate)();
  const [updateAudioItem, { loading, error, data }] = (0, import_client28.useMutation)(UPDATE_AUDIO_ITEM_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react63.useState)(audioItem.name);
  const [aliases, setAliases] = (0, import_react63.useState)(audioItem.aliases);
  const [description, setDescription] = (0, import_react63.useState)(audioItem.description);
  const onUpdateAudioItem = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateAudioItem({ variables: { slug: audioItem.slug, input } });
  };
  (0, import_react63.useEffect)(() => {
    if (data == null ? void 0 : data.updateAudioItem) {
      if (onSuccess) {
        return onSuccess(data.updateAudioItem);
      }
      window.alert("AudioItem updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateAudioItem
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this AudioItem. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Finbarr and Brian, Finbarr '08 at Dolan's")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditAudioItemForm_default = EditAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/edit.tsx
var AUDIO_ITEM_QUERY4 = import_client29.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var EditAudioItem = () => {
  const navigate = (0, import_react65.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client29.useQuery)(AUDIO_ITEM_QUERY4, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (audioItem2) => {
    navigate(`/entities/audio-items/${audioItem2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching AudioItem with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { audioItem } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit AudioItem: ", audioItem.name), /* @__PURE__ */ React.createElement(EditAudioItemForm_default, {
    audioItem,
    onSuccess: onEditSuccess
  }))));
};
var edit_default = EditAudioItem;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  default: () => tags_default
});
var import_react66 = require("react");
var import_react67 = require("@remix-run/react");
var ViewAudioItemTags = () => {
  const navigate = (0, import_react67.useNavigate)();
  const { slug } = navigate.query;
  (0, import_react66.useEffect)(() => {
    if (slug) {
      navigate(`/entities/audio-items/${slug}`);
    }
  }, [navigate, slug]);
  return null;
};
var tags_default = ViewAudioItemTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var random_exports = {};
__export(random_exports, {
  default: () => random_default
});
var import_react68 = require("react");
var import_react69 = require("@remix-run/react");

// app/hooks/useAudioItemRandom.ts
var import_client30 = require("@apollo/client");
var AUDIO_ITEM_RANDOM_QUERY = import_client30.gql`
	query AudioItemRandom {
		audioItemRandom {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemRandom = ({ queryOptions = {} } = {}) => {
  const audioItemRandomQuery = (0, import_client30.useQuery)(AUDIO_ITEM_RANDOM_QUERY, __spreadValues({
    fetchPolicy: "network-only"
  }, queryOptions));
  const { data } = audioItemRandomQuery;
  const audioItemRandom = data == null ? void 0 : data.audioItemRandom;
  return [audioItemRandom, audioItemRandomQuery];
};
var useAudioItemRandom_default = useAudioItemRandom;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var AudioItemRandom = () => {
  const [audioItemRandom, { loading, error }] = useAudioItemRandom_default();
  const navigate = (0, import_react69.useNavigate)();
  (0, import_react68.useEffect)(() => {
    if (audioItemRandom) {
      navigate(Entity_default.makeHrefForView(audioItemRandom));
    }
  }, [audioItemRandom]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching random Audio Item. Please reload the page."));
};
var random_default = AudioItemRandom;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug].tsx
var slug_exports2 = {};
__export(slug_exports2, {
  COLLECTION_QUERY: () => COLLECTION_QUERY,
  default: () => slug_default2
});
var import_react76 = require("@remix-run/react");
var import_client32 = require("@apollo/client");

// app/components/ViewEntityAndAudioItems.tsx
var import_react74 = require("react");
var import_react75 = require("@remix-run/react");
var import_react_intersection_observer = require("react-intersection-observer");

// app/hooks/useAudioItemsTaggedWithEntity.ts
var import_client31 = require("@apollo/client");
var AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY = import_client31.gql`
	query AudioItemsTaggedWithEntity($input: AudioItemsTaggedWithEntityInput!) {
		audioItemsTaggedWithEntity(input: $input) {
			audioItems {
				...AudioItem
			}
			total
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemsTaggedWithEntity = ({
  entity,
  page = 1,
  perPage = 10,
  queryOptions = {}
}) => {
  var _a, _b;
  const query = (0, import_client31.useQuery)(AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY, __spreadValues({
    variables: {
      input: {
        entityType: entity == null ? void 0 : entity.entityType,
        entityId: entity == null ? void 0 : entity.id,
        skip: (page - 1) * perPage,
        take: perPage
      }
    },
    skip: !entity
  }, queryOptions));
  const { data } = query;
  const audioItems = (_a = data == null ? void 0 : data.audioItemsTaggedWithEntity) == null ? void 0 : _a.audioItems;
  const total = (_b = data == null ? void 0 : data.audioItemsTaggedWithEntity) == null ? void 0 : _b.total;
  return {
    audioItems,
    total,
    query
  };
};
var useAudioItemsTaggedWithEntity_default = useAudioItemsTaggedWithEntity;

// app/hooks/useFilters.ts
var import_react73 = require("react");

// app/hooks/useQueryParams.ts
var import_react70 = require("react");
var import_react71 = require("@remix-run/react");
var useQueryParams = () => {
  const navigate = (0, import_react71.useNavigate)();
  const getQueryParams = (0, import_react70.useCallback)(() => {
    if (typeof window === "undefined") {
      return {};
    }
    const queryParams = new URLSearchParams(window.location.search);
    const outputObject = {};
    for (const key of queryParams.keys()) {
      outputObject[key] = queryParams.get(key);
    }
    return outputObject;
  }, []);
  const updateQueryParams = (0, import_react70.useCallback)((paramsToUpdate = {}) => {
    if (typeof window === "undefined") {
      return;
    }
    const queryParams = new URLSearchParams(window.location.search);
    const paramNames = Object.keys(paramsToUpdate);
    paramNames.forEach((paramName) => {
      const value = paramsToUpdate[paramName];
      if (value) {
        queryParams.set(paramName, value);
      } else {
        queryParams.delete(paramName);
      }
    });
    return navigate(`${window.location.pathname}?${queryParams.toString()}`);
  }, [navigate]);
  const clearQueryParams = (0, import_react70.useCallback)(() => {
    if (typeof window === "undefined") {
      return;
    }
    navigate(window.location.pathname);
  }, [navigate]);
  const returnValue = (0, import_react70.useMemo)(() => ({
    getQueryParams,
    updateQueryParams,
    clearQueryParams
  }), [getQueryParams, updateQueryParams, clearQueryParams]);
  return returnValue;
};
var useQueryParams_default = useQueryParams;

// app/components/Filters.tsx
var import_react72 = __toESM(require("react"));
var Filters = ({
  totalItems,
  page,
  onChangePage,
  perPage,
  onChangePerPage,
  sortBy,
  onChangeSortBy,
  viewAs,
  onChangeViewAs,
  className
}) => {
  const shouldRenderPagination = typeof totalItems === "number" && typeof page === "number" && onChangePage && perPage && onChangePerPage;
  const shouldRenderSortBy = sortBy && onChangeSortBy;
  const shouldRenderViewAs = viewAs && onChangeViewAs;
  const totalPages = (0, import_react72.useMemo)(() => {
    if (typeof totalItems !== "number" || typeof perPage === "undefined") {
      return 0;
    }
    return Math.ceil(totalItems / perPage);
  }, [totalItems, perPage]);
  const pageSelectOptions = (0, import_react72.useMemo)(() => {
    const output = [];
    let i = 1;
    while (i <= totalPages) {
      output.push(/* @__PURE__ */ import_react72.default.createElement("option", {
        value: i,
        key: i
      }, i));
      i++;
    }
    return output;
  }, [totalPages]);
  const perPageOptions = (0, import_react72.useMemo)(() => {
    const output = [];
    for (const value in PerPage) {
      if (isNaN(Number(value))) {
        continue;
      }
      output.push(/* @__PURE__ */ import_react72.default.createElement("option", {
        value,
        key: value
      }, value));
    }
    return output;
  }, []);
  return /* @__PURE__ */ import_react72.default.createElement("div", {
    className: `flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 ${className ?? ""}`
  }, shouldRenderPagination && /* @__PURE__ */ import_react72.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderSortBy || shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, /* @__PURE__ */ import_react72.default.createElement("div", {
    className: "mr-6"
  }, "Page", " ", /* @__PURE__ */ import_react72.default.createElement("select", {
    value: page,
    onChange: onChangePage
  }, pageSelectOptions), totalPages ? ` of ${totalPages}` : ""), /* @__PURE__ */ import_react72.default.createElement("div", null, /* @__PURE__ */ import_react72.default.createElement("select", {
    value: perPage,
    onChange: onChangePerPage
  }, perPageOptions), " ", "per page")), shouldRenderSortBy && /* @__PURE__ */ import_react72.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, "Sort by", /* @__PURE__ */ import_react72.default.createElement("select", {
    className: "ml-1",
    value: sortBy,
    onChange: onChangeSortBy
  }, /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "RecentlyTagged" /* RecentlyTagged */
  }, "Recently tagged"), /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "RecentlyAdded" /* RecentlyAdded */
  }, "Recently added"))), shouldRenderViewAs && /* @__PURE__ */ import_react72.default.createElement("div", {
    className: "flex flex-row items-center mr-0 md:mb-0"
  }, "View as", /* @__PURE__ */ import_react72.default.createElement("select", {
    className: "ml-1",
    value: viewAs,
    onChange: onChangeViewAs
  }, /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "Cards" /* Cards */
  }, "Cards"), /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "Compact" /* Compact */
  }, "Compact"), /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "List" /* List */
  }, "List"))));
};
var Filters_default = Filters;

// app/hooks/useFilters.ts
var useFilters = ({
  totalItems,
  defaultPage,
  defaultPerPage,
  defaultSortBy,
  defaultViewAs,
  enableQueryParams = true
} = {}) => {
  const { getQueryParams, updateQueryParams, clearQueryParams } = useQueryParams_default();
  const queryParams = getQueryParams();
  const initialPage = enableQueryParams ? parseInt(queryParams.page, 10) || defaultPage : defaultPage;
  const initialPerPage = enableQueryParams ? parseInt(queryParams.perPage, 10) || defaultPerPage : defaultPerPage;
  const initialSortBy = enableQueryParams ? queryParams.sortBy ?? defaultSortBy : defaultSortBy;
  const initialViewAs = enableQueryParams ? queryParams.viewAs ?? defaultViewAs : defaultViewAs;
  const [page, setPage] = (0, import_react73.useState)(initialPage);
  const [perPage, setPerPage] = (0, import_react73.useState)(initialPerPage);
  const [sortBy, setSortBy] = (0, import_react73.useState)(initialSortBy);
  const [viewAs, setViewAs] = (0, import_react73.useState)(initialViewAs);
  (0, import_react73.useEffect)(() => {
    if (!enableQueryParams) {
      return;
    }
    updateQueryParams({
      page: page ? `${page}` : null,
      perPage: perPage ? `${perPage}` : null,
      sortBy,
      viewAs
    });
  }, [enableQueryParams, page, perPage, sortBy, viewAs]);
  (0, import_react73.useEffect)(() => {
    if (!enableQueryParams) {
      return;
    }
    return () => clearQueryParams();
  }, [enableQueryParams]);
  const onChangePage = (0, import_react73.useCallback)((event) => setPage(parseInt(event.target.value)), []);
  const onChangePerPage = (0, import_react73.useCallback)((event) => {
    setPerPage(parseInt(event.target.value));
    setPage(1);
  }, []);
  const onChangeSortBy = (0, import_react73.useCallback)((event) => setSortBy(event.target.value), []);
  const onChangeViewAs = (0, import_react73.useCallback)((event) => setViewAs(event.target.value), []);
  const returnValue = (0, import_react73.useMemo)(() => ({
    Filters: Filters_default,
    filtersProps: {
      totalItems,
      page,
      onChangePage,
      perPage,
      onChangePerPage,
      sortBy,
      onChangeSortBy,
      viewAs,
      onChangeViewAs
    },
    page,
    perPage,
    sortBy,
    viewAs
  }), [
    Filters_default,
    totalItems,
    page,
    onChangePage,
    perPage,
    onChangePerPage,
    sortBy,
    onChangeSortBy,
    viewAs,
    onChangeViewAs
  ]);
  return returnValue;
};
var useFilters_default = useFilters;

// app/components/ViewEntityAndAudioItems.tsx
var ViewEntityAndAudioItems = ({ entity, className }) => {
  var _a;
  const { name } = entity ?? {};
  const { ref: metadataRef, inView: metadataInView } = (0, import_react_intersection_observer.useInView)({
    initialInView: true
  });
  const [totalAudioItems, setTotalAudioItems] = (0, import_react74.useState)();
  const { Filters: Filters2, filtersProps, page, perPage, viewAs } = useFilters_default({
    defaultPage: 1,
    totalItems: totalAudioItems,
    defaultPerPage: 20 /* Twenty */,
    defaultViewAs: "Cards" /* Cards */
  });
  const filtersRef = (0, import_react74.useRef)(null);
  (0, import_react74.useEffect)(() => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [page, filtersRef]);
  const {
    audioItems = [],
    total,
    query: { loading: audioItemsLoading, error: audioItemsError }
  } = useAudioItemsTaggedWithEntity_default({
    entity,
    page,
    perPage
  });
  (0, import_react74.useEffect)(() => {
    if (typeof total === "number") {
      setTotalAudioItems(total);
    }
  }, [total]);
  const headerOffset = ((_a = window.document.getElementById("header")) == null ? void 0 : _a.offsetHeight) ?? 0;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-1 flex-col mb-8 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-6",
    ref: metadataRef
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: Entity_default.makeReadableNamePlural(entity),
        href: Entity_default.makeHrefForTopLevel(entity)
      },
      { label: name }
    ],
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, totalAudioItems ?? "", " Audio Item", totalAudioItems === 1 ? "" : "s"), /* @__PURE__ */ React.createElement(import_react75.Link, {
    to: Entity_default.makeHrefForAbout(entity)
  }, /* @__PURE__ */ React.createElement("a", {
    className: "ml-4"
  }, "About")), /* @__PURE__ */ React.createElement(import_react75.Link, {
    to: Entity_default.makeHrefForTags(entity)
  }, /* @__PURE__ */ React.createElement("a", {
    className: "ml-4"
  }, "Tags"))), totalAudioItems > 0 && /* @__PURE__ */ React.createElement("div", {
    ref: filtersRef
  }, /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps)))), audioItemsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), totalAudioItems > 0 && audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })), audioItemsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Audio Items"), /* @__PURE__ */ React.createElement("div", {
    className: `${metadataInView ? "hidden" : "visible"} fixed left-0 right-0 p-4 bg-gray-100 shadow-lg`,
    style: { top: `${headerOffset}px` }
  }, totalAudioItems > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps))));
};
var ViewEntityAndAudioItems_default = ViewEntityAndAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug].tsx
var COLLECTION_QUERY = import_client32.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var ViewCollectionBySlug = () => {
  const navigate = (0, import_react76.useNavigate)();
  const { slug } = navigate.query;
  const { data: collectionData, error: collectionError } = (0, import_client32.useQuery)(COLLECTION_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { collection } = collectionData ?? {};
  let statusMessage;
  if (!collectionData && !collectionError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!collectionData && collectionError) {
    statusMessage = `Error fetching Collection with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${collection.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: collection
  }));
};
var slug_default2 = ViewCollectionBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/about.tsx
var about_exports2 = {};
__export(about_exports2, {
  default: () => about_default2
});
var import_client34 = require("@apollo/client");
var import_react78 = require("@remix-run/react");
var import_react79 = require("@remix-run/react");

// app/routes/entities/collections/[slug].tsx
var import_react77 = require("@remix-run/react");
var import_client33 = require("@apollo/client");
var COLLECTION_QUERY2 = import_client33.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/about.tsx
var CollectionAbout = () => {
  const navigate = (0, import_react79.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client34.useQuery)(COLLECTION_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.collection) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Collections", href: "/entities/collections" },
      { label: name, href: `/entities/collections/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), itmaAtomSlug && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "italic text-gray-500"
  }, "This was sourced from ITMA's AtoM archive"), /* @__PURE__ */ React.createElement("a", {
    href: `https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View on AtoM ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react78.Link, {
    to: `/entities/collections/${slug}/edit`
  }, "Edit")));
};
var about_default2 = CollectionAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/edit.tsx
var edit_exports2 = {};
__export(edit_exports2, {
  default: () => edit_default2
});
var import_react82 = require("@remix-run/react");
var import_client36 = require("@apollo/client");

// app/components/EditCollectionForm.tsx
var import_react80 = require("react");
var import_client35 = require("@apollo/client");
var import_react81 = require("@remix-run/react");
var UPDATE_COLLECTION_MUTATION = import_client35.gql`
	mutation UpdateCollection($slug: String!, $input: UpdateCollectionInput!) {
		updateCollection(slug: $slug, input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var EditCollectionForm = ({ collection, onSuccess }) => {
  const navigate = (0, import_react81.useNavigate)();
  const [updateCollection, { loading, error, data }] = (0, import_client35.useMutation)(UPDATE_COLLECTION_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react80.useState)(collection.name);
  const [aliases, setAliases] = (0, import_react80.useState)(collection.aliases);
  const [description, setDescription] = (0, import_react80.useState)(collection.description);
  const onUpdateCollection = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateCollection({ variables: { slug: collection.slug, input } });
  };
  (0, import_react80.useEffect)(() => {
    if (data == null ? void 0 : data.updateCollection) {
      if (onSuccess) {
        return onSuccess(data.updateCollection);
      }
      window.alert("Collection updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateCollection
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases ?? "",
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Collection. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "O'Neill's, 1000 Fiddle Tunes")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditCollectionForm_default = EditCollectionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/edit.tsx
var COLLECTION_QUERY3 = import_client36.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var CollectionEdit = () => {
  const navigate = (0, import_react82.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client36.useQuery)(COLLECTION_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (collection2) => {
    navigate(`/entities/collections/${collection2.slug}/about`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Collection with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { collection } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Collection: ", collection.name), /* @__PURE__ */ React.createElement(EditCollectionForm_default, {
    collection,
    onSuccess: onEditSuccess
  }))));
};
var edit_default2 = CollectionEdit;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/tags.tsx
var tags_exports2 = {};
__export(tags_exports2, {
  default: () => tags_default2
});
var import_client37 = require("@apollo/client");
var import_react84 = require("@remix-run/react");

// app/components/TagWithRelationshipToObject.tsx
var import_react83 = require("@remix-run/react");
var TagWithRelationshipToObject = ({ tag, className }) => {
  const { relationship, objectEntity, subjectTimeMarkerSeconds } = tag;
  if (!objectEntity) {
    return null;
  }
  const shouldShowTimeMarker = typeof subjectTimeMarkerSeconds === "number";
  return /* @__PURE__ */ React.createElement("div", {
    className: `text-gray-500 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("em", null, relationship.name), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "uppercase text-sm"
  }, objectEntity.entityType), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react83.Link, {
    to: Entity_default.makeHrefForView(objectEntity)
  }, objectEntity.name), /* @__PURE__ */ React.createElement("br", null), typeof subjectTimeMarkerSeconds === "number" && /* @__PURE__ */ React.createElement("em", null, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`));
};
var TagWithRelationshipToObject_default = TagWithRelationshipToObject;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/tags.tsx
var CollectionTags = () => {
  const navigate = (0, import_react84.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client37.useQuery)(COLLECTION_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { collection } = data ?? {};
  const { name, tags } = collection ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Collections", href: "/entities/collections" },
      { label: name, href: `/entities/collections/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: collection,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: collection,
    onSuccess: refetch
  })))));
};
var tags_default2 = CollectionTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug].tsx
var slug_exports3 = {};
__export(slug_exports3, {
  INSTRUMENT_QUERY: () => INSTRUMENT_QUERY,
  default: () => slug_default3
});
var import_react85 = require("@remix-run/react");
var import_client38 = require("@apollo/client");
var INSTRUMENT_QUERY = import_client38.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var ViewInstrumentBySlug = () => {
  const navigate = (0, import_react85.useNavigate)();
  const { slug } = navigate.query;
  const { data: instrumentData, error: instrumentError } = (0, import_client38.useQuery)(INSTRUMENT_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { instrument } = instrumentData ?? {};
  let statusMessage;
  if (!instrumentData && !instrumentError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!instrumentData && instrumentError) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${instrument.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: instrument
  }));
};
var slug_default3 = ViewInstrumentBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/about.tsx
var about_exports3 = {};
__export(about_exports3, {
  default: () => about_default3
});
var import_client40 = require("@apollo/client");
var import_react87 = require("@remix-run/react");
var import_react88 = require("@remix-run/react");

// app/routes/entities/instruments/[slug].tsx
var import_react86 = require("@remix-run/react");
var import_client39 = require("@apollo/client");
var INSTRUMENT_QUERY2 = import_client39.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/about.tsx
var InstrumentAbout = () => {
  const navigate = (0, import_react88.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client40.useQuery)(INSTRUMENT_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases } = (data == null ? void 0 : data.instrument) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Instruments", href: "/entities/instruments" },
      { label: name, href: `/entities/instruments/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react87.Link, {
    to: `/entities/instruments/${slug}/edit`
  }, "Edit")));
};
var about_default3 = InstrumentAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/edit.tsx
var edit_exports3 = {};
__export(edit_exports3, {
  default: () => edit_default3
});
var import_react91 = require("@remix-run/react");
var import_client42 = require("@apollo/client");

// app/components/EditInstrumentForm.tsx
var import_react89 = require("react");
var import_client41 = require("@apollo/client");
var import_react90 = require("@remix-run/react");
var UPDATE_INSTRUMENT_MUTATION = import_client41.gql`
	mutation UpdateInstrument($slug: String!, $input: UpdateInstrumentInput!) {
		updateInstrument(slug: $slug, input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var EditInstrumentForm = ({ instrument, onSuccess }) => {
  const navigate = (0, import_react90.useNavigate)();
  const [updateInstrument, { loading, error, data }] = (0, import_client41.useMutation)(UPDATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react89.useState)(instrument.name);
  const [aliases, setAliases] = (0, import_react89.useState)(instrument.aliases);
  const [description, setDescription] = (0, import_react89.useState)(instrument.description);
  const onUpdateInstrument = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateInstrument({ variables: { slug: instrument.slug, input } });
  };
  (0, import_react89.useEffect)(() => {
    if (data == null ? void 0 : data.updateInstrument) {
      if (onSuccess) {
        return onSuccess(data.updateInstrument);
      }
      window.alert("Instrument updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateInstrument
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Instrument. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Stomach Steinway, Squeezebox, Belly Organ")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditInstrumentForm_default = EditInstrumentForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/edit.tsx
var INSTRUMENT_QUERY3 = import_client42.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var EditInstrument = () => {
  const navigate = (0, import_react91.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client42.useQuery)(INSTRUMENT_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (instrument2) => {
    navigate(`/entities/instruments/${instrument2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { instrument } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Instrument: ", instrument.name), /* @__PURE__ */ React.createElement(EditInstrumentForm_default, {
    instrument,
    onSuccess: onEditSuccess
  }))));
};
var edit_default3 = EditInstrument;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/tags.tsx
var tags_exports3 = {};
__export(tags_exports3, {
  default: () => tags_default3
});
var import_client43 = require("@apollo/client");
var import_react92 = require("@remix-run/react");
var InstrumentTags = () => {
  const navigate = (0, import_react92.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client43.useQuery)(INSTRUMENT_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { instrument } = data ?? {};
  const { name, tags } = instrument ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Instruments", href: "/entities/instruments" },
      { label: name, href: `/entities/instruments/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: instrument,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: instrument,
    onSuccess: refetch
  })))));
};
var tags_default3 = InstrumentTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/index.tsx
var audio_items_exports = {};
__export(audio_items_exports, {
  default: () => audio_items_default
});
var import_react93 = require("react");
var import_react94 = require("@remix-run/react");
var ViewAudioItems = () => {
  const navigate = (0, import_react94.useNavigate)();
  (0, import_react93.useEffect)(() => {
    navigate("/");
  }, [navigate]);
  return null;
};
var audio_items_default = ViewAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default
});
var import_react96 = require("@remix-run/react");

// app/hooks/useCollections.ts
var import_react95 = require("react");
var import_client44 = require("@apollo/client");
var COLLECTIONS_QUERY = import_client44.gql`
	query Collections($input: CollectionsInput!) {
		collections(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var useCollections = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react95.useState)(0);
  const [collections, setCollections] = (0, import_react95.useState)();
  const [getCollections, collectionsQuery] = (0, import_client44.useLazyQuery)(COLLECTIONS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = collectionsQuery;
  (0, import_react95.useEffect)(() => {
    if (data == null ? void 0 : data.collections) {
      setCollections(data.collections);
    }
  }, [data]);
  (0, import_react95.useEffect)(() => {
    getCollections({
      variables: {
        input: {
          take: resultsPerPage + skip,
          skip: 0,
          sortBy
        }
      }
    });
  }, [getCollections, resultsPerPage, sortBy]);
  const fetchNextPageOfCollections = (0, import_react95.useCallback)(async () => {
    const numToSkip = (collections == null ? void 0 : collections.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          take: resultsPerPage,
          skip: numToSkip,
          sortBy
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, collections, sortBy]);
  return [collections, collectionsQuery, fetchNextPageOfCollections];
};
var useCollections_default = useCollections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var Collections = () => {
  const [collections, { loading, error }, fetchNextPage] = useCollections_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Collections`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Collections"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Collections"), !loading && (collections == null ? void 0 : collections.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Collections found"), (collections == null ? void 0 : collections.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, collections.map((collection, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react96.Link, {
    to: Entity_default.makeHrefForView(collection)
  }, collection.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (collections == null ? void 0 : collections.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var collections_default = Collections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var instruments_exports = {};
__export(instruments_exports, {
  default: () => instruments_default
});
var import_react98 = require("@remix-run/react");

// app/hooks/useInstruments.ts
var import_react97 = require("react");
var import_client45 = require("@apollo/client");
var INSTRUMENTS_QUERY = import_client45.gql`
	query Instruments($input: InstrumentsInput!) {
		instruments(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var useInstruments = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react97.useState)(0);
  const [instruments, setInstruments] = (0, import_react97.useState)();
  (0, import_react97.useEffect)(() => {
    setInstruments(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getInstruments, instrumentsQuery] = (0, import_client45.useLazyQuery)(INSTRUMENTS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = instrumentsQuery;
  (0, import_react97.useEffect)(() => {
    if (data == null ? void 0 : data.instruments) {
      setInstruments(data.instruments);
    }
  }, [data]);
  (0, import_react97.useEffect)(() => {
    getInstruments({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getInstruments, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react97.useCallback)(async () => {
    const numToSkip = (instruments == null ? void 0 : instruments.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, instruments, sortBy]);
  return [instruments, instrumentsQuery, fetchNextPage];
};
var useInstruments_default = useInstruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var Instruments = () => {
  const [instruments, { loading, error }, fetchNextPage] = useInstruments_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Instruments`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Instruments"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Instruments"), !loading && (instruments == null ? void 0 : instruments.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Instruments found"), (instruments == null ? void 0 : instruments.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, instruments.map((instrument, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react98.Link, {
    to: Entity_default.makeHrefForView(instrument)
  }, instrument.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (instruments == null ? void 0 : instruments.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var instruments_default = Instruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/index.tsx
var submissions_exports = {};
__export(submissions_exports, {
  default: () => submissions_default
});
var import_react99 = require("@remix-run/react");
var import_client46 = require("@apollo/client");
var SUBMISSIONS_FOR_CURRENT_USER = import_client46.gql`
	query SubmissionsForCurrentUser {
		submissionsForCurrentUser {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var Submissions = () => {
  const { data, loading } = (0, import_client46.useQuery)(SUBMISSIONS_FOR_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement(import_react99.Link, {
    to: "/account/submissions/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn"
  }, "Create New")), !data && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, {
    className: "mt-12"
  }), data && /* @__PURE__ */ React.createElement("ul", {
    className: "mt-12"
  }, data.submissionsForCurrentUser.map((s, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-4",
    key: index
  }, DateTime_default.formatDateYearTime(s.createdAt, true), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, `${s.description.substring(0, 200)}${s.description.length > 200 ? "..." : ""}`), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react99.Link, {
    to: `/account/submissions/${s.id}/upload`
  }, "Upload More Files to This Submission"))))));
};
var submissions_default = Submissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var new_exports = {};
__export(new_exports, {
  default: () => new_default
});
var import_react102 = require("@remix-run/react");

// app/hooks/useAudioItems.ts
var import_react100 = require("react");
var import_client47 = require("@apollo/client");
var AUDIO_ITEMS_QUERY = import_client47.gql`
	query AudioItems($input: AudioItemsInput!) {
		audioItems(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItems = ({
  sortBy = "RecentlyTagged" /* RecentlyTagged */,
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react100.useState)(0);
  const [audioItems, setAudioItems] = (0, import_react100.useState)();
  (0, import_react100.useEffect)(() => {
    setAudioItems(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getAudioItems, audioItemsQuery] = (0, import_client47.useLazyQuery)(AUDIO_ITEMS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = audioItemsQuery;
  (0, import_react100.useEffect)(() => {
    if (data == null ? void 0 : data.audioItems) {
      setAudioItems(data.audioItems);
    }
  }, [data]);
  (0, import_react100.useEffect)(() => {
    getAudioItems({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0,
          status: "Published" /* Published */
        }
      }
    });
  }, [getAudioItems, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react100.useCallback)(async () => {
    const numToSkip = (audioItems == null ? void 0 : audioItems.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          status: "Published" /* Published */,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, audioItems, sortBy]);
  return [audioItems, audioItemsQuery, fetchNextPage];
};
var useAudioItems_default = useAudioItems;

// app/components/CreateAudioItemForm.tsx
var import_react101 = require("react");
var import_client48 = require("@apollo/client");
var CREATE_AUDIO_ITEM_MUTATION = import_client48.gql`
	mutation CreateAudioItem($input: CreateAudioItemInput!) {
		createAudioItem(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var CreateAudioItemForm = ({ onSuccess }) => {
  const [createAudioItem, { loading, error, data }] = (0, import_client48.useMutation)(CREATE_AUDIO_ITEM_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react101.useState)("");
  const [urlSource, setUrlSource] = (0, import_react101.useState)("");
  const [slug, setSlug] = (0, import_react101.useState)("");
  const [aliases, setAliases] = (0, import_react101.useState)("");
  const [description, setDescription] = (0, import_react101.useState)("");
  (0, import_react101.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateAudioItem = (event) => {
    event.preventDefault();
    createAudioItem({
      variables: { input: { name, urlSource, slug, aliases, description } }
    });
  };
  (0, import_react101.useEffect)(() => {
    if (data == null ? void 0 : data.createAudioItem) {
      if (onSuccess) {
        return onSuccess(data.createAudioItem);
      }
      window.alert("Audio Item created successfully!");
      setName("");
      setUrlSource("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateAudioItem
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL of Source File (ie. https://www.example.com/file.mp3)",
    className: "mb-2",
    value: urlSource,
    onChange: (event) => setUrlSource(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. finbarr-dwyer-live-at-dolans)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this AudioItem, for example", " ", `https://trad-archive.com/entities/audio-items/${slug || "finbarr-dwyer-live-at-dolans"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this AudioItem. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Finbarr and Brian, Finbarr '08 at Dolan's")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error.message));
};
var CreateAudioItemForm_default = CreateAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var NewAudioItem = () => {
  const navigate = (0, import_react102.useNavigate)();
  const [_, { refetch }] = useAudioItems_default();
  const onCreateSuccess = async (audioItem) => {
    await refetch();
    navigate(`/entities/audio-items/${audioItem.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Audio Item"), /* @__PURE__ */ React.createElement(CreateAudioItemForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default = NewAudioItem;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/new.tsx
var new_exports2 = {};
__export(new_exports2, {
  default: () => new_default2
});
var import_react103 = require("@remix-run/react");
var NewCollection = () => {
  const navigate = (0, import_react103.useNavigate)();
  const onCreateSuccess = (collection) => {
    navigate(`/entities/collections/${collection.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Collection"), /* @__PURE__ */ React.createElement(CreateCollectionForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default2 = NewCollection;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/new.tsx
var new_exports3 = {};
__export(new_exports3, {
  default: () => new_default3
});
var import_react104 = require("@remix-run/react");
var NewInstrument = () => {
  const navigate = (0, import_react104.useNavigate)();
  const onCreateSuccess = (instrument) => {
    navigate(`/entities/instruments/${instrument.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Instrument"), /* @__PURE__ */ React.createElement(CreateInstrumentForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default3 = NewInstrument;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var new_exports4 = {};
__export(new_exports4, {
  default: () => new_default4
});
var import_react106 = require("@remix-run/react");

// app/components/CreateSubmissionForm.tsx
var import_react105 = require("react");
var import_client49 = require("@apollo/client");

// app/components/Checkbox.tsx
var Checkbox = ({ checked, label, id, onChange, className }) => {
  const inputId = id ?? `input_${Math.round(Math.random() * 1e5)}`;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row items-top justify-start ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    checked,
    onChange,
    id: inputId,
    className: "mt-1 mr-2"
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: inputId
  }, label));
};
var Checkbox_default = Checkbox;

// app/components/CreateSubmissionForm.tsx
var CREATE_SUBMISSION = import_client49.gql`
	mutation CreateSubmission($input: CreateSubmissionInput!) {
		createSubmission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var CreateSubmissionForm = ({ onSuccess }) => {
  const [currentUser] = useCurrentUser_default();
  const [materialTypes, setMaterialTypes] = (0, import_react105.useState)([]);
  const [userControlsCopyright, setUserControlsCopyright] = (0, import_react105.useState)(true);
  const [copyrightDetails, setCopyrightDetails] = (0, import_react105.useState)("");
  const [description, setDescription] = (0, import_react105.useState)("");
  const [userGrantsPermissionToITMA, setUserGrantsPermissionToITMA] = (0, import_react105.useState)(false);
  const [validationError, setValidationError] = (0, import_react105.useState)("");
  const [createSubmission, { loading, data, error }] = (0, import_client49.useMutation)(CREATE_SUBMISSION, { errorPolicy: "all" });
  const onMaterialTypeChecked = (materialType, isChecked) => {
    if (isChecked) {
      setMaterialTypes(materialTypes.concat(materialType));
    } else {
      setMaterialTypes(materialTypes.filter((mt) => mt !== materialType));
    }
  };
  const materialTypeIsChecked = (materialType) => {
    return materialTypes.includes(materialType);
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    setValidationError("");
    if (!userControlsCopyright && !copyrightDetails) {
      setValidationError("Please provide details on who controls the copyright for these items");
      return;
    }
    if (!description) {
      setValidationError("Please describe the items you are submitting");
      return;
    }
    const input = {
      materialTypes,
      userControlsCopyright,
      copyrightDetails,
      description
    };
    try {
      createSubmission({
        variables: {
          input
        }
      });
    } catch {
    }
  };
  (0, import_react105.useEffect)(() => {
    var _a;
    if (((_a = data == null ? void 0 : data.createSubmission) == null ? void 0 : _a.id) && onSuccess) {
      onSuccess(data.createSubmission);
    }
  }, [data, onSuccess]);
  return /* @__PURE__ */ React.createElement("form", {
    className: "flex flex-col items-start",
    onSubmit: onSubmitForm
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col mb-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "What types of material would you like to upload?"), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "audio",
    label: "Audio",
    checked: materialTypeIsChecked("Audio" /* Audio */),
    onChange: (e) => onMaterialTypeChecked("Audio" /* Audio */, e.target.checked),
    className: "mb-1"
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "video",
    label: "Video",
    checked: materialTypeIsChecked("Video" /* Video */),
    onChange: (e) => onMaterialTypeChecked("Video" /* Video */, e.target.checked),
    className: "mb-1"
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "image",
    label: "Image",
    checked: materialTypeIsChecked("Image" /* Image */),
    onChange: (e) => onMaterialTypeChecked("Image" /* Image */, e.target.checked),
    className: "mb-1"
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "document",
    label: "Document",
    checked: materialTypeIsChecked("Document" /* Document */),
    onChange: (e) => onMaterialTypeChecked("Document" /* Document */, e.target.checked),
    className: "mb-1"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Do you control the copyright for these items?"), /* @__PURE__ */ React.createElement("select", {
    className: "mb-6",
    value: userControlsCopyright ? "Yes" : "No",
    onChange: (event) => setUserControlsCopyright(event.target.value === "Yes" ? true : false)
  }, /* @__PURE__ */ React.createElement("option", {
    value: "Yes"
  }, "Yes"), /* @__PURE__ */ React.createElement("option", {
    value: "No"
  }, "No")), !userControlsCopyright && /* @__PURE__ */ React.createElement("div", {
    className: "mb-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Who controls the copyright? Are you donating on someone's behalf?"), /* @__PURE__ */ React.createElement("textarea", {
    rows: 3,
    value: copyrightDetails,
    onChange: (e) => setCopyrightDetails(e.target.value)
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Please describe this material:", /* @__PURE__ */ React.createElement("br", null), "- Who collected it?", /* @__PURE__ */ React.createElement("br", null), "- Who originally recorded it?", /* @__PURE__ */ React.createElement("br", null), "- Who is featured in these items?", /* @__PURE__ */ React.createElement("br", null), "- What are the recording dates?", /* @__PURE__ */ React.createElement("br", null), "- What are the recording locations?", /* @__PURE__ */ React.createElement("br", null), "- Any other comments you'd like to add?"), /* @__PURE__ */ React.createElement("textarea", {
    className: "mb-6",
    rows: 12,
    value: description,
    onChange: (e) => setDescription(e.target.value)
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    className: "mb-6",
    checked: userGrantsPermissionToITMA,
    label: "By clicking this box, I consent to upload and give the digitised\n			material to the Irish Traditional Music Archive (Dublin, Ireland). ITMA\n			reserves the right to retain or delete at any time this material based on\n			its collection policy.",
    onChange: (e) => setUserGrantsPermissionToITMA(e.target.checked)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "Save and Continue to Upload",
    disabled: loading || !userGrantsPermissionToITMA
  }), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, validationError), error && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, "Error saving Submission. Please reload the page and try again."), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 italic mt-6"
  }, "As per ITMA's Data Protection policy the information provided on this form will not be used for any other purpose; it will be stored securely and will not be shared with any third parties."));
};
var CreateSubmissionForm_default = CreateSubmissionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var SubmissionsNew = () => {
  const navigate = (0, import_react106.useNavigate)();
  const onCreateSuccess = (submission) => {
    navigate(`/account/submissions/${submission.id}/upload`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      {
        label: "Submissions",
        href: "/account/submissions"
      },
      { label: "Create a New Submission" }
    ],
    className: "mb-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "max-w-full md:max-w-xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-6 text-gray-500"
  }, "Welcome! Please use this page if you would like to submit material to be considered for acceptance into ITMA's permanent collection. Submission is easy: just fill in the form below to provide information about the sound recordings, videos, photographs or documents you are sharing, then upload your files. Thank you for your contribution."), /* @__PURE__ */ React.createElement(CreateSubmissionForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default4 = SubmissionsNew;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/submissions/index.tsx
var submissions_exports2 = {};
__export(submissions_exports2, {
  default: () => submissions_default2
});
var import_react107 = require("@remix-run/react");
var import_client50 = require("@apollo/client");
var SUBMISSIONS = import_client50.gql`
	query Submissions($input: SubmissionsInput!) {
		submissions(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var AdminSubmissions = () => {
  const { data, loading } = (0, import_client50.useQuery)(SUBMISSIONS, {
    variables: { input: { take: 100, skip: 0 } },
    fetchPolicy: "cache-and-network"
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Submissions" }
    ],
    className: "mb-6"
  }), !data && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), data && /* @__PURE__ */ React.createElement("ul", null, data.submissions.map((s, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-4",
    key: index
  }, DateTime_default.formatDateYearTime(s.createdAt, true), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), "From ", s.createdByUser.username, " / ", s.createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Owns copyright? ", s.userControlsCopyright ? "Yes" : "No", s.copyrightDetails ? ` - ${s.copyrightDetails}` : "", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, s.description), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react107.Link, {
    to: `/admin/submissions/${s.id}`
  }, "View Files"))))));
};
var submissions_default2 = AdminSubmissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/takedown-requests.tsx
var takedown_requests_exports = {};
__export(takedown_requests_exports, {
  default: () => takedown_requests_default
});
var import_react108 = require("react");
var import_client51 = require("@apollo/client");
var import_compareDesc3 = __toESM(require("date-fns/compareDesc"));
var TAKEDOWN_REQUESTS = import_client51.gql`
	query TakedownRequests($input: TakedownRequestsInput!) {
		takedownRequests(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;
var UPDATE_TAKEDOWN_REQUEST_STATUS = import_client51.gql`
	mutation UpdateTakedownRequestStatus(
		$input: UpdateTakedownRequestStatusInput!
	) {
		updateTakedownRequestStatus(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;
var TakedownRequests = () => {
  const {
    loading: takedownRequestsLoading,
    data: takedownRequestsData,
    error: takedownRequestsError
  } = (0, import_client51.useQuery)(TAKEDOWN_REQUESTS, {
    variables: { input: { take: 200, skip: 0 } },
    fetchPolicy: "network-only"
  });
  const takedownRequests = (0, import_react108.useMemo)(() => {
    if (!(takedownRequestsData == null ? void 0 : takedownRequestsData.takedownRequests)) {
      return [];
    }
    const sortedTakedownRequests = [...takedownRequestsData.takedownRequests];
    sortedTakedownRequests.sort((a, b) => (0, import_compareDesc3.default)(new Date(a.createdAt), new Date(b.createdAt)));
    return sortedTakedownRequests;
  }, [takedownRequestsData]);
  const [
    updateTakedownRequestStatus,
    {
      loading: updateTakedownRequestStatusLoading,
      error: updateTakedownRequestStatusError
    }
  ] = (0, import_client51.useMutation)(UPDATE_TAKEDOWN_REQUEST_STATUS, { errorPolicy: "all" });
  const onApproveClicked = (id) => {
    updateTakedownRequestStatus({
      variables: { input: { id, status: "Approved" /* Approved */ } }
    });
  };
  const onDenyClicked = (id) => {
    updateTakedownRequestStatus({
      variables: { input: { id, status: "Denied" /* Denied */ } }
    });
  };
  (0, import_react108.useEffect)(() => {
    if (updateTakedownRequestStatusError) {
      window.alert("Error updating Takedown Request status. Please reload the page and try again.");
    }
  }, [updateTakedownRequestStatusError]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Takedown Requests" }
    ],
    className: "mb-6"
  }), takedownRequestsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), takedownRequestsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, takedownRequestsError.graphQLErrors.join(", ")), !takedownRequestsLoading && (takedownRequests == null ? void 0 : takedownRequests.map((takedownRequest, index) => {
    const {
      id,
      createdAt,
      createdByUser,
      entity,
      status,
      type,
      message
    } = takedownRequest;
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4",
      key: index
    }, "Created ", DateTime_default.formatDateYearTime(createdAt), " by", " ", createdByUser.username, /* @__PURE__ */ React.createElement("br", null), "Email: ", createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Entity:", " ", /* @__PURE__ */ React.createElement("a", {
      href: Entity_default.makeHrefForView(entity),
      target: "_blank"
    }, entity.name), /* @__PURE__ */ React.createElement("br", null), "Takedown Type: ", type, /* @__PURE__ */ React.createElement("br", null), "Message: ", message, /* @__PURE__ */ React.createElement("br", null), "Status: ", status, /* @__PURE__ */ React.createElement("br", null), isApprovedTakedownRequest(takedownRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny"), isDeniedTakedownRequest(takedownRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), isPendingTakedownRequest(takedownRequest) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
      className: "btn-text mr-4",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny")));
  })))));
};
var takedown_requests_default = TakedownRequests;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/submissions/[id].tsx
var id_exports = {};
__export(id_exports, {
  default: () => id_default
});
var import_react109 = require("@remix-run/react");
var import_react110 = require("@remix-run/react");
var import_client52 = require("@apollo/client");
var SUBMISSION_WITH_FILES = import_client52.gql`
	query SubmissionWithFiles($id: String!) {
		submissionWithFiles(id: $id) {
			submission {
				...Submission
			}
			files {
				filename
				presignedDownloadUrl
			}
		}
	}
	${SubmissionFragments.submission}
`;
var AdminViewSubmissionById = () => {
  const navigate = (0, import_react110.useNavigate)();
  const { id } = navigate.query;
  const submissionId = typeof id === "string" ? id : void 0;
  const { data, loading } = (0, import_client52.useQuery)(SUBMISSION_WITH_FILES, {
    variables: { id: submissionId },
    skip: !submissionId,
    fetchPolicy: "cache-and-network"
  });
  const { submission, files } = (data == null ? void 0 : data.submissionWithFiles) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Submissions", href: "/admin/submissions" },
      {
        label: submission ? `${DateTime_default.formatDateYearTime(submission.createdAt, true)} from ${submission.createdByUser.username}` : "View Submission"
      }
    ],
    className: "mb-6"
  }), files && /* @__PURE__ */ React.createElement("ul", null, files.map((f, index) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pr-2"
  }, f.filename), /* @__PURE__ */ React.createElement(import_react109.Link, {
    to: f.presignedDownloadUrl
  }, /* @__PURE__ */ React.createElement("a", {
    target: "_blank"
  }, "View", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")))))), !files && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, {
    className: "mt-8"
  })));
};
var id_default = AdminViewSubmissionById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug].tsx
var slug_exports4 = {};
__export(slug_exports4, {
  PERSON_QUERY: () => PERSON_QUERY,
  default: () => slug_default4
});
var import_react111 = require("@remix-run/react");
var import_client53 = require("@apollo/client");
var PERSON_QUERY = import_client53.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var ViewPersonBySlug = () => {
  const navigate = (0, import_react111.useNavigate)();
  const { slug } = navigate.query;
  const { data: personData, error: personError } = (0, import_client53.useQuery)(PERSON_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { person } = personData ?? {};
  let statusMessage;
  if (!personData && !personError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!personData && personError) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${person.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: person
  }));
};
var slug_default4 = ViewPersonBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/about.tsx
var about_exports4 = {};
__export(about_exports4, {
  default: () => about_default4
});
var import_client55 = require("@apollo/client");
var import_react113 = require("@remix-run/react");
var import_react114 = require("@remix-run/react");

// app/routes/entities/people/[slug].tsx
var import_react112 = require("@remix-run/react");
var import_client54 = require("@apollo/client");
var PERSON_QUERY2 = import_client54.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/about.tsx
var PersonAbout = () => {
  const navigate = (0, import_react114.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client55.useQuery)(PERSON_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases } = (data == null ? void 0 : data.person) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "People", href: "/entities/people" },
      { label: name, href: `/entities/people/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react113.Link, {
    to: `/entities/people/${slug}/edit`
  }, "Edit")));
};
var about_default4 = PersonAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/edit.tsx
var edit_exports4 = {};
__export(edit_exports4, {
  default: () => edit_default4
});
var import_react117 = require("@remix-run/react");
var import_client57 = require("@apollo/client");

// app/components/EditPersonForm.tsx
var import_react115 = require("react");
var import_client56 = require("@apollo/client");
var import_react116 = require("@remix-run/react");
var UPDATE_PERSON_MUTATION = import_client56.gql`
	mutation UpdatePerson($slug: String!, $input: UpdatePersonInput!) {
		updatePerson(slug: $slug, input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var EditPersonForm = ({ person, onSuccess }) => {
  const navigate = (0, import_react116.useNavigate)();
  const [updatePerson, { loading, error, data }] = (0, import_client56.useMutation)(UPDATE_PERSON_MUTATION, {
    errorPolicy: "all"
  });
  const [firstName, setFirstName] = (0, import_react115.useState)(person.firstName);
  const [middleName, setMiddleName] = (0, import_react115.useState)(person.middleName);
  const [lastName, setLastName] = (0, import_react115.useState)(person.lastName);
  const [aliases, setAliases] = (0, import_react115.useState)(person.aliases);
  const [description, setDescription] = (0, import_react115.useState)(person.description);
  const onUpdatePerson = (event) => {
    event.preventDefault();
    const input = {
      firstName,
      middleName,
      lastName,
      aliases,
      description
    };
    updatePerson({ variables: { slug: person.slug, input } });
  };
  (0, import_react115.useEffect)(() => {
    if (data == null ? void 0 : data.updatePerson) {
      if (onSuccess) {
        return onSuccess(data.updatePerson);
      }
      window.alert("Person updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdatePerson
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    autoFocus: true,
    className: "mb-2",
    value: firstName,
    onChange: (event) => setFirstName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Middle name (optional)",
    className: "mb-2",
    value: middleName,
    onChange: (event) => setMiddleName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Last name",
    className: "mb-2",
    value: lastName,
    onChange: (event) => setLastName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Person. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Tony D, The Tradfather, Tony from the County Calamari")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditPersonForm_default = EditPersonForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/edit.tsx
var PERSON_QUERY3 = import_client57.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var EditPerson = () => {
  const navigate = (0, import_react117.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client57.useQuery)(PERSON_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (person2) => {
    navigate(`/entities/people/${person2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { person } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Person: ", person.name), /* @__PURE__ */ React.createElement(EditPersonForm_default, {
    person,
    onSuccess: onEditSuccess
  }))));
};
var edit_default4 = EditPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/tags.tsx
var tags_exports4 = {};
__export(tags_exports4, {
  default: () => tags_default4
});
var import_client58 = require("@apollo/client");
var import_react118 = require("@remix-run/react");
var PersonTags = () => {
  const navigate = (0, import_react118.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client58.useQuery)(PERSON_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { person } = data ?? {};
  const { name, tags } = person ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "People", href: "/entities/people" },
      { label: name, href: `/entities/people/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: person,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: person,
    onSuccess: refetch
  })))));
};
var tags_default4 = PersonTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug].tsx
var slug_exports5 = {};
__export(slug_exports5, {
  PLACE_QUERY: () => PLACE_QUERY,
  default: () => slug_default5
});
var import_react119 = require("@remix-run/react");
var import_client59 = require("@apollo/client");
var PLACE_QUERY = import_client59.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var ViewPlaceBySlug = () => {
  const navigate = (0, import_react119.useNavigate)();
  const { slug } = navigate.query;
  const { data: placeData, error: placeError } = (0, import_client59.useQuery)(PLACE_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { place } = placeData ?? {};
  let statusMessage;
  if (!placeData && !placeError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!placeData && placeError) {
    statusMessage = `Error fetching Place with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${place.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: place
  }));
};
var slug_default5 = ViewPlaceBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/about.tsx
var about_exports5 = {};
__export(about_exports5, {
  default: () => about_default5
});
var import_client61 = require("@apollo/client");
var import_react121 = require("@remix-run/react");
var import_react122 = require("@remix-run/react");

// app/routes/entities/places/[slug].tsx
var import_react120 = require("@remix-run/react");
var import_client60 = require("@apollo/client");
var PLACE_QUERY2 = import_client60.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/about.tsx
var PlaceAbout = () => {
  const navigate = (0, import_react122.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client61.useQuery)(PLACE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases, latitude, longitude } = (data == null ? void 0 : data.place) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Places", href: "/entities/places" },
      { label: name, href: `/entities/places/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), latitude && longitude && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Latitude and Longitude:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, latitude, ",", longitude), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View on Map ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base"
  }, "launch"))), /* @__PURE__ */ React.createElement(import_react121.Link, {
    to: `/entities/places/${slug}/edit`
  }, "Edit")));
};
var about_default5 = PlaceAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/edit.tsx
var edit_exports5 = {};
__export(edit_exports5, {
  default: () => edit_default5
});
var import_react125 = require("@remix-run/react");
var import_client63 = require("@apollo/client");

// app/components/EditPlaceForm.tsx
var import_react123 = require("react");
var import_client62 = require("@apollo/client");
var import_react124 = require("@remix-run/react");
var UPDATE_PLACE_MUTATION = import_client62.gql`
	mutation UpdatePlace($slug: String!, $input: UpdatePlaceInput!) {
		updatePlace(slug: $slug, input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var EditPlaceForm = ({ place, onSuccess }) => {
  const navigate = (0, import_react124.useNavigate)();
  const [updatePlace, { loading, error, data }] = (0, import_client62.useMutation)(UPDATE_PLACE_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react123.useState)(place.name);
  const [aliases, setAliases] = (0, import_react123.useState)(place.aliases);
  const [latitude, setLatitude] = (0, import_react123.useState)(place.latitude.toString());
  const [longitude, setLongitude] = (0, import_react123.useState)(place.longitude.toString());
  const [description, setDescription] = (0, import_react123.useState)(place.description);
  const onUpdatePlace = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description
    };
    updatePlace({ variables: { slug: place.slug, input } });
  };
  (0, import_react123.useEffect)(() => {
    if (data == null ? void 0 : data.updatePlace) {
      if (onSuccess) {
        return onSuccess(data.updatePlace);
      }
      window.alert("Place updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdatePlace
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Place. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Gaillimh, The City of Tribes")), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Latitude",
    className: "mb-2",
    value: latitude,
    onChange: (event) => setLatitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Longitude",
    className: "mb-2",
    value: longitude,
    onChange: (event) => setLongitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "To view the current latitude and longitude coordinates, visit", " ", /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`,
    target: "_blank",
    rel: "noreferrer"
  }, latitude, ",", longitude, " on Google Maps (will open in new tab)"), `. To pick new coordinates, right-click on the exact location you'd like, and you'll see numbers like "53.2838294,-9.1888286". Click to copy them to your clipboard. The first one is latitude, and the second is longitude.`), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditPlaceForm_default = EditPlaceForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/edit.tsx
var PLACE_QUERY3 = import_client63.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var EditPlace = () => {
  const navigate = (0, import_react125.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client63.useQuery)(PLACE_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (place2) => {
    navigate(`/entities/places/${place2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Place with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { place } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Place: ", place.name), /* @__PURE__ */ React.createElement(EditPlaceForm_default, {
    place,
    onSuccess: onEditSuccess
  }))));
};
var edit_default5 = EditPlace;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/tags.tsx
var tags_exports5 = {};
__export(tags_exports5, {
  default: () => tags_default5
});
var import_client64 = require("@apollo/client");
var import_react126 = require("@remix-run/react");
var PlaceTags = () => {
  const navigate = (0, import_react126.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client64.useQuery)(PLACE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { place } = data ?? {};
  const { name, tags } = place ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Places", href: "/entities/places" },
      { label: name, href: `/entities/places/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: place,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: place,
    onSuccess: refetch
  })))));
};
var tags_default5 = PlaceTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var people_exports = {};
__export(people_exports, {
  default: () => people_default
});
var import_react128 = require("@remix-run/react");

// app/hooks/usePeople.ts
var import_react127 = require("react");
var import_client65 = require("@apollo/client");
var PEOPLE_QUERY = import_client65.gql`
	query People($input: PeopleInput!) {
		people(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var usePeople = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react127.useState)(0);
  const [people, setPeople] = (0, import_react127.useState)();
  (0, import_react127.useEffect)(() => {
    setPeople(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getPeople, peopleQuery] = (0, import_client65.useLazyQuery)(PEOPLE_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = peopleQuery;
  (0, import_react127.useEffect)(() => {
    if (data == null ? void 0 : data.people) {
      setPeople(data.people);
    }
  }, [data]);
  (0, import_react127.useEffect)(() => {
    getPeople({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getPeople, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react127.useCallback)(async () => {
    const numToSkip = (people == null ? void 0 : people.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, people, sortBy]);
  return [people, peopleQuery, fetchNextPage];
};
var usePeople_default = usePeople;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var People = () => {
  const [people, { loading, error }, fetchNextPage] = usePeople_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - People`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "People"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching People"), !loading && (people == null ? void 0 : people.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No People found"), (people == null ? void 0 : people.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, people.map((person, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react128.Link, {
    to: Entity_default.makeHrefForView(person)
  }, person.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (people == null ? void 0 : people.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var people_default = People;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var places_exports = {};
__export(places_exports, {
  default: () => places_default
});
var import_react130 = require("@remix-run/react");

// app/hooks/usePlaces.ts
var import_react129 = require("react");
var import_client66 = require("@apollo/client");
var PLACES_QUERY = import_client66.gql`
	query Places($input: PlacesInput!) {
		places(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var usePlaces = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react129.useState)(0);
  const [places, setPlaces] = (0, import_react129.useState)();
  (0, import_react129.useEffect)(() => {
    setPlaces(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getPlaces, placesQuery] = (0, import_client66.useLazyQuery)(PLACES_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = placesQuery;
  (0, import_react129.useEffect)(() => {
    if (data == null ? void 0 : data.places) {
      setPlaces(data.places);
    }
  }, [data]);
  (0, import_react129.useEffect)(() => {
    getPlaces({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getPlaces, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react129.useCallback)(async () => {
    const numToSkip = (places == null ? void 0 : places.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, places, sortBy]);
  return [places, placesQuery, fetchNextPage];
};
var usePlaces_default = usePlaces;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var Places = () => {
  const [places, { loading, error }, fetchNextPage] = usePlaces_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Places`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Places"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Places"), !loading && (places == null ? void 0 : places.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Places found"), (places == null ? void 0 : places.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, places.map((place, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: Entity_default.makeHrefForView(place)
  }, place.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (places == null ? void 0 : places.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var places_default = Places;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug].tsx
var slug_exports6 = {};
__export(slug_exports6, {
  TUNE_QUERY: () => TUNE_QUERY,
  default: () => slug_default6
});
var import_react131 = require("@remix-run/react");
var import_client67 = require("@apollo/client");
var TUNE_QUERY = import_client67.gql`
	query Tune($slug: String!) {
		tune(slug: $slug) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;
var ViewTuneBySlug = () => {
  const navigate = (0, import_react131.useNavigate)();
  const { slug } = navigate.query;
  const { data: tuneData, error: tuneError } = (0, import_client67.useQuery)(TUNE_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { tune } = tuneData ?? {};
  let statusMessage;
  if (!tuneData && !tuneError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!tuneData && tuneError) {
    statusMessage = `Error fetching Tune with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${tune.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: tune
  }));
};
var slug_default6 = ViewTuneBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug]/about.tsx
var about_exports6 = {};
__export(about_exports6, {
  default: () => about_default6
});
var import_client69 = require("@apollo/client");
var import_react133 = require("@remix-run/react");
var import_react134 = require("@remix-run/react");

// app/routes/entities/tunes/[slug].tsx
var import_react132 = require("@remix-run/react");
var import_client68 = require("@apollo/client");
var TUNE_QUERY2 = import_client68.gql`
	query Tune($slug: String!) {
		tune(slug: $slug) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug]/about.tsx
var TuneAbout = () => {
  const navigate = (0, import_react134.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client69.useQuery)(TUNE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, aliases, theSessionTuneId, type, meter, mode, abc } = (data == null ? void 0 : data.tune) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Tunes", href: "/entities/tunes" },
      { label: name, href: `/entities/tunes/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), theSessionTuneId && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "italic text-gray-500"
  }, "We source all of our Tune data from a wonderful community project called The Session."), /* @__PURE__ */ React.createElement("a", {
    href: `https://thesession.org/tunes/${theSessionTuneId}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View or Edit This Tune on The Session", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), type && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Type:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, type)), meter && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Meter:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, meter)), mode && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Mode:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, mode)), abc && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "ABC:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, abc)), /* @__PURE__ */ React.createElement(import_react133.Link, {
    to: `/entities/tunes/${slug}/edit`
  }, "Edit")));
};
var about_default6 = TuneAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug]/tags.tsx
var tags_exports6 = {};
__export(tags_exports6, {
  default: () => tags_default6
});
var import_client70 = require("@apollo/client");
var import_react135 = require("@remix-run/react");
var TuneTags = () => {
  const navigate = (0, import_react135.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client70.useQuery)(TUNE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { tune } = data ?? {};
  const { name, tags } = tune ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Tunes", href: "/entities/tunes" },
      { label: name, href: `/entities/tunes/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: tune,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: tune,
    onSuccess: refetch
  })))));
};
var tags_default6 = TuneTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/index.tsx
var tunes_exports = {};
__export(tunes_exports, {
  default: () => tunes_default
});
var import_react137 = require("@remix-run/react");

// app/hooks/useTunes.ts
var import_react136 = require("react");
var import_client71 = require("@apollo/client");
var TUNES_QUERY = import_client71.gql`
	query Tunes($input: TunesInput!) {
		tunes(input: $input) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;
var useTunes = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react136.useState)(0);
  const [tunes, setTunes] = (0, import_react136.useState)();
  (0, import_react136.useEffect)(() => {
    setTunes(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getTunes, tunesQuery] = (0, import_client71.useLazyQuery)(TUNES_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = tunesQuery;
  (0, import_react136.useEffect)(() => {
    if (data == null ? void 0 : data.tunes) {
      setTunes(data.tunes);
    }
  }, [data]);
  (0, import_react136.useEffect)(() => {
    getTunes({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getTunes, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react136.useCallback)(async () => {
    const numToSkip = (tunes == null ? void 0 : tunes.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, tunes, sortBy]);
  return [tunes, tunesQuery, fetchNextPage];
};
var useTunes_default = useTunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/index.tsx
var Tunes = () => {
  const [tunes, { loading, error }, fetchNextPage] = useTunes_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Tunes`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Tunes"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Tunes"), !loading && (tunes == null ? void 0 : tunes.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Tunes found"), (tunes == null ? void 0 : tunes.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, tunes.map((tune, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react137.Link, {
    to: Entity_default.makeHrefForView(tune)
  }, tune.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (tunes == null ? void 0 : tunes.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var tunes_default = Tunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/new.tsx
var new_exports5 = {};
__export(new_exports5, {
  default: () => new_default5
});
var import_react138 = require("@remix-run/react");
var NewPerson = () => {
  const navigate = (0, import_react138.useNavigate)();
  const onCreateSuccess = (person) => {
    navigate(`/entities/people/${person.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Person"), /* @__PURE__ */ React.createElement(CreatePersonForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default5 = NewPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/new.tsx
var new_exports6 = {};
__export(new_exports6, {
  default: () => new_default6
});
var import_react139 = require("@remix-run/react");
var NewPlace = () => {
  const navigate = (0, import_react139.useNavigate)();
  const onCreateSuccess = (place) => {
    navigate(`/entities/places/${place.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Place"), /* @__PURE__ */ React.createElement(CreatePlaceForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default6 = NewPlace;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var verify_exports = {};
__export(verify_exports, {
  default: () => verify_default
});
var import_react141 = require("react");
var import_client73 = require("@apollo/client");
var import_react142 = require("@remix-run/react");

// app/hooks/useVerificationRequestsForCurrentUser.ts
var import_react140 = require("react");
var import_client72 = require("@apollo/client");
var VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY = import_client72.gql`
	query VerificationRequestsForCurrentUser {
		verificationRequestsForCurrentUser {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var useVerificationRequestsForCurrentUser = () => {
  var _a;
  const [makeQuery, query] = (0, import_client72.useLazyQuery)(VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY);
  (0, import_react140.useEffect)(() => {
    makeQuery();
  }, [makeQuery]);
  const verificationRequests = (_a = query == null ? void 0 : query.data) == null ? void 0 : _a.verificationRequestsForCurrentUser;
  return [verificationRequests, query];
};
var useVerificationRequestsForCurrentUser_default = useVerificationRequestsForCurrentUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var CREATE_PRESIGNED_UPLOAD_URL_MUTATION = import_client73.gql`
	mutation CreatePresignedUploadUrl($filename: String!) {
		createPresignedUploadUrlForVerificationImage(filename: $filename) {
			imageS3Key
			presignedUploadUrl
		}
	}
`;
var CREATE_VERIFICATION_REQUEST_MUTATION = import_client73.gql`
	mutation CreateVerificationRequest($input: CreateVerificationRequestInput!) {
		createVerificationRequest(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var AccountVerify = () => {
  const navigate = (0, import_react142.useNavigate)();
  const [
    _,
    {
      refetch: refetchVerificationRequestsForCurrentUser,
      loading: refetchVerificationRequestsIsLoading
    }
  ] = useVerificationRequestsForCurrentUser_default();
  const [personEntity, setPersonEntity] = (0, import_react141.useState)();
  const [imageFile, setImageFile] = (0, import_react141.useState)();
  const [imageFileObjectUrl, setImageFileObjectUrl] = (0, import_react141.useState)();
  const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] = (0, import_react141.useState)(false);
  const [formIsSubmitting, setFormIsSubmitting] = (0, import_react141.useState)(false);
  const [createPresignedUploadUrl] = (0, import_client73.useMutation)(CREATE_PRESIGNED_UPLOAD_URL_MUTATION, { errorPolicy: "all" });
  const [createVerificationRequest] = (0, import_client73.useMutation)(CREATE_VERIFICATION_REQUEST_MUTATION, { errorPolicy: "all" });
  const onSelectEntity = (entity) => {
    if (isPerson(entity)) {
      setPersonEntity(entity);
    }
  };
  const onImageFileChanged = (event) => {
    var _a;
    if (!((_a = event.target.files) == null ? void 0 : _a.length)) {
      return;
    }
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImageFileObjectUrl(objectUrl);
  };
  (0, import_react141.useEffect)(() => {
    return () => {
      if (imageFileObjectUrl) {
        URL.revokeObjectURL(imageFileObjectUrl);
      }
    };
  }, [imageFileObjectUrl]);
  const requiredFieldsAreSet = personEntity && imageFile && copyrightPermissionIsGranted;
  const onSubmitClicked = async () => {
    if (!requiredFieldsAreSet) {
      return window.alert("Please fill out all the fields");
    }
    setFormIsSubmitting(true);
    try {
      const response = await createPresignedUploadUrl({
        variables: { filename: imageFile.name }
      });
      const { imageS3Key, presignedUploadUrl } = response.data.createPresignedUploadUrlForVerificationImage;
      await fetch(presignedUploadUrl, { method: "PUT", body: imageFile });
      const { data } = await createVerificationRequest({
        variables: {
          input: {
            personId: personEntity.id,
            imageS3Key,
            copyrightPermissionStatus: "FullNonCommercialGranted" /* FullNonCommercialGranted */
          }
        }
      });
      if (!data.createVerificationRequest) {
        throw new Error();
      }
      await refetchVerificationRequestsForCurrentUser();
      setFormIsSubmitting(false);
      navigate("/account");
    } catch {
      setFormIsSubmitting(false);
      window.alert("Error submitting verification request. Please reload and try again.");
    }
  };
  const shouldPromptToChoosePerson = !personEntity && imageFile && copyrightPermissionIsGranted;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Verify Your Account" }
    ],
    className: "mb-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "mb-8 text-gray-500"
  }, `This enables you to link your user account with a Person tag. For example, let's say you are Michael Coleman; you can link your user account to the "Michael Coleman" tag on the site. You'll get a verified badge next to your username, and you'll be able to immediately take down any content that you're tagged in, if you want to. Verification is free and will be done by ITMA staff.`), !personEntity ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Search for your name and click on the Person if found. If it doesn't exist yet, go ahead and create a new one."), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col max-w-xs"
  }, /* @__PURE__ */ React.createElement(SearchEntities_default, {
    className: "mb-8",
    entityTypes: ["Person" /* Person */],
    take: 15,
    onSelect: onSelectEntity,
    onNewEntityCreated: onSelectEntity
  }))) : /* @__PURE__ */ React.createElement("div", {
    className: "mb-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 font-bold"
  }, "You have selected:"), personEntity.firstName, " ", personEntity.lastName, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text ml-2",
    onClick: () => setPersonEntity(void 0)
  }, "Clear")), /* @__PURE__ */ React.createElement("div", {
    className: "mb-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Please attach a photo proving your identity (utility bill, ID, etc; will be deleted after verification):"), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    accept: ".png,.jpeg,.jpg",
    onChange: onImageFileChanged,
    className: "block"
  }), imageFileObjectUrl && /* @__PURE__ */ React.createElement("img", {
    src: imageFileObjectUrl,
    className: "h-48 mt-4"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Do you give the Irish Traditional Music Archive (ITMA) permission to make recordings of you publicly available for non-commercial use, given that you can take them down at any time?"), /* @__PURE__ */ React.createElement("div", {
    className: "mb-8 flex flex-row items-center justify-start"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "copyright-permission",
    checked: copyrightPermissionIsGranted,
    onChange: (event) => setCopyrightPermissionIsGranted(event.target.checked)
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "copyright-permission",
    className: "ml-2"
  }, "Yes, I give permission")), refetchVerificationRequestsIsLoading || formIsSubmitting ? /* @__PURE__ */ React.createElement(LoadingCircle_default, null) : /* @__PURE__ */ React.createElement("button", {
    className: "btn",
    onClick: onSubmitClicked,
    disabled: !requiredFieldsAreSet
  }, "Submit"), shouldPromptToChoosePerson && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-6"
  }, "Please select a Person above")));
};
var verify_default = AccountVerify;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/index.tsx
var account_exports = {};
__export(account_exports, {
  default: () => account_default
});
var import_react143 = require("react");
var import_react144 = require("@remix-run/react");
var AccountHome = () => {
  const [verificationRequests = [], { loading, data, error }] = useVerificationRequestsForCurrentUser_default();
  const verifyYourselfMarkup = (0, import_react143.useMemo)(() => {
    if (!loading && error) {
      return /* @__PURE__ */ React.createElement("span", {
        className: "text-red-600"
      }, "Error fetching verification status. Please reload.");
    } else if (loading) {
      return /* @__PURE__ */ React.createElement("span", {
        className: "text-gray-500"
      }, "Loading verification status...");
    }
    const approvedRequest = verificationRequests.find((request) => isApprovedVerificationRequest(request));
    if (approvedRequest) {
      return /* @__PURE__ */ React.createElement("span", {
        className: "flex flex-row items-center"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-base"
      }, "verified"), /* @__PURE__ */ React.createElement("span", {
        className: "ml-2 mr-1"
      }, "You are verified as"), /* @__PURE__ */ React.createElement(import_react144.Link, {
        to: Entity_default.makeHrefForView(approvedRequest.person)
      }, approvedRequest.person.name));
    }
    const pendingRequest = verificationRequests.find((request) => isPendingVerificationRequest(request));
    if (pendingRequest) {
      return /* @__PURE__ */ React.createElement("span", null, "Your request to verify as ", pendingRequest.person.name, " is pending");
    }
    return /* @__PURE__ */ React.createElement(import_react144.Link, {
      to: "/account/verify"
    }, "Verify Your Account");
  }, [data, loading, error, verificationRequests]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Account"), verifyYourselfMarkup, /* @__PURE__ */ React.createElement(import_react144.Link, {
    to: "/account/submissions"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mt-2"
  }, "Submit Audio, Video, Images, or Documents to ITMA")), /* @__PURE__ */ React.createElement(import_react144.Link, {
    to: "/logout"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mt-2"
  }, "Log Out"))));
};
var account_default = AccountHome;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/index.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => admin_default
});
var import_react145 = require("@remix-run/react");
var AdminHome = () => {
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Admin"), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/admin/verification-requests"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Manage Verification Requests")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/admin/takedown-requests"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Manage Takedown Requests")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/admin/submissions"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-6"
  }, "Manage Submissions")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/audio-items/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Audio Item")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/people/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Person")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/instruments/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Instrument")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/places/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Place")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/collections/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Collection")))));
};
var admin_default = AdminHome;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/saved-items.tsx
var saved_items_exports = {};
__export(saved_items_exports, {
  default: () => saved_items_default
});
var import_react146 = require("@remix-run/react");
var SavedItems = () => {
  const [savedItems, { loading, error }] = useSavedItemsForUser_default();
  const { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    defaultViewAs: "List" /* List */
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Saved Items"), (savedItems == null ? void 0 : savedItems.length) > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, "Could not fetch saved items"), loading && !savedItems && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(LoadingBlock_default, null)), !loading && (savedItems == null ? void 0 : savedItems.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Nothing saved yet - try browsing some", " ", /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/"
  }, "Audio Items"), "!"), savedItems == null ? void 0 : savedItems.map(({ audioItem }, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })))));
};
var saved_items_default = SavedItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/auto-login.tsx
var auto_login_exports = {};
__export(auto_login_exports, {
  default: () => auto_login_default
});
var import_react147 = require("react");
var import_react148 = require("@remix-run/react");
var import_react149 = require("@remix-run/react");
var import_client74 = require("@apollo/client");
var AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN = import_client74.gql`
	mutation AuthenticateWithAutoLoginToken(
		$input: AuthenticateWithAutoLoginTokenInput!
	) {
		authenticateWithAutoLoginToken(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var AutoLogin = () => {
  var _a;
  const navigate = (0, import_react148.useNavigate)();
  const { tokenUnhashed, userEmail, redirectTo } = navigate.query;
  const [
    currentUser,
    { loading: currentUserLoading, refetch: refetchCurrentUser }
  ] = useCurrentUser_default();
  const [
    authenticateWithAutoLoginToken,
    { loading: authenticateLoading, data, error }
  ] = (0, import_client74.useMutation)(AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN);
  (0, import_react147.useEffect)(() => {
    if (typeof tokenUnhashed !== "string" || typeof userEmail !== "string") {
      return;
    }
    const authenticate = async () => {
      try {
        await authenticateWithAutoLoginToken({
          variables: { input: { tokenUnhashed, userEmail } }
        });
      } catch {
      }
    };
    authenticate();
  }, [tokenUnhashed, authenticateWithAutoLoginToken]);
  (0, import_react147.useEffect)(() => {
    if (data == null ? void 0 : data.authenticateWithAutoLoginToken) {
      refetchCurrentUser();
    }
  }, [data, refetchCurrentUser]);
  (0, import_react147.useEffect)(() => {
    if (currentUser) {
      navigate(typeof redirectTo === "string" ? redirectTo : "/");
    }
  }, [currentUser]);
  if (currentUser) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, /* @__PURE__ */ React.createElement(LoadingCircle_default, {
      className: "mr-4"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "text-gray-500"
    }, "Loading...")));
  }
  if (error) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600 mb-4"
    }, "Error: ", (_a = error == null ? void 0 : error.graphQLErrors) == null ? void 0 : _a.map(({ message }) => message)), /* @__PURE__ */ React.createElement(import_react149.Link, {
      href: {
        pathname: "/login",
        query: redirectTo ? { redirectTo } : void 0
      }
    }, "Send a new login link"));
  }
  if (authenticateLoading || currentUserLoading) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, /* @__PURE__ */ React.createElement(LoadingCircle_default, {
      className: "mr-4"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "text-gray-500"
    }, "Loading...")));
  }
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-3"
  }, "Check your email"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-2"
  }, "mail_outline"), "We've emailed a magic link to you. Click it to log in."), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Didn't get it? Check your spam folder or", " ", /* @__PURE__ */ React.createElement(import_react149.Link, {
    href: {
      pathname: "/login",
      query: redirectTo ? { redirectTo } : void 0
    }
  }, "send a new one")));
};
var auto_login_default = AutoLogin;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/[id].tsx
var id_exports2 = {};
__export(id_exports2, {
  default: () => id_default2
});
var import_react151 = require("react");
var import_react152 = require("@remix-run/react");
var import_react153 = require("@remix-run/react");
var import_client76 = require("@apollo/client");

// app/hooks/useAudioItemsCreatedByUser.tsx
var import_react150 = require("react");
var import_client75 = require("@apollo/client");
var AUDIO_ITEMS_CREATED_BY_USER_QUERY = import_client75.gql`
	query AudioItemsCreatedByUser($input: AudioItemsCreatedByUserInput!) {
		audioItemsCreatedByUser(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemsCreatedByUser = (user) => {
  var _a;
  const [makeQuery, query] = (0, import_client75.useLazyQuery)(AUDIO_ITEMS_CREATED_BY_USER_QUERY, {
    variables: {
      input: {
        userId: user == null ? void 0 : user.id
      }
    }
  });
  (0, import_react150.useEffect)(() => {
    if (user) {
      makeQuery();
    }
  }, [makeQuery, user]);
  const audioItems = (_a = query.data) == null ? void 0 : _a.audioItemsCreatedByUser;
  return [audioItems, query];
};
var useAudioItemsCreatedByUser_default = useAudioItemsCreatedByUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/[id].tsx
var USER_QUERY = import_client76.gql`
	query User($id: String!) {
		user(id: $id) {
			...User
		}
	}
	${UserFragments.user}
`;
var ViewUserById = () => {
  const navigate = (0, import_react152.useNavigate)();
  const { id } = navigate.query;
  const { data: userData, error: userError } = (0, import_client76.useQuery)(USER_QUERY, {
    variables: { id },
    skip: !id
  });
  const { username, createdAt, verifiedPerson } = (userData == null ? void 0 : userData.user) ?? {};
  const [
    audioItems = [],
    { loading: audioItemsLoading, error: audioItemsError }
  ] = useAudioItemsCreatedByUser_default(userData == null ? void 0 : userData.user);
  const { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    defaultViewAs: "Cards" /* Cards */
  });
  const aboutMarkup = (0, import_react151.useMemo)(() => /* @__PURE__ */ React.createElement(React.Fragment, null, verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base mr-2"
  }, "verified"), "Verified As Person:"), /* @__PURE__ */ React.createElement(import_react153.Link, {
    to: Entity_default.makeHrefForView(verifiedPerson)
  }, verifiedPerson.name)), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Account Created:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, DateTime_default.formatDateYear(createdAt)))), [verifiedPerson, createdAt]);
  let statusMessage;
  if (!userData && !userError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!userData && userError) {
    statusMessage = `Error fetching User with id ${id}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const noAudioItemsFound = !audioItemsLoading && !audioItemsError && audioItems.length === 0;
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${username}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col-reverse md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    className: "mb-6",
    items: [{ label: "Users" }, { label: username }]
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-col mb-8 md:hidden"
  }, aboutMarkup), audioItemsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), audioItemsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Audio Items"), noAudioItemsFound && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, username, " hasn't added any Audio Items yet"), audioItems.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: "mb-8"
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "hidden md:flex flex-col items-start pb-8 md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "About"), aboutMarkup)));
};
var id_default2 = ViewUserById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  default: () => logout_default
});
var import_react154 = require("react");
var import_react155 = require("@remix-run/react");
var import_client77 = require("@apollo/client");
var LOG_OUT_MUTATION = import_client77.gql`
	mutation LogOut {
		logOut
	}
`;
var LogOut = () => {
  const navigate = (0, import_react155.useNavigate)();
  const [logOut, { data: logOutData }] = (0, import_client77.useMutation)(LOG_OUT_MUTATION, {
    errorPolicy: "all"
  });
  (0, import_react154.useEffect)(() => {
    logOut();
  }, [logOut]);
  (0, import_react154.useEffect)(() => {
    if (logOutData == null ? void 0 : logOutData.logOut) {
      window.location.href = window.location.origin;
    }
  }, [logOutData]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Logging out..."));
};
var logout_default = LogOut;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  default: () => signup_default
});
var import_react156 = require("react");
var import_react157 = require("@remix-run/react");
var import_react158 = require("@remix-run/react");
var import_client78 = require("@apollo/client");
var SIGN_UP_MUTATION = import_client78.gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var SignUp = () => {
  const navigate = (0, import_react157.useNavigate)();
  const { redirectTo } = navigate.query;
  const [currentUser] = useCurrentUser_default();
  const [email, setEmail] = (0, import_react156.useState)("");
  const [username, setUsername] = (0, import_react156.useState)("");
  const [validationError, setValidationError] = (0, import_react156.useState)("");
  const [signUp, { loading, data, error }] = (0, import_client78.useMutation)(SIGN_UP_MUTATION, {
    errorPolicy: "all"
  });
  const onSignUp = (event) => {
    event.preventDefault();
    setValidationError("");
    const cleanedEmail = email.trim().toLowerCase();
    signUp({
      variables: {
        input: { email: cleanedEmail, username, redirectTo }
      }
    });
  };
  (0, import_react156.useEffect)(() => {
    if (data == null ? void 0 : data.signUp) {
      navigate("/auto-login");
    }
  }, [data, navigate]);
  if (currentUser) {
    navigate(typeof redirectTo === "string" ? redirectTo : "/");
  }
  const logInLinkQueryParams = redirectTo ? { redirectTo } : void 0;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, redirectTo ? "Create an account to continue" : "Create your account"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onSignUp
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Your email",
    autoFocus: true,
    className: "mb-2",
    value: email,
    onChange: (event) => setEmail(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Your full name",
    className: "mb-4",
    value: username,
    onChange: (event) => setUsername(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Sign Up"
  })), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, validationError), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error.message), /* @__PURE__ */ React.createElement("div", null, "Already have an account?", " ", /* @__PURE__ */ React.createElement(import_react158.Link, {
    to: { pathname: "/login", query: logInLinkQueryParams }
  }, "Log in"))));
};
var signup_default = SignUp;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Home,
  loader: () => loader
});
var import_react159 = require("react");
var import_client79 = require("@apollo/client");
var import_react160 = require("@remix-run/react");

// app/services/Comment.ts
var import_compareDesc4 = __toESM(require("date-fns/compareDesc"));
var sortByCreatedAtDesc2 = (comments) => {
  let sortedComments = [...comments];
  sortedComments.sort((a, b) => {
    return (0, import_compareDesc4.default)(new Date(a.createdAt), new Date(b.createdAt));
  });
  return sortedComments;
};
var CommentService = {
  sortByCreatedAtDesc: sortByCreatedAtDesc2
};
var Comment_default = CommentService;

// app/services/LocalStorage.ts
var localStorageIsAvailable = typeof window !== "undefined" && (window == null ? void 0 : window.localStorage);
var setItem = (key, value) => {
  if (localStorageIsAvailable) {
    window.localStorage.setItem(key, value);
  }
};
var getItem = (key) => {
  if (localStorageIsAvailable) {
    return window.localStorage.getItem(key);
  }
  return void 0;
};
var LocalStorageService = {
  setItem,
  getItem
};
var LocalStorage_default = LocalStorageService;

// app/components/ProjectIntro.tsx
var ProjectIntro = ({ className, onClose }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col flex-grow bg-gray-200 rounded p-4 pl-16 lg:pl-20 relative ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/logo-square.png",
    className: "absolute top-5 -left-1 lg:-left-8 w-12 lg:w-20 -rotate-12"
  }), /* @__PURE__ */ React.createElement("strong", null, "Welcome!"), /* @__PURE__ */ React.createElement("br", null), "Trad Archive is an open source experiment by the Irish Traditional Music Archive and Dan Gurney.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "You can...", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("ul", {
    className: "list-disc list-inside"
  }, /* @__PURE__ */ React.createElement("li", null, "Listen to previously unreleased archival recordings"), /* @__PURE__ */ React.createElement("li", null, "Help by tagging each recording with People, Places, Tunes, Instruments, and Collections"), /* @__PURE__ */ React.createElement("li", null, "Save favorites to listen later")), /* @__PURE__ */ React.createElement("button", {
    className: "absolute top-2 right-2 btn-icon",
    onClick: onClose
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close")));
};
var ProjectIntro_default = ProjectIntro;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var NUM_AUDIO_ITEMS_TO_FETCH = 10;
var NUM_COMMENTS_TO_FETCH = 6;
var NUM_COLLECTIONS_TO_FETCH = 5;
var STATS_QUERY = import_client79.gql`
	query Stats {
		stats {
			numAudioItemsAllTime
			numTagsAllTime
			numCommentsAllTime
		}
	}
`;
var serverSideApolloClient;
async function loader() {
  var _a, _b, _c, _d, _e;
  let recentlyTaggedAudioItems;
  let recentlyAddedAudioItems;
  let stats;
  let comments;
  let collections;
  try {
    if (!serverSideApolloClient) {
      serverSideApolloClient = new import_client79.ApolloClient({
        uri: API_URL,
        credentials: "include",
        cache: new import_client79.InMemoryCache(),
        defaultOptions: {
          query: {
            fetchPolicy: "no-cache"
          }
        }
      });
    }
    const [recentlyTaggedAudioItemsQuery, recentlyAddedAudioItemsQuery] = await Promise.all([
      serverSideApolloClient.query({
        query: AUDIO_ITEMS_QUERY,
        variables: {
          input: {
            sortBy: "RecentlyTagged" /* RecentlyTagged */,
            take: NUM_AUDIO_ITEMS_TO_FETCH,
            skip: 0,
            status: "Published" /* Published */
          }
        }
      }),
      serverSideApolloClient.query({
        query: AUDIO_ITEMS_QUERY,
        variables: {
          input: {
            sortBy: "RecentlyAdded" /* RecentlyAdded */,
            take: NUM_AUDIO_ITEMS_TO_FETCH,
            skip: 0,
            status: "Published" /* Published */
          }
        }
      })
    ]);
    const [statsQuery, commentsQuery, collectionsQuery] = await Promise.all([
      serverSideApolloClient.query({
        query: STATS_QUERY
      }),
      serverSideApolloClient.query({
        query: COMMENTS_QUERY,
        variables: {
          input: {
            take: NUM_COMMENTS_TO_FETCH
          }
        }
      }),
      serverSideApolloClient.query({
        query: COLLECTIONS_QUERY,
        variables: {
          input: {
            take: NUM_COLLECTIONS_TO_FETCH,
            sortBy: "RecentlyAdded" /* RecentlyAdded */
          }
        }
      })
    ]);
    recentlyTaggedAudioItems = (_a = recentlyTaggedAudioItemsQuery == null ? void 0 : recentlyTaggedAudioItemsQuery.data) == null ? void 0 : _a.audioItems;
    recentlyAddedAudioItems = (_b = recentlyAddedAudioItemsQuery == null ? void 0 : recentlyAddedAudioItemsQuery.data) == null ? void 0 : _b.audioItems;
    stats = (_c = statsQuery == null ? void 0 : statsQuery.data) == null ? void 0 : _c.stats;
    comments = (_d = commentsQuery == null ? void 0 : commentsQuery.data) == null ? void 0 : _d.comments;
    collections = (_e = collectionsQuery == null ? void 0 : collectionsQuery.data) == null ? void 0 : _e.collections;
  } catch {
  }
  return {
    props: {
      prefetchedRecentlyTaggedAudioItems: recentlyTaggedAudioItems ?? null,
      prefetchedRecentlyAddedAudioItems: recentlyAddedAudioItems ?? null,
      prefetchedStats: stats ?? null,
      prefetchedComments: comments ?? null,
      prefetchedCollections: collections ?? null
    },
    revalidate: 1
  };
}
function Home() {
  const {
    prefetchedRecentlyTaggedAudioItems,
    prefetchedRecentlyAddedAudioItems,
    prefetchedStats,
    prefetchedComments,
    prefetchedCollections
  } = (0, import_react160.useLoaderData)();
  (0, import_react159.useEffect)(() => {
    if (prefetchedRecentlyTaggedAudioItems) {
      const cachedRecentlyTaggedAudioItems = apolloClient.readQuery({
        query: AUDIO_ITEMS_QUERY,
        variables: {
          input: {
            sortBy: "RecentlyTagged" /* RecentlyTagged */,
            take: NUM_AUDIO_ITEMS_TO_FETCH,
            skip: 0,
            status: "Published" /* Published */
          }
        }
      });
      if (!cachedRecentlyTaggedAudioItems) {
        apolloClient.writeQuery({
          query: AUDIO_ITEMS_QUERY,
          data: { audioItems: prefetchedRecentlyTaggedAudioItems },
          variables: {
            input: {
              sortBy: "RecentlyTagged" /* RecentlyTagged */,
              take: NUM_AUDIO_ITEMS_TO_FETCH,
              skip: 0,
              status: "Published" /* Published */
            }
          }
        });
      }
    }
    if (prefetchedRecentlyAddedAudioItems) {
      const cachedRecentlyAddedAudioItems = apolloClient.readQuery({
        query: AUDIO_ITEMS_QUERY,
        variables: {
          input: {
            sortBy: "RecentlyAdded" /* RecentlyAdded */,
            take: NUM_AUDIO_ITEMS_TO_FETCH,
            skip: 0,
            status: "Published" /* Published */
          }
        }
      });
      if (!cachedRecentlyAddedAudioItems) {
        apolloClient.writeQuery({
          query: AUDIO_ITEMS_QUERY,
          data: { audioItems: prefetchedRecentlyAddedAudioItems },
          variables: {
            input: {
              sortBy: "RecentlyAdded" /* RecentlyAdded */,
              take: NUM_AUDIO_ITEMS_TO_FETCH,
              skip: 0,
              status: "Published" /* Published */
            }
          }
        });
      }
    }
    if (prefetchedStats) {
      const cachedStats = apolloClient.readQuery({
        query: STATS_QUERY
      });
      if (!cachedStats) {
        apolloClient.writeQuery({
          query: STATS_QUERY,
          data: { stats: prefetchedStats }
        });
      }
    }
    if (prefetchedComments) {
      const cachedComments = apolloClient.readQuery({
        query: COMMENTS_QUERY,
        variables: {
          input: {
            take: NUM_COMMENTS_TO_FETCH
          }
        }
      });
      if (!cachedComments) {
        apolloClient.writeQuery({
          query: COMMENTS_QUERY,
          data: { comments: prefetchedComments },
          variables: {
            input: {
              take: NUM_COMMENTS_TO_FETCH
            }
          }
        });
      }
    }
    if (prefetchedCollections) {
      const cachedCollections = apolloClient.readQuery({
        query: COLLECTIONS_QUERY,
        variables: {
          input: {
            take: NUM_COLLECTIONS_TO_FETCH,
            sortBy: "RecentlyAdded" /* RecentlyAdded */
          }
        }
      });
      if (!cachedCollections) {
        apolloClient.writeQuery({
          query: COLLECTIONS_QUERY,
          data: { collections: prefetchedCollections },
          variables: {
            input: {
              take: NUM_COLLECTIONS_TO_FETCH,
              sortBy: "RecentlyAdded" /* RecentlyAdded */
            }
          }
        });
      }
    }
  }, [
    apolloClient,
    prefetchedRecentlyTaggedAudioItems,
    prefetchedRecentlyAddedAudioItems,
    prefetchedStats,
    prefetchedComments,
    prefetchedCollections
  ]);
  const { Filters: Filters2, filtersProps, sortBy, viewAs } = useFilters_default({
    defaultSortBy: "RecentlyTagged" /* RecentlyTagged */,
    defaultViewAs: "Cards" /* Cards */,
    enableQueryParams: false
  });
  const [
    fetchedAudioItems,
    { loading: audioItemsLoading, error: audioItemsError },
    fetchNextPage
  ] = useAudioItems_default({
    sortBy,
    resultsPerPage: NUM_AUDIO_ITEMS_TO_FETCH,
    queryOptions: {
      fetchPolicy: "cache-only"
    }
  });
  const {
    comments: fetchedComments,
    commentsQuery: { loading: commentsLoading }
  } = useComments_default({
    resultsPerPage: NUM_COMMENTS_TO_FETCH,
    queryOptions: {
      fetchPolicy: "cache-only"
    }
  });
  const [fetchedCollections, { loading: collectionsLoading }] = useCollections_default({
    resultsPerPage: NUM_COLLECTIONS_TO_FETCH,
    sortBy: "RecentlyAdded" /* RecentlyAdded */,
    queryOptions: {
      fetchPolicy: "cache-only"
    }
  });
  const defaultAudioItems = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? prefetchedRecentlyTaggedAudioItems : prefetchedRecentlyAddedAudioItems;
  const audioItems = fetchedAudioItems ?? defaultAudioItems;
  const comments = (0, import_react159.useMemo)(() => {
    const data = fetchedComments ?? prefetchedComments ?? [];
    const sorted = Comment_default.sortByCreatedAtDesc(data);
    return sorted.slice(0, NUM_COMMENTS_TO_FETCH);
  }, [fetchedComments, prefetchedComments]);
  const collections = (0, import_react159.useMemo)(() => {
    const data = fetchedCollections ?? prefetchedCollections ?? [];
    return data.slice(0, NUM_COLLECTIONS_TO_FETCH);
  }, [fetchedCollections, prefetchedCollections]);
  const [shouldShowIntro, setShouldShowIntro] = (0, import_react159.useState)(false);
  (0, import_react159.useEffect)(() => {
    if (LocalStorage_default.getItem("SHOULD_SHOW_INTRO") !== "false") {
      setShouldShowIntro(true);
    }
  }, []);
  const onCloseIntro = (0, import_react159.useCallback)(() => {
    LocalStorage_default.setItem("SHOULD_SHOW_INTRO", "false");
    setShouldShowIntro(false);
  }, []);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: "Trad Archive - Home"
  }, shouldShowIntro && /* @__PURE__ */ React.createElement(ProjectIntro_default, {
    className: "mb-8 md:mt-4 md:mb-12",
    onClose: onCloseIntro
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Explore"), /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), !audioItems && audioItemsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, audioItemsError.message), !audioItemsLoading && (audioItems == null ? void 0 : audioItems.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Audio Items found"), audioItems == null ? void 0 : audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })), audioItemsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !audioItemsLoading && (audioItems == null ? void 0 : audioItems.length) > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-center"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More"))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "Browse"), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/people"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "People")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/instruments"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Instruments")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/places"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Places")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/tunes"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Tunes")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/collections"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Collections")), prefetchedStats && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Stats"), /* @__PURE__ */ React.createElement("span", {
    className: "mb-2 text-gray-500"
  }, prefetchedStats.numAudioItemsAllTime, " Audio Items"), /* @__PURE__ */ React.createElement("span", {
    className: "mb-2 text-gray-500"
  }, prefetchedStats.numTagsAllTime, " Tags"), /* @__PURE__ */ React.createElement("span", {
    className: "mb-2 text-gray-500"
  }, prefetchedStats.numCommentsAllTime, " Comments")), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Collections"), collectionsLoading && (collections == null ? void 0 : collections.length) === 0 && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !collectionsLoading && (collections == null ? void 0 : collections.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "None"), collections == null ? void 0 : collections.map((collection, index) => {
    const { name } = collection;
    if (!name) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-2 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement(import_react160.Link, {
      to: Entity_default.makeHrefForView(collection)
    }, collection.name));
  }), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Features + Fixes"), /* @__PURE__ */ React.createElement("a", {
    className: "mb-2",
    href: "https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc",
    target: "_blank",
    rel: "noreferrer"
  }, "View on GitHub ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Comments"), commentsLoading && (comments == null ? void 0 : comments.length) === 0 && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !commentsLoading && (comments == null ? void 0 : comments.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "None"), comments == null ? void 0 : comments.map((comment, index) => {
    const { createdByUser, parentAudioItem, text } = comment;
    if (!createdByUser) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: " mb-1"
    }, /* @__PURE__ */ React.createElement(import_react160.Link, {
      to: `/users/${createdByUser.id}`
    }, createdByUser.username), ` commented on `, /* @__PURE__ */ React.createElement(import_react160.Link, {
      to: Entity_default.makeHrefForView(parentAudioItem)
    }, parentAudioItem.name), ":"), /* @__PURE__ */ React.createElement("div", {
      className: "whitespace-pre-line text-sm"
    }, text));
  }))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => login_default
});
var import_react161 = require("react");
var import_react162 = require("@remix-run/react");
var import_react163 = require("@remix-run/react");
var import_client80 = require("@apollo/client");
var LOG_IN_MUTATION = import_client80.gql`
	mutation LogIn($input: LogInInput!) {
		logIn(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var Login = () => {
  const navigate = (0, import_react162.useNavigate)();
  const { redirectTo } = navigate.query;
  const [currentUser] = useCurrentUser_default();
  const [email, setEmail] = (0, import_react161.useState)("");
  const [logIn, { loading, data, error }] = (0, import_client80.useMutation)(LOG_IN_MUTATION, {
    errorPolicy: "all"
  });
  const onLogIn = (event) => {
    event.preventDefault();
    const cleanedEmail = email.trim().toLowerCase();
    logIn({
      variables: { input: { email: cleanedEmail, redirectTo } }
    });
  };
  (0, import_react161.useEffect)(() => {
    if (data == null ? void 0 : data.logIn) {
      navigate("/auto-login");
    }
  }, [data, navigate]);
  if (currentUser) {
    navigate(typeof redirectTo === "string" ? redirectTo : "/");
  }
  const signUpLinkQueryParams = redirectTo ? { redirectTo } : void 0;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Log in to ", redirectTo ? "continue" : "Trad Archive"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onLogIn
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Your email",
    autoFocus: true,
    className: "mb-4",
    value: email,
    onChange: (event) => setEmail(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Log In"
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error.message), /* @__PURE__ */ React.createElement("div", null, "Don't have an account yet?", " ", /* @__PURE__ */ React.createElement(import_react163.Link, {
    to: { pathname: "/signup", query: signUpLinkQueryParams }
  }, "Sign Up"))));
};
var login_default = Login;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "353de225", "entry": { "module": "/build/entry.client-SZRS2VCR.js", "imports": ["/build/_shared/chunk-VSDEZUPL.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-72VGXGGE.js", "imports": ["/build/_shared/chunk-UFGMI37N.js", "/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/index": { "id": "routes/account/index", "parentId": "root", "path": "account", "index": true, "caseSensitive": void 0, "module": "/build/routes/account/index-RDK2GOYG.js", "imports": ["/build/_shared/chunk-4LWD6Y5F.js", "/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/[id]/upload": { "id": "routes/account/submissions/[id]/upload", "parentId": "root", "path": "account/submissions/id/upload", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/submissions/[id]/upload-GYEN6JLQ.js", "imports": ["/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/index": { "id": "routes/account/submissions/index", "parentId": "root", "path": "account/submissions", "index": true, "caseSensitive": void 0, "module": "/build/routes/account/submissions/index-KXRELQIV.js", "imports": ["/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/new": { "id": "routes/account/submissions/new", "parentId": "root", "path": "account/submissions/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/submissions/new-QZIEVA47.js", "imports": ["/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/verify": { "id": "routes/account/verify", "parentId": "root", "path": "account/verify", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/verify-74FMRWIK.js", "imports": ["/build/_shared/chunk-4LWD6Y5F.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/index": { "id": "routes/admin/index", "parentId": "root", "path": "admin", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/index-N2OMCVYE.js", "imports": ["/build/_shared/chunk-MLS3TVUB.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/submissions/[id]": { "id": "routes/admin/submissions/[id]", "parentId": "root", "path": "admin/submissions/id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/submissions/[id]-A3GNMI6X.js", "imports": ["/build/_shared/chunk-MLS3TVUB.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/submissions/index": { "id": "routes/admin/submissions/index", "parentId": "root", "path": "admin/submissions", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/submissions/index-PGNMKP6W.js", "imports": ["/build/_shared/chunk-MLS3TVUB.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/takedown-requests": { "id": "routes/admin/takedown-requests", "parentId": "root", "path": "admin/takedown-requests", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/takedown-requests-F56DAUNH.js", "imports": ["/build/_shared/chunk-MLS3TVUB.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/verification-requests": { "id": "routes/admin/verification-requests", "parentId": "root", "path": "admin/verification-requests", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/verification-requests-2OMKDU2Z.js", "imports": ["/build/_shared/chunk-MLS3TVUB.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/auto-login": { "id": "routes/auto-login", "parentId": "root", "path": "auto-login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/auto-login-LT2IT2B4.js", "imports": ["/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]": { "id": "routes/entities/audio-items/[slug]", "parentId": "root", "path": "entities/audio-items/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]-NAQOM6M4.js", "imports": ["/build/_shared/chunk-U5QGXRRM.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]/about": { "id": "routes/entities/audio-items/[slug]/about", "parentId": "routes/entities/audio-items/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]/about-IWM75D6I.js", "imports": ["/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]/edit": { "id": "routes/entities/audio-items/[slug]/edit", "parentId": "routes/entities/audio-items/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]/edit-K2654VEW.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]/tags": { "id": "routes/entities/audio-items/[slug]/tags", "parentId": "routes/entities/audio-items/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]/tags-KJBEVJ7O.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/index": { "id": "routes/entities/audio-items/index", "parentId": "root", "path": "entities/audio-items", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/index-BBWLINNG.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/new": { "id": "routes/entities/audio-items/new", "parentId": "root", "path": "entities/audio-items/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/new-PYEN23V2.js", "imports": ["/build/_shared/chunk-FQBJ442H.js", "/build/_shared/chunk-MLS3TVUB.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/random": { "id": "routes/entities/audio-items/random", "parentId": "root", "path": "entities/audio-items/random", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/random-DXIXI76Q.js", "imports": ["/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]": { "id": "routes/entities/collections/[slug]", "parentId": "root", "path": "entities/collections/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]-4AUEIICX.js", "imports": ["/build/_shared/chunk-DFE4U4VC.js", "/build/_shared/chunk-BCEDTFY5.js", "/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]/about": { "id": "routes/entities/collections/[slug]/about", "parentId": "routes/entities/collections/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]/about-YZGPAOMG.js", "imports": ["/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]/edit": { "id": "routes/entities/collections/[slug]/edit", "parentId": "routes/entities/collections/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]/edit-QRAQHWCU.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]/tags": { "id": "routes/entities/collections/[slug]/tags", "parentId": "routes/entities/collections/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]/tags-LJCQ35FG.js", "imports": ["/build/_shared/chunk-GVWMBBLE.js", "/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/index": { "id": "routes/entities/collections/index", "parentId": "root", "path": "entities/collections", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/collections/index-NYEXOOYT.js", "imports": ["/build/_shared/chunk-5G2ZLRFP.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/new": { "id": "routes/entities/collections/new", "parentId": "root", "path": "entities/collections/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/new-5A3VAGG6.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]": { "id": "routes/entities/instruments/[slug]", "parentId": "root", "path": "entities/instruments/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]-3L4YXC3W.js", "imports": ["/build/_shared/chunk-GA5X7N6G.js", "/build/_shared/chunk-BCEDTFY5.js", "/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]/about": { "id": "routes/entities/instruments/[slug]/about", "parentId": "routes/entities/instruments/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]/about-45VCTUD7.js", "imports": ["/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]/edit": { "id": "routes/entities/instruments/[slug]/edit", "parentId": "routes/entities/instruments/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]/edit-IVNAG7OI.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]/tags": { "id": "routes/entities/instruments/[slug]/tags", "parentId": "routes/entities/instruments/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]/tags-4PMHEO3M.js", "imports": ["/build/_shared/chunk-GVWMBBLE.js", "/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/index": { "id": "routes/entities/instruments/index", "parentId": "root", "path": "entities/instruments", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/index-QONQVQPE.js", "imports": ["/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/new": { "id": "routes/entities/instruments/new", "parentId": "root", "path": "entities/instruments/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/new-AEYBYGU4.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]": { "id": "routes/entities/people/[slug]", "parentId": "root", "path": "entities/people/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]-PBLOM7TH.js", "imports": ["/build/_shared/chunk-ZS5BX57O.js", "/build/_shared/chunk-BCEDTFY5.js", "/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]/about": { "id": "routes/entities/people/[slug]/about", "parentId": "routes/entities/people/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]/about-IMWALUEM.js", "imports": ["/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]/edit": { "id": "routes/entities/people/[slug]/edit", "parentId": "routes/entities/people/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]/edit-GIPVR5IX.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]/tags": { "id": "routes/entities/people/[slug]/tags", "parentId": "routes/entities/people/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]/tags-JEXSY5H4.js", "imports": ["/build/_shared/chunk-GVWMBBLE.js", "/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/index": { "id": "routes/entities/people/index", "parentId": "root", "path": "entities/people", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/people/index-FZOLCMHI.js", "imports": ["/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/new": { "id": "routes/entities/people/new", "parentId": "root", "path": "entities/people/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/new-FEBVB5UK.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]": { "id": "routes/entities/places/[slug]", "parentId": "root", "path": "entities/places/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]-LZSJ4SPZ.js", "imports": ["/build/_shared/chunk-TTATH2KV.js", "/build/_shared/chunk-BCEDTFY5.js", "/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]/about": { "id": "routes/entities/places/[slug]/about", "parentId": "routes/entities/places/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]/about-3CDNEIOW.js", "imports": ["/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]/edit": { "id": "routes/entities/places/[slug]/edit", "parentId": "routes/entities/places/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]/edit-TH5WHCCR.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]/tags": { "id": "routes/entities/places/[slug]/tags", "parentId": "routes/entities/places/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]/tags-CJPPRF7G.js", "imports": ["/build/_shared/chunk-GVWMBBLE.js", "/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/index": { "id": "routes/entities/places/index", "parentId": "root", "path": "entities/places", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/places/index-LCIA7IN6.js", "imports": ["/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/new": { "id": "routes/entities/places/new", "parentId": "root", "path": "entities/places/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/new-6GBVODHD.js", "imports": ["/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/[slug]": { "id": "routes/entities/tunes/[slug]", "parentId": "root", "path": "entities/tunes/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/[slug]-FICUM7TB.js", "imports": ["/build/_shared/chunk-PC7FN52L.js", "/build/_shared/chunk-BCEDTFY5.js", "/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/[slug]/about": { "id": "routes/entities/tunes/[slug]/about", "parentId": "routes/entities/tunes/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/[slug]/about-ZXKHZKAG.js", "imports": ["/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/[slug]/tags": { "id": "routes/entities/tunes/[slug]/tags", "parentId": "routes/entities/tunes/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/[slug]/tags-NDSJTVYB.js", "imports": ["/build/_shared/chunk-GVWMBBLE.js", "/build/_shared/chunk-LJCA55RJ.js", "/build/_shared/chunk-S6UIFVCN.js", "/build/_shared/chunk-HG4QKYFB.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/index": { "id": "routes/entities/tunes/index", "parentId": "root", "path": "entities/tunes", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/index-CFSLEPJG.js", "imports": ["/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-T27JMYEF.js", "imports": ["/build/_shared/chunk-5G2ZLRFP.js", "/build/_shared/chunk-FQBJ442H.js", "/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/login-3ELYM4FU.js", "imports": ["/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-RBRWWCZE.js", "imports": ["/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/saved-items": { "id": "routes/saved-items", "parentId": "root", "path": "saved-items", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/saved-items-RHYUHTUW.js", "imports": ["/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-RYCUWHEM.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/signup-AXYYEUMC.js", "imports": ["/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/users/[id]": { "id": "routes/users/[id]", "parentId": "root", "path": "users/id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/users/[id]-S2A4KVCB.js", "imports": ["/build/_shared/chunk-Q275XU67.js", "/build/_shared/chunk-2VEFQQFF.js", "/build/_shared/chunk-GVFIOVD5.js", "/build/_shared/chunk-42LCDHVI.js", "/build/_shared/chunk-LUBTAE3W.js", "/build/_shared/chunk-JWHESXAC.js", "/build/_shared/chunk-HV2EQX6I.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-353DE225.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/account/submissions/[id]/upload": {
    id: "routes/account/submissions/[id]/upload",
    parentId: "root",
    path: "account/submissions/id/upload",
    index: void 0,
    caseSensitive: void 0,
    module: upload_exports
  },
  "routes/admin/verification-requests": {
    id: "routes/admin/verification-requests",
    parentId: "root",
    path: "admin/verification-requests",
    index: void 0,
    caseSensitive: void 0,
    module: verification_requests_exports
  },
  "routes/entities/audio-items/[slug]": {
    id: "routes/entities/audio-items/[slug]",
    parentId: "root",
    path: "entities/audio-items/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/entities/audio-items/[slug]/about": {
    id: "routes/entities/audio-items/[slug]/about",
    parentId: "routes/entities/audio-items/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/entities/audio-items/[slug]/edit": {
    id: "routes/entities/audio-items/[slug]/edit",
    parentId: "routes/entities/audio-items/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports
  },
  "routes/entities/audio-items/[slug]/tags": {
    id: "routes/entities/audio-items/[slug]/tags",
    parentId: "routes/entities/audio-items/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports
  },
  "routes/entities/audio-items/random": {
    id: "routes/entities/audio-items/random",
    parentId: "root",
    path: "entities/audio-items/random",
    index: void 0,
    caseSensitive: void 0,
    module: random_exports
  },
  "routes/entities/collections/[slug]": {
    id: "routes/entities/collections/[slug]",
    parentId: "root",
    path: "entities/collections/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports2
  },
  "routes/entities/collections/[slug]/about": {
    id: "routes/entities/collections/[slug]/about",
    parentId: "routes/entities/collections/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports2
  },
  "routes/entities/collections/[slug]/edit": {
    id: "routes/entities/collections/[slug]/edit",
    parentId: "routes/entities/collections/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports2
  },
  "routes/entities/collections/[slug]/tags": {
    id: "routes/entities/collections/[slug]/tags",
    parentId: "routes/entities/collections/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports2
  },
  "routes/entities/instruments/[slug]": {
    id: "routes/entities/instruments/[slug]",
    parentId: "root",
    path: "entities/instruments/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports3
  },
  "routes/entities/instruments/[slug]/about": {
    id: "routes/entities/instruments/[slug]/about",
    parentId: "routes/entities/instruments/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports3
  },
  "routes/entities/instruments/[slug]/edit": {
    id: "routes/entities/instruments/[slug]/edit",
    parentId: "routes/entities/instruments/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports3
  },
  "routes/entities/instruments/[slug]/tags": {
    id: "routes/entities/instruments/[slug]/tags",
    parentId: "routes/entities/instruments/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports3
  },
  "routes/entities/audio-items/index": {
    id: "routes/entities/audio-items/index",
    parentId: "root",
    path: "entities/audio-items",
    index: true,
    caseSensitive: void 0,
    module: audio_items_exports
  },
  "routes/entities/collections/index": {
    id: "routes/entities/collections/index",
    parentId: "root",
    path: "entities/collections",
    index: true,
    caseSensitive: void 0,
    module: collections_exports
  },
  "routes/entities/instruments/index": {
    id: "routes/entities/instruments/index",
    parentId: "root",
    path: "entities/instruments",
    index: true,
    caseSensitive: void 0,
    module: instruments_exports
  },
  "routes/account/submissions/index": {
    id: "routes/account/submissions/index",
    parentId: "root",
    path: "account/submissions",
    index: true,
    caseSensitive: void 0,
    module: submissions_exports
  },
  "routes/entities/audio-items/new": {
    id: "routes/entities/audio-items/new",
    parentId: "root",
    path: "entities/audio-items/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/entities/collections/new": {
    id: "routes/entities/collections/new",
    parentId: "root",
    path: "entities/collections/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports2
  },
  "routes/entities/instruments/new": {
    id: "routes/entities/instruments/new",
    parentId: "root",
    path: "entities/instruments/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports3
  },
  "routes/account/submissions/new": {
    id: "routes/account/submissions/new",
    parentId: "root",
    path: "account/submissions/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports4
  },
  "routes/admin/submissions/index": {
    id: "routes/admin/submissions/index",
    parentId: "root",
    path: "admin/submissions",
    index: true,
    caseSensitive: void 0,
    module: submissions_exports2
  },
  "routes/admin/takedown-requests": {
    id: "routes/admin/takedown-requests",
    parentId: "root",
    path: "admin/takedown-requests",
    index: void 0,
    caseSensitive: void 0,
    module: takedown_requests_exports
  },
  "routes/admin/submissions/[id]": {
    id: "routes/admin/submissions/[id]",
    parentId: "root",
    path: "admin/submissions/id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/entities/people/[slug]": {
    id: "routes/entities/people/[slug]",
    parentId: "root",
    path: "entities/people/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports4
  },
  "routes/entities/people/[slug]/about": {
    id: "routes/entities/people/[slug]/about",
    parentId: "routes/entities/people/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports4
  },
  "routes/entities/people/[slug]/edit": {
    id: "routes/entities/people/[slug]/edit",
    parentId: "routes/entities/people/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports4
  },
  "routes/entities/people/[slug]/tags": {
    id: "routes/entities/people/[slug]/tags",
    parentId: "routes/entities/people/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports4
  },
  "routes/entities/places/[slug]": {
    id: "routes/entities/places/[slug]",
    parentId: "root",
    path: "entities/places/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports5
  },
  "routes/entities/places/[slug]/about": {
    id: "routes/entities/places/[slug]/about",
    parentId: "routes/entities/places/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports5
  },
  "routes/entities/places/[slug]/edit": {
    id: "routes/entities/places/[slug]/edit",
    parentId: "routes/entities/places/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports5
  },
  "routes/entities/places/[slug]/tags": {
    id: "routes/entities/places/[slug]/tags",
    parentId: "routes/entities/places/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports5
  },
  "routes/entities/people/index": {
    id: "routes/entities/people/index",
    parentId: "root",
    path: "entities/people",
    index: true,
    caseSensitive: void 0,
    module: people_exports
  },
  "routes/entities/places/index": {
    id: "routes/entities/places/index",
    parentId: "root",
    path: "entities/places",
    index: true,
    caseSensitive: void 0,
    module: places_exports
  },
  "routes/entities/tunes/[slug]": {
    id: "routes/entities/tunes/[slug]",
    parentId: "root",
    path: "entities/tunes/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports6
  },
  "routes/entities/tunes/[slug]/about": {
    id: "routes/entities/tunes/[slug]/about",
    parentId: "routes/entities/tunes/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports6
  },
  "routes/entities/tunes/[slug]/tags": {
    id: "routes/entities/tunes/[slug]/tags",
    parentId: "routes/entities/tunes/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports6
  },
  "routes/entities/tunes/index": {
    id: "routes/entities/tunes/index",
    parentId: "root",
    path: "entities/tunes",
    index: true,
    caseSensitive: void 0,
    module: tunes_exports
  },
  "routes/entities/people/new": {
    id: "routes/entities/people/new",
    parentId: "root",
    path: "entities/people/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports5
  },
  "routes/entities/places/new": {
    id: "routes/entities/places/new",
    parentId: "root",
    path: "entities/places/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports6
  },
  "routes/account/verify": {
    id: "routes/account/verify",
    parentId: "root",
    path: "account/verify",
    index: void 0,
    caseSensitive: void 0,
    module: verify_exports
  },
  "routes/account/index": {
    id: "routes/account/index",
    parentId: "root",
    path: "account",
    index: true,
    caseSensitive: void 0,
    module: account_exports
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "root",
    path: "admin",
    index: true,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/saved-items": {
    id: "routes/saved-items",
    parentId: "root",
    path: "saved-items",
    index: void 0,
    caseSensitive: void 0,
    module: saved_items_exports
  },
  "routes/auto-login": {
    id: "routes/auto-login",
    parentId: "root",
    path: "auto-login",
    index: void 0,
    caseSensitive: void 0,
    module: auto_login_exports
  },
  "routes/users/[id]": {
    id: "routes/users/[id]",
    parentId: "root",
    path: "users/id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports2
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
