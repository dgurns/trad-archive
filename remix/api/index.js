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
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react21 = require("@remix-run/react");
var import_client10 = require("@apollo/client");

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-YW22BLV5.css";

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
var import_client = require("@prisma/client");
var audioItemWithRelations = import_client.Prisma.validator()({
  include: {
    tagsAsSubject: {
      include: {
        objectAudioItem: true,
        objectCollection: true,
        objectInstrument: true,
        objectPerson: true,
        objectPlace: true,
        objectTune: true,
        relationship: true
      }
    },
    createdByUser: true,
    updatedByUser: true,
    comments: {
      include: {
        createdByUser: true
      }
    }
  }
});
var collectionWithRelations = import_client.Prisma.validator()({
  include: { tagsAsSubject: true, createdByUser: true, updatedByUser: true }
});
var commentWithRelations = import_client.Prisma.validator()({
  include: { parentAudioItem: true, createdByUser: true }
});
var tagWithRelations = import_client.Prisma.validator()({
  include: {
    objectAudioItem: true,
    objectCollection: true,
    objectInstrument: true,
    objectPerson: true,
    objectPlace: true,
    objectTune: true,
    relationship: true
  }
});
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
var import_react18 = __toESM(require("react"));
var import_react19 = require("@remix-run/react");
var import_react20 = require("@remix-run/react");
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
var import_client4 = require("@prisma/client");
var cleanSlug = (rawSlug) => {
  const slugWithHyphens = rawSlug.replace(/[\s]/g, "-");
  return slugWithHyphens.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
};
var makeHrefForTopLevel = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case import_client4.EntityType.AudioItem:
      return "/entities/audio-items";
    case import_client4.EntityType.Person:
      return "/entities/people";
    case import_client4.EntityType.Instrument:
      return "/entities/instruments";
    case import_client4.EntityType.Place:
      return "/entities/places";
    case import_client4.EntityType.Tune:
      return "/entities/tunes";
    case import_client4.EntityType.Collection:
      return "/entities/collections";
    default:
      return "";
  }
};
var makeHrefForView = (entity) => {
  if (!entity) {
    return "";
  }
  return `${makeHrefForTopLevel(entity)}/${entity.slug}`;
};
var makeHrefForEdit = (entity) => {
  if (!entity) {
    return "";
  }
  return `${makeHrefForView(entity)}/edit`;
};
var makeHrefForAbout = (entity) => {
  if (!entity) {
    return "";
  }
  return `${makeHrefForView(entity)}/about`;
};
var makeHrefForTags = (entity) => {
  if (!entity) {
    return "";
  }
  return `${makeHrefForView(entity)}/tags`;
};
var makeReadableNamePlural = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case import_client4.EntityType.AudioItem:
      return "Audio Items";
    case import_client4.EntityType.Person:
      return "People";
    case import_client4.EntityType.Instrument:
      return "Instruments";
    case import_client4.EntityType.Place:
      return "Places";
    case import_client4.EntityType.Tune:
      return "Tunes";
    case import_client4.EntityType.Collection:
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
var import_react8 = __toESM(require("react"));
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
  return /* @__PURE__ */ import_react8.default.createElement("div", {
    className: `${isVisible ? "visible" : "hidden"} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`
  }, /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
    onClick: onClose
  }), /* @__PURE__ */ import_react8.default.createElement("div", {
    className: `bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-9/10 overflow-y-auto overflow-x-hidden md:max-w-md ${className ?? ""}`
  }, /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "flex flex-row justify-between items-center mb-4 text-black"
  }, /* @__PURE__ */ import_react8.default.createElement("h2", null, title), /* @__PURE__ */ import_react8.default.createElement("button", {
    className: "btn-icon flex flex-row items-center justify-center ml-4 mb-0.5",
    onClick: onClose,
    "aria-label": "Close"
  }, /* @__PURE__ */ import_react8.default.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-0.5 mr-3"
  }, "ESC"), /* @__PURE__ */ import_react8.default.createElement("i", {
    className: "material-icons"
  }, "close"))), /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "text-base text-black font-normal whitespace-normal text-left cursor-auto"
  }, children)));
};
var Modal_default = Modal;

// app/components/SearchEntities.tsx
var import_react16 = require("@remix-run/react");
var import_react17 = require("react");
var import_client9 = require("@apollo/client");
var import_debounce = __toESM(require("lodash/debounce"));

// app/components/LoadingCircle.tsx
var LoadingCircle = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: "h-6"
}, /* @__PURE__ */ React.createElement("i", {
  className: `material-icons animate-spin text-gray-500 ${className ?? ""}`
}, "scatter_plot"));
var LoadingCircle_default = LoadingCircle;

// app/components/CreateNewEntities.tsx
var import_react15 = require("react");

// app/hooks/useRequireLogin.ts
var import_react9 = require("react");
var import_react10 = require("@remix-run/react");
var useRequireLogin = () => {
  const navigate = (0, import_react10.useNavigate)();
  const [currentUser] = useCurrentUser_default();
  const requireLogin = (0, import_react9.useCallback)(({ redirectTo } = {}) => navigate({
    pathname: "/login",
    query: {
      redirectTo: redirectTo ?? window.location.pathname
    }
  }), [navigate]);
  return { requireLogin, currentUser };
};
var useRequireLogin_default = useRequireLogin;

// app/components/CreatePersonForm.tsx
var import_react11 = require("react");
var import_client5 = require("@apollo/client");
var CREATE_PERSON_MUTATION = import_client5.gql`
	mutation CreatePerson($input: CreatePersonInput!) {
		createPerson(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var CreatePersonForm = ({ onSuccess }) => {
  const [createPerson, { loading, error: error2, data: data2 }] = (0, import_client5.useMutation)(CREATE_PERSON_MUTATION, {
    errorPolicy: "all"
  });
  const [firstName, setFirstName] = (0, import_react11.useState)("");
  const [middleName, setMiddleName] = (0, import_react11.useState)("");
  const [lastName, setLastName] = (0, import_react11.useState)("");
  const [slug, setSlug] = (0, import_react11.useState)("");
  const [aliases, setAliases] = (0, import_react11.useState)("");
  const [description, setDescription] = (0, import_react11.useState)("");
  (0, import_react11.useEffect)(() => {
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
  (0, import_react11.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createPerson) {
      if (onSuccess) {
        return onSuccess(data2.createPerson);
      }
      window.alert("Person created successfully!");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data2]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var CreatePersonForm_default = CreatePersonForm;

// app/components/CreateInstrumentForm.tsx
var import_react12 = require("react");
var import_client6 = require("@apollo/client");
var CREATE_INSTRUMENT_MUTATION = import_client6.gql`
	mutation CreateInstrument($input: CreateInstrumentInput!) {
		createInstrument(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var CreateInstrumentForm = ({ onSuccess }) => {
  const [createInstrument, { loading, error: error2, data: data2 }] = (0, import_client6.useMutation)(CREATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react12.useState)("");
  const [slug, setSlug] = (0, import_react12.useState)("");
  const [aliases, setAliases] = (0, import_react12.useState)("");
  const [description, setDescription] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
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
  (0, import_react12.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createInstrument) {
      if (onSuccess) {
        return onSuccess(data2.createInstrument);
      }
      window.alert("Instrument created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data2]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var CreateInstrumentForm_default = CreateInstrumentForm;

// app/components/CreatePlaceForm.tsx
var import_react13 = require("react");
var import_client7 = require("@apollo/client");
var CREATE_PLACE_MUTATION = import_client7.gql`
	mutation CreatePlace($input: CreatePlaceInput!) {
		createPlace(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var CreatePlaceForm = ({ onSuccess }) => {
  const [createPlace, { loading, error: error2, data: data2 }] = (0, import_client7.useMutation)(CREATE_PLACE_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react13.useState)("");
  const [slug, setSlug] = (0, import_react13.useState)("");
  const [aliases, setAliases] = (0, import_react13.useState)("");
  const [latitude, setLatitude] = (0, import_react13.useState)("");
  const [longitude, setLongitude] = (0, import_react13.useState)("");
  const [description, setDescription] = (0, import_react13.useState)("");
  (0, import_react13.useEffect)(() => {
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
  (0, import_react13.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createPlace) {
      if (onSuccess) {
        return onSuccess(data2.createPlace);
      }
      window.alert("Place created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setLatitude("");
      setLongitude("");
      setDescription("");
    }
  }, [data2]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var CreatePlaceForm_default = CreatePlaceForm;

// app/components/CreateCollectionForm.tsx
var import_react14 = require("react");
var import_client8 = require("@apollo/client");
var CREATE_COLLECTION_MUTATION = import_client8.gql`
	mutation CreateCollection($input: CreateCollectionInput!) {
		createCollection(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var CreateCollectionForm = ({ onSuccess }) => {
  const [createCollection, { loading, error: error2, data: data2 }] = (0, import_client8.useMutation)(CREATE_COLLECTION_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react14.useState)("");
  const [slug, setSlug] = (0, import_react14.useState)("");
  const [aliases, setAliases] = (0, import_react14.useState)("");
  const [description, setDescription] = (0, import_react14.useState)("");
  (0, import_react14.useEffect)(() => {
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
  (0, import_react14.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createCollection) {
      if (onSuccess) {
        return onSuccess(data2.createCollection);
      }
      window.alert("Collection created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data2]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var CreateCollectionForm_default = CreateCollectionForm;

// app/components/CreateNewEntities.tsx
var CreateNewEntities = ({ entityTypes, onNewEntityCreated }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [createPersonModalIsVisible, setCreatePersonModalIsVisible] = (0, import_react15.useState)(false);
  const [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] = (0, import_react15.useState)(false);
  const [createPlaceModalIsVisible, setCreatePlaceModalIsVisible] = (0, import_react15.useState)(false);
  const [createCollectionModalIsVisible, setCreateCollectionModalIsVisible] = (0, import_react15.useState)(false);
  const onCreateNewPersonClicked = (0, import_react15.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreatePersonModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewInstrumentClicked = (0, import_react15.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreateInstrumentModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewPlaceClicked = (0, import_react15.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreatePlaceModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewCollectionClicked = (0, import_react15.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreateCollectionModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onNewPersonCreated = (0, import_react15.useCallback)((person2) => {
    setCreatePersonModalIsVisible(false);
    onNewEntityCreated(person2);
  }, [onNewEntityCreated]);
  const onNewInstrumentCreated = (0, import_react15.useCallback)((instrument) => {
    setCreateInstrumentModalIsVisible(false);
    onNewEntityCreated(instrument);
  }, []);
  const onNewPlaceCreated = (0, import_react15.useCallback)((place) => {
    setCreatePlaceModalIsVisible(false);
    onNewEntityCreated(place);
  }, []);
  const onNewCollectionCreated = (0, import_react15.useCallback)((collection) => {
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
var SEARCH_ENTITIES_QUERY = import_client9.gql`
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
  const [searchTerm, setSearchTerm] = (0, import_react17.useState)("");
  const [searchResults, setSearchResults] = (0, import_react17.useState)();
  const onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };
  const [searchEntities, { loading, data: data2, error: error2 }] = (0, import_client9.useLazyQuery)(SEARCH_ENTITIES_QUERY, {
    fetchPolicy: "no-cache"
  });
  const debouncedSearchEntities = (0, import_react17.useCallback)((0, import_debounce.default)(searchEntities, 300, { trailing: true }), [searchEntities]);
  (0, import_react17.useEffect)(() => {
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
  (0, import_react17.useEffect)(() => {
    if (data2 == null ? void 0 : data2.searchEntities) {
      setSearchResults(data2.searchEntities);
    }
  }, [data2]);
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
  }, /* @__PURE__ */ React.createElement(LoadingCircle_default, null))), error2 && /* @__PURE__ */ React.createElement("div", {
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
  }, entity.entityType)), /* @__PURE__ */ React.createElement(import_react16.Link, {
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
  const navigate = (0, import_react20.useNavigate)();
  const [currentUser, { loading }] = useCurrentUser_default();
  const [searchModalIsVisible, setSearchModalIsVisible] = (0, import_react18.useState)(false);
  const openSearchModal = (event) => {
    event.preventDefault();
    setSearchModalIsVisible(true);
  };
  const closeSearchModal = () => {
    setSearchModalIsVisible(false);
  };
  (0, import_react_hotkeys_hook2.useHotkeys)("/", openSearchModal);
  const onSelectSearchResult = (0, import_react18.useCallback)((entity) => {
    setSearchModalIsVisible(false);
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  const onNewEntityCreated = (0, import_react18.useCallback)((entity) => {
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  const userActions = (0, import_react18.useMemo)(() => {
    if (loading || typeof currentUser === "undefined") {
      return null;
    } else if (currentUser) {
      return /* @__PURE__ */ import_react18.default.createElement("div", {
        className: "flex flex-row items-center"
      }, /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
        to: "/saved-items",
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ import_react18.default.createElement("i", {
        className: "material-icons"
      }, "bookmark"), /* @__PURE__ */ import_react18.default.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Saved")), User_default.isAdmin(currentUser) && /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
        to: "/admin",
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ import_react18.default.createElement("i", {
        className: "material-icons"
      }, "manage_accounts"), /* @__PURE__ */ import_react18.default.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Admin")), /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
        to: "/account",
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ import_react18.default.createElement("i", {
        className: "material-icons"
      }, "account_circle"), /* @__PURE__ */ import_react18.default.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Account")));
    } else {
      return /* @__PURE__ */ import_react18.default.createElement("div", null, /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
        to: "/login",
        className: "whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
      }, "Log In"), /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
        to: "/signup",
        className: "btn text-current no-underline whitespace-nowrap hover:text-current ml-4"
      }, "Sign Up"));
    }
  }, [loading, currentUser]);
  return /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, /* @__PURE__ */ import_react18.default.createElement("div", {
    className: "flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700",
    suppressHydrationWarning: true
  }, /* @__PURE__ */ import_react18.default.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
    to: "/",
    className: "whitespace-nowrap no-underline text-yellow-200 hover:text-gray-400"
  }, "Trad Archive"), /* @__PURE__ */ import_react18.default.createElement("button", {
    className: "flex flex-row items-center whitespace-nowrap text-white hover:text-gray-400 group ml-4",
    onClick: openSearchModal
  }, /* @__PURE__ */ import_react18.default.createElement("i", {
    className: "material-icons"
  }, "search"), /* @__PURE__ */ import_react18.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Search"), /* @__PURE__ */ import_react18.default.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5"
  }, `/`)), /* @__PURE__ */ import_react18.default.createElement(import_react19.Link, {
    to: "/entities/audio-items/random",
    className: "flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react18.default.createElement("div", {
    className: "block h-6"
  }, /* @__PURE__ */ import_react18.default.createElement("i", {
    className: "material-icons"
  }, "shuffle")), /* @__PURE__ */ import_react18.default.createElement("div", {
    className: "md:pl-2 hidden md:block"
  }, "Random"))), userActions), /* @__PURE__ */ import_react18.default.createElement(Modal_default, {
    title: "Search",
    isVisible: searchModalIsVisible,
    onClose: closeSearchModal
  }, /* @__PURE__ */ import_react18.default.createElement(SearchEntities_default, {
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
var apolloClient = new import_client10.ApolloClient({ cache: new import_client10.InMemoryCache() });
var meta = () => ({
  charset: "utf-8",
  title: "Trad Archive",
  viewport: "width=device-width,initial-scale=1"
});
function links() {
  return [
    { rel: "stylesheet", href: globals_generated_do_not_edit_default },
    { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com/" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons"
    },
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
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react21.Meta, null), /* @__PURE__ */ React.createElement(import_react21.Links, null)), /* @__PURE__ */ React.createElement(import_client10.ApolloProvider, {
    client: apolloClient
  }, /* @__PURE__ */ React.createElement(PlayerContextProvider_default, null, /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44"
  }, /* @__PURE__ */ React.createElement(import_react21.Outlet, null)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react21.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react21.Scripts, null), /* @__PURE__ */ React.createElement(import_react21.LiveReload, null)))));
}
function ErrorBoundary({ error: error2 }) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react21.Meta, null), /* @__PURE__ */ React.createElement(import_react21.Links, null)), /* @__PURE__ */ React.createElement(import_client10.ApolloProvider, {
    client: apolloClient
  }, /* @__PURE__ */ React.createElement(PlayerContextProvider_default, null, /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44 text-center"
  }, /* @__PURE__ */ React.createElement("h1", null, "Oops! There was an error."), /* @__PURE__ */ React.createElement("p", {
    className: "text-red-500 mt-2"
  }, error2.message)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react21.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react21.Scripts, null), /* @__PURE__ */ React.createElement(import_react21.LiveReload, null)))));
}
function CatchBoundary() {
  const caught = (0, import_react21.useCatch)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react21.Meta, null), /* @__PURE__ */ React.createElement(import_react21.Links, null)), /* @__PURE__ */ React.createElement(import_client10.ApolloProvider, {
    client: apolloClient
  }, /* @__PURE__ */ React.createElement(PlayerContextProvider_default, null, /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44 text-center"
  }, /* @__PURE__ */ React.createElement("h1", null, "Oops! There was an error."), /* @__PURE__ */ React.createElement("p", {
    className: "text-red-500 mt-2"
  }, caught.status, " - ", caught.statusText)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react21.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react21.Scripts, null), /* @__PURE__ */ React.createElement(import_react21.LiveReload, null)))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var upload_exports = {};
__export(upload_exports, {
  default: () => upload_default
});
var import_react25 = require("react");
var import_react26 = require("@remix-run/react");
var import_client11 = require("@apollo/client");

// app/components/Layout.tsx
var Layout = ({ children }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pb-44"
  }, children));
};
var Layout_default = Layout;

// app/components/RequireUser.tsx
var import_react22 = require("@remix-run/react");
var RequireUser = ({
  children,
  requireUserId
}) => {
  const navigate = (0, import_react22.useNavigate)();
  const [currentUser, { data: data2, error: error2 }] = useCurrentUser_default();
  if (!data2 && !error2) {
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
  const dateObject = date instanceof Date ? date : new Date(date);
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
  const dateObject = date instanceof Date ? date : new Date(date);
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
var SUBMISSION = import_client11.gql`
	query Submission($input: SubmissionInput!) {
		submission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var CREATE_PRESIGNED_FILE_UPLOAD_URLS = import_client11.gql`
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
  const { data: data2, error: error2 } = (0, import_client11.useQuery)(SUBMISSION, {
    variables: { input: { id: submissionId } },
    skip: !submissionId
  });
  const [files, setFiles] = (0, import_react25.useState)([]);
  const [uploadQueue, setUploadQueue] = (0, import_react25.useState)();
  const [getPresignedUrls] = (0, import_client11.useMutation)(CREATE_PRESIGNED_FILE_UPLOAD_URLS);
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
  if (!data2) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, error2 ? /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600"
    }, error2.graphQLErrors.map((e) => e.message).join(", ")) : /* @__PURE__ */ React.createElement(LoadingBlock_default, null)));
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
        label: DateTime_default.formatDateYearTime(data2.submission.createdAt, true)
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
var import_client12 = require("@apollo/client");
var import_compareDesc = __toESM(require("date-fns/compareDesc"));

// app/components/RequireAdmin.tsx
var import_react27 = require("@remix-run/react");
var RequireAdmin = ({ children }) => {
  const navigate = (0, import_react27.useNavigate)();
  const [currentUser, { data: data2, error: error2 }] = useCurrentUser_default();
  if (currentUser && User_default.isAdmin(currentUser)) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  } else if (!data2 && !error2) {
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
var VERIFICATION_REQUESTS = import_client12.gql`
	query VerificationRequests($input: VerificationRequestsInput!) {
		verificationRequests(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var UPDATE_VERIFICATION_REQUEST_STATUS = import_client12.gql`
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
  } = (0, import_client12.useQuery)(VERIFICATION_REQUESTS, {
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
  ] = (0, import_client12.useMutation)(UPDATE_VERIFICATION_REQUEST_STATUS, { errorPolicy: "all" });
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
  }, verificationRequestsError.graphQLErrors.map((error2) => error2.message).join(", ")), !verificationRequestsLoading && (verificationRequests == null ? void 0 : verificationRequests.map((verificationRequest, index) => {
    const {
      id,
      person: person2,
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
      to: Entity_default.makeHrefForView(person2)
    }, /* @__PURE__ */ React.createElement("a", {
      target: "_blank"
    }, person2.name)), /* @__PURE__ */ React.createElement("br", null), presignedImageDownloadUrl && /* @__PURE__ */ React.createElement(React.Fragment, null, "Proof:", " ", /* @__PURE__ */ React.createElement("a", {
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var random_exports = {};
__export(random_exports, {
  default: () => random_default
});
var import_react30 = require("react");
var import_react31 = require("@remix-run/react");

// app/hooks/useAudioItemRandom.ts
var import_client13 = require("@apollo/client");
var AUDIO_ITEM_RANDOM_QUERY = import_client13.gql`
	query AudioItemRandom {
		audioItemRandom {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemRandom = ({ queryOptions = {} } = {}) => {
  const audioItemRandomQuery = (0, import_client13.useQuery)(AUDIO_ITEM_RANDOM_QUERY, __spreadValues({
    fetchPolicy: "network-only"
  }, queryOptions));
  const { data: data2 } = audioItemRandomQuery;
  const audioItemRandom = data2 == null ? void 0 : data2.audioItemRandom;
  return [audioItemRandom, audioItemRandomQuery];
};
var useAudioItemRandom_default = useAudioItemRandom;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var AudioItemRandom = () => {
  const [audioItemRandom, { loading, error: error2 }] = useAudioItemRandom_default();
  const navigate = (0, import_react31.useNavigate)();
  (0, import_react30.useEffect)(() => {
    if (audioItemRandom) {
      navigate(Entity_default.makeHrefForView(audioItemRandom));
    }
  }, [audioItemRandom]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching random Audio Item. Please reload the page."));
};
var random_default = AudioItemRandom;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => slug_default,
  loader: () => loader
});
var import_react59 = require("@remix-run/react");

// app/utils/db.server.ts
var import_client14 = require("@prisma/client");
var db;
if (false) {
  db = new import_client14.PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new import_client14.PrismaClient();
  }
  db = global.__db;
}

// app/components/AudioItemCard.tsx
var import_react52 = require("react");
var import_react53 = require("@remix-run/react");
var import_react54 = require("@remix-run/react");

// app/components/Tags.tsx
var import_react37 = require("react");
var import_react38 = require("@remix-run/react");

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
    return (a.subjectTimeMarkerSeconds ?? 0) - (b.subjectTimeMarkerSeconds ?? 0);
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
var getObjectEntity = (tag) => {
  return tag.objectAudioItem ?? tag.objectCollection ?? tag.objectInstrument ?? tag.objectPerson ?? tag.objectPlace ?? tag.objectTune;
};
var Tag_default = {
  TagSortStrategy,
  sort,
  getObjectEntity
};

// app/components/AddTagButton.tsx
var import_react35 = require("react");
var import_client18 = require("@apollo/client");

// app/components/CreateTagForm.tsx
var import_react34 = require("react");
var import_client17 = require("@apollo/client");

// app/hooks/useTags.ts
var import_react32 = require("react");
var import_client15 = require("@apollo/client");
var TAGS_QUERY = import_client15.gql`
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
  const [getTags, tagsQuery] = (0, import_client15.useLazyQuery)(TAGS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data: data2, fetchMore } = tagsQuery;
  (0, import_react32.useEffect)(() => {
    getTags({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getTags, resultsPerPage]);
  const tags = data2 == null ? void 0 : data2.tags;
  const fetchNextPageOfTags = (0, import_react32.useCallback)(() => {
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
var import_react33 = require("react");
var import_client16 = require("@apollo/client");
var SEARCH_RELATIONSHIPS_QUERY = import_client16.gql`
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
  const [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react33.useState)("");
  const { loading, data: data2, error: error2 } = (0, import_client16.useQuery)(SEARCH_RELATIONSHIPS_QUERY, {
    variables: {
      subjectEntityType: subjectEntity.entityType,
      objectEntityType: objectEntity.entityType
    },
    fetchPolicy: "no-cache"
  });
  const relationshipOptions = (data2 == null ? void 0 : data2.searchRelationships) ?? [];
  (0, import_react33.useEffect)(() => {
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
  }, objectEntity.entityType), objectEntity.name), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, error2));
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
var CREATE_TAG_MUTATION = import_client17.gql`
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
  const [shouldAddTimeMarker, setShouldAddTimeMarker] = (0, import_react34.useState)(false);
  const [timeMarkerValue, setTimeMarkerValue] = (0, import_react34.useState)(defaultTimeMarkerValue);
  const [selectedEntity, setSelectedEntity] = (0, import_react34.useState)(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react34.useState)("");
  const [shouldCreateInverseRelationship, setShouldCreateInverseRelationship] = (0, import_react34.useState)(true);
  const [selectedInverseRelationshipId, setSelectedInverseRelationshipId] = (0, import_react34.useState)("");
  const [createTag, { data: data2, error: error2 }] = (0, import_client17.useMutation)(CREATE_TAG_MUTATION, {
    errorPolicy: "all"
  });
  const [tagsAreCreating, setTagsAreCreating] = (0, import_react34.useState)(false);
  const [primaryCreatedTag, setPrimaryCreatedTag] = (0, import_react34.useState)(void 0);
  const [tagsAreCreated, setTagsAreCreated] = (0, import_react34.useState)(false);
  const {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default({
    queryOptions: { fetchPolicy: "network-only" }
  });
  (0, import_react34.useEffect)(() => {
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
  }, [data2, refetchTopLevelTags, onSuccess, tagsAreCreated, primaryCreatedTag]);
  const onSelectEntity = (0, import_react34.useCallback)((selectedEntityFromResults) => {
    if (selectedEntityFromResults.id === entity.id) {
      return window.alert("Cannot tag an entity with itself");
    }
    setSelectedEntity(selectedEntityFromResults);
  }, [entity]);
  const onNewEntityCreated = (0, import_react34.useCallback)((entity2) => {
    setSelectedEntity(entity2);
  }, []);
  const onTimeMarkerValueChanged = (0, import_react34.useCallback)((newTimeMarkerValueSeconds) => {
    setShouldAddTimeMarker(true);
    if (newTimeMarkerValueSeconds >= activeItemDurationSeconds) {
      setTimeMarkerValue(activeItemDurationSeconds);
    } else if (newTimeMarkerValueSeconds <= 0) {
      setTimeMarkerValue(0);
    } else {
      setTimeMarkerValue(newTimeMarkerValueSeconds);
    }
  }, [activeItemDurationSeconds]);
  const onSelectRelationship = (0, import_react34.useCallback)((relationshipId) => {
    setSelectedRelationshipId(relationshipId);
  }, [setSelectedRelationshipId]);
  const onSelectInverseRelationship = (0, import_react34.useCallback)((relationshipId) => {
    setSelectedInverseRelationshipId(relationshipId);
  }, [setSelectedInverseRelationshipId]);
  const onCreateTagClicked = (0, import_react34.useCallback)(async () => {
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
  }, "Save"), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, error2.message));
};
var CreateTagForm_default = CreateTagForm;

// app/components/AddTagButton.tsx
var PARENT_ENTITY_QUERY = import_client18.gql`
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
  const [addTagModalIsVisible, setAddTagModalIsVisible] = (0, import_react35.useState)(false);
  const [getParentEntity, { loading: parentEntityLoading }] = (0, import_client18.useLazyQuery)(PARENT_ENTITY_QUERY, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  });
  const onCreateTagSuccess = (0, import_react35.useCallback)(async (tag) => {
    await getParentEntity();
    setAddTagModalIsVisible(false);
    if (onSuccess) {
      onSuccess(tag);
    }
  }, [getParentEntity, setAddTagModalIsVisible, onSuccess]);
  const onAddTagClicked = (0, import_react35.useCallback)(async () => {
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
var import_react36 = require("react");
var import_client19 = require("@apollo/client");
var PARENT_ENTITY_QUERY2 = import_client19.gql`
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
var DELETE_TAG_MUTATION = import_client19.gql`
	mutation DeleteTag($id: String!) {
		deleteTag(id: $id)
	}
`;
var EditTagsButton = ({ entity, className, children, onSuccess }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [editTagsModalIsVisible, setEditTagsModalIsVisible] = (0, import_react36.useState)(false);
  const [getParentEntity, { loading: parentEntityLoading }] = (0, import_client19.useLazyQuery)(PARENT_ENTITY_QUERY2, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  });
  const [deleteTag, { loading: deleteTagLoading, data: deleteTagData }] = (0, import_client19.useMutation)(DELETE_TAG_MUTATION, { errorPolicy: "all" });
  const {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default();
  const onDeleteTag = (0, import_react36.useCallback)(async (id) => {
    if (!currentUser) {
      return await requireLogin();
    }
    if (window.confirm("Are you sure you want to delete this Tag?")) {
      deleteTag({ variables: { id } });
    }
  }, [deleteTag, currentUser, requireLogin]);
  (0, import_react36.useEffect)(() => {
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
  const sortedTags = (0, import_react36.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    return Tag_default.sort(tags);
  }, [tags]);
  if (!sortedTags || sortedTags.length === 0) {
    return null;
  }
  const isLoading2 = parentEntityLoading || deleteTagLoading;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: () => setEditTagsModalIsVisible(true)
  }, children ?? "Edit Tags"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Edit Tags",
    isVisible: editTagsModalIsVisible,
    onClose: () => setEditTagsModalIsVisible(false)
  }, isLoading2 ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : sortedTags.map((tag, index) => {
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
  var _a;
  const [tooltipIsVisible, setTooltipIsVisible] = (0, import_react37.useState)(false);
  const [timeoutFunc, setTimeoutFunc] = (0, import_react37.useState)();
  const onMouseEnter = (0, import_react37.useCallback)(() => {
    setTimeoutFunc(setTimeout(() => setTooltipIsVisible(true), 400));
  }, []);
  const onMouseLeave = (0, import_react37.useCallback)(() => {
    if (timeoutFunc) {
      clearTimeout(timeoutFunc);
      setTimeoutFunc(void 0);
    }
    setTooltipIsVisible(false);
  }, [timeoutFunc]);
  (0, import_react37.useEffect)(() => {
    return () => {
      if (timeoutFunc) {
        clearTimeout(timeoutFunc);
        setTimeoutFunc(void 0);
      }
    };
  }, [timeoutFunc]);
  const { relationship } = tag;
  const objectEntity = Tag_default.getObjectEntity(tag);
  const href = Entity_default.makeHrefForView(objectEntity);
  if (!objectEntity || !href) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(import_react38.Link, {
    to: href,
    className: "relative block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800",
    onMouseEnter,
    onMouseLeave
  }, objectEntity.name, /* @__PURE__ */ React.createElement("div", {
    className: `${tooltipIsVisible ? "flex" : "hidden"} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`
  }, relationship.name, " ", (_a = objectEntity.entityType) == null ? void 0 : _a.toUpperCase()));
};
var Tags = ({ audioItem }) => {
  const { tagsAsSubject } = audioItem;
  const sortedTags = (0, import_react37.useMemo)(() => {
    if (!Array.isArray(tagsAsSubject)) {
      return [];
    }
    const tagsWithoutTimeMarkers = tagsAsSubject.filter((tag) => typeof tag.subjectTimeMarkerSeconds !== "number");
    return Tag_default.sort(tagsWithoutTimeMarkers);
  }, [tagsAsSubject]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center flex-wrap"
  }, sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    className: "mr-2",
    key: index
  }, /* @__PURE__ */ React.createElement(TagLink, {
    tag
  }))), /* @__PURE__ */ React.createElement("div", {
    className: tagsAsSubject && tagsAsSubject.length > 0 ? "mb-2 ml-1" : void 0
  }, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: audioItem
  })), tagsAsSubject && tagsAsSubject.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex ml-1 mb-2"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 mr-1"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: audioItem
  })));
};
var Tags_default = Tags;

// app/components/Menu.tsx
var import_react39 = __toESM(require("react"));
var Menu = ({ children }) => {
  const containerRef = (0, import_react39.useRef)();
  const [shouldOpenLeft, setShouldOpenLeft] = (0, import_react39.useState)(true);
  const [isOpen, setIsOpen] = (0, import_react39.useState)(false);
  (0, import_react39.useEffect)(() => {
    const container = containerRef.current;
    if (container) {
      const { x } = container.getBoundingClientRect();
      if (x < 200) {
        setShouldOpenLeft(false);
      }
    }
  }, []);
  const onIconClicked = (0, import_react39.useCallback)((event) => {
    event.stopPropagation();
    setIsOpen(true);
  }, []);
  const onBackgroundClicked = (0, import_react39.useCallback)((event) => {
    event.stopPropagation();
    setIsOpen(false);
  }, []);
  const childrenAsArray = Array.isArray(children) ? children : [children];
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ import_react39.default.createElement("div", {
    className: "relative",
    ref: containerRef
  }, /* @__PURE__ */ import_react39.default.createElement("button", {
    className: "btn-secondary",
    onClick: onIconClicked,
    "aria-label": isOpen ? "Close Menu" : "Show Menu"
  }, /* @__PURE__ */ import_react39.default.createElement("i", {
    className: "material-icons"
  }, "expand_more")), isOpen && /* @__PURE__ */ import_react39.default.createElement(import_react39.default.Fragment, null, /* @__PURE__ */ import_react39.default.createElement("div", {
    className: "fixed top-0 right-0 bottom-0 left-0",
    onClick: onBackgroundClicked
  }), /* @__PURE__ */ import_react39.default.createElement("ul", {
    className: `absolute top-9 ${shouldOpenLeft ? "right-0 text-right" : "left-0 text-left"} flex flex-col bg-white rounded shadow-xl`
  }, childrenAsArray.map((child, index) => /* @__PURE__ */ import_react39.default.createElement("li", {
    className: `cursor-pointer first:rounded-t last:rounded-b text-sm text-gray-500 font-bold whitespace-nowrap hover:bg-gray-200 ${index === 0 ? "hover:rounded-t" : ""} ${index === childrenAsArray.length - 1 ? "hover:rounded-b" : ""}`,
    key: index
  }, child)))));
};
var Menu_default = Menu;

// app/components/SaveItemButton.tsx
var import_react42 = require("react");
var import_react43 = require("@remix-run/react");
var import_client22 = require("@apollo/client");

// app/hooks/useAudioItem.ts
var import_react40 = require("react");
var import_client20 = require("@apollo/client");
var AUDIO_ITEM_QUERY = import_client20.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

// app/hooks/useSavedItemsForUser.ts
var import_react41 = require("react");
var import_client21 = require("@apollo/client");
var SAVED_ITEMS_FOR_USER_QUERY = import_client21.gql`
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
  const [makeQuery, query] = (0, import_client21.useLazyQuery)(SAVED_ITEMS_FOR_USER_QUERY, { fetchPolicy: "cache-first" });
  (0, import_react41.useEffect)(() => {
    if (currentUser) {
      makeQuery();
    }
  }, [makeQuery, currentUser]);
  const savedItemsForUser = (_a = query.data) == null ? void 0 : _a.savedItemsForUser;
  return [savedItemsForUser, query];
};
var useSavedItemsForUser_default = useSavedItemsForUser;

// app/components/SaveItemButton.tsx
var CREATE_SAVED_ITEM_MUTATION = import_client22.gql`
	mutation CreateSavedItem($input: CreateSavedItemInput!) {
		createSavedItem(input: $input) {
			id
		}
	}
`;
var DELETE_SAVED_ITEM_MUTATION = import_client22.gql`
	mutation DeleteSavedItem($input: DeleteSavedItemInput!) {
		deleteSavedItem(input: $input)
	}
`;
var SaveItemButton = ({ audioItem }) => {
  const { id, slug, isSavedByUser } = audioItem;
  const navigate = (0, import_react43.useNavigate)();
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [refetchAudioItem] = (0, import_client22.useLazyQuery)(AUDIO_ITEM_QUERY, {
    fetchPolicy: "network-only"
  });
  const [, { refetch: refetchSavedItemsForUser }] = useSavedItemsForUser_default();
  const [
    createSavedItem,
    { loading: createLoading, data: createData, error: createError }
  ] = (0, import_client22.useMutation)(CREATE_SAVED_ITEM_MUTATION, { errorPolicy: "all" });
  const [
    deleteSavedItem,
    { loading: deleteLoading, data: deleteData, error: deleteError }
  ] = (0, import_client22.useMutation)(DELETE_SAVED_ITEM_MUTATION, { errorPolicy: "all" });
  const onButtonClicked = (0, import_react42.useCallback)(async () => {
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
  (0, import_react42.useEffect)(() => {
    const refetch2 = async () => {
      await refetchAudioItem({ variables: { slug } });
      refetchSavedItemsForUser();
    };
    if (createData) {
      refetch2();
    }
  }, [createData, refetchAudioItem, refetchSavedItemsForUser, slug]);
  (0, import_react42.useEffect)(() => {
    if (createError) {
      window.alert("Error saving item. Please try again.");
    }
  }, [createError]);
  (0, import_react42.useEffect)(() => {
    const refetch2 = async () => {
      await refetchAudioItem({ variables: { slug } });
      refetchSavedItemsForUser();
    };
    if (deleteData) {
      refetch2();
    }
  }, [deleteData, refetchAudioItem, refetchSavedItemsForUser, slug]);
  (0, import_react42.useEffect)(() => {
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
var import_react46 = require("react");
var import_react47 = require("@remix-run/react");

// app/components/CreateCommentForm.tsx
var import_react45 = require("react");
var import_client24 = require("@apollo/client");

// app/hooks/useComments.ts
var import_react44 = require("react");
var import_client23 = require("@apollo/client");
var COMMENTS_QUERY = import_client23.gql`
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
  const [getComments, commentsQuery] = (0, import_client23.useLazyQuery)(COMMENTS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data: data2, fetchMore } = commentsQuery;
  (0, import_react44.useEffect)(() => {
    getComments({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getComments, resultsPerPage]);
  const comments = data2 == null ? void 0 : data2.comments;
  const fetchNextPageOfComments = (0, import_react44.useCallback)(() => {
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
var CREATE_COMMENT_MUTATION = import_client24.gql`
	mutation CreateComment($input: CreateCommentInput!) {
		createComment(input: $input) {
			...CommentWithoutParentEntity
		}
	}
	${CommentFragments.commentWithoutParentEntity}
`;
var CreateCommentForm = ({ parentEntity, onSuccess }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [text, setText] = (0, import_react45.useState)("");
  const [createComment, { loading, data: data2, error: error2 }] = (0, import_client24.useMutation)(CREATE_COMMENT_MUTATION, { errorPolicy: "all" });
  const {
    commentsQuery: { refetch: refetchTopLevelComments }
  } = useComments_default();
  const onSubmit = (0, import_react45.useCallback)(async (event) => {
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
  (0, import_react45.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createComment) {
      setText("");
      if (onSuccess) {
        onSuccess(data2.createComment);
      }
      refetchTopLevelComments();
    }
  }, [data2, refetchTopLevelComments]);
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
  }), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-3"
  }, error2.message));
};
var CreateCommentForm_default = CreateCommentForm;

// app/components/ViewCommentsButton.tsx
var ViewCommentsButton = ({ audioItem }) => {
  const { comments } = audioItem;
  const commentsCount = comments.length;
  const commentsRef = (0, import_react46.useRef)();
  const [modalIsVisible, setModalIsVisible] = (0, import_react46.useState)(false);
  const onViewCommentsButtonClicked = (0, import_react46.useCallback)(async () => {
    setModalIsVisible(true);
  }, []);
  const onCloseModal = (0, import_react46.useCallback)(() => setModalIsVisible(false), []);
  (0, import_react46.useEffect)(() => {
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
  }, comments.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "max-h-1/2 overflow-auto"
  }, comments.map(({ createdByUser, createdAt, text }, index) => /* @__PURE__ */ React.createElement("div", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm mb-1 flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(import_react47.Link, {
    to: `/users/${createdByUser == null ? void 0 : createdByUser.id}`,
    className: "mr-1 flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("span", null, createdByUser == null ? void 0 : createdByUser.username)), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm whitespace-pre-line text-gray-900"
  }, text)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement(CreateCommentForm_default, {
    parentEntity: audioItem,
    onSuccess: () => {
    }
  }))));
};
var ViewCommentsButton_default = ViewCommentsButton;

// app/components/TimeMarkers.tsx
var import_react48 = require("react");
var import_react49 = require("@remix-run/react");
var TimeMarkers = ({ audioItem }) => {
  const { tagsAsSubject } = audioItem;
  const {
    activeAudioItem,
    setActiveAudioItem,
    playbackPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default();
  const timeMarkersWithTags = (0, import_react48.useMemo)(() => {
    const output = {};
    if (!tagsAsSubject) {
      return output;
    }
    const filteredTags = tagsAsSubject.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
    filteredTags.sort((a, b) => a.subjectTimeMarkerSeconds ?? 0 - (b.subjectTimeMarkerSeconds ?? 0));
    filteredTags.forEach((tag) => {
      if (typeof tag.subjectTimeMarkerSeconds !== "number") {
        return;
      }
      const existingTagsAtTimeMarker = output[tag.subjectTimeMarkerSeconds] ?? [];
      output[tag.subjectTimeMarkerSeconds] = [...existingTagsAtTimeMarker, tag];
    });
    return output;
  }, [tagsAsSubject]);
  const onTimeMarkerClicked = (0, import_react48.useCallback)((event, timeMarker) => {
    if (event.target.id === "time-marker-tag-link") {
      event.stopPropagation();
      return;
    }
    if ((activeAudioItem == null ? void 0 : activeAudioItem.id) !== audioItem.id) {
      setActiveAudioItem(audioItem);
    }
    setSeekPositionSeconds(parseInt(timeMarker));
  }, [audioItem, activeAudioItem, setActiveAudioItem, setSeekPositionSeconds]);
  const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
  const activeTimeMarker = (0, import_react48.useMemo)(() => {
    if (!audioItemIsInPlayer) {
      return void 0;
    }
    let result;
    Object.keys(timeMarkersWithTags).forEach((timeMarker) => {
      if (parseInt(timeMarker) <= (playbackPositionSeconds ?? 0)) {
        result = timeMarker;
      }
    });
    return result;
  }, [audioItemIsInPlayer, timeMarkersWithTags, playbackPositionSeconds]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, Object.entries(timeMarkersWithTags).map(([timeMarker, tagsAsSubjectAtTimeMarker], index) => {
    const isActive = activeTimeMarker === timeMarker;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-start md:items-center justify-start mb-2 last:mb-1 text-sm",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row w-16 flex-shrink-0"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "w-3 text-left"
    }, isActive && ">"), /* @__PURE__ */ React.createElement("button", {
      className: "link",
      onClick: (event) => onTimeMarkerClicked(event, timeMarker)
    }, DateTime_default.formatSecondsAsDuration(parseInt(timeMarker)))), /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col md:flex-row"
    }, tagsAsSubjectAtTimeMarker.map((tag, index2) => {
      const objectEntity = Tag_default.getObjectEntity(tag);
      if (!objectEntity) {
        return null;
      }
      return /* @__PURE__ */ React.createElement("span", {
        className: "flex flex-row items-center",
        key: index2
      }, /* @__PURE__ */ React.createElement(import_react49.Link, {
        to: Entity_default.makeHrefForView(objectEntity),
        id: "time-marker-tag-link"
      }, objectEntity.name, objectEntity.entityType === "Tune" /* Tune */ ? ` (${objectEntity.type})` : ""), index2 !== tagsAsSubjectAtTimeMarker.length - 1 && /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block mr-1"
      }, ","));
    })));
  }));
};
var TimeMarkers_default = TimeMarkers;

// app/components/RequestTakedownButton.tsx
var import_react51 = require("react");
var import_client26 = require("@apollo/client");

// app/components/CreateTakedownRequestForm.tsx
var import_react50 = require("react");
var import_client25 = require("@apollo/client");
var CREATE_TAKEDOWN_REQUEST = import_client25.gql`
	mutation CreateTakedownRequest($input: CreateTakedownRequestInput!) {
		createTakedownRequest(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;
var CreateTakedownRequestForm = ({ entity, onSuccess }) => {
  const defaultType = Object.keys(TakedownRequestType)[0];
  const [type, setType] = (0, import_react50.useState)(defaultType);
  const [message, setMessage] = (0, import_react50.useState)("");
  const [validationError, setValidationError] = (0, import_react50.useState)("");
  const [createTakedownRequest, { loading, data: data2, error: error2 }] = (0, import_client25.useMutation)(CREATE_TAKEDOWN_REQUEST, { errorPolicy: "all" });
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
  const onSubmitForm = (0, import_react50.useCallback)((event) => {
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
  (0, import_react50.useEffect)(() => {
    var _a;
    if (((_a = data2 == null ? void 0 : data2.createTakedownRequest) == null ? void 0 : _a.id) && onSuccess) {
      onSuccess(data2.createTakedownRequest);
    }
  }, [data2, onSuccess]);
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
  }, validationError), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, "Error submitting Takedown Request. Please reload the page and try again."));
};
var CreateTakedownRequestForm_default = CreateTakedownRequestForm;

// app/components/RequestTakedownButton.tsx
var TAKEDOWN_REQUESTS_FOR_ENTITY = import_client26.gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;
var RequestTakedownButton = ({ entity, onTakedownRequestCreated }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [modalIsVisible, setModalIsVisible] = (0, import_react51.useState)(false);
  const closeModal = (0, import_react51.useCallback)(() => setModalIsVisible(false), []);
  const { loading, data: data2, error: error2, refetch: refetch2 } = (0, import_client26.useQuery)(TAKEDOWN_REQUESTS_FOR_ENTITY, {
    variables: {
      input: {
        entityType: entity.entityType,
        entityId: entity.id
      }
    },
    skip: !modalIsVisible
  });
  const takedownRequests = (data2 == null ? void 0 : data2.takedownRequestsForEntity) ?? [];
  const onButtonClicked = (0, import_react51.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(entity);
      await requireLogin({ redirectTo });
    } else {
      setModalIsVisible(true);
    }
  }, [currentUser, entity, requireLogin]);
  const onSuccess = (0, import_react51.useCallback)(async (takedownRequest) => {
    try {
      await refetch2();
      if (onTakedownRequestCreated) {
        await onTakedownRequestCreated(takedownRequest);
      }
    } catch {
    }
  }, [refetch2, onTakedownRequestCreated]);
  const modalContent = (0, import_react51.useMemo)(() => {
    const pendingTakedown = takedownRequests.find(isPendingTakedownRequest);
    const approvedTakedown = takedownRequests.find(isApprovedTakedownRequest);
    if (loading) {
      return /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
    } else if (error2) {
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
  }, [loading, error2, takedownRequests, refetch2, entity]);
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
  const {
    name,
    slug,
    description,
    tagsAsSubject: tags,
    status,
    createdByUser,
    createdAt
  } = audioItem;
  const navigate = (0, import_react54.useNavigate)();
  const {
    activeAudioItem,
    setActiveAudioItem,
    activeItemDurationSeconds,
    playbackPositionSeconds
  } = usePlayerContext_default();
  const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
  const tagsWithTimeMarkers = (0, import_react52.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    return tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
  }, [tags]);
  const onPlayPressed = (0, import_react52.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]);
  const onTakedownRequestCreated = (0, import_react52.useCallback)((takedownRequest) => {
    if (takedownRequest.status === "APPROVED") {
      navigate(`/entities/audio-items/${slug}`);
    }
  }, [navigate, slug]);
  const shouldShowPositionAndDuration = audioItemIsInPlayer && typeof playbackPositionSeconds === "number" && typeof activeItemDurationSeconds === "number";
  const positionAndDuration = `${DateTime_default.formatSecondsAsDuration(playbackPositionSeconds ?? 0)} / ${DateTime_default.formatSecondsAsDuration(activeItemDurationSeconds ?? 0)}`;
  const isTakenDown = status === "TAKEN_DOWN";
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`
  }, showTitle && /* @__PURE__ */ React.createElement("h2", {
    className: "mb-2"
  }, /* @__PURE__ */ React.createElement(import_react53.Link, {
    to: `/entities/audio-items/${slug}`,
    className: "no-underline text-gray-700"
  }, name)), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(Tags_default, {
    audioItem
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
    className: "material-icons text-teal-600 hover:text-teal-800"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-6xl"
  }, "play_arrow"))), /* @__PURE__ */ React.createElement("div", {
    className: `ml-4 text-gray-500 opacity-0 ${shouldShowPositionAndDuration ? "opacity-100 transition-opacity delay-500 duration-400" : ""}`
  }, positionAndDuration)))), tagsWithTimeMarkers.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "mx-4 mb-2 pt-3 border-t border-gray-200"
  }, /* @__PURE__ */ React.createElement(TimeMarkers_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm flex flex-col sm:flex-row"
  }, "Added", createdByUser && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", "by", " ", /* @__PURE__ */ React.createElement(import_react53.Link, {
    to: `/users/${createdByUser.id}`,
    className: "flex flex-row px-0 sm:px-1"
  }, createdByUser.username)), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
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
var import_react55 = require("react");
var import_react56 = require("@remix-run/react");
var AudioItemCompact = ({ audioItem, className }) => {
  const { name, slug, description, tagsAsSubject, status } = audioItem;
  const isTakenDown = status === "TAKEN_DOWN" /* TakenDown */;
  const sortedTags = (0, import_react55.useMemo)(() => Tag_default.sort(tagsAsSubject), [tagsAsSubject]);
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  const onPlayPressed = (0, import_react55.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]);
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
      className: "material-icons text-6xl text-teal-600 hover:text-teal-800"
    }, "play_arrow"));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start bg-white shadow-md rounded pt-2 px-3 pb-1 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react56.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, "Tags:", sortedTags.map((tag, index) => {
    const objectEntity = Tag_default.getObjectEntity(tag);
    if (!objectEntity) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: "ml-1 whitespace-pre"
    }, /* @__PURE__ */ React.createElement(import_react56.Link, {
      to: Entity_default.makeHrefForView(objectEntity)
    }, objectEntity.name, objectEntity.entityType === "Tune" /* Tune */ ? ` (${objectEntity.type})` : ""), index !== sortedTags.length - 1 && ", ");
  }), /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: audioItem,
    className: "ml-2"
  }), (tagsAsSubject == null ? void 0 : tagsAsSubject.length) > 0 && /* @__PURE__ */ React.createElement("div", {
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
var import_react57 = require("react");
var import_react58 = require("@remix-run/react");
var AudioItemTextOnly = ({ audioItem, className }) => {
  const { name, slug, tagsAsSubject, status } = audioItem;
  const isTakenDown = status === "TAKEN_DOWN" /* TakenDown */;
  const sortedTags = (0, import_react57.useMemo)(() => Tag_default.sort(tagsAsSubject), [tagsAsSubject]);
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  const onPlayPressed = (0, import_react57.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]);
  const playButtonMarkup = (0, import_react57.useMemo)(() => {
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
  }, /* @__PURE__ */ React.createElement(import_react58.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Tags:"), sortedTags.map((tag, index) => {
    const objectEntity = Tag_default.getObjectEntity(tag);
    return /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: "ml-1 whitespace-pre"
    }, /* @__PURE__ */ React.createElement(import_react58.Link, {
      to: Entity_default.makeHrefForView(objectEntity)
    }, objectEntity == null ? void 0 : objectEntity.name), index !== sortedTags.length - 1 && ", ");
  }))));
};
var AudioItemTextOnly_default = AudioItemTextOnly;

// app/components/AudioItem.tsx
var AudioItemComponent = ({
  viewAs,
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug.tsx
async function loader({
  params
}) {
  const { slug } = params;
  const audioItem = await db.audioItem.findUnique({
    where: {
      slug
    },
    include: {
      tagsAsSubject: {
        include: {
          objectAudioItem: true,
          objectCollection: true,
          objectInstrument: true,
          objectPerson: true,
          objectPlace: true,
          objectTune: true,
          relationship: true
        }
      },
      createdByUser: true,
      updatedByUser: true,
      comments: {
        include: {
          createdByUser: true
        }
      }
    }
  });
  if (!audioItem) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this AudioItem"
    });
  }
  return {
    audioItem
  };
}
var ViewAudioItemBySlug = () => {
  const { audioItem } = (0, import_react59.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-6"
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: Entity_default.makeReadableNamePlural(audioItem),
        href: Entity_default.makeHrefForTopLevel(audioItem)
      },
      { label: audioItem.name }
    ],
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement(import_react59.Link, {
    to: Entity_default.makeHrefForAbout(audioItem)
  }, "About"))), /* @__PURE__ */ React.createElement(AudioItem_default, {
    audioItem,
    viewAs: "Cards" /* Cards */
  }));
};
var slug_default = ViewAudioItemBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => about_default
});
var import_react60 = require("@remix-run/react");
var import_react61 = require("@remix-run/react");
var AudioItemAbout = () => {
  const navigate = (0, import_react61.useNavigate)();
  const { slug } = navigate.query;
  const { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.audioItem) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react60.Link, {
    to: `/entities/audio-items/${slug}/edit`
  }, "Edit")));
};
var about_default = AudioItemAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/edit.tsx
var edit_exports = {};
__export(edit_exports, {
  default: () => edit_default
});
var import_react64 = require("@remix-run/react");
var import_client28 = require("@apollo/client");

// app/components/EditAudioItemForm.tsx
var import_react62 = require("react");
var import_client27 = require("@apollo/client");
var import_react63 = require("@remix-run/react");
var UPDATE_AUDIO_ITEM_MUTATION = import_client27.gql`
	mutation UpdateAudioItem($slug: String!, $input: UpdateAudioItemInput!) {
		updateAudioItem(slug: $slug, input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var EditAudioItemForm = ({ audioItem, onSuccess }) => {
  const navigate = (0, import_react63.useNavigate)();
  const [updateAudioItem, { loading, error: error2, data: data2 }] = (0, import_client27.useMutation)(UPDATE_AUDIO_ITEM_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react62.useState)(audioItem.name);
  const [aliases, setAliases] = (0, import_react62.useState)(audioItem.aliases);
  const [description, setDescription] = (0, import_react62.useState)(audioItem.description);
  const onUpdateAudioItem = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateAudioItem({ variables: { slug: audioItem.slug, input } });
  };
  (0, import_react62.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updateAudioItem) {
      if (onSuccess) {
        return onSuccess(data2.updateAudioItem);
      }
      window.alert("AudioItem updated successfully!");
    }
  }, [data2, navigate]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var EditAudioItemForm_default = EditAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/edit.tsx
var AUDIO_ITEM_QUERY2 = import_client28.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var EditAudioItem = () => {
  const navigate = (0, import_react64.useNavigate)();
  const { slug } = navigate.query;
  const { data: data2, error: error2 } = (0, import_client28.useQuery)(AUDIO_ITEM_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (audioItem2) => {
    navigate(`/entities/audio-items/${audioItem2.slug}`);
  };
  let statusMessage;
  if (!data2 && !error2) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data2 && error2) {
    statusMessage = `Error fetching AudioItem with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { audioItem } = data2;
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  default: () => tags_default
});
var import_react65 = require("react");
var import_react66 = require("@remix-run/react");
var ViewAudioItemTags = () => {
  const navigate = (0, import_react66.useNavigate)();
  const { slug } = navigate.query;
  (0, import_react65.useEffect)(() => {
    if (slug) {
      navigate(`/entities/audio-items/${slug}`);
    }
  }, [navigate, slug]);
  return null;
};
var tags_default = ViewAudioItemTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/index.tsx
var audio_items_exports = {};
__export(audio_items_exports, {
  default: () => audio_items_default
});
var import_react67 = require("react");
var import_react68 = require("@remix-run/react");
var ViewAudioItems = () => {
  const navigate = (0, import_react68.useNavigate)();
  (0, import_react67.useEffect)(() => {
    navigate("/");
  }, [navigate]);
  return null;
};
var audio_items_default = ViewAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug.tsx
var slug_exports2 = {};
__export(slug_exports2, {
  default: () => slug_default2,
  loader: () => loader2
});
var import_react74 = require("@remix-run/react");

// app/components/ViewEntityAndAudioItems.tsx
var import_react72 = require("react");
var import_react73 = require("@remix-run/react");
var import_react_intersection_observer = require("react-intersection-observer");

// app/hooks/useFilters.ts
var import_react70 = require("react");
var import_react71 = require("@remix-run/react");

// app/components/Filters.tsx
var import_react69 = __toESM(require("react"));
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
  const totalPages = (0, import_react69.useMemo)(() => {
    if (typeof totalItems !== "number" || typeof perPage === "undefined") {
      return 0;
    }
    return Math.ceil(totalItems / perPage);
  }, [totalItems, perPage]);
  const pageSelectOptions = (0, import_react69.useMemo)(() => {
    const output = [];
    let i = 1;
    while (i <= totalPages) {
      output.push(/* @__PURE__ */ import_react69.default.createElement("option", {
        value: i,
        key: i
      }, i));
      i++;
    }
    return output;
  }, [totalPages]);
  const perPageOptions = (0, import_react69.useMemo)(() => {
    const output = [];
    for (const value in PerPage) {
      if (isNaN(Number(value))) {
        continue;
      }
      output.push(/* @__PURE__ */ import_react69.default.createElement("option", {
        value,
        key: value
      }, value));
    }
    return output;
  }, []);
  return /* @__PURE__ */ import_react69.default.createElement("div", {
    className: `flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 ${className ?? ""}`
  }, shouldRenderPagination && /* @__PURE__ */ import_react69.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderSortBy || shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, /* @__PURE__ */ import_react69.default.createElement("div", {
    className: "mr-6"
  }, "Page", " ", /* @__PURE__ */ import_react69.default.createElement("select", {
    value: page,
    onChange: onChangePage
  }, pageSelectOptions), totalPages ? ` of ${totalPages}` : ""), /* @__PURE__ */ import_react69.default.createElement("div", null, /* @__PURE__ */ import_react69.default.createElement("select", {
    value: perPage,
    onChange: onChangePerPage
  }, perPageOptions), " ", "per page")), shouldRenderSortBy && /* @__PURE__ */ import_react69.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, "Sort by", /* @__PURE__ */ import_react69.default.createElement("select", {
    className: "ml-1",
    value: sortBy,
    onChange: onChangeSortBy
  }, /* @__PURE__ */ import_react69.default.createElement("option", {
    value: "RecentlyTagged" /* RecentlyTagged */
  }, "Recently tagged"), /* @__PURE__ */ import_react69.default.createElement("option", {
    value: "RecentlyAdded" /* RecentlyAdded */
  }, "Recently added"))), shouldRenderViewAs && /* @__PURE__ */ import_react69.default.createElement("div", {
    className: "flex flex-row items-center mr-0 md:mb-0"
  }, "View as", /* @__PURE__ */ import_react69.default.createElement("select", {
    className: "ml-1",
    value: viewAs,
    onChange: onChangeViewAs
  }, /* @__PURE__ */ import_react69.default.createElement("option", {
    value: "Cards" /* Cards */
  }, "Cards"), /* @__PURE__ */ import_react69.default.createElement("option", {
    value: "Compact" /* Compact */
  }, "Compact"), /* @__PURE__ */ import_react69.default.createElement("option", {
    value: "List" /* List */
  }, "List"))));
};
var Filters_default = Filters;

// app/hooks/useFilters.ts
var useFilters = ({
  totalItems,
  defaultPage = 1,
  defaultPerPage = 20,
  defaultSortBy = "RecentlyTagged" /* RecentlyTagged */,
  defaultViewAs = "Cards" /* Cards */
} = {}) => {
  const navigate = (0, import_react71.useNavigate)();
  const { pathname, search } = (0, import_react71.useLocation)();
  const queryParams = new URLSearchParams(search);
  const page = parseInt(queryParams.get("page") ?? "", 10) || defaultPage;
  const perPage = parseInt(queryParams.get("perPage") ?? "", 10) || defaultPerPage;
  const sortBy = queryParams.get("sortBy") ?? defaultSortBy;
  const viewAs = queryParams.get("viewAs") ?? defaultViewAs;
  const updateQueryParams = (0, import_react70.useCallback)((paramsToUpdate = {}) => {
    const queryParams2 = new URLSearchParams(search);
    const paramNames = Object.keys(paramsToUpdate);
    paramNames.forEach((paramName) => {
      const value = paramsToUpdate[paramName];
      if (value) {
        queryParams2.set(paramName, value);
      } else {
        queryParams2.delete(paramName);
      }
    });
    return navigate(`${pathname}?${queryParams2.toString()}`);
  }, [navigate, pathname, search]);
  const onChangePage = (0, import_react70.useCallback)((event) => updateQueryParams({ page: event.target.value }), [updateQueryParams]);
  const onChangePerPage = (0, import_react70.useCallback)((event) => updateQueryParams({ perPage: event.target.value, page: "1" }), [updateQueryParams]);
  const onChangeSortBy = (0, import_react70.useCallback)((event) => updateQueryParams({ sortBy: event.target.value }), [updateQueryParams]);
  const onChangeViewAs = (0, import_react70.useCallback)((event) => updateQueryParams({ viewAs: event.target.value }), [updateQueryParams]);
  const returnValue = (0, import_react70.useMemo)(() => ({
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
var ViewEntityAndAudioItems = ({
  entity,
  audioItems,
  totalAudioItems,
  className
}) => {
  const { name } = entity ?? {};
  const { ref: metadataRef, inView: metadataInView } = (0, import_react_intersection_observer.useInView)({
    initialInView: true
  });
  const { search } = (0, import_react73.useLocation)();
  const queryParams = new URLSearchParams(search);
  const viewAs = queryParams.get("viewAs");
  const { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalAudioItems
  });
  const filtersRef = (0, import_react72.useRef)(null);
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
  }, totalAudioItems ?? "", " Audio Item", totalAudioItems === 1 ? "" : "s"), /* @__PURE__ */ React.createElement(import_react73.Link, {
    to: Entity_default.makeHrefForAbout(entity),
    className: "ml-4"
  }, "About"), /* @__PURE__ */ React.createElement(import_react73.Link, {
    to: Entity_default.makeHrefForTags(entity),
    className: "ml-4"
  }, "Tags")), totalAudioItems > 0 && /* @__PURE__ */ React.createElement("div", {
    ref: filtersRef
  }, /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps)))), totalAudioItems > 0 && audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs: viewAs ?? "Cards" /* Cards */,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })), /* @__PURE__ */ React.createElement("div", {
    className: `${metadataInView ? "hidden" : "visible"} fixed left-0 right-0 p-4 bg-gray-100 shadow-lg top-[48px]`
  }, totalAudioItems > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps))));
};
var ViewEntityAndAudioItems_default = ViewEntityAndAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug.tsx
async function loader2({
  params,
  request
}) {
  const { slug } = params;
  const collection = await db.collection.findUnique({
    where: {
      slug
    }
  });
  if (!collection) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Collection"
    });
  }
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 20);
  const sortBy = searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */;
  const audioItemsOrderBy = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" };
  const [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: true,
            objectCollection: true,
            objectInstrument: true,
            objectPerson: true,
            objectPlace: true,
            objectTune: true,
            relationship: true
          }
        },
        createdByUser: true,
        updatedByUser: true,
        comments: {
          include: {
            createdByUser: true
          }
        }
      },
      where: {
        tagsAsObject: {
          some: {
            subjectCollectionId: collection.id
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.audioItem.count({
      where: {
        tagsAsObject: {
          some: {
            subjectCollectionId: collection.id
          }
        }
      }
    })
  ]);
  return {
    collection,
    audioItems,
    totalAudioItems
  };
}
var ViewCollectionBySlug = () => {
  const { collection, audioItems, totalAudioItems } = (0, import_react74.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: collection,
    audioItems,
    totalAudioItems
  }));
};
var slug_default2 = ViewCollectionBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/about.tsx
var about_exports2 = {};
__export(about_exports2, {
  default: () => about_default2
});
var import_react75 = require("@remix-run/react");
var import_react76 = require("@remix-run/react");
var CollectionAbout = () => {
  const navigate = (0, import_react76.useNavigate)();
  const { slug } = navigate.query;
  const { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.collection) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react75.Link, {
    to: `/entities/collections/${slug}/edit`
  }, "Edit")));
};
var about_default2 = CollectionAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/edit.tsx
var edit_exports2 = {};
__export(edit_exports2, {
  default: () => edit_default2
});
var import_react79 = require("@remix-run/react");
var import_client30 = require("@apollo/client");

// app/components/EditCollectionForm.tsx
var import_react77 = require("react");
var import_client29 = require("@apollo/client");
var import_react78 = require("@remix-run/react");
var UPDATE_COLLECTION_MUTATION = import_client29.gql`
	mutation UpdateCollection($slug: String!, $input: UpdateCollectionInput!) {
		updateCollection(slug: $slug, input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var EditCollectionForm = ({ collection, onSuccess }) => {
  const navigate = (0, import_react78.useNavigate)();
  const [updateCollection, { loading, error: error2, data: data2 }] = (0, import_client29.useMutation)(UPDATE_COLLECTION_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react77.useState)(collection.name);
  const [aliases, setAliases] = (0, import_react77.useState)(collection.aliases);
  const [description, setDescription] = (0, import_react77.useState)(collection.description);
  const onUpdateCollection = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateCollection({ variables: { slug: collection.slug, input } });
  };
  (0, import_react77.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updateCollection) {
      if (onSuccess) {
        return onSuccess(data2.updateCollection);
      }
      window.alert("Collection updated successfully!");
    }
  }, [data2, navigate]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var EditCollectionForm_default = EditCollectionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/edit.tsx
var COLLECTION_QUERY = import_client30.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var CollectionEdit = () => {
  const navigate = (0, import_react79.useNavigate)();
  const { slug } = navigate.query;
  const { data: data2, error: error2 } = (0, import_client30.useQuery)(COLLECTION_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (collection2) => {
    navigate(`/entities/collections/${collection2.slug}/about`);
  };
  let statusMessage;
  if (!data2 && !error2) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data2 && error2) {
    statusMessage = `Error fetching Collection with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { collection } = data2;
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/tags.tsx
var tags_exports2 = {};
__export(tags_exports2, {
  default: () => tags_default2
});
var import_react81 = require("@remix-run/react");

// app/components/TagWithRelationshipToObject.tsx
var import_react80 = require("@remix-run/react");
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
  }, objectEntity.entityType), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react80.Link, {
    to: Entity_default.makeHrefForView(objectEntity)
  }, objectEntity.name), /* @__PURE__ */ React.createElement("br", null), typeof subjectTimeMarkerSeconds === "number" && /* @__PURE__ */ React.createElement("em", null, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`));
};
var TagWithRelationshipToObject_default = TagWithRelationshipToObject;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/tags.tsx
var CollectionTags = () => {
  const navigate = (0, import_react81.useNavigate)();
  const { slug } = navigate.query;
  const { collection } = data ?? {};
  const { name, tags } = collection ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default,
  loader: () => loader3,
  meta: () => meta2
});
var import_react82 = require("@remix-run/react");
function meta2() {
  return {
    title: "Trad Archive - Collections"
  };
}
function loader3() {
  return db.collection.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Collections = () => {
  const collections = (0, import_react82.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Collections"), collections.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Collections found"), collections.length > 0 && /* @__PURE__ */ React.createElement("ul", null, collections.map((collection, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react82.Link, {
    to: Entity_default.makeHrefForView(collection)
  }, collection.name)))));
};
var collections_default = Collections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug.tsx
var slug_exports3 = {};
__export(slug_exports3, {
  default: () => slug_default3,
  loader: () => loader4
});
var import_react83 = require("@remix-run/react");
async function loader4({
  params,
  request
}) {
  const { slug } = params;
  const instrument = await db.instrument.findUnique({
    where: {
      slug
    }
  });
  if (!instrument) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Instrument"
    });
  }
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 20);
  const sortBy = searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */;
  const audioItemsOrderBy = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" };
  const [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: true,
            objectCollection: true,
            objectInstrument: true,
            objectPerson: true,
            objectPlace: true,
            objectTune: true,
            relationship: true
          }
        },
        createdByUser: true,
        updatedByUser: true,
        comments: {
          include: {
            createdByUser: true
          }
        }
      },
      where: {
        tagsAsObject: {
          some: {
            subjectInstrumentId: instrument.id
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.audioItem.count({
      where: {
        tagsAsObject: {
          some: {
            subjectInstrumentId: instrument.id
          }
        }
      }
    })
  ]);
  return {
    instrument,
    audioItems,
    totalAudioItems
  };
}
var ViewInstrumentBySlug = () => {
  const { instrument, audioItems, totalAudioItems } = (0, import_react83.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: instrument,
    audioItems,
    totalAudioItems
  }));
};
var slug_default3 = ViewInstrumentBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/about.tsx
var about_exports3 = {};
__export(about_exports3, {
  default: () => about_default3
});
var import_react84 = require("@remix-run/react");
var import_react85 = require("@remix-run/react");
var InstrumentAbout = () => {
  const navigate = (0, import_react85.useNavigate)();
  const { slug } = navigate.query;
  const { name, description, aliases } = (data == null ? void 0 : data.instrument) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react84.Link, {
    to: `/entities/instruments/${slug}/edit`
  }, "Edit")));
};
var about_default3 = InstrumentAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/edit.tsx
var edit_exports3 = {};
__export(edit_exports3, {
  default: () => edit_default3
});
var import_react88 = require("@remix-run/react");
var import_client32 = require("@apollo/client");

// app/components/EditInstrumentForm.tsx
var import_react86 = require("react");
var import_client31 = require("@apollo/client");
var import_react87 = require("@remix-run/react");
var UPDATE_INSTRUMENT_MUTATION = import_client31.gql`
	mutation UpdateInstrument($slug: String!, $input: UpdateInstrumentInput!) {
		updateInstrument(slug: $slug, input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var EditInstrumentForm = ({ instrument, onSuccess }) => {
  const navigate = (0, import_react87.useNavigate)();
  const [updateInstrument, { loading, error: error2, data: data2 }] = (0, import_client31.useMutation)(UPDATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react86.useState)(instrument.name);
  const [aliases, setAliases] = (0, import_react86.useState)(instrument.aliases);
  const [description, setDescription] = (0, import_react86.useState)(instrument.description);
  const onUpdateInstrument = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateInstrument({ variables: { slug: instrument.slug, input } });
  };
  (0, import_react86.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updateInstrument) {
      if (onSuccess) {
        return onSuccess(data2.updateInstrument);
      }
      window.alert("Instrument updated successfully!");
    }
  }, [data2, navigate]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var EditInstrumentForm_default = EditInstrumentForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/edit.tsx
var INSTRUMENT_QUERY = import_client32.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var EditInstrument = () => {
  const navigate = (0, import_react88.useNavigate)();
  const { slug } = navigate.query;
  const { data: data2, error: error2 } = (0, import_client32.useQuery)(INSTRUMENT_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (instrument2) => {
    navigate(`/entities/instruments/${instrument2.slug}`);
  };
  let statusMessage;
  if (!data2 && !error2) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data2 && error2) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { instrument } = data2;
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/tags.tsx
var tags_exports3 = {};
__export(tags_exports3, {
  default: () => tags_default3
});
var import_react89 = require("@remix-run/react");
var InstrumentTags = () => {
  const navigate = (0, import_react89.useNavigate)();
  const { slug } = navigate.query;
  const { instrument } = data ?? {};
  const { name, tags } = instrument ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var instruments_exports = {};
__export(instruments_exports, {
  default: () => instruments_default,
  loader: () => loader5,
  meta: () => meta3
});
var import_react90 = require("@remix-run/react");
function meta3() {
  return {
    title: "Trad Archive - Instruments"
  };
}
function loader5() {
  return db.instrument.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Instruments = () => {
  const instruments = (0, import_react90.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Instruments"), instruments.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Instruments found"), instruments.length > 0 && /* @__PURE__ */ React.createElement("ul", null, instruments.map((instrument, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react90.Link, {
    to: Entity_default.makeHrefForView(instrument)
  }, instrument.name)))));
};
var instruments_default = Instruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/index.tsx
var submissions_exports = {};
__export(submissions_exports, {
  default: () => submissions_default
});
var import_react91 = require("@remix-run/react");
var import_client33 = require("@apollo/client");
var SUBMISSIONS_FOR_CURRENT_USER = import_client33.gql`
	query SubmissionsForCurrentUser {
		submissionsForCurrentUser {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var Submissions = () => {
  const { data: data2, loading } = (0, import_client33.useQuery)(SUBMISSIONS_FOR_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement(import_react91.Link, {
    to: "/account/submissions/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn"
  }, "Create New")), !data2 && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, {
    className: "mt-12"
  }), data2 && /* @__PURE__ */ React.createElement("ul", {
    className: "mt-12"
  }, data2.submissionsForCurrentUser.map((s, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-4",
    key: index
  }, DateTime_default.formatDateYearTime(s.createdAt, true), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, `${s.description.substring(0, 200)}${s.description.length > 200 ? "..." : ""}`), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react91.Link, {
    to: `/account/submissions/${s.id}/upload`
  }, "Upload More Files to This Submission"))))));
};
var submissions_default = Submissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var new_exports = {};
__export(new_exports, {
  default: () => new_default
});
var import_react94 = require("@remix-run/react");

// app/hooks/useAudioItems.ts
var import_react92 = require("react");
var import_client34 = require("@apollo/client");
var AUDIO_ITEMS_QUERY = import_client34.gql`
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
  const [skip, setSkip] = (0, import_react92.useState)(0);
  const [audioItems, setAudioItems] = (0, import_react92.useState)();
  (0, import_react92.useEffect)(() => {
    setAudioItems(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getAudioItems, audioItemsQuery] = (0, import_client34.useLazyQuery)(AUDIO_ITEMS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data: data2, fetchMore } = audioItemsQuery;
  (0, import_react92.useEffect)(() => {
    if (data2 == null ? void 0 : data2.audioItems) {
      setAudioItems(data2.audioItems);
    }
  }, [data2]);
  (0, import_react92.useEffect)(() => {
    getAudioItems({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0,
          status: "PUBLISHED" /* Published */
        }
      }
    });
  }, [getAudioItems, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react92.useCallback)(async () => {
    const numToSkip = (audioItems == null ? void 0 : audioItems.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          status: "PUBLISHED" /* Published */,
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
var import_react93 = require("react");
var import_client35 = require("@apollo/client");
var CREATE_AUDIO_ITEM_MUTATION = import_client35.gql`
	mutation CreateAudioItem($input: CreateAudioItemInput!) {
		createAudioItem(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var CreateAudioItemForm = ({ onSuccess }) => {
  const [createAudioItem, { loading, error: error2, data: data2 }] = (0, import_client35.useMutation)(CREATE_AUDIO_ITEM_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react93.useState)("");
  const [urlSource, setUrlSource] = (0, import_react93.useState)("");
  const [slug, setSlug] = (0, import_react93.useState)("");
  const [aliases, setAliases] = (0, import_react93.useState)("");
  const [description, setDescription] = (0, import_react93.useState)("");
  (0, import_react93.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateAudioItem = (event) => {
    event.preventDefault();
    createAudioItem({
      variables: { input: { name, urlSource, slug, aliases, description } }
    });
  };
  (0, import_react93.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createAudioItem) {
      if (onSuccess) {
        return onSuccess(data2.createAudioItem);
      }
      window.alert("Audio Item created successfully!");
      setName("");
      setUrlSource("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data2]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error2.message));
};
var CreateAudioItemForm_default = CreateAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var NewAudioItem = () => {
  const navigate = (0, import_react94.useNavigate)();
  const [_, { refetch: refetch2 }] = useAudioItems_default();
  const onCreateSuccess = async (audioItem) => {
    await refetch2();
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
var import_react95 = require("@remix-run/react");
var NewCollection = () => {
  const navigate = (0, import_react95.useNavigate)();
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
var import_react96 = require("@remix-run/react");
var NewInstrument = () => {
  const navigate = (0, import_react96.useNavigate)();
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
var import_react98 = require("@remix-run/react");

// app/components/CreateSubmissionForm.tsx
var import_react97 = require("react");
var import_client36 = require("@apollo/client");

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
var CREATE_SUBMISSION = import_client36.gql`
	mutation CreateSubmission($input: CreateSubmissionInput!) {
		createSubmission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var CreateSubmissionForm = ({ onSuccess }) => {
  const [currentUser] = useCurrentUser_default();
  const [materialTypes, setMaterialTypes] = (0, import_react97.useState)([]);
  const [userControlsCopyright, setUserControlsCopyright] = (0, import_react97.useState)(true);
  const [copyrightDetails, setCopyrightDetails] = (0, import_react97.useState)("");
  const [description, setDescription] = (0, import_react97.useState)("");
  const [userGrantsPermissionToITMA, setUserGrantsPermissionToITMA] = (0, import_react97.useState)(false);
  const [validationError, setValidationError] = (0, import_react97.useState)("");
  const [createSubmission, { loading, data: data2, error: error2 }] = (0, import_client36.useMutation)(CREATE_SUBMISSION, { errorPolicy: "all" });
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
  (0, import_react97.useEffect)(() => {
    var _a;
    if (((_a = data2 == null ? void 0 : data2.createSubmission) == null ? void 0 : _a.id) && onSuccess) {
      onSuccess(data2.createSubmission);
    }
  }, [data2, onSuccess]);
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
  }, validationError), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, "Error saving Submission. Please reload the page and try again."), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 italic mt-6"
  }, "As per ITMA's Data Protection policy the information provided on this form will not be used for any other purpose; it will be stored securely and will not be shared with any third parties."));
};
var CreateSubmissionForm_default = CreateSubmissionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var SubmissionsNew = () => {
  const navigate = (0, import_react98.useNavigate)();
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
var import_react99 = require("@remix-run/react");
var import_client37 = require("@apollo/client");
var SUBMISSIONS = import_client37.gql`
	query Submissions($input: SubmissionsInput!) {
		submissions(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var AdminSubmissions = () => {
  const { data: data2, loading } = (0, import_client37.useQuery)(SUBMISSIONS, {
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
  }), !data2 && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), data2 && /* @__PURE__ */ React.createElement("ul", null, data2.submissions.map((s, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-4",
    key: index
  }, DateTime_default.formatDateYearTime(s.createdAt, true), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), "From ", s.createdByUser.username, " / ", s.createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Owns copyright? ", s.userControlsCopyright ? "Yes" : "No", s.copyrightDetails ? ` - ${s.copyrightDetails}` : "", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, s.description), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react99.Link, {
    to: `/admin/submissions/${s.id}`
  }, "View Files"))))));
};
var submissions_default2 = AdminSubmissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/takedown-requests.tsx
var takedown_requests_exports = {};
__export(takedown_requests_exports, {
  default: () => takedown_requests_default
});
var import_react100 = require("react");
var import_client38 = require("@apollo/client");
var import_compareDesc3 = __toESM(require("date-fns/compareDesc"));
var TAKEDOWN_REQUESTS = import_client38.gql`
	query TakedownRequests($input: TakedownRequestsInput!) {
		takedownRequests(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;
var UPDATE_TAKEDOWN_REQUEST_STATUS = import_client38.gql`
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
  } = (0, import_client38.useQuery)(TAKEDOWN_REQUESTS, {
    variables: { input: { take: 200, skip: 0 } },
    fetchPolicy: "network-only"
  });
  const takedownRequests = (0, import_react100.useMemo)(() => {
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
  ] = (0, import_client38.useMutation)(UPDATE_TAKEDOWN_REQUEST_STATUS, { errorPolicy: "all" });
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
  (0, import_react100.useEffect)(() => {
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
var import_react101 = require("@remix-run/react");
var import_react102 = require("@remix-run/react");
var import_client39 = require("@apollo/client");
var SUBMISSION_WITH_FILES = import_client39.gql`
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
  const navigate = (0, import_react102.useNavigate)();
  const { id } = navigate.query;
  const submissionId = typeof id === "string" ? id : void 0;
  const { data: data2, loading } = (0, import_client39.useQuery)(SUBMISSION_WITH_FILES, {
    variables: { id: submissionId },
    skip: !submissionId,
    fetchPolicy: "cache-and-network"
  });
  const { submission, files } = (data2 == null ? void 0 : data2.submissionWithFiles) ?? {};
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
  }, f.filename), /* @__PURE__ */ React.createElement(import_react101.Link, {
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug.tsx
var slug_exports4 = {};
__export(slug_exports4, {
  default: () => slug_default4,
  loader: () => loader6
});
var import_react103 = require("@remix-run/react");
async function loader6({
  params,
  request
}) {
  const { slug } = params;
  const person2 = await db.person.findUnique({
    where: {
      slug
    }
  });
  if (!person2) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Person"
    });
  }
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 20);
  const sortBy = searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */;
  const audioItemsOrderBy = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" };
  const [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: true,
            objectCollection: true,
            objectInstrument: true,
            objectPerson: true,
            objectPlace: true,
            objectTune: true,
            relationship: true
          }
        },
        createdByUser: true,
        updatedByUser: true,
        comments: {
          include: {
            createdByUser: true
          }
        }
      },
      where: {
        tagsAsObject: {
          some: {
            subjectPersonId: person2.id
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.audioItem.count({
      where: {
        tagsAsObject: {
          some: {
            subjectPersonId: person2.id
          }
        }
      }
    })
  ]);
  return {
    person: person2,
    audioItems,
    totalAudioItems
  };
}
var ViewPersonBySlug = () => {
  const { person: person2, audioItems, totalAudioItems } = (0, import_react103.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: person2,
    audioItems,
    totalAudioItems
  }));
};
var slug_default4 = ViewPersonBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/about.tsx
var about_exports4 = {};
__export(about_exports4, {
  default: () => about_default4
});
var import_react104 = require("@remix-run/react");
var import_react105 = require("@remix-run/react");
var PersonAbout = () => {
  const navigate = (0, import_react105.useNavigate)();
  const { slug } = navigate.query;
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react104.Link, {
    to: `/entities/people/${slug}/edit`
  }, "Edit")));
};
var about_default4 = PersonAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/edit.tsx
var edit_exports4 = {};
__export(edit_exports4, {
  default: () => edit_default4
});
var import_react108 = require("@remix-run/react");
var import_client41 = require("@apollo/client");

// app/components/EditPersonForm.tsx
var import_react106 = require("react");
var import_client40 = require("@apollo/client");
var import_react107 = require("@remix-run/react");
var UPDATE_PERSON_MUTATION = import_client40.gql`
	mutation UpdatePerson($slug: String!, $input: UpdatePersonInput!) {
		updatePerson(slug: $slug, input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var EditPersonForm = ({ person: person2, onSuccess }) => {
  const navigate = (0, import_react107.useNavigate)();
  const [updatePerson, { loading, error: error2, data: data2 }] = (0, import_client40.useMutation)(UPDATE_PERSON_MUTATION, {
    errorPolicy: "all"
  });
  const [firstName, setFirstName] = (0, import_react106.useState)(person2.firstName);
  const [middleName, setMiddleName] = (0, import_react106.useState)(person2.middleName);
  const [lastName, setLastName] = (0, import_react106.useState)(person2.lastName);
  const [aliases, setAliases] = (0, import_react106.useState)(person2.aliases);
  const [description, setDescription] = (0, import_react106.useState)(person2.description);
  const onUpdatePerson = (event) => {
    event.preventDefault();
    const input = {
      firstName,
      middleName,
      lastName,
      aliases,
      description
    };
    updatePerson({ variables: { slug: person2.slug, input } });
  };
  (0, import_react106.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updatePerson) {
      if (onSuccess) {
        return onSuccess(data2.updatePerson);
      }
      window.alert("Person updated successfully!");
    }
  }, [data2, navigate]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var EditPersonForm_default = EditPersonForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/edit.tsx
var PERSON_QUERY = import_client41.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var EditPerson = () => {
  const navigate = (0, import_react108.useNavigate)();
  const { slug } = navigate.query;
  const { data: data2, error: error2 } = (0, import_client41.useQuery)(PERSON_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (person3) => {
    navigate(`/entities/people/${person3.slug}`);
  };
  let statusMessage;
  if (!data2 && !error2) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data2 && error2) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { person: person2 } = data2;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Person: ", person2.name), /* @__PURE__ */ React.createElement(EditPersonForm_default, {
    person: person2,
    onSuccess: onEditSuccess
  }))));
};
var edit_default4 = EditPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/tags.tsx
var tags_exports4 = {};
__export(tags_exports4, {
  default: () => tags_default4
});
var import_react109 = require("@remix-run/react");
var PersonTags = () => {
  const navigate = (0, import_react109.useNavigate)();
  const { slug } = navigate.query;
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var people_exports = {};
__export(people_exports, {
  default: () => people_default,
  loader: () => loader7,
  meta: () => meta4
});
var import_react110 = require("@remix-run/react");
function meta4() {
  return {
    title: "Trad Archive - People"
  };
}
function loader7() {
  return db.person.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var People = () => {
  const people = (0, import_react110.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "People"), people.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No People found"), people.length > 0 && /* @__PURE__ */ React.createElement("ul", null, people.map((person2, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react110.Link, {
    to: Entity_default.makeHrefForView(person2)
  }, person2.name)))));
};
var people_default = People;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug.tsx
var slug_exports5 = {};
__export(slug_exports5, {
  default: () => slug_default5,
  loader: () => loader8
});
var import_react111 = require("@remix-run/react");
async function loader8({
  params,
  request
}) {
  const { slug } = params;
  const place = await db.place.findUnique({
    where: {
      slug
    }
  });
  if (!place) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Place"
    });
  }
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 20);
  const sortBy = searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */;
  const audioItemsOrderBy = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" };
  const [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: true,
            objectCollection: true,
            objectInstrument: true,
            objectPerson: true,
            objectPlace: true,
            objectTune: true,
            relationship: true
          }
        },
        createdByUser: true,
        updatedByUser: true,
        comments: {
          include: {
            createdByUser: true
          }
        }
      },
      where: {
        tagsAsObject: {
          some: {
            subjectPlaceId: place.id
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.audioItem.count({
      where: {
        tagsAsObject: {
          some: {
            subjectPlaceId: place.id
          }
        }
      }
    })
  ]);
  return {
    place,
    audioItems,
    totalAudioItems
  };
}
var ViewPlaceBySlug = () => {
  const { place, audioItems, totalAudioItems } = (0, import_react111.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: place,
    audioItems,
    totalAudioItems
  }));
};
var slug_default5 = ViewPlaceBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/about.tsx
var about_exports5 = {};
__export(about_exports5, {
  default: () => about_default5
});
var import_react112 = require("@remix-run/react");
var import_react113 = require("@remix-run/react");
var PlaceAbout = () => {
  const navigate = (0, import_react113.useNavigate)();
  const { slug } = navigate.query;
  const { name, description, aliases, latitude, longitude } = (data == null ? void 0 : data.place) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
  }, "launch"))), /* @__PURE__ */ React.createElement(import_react112.Link, {
    to: `/entities/places/${slug}/edit`
  }, "Edit")));
};
var about_default5 = PlaceAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/edit.tsx
var edit_exports5 = {};
__export(edit_exports5, {
  default: () => edit_default5
});
var import_react116 = require("@remix-run/react");
var import_client43 = require("@apollo/client");

// app/components/EditPlaceForm.tsx
var import_react114 = require("react");
var import_client42 = require("@apollo/client");
var import_react115 = require("@remix-run/react");
var UPDATE_PLACE_MUTATION = import_client42.gql`
	mutation UpdatePlace($slug: String!, $input: UpdatePlaceInput!) {
		updatePlace(slug: $slug, input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var EditPlaceForm = ({ place, onSuccess }) => {
  const navigate = (0, import_react115.useNavigate)();
  const [updatePlace, { loading, error: error2, data: data2 }] = (0, import_client42.useMutation)(UPDATE_PLACE_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react114.useState)(place.name);
  const [aliases, setAliases] = (0, import_react114.useState)(place.aliases);
  const [latitude, setLatitude] = (0, import_react114.useState)(place.latitude.toString());
  const [longitude, setLongitude] = (0, import_react114.useState)(place.longitude.toString());
  const [description, setDescription] = (0, import_react114.useState)(place.description);
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
  (0, import_react114.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updatePlace) {
      if (onSuccess) {
        return onSuccess(data2.updatePlace);
      }
      window.alert("Place updated successfully!");
    }
  }, [data2, navigate]);
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
  }))), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error2.message));
};
var EditPlaceForm_default = EditPlaceForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/edit.tsx
var PLACE_QUERY = import_client43.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var EditPlace = () => {
  const navigate = (0, import_react116.useNavigate)();
  const { slug } = navigate.query;
  const { data: data2, error: error2 } = (0, import_client43.useQuery)(PLACE_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (place2) => {
    navigate(`/entities/places/${place2.slug}`);
  };
  let statusMessage;
  if (!data2 && !error2) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data2 && error2) {
    statusMessage = `Error fetching Place with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { place } = data2;
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/tags.tsx
var tags_exports5 = {};
__export(tags_exports5, {
  default: () => tags_default5
});
var import_react117 = require("@remix-run/react");
var PlaceTags = () => {
  const navigate = (0, import_react117.useNavigate)();
  const { slug } = navigate.query;
  const { place } = data ?? {};
  const { name, tags } = place ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var places_exports = {};
__export(places_exports, {
  default: () => places_default,
  loader: () => loader9,
  meta: () => meta5
});
var import_react118 = require("@remix-run/react");
function meta5() {
  return {
    title: "Trad Archive - Places"
  };
}
function loader9() {
  return db.place.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Places = () => {
  const places = (0, import_react118.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Places"), places.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Places found"), places.length > 0 && /* @__PURE__ */ React.createElement("ul", null, places.map((place, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react118.Link, {
    to: Entity_default.makeHrefForView(place)
  }, place.name)))));
};
var places_default = Places;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug.tsx
var slug_exports6 = {};
__export(slug_exports6, {
  default: () => slug_default6,
  loader: () => loader10
});
var import_react119 = require("@remix-run/react");
async function loader10({
  params,
  request
}) {
  const { slug } = params;
  const tune = await db.tune.findUnique({
    where: {
      slug
    }
  });
  if (!tune) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Tune"
    });
  }
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 20);
  const sortBy = searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */;
  const audioItemsOrderBy = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" };
  const [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: true,
            objectCollection: true,
            objectInstrument: true,
            objectPerson: true,
            objectPlace: true,
            objectTune: true,
            relationship: true
          }
        },
        createdByUser: true,
        updatedByUser: true,
        comments: {
          include: {
            createdByUser: true
          }
        }
      },
      where: {
        tagsAsObject: {
          some: {
            subjectTuneId: tune.id
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.audioItem.count({
      where: {
        tagsAsObject: {
          some: {
            subjectTuneId: tune.id
          }
        }
      }
    })
  ]);
  return {
    tune,
    audioItems,
    totalAudioItems
  };
}
var ViewTuneBySlug = () => {
  const { tune, audioItems, totalAudioItems } = (0, import_react119.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: tune,
    audioItems,
    totalAudioItems
  }));
};
var slug_default6 = ViewTuneBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug/about.tsx
var about_exports6 = {};
__export(about_exports6, {
  default: () => about_default6
});
var import_react120 = require("@remix-run/react");
var import_react121 = require("@remix-run/react");
var TuneAbout = () => {
  const navigate = (0, import_react121.useNavigate)();
  const { slug } = navigate.query;
  const { name, aliases, theSessionTuneId, type, meter, mode, abc } = (data == null ? void 0 : data.tune) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
  }, abc)), /* @__PURE__ */ React.createElement(import_react120.Link, {
    to: `/entities/tunes/${slug}/edit`
  }, "Edit")));
};
var about_default6 = TuneAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug/tags.tsx
var tags_exports6 = {};
__export(tags_exports6, {
  default: () => tags_default6
});
var import_react122 = require("@remix-run/react");
var TuneTags = () => {
  const navigate = (0, import_react122.useNavigate)();
  const { slug } = navigate.query;
  const { tune } = data ?? {};
  const { name, tags } = tune ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
  default: () => tunes_default,
  loader: () => loader11,
  meta: () => meta6
});
var import_react123 = require("@remix-run/react");
function meta6() {
  return {
    title: "Trad Archive - Tunes"
  };
}
var PER_PAGE = 100;
async function loader11({
  request
}) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? PER_PAGE);
  const [tunes, totalTunes] = await Promise.all([
    db.tune.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      orderBy: {
        name: "asc"
      }
    }),
    db.tune.count()
  ]);
  return {
    tunes,
    totalTunes
  };
}
var Tunes = () => {
  const { tunes, totalTunes } = (0, import_react123.useLoaderData)();
  const { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalTunes,
    defaultPerPage: PER_PAGE
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", null, "Tunes"), /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    sortBy: void 0,
    viewAs: void 0,
    className: "sticky left-0 right-0 py-4 bg-gray-100 top-[48px] mb-6"
  })), tunes.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Tunes found"), tunes.length > 0 && /* @__PURE__ */ React.createElement("ul", null, tunes.map((tune, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react123.Link, {
    to: Entity_default.makeHrefForView(tune)
  }, tune.name)))));
};
var tunes_default = Tunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/new.tsx
var new_exports5 = {};
__export(new_exports5, {
  default: () => new_default5
});
var import_react124 = require("@remix-run/react");
var NewPerson = () => {
  const navigate = (0, import_react124.useNavigate)();
  const onCreateSuccess = (person2) => {
    navigate(`/entities/people/${person2.slug}`);
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
var import_react125 = require("@remix-run/react");
var NewPlace = () => {
  const navigate = (0, import_react125.useNavigate)();
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
var import_react127 = require("react");
var import_client45 = require("@apollo/client");
var import_react128 = require("@remix-run/react");

// app/hooks/useVerificationRequestsForCurrentUser.ts
var import_react126 = require("react");
var import_client44 = require("@apollo/client");
var VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY = import_client44.gql`
	query VerificationRequestsForCurrentUser {
		verificationRequestsForCurrentUser {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var useVerificationRequestsForCurrentUser = () => {
  var _a;
  const [makeQuery, query] = (0, import_client44.useLazyQuery)(VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY);
  (0, import_react126.useEffect)(() => {
    makeQuery();
  }, [makeQuery]);
  const verificationRequests = (_a = query == null ? void 0 : query.data) == null ? void 0 : _a.verificationRequestsForCurrentUser;
  return [verificationRequests, query];
};
var useVerificationRequestsForCurrentUser_default = useVerificationRequestsForCurrentUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var CREATE_PRESIGNED_UPLOAD_URL_MUTATION = import_client45.gql`
	mutation CreatePresignedUploadUrl($filename: String!) {
		createPresignedUploadUrlForVerificationImage(filename: $filename) {
			imageS3Key
			presignedUploadUrl
		}
	}
`;
var CREATE_VERIFICATION_REQUEST_MUTATION = import_client45.gql`
	mutation CreateVerificationRequest($input: CreateVerificationRequestInput!) {
		createVerificationRequest(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var AccountVerify = () => {
  const navigate = (0, import_react128.useNavigate)();
  const [
    _,
    {
      refetch: refetchVerificationRequestsForCurrentUser,
      loading: refetchVerificationRequestsIsLoading
    }
  ] = useVerificationRequestsForCurrentUser_default();
  const [personEntity, setPersonEntity] = (0, import_react127.useState)();
  const [imageFile, setImageFile] = (0, import_react127.useState)();
  const [imageFileObjectUrl, setImageFileObjectUrl] = (0, import_react127.useState)();
  const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] = (0, import_react127.useState)(false);
  const [formIsSubmitting, setFormIsSubmitting] = (0, import_react127.useState)(false);
  const [createPresignedUploadUrl] = (0, import_client45.useMutation)(CREATE_PRESIGNED_UPLOAD_URL_MUTATION, { errorPolicy: "all" });
  const [createVerificationRequest] = (0, import_client45.useMutation)(CREATE_VERIFICATION_REQUEST_MUTATION, { errorPolicy: "all" });
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
  (0, import_react127.useEffect)(() => {
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
      const { data: data2 } = await createVerificationRequest({
        variables: {
          input: {
            personId: personEntity.id,
            imageS3Key,
            copyrightPermissionStatus: "FullNonCommercialGranted" /* FullNonCommercialGranted */
          }
        }
      });
      if (!data2.createVerificationRequest) {
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
var import_react129 = require("react");
var import_react130 = require("@remix-run/react");
var AccountHome = () => {
  const [verificationRequests = [], { loading, data: data2, error: error2 }] = useVerificationRequestsForCurrentUser_default();
  const verifyYourselfMarkup = (0, import_react129.useMemo)(() => {
    if (!loading && error2) {
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
      }, "You are verified as"), /* @__PURE__ */ React.createElement(import_react130.Link, {
        to: Entity_default.makeHrefForView(approvedRequest.person)
      }, approvedRequest.person.name));
    }
    const pendingRequest = verificationRequests.find((request) => isPendingVerificationRequest(request));
    if (pendingRequest) {
      return /* @__PURE__ */ React.createElement("span", null, "Your request to verify as ", pendingRequest.person.name, " is pending");
    }
    return /* @__PURE__ */ React.createElement(import_react130.Link, {
      to: "/account/verify"
    }, "Verify Your Account");
  }, [data2, loading, error2, verificationRequests]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Account"), verifyYourselfMarkup, /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: "/account/submissions"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mt-2"
  }, "Submit Audio, Video, Images, or Documents to ITMA")), /* @__PURE__ */ React.createElement(import_react130.Link, {
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
var import_react131 = require("@remix-run/react");
var AdminHome = () => {
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Admin"), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/admin/verification-requests"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Manage Verification Requests")), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/admin/takedown-requests"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Manage Takedown Requests")), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/admin/submissions"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-6"
  }, "Manage Submissions")), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/entities/audio-items/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Audio Item")), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/entities/people/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Person")), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/entities/instruments/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Instrument")), /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/entities/places/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Place")), /* @__PURE__ */ React.createElement(import_react131.Link, {
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
var import_react132 = require("@remix-run/react");
var SavedItems = () => {
  const [savedItems, { loading, error: error2 }] = useSavedItemsForUser_default();
  const { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    defaultViewAs: "List" /* List */
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Saved Items"), (savedItems == null ? void 0 : savedItems.length) > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, "Could not fetch saved items"), loading && !savedItems && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(LoadingBlock_default, null)), !loading && (savedItems == null ? void 0 : savedItems.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Nothing saved yet - try browsing some", " ", /* @__PURE__ */ React.createElement(import_react132.Link, {
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
var import_react133 = require("react");
var import_react134 = require("@remix-run/react");
var import_react135 = require("@remix-run/react");
var import_client46 = require("@apollo/client");
var AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN = import_client46.gql`
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
  const navigate = (0, import_react134.useNavigate)();
  const { tokenUnhashed, userEmail, redirectTo } = navigate.query;
  const [
    currentUser,
    { loading: currentUserLoading, refetch: refetchCurrentUser }
  ] = useCurrentUser_default();
  const [
    authenticateWithAutoLoginToken,
    { loading: authenticateLoading, data: data2, error: error2 }
  ] = (0, import_client46.useMutation)(AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN);
  (0, import_react133.useEffect)(() => {
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
  (0, import_react133.useEffect)(() => {
    if (data2 == null ? void 0 : data2.authenticateWithAutoLoginToken) {
      refetchCurrentUser();
    }
  }, [data2, refetchCurrentUser]);
  (0, import_react133.useEffect)(() => {
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
  if (error2) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600 mb-4"
    }, "Error: ", (_a = error2 == null ? void 0 : error2.graphQLErrors) == null ? void 0 : _a.map(({ message }) => message)), /* @__PURE__ */ React.createElement(import_react135.Link, {
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
  }, "Didn't get it? Check your spam folder or", " ", /* @__PURE__ */ React.createElement(import_react135.Link, {
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
var import_react137 = require("react");
var import_react138 = require("@remix-run/react");
var import_react139 = require("@remix-run/react");
var import_client48 = require("@apollo/client");

// app/hooks/useAudioItemsCreatedByUser.tsx
var import_react136 = require("react");
var import_client47 = require("@apollo/client");
var AUDIO_ITEMS_CREATED_BY_USER_QUERY = import_client47.gql`
	query AudioItemsCreatedByUser($input: AudioItemsCreatedByUserInput!) {
		audioItemsCreatedByUser(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemsCreatedByUser = (user) => {
  var _a;
  const [makeQuery, query] = (0, import_client47.useLazyQuery)(AUDIO_ITEMS_CREATED_BY_USER_QUERY, {
    variables: {
      input: {
        userId: user == null ? void 0 : user.id
      }
    }
  });
  (0, import_react136.useEffect)(() => {
    if (user) {
      makeQuery();
    }
  }, [makeQuery, user]);
  const audioItems = (_a = query.data) == null ? void 0 : _a.audioItemsCreatedByUser;
  return [audioItems, query];
};
var useAudioItemsCreatedByUser_default = useAudioItemsCreatedByUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/[id].tsx
var USER_QUERY = import_client48.gql`
	query User($id: String!) {
		user(id: $id) {
			...User
		}
	}
	${UserFragments.user}
`;
var ViewUserById = () => {
  const navigate = (0, import_react138.useNavigate)();
  const { id } = navigate.query;
  const { data: userData, error: userError } = (0, import_client48.useQuery)(USER_QUERY, {
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
  const aboutMarkup = (0, import_react137.useMemo)(() => /* @__PURE__ */ React.createElement(React.Fragment, null, verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base mr-2"
  }, "verified"), "Verified As Person:"), /* @__PURE__ */ React.createElement(import_react139.Link, {
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
var import_react140 = require("react");
var import_react141 = require("@remix-run/react");
var import_client49 = require("@apollo/client");
var LOG_OUT_MUTATION = import_client49.gql`
	mutation LogOut {
		logOut
	}
`;
var LogOut = () => {
  const navigate = (0, import_react141.useNavigate)();
  const [logOut, { data: logOutData }] = (0, import_client49.useMutation)(LOG_OUT_MUTATION, {
    errorPolicy: "all"
  });
  (0, import_react140.useEffect)(() => {
    logOut();
  }, [logOut]);
  (0, import_react140.useEffect)(() => {
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
var import_react142 = require("react");
var import_react143 = require("@remix-run/react");
var import_react144 = require("@remix-run/react");
var import_client50 = require("@apollo/client");
var SIGN_UP_MUTATION = import_client50.gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var SignUp = () => {
  const navigate = (0, import_react143.useNavigate)();
  const { redirectTo } = navigate.query;
  const [currentUser] = useCurrentUser_default();
  const [email, setEmail] = (0, import_react142.useState)("");
  const [username, setUsername] = (0, import_react142.useState)("");
  const [validationError, setValidationError] = (0, import_react142.useState)("");
  const [signUp, { loading, data: data2, error: error2 }] = (0, import_client50.useMutation)(SIGN_UP_MUTATION, {
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
  (0, import_react142.useEffect)(() => {
    if (data2 == null ? void 0 : data2.signUp) {
      navigate("/auto-login");
    }
  }, [data2, navigate]);
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
  }, validationError), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error2.message), /* @__PURE__ */ React.createElement("div", null, "Already have an account?", " ", /* @__PURE__ */ React.createElement(import_react144.Link, {
    to: { pathname: "/login", query: logInLinkQueryParams }
  }, "Log in"))));
};
var signup_default = SignUp;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Home,
  loader: () => loader12
});
var import_react145 = require("react");
var import_react146 = require("@remix-run/react");

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
async function loader12({
  request
}) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */;
  const audioItemsOrderBy = sortBy === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" };
  const [
    audioItems,
    collections,
    comments,
    numAudioItemsAllTime,
    numTagsAllTime,
    numCommentsAllTime
  ] = await Promise.all([
    db.audioItem.findMany({
      take: 10,
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: true,
            objectCollection: true,
            objectInstrument: true,
            objectPerson: true,
            objectPlace: true,
            objectTune: true,
            relationship: true
          }
        },
        createdByUser: true,
        updatedByUser: true,
        comments: {
          include: {
            createdByUser: true
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.collection.findMany({
      take: 5,
      include: {
        tagsAsSubject: true,
        createdByUser: true,
        updatedByUser: true
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    db.comment.findMany({
      take: 6,
      include: {
        createdByUser: true,
        parentAudioItem: true
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    db.audioItem.count(),
    db.tag.count(),
    db.comment.count()
  ]);
  return {
    audioItems,
    collections,
    comments,
    numAudioItemsAllTime,
    numTagsAllTime,
    numCommentsAllTime
  };
}
function Home() {
  const {
    audioItems,
    collections,
    comments,
    numAudioItemsAllTime,
    numTagsAllTime,
    numCommentsAllTime
  } = (0, import_react146.useLoaderData)();
  const { search } = (0, import_react146.useLocation)();
  const viewAs = new URLSearchParams(search).get("viewAs") ?? "Cards" /* Cards */;
  const { Filters: Filters2, filtersProps } = useFilters_default();
  const [shouldShowIntro, setShouldShowIntro] = (0, import_react145.useState)(false);
  (0, import_react145.useEffect)(() => {
    if (LocalStorage_default.getItem("SHOULD_SHOW_INTRO") !== "false") {
      setShouldShowIntro(true);
    }
  }, []);
  const onCloseIntro = (0, import_react145.useCallback)(() => {
    LocalStorage_default.setItem("SHOULD_SHOW_INTRO", "false");
    setShouldShowIntro(false);
  }, []);
  return /* @__PURE__ */ React.createElement(Layout_default, null, shouldShowIntro && /* @__PURE__ */ React.createElement(ProjectIntro_default, {
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
  })), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "Browse"), /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/entities/people",
    className: "mb-2"
  }, "People"), /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/entities/instruments",
    className: "mb-2"
  }, "Instruments"), /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/entities/places",
    className: "mb-2"
  }, "Places"), /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/entities/tunes",
    className: "mb-2"
  }, "Tunes"), /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/entities/collections",
    className: "mb-2"
  }, "Collections"), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Stats"), /* @__PURE__ */ React.createElement("span", {
    className: "mb-2 text-gray-500"
  }, numAudioItemsAllTime, " Audio Items"), /* @__PURE__ */ React.createElement("span", {
    className: "mb-2 text-gray-500"
  }, numTagsAllTime, " Tags"), /* @__PURE__ */ React.createElement("span", {
    className: "mb-2 text-gray-500"
  }, numCommentsAllTime, " Comments"), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Collections"), collections.map((collection, index) => {
    const { name } = collection;
    if (!name) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-2 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement(import_react146.Link, {
      to: Entity_default.makeHrefForView(collection)
    }, collection.name));
  }), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Features + Fixes"), /* @__PURE__ */ React.createElement("a", {
    className: "mb-2",
    href: "https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc",
    target: "_blank",
    rel: "noreferrer"
  }, "View on GitHub", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm"
  }, "launch"))), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Comments"), comments.map((comment, index) => {
    const { createdByUser, parentAudioItem, text } = comment;
    if (!createdByUser || !parentAudioItem) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: " mb-1"
    }, /* @__PURE__ */ React.createElement(import_react146.Link, {
      to: `/users/${createdByUser.id}`
    }, createdByUser.username), ` commented on `, /* @__PURE__ */ React.createElement(import_react146.Link, {
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
var import_react147 = require("react");
var import_react148 = require("@remix-run/react");
var import_react149 = require("@remix-run/react");
var import_client51 = require("@apollo/client");
var LOG_IN_MUTATION = import_client51.gql`
	mutation LogIn($input: LogInInput!) {
		logIn(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var Login = () => {
  const navigate = (0, import_react148.useNavigate)();
  const { redirectTo } = navigate.query;
  const [currentUser] = useCurrentUser_default();
  const [email, setEmail] = (0, import_react147.useState)("");
  const [logIn, { loading, data: data2, error: error2 }] = (0, import_client51.useMutation)(LOG_IN_MUTATION, {
    errorPolicy: "all"
  });
  const onLogIn = (event) => {
    event.preventDefault();
    const cleanedEmail = email.trim().toLowerCase();
    logIn({
      variables: { input: { email: cleanedEmail, redirectTo } }
    });
  };
  (0, import_react147.useEffect)(() => {
    if (data2 == null ? void 0 : data2.logIn) {
      navigate("/auto-login");
    }
  }, [data2, navigate]);
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
  })), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error2.message), /* @__PURE__ */ React.createElement("div", null, "Don't have an account yet?", " ", /* @__PURE__ */ React.createElement(import_react149.Link, {
    to: { pathname: "/signup", query: signUpLinkQueryParams }
  }, "Sign Up"))));
};
var login_default = Login;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "2a533b25", "entry": { "module": "/build/entry.client-24CXC3PV.js", "imports": ["/build/_shared/chunk-LAZS6NQD.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-VCNJ56NI.js", "imports": ["/build/_shared/chunk-ZQEJ35XF.js", "/build/_shared/chunk-JDG6WXNN.js", "/build/_shared/chunk-5DALBYVT.js", "/build/_shared/chunk-ETNNQXWI.js", "/build/_shared/chunk-YNOSSSX4.js", "/build/_shared/chunk-4ZS4RKQK.js", "/build/_shared/chunk-MUPKMBMF.js", "/build/_shared/chunk-VBOJUJRE.js", "/build/_shared/chunk-BBABTPQA.js", "/build/_shared/chunk-NCJMDQTL.js", "/build/_shared/chunk-AIAI25GH.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/account/index": { "id": "routes/account/index", "parentId": "root", "path": "account", "index": true, "caseSensitive": void 0, "module": "/build/routes/account/index-VFHE6OMF.js", "imports": ["/build/_shared/chunk-SRDA4TBH.js", "/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/[id]/upload": { "id": "routes/account/submissions/[id]/upload", "parentId": "root", "path": "account/submissions/id/upload", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/submissions/[id]/upload-3UBNX6HY.js", "imports": ["/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/index": { "id": "routes/account/submissions/index", "parentId": "root", "path": "account/submissions", "index": true, "caseSensitive": void 0, "module": "/build/routes/account/submissions/index-FXWIRFSR.js", "imports": ["/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/new": { "id": "routes/account/submissions/new", "parentId": "root", "path": "account/submissions/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/submissions/new-YA65G2EV.js", "imports": ["/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/verify": { "id": "routes/account/verify", "parentId": "root", "path": "account/verify", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/verify-ODEVXQCJ.js", "imports": ["/build/_shared/chunk-SRDA4TBH.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/index": { "id": "routes/admin/index", "parentId": "root", "path": "admin", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/index-WUE7XIR2.js", "imports": ["/build/_shared/chunk-INVGBW77.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/submissions/[id]": { "id": "routes/admin/submissions/[id]", "parentId": "root", "path": "admin/submissions/id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/submissions/[id]-2B3FZIVX.js", "imports": ["/build/_shared/chunk-INVGBW77.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/submissions/index": { "id": "routes/admin/submissions/index", "parentId": "root", "path": "admin/submissions", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/submissions/index-P6DGN4O7.js", "imports": ["/build/_shared/chunk-INVGBW77.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/takedown-requests": { "id": "routes/admin/takedown-requests", "parentId": "root", "path": "admin/takedown-requests", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/takedown-requests-ZCTZDYDT.js", "imports": ["/build/_shared/chunk-INVGBW77.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/verification-requests": { "id": "routes/admin/verification-requests", "parentId": "root", "path": "admin/verification-requests", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/verification-requests-BX3IYCYZ.js", "imports": ["/build/_shared/chunk-INVGBW77.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/auto-login": { "id": "routes/auto-login", "parentId": "root", "path": "auto-login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/auto-login-UGVPJU7Z.js", "imports": ["/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/$slug": { "id": "routes/entities/audio-items/$slug", "parentId": "root", "path": "entities/audio-items/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/$slug-2RPRYOZX.js", "imports": ["/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/$slug/about": { "id": "routes/entities/audio-items/$slug/about", "parentId": "routes/entities/audio-items/$slug", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/$slug/about-WMIWJ4KZ.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/$slug/edit": { "id": "routes/entities/audio-items/$slug/edit", "parentId": "routes/entities/audio-items/$slug", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/$slug/edit-EG2CJAI5.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/$slug/tags": { "id": "routes/entities/audio-items/$slug/tags", "parentId": "routes/entities/audio-items/$slug", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/$slug/tags-VMZCMPMV.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/index": { "id": "routes/entities/audio-items/index", "parentId": "root", "path": "entities/audio-items", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/index-TEMN42UK.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/new": { "id": "routes/entities/audio-items/new", "parentId": "root", "path": "entities/audio-items/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/new-6SOHYFZG.js", "imports": ["/build/_shared/chunk-INVGBW77.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/random": { "id": "routes/entities/audio-items/random", "parentId": "root", "path": "entities/audio-items/random", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/random-KFPAZTHR.js", "imports": ["/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/$slug": { "id": "routes/entities/collections/$slug", "parentId": "root", "path": "entities/collections/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/$slug-UP5C74FM.js", "imports": ["/build/_shared/chunk-X64ZX4FA.js", "/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/$slug/about": { "id": "routes/entities/collections/$slug/about", "parentId": "routes/entities/collections/$slug", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/$slug/about-VGK6KHZW.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/$slug/edit": { "id": "routes/entities/collections/$slug/edit", "parentId": "routes/entities/collections/$slug", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/$slug/edit-2LCQIC3Y.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/$slug/tags": { "id": "routes/entities/collections/$slug/tags", "parentId": "routes/entities/collections/$slug", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/$slug/tags-SANZ2U5O.js", "imports": ["/build/_shared/chunk-NMULCUMY.js", "/build/_shared/chunk-JDG6WXNN.js", "/build/_shared/chunk-5DALBYVT.js", "/build/_shared/chunk-ETNNQXWI.js", "/build/_shared/chunk-YNOSSSX4.js", "/build/_shared/chunk-4ZS4RKQK.js", "/build/_shared/chunk-MUPKMBMF.js", "/build/_shared/chunk-VBOJUJRE.js", "/build/_shared/chunk-BBABTPQA.js", "/build/_shared/chunk-NCJMDQTL.js", "/build/_shared/chunk-AIAI25GH.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/index": { "id": "routes/entities/collections/index", "parentId": "root", "path": "entities/collections", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/collections/index-XLKJAYYD.js", "imports": ["/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/new": { "id": "routes/entities/collections/new", "parentId": "root", "path": "entities/collections/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/new-3FLWK6BB.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/$slug": { "id": "routes/entities/instruments/$slug", "parentId": "root", "path": "entities/instruments/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/$slug-S3UOJKS4.js", "imports": ["/build/_shared/chunk-X64ZX4FA.js", "/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/$slug/about": { "id": "routes/entities/instruments/$slug/about", "parentId": "routes/entities/instruments/$slug", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/$slug/about-W2WZFQAC.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/$slug/edit": { "id": "routes/entities/instruments/$slug/edit", "parentId": "routes/entities/instruments/$slug", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/$slug/edit-7TKUIWIE.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/$slug/tags": { "id": "routes/entities/instruments/$slug/tags", "parentId": "routes/entities/instruments/$slug", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/$slug/tags-UKYWZMXG.js", "imports": ["/build/_shared/chunk-NMULCUMY.js", "/build/_shared/chunk-JDG6WXNN.js", "/build/_shared/chunk-5DALBYVT.js", "/build/_shared/chunk-ETNNQXWI.js", "/build/_shared/chunk-YNOSSSX4.js", "/build/_shared/chunk-4ZS4RKQK.js", "/build/_shared/chunk-MUPKMBMF.js", "/build/_shared/chunk-VBOJUJRE.js", "/build/_shared/chunk-BBABTPQA.js", "/build/_shared/chunk-NCJMDQTL.js", "/build/_shared/chunk-AIAI25GH.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/index": { "id": "routes/entities/instruments/index", "parentId": "root", "path": "entities/instruments", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/index-M3XGTQKQ.js", "imports": ["/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/new": { "id": "routes/entities/instruments/new", "parentId": "root", "path": "entities/instruments/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/new-PXM6KAS6.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/$slug": { "id": "routes/entities/people/$slug", "parentId": "root", "path": "entities/people/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/$slug-DQA3JPM6.js", "imports": ["/build/_shared/chunk-X64ZX4FA.js", "/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/$slug/about": { "id": "routes/entities/people/$slug/about", "parentId": "routes/entities/people/$slug", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/$slug/about-UTEOB3HO.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/$slug/edit": { "id": "routes/entities/people/$slug/edit", "parentId": "routes/entities/people/$slug", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/$slug/edit-TZOMUWR4.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/$slug/tags": { "id": "routes/entities/people/$slug/tags", "parentId": "routes/entities/people/$slug", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/$slug/tags-XN4POYII.js", "imports": ["/build/_shared/chunk-NMULCUMY.js", "/build/_shared/chunk-JDG6WXNN.js", "/build/_shared/chunk-5DALBYVT.js", "/build/_shared/chunk-ETNNQXWI.js", "/build/_shared/chunk-YNOSSSX4.js", "/build/_shared/chunk-4ZS4RKQK.js", "/build/_shared/chunk-MUPKMBMF.js", "/build/_shared/chunk-VBOJUJRE.js", "/build/_shared/chunk-BBABTPQA.js", "/build/_shared/chunk-NCJMDQTL.js", "/build/_shared/chunk-AIAI25GH.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/index": { "id": "routes/entities/people/index", "parentId": "root", "path": "entities/people", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/people/index-5KJXMB7X.js", "imports": ["/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/new": { "id": "routes/entities/people/new", "parentId": "root", "path": "entities/people/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/new-4ZGWU74I.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/$slug": { "id": "routes/entities/places/$slug", "parentId": "root", "path": "entities/places/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/$slug-QEAAX3RG.js", "imports": ["/build/_shared/chunk-X64ZX4FA.js", "/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/$slug/about": { "id": "routes/entities/places/$slug/about", "parentId": "routes/entities/places/$slug", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/$slug/about-QRCCQ4ZD.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/$slug/edit": { "id": "routes/entities/places/$slug/edit", "parentId": "routes/entities/places/$slug", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/$slug/edit-UXFUPXTW.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/$slug/tags": { "id": "routes/entities/places/$slug/tags", "parentId": "routes/entities/places/$slug", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/$slug/tags-IUGWALRE.js", "imports": ["/build/_shared/chunk-NMULCUMY.js", "/build/_shared/chunk-JDG6WXNN.js", "/build/_shared/chunk-5DALBYVT.js", "/build/_shared/chunk-ETNNQXWI.js", "/build/_shared/chunk-YNOSSSX4.js", "/build/_shared/chunk-4ZS4RKQK.js", "/build/_shared/chunk-MUPKMBMF.js", "/build/_shared/chunk-VBOJUJRE.js", "/build/_shared/chunk-BBABTPQA.js", "/build/_shared/chunk-NCJMDQTL.js", "/build/_shared/chunk-AIAI25GH.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/index": { "id": "routes/entities/places/index", "parentId": "root", "path": "entities/places", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/places/index-3EEGNHAI.js", "imports": ["/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/new": { "id": "routes/entities/places/new", "parentId": "root", "path": "entities/places/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/new-LZXG4OYY.js", "imports": ["/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/$slug": { "id": "routes/entities/tunes/$slug", "parentId": "root", "path": "entities/tunes/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/$slug-WNWFDBBG.js", "imports": ["/build/_shared/chunk-X64ZX4FA.js", "/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/$slug/about": { "id": "routes/entities/tunes/$slug/about", "parentId": "routes/entities/tunes/$slug", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/$slug/about-LF7IZ23N.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/$slug/tags": { "id": "routes/entities/tunes/$slug/tags", "parentId": "routes/entities/tunes/$slug", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/$slug/tags-7Y7JNMO7.js", "imports": ["/build/_shared/chunk-NMULCUMY.js", "/build/_shared/chunk-JDG6WXNN.js", "/build/_shared/chunk-5DALBYVT.js", "/build/_shared/chunk-ETNNQXWI.js", "/build/_shared/chunk-YNOSSSX4.js", "/build/_shared/chunk-4ZS4RKQK.js", "/build/_shared/chunk-MUPKMBMF.js", "/build/_shared/chunk-VBOJUJRE.js", "/build/_shared/chunk-BBABTPQA.js", "/build/_shared/chunk-NCJMDQTL.js", "/build/_shared/chunk-AIAI25GH.js", "/build/_shared/chunk-YLJS2KAL.js", "/build/_shared/chunk-R6HNRM76.js", "/build/_shared/chunk-J3PUV6G7.js", "/build/_shared/chunk-2CUMPA3P.js", "/build/_shared/chunk-QGKSSSWD.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/index": { "id": "routes/entities/tunes/index", "parentId": "root", "path": "entities/tunes", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/index-CTSYC4DC.js", "imports": ["/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-F7MPKYQE.js", "imports": ["/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-I3V7J4HZ.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/login-QH27RX44.js", "imports": ["/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-34YLA3OE.js", "imports": ["/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/saved-items": { "id": "routes/saved-items", "parentId": "root", "path": "saved-items", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/saved-items-3DS2KE4K.js", "imports": ["/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-M3HSCS3E.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/signup-GGNZJ3R3.js", "imports": ["/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/users/[id]": { "id": "routes/users/[id]", "parentId": "root", "path": "users/id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/users/[id]-ZV3DAV7H.js", "imports": ["/build/_shared/chunk-F44BCDAE.js", "/build/_shared/chunk-DQELP2B7.js", "/build/_shared/chunk-VFGK5TO3.js", "/build/_shared/chunk-F73BS3PK.js", "/build/_shared/chunk-CPZGTRZW.js", "/build/_shared/chunk-NPBM62RR.js", "/build/_shared/chunk-HRHI5VCY.js", "/build/_shared/chunk-ZO5LPNA6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-2A533B25.js" };

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
  "routes/entities/audio-items/random": {
    id: "routes/entities/audio-items/random",
    parentId: "root",
    path: "entities/audio-items/random",
    index: void 0,
    caseSensitive: void 0,
    module: random_exports
  },
  "routes/entities/audio-items/$slug": {
    id: "routes/entities/audio-items/$slug",
    parentId: "root",
    path: "entities/audio-items/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/entities/audio-items/$slug/about": {
    id: "routes/entities/audio-items/$slug/about",
    parentId: "routes/entities/audio-items/$slug",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/entities/audio-items/$slug/edit": {
    id: "routes/entities/audio-items/$slug/edit",
    parentId: "routes/entities/audio-items/$slug",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports
  },
  "routes/entities/audio-items/$slug/tags": {
    id: "routes/entities/audio-items/$slug/tags",
    parentId: "routes/entities/audio-items/$slug",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports
  },
  "routes/entities/audio-items/index": {
    id: "routes/entities/audio-items/index",
    parentId: "root",
    path: "entities/audio-items",
    index: true,
    caseSensitive: void 0,
    module: audio_items_exports
  },
  "routes/entities/collections/$slug": {
    id: "routes/entities/collections/$slug",
    parentId: "root",
    path: "entities/collections/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports2
  },
  "routes/entities/collections/$slug/about": {
    id: "routes/entities/collections/$slug/about",
    parentId: "routes/entities/collections/$slug",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports2
  },
  "routes/entities/collections/$slug/edit": {
    id: "routes/entities/collections/$slug/edit",
    parentId: "routes/entities/collections/$slug",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports2
  },
  "routes/entities/collections/$slug/tags": {
    id: "routes/entities/collections/$slug/tags",
    parentId: "routes/entities/collections/$slug",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports2
  },
  "routes/entities/collections/index": {
    id: "routes/entities/collections/index",
    parentId: "root",
    path: "entities/collections",
    index: true,
    caseSensitive: void 0,
    module: collections_exports
  },
  "routes/entities/instruments/$slug": {
    id: "routes/entities/instruments/$slug",
    parentId: "root",
    path: "entities/instruments/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports3
  },
  "routes/entities/instruments/$slug/about": {
    id: "routes/entities/instruments/$slug/about",
    parentId: "routes/entities/instruments/$slug",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports3
  },
  "routes/entities/instruments/$slug/edit": {
    id: "routes/entities/instruments/$slug/edit",
    parentId: "routes/entities/instruments/$slug",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports3
  },
  "routes/entities/instruments/$slug/tags": {
    id: "routes/entities/instruments/$slug/tags",
    parentId: "routes/entities/instruments/$slug",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports3
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
  "routes/entities/people/$slug": {
    id: "routes/entities/people/$slug",
    parentId: "root",
    path: "entities/people/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports4
  },
  "routes/entities/people/$slug/about": {
    id: "routes/entities/people/$slug/about",
    parentId: "routes/entities/people/$slug",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports4
  },
  "routes/entities/people/$slug/edit": {
    id: "routes/entities/people/$slug/edit",
    parentId: "routes/entities/people/$slug",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports4
  },
  "routes/entities/people/$slug/tags": {
    id: "routes/entities/people/$slug/tags",
    parentId: "routes/entities/people/$slug",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports4
  },
  "routes/entities/people/index": {
    id: "routes/entities/people/index",
    parentId: "root",
    path: "entities/people",
    index: true,
    caseSensitive: void 0,
    module: people_exports
  },
  "routes/entities/places/$slug": {
    id: "routes/entities/places/$slug",
    parentId: "root",
    path: "entities/places/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports5
  },
  "routes/entities/places/$slug/about": {
    id: "routes/entities/places/$slug/about",
    parentId: "routes/entities/places/$slug",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports5
  },
  "routes/entities/places/$slug/edit": {
    id: "routes/entities/places/$slug/edit",
    parentId: "routes/entities/places/$slug",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports5
  },
  "routes/entities/places/$slug/tags": {
    id: "routes/entities/places/$slug/tags",
    parentId: "routes/entities/places/$slug",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports5
  },
  "routes/entities/places/index": {
    id: "routes/entities/places/index",
    parentId: "root",
    path: "entities/places",
    index: true,
    caseSensitive: void 0,
    module: places_exports
  },
  "routes/entities/tunes/$slug": {
    id: "routes/entities/tunes/$slug",
    parentId: "root",
    path: "entities/tunes/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports6
  },
  "routes/entities/tunes/$slug/about": {
    id: "routes/entities/tunes/$slug/about",
    parentId: "routes/entities/tunes/$slug",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports6
  },
  "routes/entities/tunes/$slug/tags": {
    id: "routes/entities/tunes/$slug/tags",
    parentId: "routes/entities/tunes/$slug",
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
