var __create = Object.create;
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropNames = Object.getOwnPropertyNames, __getOwnPropSymbols = Object.getOwnPropertySymbols, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
}, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b)), __markAsModule = (target) => __defProp(target, "__esModule", { value: !0 });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 == "object" || typeof module2 == "function")
    for (let key of __getOwnPropNames(module2))
      !__hasOwnProp.call(target, key) && (copyDefault || key !== "default") && __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  return target;
}, __toESM = (module2, isNodeMode) => __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: !0 } : { value: module2, enumerable: !0 })), module2), __toCommonJS = /* @__PURE__ */ ((cache) => (module2, temp) => cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp))(typeof WeakMap != "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/dist/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
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
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node"), import_react20 = require("@remix-run/react"), import_client11 = require("@apollo/client");

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-GMZSTQXR.css";

// app/sessions.server.ts
var import_node = require("@remix-run/node"), { getSession, commitSession, destroySession } = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "jwt",
    httpOnly: !0,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "none",
    secure: !0,
    secrets: [process.env.JWT_SECRET_KEY ?? "jwt_secret_key"]
  }
});

// app/utils/db.server.ts
var import_client = require("@prisma/client"), db;
global.__db || (global.__db = new import_client.PrismaClient()), db = global.__db;

// app/components/PlayerContextProvider.tsx
var import_react6 = __toESM(require("react"));

// app/components/Player.tsx
var import_react4 = require("react"), import_react5 = require("@remix-run/react");

// app/hooks/usePlayerContext.ts
var import_react2 = require("react");
var usePlayerContext = () => (0, import_react2.useContext)(PlayerContext), usePlayerContext_default = usePlayerContext;

// app/types/index.ts
var import_client2 = require("@prisma/client"), audioItemWithRelations = import_client2.Prisma.validator()({
  include: {
    tagsAsSubject: {
      include: {
        objectAudioItem: !0,
        objectCollection: !0,
        objectInstrument: !0,
        objectPerson: !0,
        objectPlace: !0,
        objectTune: !0,
        relationship: !0
      }
    },
    createdByUser: !0,
    updatedByUser: !0,
    comments: {
      include: {
        createdByUser: !0
      }
    },
    savedItems: !0
  }
}), collectionWithRelations = import_client2.Prisma.validator()({
  include: { tagsAsSubject: !0, createdByUser: !0, updatedByUser: !0 }
}), commentWithRelations = import_client2.Prisma.validator()({
  include: { parentAudioItem: !0, createdByUser: !0 }
}), tagWithRelations = import_client2.Prisma.validator()({
  include: {
    objectAudioItem: !0,
    objectCollection: !0,
    objectInstrument: !0,
    objectPerson: !0,
    objectPlace: !0,
    objectTune: !0,
    relationship: !0
  }
});
var PerPage = /* @__PURE__ */ ((PerPage2) => (PerPage2[PerPage2.Ten = 10] = "Ten", PerPage2[PerPage2.Twenty = 20] = "Twenty", PerPage2[PerPage2.Fifty = 50] = "Fifty", PerPage2[PerPage2.Hundred = 100] = "Hundred", PerPage2))(PerPage || {});
function isAudioItem(entity) {
  return entity.entityType === "AudioItem" /* AudioItem */;
}
function isPerson(entity) {
  return entity.entityType === "Person" /* Person */;
}
var TakedownRequestType = /* @__PURE__ */ ((TakedownRequestType2) => (TakedownRequestType2.Performer = "Performer", TakedownRequestType2.Copyright = "Copyright", TakedownRequestType2))(TakedownRequestType || {});
var isPendingTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Pending", isApprovedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Approved", isDeniedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Denied";
var isPendingVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Pending", isApprovedVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Approved", isDeniedVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Denied";

// app/components/AudioPlayer.tsx
var import_react3 = require("react");
var AudioPlayer = ({ item }) => {
  let audioPlayerRef = (0, import_react3.useRef)(), {
    setActiveItemDurationSeconds,
    setPlaybackPositionSeconds,
    seekPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default();
  return (0, import_react3.useEffect)(() => {
    let audioPlayer = audioPlayerRef.current;
    audioPlayer && (audioPlayer.ondurationchange = () => {
      if (typeof audioPlayer.duration == "number") {
        let durationSeconds = Math.floor(audioPlayer.duration);
        setActiveItemDurationSeconds(durationSeconds);
      }
    }, audioPlayer.ontimeupdate = () => {
      let playbackPositionSeconds = Math.floor(audioPlayer.currentTime);
      setPlaybackPositionSeconds(playbackPositionSeconds);
    });
  }, []), (0, import_react3.useEffect)(() => {
    let audioPlayer = audioPlayerRef.current;
    audioPlayer && typeof seekPositionSeconds == "number" && (audioPlayer.currentTime = seekPositionSeconds, setSeekPositionSeconds(void 0), audioPlayer.paused && audioPlayer.play());
  }, [seekPositionSeconds]), /* @__PURE__ */ React.createElement("audio", {
    ref: audioPlayerRef,
    id: "audio",
    preload: "metadata",
    autoPlay: !0,
    controls: !0,
    controlsList: "nodownload",
    className: "w-full outline-none"
  }, /* @__PURE__ */ React.createElement("source", {
    src: item.urlSource,
    type: "audio/mpeg"
  }));
}, AudioPlayer_default = AudioPlayer;

// app/components/Player.tsx
var Player = () => {
  let { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), itemHref = (0, import_react4.useMemo)(() => isAudioItem(activeAudioItem) ? `/entities/audio-items/${activeAudioItem.slug}` : window.location.href, [activeAudioItem]);
  return activeAudioItem ? /* @__PURE__ */ React.createElement("div", {
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
    to: itemHref,
    className: "whitespace-nowrap"
  }, "View"), /* @__PURE__ */ React.createElement("button", {
    className: "btn-icon flex ml-2 md:ml-4",
    onClick: () => setActiveAudioItem(null)
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close")))), /* @__PURE__ */ React.createElement(AudioPlayer_default, {
    item: activeAudioItem,
    key: activeAudioItem.id
  })) : null;
}, Player_default = Player;

// app/components/PlayerContextProvider.tsx
var PlayerContext = import_react6.default.createContext(null);
function PlayerContextProvider({ children }) {
  let [activeAudioItem, setActiveAudioItem] = (0, import_react6.useState)(null), [activeItemDurationSeconds, setActiveItemDurationSeconds] = (0, import_react6.useState)(void 0), [playbackPositionSeconds, setPlaybackPositionSeconds] = (0, import_react6.useState)(void 0), [seekPositionSeconds, setSeekPositionSeconds] = (0, import_react6.useState)(void 0);
  return (0, import_react6.useEffect)(() => {
    activeAudioItem || (setActiveItemDurationSeconds(void 0), setPlaybackPositionSeconds(void 0), setSeekPositionSeconds(void 0));
  }, [activeAudioItem]), /* @__PURE__ */ import_react6.default.createElement(PlayerContext.Provider, {
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
var import_react17 = __toESM(require("react")), import_react18 = require("@remix-run/react"), import_react19 = require("@remix-run/react"), import_react_hotkeys_hook2 = require("react-hotkeys-hook");

// app/services/Entity.ts
var import_client3 = require("@prisma/client"), cleanSlug = (rawSlug) => rawSlug.replace(/[\s]/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase(), makeHrefForTopLevel = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case import_client3.EntityType.AudioItem:
      return "/entities/audio-items";
    case import_client3.EntityType.Person:
      return "/entities/people";
    case import_client3.EntityType.Instrument:
      return "/entities/instruments";
    case import_client3.EntityType.Place:
      return "/entities/places";
    case import_client3.EntityType.Tune:
      return "/entities/tunes";
    case import_client3.EntityType.Collection:
      return "/entities/collections";
    default:
      return "";
  }
}, makeHrefForView = (entity) => entity ? `${makeHrefForTopLevel(entity)}/${entity.slug}` : "", makeHrefForEdit = (entity) => entity ? `${makeHrefForView(entity)}/edit` : "", makeHrefForAbout = (entity) => entity ? `${makeHrefForView(entity)}/about` : "", makeHrefForTags = (entity) => entity ? `${makeHrefForView(entity)}/tags` : "", makeReadableNamePlural = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case import_client3.EntityType.AudioItem:
      return "Audio Items";
    case import_client3.EntityType.Person:
      return "People";
    case import_client3.EntityType.Instrument:
      return "Instruments";
    case import_client3.EntityType.Place:
      return "Places";
    case import_client3.EntityType.Tune:
      return "Tunes";
    case import_client3.EntityType.Collection:
      return "Collections";
    default:
      return "";
  }
}, EntityService = {
  cleanSlug,
  makeHrefForTopLevel,
  makeHrefForView,
  makeHrefForEdit,
  makeHrefForAbout,
  makeHrefForTags,
  makeReadableNamePlural
}, Entity_default = EntityService;

// app/components/Modal.tsx
var import_react7 = __toESM(require("react")), import_react_hotkeys_hook = require("react-hotkeys-hook"), Modal = ({
  children,
  isVisible = !1,
  onClose,
  title,
  className
}) => ((0, import_react_hotkeys_hook.useHotkeys)("esc", onClose, {
  enableOnTags: ["INPUT", "TEXTAREA"]
}, [onClose]), (0, import_react7.useEffect)(() => {
  var _a, _b;
  isVisible ? (_a = document.querySelector("#filters")) == null || _a.classList.add("invisible") : (_b = document.querySelector("#filters")) == null || _b.classList.remove("invisible");
}, [isVisible]), isVisible ? /* @__PURE__ */ import_react7.default.createElement("div", {
  className: `${isVisible ? "visible" : "hidden"} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`
}, /* @__PURE__ */ import_react7.default.createElement("div", {
  className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
  onClick: onClose
}), /* @__PURE__ */ import_react7.default.createElement("div", {
  className: `bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-9/10 overflow-y-auto overflow-x-hidden md:max-w-md ${className ?? ""}`
}, /* @__PURE__ */ import_react7.default.createElement("div", {
  className: "flex flex-row justify-between items-center mb-4 text-black"
}, /* @__PURE__ */ import_react7.default.createElement("h2", null, title), /* @__PURE__ */ import_react7.default.createElement("button", {
  className: "btn-icon flex flex-row items-center justify-center ml-4 mb-0.5",
  onClick: onClose,
  "aria-label": "Close"
}, /* @__PURE__ */ import_react7.default.createElement("span", {
  className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-0.5 mr-3"
}, "ESC"), /* @__PURE__ */ import_react7.default.createElement("i", {
  className: "material-icons"
}, "close"))), /* @__PURE__ */ import_react7.default.createElement("div", {
  className: "text-base text-black font-normal whitespace-normal text-left cursor-auto"
}, children))) : null), Modal_default = Modal;

// app/components/SearchEntities.tsx
var import_react15 = require("@remix-run/react"), import_react16 = require("react"), import_client10 = require("@apollo/client"), import_debounce = __toESM(require("lodash/debounce"));

// app/fragments/index.ts
var import_client4 = require("@apollo/client"), UserFragments = {
  user: import_client4.gql`
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
  currentUser: import_client4.gql`
		fragment CurrentUser on User {
			id
			role
			email
			username
			copyrightPermissionStatus
		}
	`
}, RelationshipFragments = {
  relationship: import_client4.gql`
		fragment Relationship on Relationship {
			id
			name
			subjectEntityType
			objectEntityType
		}
	`
}, TagEntityFragments = {
  tagAudioItem: import_client4.gql`
		fragment TagAudioItem on AudioItem {
			id
			entityType
			name
			slug
		}
	`,
  tagInstrument: import_client4.gql`
		fragment TagInstrument on Instrument {
			id
			entityType
			name
			slug
		}
	`,
  tagPerson: import_client4.gql`
		fragment TagPerson on Person {
			id
			entityType
			name
			slug
		}
	`,
  tagPlace: import_client4.gql`
		fragment TagPlace on Place {
			id
			entityType
			name
			slug
		}
	`,
  tagTune: import_client4.gql`
		fragment TagTune on Tune {
			id
			entityType
			name
			slug
			type
		}
	`,
  tagCollection: import_client4.gql`
		fragment TagCollection on Collection {
			id
			entityType
			name
			slug
		}
	`
}, TagFragments = {
  tag: import_client4.gql`
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
  tagForEntity: import_client4.gql`
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
}, EntityFragments = {
  audioItem: import_client4.gql`
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
  person: import_client4.gql`
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
  instrument: import_client4.gql`
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
  place: import_client4.gql`
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
  tune: import_client4.gql`
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
  collection: import_client4.gql`
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
}, CommentFragments = {
  comment: import_client4.gql`
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
  commentWithoutParentEntity: import_client4.gql`
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
}, SavedItemFragments = {
  savedItem: import_client4.gql`
		fragment SavedItem on SavedItem {
			id
			audioItem {
				...AudioItem
			}
			createdAt
		}
		${EntityFragments.audioItem}
	`
}, TakedownRequestFragments = {
  takedownRequest: import_client4.gql`
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
  takedownRequestWithoutEntity: import_client4.gql`
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
}, VerificationRequestFragments = {
  verificationRequest: import_client4.gql`
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
}, SubmissionFragments = {
  submission: import_client4.gql`
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

// app/components/LoadingCircle.tsx
var LoadingCircle = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: "h-6"
}, /* @__PURE__ */ React.createElement("i", {
  className: `material-icons animate-spin text-gray-500 ${className ?? ""}`
}, "scatter_plot")), LoadingCircle_default = LoadingCircle;

// app/components/CreateNewEntities.tsx
var import_react14 = require("react");

// app/hooks/useRequireLogin.ts
var import_react9 = require("@remix-run/react");

// app/hooks/useCurrentUser.ts
var import_react8 = require("react"), import_client5 = require("@apollo/client");
var CURRENT_USER_QUERY = import_client5.gql`
	query CurrentUser {
		currentUser {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`, useCurrentUser = () => {
  var _a;
  let [getCurrentUser, currentUserQuery] = (0, import_client5.useLazyQuery)(CURRENT_USER_QUERY);
  return (0, import_react8.useEffect)(() => {
    getCurrentUser();
  }, [getCurrentUser]), [(_a = currentUserQuery.data) == null ? void 0 : _a.currentUser, currentUserQuery];
}, useCurrentUser_default = useCurrentUser;

// app/hooks/useRequireLogin.ts
var useRequireLogin = () => {
  let navigate = (0, import_react9.useNavigate)(), { pathname } = (0, import_react9.useLocation)(), [currentUser] = useCurrentUser_default();
  return { requireLogin: ({ redirectTo } = {}) => {
    let params = new URLSearchParams({ redirectTo: redirectTo ?? pathname });
    navigate(`/login?${params.toString()}`);
  }, currentUser };
}, useRequireLogin_default = useRequireLogin;

// app/components/CreatePersonForm.tsx
var import_react10 = require("react"), import_client6 = require("@apollo/client");
var CREATE_PERSON_MUTATION = import_client6.gql`
	mutation CreatePerson($input: CreatePersonInput!) {
		createPerson(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`, CreatePersonForm = ({ onSuccess }) => {
  let [createPerson, { loading, error: error2, data: data2 }] = (0, import_client6.useMutation)(CREATE_PERSON_MUTATION, {
    errorPolicy: "all"
  }), [firstName, setFirstName] = (0, import_react10.useState)(""), [middleName, setMiddleName] = (0, import_react10.useState)(""), [lastName, setLastName] = (0, import_react10.useState)(""), [slug, setSlug] = (0, import_react10.useState)(""), [aliases, setAliases] = (0, import_react10.useState)(""), [description, setDescription] = (0, import_react10.useState)("");
  (0, import_react10.useEffect)(() => {
    let proposedSlug = "";
    firstName && (proposedSlug = firstName), middleName && (proposedSlug = `${proposedSlug}-${middleName}`), lastName && (proposedSlug = `${proposedSlug}-${lastName}`), setSlug(Entity_default.cleanSlug(proposedSlug));
  }, [firstName, middleName, lastName]);
  let onCreatePerson = (event) => {
    event.preventDefault(), createPerson({ variables: { input: {
      firstName,
      middleName,
      lastName,
      slug,
      aliases,
      description
    } } });
  };
  return (0, import_react10.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createPerson) {
      if (onSuccess)
        return onSuccess(data2.createPerson);
      window.alert("Person created successfully!"), setFirstName(""), setMiddleName(""), setLastName(""), setSlug(""), setAliases(""), setDescription("");
    }
  }, [data2]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreatePerson
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    autoFocus: !0,
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
}, CreatePersonForm_default = CreatePersonForm;

// app/components/CreateInstrumentForm.tsx
var import_react11 = require("react"), import_client7 = require("@apollo/client");
var CREATE_INSTRUMENT_MUTATION = import_client7.gql`
	mutation CreateInstrument($input: CreateInstrumentInput!) {
		createInstrument(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`, CreateInstrumentForm = ({ onSuccess }) => {
  let [createInstrument, { loading, error: error2, data: data2 }] = (0, import_client7.useMutation)(CREATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  }), [name, setName] = (0, import_react11.useState)(""), [slug, setSlug] = (0, import_react11.useState)(""), [aliases, setAliases] = (0, import_react11.useState)(""), [description, setDescription] = (0, import_react11.useState)("");
  (0, import_react11.useEffect)(() => {
    let proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  let onCreateInstrument = (event) => {
    event.preventDefault(), createInstrument({ variables: { input: {
      name,
      slug,
      aliases,
      description
    } } });
  };
  return (0, import_react11.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createInstrument) {
      if (onSuccess)
        return onSuccess(data2.createInstrument);
      window.alert("Instrument created successfully!"), setName(""), setSlug(""), setAliases(""), setDescription("");
    }
  }, [data2]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateInstrument
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: !0,
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
}, CreateInstrumentForm_default = CreateInstrumentForm;

// app/components/CreatePlaceForm.tsx
var import_react12 = require("react"), import_client8 = require("@apollo/client");
var CREATE_PLACE_MUTATION = import_client8.gql`
	mutation CreatePlace($input: CreatePlaceInput!) {
		createPlace(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`, CreatePlaceForm = ({ onSuccess }) => {
  let [createPlace, { loading, error: error2, data: data2 }] = (0, import_client8.useMutation)(CREATE_PLACE_MUTATION, { errorPolicy: "all" }), [name, setName] = (0, import_react12.useState)(""), [slug, setSlug] = (0, import_react12.useState)(""), [aliases, setAliases] = (0, import_react12.useState)(""), [latitude, setLatitude] = (0, import_react12.useState)(""), [longitude, setLongitude] = (0, import_react12.useState)(""), [description, setDescription] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
    let proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  let onCreatePlace = async (event) => {
    event.preventDefault();
    let input = {
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
  return (0, import_react12.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createPlace) {
      if (onSuccess)
        return onSuccess(data2.createPlace);
      window.alert("Place created successfully!"), setName(""), setSlug(""), setAliases(""), setLatitude(""), setLongitude(""), setDescription("");
    }
  }, [data2]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreatePlace
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: !0,
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
}, CreatePlaceForm_default = CreatePlaceForm;

// app/components/CreateCollectionForm.tsx
var import_react13 = require("react"), import_client9 = require("@apollo/client");
var CREATE_COLLECTION_MUTATION = import_client9.gql`
	mutation CreateCollection($input: CreateCollectionInput!) {
		createCollection(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`, CreateCollectionForm = ({ onSuccess }) => {
  let [createCollection, { loading, error: error2, data: data2 }] = (0, import_client9.useMutation)(CREATE_COLLECTION_MUTATION, { errorPolicy: "all" }), [name, setName] = (0, import_react13.useState)(""), [slug, setSlug] = (0, import_react13.useState)(""), [aliases, setAliases] = (0, import_react13.useState)(""), [description, setDescription] = (0, import_react13.useState)("");
  (0, import_react13.useEffect)(() => {
    let proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  let onCreateCollection = async (event) => {
    event.preventDefault();
    let input = {
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
  return (0, import_react13.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createCollection) {
      if (onSuccess)
        return onSuccess(data2.createCollection);
      window.alert("Collection created successfully!"), setName(""), setSlug(""), setAliases(""), setDescription("");
    }
  }, [data2]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 mb-8"
  }, `A Collection is a logical grouping of other entities. For example, "O'Neill's Music of Ireland" would be a Collection of Tunes. Or the "Alen MacWeeney Collection" would be a Collection of AudioItems.`), /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateCollection
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: !0,
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
}, CreateCollectionForm_default = CreateCollectionForm;

// app/components/CreateNewEntities.tsx
var CreateNewEntities = ({ entityTypes, onNewEntityCreated }) => {
  let { currentUser, requireLogin } = useRequireLogin_default(), [createPersonModalIsVisible, setCreatePersonModalIsVisible] = (0, import_react14.useState)(!1), [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] = (0, import_react14.useState)(!1), [createPlaceModalIsVisible, setCreatePlaceModalIsVisible] = (0, import_react14.useState)(!1), [createCollectionModalIsVisible, setCreateCollectionModalIsVisible] = (0, import_react14.useState)(!1), onCreateNewPersonClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser)
      return await requireLogin();
    setCreatePersonModalIsVisible(!0);
  }, [requireLogin, currentUser]), onCreateNewInstrumentClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser)
      return await requireLogin();
    setCreateInstrumentModalIsVisible(!0);
  }, [requireLogin, currentUser]), onCreateNewPlaceClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser)
      return await requireLogin();
    setCreatePlaceModalIsVisible(!0);
  }, [requireLogin, currentUser]), onCreateNewCollectionClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser)
      return await requireLogin();
    setCreateCollectionModalIsVisible(!0);
  }, [requireLogin, currentUser]), onNewPersonCreated = (0, import_react14.useCallback)((person2) => {
    setCreatePersonModalIsVisible(!1), onNewEntityCreated(person2);
  }, [onNewEntityCreated]), onNewInstrumentCreated = (0, import_react14.useCallback)((instrument) => {
    setCreateInstrumentModalIsVisible(!1), onNewEntityCreated(instrument);
  }, []), onNewPlaceCreated = (0, import_react14.useCallback)((place) => {
    setCreatePlaceModalIsVisible(!1), onNewEntityCreated(place);
  }, []), onNewCollectionCreated = (0, import_react14.useCallback)((collection) => {
    setCreateCollectionModalIsVisible(!1), onNewEntityCreated(collection);
  }, []), shouldShowCreatePerson = typeof entityTypes > "u" || entityTypes.includes("Person" /* Person */), shouldShowCreateInstrument = typeof entityTypes > "u" || entityTypes.includes("Instrument" /* Instrument */), shouldShowCreatePlace = typeof entityTypes > "u" || entityTypes.includes("Place" /* Place */), shouldShowCreateCollection = typeof entityTypes > "u" || entityTypes.includes("Collection" /* Collection */);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Can't find it? Create new:", " ", shouldShowCreatePerson && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewPersonClicked
  }, "Person"), (!entityTypes || shouldShowCreateInstrument || shouldShowCreatePlace || shouldShowCreateCollection) && ", "), shouldShowCreateInstrument && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewInstrumentClicked
  }, "Instrument"), (!entityTypes || shouldShowCreatePlace || shouldShowCreateCollection) && ", "), shouldShowCreatePlace && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewPlaceClicked
  }, "Place"), (!entityTypes || shouldShowCreateCollection) && ", "), shouldShowCreateCollection && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewCollectionClicked
  }, "Collection")), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Person",
    isVisible: createPersonModalIsVisible,
    onClose: () => setCreatePersonModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreatePersonForm_default, {
    onSuccess: onNewPersonCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Instrument",
    isVisible: createInstrumentModalIsVisible,
    onClose: () => setCreateInstrumentModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreateInstrumentForm_default, {
    onSuccess: onNewInstrumentCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Place",
    isVisible: createPlaceModalIsVisible,
    onClose: () => setCreatePlaceModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreatePlaceForm_default, {
    onSuccess: onNewPlaceCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Collection",
    isVisible: createCollectionModalIsVisible,
    onClose: () => setCreateCollectionModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreateCollectionForm_default, {
    onSuccess: onNewCollectionCreated
  })));
}, CreateNewEntities_default = CreateNewEntities;

// app/components/SearchEntities.tsx
var SEARCH_ENTITIES_QUERY = import_client10.gql`
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
`, SearchEntities = ({
  entityTypes,
  take,
  onSelect,
  onNewEntityCreated,
  className
}) => {
  let [searchTerm, setSearchTerm] = (0, import_react16.useState)(""), [searchResults, setSearchResults] = (0, import_react16.useState)(), onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  }, [searchEntities, { loading, data: data2, error: error2 }] = (0, import_client10.useLazyQuery)(SEARCH_ENTITIES_QUERY, {
    fetchPolicy: "no-cache"
  }), debouncedSearchEntities = (0, import_react16.useCallback)((0, import_debounce.default)(searchEntities, 300, { trailing: !0 }), [searchEntities]);
  return (0, import_react16.useEffect)(() => {
    let cleanedSearchTerm = (searchTerm == null ? void 0 : searchTerm.trim()) ?? "";
    cleanedSearchTerm.length >= 3 && debouncedSearchEntities({
      variables: {
        input: {
          searchTerm: cleanedSearchTerm,
          entityTypes,
          take: take ?? 24
        }
      }
    });
  }, [searchTerm]), (0, import_react16.useEffect)(() => {
    (data2 == null ? void 0 : data2.searchEntities) && setSearchResults(data2.searchEntities);
  }, [data2]), /* @__PURE__ */ React.createElement("div", {
    className: className ?? ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("input", {
    autoFocus: !0,
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
}, SearchEntities_default = SearchEntities;

// app/components/Header.tsx
var Header = ({ currentUser }) => {
  let navigate = (0, import_react19.useNavigate)(), [searchModalIsVisible, setSearchModalIsVisible] = (0, import_react17.useState)(!1), openSearchModal = (event) => {
    event.preventDefault(), setSearchModalIsVisible(!0);
  }, closeSearchModal = () => {
    setSearchModalIsVisible(!1);
  };
  (0, import_react_hotkeys_hook2.useHotkeys)("/", openSearchModal);
  let onSelectSearchResult = (0, import_react17.useCallback)((entity) => {
    setSearchModalIsVisible(!1), navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]), onNewEntityCreated = (0, import_react17.useCallback)((entity) => {
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, /* @__PURE__ */ import_react17.default.createElement("div", {
    className: "flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700"
  }, /* @__PURE__ */ import_react17.default.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ import_react17.default.createElement(import_react18.Link, {
    to: "/",
    className: "whitespace-nowrap no-underline text-yellow-200 hover:text-gray-400"
  }, "Trad Archive"), /* @__PURE__ */ import_react17.default.createElement("button", {
    className: "flex flex-row items-center whitespace-nowrap text-white hover:text-gray-400 group ml-4",
    onClick: openSearchModal
  }, /* @__PURE__ */ import_react17.default.createElement("i", {
    className: "material-icons"
  }, "search"), /* @__PURE__ */ import_react17.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Search"), /* @__PURE__ */ import_react17.default.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5"
  }, "/")), /* @__PURE__ */ import_react17.default.createElement(import_react18.Link, {
    to: "/entities/audio-items/random",
    className: "flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react17.default.createElement("div", {
    className: "block h-6"
  }, /* @__PURE__ */ import_react17.default.createElement("i", {
    className: "material-icons"
  }, "shuffle")), /* @__PURE__ */ import_react17.default.createElement("div", {
    className: "md:pl-2 hidden md:block"
  }, "Random"))), currentUser ? /* @__PURE__ */ import_react17.default.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ import_react17.default.createElement(import_react18.Link, {
    to: "/saved-items",
    className: "flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react17.default.createElement("i", {
    className: "material-icons"
  }, "bookmark"), /* @__PURE__ */ import_react17.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Saved")), /* @__PURE__ */ import_react17.default.createElement(import_react18.Link, {
    to: "/account",
    className: "flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react17.default.createElement("i", {
    className: "material-icons"
  }, "account_circle"), /* @__PURE__ */ import_react17.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Account"))) : /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement(import_react18.Link, {
    to: "/login",
    className: "whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
  }, "Log In"), /* @__PURE__ */ import_react17.default.createElement(import_react18.Link, {
    to: "/signup",
    className: "btn text-current no-underline whitespace-nowrap hover:text-current ml-4"
  }, "Sign Up"))), /* @__PURE__ */ import_react17.default.createElement(Modal_default, {
    title: "Search",
    isVisible: searchModalIsVisible,
    onClose: closeSearchModal
  }, /* @__PURE__ */ import_react17.default.createElement(SearchEntities_default, {
    onSelect: onSelectSearchResult,
    onNewEntityCreated
  })));
}, Header_default = Header;

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
var apolloClient = new import_client11.ApolloClient({ cache: new import_client11.InMemoryCache() }), meta = () => ({
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
var loader = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), currentUser = null;
  return userId && (currentUser = await db.user.findUnique({ where: { id: userId } })), (0, import_node2.json)({ currentUser });
};
function App() {
  let { currentUser } = (0, import_react20.useLoaderData)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react20.Meta, null), /* @__PURE__ */ React.createElement(import_react20.Links, null)), /* @__PURE__ */ React.createElement(import_client11.ApolloProvider, {
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
  }, /* @__PURE__ */ React.createElement(Header_default, {
    currentUser
  }))), /* @__PURE__ */ React.createElement(import_react20.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react20.Scripts, null), /* @__PURE__ */ React.createElement(import_react20.LiveReload, null)))));
}
function ErrorBoundary({ error: error2 }) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react20.Meta, null), /* @__PURE__ */ React.createElement(import_react20.Links, null)), /* @__PURE__ */ React.createElement(import_client11.ApolloProvider, {
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
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react20.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react20.Scripts, null), /* @__PURE__ */ React.createElement(import_react20.LiveReload, null)))));
}
function CatchBoundary() {
  let { currentUser } = (0, import_react20.useLoaderData)(), caught = (0, import_react20.useCatch)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react20.Meta, null), /* @__PURE__ */ React.createElement(import_react20.Links, null)), /* @__PURE__ */ React.createElement(import_client11.ApolloProvider, {
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
  }, /* @__PURE__ */ React.createElement(Header_default, {
    currentUser
  }))), /* @__PURE__ */ React.createElement(import_react20.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react20.Scripts, null), /* @__PURE__ */ React.createElement(import_react20.LiveReload, null)))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var upload_exports = {};
__export(upload_exports, {
  default: () => upload_default
});
var import_react24 = require("react"), import_react25 = require("@remix-run/react"), import_client12 = require("@apollo/client");

// app/components/Layout.tsx
var Layout = ({ children }) => /* @__PURE__ */ React.createElement("div", {
  className: "flex flex-col justify-start items-center"
}, /* @__PURE__ */ React.createElement("div", {
  className: "w-full min-h-screen lg:max-w-5xl pb-44"
}, children)), Layout_default = Layout;

// app/components/RequireUser.tsx
var import_react21 = require("@remix-run/react");
var RequireUser = ({
  children,
  requireUserId
}) => {
  let navigate = (0, import_react21.useNavigate)(), [currentUser, { data: data2, error: error2 }] = useCurrentUser_default();
  return !data2 && !error2 ? /* @__PURE__ */ React.createElement("div", null, "Checking for logged-in user...") : requireUserId && (currentUser == null ? void 0 : currentUser.id) !== requireUserId ? /* @__PURE__ */ React.createElement("div", null, "You do not have access to this page") : currentUser ? /* @__PURE__ */ React.createElement(React.Fragment, null, children) : (typeof window < "u" && navigate({
    pathname: "/login",
    query: { redirectTo: window.location.pathname }
  }), null);
}, RequireUser_default = RequireUser;

// app/components/Breadcrumb.tsx
var import_react22 = require("@remix-run/react"), Breadcrumb = ({ items = [], className }) => {
  if (items.length === 0)
    return null;
  if (items.length === 1)
    return /* @__PURE__ */ React.createElement("h1", {
      className: className ?? ""
    }, items[0].label);
  let subItems = items.slice(0, items.length - 1), finalItem = items[items.length - 1];
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center mb-1"
  }, subItems.map(({ label, href }, index) => /* @__PURE__ */ React.createElement("div", {
    className: "flex",
    key: index
  }, href ? /* @__PURE__ */ React.createElement(import_react22.Link, {
    to: href
  }, label) : /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, label), /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-gray-500 text-base ml-1"
  }, "keyboard_arrow_right")))), /* @__PURE__ */ React.createElement("h1", null, finalItem.label));
}, Breadcrumb_default = Breadcrumb;

// app/components/LoadingBlock.tsx
var LoadingBlock = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: `flex flex-col justify-start items-start w-full ${className ?? ""}`
}, /* @__PURE__ */ React.createElement("div", {
  className: "flex h-5 w-2/3 rounded bg-gray-300 mb-4 animate-pulse"
}), /* @__PURE__ */ React.createElement("div", {
  className: "flex h-12 w-full rounded bg-gray-300 mb-4 animate-pulse"
}), /* @__PURE__ */ React.createElement("div", {
  className: "flex h-5 w-5/12 rounded bg-gray-300 mb-4 animate-pulse"
})), LoadingBlock_default = LoadingBlock;

// app/components/FileUploader.tsx
var import_react23 = require("react");
var FileUploader = ({ filesWithUploadUrls, onSuccess }) => {
  let queue = (0, import_react23.useRef)({
    pending: filesWithUploadUrls,
    inProgress: [],
    failed: [],
    succeeded: []
  }), [ticker, setTicker] = (0, import_react23.useState)(0), moveFromPendingToInProgress = (file) => {
    let updated = __spreadValues({}, queue.current);
    updated.pending = updated.pending.filter((f) => f.uploadUrl !== file.uploadUrl), updated.inProgress = [...updated.inProgress, file], queue.current = updated;
  }, moveFromInProgressToSucceeded = (file) => {
    let updated = __spreadValues({}, queue.current);
    updated.inProgress = updated.inProgress.filter((f) => f.uploadUrl !== file.uploadUrl), updated.succeeded = [...updated.succeeded, file], queue.current = updated;
  }, moveFromInProgressToFailed = (file) => {
    let updated = __spreadValues({}, queue.current);
    updated.inProgress = updated.inProgress.filter((f) => f.uploadUrl !== file.uploadUrl), updated.failed = [...updated.failed, file], queue.current = updated;
  }, uploadFile = async (f) => {
    try {
      moveFromPendingToInProgress(f), await fetch(f.uploadUrl, {
        method: "PUT",
        body: f.file
      }), moveFromInProgressToSucceeded(f);
    } catch {
      moveFromInProgressToFailed(f);
    }
  }, checkForFilesToUpload = () => {
    if (queue.current.succeeded.length === filesWithUploadUrls.length) {
      onSuccess && setTimeout(() => onSuccess(), 500);
      return;
    }
    queue.current.pending.length === 0 || queue.current.inProgress.length >= 2 || uploadFile(queue.current.pending[0]);
  };
  (0, import_react23.useEffect)(() => {
    let interval = setInterval(checkForFilesToUpload, 1e3);
    return () => clearInterval(interval);
  }, [checkForFilesToUpload]), (0, import_react23.useEffect)(() => {
    let interval = setInterval(() => setTicker(ticker + 1), 1e3);
    return () => clearInterval(interval);
  }, [ticker]);
  let renderFileStatus = (file) => queue.current.inProgress.includes(file) ? /* @__PURE__ */ React.createElement(LoadingCircle_default, null) : queue.current.failed.includes(file) ? /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-red-600"
  }, "error") : queue.current.succeeded.includes(file) ? /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-teal-600"
  }, "check") : /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-gray-500"
  }, "schedule");
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
}, FileUploader_default = FileUploader;

// app/services/DateTime.ts
var import_format = __toESM(require("date-fns/format")), import_isToday = __toESM(require("date-fns/isToday")), import_isYesterday = __toESM(require("date-fns/isYesterday")), formatSecondsAsDuration = (inputSeconds) => {
  let hours = Math.floor(inputSeconds / 3600), minutes = Math.floor((inputSeconds - hours * 60 * 60) / 60), minutesAsTwoCharString = minutes < 10 ? `0${minutes}` : `${minutes}`, seconds = inputSeconds - hours * 60 * 60 - minutes * 60, secondsAsTwoCharString = seconds < 10 ? `0${seconds}` : `${seconds}`, output = `${minutes}:${secondsAsTwoCharString}`;
  return hours > 0 && (output = `${hours}:${minutesAsTwoCharString}:${secondsAsTwoCharString}`), output;
}, formatDateYear = (date, shouldCapitalize = !1) => {
  if (!date)
    return "";
  let dateObject = date instanceof Date ? date : new Date(date);
  return (0, import_isToday.default)(dateObject) ? (0, import_format.default)(dateObject, `'${shouldCapitalize ? "T" : "t"}oday`) : (0, import_isYesterday.default)(dateObject) ? (0, import_format.default)(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday`) : (0, import_format.default)(new Date(date), "LLLL d, y");
}, formatDateYearTime = (date, shouldCapitalize = !1) => {
  if (!date)
    return "";
  let dateObject = date instanceof Date ? date : new Date(date);
  return (0, import_isToday.default)(dateObject) ? (0, import_format.default)(dateObject, `'${shouldCapitalize ? "T" : "t"}oday at' h:mm a`) : (0, import_isYesterday.default)(dateObject) ? (0, import_format.default)(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday at' h:mm a`) : (0, import_format.default)(new Date(date), "LLLL d, y 'at' h:mm a");
}, DateTimeService = {
  formatSecondsAsDuration,
  formatDateYear,
  formatDateYearTime
}, DateTime_default = DateTimeService;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var SUBMISSION = import_client12.gql`
	query Submission($input: SubmissionInput!) {
		submission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`, CREATE_PRESIGNED_FILE_UPLOAD_URLS = import_client12.gql`
	mutation CreatePresignedFileUploadUrls(
		$input: CreatePresignedFileUploadUrlsInput!
	) {
		createPresignedFileUploadUrls(input: $input) {
			filename
			presignedUploadUrl
		}
	}
`, SubmissionsViewByIdUpload = () => {
  let navigate = (0, import_react25.useNavigate)(), { id } = navigate.query, submissionId = typeof id == "string" ? id : void 0, { data: data2, error: error2 } = (0, import_client12.useQuery)(SUBMISSION, {
    variables: { input: { id: submissionId } },
    skip: !submissionId
  }), [files, setFiles] = (0, import_react24.useState)([]), [uploadQueue, setUploadQueue] = (0, import_react24.useState)(), [getPresignedUrls] = (0, import_client12.useMutation)(CREATE_PRESIGNED_FILE_UPLOAD_URLS), onUploadClicked = async () => {
    if (!!submissionId)
      try {
        let filenamesForUrls = files.map((f) => `${f.size}_${f.name}`), uploadUrls = (await getPresignedUrls({
          variables: { input: { submissionId, filenames: filenamesForUrls } }
        })).data.createPresignedFileUploadUrls;
        if (uploadUrls.length !== files.length)
          throw new Error("Unexpected number of presigned upload URLs");
        setUploadQueue(files.map((f, index) => ({
          file: f,
          uploadUrl: uploadUrls[index].presignedUploadUrl
        })));
      } catch {
        alert("Error uploading files. Please try again.");
      }
  };
  if (!data2)
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, error2 ? /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600"
    }, error2.graphQLErrors.map((e) => e.message).join(", ")) : /* @__PURE__ */ React.createElement(LoadingBlock_default, null)));
  let onFilesSelected = (event) => {
    let updatedFiles = [...files], selected = Array.from(event.target.files);
    for (let s of selected)
      updatedFiles.find((f) => f.name === s.name && f.size === s.size && f.lastModified === s.lastModified) || updatedFiles.push(s);
    setFiles(updatedFiles);
  }, onRemove = (file) => {
    setFiles(files.filter((f) => !(f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)));
  }, onUploadSuccess = () => {
    alert("Files uploaded successfully!"), navigate("/account/submissions");
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions", href: "/account/submissions" },
      {
        label: DateTime_default.formatDateYearTime(data2.submission.createdAt, !0)
      },
      { label: "Upload Files" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-col"
  }, uploadQueue ? /* @__PURE__ */ React.createElement(FileUploader_default, {
    filesWithUploadUrls: uploadQueue,
    onSuccess: onUploadSuccess
  }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "file-picker"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "btn-text mb-4 cursor-pointer"
  }, files.length === 0 ? "Choose Files" : "Choose More Files")), /* @__PURE__ */ React.createElement("input", {
    id: "file-picker",
    type: "file",
    multiple: !0,
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
  }, "Upload ", files.length, " File", files.length === 1 ? "" : "s"))))));
}, upload_default = SubmissionsViewByIdUpload;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/verification-requests.tsx
var verification_requests_exports = {};
__export(verification_requests_exports, {
  default: () => verification_requests_default
});
var import_react27 = require("react"), import_react28 = require("@remix-run/react"), import_client13 = require("@apollo/client"), import_compareDesc = __toESM(require("date-fns/compareDesc"));

// app/components/RequireAdmin.tsx
var import_react26 = require("@remix-run/react");

// app/services/User.ts
var isAdmin = (user) => user ? user.role === "Admin" /* Admin */ : !1, UserService = {
  isAdmin
}, User_default = UserService;

// app/components/RequireAdmin.tsx
var RequireAdmin = ({ children }) => {
  let navigate = (0, import_react26.useNavigate)(), [currentUser, { data: data2, error: error2 }] = useCurrentUser_default();
  return currentUser && User_default.isAdmin(currentUser) ? /* @__PURE__ */ React.createElement(React.Fragment, null, children) : !data2 && !error2 ? /* @__PURE__ */ React.createElement("div", null, "Checking admin permissions...") : (typeof window < "u" && navigate({
    pathname: "/login",
    query: { redirectTo: window.location.pathname }
  }), null);
}, RequireAdmin_default = RequireAdmin;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/verification-requests.tsx
var VERIFICATION_REQUESTS = import_client13.gql`
	query VerificationRequests($input: VerificationRequestsInput!) {
		verificationRequests(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`, UPDATE_VERIFICATION_REQUEST_STATUS = import_client13.gql`
	mutation UpdateVerificationRequestStatus(
		$input: UpdateVerificationRequestStatusInput!
	) {
		updateVerificationRequestStatus(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`, VerificationRequests = () => {
  let [statusToFetch, setStatusToFetch] = (0, import_react27.useState)("Pending" /* Pending */), onChangeStatusToFetch = (event) => {
    let updatedStatus = event.target.value;
    setStatusToFetch(updatedStatus ? event.target.value : void 0);
  }, {
    loading: verificationRequestsLoading,
    data: verificationRequestsData,
    error: verificationRequestsError
  } = (0, import_client13.useQuery)(VERIFICATION_REQUESTS, {
    variables: { input: { take: 200, skip: 0, status: statusToFetch } },
    fetchPolicy: "network-only"
  }), verificationRequests = (0, import_react27.useMemo)(() => {
    if (!(verificationRequestsData == null ? void 0 : verificationRequestsData.verificationRequests))
      return [];
    let sortedVerificationRequests = [
      ...verificationRequestsData.verificationRequests
    ];
    return sortedVerificationRequests.sort((a, b) => (0, import_compareDesc.default)(new Date(a.createdAt), new Date(b.createdAt))), sortedVerificationRequests;
  }, [verificationRequestsData]), [
    updateVerificationRequestStatus,
    {
      loading: updateVerificationRequestStatusLoading,
      error: updateVerificationRequestStatusError
    }
  ] = (0, import_client13.useMutation)(UPDATE_VERIFICATION_REQUEST_STATUS, { errorPolicy: "all" }), onApproveClicked = (id) => {
    updateVerificationRequestStatus({
      variables: { input: { id, status: "Approved" /* Approved */ } }
    });
  }, onDenyClicked = (id) => {
    updateVerificationRequestStatus({
      variables: { input: { id, status: "Denied" /* Denied */ } }
    });
  };
  return (0, import_react27.useEffect)(() => {
    updateVerificationRequestStatusError && window.alert("Error updating Verification Request status. Please reload the page and try again.");
  }, [updateVerificationRequestStatusError]), /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
    let {
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
    }, "Created ", DateTime_default.formatDateYearTime(createdAt), /* @__PURE__ */ React.createElement("br", null), "User", " ", /* @__PURE__ */ React.createElement(import_react28.Link, {
      to: `/users/${createdByUser.id}`
    }, /* @__PURE__ */ React.createElement("a", {
      target: "_blank"
    }, createdByUser.username)), " ", "is asking to be verified as Person", " ", /* @__PURE__ */ React.createElement(import_react28.Link, {
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
}, verification_requests_default = VerificationRequests;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var random_exports = {};
__export(random_exports, {
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
async function loader2() {
  let totalAudioItems = await db.audioItem.count(), randomSkip = Math.round(Math.random() * (totalAudioItems - 1)), [audioItem] = await db.audioItem.findMany({
    take: 1,
    skip: randomSkip
  });
  return (0, import_node3.redirect)(`/entities/audio-items/${audioItem.slug}`);
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => slug_default,
  loader: () => loader3
});
var import_react52 = require("@remix-run/react");

// app/components/AudioItemCard.tsx
var import_react43 = require("react"), import_react44 = require("@remix-run/react");

// app/components/Tags.tsx
var import_react34 = require("react"), import_react35 = require("@remix-run/react");

// app/services/Tag.ts
var import_compareAsc = __toESM(require("date-fns/compareAsc")), import_compareDesc2 = __toESM(require("date-fns/compareDesc")), TagSortStrategy = /* @__PURE__ */ ((TagSortStrategy2) => (TagSortStrategy2.CreatedAtThenTimeMarker = "CREATED_AT_THEN_TIME_MARKER", TagSortStrategy2.CreatedAtDesc = "CREATED_AT_DESC", TagSortStrategy2))(TagSortStrategy || {}), sortByCreatedAtThenTimeMarker = (tags) => {
  let sortedTags = [...tags ?? []];
  return sortedTags.sort((a, b) => typeof a.subjectTimeMarkerSeconds != "number" && typeof b.subjectTimeMarkerSeconds != "number" ? (0, import_compareAsc.default)(new Date(a.createdAt), new Date(b.createdAt)) : typeof a.subjectTimeMarkerSeconds != "number" && typeof b.subjectTimeMarkerSeconds == "number" ? -1 : (a.subjectTimeMarkerSeconds ?? 0) - (b.subjectTimeMarkerSeconds ?? 0)), sortedTags;
}, sortByCreatedAtDesc = (tags) => {
  let sortedTags = [...tags ?? []];
  return sortedTags.sort((a, b) => (0, import_compareDesc2.default)(new Date(a.createdAt), new Date(b.createdAt))), sortedTags;
}, sort = (tags = [], sortStrategy = "CREATED_AT_THEN_TIME_MARKER" /* CreatedAtThenTimeMarker */) => {
  switch (sortStrategy) {
    case "CREATED_AT_THEN_TIME_MARKER" /* CreatedAtThenTimeMarker */:
      return sortByCreatedAtThenTimeMarker(tags);
    case "CREATED_AT_DESC" /* CreatedAtDesc */:
      return sortByCreatedAtDesc(tags);
    default:
      return tags;
  }
}, getObjectEntity = (tag) => tag.objectAudioItem ?? tag.objectCollection ?? tag.objectInstrument ?? tag.objectPerson ?? tag.objectPlace ?? tag.objectTune, Tag_default = {
  TagSortStrategy,
  sort,
  getObjectEntity
};

// app/components/AddTagButton.tsx
var import_react32 = require("react"), import_client17 = require("@apollo/client");

// app/components/CreateTagForm.tsx
var import_react31 = require("react"), import_client16 = require("@apollo/client");

// app/hooks/useTags.ts
var import_react29 = require("react"), import_client14 = require("@apollo/client");
var TAGS_QUERY = import_client14.gql`
	query Tags($input: TagsInput!) {
		tags(input: $input) {
			...Tag
		}
	}
	${TagFragments.tag}
`, useTags = ({
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  var _a;
  let [getTags, tagsQuery] = (0, import_client14.useLazyQuery)(TAGS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: !0
  }, queryOptions)), { data: data2, fetchMore } = tagsQuery;
  (0, import_react29.useEffect)(() => {
    getTags({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getTags, resultsPerPage]);
  let tags = data2 == null ? void 0 : data2.tags, fetchNextPageOfTags = (0, import_react29.useCallback)(() => {
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
}, useTags_default = useTags;

// app/components/SelectRelationship.tsx
var import_react30 = require("react"), import_client15 = require("@apollo/client");
var SEARCH_RELATIONSHIPS_QUERY = import_client15.gql`
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
`, SelectRelationship = ({
  subjectEntity,
  objectEntity,
  onSelect
}) => {
  let [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react30.useState)(""), { loading, data: data2, error: error2 } = (0, import_client15.useQuery)(SEARCH_RELATIONSHIPS_QUERY, {
    variables: {
      subjectEntityType: subjectEntity.entityType,
      objectEntityType: objectEntity.entityType
    },
    fetchPolicy: "no-cache"
  }), relationshipOptions = (data2 == null ? void 0 : data2.searchRelationships) ?? [];
  (0, import_react30.useEffect)(() => {
    relationshipOptions.length > 0 && onSelectRelationshipId(relationshipOptions[0].id);
  }, [relationshipOptions]);
  let onSelectRelationshipId = (relationshipId) => {
    setSelectedRelationshipId(relationshipId), onSelect(relationshipId);
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
}, SelectRelationship_default = SelectRelationship;

// app/components/TimestampInput.tsx
var TimestampInput = ({ valueInSeconds, onChange, className }) => {
  let hrs = Math.floor(valueInSeconds / 3600), mins = Math.floor((valueInSeconds - hrs * 3600) / 60), secs = valueInSeconds - hrs * 3600 - mins * 60, onChangeHrs = (event) => {
    let newValueInSeconds = (parseInt(event.target.value, 10) || 0) * 3600 + mins * 60 + secs;
    onChange(newValueInSeconds);
  }, onChangeMins = (event) => {
    let newMins = parseInt(event.target.value, 10) || 0, newValueInSeconds = hrs * 3600 + newMins * 60 + secs;
    onChange(newValueInSeconds);
  }, onChangeSecs = (event) => {
    let newSecs = parseInt(event.target.value, 10) || 0, newValueInSeconds = hrs * 3600 + mins * 60 + newSecs;
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
}, TimestampInput_default = TimestampInput;

// app/components/CreateTagForm.tsx
var CREATE_TAG_MUTATION = import_client16.gql`
	mutation CreateTag($input: CreateTagInput!) {
		createTag(input: $input) {
			id
		}
	}
`, CreateTagForm = ({ entity, onSuccess }) => {
  let {
    activeAudioItem,
    playbackPositionSeconds,
    activeItemDurationSeconds
  } = usePlayerContext_default(), defaultTimeMarkerValue = (activeAudioItem == null ? void 0 : activeAudioItem.id) === entity.id ? playbackPositionSeconds : void 0, [shouldAddTimeMarker, setShouldAddTimeMarker] = (0, import_react31.useState)(!1), [timeMarkerValue, setTimeMarkerValue] = (0, import_react31.useState)(defaultTimeMarkerValue), [selectedEntity, setSelectedEntity] = (0, import_react31.useState)(null), [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react31.useState)(""), [shouldCreateInverseRelationship, setShouldCreateInverseRelationship] = (0, import_react31.useState)(!0), [selectedInverseRelationshipId, setSelectedInverseRelationshipId] = (0, import_react31.useState)(""), [createTag, { data: data2, error: error2 }] = (0, import_client16.useMutation)(CREATE_TAG_MUTATION, {
    errorPolicy: "all"
  }), [tagsAreCreating, setTagsAreCreating] = (0, import_react31.useState)(!1), [primaryCreatedTag, setPrimaryCreatedTag] = (0, import_react31.useState)(void 0), [tagsAreCreated, setTagsAreCreated] = (0, import_react31.useState)(!1), {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default({
    queryOptions: { fetchPolicy: "network-only" }
  });
  (0, import_react31.useEffect)(() => {
    if (!tagsAreCreated)
      return;
    primaryCreatedTag && (async (tag) => {
      refetchTopLevelTags && await refetchTopLevelTags(), await onSuccess(tag);
    })(primaryCreatedTag);
  }, [data2, refetchTopLevelTags, onSuccess, tagsAreCreated, primaryCreatedTag]);
  let onSelectEntity = (0, import_react31.useCallback)((selectedEntityFromResults) => {
    if (selectedEntityFromResults.id === entity.id)
      return window.alert("Cannot tag an entity with itself");
    setSelectedEntity(selectedEntityFromResults);
  }, [entity]), onNewEntityCreated = (0, import_react31.useCallback)((entity2) => {
    setSelectedEntity(entity2);
  }, []), onTimeMarkerValueChanged = (0, import_react31.useCallback)((newTimeMarkerValueSeconds) => {
    setShouldAddTimeMarker(!0), newTimeMarkerValueSeconds >= activeItemDurationSeconds ? setTimeMarkerValue(activeItemDurationSeconds) : newTimeMarkerValueSeconds <= 0 ? setTimeMarkerValue(0) : setTimeMarkerValue(newTimeMarkerValueSeconds);
  }, [activeItemDurationSeconds]), onSelectRelationship = (0, import_react31.useCallback)((relationshipId) => {
    setSelectedRelationshipId(relationshipId);
  }, [setSelectedRelationshipId]), onSelectInverseRelationship = (0, import_react31.useCallback)((relationshipId) => {
    setSelectedInverseRelationshipId(relationshipId);
  }, [setSelectedInverseRelationshipId]), onCreateTagClicked = (0, import_react31.useCallback)(async () => {
    var _a;
    setTagsAreCreating(!0);
    let subjectTimeMarkerSeconds;
    shouldAddTimeMarker && !isNaN(timeMarkerValue) && (subjectTimeMarkerSeconds = timeMarkerValue);
    let tagInput = {
      relationshipId: selectedRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
      subjectTimeMarkerSeconds
    }, primaryTagQuery = await createTag({ variables: { input: tagInput } });
    if (setPrimaryCreatedTag((_a = primaryTagQuery.data) == null ? void 0 : _a.createTag), shouldCreateInverseRelationship && selectedInverseRelationshipId) {
      let inverseTagInput = {
        relationshipId: selectedInverseRelationshipId,
        subjectEntityType: selectedEntity.entityType,
        subjectEntityId: selectedEntity.id,
        objectEntityType: entity.entityType,
        objectEntityId: entity.id,
        subjectTimeMarkerSeconds
      };
      await createTag({ variables: { input: inverseTagInput } });
    }
    setTagsAreCreating(!1), setTagsAreCreated(!0);
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
  if (!selectedEntity)
    return /* @__PURE__ */ React.createElement(SearchEntities_default, {
      onSelect: onSelectEntity,
      onNewEntityCreated
    });
  let shouldShowTimeMarkerCheckbox = entity.entityType === "AudioItem" /* AudioItem */ && typeof defaultTimeMarkerValue < "u";
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
}, CreateTagForm_default = CreateTagForm;

// app/components/AddTagButton.tsx
var PARENT_ENTITY_QUERY = import_client17.gql`
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
`, AddTagButton = ({ entity, onSuccess, className, children }) => {
  let { currentUser, requireLogin } = useRequireLogin_default(), [addTagModalIsVisible, setAddTagModalIsVisible] = (0, import_react32.useState)(!1), [getParentEntity, { loading: parentEntityLoading }] = (0, import_client17.useLazyQuery)(PARENT_ENTITY_QUERY, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  }), onCreateTagSuccess = (0, import_react32.useCallback)(async (tag) => {
    await getParentEntity(), setAddTagModalIsVisible(!1), onSuccess && onSuccess(tag);
  }, [getParentEntity, setAddTagModalIsVisible, onSuccess]), onAddTagClicked = (0, import_react32.useCallback)(async () => {
    if (!currentUser) {
      let redirectTo = Entity_default.makeHrefForView(entity);
      return await requireLogin({ redirectTo });
    }
    setAddTagModalIsVisible(!0);
  }, [currentUser, requireLogin, entity]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: onAddTagClicked
  }, children ?? "+ Add Tag"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Add Tag",
    isVisible: addTagModalIsVisible,
    onClose: () => setAddTagModalIsVisible(!1)
  }, parentEntityLoading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : /* @__PURE__ */ React.createElement(CreateTagForm_default, {
    entity,
    onSuccess: onCreateTagSuccess
  })));
}, AddTagButton_default = AddTagButton;

// app/components/EditTagsButton.tsx
var import_react33 = require("react"), import_client18 = require("@apollo/client");
var PARENT_ENTITY_QUERY2 = import_client18.gql`
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
`, DELETE_TAG_MUTATION = import_client18.gql`
	mutation DeleteTag($id: String!) {
		deleteTag(id: $id)
	}
`, EditTagsButton = ({ entity, className, children, onSuccess }) => {
  let { currentUser, requireLogin } = useRequireLogin_default(), [editTagsModalIsVisible, setEditTagsModalIsVisible] = (0, import_react33.useState)(!1), [getParentEntity, { loading: parentEntityLoading }] = (0, import_client18.useLazyQuery)(PARENT_ENTITY_QUERY2, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  }), [deleteTag, { loading: deleteTagLoading, data: deleteTagData }] = (0, import_client18.useMutation)(DELETE_TAG_MUTATION, { errorPolicy: "all" }), {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default(), onDeleteTag = (0, import_react33.useCallback)(async (id) => {
    if (!currentUser)
      return await requireLogin();
    window.confirm("Are you sure you want to delete this Tag?") && deleteTag({ variables: { id } });
  }, [deleteTag, currentUser, requireLogin]);
  (0, import_react33.useEffect)(() => {
    let onDeleteSuccess = async () => {
      await Promise.all([refetchTopLevelTags(), getParentEntity()]), setEditTagsModalIsVisible(!1);
    };
    (deleteTagData == null ? void 0 : deleteTagData.deleteTag) && (onDeleteSuccess(), onSuccess && onSuccess());
  }, [
    deleteTagData,
    getParentEntity,
    setEditTagsModalIsVisible,
    refetchTopLevelTags,
    onSuccess
  ]);
  let { tags } = entity, sortedTags = (0, import_react33.useMemo)(() => Array.isArray(tags) ? Tag_default.sort(tags) : [], [tags]);
  if (!sortedTags || sortedTags.length === 0)
    return null;
  let isLoading2 = parentEntityLoading || deleteTagLoading;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: () => setEditTagsModalIsVisible(!0)
  }, children ?? "Edit Tags"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Edit Tags",
    isVisible: editTagsModalIsVisible,
    onClose: () => setEditTagsModalIsVisible(!1)
  }, isLoading2 ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : sortedTags.map((tag, index) => {
    let { id, relationship, objectEntity, subjectTimeMarkerSeconds } = tag;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-start justify-start",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col flex-1 justify-start align-start mb-4 pr-4"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "italic text-gray-500"
    }, relationship.name), /* @__PURE__ */ React.createElement("div", {
      className: "uppercase text-sm text-gray-500 pr-2"
    }, objectEntity.entityType), objectEntity.name, typeof subjectTimeMarkerSeconds == "number" && /* @__PURE__ */ React.createElement("span", {
      className: "italic text-gray-500"
    }, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`)), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      onClick: () => onDeleteTag(id)
    }, "Delete Tag"));
  })));
}, EditTagsButton_default = EditTagsButton;

// app/components/Tags.tsx
var TagLink = ({ tag }) => {
  var _a;
  let [tooltipIsVisible, setTooltipIsVisible] = (0, import_react34.useState)(!1), [timeoutFunc, setTimeoutFunc] = (0, import_react34.useState)(), onMouseEnter = (0, import_react34.useCallback)(() => {
    setTimeoutFunc(setTimeout(() => setTooltipIsVisible(!0), 400));
  }, []), onMouseLeave = (0, import_react34.useCallback)(() => {
    timeoutFunc && (clearTimeout(timeoutFunc), setTimeoutFunc(void 0)), setTooltipIsVisible(!1);
  }, [timeoutFunc]);
  (0, import_react34.useEffect)(() => () => {
    timeoutFunc && (clearTimeout(timeoutFunc), setTimeoutFunc(void 0));
  }, [timeoutFunc]);
  let { relationship } = tag, objectEntity = Tag_default.getObjectEntity(tag), href = Entity_default.makeHrefForView(objectEntity);
  return !objectEntity || !href ? null : /* @__PURE__ */ React.createElement(import_react35.Link, {
    to: href,
    className: "relative block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800",
    onMouseEnter,
    onMouseLeave
  }, objectEntity.name, /* @__PURE__ */ React.createElement("div", {
    className: `${tooltipIsVisible ? "flex" : "hidden"} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`
  }, relationship.name, " ", (_a = objectEntity.entityType) == null ? void 0 : _a.toUpperCase()));
}, Tags = ({ audioItem }) => {
  let { tagsAsSubject } = audioItem, sortedTags = (0, import_react34.useMemo)(() => {
    if (!Array.isArray(tagsAsSubject))
      return [];
    let tagsWithoutTimeMarkers = tagsAsSubject.filter((tag) => typeof tag.subjectTimeMarkerSeconds != "number");
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
}, Tags_default = Tags;

// app/components/SaveItemButton.tsx
var import_react36 = require("@remix-run/react");
function SaveItemButton({ audioItem }) {
  let fetcher = (0, import_react36.useFetcher)();
  function onButtonClicked() {
    fetcher.submit({ audioItemId: audioItem.id }, { method: "post", action: "/saved-items" });
  }
  let isSaved = audioItem.savedItems.length === 1;
  return /* @__PURE__ */ React.createElement("button", {
    className: `btn-secondary ${isSaved ? "btn-secondary-active" : ""} pl-0.5`,
    onClick: onButtonClicked,
    disabled: fetcher.state !== "idle",
    "aria-label": isSaved ? "Unsave" : "Save"
  }, isSaved ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "bookmark"), "Saved") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "bookmark_border"), "Save"));
}

// app/components/ViewCommentsButton.tsx
var import_react39 = require("react"), import_react40 = require("@remix-run/react");

// app/components/CreateCommentForm.tsx
var import_react37 = require("@remix-run/react"), import_react38 = require("react"), CreateCommentForm = ({ parentAudioItem }) => {
  var _a;
  let formRef = (0, import_react38.useRef)(null), fetcher = (0, import_react37.useFetcher)();
  return (0, import_react38.useEffect)(() => {
    var _a2;
    fetcher.type === "done" && fetcher.data.comment && ((_a2 = formRef.current) == null || _a2.reset());
  }, [fetcher]), /* @__PURE__ */ React.createElement(fetcher.Form, {
    ref: formRef,
    method: "post",
    action: "/comments",
    className: "w-full"
  }, /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Add a comment...",
    autoFocus: !0,
    rows: 3,
    required: !0,
    minLength: 1,
    name: "text"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "parentAudioItemId",
    value: parentAudioItem.id
  }), /* @__PURE__ */ React.createElement("button", {
    className: "btn mt-3 w-auto",
    type: "submit",
    disabled: fetcher.state !== "idle"
  }, "Add Comment"), ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-3"
  }, fetcher.data.error));
}, CreateCommentForm_default = CreateCommentForm;

// app/components/ViewCommentsButton.tsx
var ViewCommentsButton = ({ audioItem }) => {
  let { comments } = audioItem, commentsCount = comments.length, commentsRef = (0, import_react39.useRef)(), [modalIsVisible, setModalIsVisible] = (0, import_react39.useState)(!1), onViewCommentsButtonClicked = (0, import_react39.useCallback)(async () => {
    setModalIsVisible(!0);
  }, []), onCloseModal = (0, import_react39.useCallback)(() => setModalIsVisible(!1), []);
  (0, import_react39.useEffect)(() => {
    var _a;
    if (!commentsRef.current)
      return;
    let commentsHeight = ((_a = commentsRef.current) == null ? void 0 : _a.scrollHeight) ?? 0;
    modalIsVisible && commentsHeight > 0 && comments.length > 0 && commentsRef.current.scrollTo({
      top: commentsHeight,
      behavior: "smooth"
    });
  }, [comments, modalIsVisible]);
  let modalTitle = commentsCount > 0 ? `${commentsCount} Comment${commentsCount === 1 ? "" : "s"}` : "No Comments";
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
  }, /* @__PURE__ */ React.createElement(import_react40.Link, {
    to: `/users/${createdByUser == null ? void 0 : createdByUser.id}`,
    className: "mr-1 flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("span", null, createdByUser == null ? void 0 : createdByUser.username)), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm whitespace-pre-line text-gray-900"
  }, text)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement(CreateCommentForm_default, {
    parentAudioItem: audioItem
  }))));
}, ViewCommentsButton_default = ViewCommentsButton;

// app/components/TimeMarkers.tsx
var import_react41 = require("react"), import_react42 = require("@remix-run/react");
var TimeMarkers = ({ audioItem }) => {
  let { tagsAsSubject } = audioItem, {
    activeAudioItem,
    setActiveAudioItem,
    playbackPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default(), timeMarkersWithTags = (0, import_react41.useMemo)(() => {
    let output = {};
    if (!tagsAsSubject)
      return output;
    let filteredTags = tagsAsSubject.filter((tag) => typeof tag.subjectTimeMarkerSeconds == "number");
    return filteredTags.sort((a, b) => a.subjectTimeMarkerSeconds ?? 0 - (b.subjectTimeMarkerSeconds ?? 0)), filteredTags.forEach((tag) => {
      if (typeof tag.subjectTimeMarkerSeconds != "number")
        return;
      let existingTagsAtTimeMarker = output[tag.subjectTimeMarkerSeconds] ?? [];
      output[tag.subjectTimeMarkerSeconds] = [...existingTagsAtTimeMarker, tag];
    }), output;
  }, [tagsAsSubject]), onTimeMarkerClicked = (0, import_react41.useCallback)((event, timeMarker) => {
    if (event.target.id === "time-marker-tag-link") {
      event.stopPropagation();
      return;
    }
    (activeAudioItem == null ? void 0 : activeAudioItem.id) !== audioItem.id && setActiveAudioItem(audioItem), setSeekPositionSeconds(parseInt(timeMarker));
  }, [audioItem, activeAudioItem, setActiveAudioItem, setSeekPositionSeconds]), audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id, activeTimeMarker = (0, import_react41.useMemo)(() => {
    if (!audioItemIsInPlayer)
      return;
    let result;
    return Object.keys(timeMarkersWithTags).forEach((timeMarker) => {
      parseInt(timeMarker) <= (playbackPositionSeconds ?? 0) && (result = timeMarker);
    }), result;
  }, [audioItemIsInPlayer, timeMarkersWithTags, playbackPositionSeconds]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, Object.entries(timeMarkersWithTags).map(([timeMarker, tagsAsSubjectAtTimeMarker], index) => /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-start md:items-center justify-start mb-2 last:mb-1 text-sm",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row w-16 flex-shrink-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-3 text-left"
  }, activeTimeMarker === timeMarker && ">"), /* @__PURE__ */ React.createElement("button", {
    className: "link",
    onClick: (event) => onTimeMarkerClicked(event, timeMarker)
  }, DateTime_default.formatSecondsAsDuration(parseInt(timeMarker)))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row"
  }, tagsAsSubjectAtTimeMarker.map((tag, index2) => {
    let objectEntity = Tag_default.getObjectEntity(tag);
    return objectEntity ? /* @__PURE__ */ React.createElement("span", {
      className: "flex flex-row items-center",
      key: index2
    }, /* @__PURE__ */ React.createElement(import_react42.Link, {
      to: Entity_default.makeHrefForView(objectEntity),
      id: "time-marker-tag-link"
    }, objectEntity.name, objectEntity.entityType === "Tune" /* Tune */ ? ` (${objectEntity.type})` : ""), index2 !== tagsAsSubjectAtTimeMarker.length - 1 && /* @__PURE__ */ React.createElement("span", {
      className: "hidden md:block mr-1"
    }, ",")) : null;
  })))));
}, TimeMarkers_default = TimeMarkers;

// app/components/AudioItemCard.tsx
var AudioItemCard = ({ audioItem, showTitle = !0, className }) => {
  let {
    name,
    slug,
    description,
    tagsAsSubject: tags,
    status,
    createdByUser,
    createdAt
  } = audioItem, {
    activeAudioItem,
    setActiveAudioItem,
    activeItemDurationSeconds,
    playbackPositionSeconds
  } = usePlayerContext_default(), audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id, tagsWithTimeMarkers = (0, import_react43.useMemo)(() => Array.isArray(tags) ? tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds == "number") : [], [tags]), onPlayPressed = (0, import_react43.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), shouldShowPositionAndDuration = audioItemIsInPlayer && typeof playbackPositionSeconds == "number" && typeof activeItemDurationSeconds == "number", positionAndDuration = `${DateTime_default.formatSecondsAsDuration(playbackPositionSeconds ?? 0)} / ${DateTime_default.formatSecondsAsDuration(activeItemDurationSeconds ?? 0)}`, isTakenDown = status === "TAKEN_DOWN";
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`
  }, showTitle && /* @__PURE__ */ React.createElement("h2", {
    className: "mb-2"
  }, /* @__PURE__ */ React.createElement(import_react44.Link, {
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
  }, "Added", createdByUser && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", "by", " ", /* @__PURE__ */ React.createElement(import_react44.Link, {
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
  }, /* @__PURE__ */ React.createElement(SaveItemButton, {
    audioItem
  })))));
}, AudioItemCard_default = AudioItemCard;

// app/components/AudioItemCompact.tsx
var import_react48 = require("react"), import_react49 = require("@remix-run/react");

// app/components/Menu.tsx
var import_react45 = __toESM(require("react")), Menu = ({ children }) => {
  let containerRef = (0, import_react45.useRef)(), [shouldOpenLeft, setShouldOpenLeft] = (0, import_react45.useState)(!0), [isOpen, setIsOpen] = (0, import_react45.useState)(!1);
  (0, import_react45.useEffect)(() => {
    let container = containerRef.current;
    if (container) {
      let { x } = container.getBoundingClientRect();
      x < 200 && setShouldOpenLeft(!1);
    }
  }, []);
  let onIconClicked = (0, import_react45.useCallback)((event) => {
    event.stopPropagation(), setIsOpen(!0);
  }, []), onBackgroundClicked = (0, import_react45.useCallback)((event) => {
    event.stopPropagation(), setIsOpen(!1);
  }, []), childrenAsArray = Array.isArray(children) ? children : [children];
  return children ? /* @__PURE__ */ import_react45.default.createElement("div", {
    className: "relative",
    ref: containerRef
  }, /* @__PURE__ */ import_react45.default.createElement("button", {
    className: "btn-secondary",
    onClick: onIconClicked,
    "aria-label": isOpen ? "Close Menu" : "Show Menu"
  }, /* @__PURE__ */ import_react45.default.createElement("i", {
    className: "material-icons"
  }, "expand_more")), isOpen && /* @__PURE__ */ import_react45.default.createElement(import_react45.default.Fragment, null, /* @__PURE__ */ import_react45.default.createElement("div", {
    className: "fixed top-0 right-0 bottom-0 left-0",
    onClick: onBackgroundClicked
  }), /* @__PURE__ */ import_react45.default.createElement("ul", {
    className: `absolute top-9 ${shouldOpenLeft ? "right-0 text-right" : "left-0 text-left"} flex flex-col bg-white rounded shadow-xl`
  }, childrenAsArray.map((child, index) => /* @__PURE__ */ import_react45.default.createElement("li", {
    className: `cursor-pointer first:rounded-t last:rounded-b text-sm text-gray-500 font-bold whitespace-nowrap hover:bg-gray-200 ${index === 0 ? "hover:rounded-t" : ""} ${index === childrenAsArray.length - 1 ? "hover:rounded-b" : ""}`,
    key: index
  }, child))))) : null;
}, Menu_default = Menu;

// app/components/RequestTakedownButton.tsx
var import_react47 = require("react"), import_client20 = require("@apollo/client");

// app/components/CreateTakedownRequestForm.tsx
var import_react46 = require("react"), import_client19 = require("@apollo/client");
var CREATE_TAKEDOWN_REQUEST = import_client19.gql`
	mutation CreateTakedownRequest($input: CreateTakedownRequestInput!) {
		createTakedownRequest(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`, CreateTakedownRequestForm = ({ entity, onSuccess }) => {
  let defaultType = Object.keys(TakedownRequestType)[0], [type, setType] = (0, import_react46.useState)(defaultType), [message, setMessage] = (0, import_react46.useState)(""), [validationError, setValidationError] = (0, import_react46.useState)(""), [createTakedownRequest, { loading, data: data2, error: error2 }] = (0, import_client19.useMutation)(CREATE_TAKEDOWN_REQUEST, { errorPolicy: "all" }), getLabelForType = (type2) => {
    switch (TakedownRequestType[type2]) {
      case "Performer" /* Performer */:
        return "I'm a performer in it";
      case "Copyright" /* Copyright */:
        return "I own the copyright";
      default:
        return type2;
    }
  }, onSubmitForm = (0, import_react46.useCallback)((event) => {
    if (event.preventDefault(), setValidationError(""), !message)
      return setValidationError("Please include details about your request");
    let input = {
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
  return (0, import_react46.useEffect)(() => {
    var _a;
    ((_a = data2 == null ? void 0 : data2.createTakedownRequest) == null ? void 0 : _a.id) && onSuccess && onSuccess(data2.createTakedownRequest);
  }, [data2, onSuccess]), /* @__PURE__ */ React.createElement("form", {
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
}, CreateTakedownRequestForm_default = CreateTakedownRequestForm;

// app/components/RequestTakedownButton.tsx
var TAKEDOWN_REQUESTS_FOR_ENTITY = import_client20.gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`, RequestTakedownButton = ({ entity, onTakedownRequestCreated }) => {
  let { currentUser, requireLogin } = useRequireLogin_default(), [modalIsVisible, setModalIsVisible] = (0, import_react47.useState)(!1), closeModal = (0, import_react47.useCallback)(() => setModalIsVisible(!1), []), { loading, data: data2, error: error2, refetch: refetch2 } = (0, import_client20.useQuery)(TAKEDOWN_REQUESTS_FOR_ENTITY, {
    variables: {
      input: {
        entityType: entity.entityType,
        entityId: entity.id
      }
    },
    skip: !modalIsVisible
  }), takedownRequests = (data2 == null ? void 0 : data2.takedownRequestsForEntity) ?? [], onButtonClicked = (0, import_react47.useCallback)(async () => {
    if (currentUser)
      setModalIsVisible(!0);
    else {
      let redirectTo = Entity_default.makeHrefForView(entity);
      await requireLogin({ redirectTo });
    }
  }, [currentUser, entity, requireLogin]), onSuccess = (0, import_react47.useCallback)(async (takedownRequest) => {
    try {
      await refetch2(), onTakedownRequestCreated && await onTakedownRequestCreated(takedownRequest);
    } catch {
    }
  }, [refetch2, onTakedownRequestCreated]), modalContent = (0, import_react47.useMemo)(() => {
    let pendingTakedown = takedownRequests.find(isPendingTakedownRequest), approvedTakedown = takedownRequests.find(isApprovedTakedownRequest);
    return loading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : error2 ? /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600"
    }, "Error fetching Takedown Request data") : approvedTakedown ? /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500"
    }, "This ", entity.entityType, " has an ", /* @__PURE__ */ React.createElement("strong", null, "approved"), " ", approvedTakedown.type, " Takedown Request last updated", " ", DateTime_default.formatDateYearTime(approvedTakedown.updatedAt)) : pendingTakedown ? /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500"
    }, "This ", entity.entityType, " has a ", /* @__PURE__ */ React.createElement("strong", null, "pending"), " ", pendingTakedown.type, " Takedown Request last updated", " ", DateTime_default.formatDateYearTime(pendingTakedown.updatedAt)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
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
}, RequestTakedownButton_default = RequestTakedownButton;

// app/components/AudioItemCompact.tsx
var AudioItemCompact = ({ audioItem, className }) => {
  let { name, slug, description, tagsAsSubject, status } = audioItem, isTakenDown = status === "TAKEN_DOWN" /* TakenDown */, sortedTags = (0, import_react48.useMemo)(() => Tag_default.sort(tagsAsSubject), [tagsAsSubject]), { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), onPlayPressed = (0, import_react48.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), playButtonMarkup = (0, import_react48.useMemo)(() => {
    let audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    return isTakenDown ? /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500"
    }, "Taken Down") : audioItemIsInPlayer ? /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500"
    }, "Playing") : /* @__PURE__ */ React.createElement("button", {
      style: { lineHeight: 0 },
      onClick: onPlayPressed,
      "aria-label": "Play"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "material-icons text-teal-600 hover:text-teal-800"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "text-6xl"
    }, "play_arrow")));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start bg-white shadow-md rounded pt-2 px-3 pb-1 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react49.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, "Tags:", sortedTags.map((tag, index) => {
    let objectEntity = Tag_default.getObjectEntity(tag);
    return objectEntity ? /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: "ml-1 whitespace-pre"
    }, /* @__PURE__ */ React.createElement(import_react49.Link, {
      to: Entity_default.makeHrefForView(objectEntity)
    }, objectEntity.name, objectEntity.entityType === "Tune" /* Tune */ ? ` (${objectEntity.type})` : ""), index !== sortedTags.length - 1 && ", ") : null;
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
  }, /* @__PURE__ */ React.createElement(SaveItemButton, {
    audioItem
  }))), /* @__PURE__ */ React.createElement(Menu_default, null, !isTakenDown && /* @__PURE__ */ React.createElement(RequestTakedownButton_default, {
    entity: audioItem
  })))));
}, AudioItemCompact_default = AudioItemCompact;

// app/components/AudioItemTextOnly.tsx
var import_react50 = require("react"), import_react51 = require("@remix-run/react");
var AudioItemTextOnly = ({ audioItem, className }) => {
  let { name, slug, tagsAsSubject, status } = audioItem, isTakenDown = status === "TAKEN_DOWN" /* TakenDown */, sortedTags = (0, import_react50.useMemo)(() => Tag_default.sort(tagsAsSubject), [tagsAsSubject]), { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), onPlayPressed = (0, import_react50.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), playButtonMarkup = (0, import_react50.useMemo)(() => {
    let audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    return isTakenDown ? /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500"
    }, "Taken Down") : audioItemIsInPlayer ? /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500"
    }, "Playing") : /* @__PURE__ */ React.createElement("button", {
      style: { lineHeight: 0 },
      onClick: onPlayPressed,
      "aria-label": "Play"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "material-icons text-teal-600 hover:text-teal-800"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "text-3xl"
    }, "play_arrow")));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react51.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Tags:"), sortedTags.map((tag, index) => {
    let objectEntity = Tag_default.getObjectEntity(tag);
    return /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: "ml-1 whitespace-pre"
    }, /* @__PURE__ */ React.createElement(import_react51.Link, {
      to: Entity_default.makeHrefForView(objectEntity)
    }, objectEntity == null ? void 0 : objectEntity.name), index !== sortedTags.length - 1 && ", ");
  }))));
}, AudioItemTextOnly_default = AudioItemTextOnly;

// app/components/AudioItem.tsx
var AudioItemComponent = ({
  viewAs,
  audioItem,
  showTitle,
  className
}) => viewAs === "Cards" /* Cards */ ? /* @__PURE__ */ React.createElement(AudioItemCard_default, {
  audioItem,
  showTitle,
  className
}) : viewAs === "Compact" /* Compact */ ? /* @__PURE__ */ React.createElement(AudioItemCompact_default, {
  audioItem,
  className
}) : viewAs === "List" /* List */ ? /* @__PURE__ */ React.createElement(AudioItemTextOnly_default, {
  audioItem,
  className
}) : null, AudioItem_default = AudioItemComponent;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug.tsx
async function loader3({
  params
}) {
  let { slug } = params, audioItem = await db.audioItem.findUnique({
    where: {
      slug
    },
    include: {
      tagsAsSubject: {
        include: {
          objectAudioItem: !0,
          objectCollection: !0,
          objectInstrument: !0,
          objectPerson: !0,
          objectPlace: !0,
          objectTune: !0,
          relationship: !0
        }
      },
      createdByUser: !0,
      updatedByUser: !0,
      comments: {
        include: {
          createdByUser: !0
        },
        orderBy: {
          createdAt: "asc"
        }
      },
      savedItems: !0
    }
  });
  if (!audioItem)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this AudioItem"
    });
  return {
    audioItem
  };
}
var ViewAudioItemBySlug = () => {
  let { audioItem } = (0, import_react52.useLoaderData)();
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
  }, /* @__PURE__ */ React.createElement(import_react52.Link, {
    to: Entity_default.makeHrefForAbout(audioItem)
  }, "About"))), /* @__PURE__ */ React.createElement(AudioItem_default, {
    audioItem,
    viewAs: "Cards" /* Cards */
  }));
}, slug_default = ViewAudioItemBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => about_default
});
var import_react53 = require("@remix-run/react"), import_react54 = require("@remix-run/react");
var AudioItemAbout = () => {
  let navigate = (0, import_react54.useNavigate)(), { slug } = navigate.query, { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.audioItem) ?? {};
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react53.Link, {
    to: `/entities/audio-items/${slug}/edit`
  }, "Edit")));
}, about_default = AudioItemAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/edit.tsx
var edit_exports = {};
__export(edit_exports, {
  default: () => edit_default
});
var import_react57 = require("@remix-run/react"), import_client22 = require("@apollo/client");

// app/components/EditAudioItemForm.tsx
var import_react55 = require("react"), import_client21 = require("@apollo/client"), import_react56 = require("@remix-run/react");
var UPDATE_AUDIO_ITEM_MUTATION = import_client21.gql`
	mutation UpdateAudioItem($slug: String!, $input: UpdateAudioItemInput!) {
		updateAudioItem(slug: $slug, input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`, EditAudioItemForm = ({ audioItem, onSuccess }) => {
  let navigate = (0, import_react56.useNavigate)(), [updateAudioItem, { loading, error: error2, data: data2 }] = (0, import_client21.useMutation)(UPDATE_AUDIO_ITEM_MUTATION, {
    errorPolicy: "all"
  }), [name, setName] = (0, import_react55.useState)(audioItem.name), [aliases, setAliases] = (0, import_react55.useState)(audioItem.aliases), [description, setDescription] = (0, import_react55.useState)(audioItem.description), onUpdateAudioItem = (event) => {
    event.preventDefault();
    let input = {
      name,
      aliases,
      description
    };
    updateAudioItem({ variables: { slug: audioItem.slug, input } });
  };
  return (0, import_react55.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updateAudioItem) {
      if (onSuccess)
        return onSuccess(data2.updateAudioItem);
      window.alert("AudioItem updated successfully!");
    }
  }, [data2, navigate]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateAudioItem
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: !0,
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
}, EditAudioItemForm_default = EditAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/edit.tsx
var AUDIO_ITEM_QUERY = import_client22.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`, EditAudioItem = () => {
  let navigate = (0, import_react57.useNavigate)(), { slug } = navigate.query, { data: data2, error: error2 } = (0, import_client22.useQuery)(AUDIO_ITEM_QUERY, {
    variables: { slug },
    skip: !slug
  }), onEditSuccess = (audioItem2) => {
    navigate(`/entities/audio-items/${audioItem2.slug}`);
  }, statusMessage;
  if (!data2 && !error2 ? statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : !data2 && error2 && (statusMessage = `Error fetching AudioItem with slug ${slug}`), statusMessage)
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  let { audioItem } = data2;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit AudioItem: ", audioItem.name), /* @__PURE__ */ React.createElement(EditAudioItemForm_default, {
    audioItem,
    onSuccess: onEditSuccess
  }))));
}, edit_default = EditAudioItem;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/$slug/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  default: () => tags_default
});
var import_react58 = require("react"), import_react59 = require("@remix-run/react"), ViewAudioItemTags = () => {
  let navigate = (0, import_react59.useNavigate)(), { slug } = navigate.query;
  return (0, import_react58.useEffect)(() => {
    slug && navigate(`/entities/audio-items/${slug}`);
  }, [navigate, slug]), null;
}, tags_default = ViewAudioItemTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/index.tsx
var audio_items_exports = {};
__export(audio_items_exports, {
  default: () => audio_items_default
});
var import_react60 = require("react"), import_react61 = require("@remix-run/react"), ViewAudioItems = () => {
  let navigate = (0, import_react61.useNavigate)();
  return (0, import_react60.useEffect)(() => {
    navigate("/");
  }, [navigate]), null;
}, audio_items_default = ViewAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug.tsx
var slug_exports2 = {};
__export(slug_exports2, {
  default: () => slug_default2,
  loader: () => loader4
});
var import_react67 = require("@remix-run/react");

// app/components/ViewEntityAndAudioItems.tsx
var import_react65 = require("react"), import_react66 = require("@remix-run/react"), import_react_intersection_observer = require("react-intersection-observer");

// app/hooks/useFilters.ts
var import_react63 = require("react"), import_react64 = require("@remix-run/react");

// app/components/Filters.tsx
var import_react62 = __toESM(require("react"));
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
  let shouldRenderPagination = typeof totalItems == "number" && typeof page == "number" && onChangePage && perPage && onChangePerPage, shouldRenderSortBy = sortBy && onChangeSortBy, shouldRenderViewAs = viewAs && onChangeViewAs, totalPages = (0, import_react62.useMemo)(() => typeof totalItems != "number" || typeof perPage > "u" || totalItems === 0 ? 1 : Math.ceil(totalItems / perPage), [totalItems, perPage]), pageSelectOptions = (0, import_react62.useMemo)(() => {
    let output = [], i = 1;
    for (; i <= totalPages; )
      output.push(/* @__PURE__ */ import_react62.default.createElement("option", {
        value: i,
        key: i
      }, i)), i++;
    return output;
  }, [totalPages]), perPageOptions = (0, import_react62.useMemo)(() => {
    let output = [];
    for (let value in PerPage)
      isNaN(Number(value)) || output.push(/* @__PURE__ */ import_react62.default.createElement("option", {
        value,
        key: value
      }, value));
    return output;
  }, []);
  return /* @__PURE__ */ import_react62.default.createElement("div", {
    className: `flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 ${className ?? ""}`,
    id: "filters"
  }, shouldRenderPagination && /* @__PURE__ */ import_react62.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderSortBy || shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, /* @__PURE__ */ import_react62.default.createElement("div", {
    className: "mr-6"
  }, "Page", " ", /* @__PURE__ */ import_react62.default.createElement("select", {
    value: page,
    onChange: onChangePage
  }, pageSelectOptions), totalPages ? ` of ${totalPages}` : ""), /* @__PURE__ */ import_react62.default.createElement("div", null, /* @__PURE__ */ import_react62.default.createElement("select", {
    value: perPage,
    onChange: onChangePerPage
  }, perPageOptions), " ", "per page")), shouldRenderSortBy && /* @__PURE__ */ import_react62.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, "Sort by", /* @__PURE__ */ import_react62.default.createElement("select", {
    className: "ml-1",
    value: sortBy,
    onChange: onChangeSortBy
  }, /* @__PURE__ */ import_react62.default.createElement("option", {
    value: "RecentlyTagged" /* RecentlyTagged */
  }, "Recently tagged"), /* @__PURE__ */ import_react62.default.createElement("option", {
    value: "RecentlyAdded" /* RecentlyAdded */
  }, "Newest"))), shouldRenderViewAs && /* @__PURE__ */ import_react62.default.createElement("div", {
    className: "flex flex-row items-center mr-0 md:mb-0"
  }, "View as", /* @__PURE__ */ import_react62.default.createElement("select", {
    className: "ml-1",
    value: viewAs,
    onChange: onChangeViewAs
  }, /* @__PURE__ */ import_react62.default.createElement("option", {
    value: "Cards" /* Cards */
  }, "Cards"), /* @__PURE__ */ import_react62.default.createElement("option", {
    value: "Compact" /* Compact */
  }, "Compact"), /* @__PURE__ */ import_react62.default.createElement("option", {
    value: "List" /* List */
  }, "List"))));
}, Filters_default = Filters;

// app/hooks/useFilters.ts
var useFilters = ({
  totalItems,
  defaultPage = 1,
  defaultPerPage = 20,
  defaultSortBy = "RecentlyTagged" /* RecentlyTagged */,
  defaultViewAs = "Cards" /* Cards */
} = {}) => {
  let navigate = (0, import_react64.useNavigate)(), { pathname, search } = (0, import_react64.useLocation)(), queryParams = new URLSearchParams(search), page = parseInt(queryParams.get("page") ?? "1", 10) || defaultPage, perPage = parseInt(queryParams.get("perPage") ?? "20", 10) || defaultPerPage, sortBy = queryParams.get("sortBy") ?? defaultSortBy, viewAs = queryParams.get("viewAs") ?? defaultViewAs, updateQueryParams = (0, import_react63.useCallback)((paramsToUpdate = {}) => {
    let queryParams2 = new URLSearchParams(search);
    return Object.keys(paramsToUpdate).forEach((paramName) => {
      let value = paramsToUpdate[paramName];
      value ? queryParams2.set(paramName, value) : queryParams2.delete(paramName);
    }), navigate(`${pathname}?${queryParams2.toString()}`);
  }, [navigate, pathname, search]), onChangePage = (0, import_react63.useCallback)((event) => updateQueryParams({ page: event.target.value }), [updateQueryParams]), onChangePerPage = (0, import_react63.useCallback)((event) => updateQueryParams({ perPage: event.target.value, page: "1" }), [updateQueryParams]), onChangeSortBy = (0, import_react63.useCallback)((event) => updateQueryParams({ sortBy: event.target.value }), [updateQueryParams]), onChangeViewAs = (0, import_react63.useCallback)((event) => updateQueryParams({ viewAs: event.target.value }), [updateQueryParams]);
  return (0, import_react63.useMemo)(() => ({
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
}, useFilters_default = useFilters;

// app/components/ViewEntityAndAudioItems.tsx
var ViewEntityAndAudioItems = ({
  entity,
  audioItems,
  totalAudioItems,
  className
}) => {
  let { name } = entity ?? {}, { ref: metadataRef, inView: metadataInView } = (0, import_react_intersection_observer.useInView)({
    initialInView: !0
  }), { search } = (0, import_react66.useLocation)(), viewAs = new URLSearchParams(search).get("viewAs"), { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalAudioItems
  }), filtersRef = (0, import_react65.useRef)(null);
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
  }, totalAudioItems ?? "", " Audio Item", totalAudioItems === 1 ? "" : "s"), /* @__PURE__ */ React.createElement(import_react66.Link, {
    to: Entity_default.makeHrefForAbout(entity),
    className: "ml-4"
  }, "About"), /* @__PURE__ */ React.createElement(import_react66.Link, {
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
}, ViewEntityAndAudioItems_default = ViewEntityAndAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug.tsx
async function loader4({
  params,
  request
}) {
  let { slug } = params, collection = await db.collection.findUnique({
    where: {
      slug
    }
  });
  if (!collection)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Collection"
    });
  let { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */) === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: !0,
            objectCollection: !0,
            objectInstrument: !0,
            objectPerson: !0,
            objectPlace: !0,
            objectTune: !0,
            relationship: !0
          }
        },
        createdByUser: !0,
        updatedByUser: !0,
        comments: {
          include: {
            createdByUser: !0
          }
        },
        savedItems: !0
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
  let { collection, audioItems, totalAudioItems } = (0, import_react67.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: collection,
    audioItems,
    totalAudioItems
  }));
}, slug_default2 = ViewCollectionBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/about.tsx
var about_exports2 = {};
__export(about_exports2, {
  default: () => about_default2
});
var import_react68 = require("@remix-run/react"), import_react69 = require("@remix-run/react");
var CollectionAbout = () => {
  let navigate = (0, import_react69.useNavigate)(), { slug } = navigate.query, { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.collection) ?? {};
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react68.Link, {
    to: `/entities/collections/${slug}/edit`
  }, "Edit")));
}, about_default2 = CollectionAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/edit.tsx
var edit_exports2 = {};
__export(edit_exports2, {
  default: () => edit_default2
});
var import_react72 = require("@remix-run/react"), import_client24 = require("@apollo/client");

// app/components/EditCollectionForm.tsx
var import_react70 = require("react"), import_client23 = require("@apollo/client"), import_react71 = require("@remix-run/react");
var UPDATE_COLLECTION_MUTATION = import_client23.gql`
	mutation UpdateCollection($slug: String!, $input: UpdateCollectionInput!) {
		updateCollection(slug: $slug, input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`, EditCollectionForm = ({ collection, onSuccess }) => {
  let navigate = (0, import_react71.useNavigate)(), [updateCollection, { loading, error: error2, data: data2 }] = (0, import_client23.useMutation)(UPDATE_COLLECTION_MUTATION, {
    errorPolicy: "all"
  }), [name, setName] = (0, import_react70.useState)(collection.name), [aliases, setAliases] = (0, import_react70.useState)(collection.aliases), [description, setDescription] = (0, import_react70.useState)(collection.description), onUpdateCollection = (event) => {
    event.preventDefault();
    let input = {
      name,
      aliases,
      description
    };
    updateCollection({ variables: { slug: collection.slug, input } });
  };
  return (0, import_react70.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updateCollection) {
      if (onSuccess)
        return onSuccess(data2.updateCollection);
      window.alert("Collection updated successfully!");
    }
  }, [data2, navigate]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
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
}, EditCollectionForm_default = EditCollectionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/edit.tsx
var COLLECTION_QUERY = import_client24.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`, CollectionEdit = () => {
  let navigate = (0, import_react72.useNavigate)(), { slug } = navigate.query, { data: data2, error: error2 } = (0, import_client24.useQuery)(COLLECTION_QUERY, {
    variables: { slug },
    skip: !slug
  }), onEditSuccess = (collection2) => {
    navigate(`/entities/collections/${collection2.slug}/about`);
  }, statusMessage;
  if (!data2 && !error2 ? statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : !data2 && error2 && (statusMessage = `Error fetching Collection with slug ${slug}`), statusMessage)
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  let { collection } = data2;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Collection: ", collection.name), /* @__PURE__ */ React.createElement(EditCollectionForm_default, {
    collection,
    onSuccess: onEditSuccess
  }))));
}, edit_default2 = CollectionEdit;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/tags.tsx
var tags_exports2 = {};
__export(tags_exports2, {
  default: () => tags_default2
});
var import_react74 = require("@remix-run/react");

// app/components/TagWithRelationshipToObject.tsx
var import_react73 = require("@remix-run/react");
var TagWithRelationshipToObject = ({ tag, className }) => {
  let { relationship, objectEntity, subjectTimeMarkerSeconds } = tag;
  if (!objectEntity)
    return null;
  let shouldShowTimeMarker = typeof subjectTimeMarkerSeconds == "number";
  return /* @__PURE__ */ React.createElement("div", {
    className: `text-gray-500 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("em", null, relationship.name), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "uppercase text-sm"
  }, objectEntity.entityType), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react73.Link, {
    to: Entity_default.makeHrefForView(objectEntity)
  }, objectEntity.name), /* @__PURE__ */ React.createElement("br", null), typeof subjectTimeMarkerSeconds == "number" && /* @__PURE__ */ React.createElement("em", null, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`));
}, TagWithRelationshipToObject_default = TagWithRelationshipToObject;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug/tags.tsx
var CollectionTags = () => {
  let navigate = (0, import_react74.useNavigate)(), { slug } = navigate.query, { collection } = data ?? {}, { name, tags } = collection ?? {}, sortedTags = Tag_default.sort(tags);
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
}, tags_default2 = CollectionTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default,
  loader: () => loader5,
  meta: () => meta2
});
var import_react75 = require("@remix-run/react");
function meta2() {
  return {
    title: "Trad Archive - Collections"
  };
}
function loader5() {
  return db.collection.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Collections = () => {
  let collections = (0, import_react75.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Collections"), collections.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Collections found"), collections.length > 0 && /* @__PURE__ */ React.createElement("ul", null, collections.map((collection, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react75.Link, {
    to: Entity_default.makeHrefForView(collection)
  }, collection.name)))));
}, collections_default = Collections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug.tsx
var slug_exports3 = {};
__export(slug_exports3, {
  default: () => slug_default3,
  loader: () => loader6
});
var import_react76 = require("@remix-run/react");
async function loader6({
  params,
  request
}) {
  let { slug } = params, instrument = await db.instrument.findUnique({
    where: {
      slug
    }
  });
  if (!instrument)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Instrument"
    });
  let { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */) === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: !0,
            objectCollection: !0,
            objectInstrument: !0,
            objectPerson: !0,
            objectPlace: !0,
            objectTune: !0,
            relationship: !0
          }
        },
        createdByUser: !0,
        updatedByUser: !0,
        comments: {
          include: {
            createdByUser: !0
          }
        },
        savedItems: !0
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
  let { instrument, audioItems, totalAudioItems } = (0, import_react76.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: instrument,
    audioItems,
    totalAudioItems
  }));
}, slug_default3 = ViewInstrumentBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/about.tsx
var about_exports3 = {};
__export(about_exports3, {
  default: () => about_default3
});
var import_react77 = require("@remix-run/react"), import_react78 = require("@remix-run/react");
var InstrumentAbout = () => {
  let navigate = (0, import_react78.useNavigate)(), { slug } = navigate.query, { name, description, aliases } = (data == null ? void 0 : data.instrument) ?? {};
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react77.Link, {
    to: `/entities/instruments/${slug}/edit`
  }, "Edit")));
}, about_default3 = InstrumentAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/edit.tsx
var edit_exports3 = {};
__export(edit_exports3, {
  default: () => edit_default3
});
var import_react81 = require("@remix-run/react"), import_client26 = require("@apollo/client");

// app/components/EditInstrumentForm.tsx
var import_react79 = require("react"), import_client25 = require("@apollo/client"), import_react80 = require("@remix-run/react");
var UPDATE_INSTRUMENT_MUTATION = import_client25.gql`
	mutation UpdateInstrument($slug: String!, $input: UpdateInstrumentInput!) {
		updateInstrument(slug: $slug, input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`, EditInstrumentForm = ({ instrument, onSuccess }) => {
  let navigate = (0, import_react80.useNavigate)(), [updateInstrument, { loading, error: error2, data: data2 }] = (0, import_client25.useMutation)(UPDATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  }), [name, setName] = (0, import_react79.useState)(instrument.name), [aliases, setAliases] = (0, import_react79.useState)(instrument.aliases), [description, setDescription] = (0, import_react79.useState)(instrument.description), onUpdateInstrument = (event) => {
    event.preventDefault();
    let input = {
      name,
      aliases,
      description
    };
    updateInstrument({ variables: { slug: instrument.slug, input } });
  };
  return (0, import_react79.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updateInstrument) {
      if (onSuccess)
        return onSuccess(data2.updateInstrument);
      window.alert("Instrument updated successfully!");
    }
  }, [data2, navigate]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateInstrument
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: !0,
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
}, EditInstrumentForm_default = EditInstrumentForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/edit.tsx
var INSTRUMENT_QUERY = import_client26.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`, EditInstrument = () => {
  let navigate = (0, import_react81.useNavigate)(), { slug } = navigate.query, { data: data2, error: error2 } = (0, import_client26.useQuery)(INSTRUMENT_QUERY, {
    variables: { slug },
    skip: !slug
  }), onEditSuccess = (instrument2) => {
    navigate(`/entities/instruments/${instrument2.slug}`);
  }, statusMessage;
  if (!data2 && !error2 ? statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : !data2 && error2 && (statusMessage = `Error fetching Instrument with slug ${slug}`), statusMessage)
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  let { instrument } = data2;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Instrument: ", instrument.name), /* @__PURE__ */ React.createElement(EditInstrumentForm_default, {
    instrument,
    onSuccess: onEditSuccess
  }))));
}, edit_default3 = EditInstrument;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug/tags.tsx
var tags_exports3 = {};
__export(tags_exports3, {
  default: () => tags_default3
});
var import_react82 = require("@remix-run/react");
var InstrumentTags = () => {
  let navigate = (0, import_react82.useNavigate)(), { slug } = navigate.query, { instrument } = data ?? {}, { name, tags } = instrument ?? {}, sortedTags = Tag_default.sort(tags);
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
}, tags_default3 = InstrumentTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var instruments_exports = {};
__export(instruments_exports, {
  default: () => instruments_default,
  loader: () => loader7,
  meta: () => meta3
});
var import_react83 = require("@remix-run/react");
function meta3() {
  return {
    title: "Trad Archive - Instruments"
  };
}
function loader7() {
  return db.instrument.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Instruments = () => {
  let instruments = (0, import_react83.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Instruments"), instruments.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Instruments found"), instruments.length > 0 && /* @__PURE__ */ React.createElement("ul", null, instruments.map((instrument, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react83.Link, {
    to: Entity_default.makeHrefForView(instrument)
  }, instrument.name)))));
}, instruments_default = Instruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/index.tsx
var submissions_exports = {};
__export(submissions_exports, {
  default: () => submissions_default
});
var import_react84 = require("@remix-run/react"), import_client27 = require("@apollo/client");
var SUBMISSIONS_FOR_CURRENT_USER = import_client27.gql`
	query SubmissionsForCurrentUser {
		submissionsForCurrentUser {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`, Submissions = () => {
  let { data: data2, loading } = (0, import_client27.useQuery)(SUBMISSIONS_FOR_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement(import_react84.Link, {
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
  }, DateTime_default.formatDateYearTime(s.createdAt, !0), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, `${s.description.substring(0, 200)}${s.description.length > 200 ? "..." : ""}`), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react84.Link, {
    to: `/account/submissions/${s.id}/upload`
  }, "Upload More Files to This Submission"))))));
}, submissions_default = Submissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var new_exports = {};
__export(new_exports, {
  default: () => new_default
});
var import_react87 = require("@remix-run/react");

// app/hooks/useAudioItems.ts
var import_react85 = require("react"), import_client28 = require("@apollo/client");
var AUDIO_ITEMS_QUERY = import_client28.gql`
	query AudioItems($input: AudioItemsInput!) {
		audioItems(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`, useAudioItems = ({
  sortBy = "RecentlyTagged" /* RecentlyTagged */,
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  let [skip, setSkip] = (0, import_react85.useState)(0), [audioItems, setAudioItems] = (0, import_react85.useState)();
  (0, import_react85.useEffect)(() => {
    setAudioItems(void 0), setSkip(0);
  }, [sortBy]);
  let [getAudioItems, audioItemsQuery] = (0, import_client28.useLazyQuery)(AUDIO_ITEMS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: !0
  }, queryOptions)), { data: data2, fetchMore } = audioItemsQuery;
  (0, import_react85.useEffect)(() => {
    (data2 == null ? void 0 : data2.audioItems) && setAudioItems(data2.audioItems);
  }, [data2]), (0, import_react85.useEffect)(() => {
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
  let fetchNextPage = (0, import_react85.useCallback)(async () => {
    let numToSkip = (audioItems == null ? void 0 : audioItems.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          status: "PUBLISHED" /* Published */,
          skip: numToSkip
        }
      }
    }), setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, audioItems, sortBy]);
  return [audioItems, audioItemsQuery, fetchNextPage];
}, useAudioItems_default = useAudioItems;

// app/components/CreateAudioItemForm.tsx
var import_react86 = require("react"), import_client29 = require("@apollo/client");
var CREATE_AUDIO_ITEM_MUTATION = import_client29.gql`
	mutation CreateAudioItem($input: CreateAudioItemInput!) {
		createAudioItem(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`, CreateAudioItemForm = ({ onSuccess }) => {
  let [createAudioItem, { loading, error: error2, data: data2 }] = (0, import_client29.useMutation)(CREATE_AUDIO_ITEM_MUTATION, { errorPolicy: "all" }), [name, setName] = (0, import_react86.useState)(""), [urlSource, setUrlSource] = (0, import_react86.useState)(""), [slug, setSlug] = (0, import_react86.useState)(""), [aliases, setAliases] = (0, import_react86.useState)(""), [description, setDescription] = (0, import_react86.useState)("");
  (0, import_react86.useEffect)(() => {
    let proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  let onCreateAudioItem = (event) => {
    event.preventDefault(), createAudioItem({
      variables: { input: { name, urlSource, slug, aliases, description } }
    });
  };
  return (0, import_react86.useEffect)(() => {
    if (data2 == null ? void 0 : data2.createAudioItem) {
      if (onSuccess)
        return onSuccess(data2.createAudioItem);
      window.alert("Audio Item created successfully!"), setName(""), setUrlSource(""), setSlug(""), setAliases(""), setDescription("");
    }
  }, [data2]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateAudioItem
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: !0,
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
}, CreateAudioItemForm_default = CreateAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var NewAudioItem = () => {
  let navigate = (0, import_react87.useNavigate)(), [_, { refetch: refetch2 }] = useAudioItems_default();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Audio Item"), /* @__PURE__ */ React.createElement(CreateAudioItemForm_default, {
    onSuccess: async (audioItem) => {
      await refetch2(), navigate(`/entities/audio-items/${audioItem.slug}`);
    }
  }))));
}, new_default = NewAudioItem;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/new.tsx
var new_exports2 = {};
__export(new_exports2, {
  default: () => new_default2
});
var import_react88 = require("@remix-run/react");
var NewCollection = () => {
  let navigate = (0, import_react88.useNavigate)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Collection"), /* @__PURE__ */ React.createElement(CreateCollectionForm_default, {
    onSuccess: (collection) => {
      navigate(`/entities/collections/${collection.slug}`);
    }
  }))));
}, new_default2 = NewCollection;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/new.tsx
var new_exports3 = {};
__export(new_exports3, {
  default: () => new_default3
});
var import_react89 = require("@remix-run/react");
var NewInstrument = () => {
  let navigate = (0, import_react89.useNavigate)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Instrument"), /* @__PURE__ */ React.createElement(CreateInstrumentForm_default, {
    onSuccess: (instrument) => {
      navigate(`/entities/instruments/${instrument.slug}`);
    }
  }))));
}, new_default3 = NewInstrument;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var new_exports4 = {};
__export(new_exports4, {
  default: () => new_default4
});
var import_react91 = require("@remix-run/react");

// app/components/CreateSubmissionForm.tsx
var import_react90 = require("react"), import_client30 = require("@apollo/client");

// app/components/Checkbox.tsx
var Checkbox = ({ checked, label, id, onChange, className }) => {
  let inputId = id ?? `input_${Math.round(Math.random() * 1e5)}`;
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
}, Checkbox_default = Checkbox;

// app/components/CreateSubmissionForm.tsx
var CREATE_SUBMISSION = import_client30.gql`
	mutation CreateSubmission($input: CreateSubmissionInput!) {
		createSubmission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`, CreateSubmissionForm = ({ onSuccess }) => {
  let [currentUser] = useCurrentUser_default(), [materialTypes, setMaterialTypes] = (0, import_react90.useState)([]), [userControlsCopyright, setUserControlsCopyright] = (0, import_react90.useState)(!0), [copyrightDetails, setCopyrightDetails] = (0, import_react90.useState)(""), [description, setDescription] = (0, import_react90.useState)(""), [userGrantsPermissionToITMA, setUserGrantsPermissionToITMA] = (0, import_react90.useState)(!1), [validationError, setValidationError] = (0, import_react90.useState)(""), [createSubmission, { loading, data: data2, error: error2 }] = (0, import_client30.useMutation)(CREATE_SUBMISSION, { errorPolicy: "all" }), onMaterialTypeChecked = (materialType, isChecked) => {
    setMaterialTypes(isChecked ? materialTypes.concat(materialType) : materialTypes.filter((mt) => mt !== materialType));
  }, materialTypeIsChecked = (materialType) => materialTypes.includes(materialType), onSubmitForm = (event) => {
    if (event.preventDefault(), setValidationError(""), !userControlsCopyright && !copyrightDetails) {
      setValidationError("Please provide details on who controls the copyright for these items");
      return;
    }
    if (!description) {
      setValidationError("Please describe the items you are submitting");
      return;
    }
    let input = {
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
  return (0, import_react90.useEffect)(() => {
    var _a;
    ((_a = data2 == null ? void 0 : data2.createSubmission) == null ? void 0 : _a.id) && onSuccess && onSuccess(data2.createSubmission);
  }, [data2, onSuccess]), /* @__PURE__ */ React.createElement("form", {
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
    onChange: (event) => setUserControlsCopyright(event.target.value === "Yes")
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
    label: `By clicking this box, I consent to upload and give the digitised
			material to the Irish Traditional Music Archive (Dublin, Ireland). ITMA
			reserves the right to retain or delete at any time this material based on
			its collection policy.`,
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
}, CreateSubmissionForm_default = CreateSubmissionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var SubmissionsNew = () => {
  let navigate = (0, import_react91.useNavigate)();
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
    onSuccess: (submission) => {
      navigate(`/account/submissions/${submission.id}/upload`);
    }
  }))));
}, new_default4 = SubmissionsNew;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/submissions/index.tsx
var submissions_exports2 = {};
__export(submissions_exports2, {
  default: () => submissions_default2
});
var import_react92 = require("@remix-run/react"), import_client31 = require("@apollo/client");
var SUBMISSIONS = import_client31.gql`
	query Submissions($input: SubmissionsInput!) {
		submissions(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`, AdminSubmissions = () => {
  let { data: data2, loading } = (0, import_client31.useQuery)(SUBMISSIONS, {
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
  }, DateTime_default.formatDateYearTime(s.createdAt, !0), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), "From ", s.createdByUser.username, " / ", s.createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Owns copyright? ", s.userControlsCopyright ? "Yes" : "No", s.copyrightDetails ? ` - ${s.copyrightDetails}` : "", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, s.description), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react92.Link, {
    to: `/admin/submissions/${s.id}`
  }, "View Files"))))));
}, submissions_default2 = AdminSubmissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/takedown-requests.tsx
var takedown_requests_exports = {};
__export(takedown_requests_exports, {
  default: () => takedown_requests_default
});
var import_react93 = require("react"), import_client32 = require("@apollo/client"), import_compareDesc3 = __toESM(require("date-fns/compareDesc"));
var TAKEDOWN_REQUESTS = import_client32.gql`
	query TakedownRequests($input: TakedownRequestsInput!) {
		takedownRequests(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`, UPDATE_TAKEDOWN_REQUEST_STATUS = import_client32.gql`
	mutation UpdateTakedownRequestStatus(
		$input: UpdateTakedownRequestStatusInput!
	) {
		updateTakedownRequestStatus(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`, TakedownRequests = () => {
  let {
    loading: takedownRequestsLoading,
    data: takedownRequestsData,
    error: takedownRequestsError
  } = (0, import_client32.useQuery)(TAKEDOWN_REQUESTS, {
    variables: { input: { take: 200, skip: 0 } },
    fetchPolicy: "network-only"
  }), takedownRequests = (0, import_react93.useMemo)(() => {
    if (!(takedownRequestsData == null ? void 0 : takedownRequestsData.takedownRequests))
      return [];
    let sortedTakedownRequests = [...takedownRequestsData.takedownRequests];
    return sortedTakedownRequests.sort((a, b) => (0, import_compareDesc3.default)(new Date(a.createdAt), new Date(b.createdAt))), sortedTakedownRequests;
  }, [takedownRequestsData]), [
    updateTakedownRequestStatus,
    {
      loading: updateTakedownRequestStatusLoading,
      error: updateTakedownRequestStatusError
    }
  ] = (0, import_client32.useMutation)(UPDATE_TAKEDOWN_REQUEST_STATUS, { errorPolicy: "all" }), onApproveClicked = (id) => {
    updateTakedownRequestStatus({
      variables: { input: { id, status: "Approved" /* Approved */ } }
    });
  }, onDenyClicked = (id) => {
    updateTakedownRequestStatus({
      variables: { input: { id, status: "Denied" /* Denied */ } }
    });
  };
  return (0, import_react93.useEffect)(() => {
    updateTakedownRequestStatusError && window.alert("Error updating Takedown Request status. Please reload the page and try again.");
  }, [updateTakedownRequestStatusError]), /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
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
    let {
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
}, takedown_requests_default = TakedownRequests;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/submissions/[id].tsx
var id_exports = {};
__export(id_exports, {
  default: () => id_default
});
var import_react94 = require("@remix-run/react"), import_react95 = require("@remix-run/react"), import_client33 = require("@apollo/client");
var SUBMISSION_WITH_FILES = import_client33.gql`
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
`, AdminViewSubmissionById = () => {
  let navigate = (0, import_react95.useNavigate)(), { id } = navigate.query, submissionId = typeof id == "string" ? id : void 0, { data: data2, loading } = (0, import_client33.useQuery)(SUBMISSION_WITH_FILES, {
    variables: { id: submissionId },
    skip: !submissionId,
    fetchPolicy: "cache-and-network"
  }), { submission, files } = (data2 == null ? void 0 : data2.submissionWithFiles) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Submissions", href: "/admin/submissions" },
      {
        label: submission ? `${DateTime_default.formatDateYearTime(submission.createdAt, !0)} from ${submission.createdByUser.username}` : "View Submission"
      }
    ],
    className: "mb-6"
  }), files && /* @__PURE__ */ React.createElement("ul", null, files.map((f, index) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pr-2"
  }, f.filename), /* @__PURE__ */ React.createElement(import_react94.Link, {
    to: f.presignedDownloadUrl
  }, /* @__PURE__ */ React.createElement("a", {
    target: "_blank"
  }, "View", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")))))), !files && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, {
    className: "mt-8"
  })));
}, id_default = AdminViewSubmissionById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug.tsx
var slug_exports4 = {};
__export(slug_exports4, {
  default: () => slug_default4,
  loader: () => loader8
});
var import_react96 = require("@remix-run/react");
async function loader8({
  params,
  request
}) {
  let { slug } = params, person2 = await db.person.findUnique({
    where: {
      slug
    }
  });
  if (!person2)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Person"
    });
  let { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */) === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: !0,
            objectCollection: !0,
            objectInstrument: !0,
            objectPerson: !0,
            objectPlace: !0,
            objectTune: !0,
            relationship: !0
          }
        },
        createdByUser: !0,
        updatedByUser: !0,
        comments: {
          include: {
            createdByUser: !0
          }
        },
        savedItems: !0
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
  let { person: person2, audioItems, totalAudioItems } = (0, import_react96.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: person2,
    audioItems,
    totalAudioItems
  }));
}, slug_default4 = ViewPersonBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/about.tsx
var about_exports4 = {};
__export(about_exports4, {
  default: () => about_default4
});
var import_react97 = require("@remix-run/react"), import_react98 = require("@remix-run/react");
var PersonAbout = () => {
  let navigate = (0, import_react98.useNavigate)(), { slug } = navigate.query, { name, description, aliases } = (data == null ? void 0 : data.person) ?? {};
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
  }, aliases)), /* @__PURE__ */ React.createElement(import_react97.Link, {
    to: `/entities/people/${slug}/edit`
  }, "Edit")));
}, about_default4 = PersonAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/edit.tsx
var edit_exports4 = {};
__export(edit_exports4, {
  default: () => edit_default4
});
var import_react101 = require("@remix-run/react"), import_client35 = require("@apollo/client");

// app/components/EditPersonForm.tsx
var import_react99 = require("react"), import_client34 = require("@apollo/client"), import_react100 = require("@remix-run/react");
var UPDATE_PERSON_MUTATION = import_client34.gql`
	mutation UpdatePerson($slug: String!, $input: UpdatePersonInput!) {
		updatePerson(slug: $slug, input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`, EditPersonForm = ({ person: person2, onSuccess }) => {
  let navigate = (0, import_react100.useNavigate)(), [updatePerson, { loading, error: error2, data: data2 }] = (0, import_client34.useMutation)(UPDATE_PERSON_MUTATION, {
    errorPolicy: "all"
  }), [firstName, setFirstName] = (0, import_react99.useState)(person2.firstName), [middleName, setMiddleName] = (0, import_react99.useState)(person2.middleName), [lastName, setLastName] = (0, import_react99.useState)(person2.lastName), [aliases, setAliases] = (0, import_react99.useState)(person2.aliases), [description, setDescription] = (0, import_react99.useState)(person2.description), onUpdatePerson = (event) => {
    event.preventDefault();
    let input = {
      firstName,
      middleName,
      lastName,
      aliases,
      description
    };
    updatePerson({ variables: { slug: person2.slug, input } });
  };
  return (0, import_react99.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updatePerson) {
      if (onSuccess)
        return onSuccess(data2.updatePerson);
      window.alert("Person updated successfully!");
    }
  }, [data2, navigate]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdatePerson
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    autoFocus: !0,
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
}, EditPersonForm_default = EditPersonForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/edit.tsx
var PERSON_QUERY = import_client35.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`, EditPerson = () => {
  let navigate = (0, import_react101.useNavigate)(), { slug } = navigate.query, { data: data2, error: error2 } = (0, import_client35.useQuery)(PERSON_QUERY, {
    variables: { slug },
    skip: !slug
  }), onEditSuccess = (person3) => {
    navigate(`/entities/people/${person3.slug}`);
  }, statusMessage;
  if (!data2 && !error2 ? statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : !data2 && error2 && (statusMessage = `Error fetching Person with slug ${slug}`), statusMessage)
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  let { person: person2 } = data2;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Person: ", person2.name), /* @__PURE__ */ React.createElement(EditPersonForm_default, {
    person: person2,
    onSuccess: onEditSuccess
  }))));
}, edit_default4 = EditPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug/tags.tsx
var tags_exports4 = {};
__export(tags_exports4, {
  default: () => tags_default4
});
var import_react102 = require("@remix-run/react");
var PersonTags = () => {
  let navigate = (0, import_react102.useNavigate)(), { slug } = navigate.query, { name, tags } = person ?? {}, sortedTags = Tag_default.sort(tags);
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
}, tags_default4 = PersonTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var people_exports = {};
__export(people_exports, {
  default: () => people_default,
  loader: () => loader9,
  meta: () => meta4
});
var import_react103 = require("@remix-run/react");
function meta4() {
  return {
    title: "Trad Archive - People"
  };
}
function loader9() {
  return db.person.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var People = () => {
  let people = (0, import_react103.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "People"), people.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No People found"), people.length > 0 && /* @__PURE__ */ React.createElement("ul", null, people.map((person2, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react103.Link, {
    to: Entity_default.makeHrefForView(person2)
  }, person2.name)))));
}, people_default = People;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug.tsx
var slug_exports5 = {};
__export(slug_exports5, {
  default: () => slug_default5,
  loader: () => loader10
});
var import_react104 = require("@remix-run/react");
async function loader10({
  params,
  request
}) {
  let { slug } = params, place = await db.place.findUnique({
    where: {
      slug
    }
  });
  if (!place)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Place"
    });
  let { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */) === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: !0,
            objectCollection: !0,
            objectInstrument: !0,
            objectPerson: !0,
            objectPlace: !0,
            objectTune: !0,
            relationship: !0
          }
        },
        createdByUser: !0,
        updatedByUser: !0,
        comments: {
          include: {
            createdByUser: !0
          }
        },
        savedItems: !0
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
  let { place, audioItems, totalAudioItems } = (0, import_react104.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: place,
    audioItems,
    totalAudioItems
  }));
}, slug_default5 = ViewPlaceBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/about.tsx
var about_exports5 = {};
__export(about_exports5, {
  default: () => about_default5
});
var import_react105 = require("@remix-run/react"), import_react106 = require("@remix-run/react");
var PlaceAbout = () => {
  let navigate = (0, import_react106.useNavigate)(), { slug } = navigate.query, { name, description, aliases, latitude, longitude } = (data == null ? void 0 : data.place) ?? {};
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
  }, "launch"))), /* @__PURE__ */ React.createElement(import_react105.Link, {
    to: `/entities/places/${slug}/edit`
  }, "Edit")));
}, about_default5 = PlaceAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/edit.tsx
var edit_exports5 = {};
__export(edit_exports5, {
  default: () => edit_default5
});
var import_react109 = require("@remix-run/react"), import_client37 = require("@apollo/client");

// app/components/EditPlaceForm.tsx
var import_react107 = require("react"), import_client36 = require("@apollo/client"), import_react108 = require("@remix-run/react");
var UPDATE_PLACE_MUTATION = import_client36.gql`
	mutation UpdatePlace($slug: String!, $input: UpdatePlaceInput!) {
		updatePlace(slug: $slug, input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`, EditPlaceForm = ({ place, onSuccess }) => {
  let navigate = (0, import_react108.useNavigate)(), [updatePlace, { loading, error: error2, data: data2 }] = (0, import_client36.useMutation)(UPDATE_PLACE_MUTATION, {
    errorPolicy: "all"
  }), [name, setName] = (0, import_react107.useState)(place.name), [aliases, setAliases] = (0, import_react107.useState)(place.aliases), [latitude, setLatitude] = (0, import_react107.useState)(place.latitude.toString()), [longitude, setLongitude] = (0, import_react107.useState)(place.longitude.toString()), [description, setDescription] = (0, import_react107.useState)(place.description), onUpdatePlace = (event) => {
    event.preventDefault();
    let input = {
      name,
      aliases,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description
    };
    updatePlace({ variables: { slug: place.slug, input } });
  };
  return (0, import_react107.useEffect)(() => {
    if (data2 == null ? void 0 : data2.updatePlace) {
      if (onSuccess)
        return onSuccess(data2.updatePlace);
      window.alert("Place updated successfully!");
    }
  }, [data2, navigate]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
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
}, EditPlaceForm_default = EditPlaceForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/edit.tsx
var PLACE_QUERY = import_client37.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`, EditPlace = () => {
  let navigate = (0, import_react109.useNavigate)(), { slug } = navigate.query, { data: data2, error: error2 } = (0, import_client37.useQuery)(PLACE_QUERY, {
    variables: { slug },
    skip: !slug
  }), onEditSuccess = (place2) => {
    navigate(`/entities/places/${place2.slug}`);
  }, statusMessage;
  if (!data2 && !error2 ? statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : !data2 && error2 && (statusMessage = `Error fetching Place with slug ${slug}`), statusMessage)
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  let { place } = data2;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Place: ", place.name), /* @__PURE__ */ React.createElement(EditPlaceForm_default, {
    place,
    onSuccess: onEditSuccess
  }))));
}, edit_default5 = EditPlace;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug/tags.tsx
var tags_exports5 = {};
__export(tags_exports5, {
  default: () => tags_default5
});
var import_react110 = require("@remix-run/react");
var PlaceTags = () => {
  let navigate = (0, import_react110.useNavigate)(), { slug } = navigate.query, { place } = data ?? {}, { name, tags } = place ?? {}, sortedTags = Tag_default.sort(tags);
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
}, tags_default5 = PlaceTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var places_exports = {};
__export(places_exports, {
  default: () => places_default,
  loader: () => loader11,
  meta: () => meta5
});
var import_react111 = require("@remix-run/react");
function meta5() {
  return {
    title: "Trad Archive - Places"
  };
}
function loader11() {
  return db.place.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Places = () => {
  let places = (0, import_react111.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Places"), places.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Places found"), places.length > 0 && /* @__PURE__ */ React.createElement("ul", null, places.map((place, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react111.Link, {
    to: Entity_default.makeHrefForView(place)
  }, place.name)))));
}, places_default = Places;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug.tsx
var slug_exports6 = {};
__export(slug_exports6, {
  default: () => slug_default6,
  loader: () => loader12
});
var import_react112 = require("@remix-run/react");
async function loader12({
  params,
  request
}) {
  let { slug } = params, tune = await db.tune.findUnique({
    where: {
      slug
    }
  });
  if (!tune)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find this Tune"
    });
  let { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "RecentlyTagged" /* RecentlyTagged */) === "RecentlyTagged" /* RecentlyTagged */ ? { updatedAt: "desc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
    db.audioItem.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: !0,
            objectCollection: !0,
            objectInstrument: !0,
            objectPerson: !0,
            objectPlace: !0,
            objectTune: !0,
            relationship: !0
          }
        },
        createdByUser: !0,
        updatedByUser: !0,
        comments: {
          include: {
            createdByUser: !0
          }
        },
        savedItems: !0
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
  let { tune, audioItems, totalAudioItems } = (0, import_react112.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: tune,
    audioItems,
    totalAudioItems
  }));
}, slug_default6 = ViewTuneBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug/about.tsx
var about_exports6 = {};
__export(about_exports6, {
  default: () => about_default6
});
var import_react113 = require("@remix-run/react"), import_react114 = require("@remix-run/react");
var TuneAbout = () => {
  let navigate = (0, import_react114.useNavigate)(), { slug } = navigate.query, { name, aliases, theSessionTuneId, type, meter, mode, abc } = (data == null ? void 0 : data.tune) ?? {};
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
  }, abc)), /* @__PURE__ */ React.createElement(import_react113.Link, {
    to: `/entities/tunes/${slug}/edit`
  }, "Edit")));
}, about_default6 = TuneAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug/tags.tsx
var tags_exports6 = {};
__export(tags_exports6, {
  default: () => tags_default6
});
var import_react115 = require("@remix-run/react");
var TuneTags = () => {
  let navigate = (0, import_react115.useNavigate)(), { slug } = navigate.query, { tune } = data ?? {}, { name, tags } = tune ?? {}, sortedTags = Tag_default.sort(tags);
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
}, tags_default6 = TuneTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/index.tsx
var tunes_exports = {};
__export(tunes_exports, {
  default: () => tunes_default,
  loader: () => loader13,
  meta: () => meta6
});
var import_react116 = require("@remix-run/react");
function meta6() {
  return {
    title: "Trad Archive - Tunes"
  };
}
var PER_PAGE = 100;
async function loader13({
  request
}) {
  let url = new URL(request.url), params = new URLSearchParams(url.search), page = Number(params.get("page") ?? 1), perPage = Number(params.get("perPage") ?? PER_PAGE), [tunes, totalTunes] = await Promise.all([
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
  let { tunes, totalTunes } = (0, import_react116.useLoaderData)(), { Filters: Filters2, filtersProps } = useFilters_default({
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
  }, /* @__PURE__ */ React.createElement(import_react116.Link, {
    to: Entity_default.makeHrefForView(tune)
  }, tune.name)))));
}, tunes_default = Tunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/choose-new-password.tsx
var choose_new_password_exports = {};
__export(choose_new_password_exports, {
  action: () => action,
  default: () => ChooseNewPassword,
  loader: () => loader14
});
var import_node4 = require("@remix-run/node"), import_react117 = require("@remix-run/react"), import_bcryptjs = __toESM(require("bcryptjs")), import_isAfter = __toESM(require("date-fns/isAfter"));
var loader14 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), validationError = session.get("validationError") || null, error2 = null, params = new URL(request.url).searchParams, userEmail = params.get("userEmail") ?? "", tokenUnhashed = params.get("tokenUnhashed") ?? "", user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user || !user.autoLoginTokenHashed || !user.autoLoginTokenExpiry)
    return (0, import_node4.redirect)("/reset-password");
  let tokenIsMatch = await import_bcryptjs.default.compare(tokenUnhashed, user.autoLoginTokenHashed), expiryIsValid = (0, import_isAfter.default)(new Date(user.autoLoginTokenExpiry), new Date());
  return (!tokenIsMatch || !expiryIsValid) && (error2 = "Reset password link is invalid or expired. Please request another one."), (0, import_node4.json)({ validationError, error: error2 }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), { searchParams } = new URL(request.url), formData = await request.formData(), email = String(formData.get("email") ?? ""), password = String(formData.get("password") ?? ""), passwordConfirm = String(formData.get("password_confirm") ?? "");
  if (password !== passwordConfirm)
    return session.flash("validationError", "Passwords don't match"), (0, import_node4.redirect)(`/choose-new-password?${searchParams.toString()}`, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  let user = await db.user.findUnique({ where: { email } });
  if (!user)
    return (0, import_node4.redirect)("/reset-password");
  let newPasswordHashed = import_bcryptjs.default.hashSync(password, 10);
  return await db.user.update({
    where: { email },
    data: {
      passwordHashed: newPasswordHashed,
      autoLoginTokenHashed: null,
      autoLoginTokenExpiry: null
    }
  }), session.set("userId", user.id), (0, import_node4.redirect)("/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function ChooseNewPassword() {
  let transition = (0, import_react117.useTransition)(), { error: error2, validationError } = (0, import_react117.useLoaderData)(), [searchParams] = (0, import_react117.useSearchParams)(), email = searchParams.get("userEmail") ?? "";
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Choose a new password"), error2 ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
    className: "text-red-600 mb-6"
  }, error2), /* @__PURE__ */ React.createElement(import_react117.Link, {
    to: "/reset-password"
  }, "Reset Password")) : /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    method: "post",
    className: "space-y-4 mb-6"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "password",
    placeholder: "New password",
    autoFocus: !0,
    required: !0,
    name: "password"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "password",
    placeholder: "New password (again)",
    required: !0,
    name: "password_confirm"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: "email",
    value: email
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn w-auto",
    disabled: transition.state === "submitting",
    value: "Save"
  })), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, validationError)));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/new.tsx
var new_exports5 = {};
__export(new_exports5, {
  default: () => new_default5
});
var import_react118 = require("@remix-run/react");
var NewPerson = () => {
  let navigate = (0, import_react118.useNavigate)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Person"), /* @__PURE__ */ React.createElement(CreatePersonForm_default, {
    onSuccess: (person2) => {
      navigate(`/entities/people/${person2.slug}`);
    }
  }))));
}, new_default5 = NewPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/new.tsx
var new_exports6 = {};
__export(new_exports6, {
  default: () => new_default6
});
var import_react119 = require("@remix-run/react");
var NewPlace = () => {
  let navigate = (0, import_react119.useNavigate)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Place"), /* @__PURE__ */ React.createElement(CreatePlaceForm_default, {
    onSuccess: (place) => {
      navigate(`/entities/places/${place.slug}`);
    }
  }))));
}, new_default6 = NewPlace;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var verify_exports = {};
__export(verify_exports, {
  default: () => verify_default
});
var import_react121 = require("react"), import_client39 = require("@apollo/client"), import_react122 = require("@remix-run/react");

// app/hooks/useVerificationRequestsForCurrentUser.ts
var import_react120 = require("react"), import_client38 = require("@apollo/client");
var VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY = import_client38.gql`
	query VerificationRequestsForCurrentUser {
		verificationRequestsForCurrentUser {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`, useVerificationRequestsForCurrentUser = () => {
  var _a;
  let [makeQuery, query] = (0, import_client38.useLazyQuery)(VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY);
  return (0, import_react120.useEffect)(() => {
    makeQuery();
  }, [makeQuery]), [(_a = query == null ? void 0 : query.data) == null ? void 0 : _a.verificationRequestsForCurrentUser, query];
}, useVerificationRequestsForCurrentUser_default = useVerificationRequestsForCurrentUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var CREATE_PRESIGNED_UPLOAD_URL_MUTATION = import_client39.gql`
	mutation CreatePresignedUploadUrl($filename: String!) {
		createPresignedUploadUrlForVerificationImage(filename: $filename) {
			imageS3Key
			presignedUploadUrl
		}
	}
`, CREATE_VERIFICATION_REQUEST_MUTATION = import_client39.gql`
	mutation CreateVerificationRequest($input: CreateVerificationRequestInput!) {
		createVerificationRequest(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`, AccountVerify = () => {
  let navigate = (0, import_react122.useNavigate)(), [
    _,
    {
      refetch: refetchVerificationRequestsForCurrentUser,
      loading: refetchVerificationRequestsIsLoading
    }
  ] = useVerificationRequestsForCurrentUser_default(), [personEntity, setPersonEntity] = (0, import_react121.useState)(), [imageFile, setImageFile] = (0, import_react121.useState)(), [imageFileObjectUrl, setImageFileObjectUrl] = (0, import_react121.useState)(), [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] = (0, import_react121.useState)(!1), [formIsSubmitting, setFormIsSubmitting] = (0, import_react121.useState)(!1), [createPresignedUploadUrl] = (0, import_client39.useMutation)(CREATE_PRESIGNED_UPLOAD_URL_MUTATION, { errorPolicy: "all" }), [createVerificationRequest] = (0, import_client39.useMutation)(CREATE_VERIFICATION_REQUEST_MUTATION, { errorPolicy: "all" }), onSelectEntity = (entity) => {
    isPerson(entity) && setPersonEntity(entity);
  }, onImageFileChanged = (event) => {
    var _a;
    if (!((_a = event.target.files) == null ? void 0 : _a.length))
      return;
    let selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    let objectUrl = URL.createObjectURL(selectedFile);
    setImageFileObjectUrl(objectUrl);
  };
  (0, import_react121.useEffect)(() => () => {
    imageFileObjectUrl && URL.revokeObjectURL(imageFileObjectUrl);
  }, [imageFileObjectUrl]);
  let requiredFieldsAreSet = personEntity && imageFile && copyrightPermissionIsGranted, onSubmitClicked = async () => {
    if (!requiredFieldsAreSet)
      return window.alert("Please fill out all the fields");
    setFormIsSubmitting(!0);
    try {
      let response = await createPresignedUploadUrl({
        variables: { filename: imageFile.name }
      }), { imageS3Key, presignedUploadUrl } = response.data.createPresignedUploadUrlForVerificationImage;
      await fetch(presignedUploadUrl, { method: "PUT", body: imageFile });
      let { data: data2 } = await createVerificationRequest({
        variables: {
          input: {
            personId: personEntity.id,
            imageS3Key,
            copyrightPermissionStatus: "FullNonCommercialGranted" /* FullNonCommercialGranted */
          }
        }
      });
      if (!data2.createVerificationRequest)
        throw new Error();
      await refetchVerificationRequestsForCurrentUser(), setFormIsSubmitting(!1), navigate("/account");
    } catch {
      setFormIsSubmitting(!1), window.alert("Error submitting verification request. Please reload and try again.");
    }
  }, shouldPromptToChoosePerson = !personEntity && imageFile && copyrightPermissionIsGranted;
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
  }, `This enables you to link your user account with a Person tag. For example, let's say you are Michael Coleman; you can link your user account to the "Michael Coleman" tag on the site. You'll get a verified badge next to your username, and you'll be able to immediately take down any content that you're tagged in, if you want to. Verification is free and will be done by ITMA staff.`), personEntity ? /* @__PURE__ */ React.createElement("div", {
    className: "mb-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 font-bold"
  }, "You have selected:"), personEntity.firstName, " ", personEntity.lastName, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text ml-2",
    onClick: () => setPersonEntity(void 0)
  }, "Clear")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Search for your name and click on the Person if found. If it doesn't exist yet, go ahead and create a new one."), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col max-w-xs"
  }, /* @__PURE__ */ React.createElement(SearchEntities_default, {
    className: "mb-8",
    entityTypes: ["Person" /* Person */],
    take: 15,
    onSelect: onSelectEntity,
    onNewEntityCreated: onSelectEntity
  }))), /* @__PURE__ */ React.createElement("div", {
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
}, verify_default = AccountVerify;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/reset-password.tsx
var reset_password_exports = {};
__export(reset_password_exports, {
  action: () => action2,
  default: () => ResetPassword,
  loader: () => loader15
});
var import_node5 = require("@remix-run/node"), import_react123 = require("@remix-run/react"), import_mail = __toESM(require("@sendgrid/mail")), import_bcryptjs2 = __toESM(require("bcryptjs")), import_uuid = require("uuid"), import_addMinutes = __toESM(require("date-fns/addMinutes"));
var loader15 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), error2 = session.get("error") || null, confirmation = session.get("confirmation") || null;
  return (0, import_node5.json)({ error: error2, confirmation }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action2 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), formData = await request.formData(), email = String(formData.get("email") ?? ""), user = await db.user.findUnique({ where: { email } });
  if (!user)
    return session.flash("error", "Could not find a user with that email"), (0, import_node5.redirect)("/reset-password", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  let autoLoginTokenUnhashed = (0, import_uuid.v4)(), autoLoginTokenHashed = await import_bcryptjs2.default.hash(autoLoginTokenUnhashed, 10), autoLoginTokenExpiry = (0, import_addMinutes.default)(new Date(), 10);
  await db.user.update({
    where: { id: user.id },
    data: { autoLoginTokenHashed, autoLoginTokenExpiry }
  }), import_mail.default.setApiKey(process.env.SENDGRID_API_KEY ?? "");
  let params = new URLSearchParams({
    tokenUnhashed: autoLoginTokenUnhashed,
    userEmail: email
  }), url = `${new URL(request.url).origin}/choose-new-password?${params.toString()}`, data2 = {
    to: user.email,
    from: "no-reply@tradarchive.com",
    subject: "Reset your password for Trad Archive",
    text: `Hi ${user.username}, click this link to reset your password for Trad Archive: ${url} . This link will be valid for the next 10 minutes. If you didn't request this, you can ignore this email.`,
    html: `
			Hi ${user.username},
			<br /><br />
			<a href="${url}">Click here to reset your password for Trad Archive</a>
			<br /><br />
			This link will be valid for the next 10 minutes.
			<br /><br />
			- - -
			<br /><br />
			If it doesn't work, copy and paste this URL into your browser:
			<br /><br />
			<em>${url}</em>
		`
  };
  return await import_mail.default.send(data2), session.flash("confirmation", "Check your email for a link to reset your password"), (0, import_node5.redirect)("/reset-password", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function ResetPassword() {
  let transition = (0, import_react123.useTransition)(), { error: error2, confirmation } = (0, import_react123.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Reset your password"), confirmation ? /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-1"
  }, "mail_outline"), confirmation) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", {
    className: "text-gray-500 mb-4"
  }, "We'll send you an email with a link to reset your password."), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    method: "post",
    className: "space-y-4 mb-6"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: "Email",
    autoFocus: !0,
    required: !0,
    name: "email"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn w-auto",
    disabled: transition.state === "submitting",
    value: "Send Email"
  })), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-6"
  }, error2), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(import_react123.Link, {
    to: "/login"
  }, "Go Back")))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/index.tsx
var account_exports = {};
__export(account_exports, {
  default: () => AccountHome,
  loader: () => loader16
});
var import_react124 = require("@remix-run/react"), import_node6 = require("@remix-run/node");
var loader16 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), currentUserId = String(session.get("userId") ?? ""), currentUser = await db.user.findUnique({
    where: { id: currentUserId }
  });
  if (!currentUser) {
    let params = new URLSearchParams();
    return params.set("redirectTo", "/account"), (0, import_node6.redirect)(`/login?${params.toString()}`);
  }
  return (0, import_node6.json)({ currentUser });
};
function AccountHome() {
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Account"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col space-y-2"
  }, /* @__PURE__ */ React.createElement(import_react124.Link, {
    to: "/reset-password"
  }, "Change Password"), /* @__PURE__ */ React.createElement(import_react124.Link, {
    to: "/logout"
  }, "Log Out ")));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/index.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => admin_default
});
var import_react125 = require("@remix-run/react");
var AdminHome = () => /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
  className: "mb-4"
}, "Admin"), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/admin/verification-requests"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Manage Verification Requests")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/admin/takedown-requests"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Manage Takedown Requests")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/admin/submissions"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-6"
}, "Manage Submissions")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/entities/audio-items/new"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Create Audio Item")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/entities/people/new"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Create Person")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/entities/instruments/new"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Create Instrument")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/entities/places/new"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Create Place")), /* @__PURE__ */ React.createElement(import_react125.Link, {
  to: "/entities/collections/new"
}, /* @__PURE__ */ React.createElement("a", {
  className: "block mb-2"
}, "Create Collection"))))), admin_default = AdminHome;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/saved-items.tsx
var saved_items_exports = {};
__export(saved_items_exports, {
  action: () => action3,
  default: () => SavedItems,
  loader: () => loader17
});
var import_react126 = require("@remix-run/react"), import_node7 = require("@remix-run/node");
var loader17 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { pathname, searchParams } = new URL(request.url), redirectParams = new URLSearchParams({
    redirectTo: pathname
  });
  if (!userId)
    return (0, import_node7.redirect)(`/login?${redirectParams.toString()}`);
  let page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItems = await db.audioItem.findMany({
    where: {
      savedItems: {
        some: {
          userId
        }
      }
    },
    include: {
      tagsAsSubject: {
        include: {
          objectAudioItem: !0,
          objectCollection: !0,
          objectInstrument: !0,
          objectPerson: !0,
          objectPlace: !0,
          objectTune: !0,
          relationship: !0
        }
      },
      createdByUser: !0,
      updatedByUser: !0,
      comments: {
        include: {
          createdByUser: !0
        },
        orderBy: {
          createdAt: "asc"
        }
      },
      savedItems: {
        where: {
          userId
        }
      }
    },
    skip: (page - 1) * perPage,
    take: perPage
  });
  return (0, import_node7.json)({ audioItems });
}, action3 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectParams = new URLSearchParams({
    redirectTo: referer ? new URL(referer).pathname : "/"
  });
  if (!userId)
    return (0, import_node7.redirect)(`/login?${redirectParams.toString()}`);
  let formData = await request.formData(), audioItemId = String(formData.get("audioItemId") ?? ""), existing = await db.savedItem.findUnique({
    where: {
      userId_audioItemId: {
        userId,
        audioItemId
      }
    }
  });
  return existing ? await db.savedItem.delete({ where: { id: existing.id } }) : await db.savedItem.create({ data: { userId, audioItemId } }), (0, import_node7.json)({ ok: !0 }, { status: 200 });
};
function SavedItems() {
  let { audioItems } = (0, import_react126.useLoaderData)(), { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    defaultViewAs: "List" /* List */
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Saved Items"), audioItems.length > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), audioItems.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Nothing saved yet - try browsing some", " ", /* @__PURE__ */ React.createElement(import_react126.Link, {
    to: "/"
  }, "Audio Items"), "!"), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  }))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/$id.tsx
var id_exports2 = {};
__export(id_exports2, {
  default: () => id_default2,
  loader: () => loader18
});
var import_react127 = require("@remix-run/react"), import_node8 = require("@remix-run/node");
var loader18 = async ({ params }) => {
  let user = await db.user.findUnique({ where: { id: params.id } });
  if (!user)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find a user with this ID"
    });
  return (0, import_node8.json)({ user });
}, ViewUserById = () => {
  let { user } = (0, import_react127.useLoaderData)(), { username, createdAt } = user;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col-reverse md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    className: "mb-6",
    items: [{ label: "Users" }, { label: username }]
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-col mb-8"
  }, /* @__PURE__ */ React.createElement("div", null, "Account Created:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, DateTime_default.formatDateYear(createdAt)))))));
}, id_default2 = ViewUserById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/comments.tsx
var comments_exports = {};
__export(comments_exports, {
  action: () => action4
});
var import_node9 = require("@remix-run/node");
var action4 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(referer ? new URL(referer).pathname : "/");
  if (!userId)
    return (0, import_node9.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), text = String(formData.get("text") ?? ""), parentAudioItemId = String(formData.get("parentAudioItemId") ?? ""), error2;
  if (text ? parentAudioItemId || (error2 = "Parent audio item ID not defined") : error2 = "Comment cannot be empty", error2)
    return (0, import_node9.json)({ error: error2 }, { status: 400 });
  let comment = await db.comment.create({
    data: {
      text,
      parentAudioItemId,
      createdByUserId: userId
    }
  });
  return (0, import_node9.json)({ comment }, { status: 201 });
};

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  loader: () => loader19
});
var import_node10 = require("@remix-run/node");
var loader19 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  return (0, import_node10.redirect)("/login", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action5,
  default: () => SignUp,
  loader: () => loader20
});
var import_react128 = require("@remix-run/react"), import_bcryptjs3 = __toESM(require("bcryptjs"));
var import_node11 = require("@remix-run/node");
var loader20 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (session.has("userId"))
    return (0, import_node11.redirect)(redirectTo || "/");
  let data2 = { error: session.get("error") };
  return (0, import_node11.json)(data2, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action5 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo"), formData = await request.formData(), email = String(formData.get("email") ?? ""), fullName = String(formData.get("full_name") ?? ""), password = String(formData.get("password") ?? ""), passwordConfirm = String(formData.get("password_confirm") ?? "");
  if (await db.user.findUnique({ where: { email } }))
    return session.flash("error", "There is already a user with this email address. Try logging in?"), (0, import_node11.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email))
    return session.flash("error", "Email is not valid"), (0, import_node11.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(fullName.split(" ").length >= 2))
    return session.flash("error", "Please enter your full name"), (0, import_node11.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(password === passwordConfirm))
    return session.flash("error", "Passwords don't match"), (0, import_node11.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(password.length >= 8))
    return session.flash("error", "Password must be at least 8 characters long"), (0, import_node11.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  let passwordHashed = import_bcryptjs3.default.hashSync(password, 10), newUser = await db.user.create({
    data: {
      email,
      username: fullName,
      passwordHashed
    }
  });
  return session.set("userId", newUser.id), (0, import_node11.redirect)(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function SignUp() {
  let { error: error2 } = (0, import_react128.useLoaderData)(), { state } = (0, import_react128.useTransition)(), { search } = (0, import_react128.useLocation)(), redirectTo = new URLSearchParams(search).get("redirectTo"), logInLinkQueryParams = new URLSearchParams(redirectTo ? { redirectTo } : void 0);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, redirectTo ? "Create an account to continue" : "Create your account"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    method: "post",
    className: "space-y-4 mb-6"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "email",
    placeholder: "Your email",
    autoFocus: !0,
    required: !0
  }), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    name: "full_name",
    placeholder: "Your full name",
    required: !0
  }), /* @__PURE__ */ React.createElement("input", {
    type: "password",
    name: "password",
    required: !0,
    placeholder: "Choose a password"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "password",
    name: "password_confirm",
    required: !0,
    placeholder: "Password (again)"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: state === "submitting",
    value: "Sign Up"
  })), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-6"
  }, error2), /* @__PURE__ */ React.createElement("div", null, "Already have an account?", " ", /* @__PURE__ */ React.createElement(import_react128.Link, {
    to: `/login?${logInLinkQueryParams.toString()}`
  }, "Log in"))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Home,
  loader: () => loader21
});
var import_react129 = require("react"), import_react130 = require("@remix-run/react");

// app/services/LocalStorage.ts
var localStorageIsAvailable = typeof window < "u" && (window == null ? void 0 : window.localStorage), setItem = (key, value) => {
  localStorageIsAvailable && window.localStorage.setItem(key, value);
}, getItem = (key) => {
  if (localStorageIsAvailable)
    return window.localStorage.getItem(key);
}, LocalStorageService = {
  setItem,
  getItem
}, LocalStorage_default = LocalStorageService;

// app/components/ProjectIntro.tsx
var ProjectIntro = ({ className, onClose }) => /* @__PURE__ */ React.createElement("div", {
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
}, "close"))), ProjectIntro_default = ProjectIntro;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
async function loader21({
  request
}) {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), [
    audioItems,
    collections,
    comments,
    numAudioItemsAllTime,
    numTagsAllTime,
    numCommentsAllTime
  ] = await Promise.all([
    db.audioItem.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        tagsAsSubject: {
          include: {
            objectAudioItem: !0,
            objectCollection: !0,
            objectInstrument: !0,
            objectPerson: !0,
            objectPlace: !0,
            objectTune: !0,
            relationship: !0
          }
        },
        createdByUser: !0,
        updatedByUser: !0,
        comments: {
          include: {
            createdByUser: !0
          },
          orderBy: {
            createdAt: "asc"
          }
        },
        savedItems: {
          where: {
            userId
          }
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    }),
    db.collection.findMany({
      take: 5,
      include: {
        tagsAsSubject: !0,
        createdByUser: !0,
        updatedByUser: !0
      },
      orderBy: {
        createdAt: "desc"
      }
    }),
    db.comment.findMany({
      take: 6,
      include: {
        createdByUser: !0,
        parentAudioItem: !0
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
  let {
    audioItems,
    collections,
    comments,
    numAudioItemsAllTime,
    numTagsAllTime,
    numCommentsAllTime
  } = (0, import_react130.useLoaderData)(), { search } = (0, import_react130.useLocation)(), viewAs = new URLSearchParams(search).get("viewAs") ?? "Cards" /* Cards */, { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: numAudioItemsAllTime
  }), [shouldShowIntro, setShouldShowIntro] = (0, import_react129.useState)(!1);
  (0, import_react129.useEffect)(() => {
    LocalStorage_default.getItem("SHOULD_SHOW_INTRO") !== "false" && setShouldShowIntro(!0);
  }, []);
  let onCloseIntro = (0, import_react129.useCallback)(() => {
    LocalStorage_default.setItem("SHOULD_SHOW_INTRO", "false"), setShouldShowIntro(!1);
  }, []);
  return /* @__PURE__ */ React.createElement(Layout_default, null, shouldShowIntro && /* @__PURE__ */ React.createElement(ProjectIntro_default, {
    className: "mb-8 md:mt-4 md:mb-12",
    onClose: onCloseIntro
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement("h1", null, "Explore"), /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    viewAs: void 0,
    sortBy: void 0,
    className: "sticky left-0 right-0 py-4 px-4 -ml-4 -mr-4 bg-gray-100 top-[48px] mb-2 z-10"
  })), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "Browse"), /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: "/entities/people",
    className: "mb-2"
  }, "People"), /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: "/entities/instruments",
    className: "mb-2"
  }, "Instruments"), /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: "/entities/places",
    className: "mb-2"
  }, "Places"), /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: "/entities/tunes",
    className: "mb-2"
  }, "Tunes"), /* @__PURE__ */ React.createElement(import_react130.Link, {
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
    let { name } = collection;
    return name ? /* @__PURE__ */ React.createElement("div", {
      className: "mb-2 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement(import_react130.Link, {
      to: Entity_default.makeHrefForView(collection)
    }, collection.name)) : null;
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
    let { createdByUser, parentAudioItem, text } = comment;
    return !createdByUser || !parentAudioItem ? null : /* @__PURE__ */ React.createElement("div", {
      className: "mb-4 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: " mb-1"
    }, /* @__PURE__ */ React.createElement(import_react130.Link, {
      to: `/users/${createdByUser.id}`
    }, createdByUser.username), " commented on ", /* @__PURE__ */ React.createElement(import_react130.Link, {
      to: Entity_default.makeHrefForView(parentAudioItem)
    }, parentAudioItem.name), ":"), /* @__PURE__ */ React.createElement("div", {
      className: "whitespace-pre-line text-sm"
    }, text));
  }))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action6,
  default: () => Login,
  loader: () => loader22
});
var import_react131 = require("@remix-run/react"), import_node12 = require("@remix-run/node"), import_bcryptjs4 = __toESM(require("bcryptjs"));
var loader22 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (session.has("userId"))
    return (0, import_node12.redirect)(redirectTo || "/");
  let data2 = { error: session.get("error") };
  return (0, import_node12.json)(data2, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action6 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo"), formData = await request.formData(), email = String(formData.get("email") ?? ""), password = String(formData.get("password") ?? ""), user = await db.user.findUnique({ where: { email } });
  return user ? user.passwordHashed ? import_bcryptjs4.default.compareSync(password, user.passwordHashed) ? (session.set("userId", user.id), (0, import_node12.redirect)(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "Incorrect password"), (0, import_node12.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "This user does not have a password. TODO: Redirect to /reset-password page"), (0, import_node12.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "Could not find a user with this email"), (0, import_node12.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  }));
};
function Login() {
  let { error: error2 } = (0, import_react131.useLoaderData)(), transition = (0, import_react131.useTransition)(), { search } = (0, import_react131.useLocation)(), redirectTo = new URLSearchParams(search).get("redirectTo"), signUpLinkQueryParams = new URLSearchParams(redirectTo ? { redirectTo } : void 0);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Log in to ", redirectTo ? "continue" : "Trad Archive"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    method: "post",
    className: "space-y-4 mb-6"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: "Email",
    autoFocus: !0,
    required: !0,
    name: "email"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "password",
    placeholder: "Password",
    required: !0,
    name: "password"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn w-auto",
    disabled: transition.state === "submitting",
    value: "Log In"
  })), error2 && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-6"
  }, error2), /* @__PURE__ */ React.createElement("p", {
    className: "mb-2"
  }, "Don't have an account yet?", " ", /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: `/signup?${signUpLinkQueryParams.toString()}`
  }, "Sign Up")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(import_react131.Link, {
    to: "/reset-password"
  }, "Reset Password"))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "fc6c1734", entry: { module: "/build/entry.client-4RBPKCCT.js", imports: ["/build/_shared/chunk-LNAVFCVS.js", "/build/_shared/chunk-SDLOU3B7.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-YSQ7ACGX.js", imports: ["/build/_shared/chunk-ZLRWE4NK.js", "/build/_shared/chunk-Z6THQVES.js", "/build/_shared/chunk-CN7PIE6V.js", "/build/_shared/chunk-7YRB6UYL.js", "/build/_shared/chunk-73QZMJW5.js", "/build/_shared/chunk-KOSINZAG.js", "/build/_shared/chunk-J3MRV52L.js", "/build/_shared/chunk-PQJWRTRS.js", "/build/_shared/chunk-YQUMRRE2.js", "/build/_shared/chunk-HUAUP4K4.js", "/build/_shared/chunk-QZPZTLRC.js", "/build/_shared/chunk-XNJMNUGD.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/account/index": { id: "routes/account/index", parentId: "root", path: "account", index: !0, caseSensitive: void 0, module: "/build/routes/account/index-5BQXLM4I.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/account/submissions/[id]/upload": { id: "routes/account/submissions/[id]/upload", parentId: "root", path: "account/submissions/id/upload", index: void 0, caseSensitive: void 0, module: "/build/routes/account/submissions/[id]/upload-NNC6UZJH.js", imports: ["/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/account/submissions/index": { id: "routes/account/submissions/index", parentId: "root", path: "account/submissions", index: !0, caseSensitive: void 0, module: "/build/routes/account/submissions/index-O4YMFIZJ.js", imports: ["/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/account/submissions/new": { id: "routes/account/submissions/new", parentId: "root", path: "account/submissions/new", index: void 0, caseSensitive: void 0, module: "/build/routes/account/submissions/new-L33LM2SQ.js", imports: ["/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/account/verify": { id: "routes/account/verify", parentId: "root", path: "account/verify", index: void 0, caseSensitive: void 0, module: "/build/routes/account/verify-WYYZC6HX.js", imports: ["/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/index": { id: "routes/admin/index", parentId: "root", path: "admin", index: !0, caseSensitive: void 0, module: "/build/routes/admin/index-3XMGI3OJ.js", imports: ["/build/_shared/chunk-KF4KFTG7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/submissions/[id]": { id: "routes/admin/submissions/[id]", parentId: "root", path: "admin/submissions/id", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/submissions/[id]-FG7WQSK3.js", imports: ["/build/_shared/chunk-KF4KFTG7.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/submissions/index": { id: "routes/admin/submissions/index", parentId: "root", path: "admin/submissions", index: !0, caseSensitive: void 0, module: "/build/routes/admin/submissions/index-UY4ZF2KF.js", imports: ["/build/_shared/chunk-KF4KFTG7.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/takedown-requests": { id: "routes/admin/takedown-requests", parentId: "root", path: "admin/takedown-requests", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/takedown-requests-EHU3LEXH.js", imports: ["/build/_shared/chunk-KF4KFTG7.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/verification-requests": { id: "routes/admin/verification-requests", parentId: "root", path: "admin/verification-requests", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/verification-requests-RFPPHHMG.js", imports: ["/build/_shared/chunk-KF4KFTG7.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/choose-new-password": { id: "routes/choose-new-password", parentId: "root", path: "choose-new-password", index: void 0, caseSensitive: void 0, module: "/build/routes/choose-new-password-DRVQWS7G.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/comments": { id: "routes/comments", parentId: "root", path: "comments", index: void 0, caseSensitive: void 0, module: "/build/routes/comments-5P3ESY7C.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/$slug": { id: "routes/entities/audio-items/$slug", parentId: "root", path: "entities/audio-items/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/$slug-OLMJD55S.js", imports: ["/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/$slug/about": { id: "routes/entities/audio-items/$slug/about", parentId: "routes/entities/audio-items/$slug", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/$slug/about-Q3HPH7KW.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/$slug/edit": { id: "routes/entities/audio-items/$slug/edit", parentId: "routes/entities/audio-items/$slug", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/$slug/edit-44OCY5IS.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/$slug/tags": { id: "routes/entities/audio-items/$slug/tags", parentId: "routes/entities/audio-items/$slug", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/$slug/tags-AGNIMGTX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/index": { id: "routes/entities/audio-items/index", parentId: "root", path: "entities/audio-items", index: !0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/index-IWNJVVXR.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/new": { id: "routes/entities/audio-items/new", parentId: "root", path: "entities/audio-items/new", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/new-2QKSVHHI.js", imports: ["/build/_shared/chunk-KF4KFTG7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/random": { id: "routes/entities/audio-items/random", parentId: "root", path: "entities/audio-items/random", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/random-5WJTYHAU.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/$slug": { id: "routes/entities/collections/$slug", parentId: "root", path: "entities/collections/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/$slug-GLXP66XW.js", imports: ["/build/_shared/chunk-PFTK5VZO.js", "/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/$slug/about": { id: "routes/entities/collections/$slug/about", parentId: "routes/entities/collections/$slug", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/$slug/about-TTYF4YNB.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/$slug/edit": { id: "routes/entities/collections/$slug/edit", parentId: "routes/entities/collections/$slug", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/$slug/edit-4Q6P7DVB.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/$slug/tags": { id: "routes/entities/collections/$slug/tags", parentId: "routes/entities/collections/$slug", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/$slug/tags-SXCPDEQD.js", imports: ["/build/_shared/chunk-RKJI55PJ.js", "/build/_shared/chunk-Z6THQVES.js", "/build/_shared/chunk-CN7PIE6V.js", "/build/_shared/chunk-7YRB6UYL.js", "/build/_shared/chunk-73QZMJW5.js", "/build/_shared/chunk-KOSINZAG.js", "/build/_shared/chunk-J3MRV52L.js", "/build/_shared/chunk-YQUMRRE2.js", "/build/_shared/chunk-HUAUP4K4.js", "/build/_shared/chunk-QZPZTLRC.js", "/build/_shared/chunk-XNJMNUGD.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/index": { id: "routes/entities/collections/index", parentId: "root", path: "entities/collections", index: !0, caseSensitive: void 0, module: "/build/routes/entities/collections/index-IK37JV3O.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/new": { id: "routes/entities/collections/new", parentId: "root", path: "entities/collections/new", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/new-H4SCTJBB.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/$slug": { id: "routes/entities/instruments/$slug", parentId: "root", path: "entities/instruments/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/$slug-6R7G3ZSX.js", imports: ["/build/_shared/chunk-PFTK5VZO.js", "/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/$slug/about": { id: "routes/entities/instruments/$slug/about", parentId: "routes/entities/instruments/$slug", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/$slug/about-X6B2HCQD.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/$slug/edit": { id: "routes/entities/instruments/$slug/edit", parentId: "routes/entities/instruments/$slug", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/$slug/edit-AOYINIV7.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/$slug/tags": { id: "routes/entities/instruments/$slug/tags", parentId: "routes/entities/instruments/$slug", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/$slug/tags-K6ARLFFO.js", imports: ["/build/_shared/chunk-RKJI55PJ.js", "/build/_shared/chunk-Z6THQVES.js", "/build/_shared/chunk-CN7PIE6V.js", "/build/_shared/chunk-7YRB6UYL.js", "/build/_shared/chunk-73QZMJW5.js", "/build/_shared/chunk-KOSINZAG.js", "/build/_shared/chunk-J3MRV52L.js", "/build/_shared/chunk-YQUMRRE2.js", "/build/_shared/chunk-HUAUP4K4.js", "/build/_shared/chunk-QZPZTLRC.js", "/build/_shared/chunk-XNJMNUGD.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/index": { id: "routes/entities/instruments/index", parentId: "root", path: "entities/instruments", index: !0, caseSensitive: void 0, module: "/build/routes/entities/instruments/index-S2CKZQFX.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/new": { id: "routes/entities/instruments/new", parentId: "root", path: "entities/instruments/new", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/new-7IR2UOPK.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/$slug": { id: "routes/entities/people/$slug", parentId: "root", path: "entities/people/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/$slug-HUFVIKNR.js", imports: ["/build/_shared/chunk-PFTK5VZO.js", "/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/$slug/about": { id: "routes/entities/people/$slug/about", parentId: "routes/entities/people/$slug", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/$slug/about-G4NCZ6M6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/$slug/edit": { id: "routes/entities/people/$slug/edit", parentId: "routes/entities/people/$slug", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/$slug/edit-WZAMEA43.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/$slug/tags": { id: "routes/entities/people/$slug/tags", parentId: "routes/entities/people/$slug", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/$slug/tags-3TLWXSMJ.js", imports: ["/build/_shared/chunk-RKJI55PJ.js", "/build/_shared/chunk-Z6THQVES.js", "/build/_shared/chunk-CN7PIE6V.js", "/build/_shared/chunk-7YRB6UYL.js", "/build/_shared/chunk-73QZMJW5.js", "/build/_shared/chunk-KOSINZAG.js", "/build/_shared/chunk-J3MRV52L.js", "/build/_shared/chunk-YQUMRRE2.js", "/build/_shared/chunk-HUAUP4K4.js", "/build/_shared/chunk-QZPZTLRC.js", "/build/_shared/chunk-XNJMNUGD.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/index": { id: "routes/entities/people/index", parentId: "root", path: "entities/people", index: !0, caseSensitive: void 0, module: "/build/routes/entities/people/index-O7RD477W.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/new": { id: "routes/entities/people/new", parentId: "root", path: "entities/people/new", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/new-TF5CSZGI.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/$slug": { id: "routes/entities/places/$slug", parentId: "root", path: "entities/places/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/$slug-R5TOFVZU.js", imports: ["/build/_shared/chunk-PFTK5VZO.js", "/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/$slug/about": { id: "routes/entities/places/$slug/about", parentId: "routes/entities/places/$slug", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/$slug/about-LVSKERUP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/$slug/edit": { id: "routes/entities/places/$slug/edit", parentId: "routes/entities/places/$slug", path: "edit", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/$slug/edit-FF5ACGOJ.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/$slug/tags": { id: "routes/entities/places/$slug/tags", parentId: "routes/entities/places/$slug", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/$slug/tags-KPU7NEPF.js", imports: ["/build/_shared/chunk-RKJI55PJ.js", "/build/_shared/chunk-Z6THQVES.js", "/build/_shared/chunk-CN7PIE6V.js", "/build/_shared/chunk-7YRB6UYL.js", "/build/_shared/chunk-73QZMJW5.js", "/build/_shared/chunk-KOSINZAG.js", "/build/_shared/chunk-J3MRV52L.js", "/build/_shared/chunk-YQUMRRE2.js", "/build/_shared/chunk-HUAUP4K4.js", "/build/_shared/chunk-QZPZTLRC.js", "/build/_shared/chunk-XNJMNUGD.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/index": { id: "routes/entities/places/index", parentId: "root", path: "entities/places", index: !0, caseSensitive: void 0, module: "/build/routes/entities/places/index-EL3UJZND.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/new": { id: "routes/entities/places/new", parentId: "root", path: "entities/places/new", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/new-TD7FELPB.js", imports: ["/build/_shared/chunk-PS2F4ESJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/$slug": { id: "routes/entities/tunes/$slug", parentId: "root", path: "entities/tunes/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/tunes/$slug-2GWXP65D.js", imports: ["/build/_shared/chunk-PFTK5VZO.js", "/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/$slug/about": { id: "routes/entities/tunes/$slug/about", parentId: "routes/entities/tunes/$slug", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/tunes/$slug/about-Q2AE3PFK.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/$slug/tags": { id: "routes/entities/tunes/$slug/tags", parentId: "routes/entities/tunes/$slug", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/tunes/$slug/tags-7EVE4BJ6.js", imports: ["/build/_shared/chunk-RKJI55PJ.js", "/build/_shared/chunk-Z6THQVES.js", "/build/_shared/chunk-CN7PIE6V.js", "/build/_shared/chunk-7YRB6UYL.js", "/build/_shared/chunk-73QZMJW5.js", "/build/_shared/chunk-KOSINZAG.js", "/build/_shared/chunk-J3MRV52L.js", "/build/_shared/chunk-YQUMRRE2.js", "/build/_shared/chunk-HUAUP4K4.js", "/build/_shared/chunk-QZPZTLRC.js", "/build/_shared/chunk-XNJMNUGD.js", "/build/_shared/chunk-PKPMHHR6.js", "/build/_shared/chunk-C3OOQRN4.js", "/build/_shared/chunk-37OVOBH6.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/index": { id: "routes/entities/tunes/index", parentId: "root", path: "entities/tunes", index: !0, caseSensitive: void 0, module: "/build/routes/entities/tunes/index-HSUAGBBE.js", imports: ["/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-2CEQLWDF.js", imports: ["/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-3KB3C3GC.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-HAGAUS4Y.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/reset-password": { id: "routes/reset-password", parentId: "root", path: "reset-password", index: void 0, caseSensitive: void 0, module: "/build/routes/reset-password-BSRKV2Z3.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/saved-items": { id: "routes/saved-items", parentId: "root", path: "saved-items", index: void 0, caseSensitive: void 0, module: "/build/routes/saved-items-NBL4PAEC.js", imports: ["/build/_shared/chunk-2JRS7W52.js", "/build/_shared/chunk-JIGRKXTE.js", "/build/_shared/chunk-2URYMSZW.js", "/build/_shared/chunk-7NJMRZQR.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-BTICP3C7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-SNT7Q2JV.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/users/$id": { id: "routes/users/$id", parentId: "root", path: "users/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/users/$id-6SXM6J4M.js", imports: ["/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-FC6C1734.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports }, routes = {
  root: {
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
    index: !0,
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
    index: !0,
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
    index: !0,
    caseSensitive: void 0,
    module: instruments_exports
  },
  "routes/account/submissions/index": {
    id: "routes/account/submissions/index",
    parentId: "root",
    path: "account/submissions",
    index: !0,
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
    index: !0,
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
    index: !0,
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
    index: !0,
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
    index: !0,
    caseSensitive: void 0,
    module: tunes_exports
  },
  "routes/choose-new-password": {
    id: "routes/choose-new-password",
    parentId: "root",
    path: "choose-new-password",
    index: void 0,
    caseSensitive: void 0,
    module: choose_new_password_exports
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
  "routes/reset-password": {
    id: "routes/reset-password",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: reset_password_exports
  },
  "routes/account/index": {
    id: "routes/account/index",
    parentId: "root",
    path: "account",
    index: !0,
    caseSensitive: void 0,
    module: account_exports
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "root",
    path: "admin",
    index: !0,
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
  "routes/users/$id": {
    id: "routes/users/$id",
    parentId: "root",
    path: "users/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports2
  },
  "routes/comments": {
    id: "routes/comments",
    parentId: "root",
    path: "comments",
    index: void 0,
    caseSensitive: void 0,
    module: comments_exports
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
    index: !0,
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
