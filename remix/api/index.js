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
var import_node2 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), import_client6 = require("@apollo/client");

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-AHNA25L6.css";

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
var TakedownRequestType = /* @__PURE__ */ ((TakedownRequestType2) => (TakedownRequestType2.Performer = "Performer", TakedownRequestType2.Copyright = "Copyright", TakedownRequestType2))(TakedownRequestType || {});
var isPendingTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Pending", isApprovedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Approved";

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
var import_react14 = __toESM(require("react")), import_react15 = require("@remix-run/react"), import_react16 = require("@remix-run/react"), import_react_hotkeys_hook2 = require("react-hotkeys-hook");

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
}, [onClose]), isVisible ? /* @__PURE__ */ import_react7.default.createElement("div", {
  className: `${isVisible ? "visible" : "hidden"} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`
}, /* @__PURE__ */ import_react7.default.createElement("div", {
  className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
  onClick: onClose
}), /* @__PURE__ */ import_react7.default.createElement("div", {
  className: `bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-[90vh] overflow-y-auto overflow-x-hidden md:max-w-xl ${className ?? ""}`
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
var import_react13 = require("@remix-run/react"), import_debounce = __toESM(require("lodash/debounce")), import_client5 = require("@prisma/client");

// app/components/LoadingCircle.tsx
var LoadingCircle = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: "h-6"
}, /* @__PURE__ */ React.createElement("i", {
  className: `material-icons animate-spin text-gray-500 ${className ?? ""}`
}, "scatter_plot")), LoadingCircle_default = LoadingCircle;

// app/components/CreateNewEntities.tsx
var import_react12 = require("react"), import_client4 = require("@prisma/client");

// app/components/CreatePersonForm.tsx
var import_react8 = require("react");
var import_react9 = require("@remix-run/react");
function CreatePersonForm({ onSuccess }) {
  var _a;
  let formRef = (0, import_react8.useRef)(null), fetcher = (0, import_react9.useFetcher)();
  (0, import_react8.useEffect)(() => {
    onSuccess && fetcher.type === "done" && fetcher.data.person && onSuccess(fetcher.data.person);
  }, [fetcher, onSuccess]);
  let [firstNameDraft, setFirstNameDraft] = (0, import_react8.useState)(""), [middleNameDraft, setMiddleNameDraft] = (0, import_react8.useState)(""), [lastNameDraft, setLastNameDraft] = (0, import_react8.useState)(""), [slug, setSlug] = (0, import_react8.useState)("");
  return (0, import_react8.useEffect)(() => {
    let proposedSlug = "";
    firstNameDraft && (proposedSlug = firstNameDraft), middleNameDraft && (proposedSlug = `${proposedSlug}-${middleNameDraft}`), lastNameDraft && (proposedSlug = `${proposedSlug}-${lastNameDraft}`), setSlug(Entity_default.cleanSlug(proposedSlug));
  }, [firstNameDraft, middleNameDraft, lastNameDraft]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement(fetcher.Form, {
    ref: formRef,
    method: "post",
    action: "/entities/people?index"
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    name: "first_name",
    onChange: (e) => setFirstNameDraft(e.target.value),
    className: "mb-2",
    required: !0
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Middle name (optional)",
    name: "middle_name",
    onChange: (e) => setMiddleNameDraft(e.target.value),
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Last name",
    name: "last_name",
    onChange: (e) => setLastNameDraft(e.target.value),
    className: "mb-2",
    required: !0
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. kitty-hayes)",
    name: "slug",
    value: slug,
    onChange: (e) => setSlug(e.target.value),
    className: "mb-2",
    required: !0
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Person, for example", " ", `https://trad-archive.com/entities/people/${slug || "kitty-hayes"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    name: "aliases",
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Person. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Tony D, The Tradfather, Tony from the County Calamari")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    name: "description",
    className: "mb-2",
    rows: 5
  }), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: fetcher.state !== "idle"
  }, "Create"))), ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, fetcher.data.error));
}

// app/components/CreateInstrumentForm.tsx
var import_react10 = require("react");
var import_react11 = require("@remix-run/react");
function CreateInstrumentForm({ onSuccess }) {
  var _a;
  let formRef = (0, import_react10.useRef)(null), fetcher = (0, import_react11.useFetcher)();
  (0, import_react10.useEffect)(() => {
    onSuccess && fetcher.type === "done" && fetcher.data.instrument && onSuccess(fetcher.data.instrument);
  }, [fetcher, onSuccess]);
  let [nameDraft, setNameDraft] = (0, import_react10.useState)(""), [slug, setSlug] = (0, import_react10.useState)("");
  return (0, import_react10.useEffect)(() => {
    setSlug(Entity_default.cleanSlug(nameDraft));
  }, [nameDraft]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement(fetcher.Form, {
    ref: formRef,
    method: "post",
    action: "/entities/instruments?index"
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    name: "name",
    onChange: (e) => setNameDraft(e.target.value),
    className: "mb-2",
    required: !0
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. button-accordion)",
    name: "slug",
    value: slug,
    onChange: (e) => setSlug(e.target.value),
    className: "mb-2",
    required: !0
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Instrument, for example", " ", `https://trad-archive.com/entities/instruments/${slug || "button-accordion"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    name: "aliases",
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Instrument. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Bosca Ceoil, Squeezebox, Stomach Steinway")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    name: "description",
    className: "mb-2",
    rows: 5
  }), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: fetcher.state !== "idle"
  }, "Create"))), ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, fetcher.data.error));
}

// app/components/CreateNewEntities.tsx
var CreateNewEntities = ({ entityTypes, onNewEntityCreated }) => {
  let [createPersonModalIsVisible, setCreatePersonModalIsVisible] = (0, import_react12.useState)(!1), [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] = (0, import_react12.useState)(!1), onNewPersonCreated = (0, import_react12.useCallback)((person) => {
    setCreatePersonModalIsVisible(!1), onNewEntityCreated && onNewEntityCreated(person);
  }, [onNewEntityCreated]), onNewInstrumentCreated = (0, import_react12.useCallback)((instrument) => {
    setCreateInstrumentModalIsVisible(!1), onNewEntityCreated && onNewEntityCreated(instrument);
  }, [onNewEntityCreated]), shouldShowCreatePerson = typeof entityTypes > "u" || entityTypes.includes(import_client4.EntityType.Person), shouldShowCreateInstrument = typeof entityTypes > "u" || entityTypes.includes(import_client4.EntityType.Instrument);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Can't find it? Create new:", " ", shouldShowCreatePerson && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: () => setCreatePersonModalIsVisible(!0)
  }, "Person"), (!entityTypes || shouldShowCreateInstrument) && ", "), shouldShowCreateInstrument && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: () => setCreateInstrumentModalIsVisible(!0)
  }, "Instrument"))), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Person",
    isVisible: createPersonModalIsVisible,
    onClose: () => setCreatePersonModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreatePersonForm, {
    onSuccess: onNewPersonCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Instrument",
    isVisible: createInstrumentModalIsVisible,
    onClose: () => setCreateInstrumentModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreateInstrumentForm, {
    onSuccess: onNewInstrumentCreated
  })));
}, CreateNewEntities_default = CreateNewEntities;

// app/components/SearchEntities.tsx
var SearchEntities = ({
  entityTypes,
  take,
  onSelect,
  onNewEntityCreated,
  className
}) => {
  var _a, _b;
  let fetcher = (0, import_react13.useFetcher)(), searchResults = (_a = fetcher.data) == null ? void 0 : _a.results;
  function onChangeSearchTerm(e) {
    let searchTerm = e.target.value;
    if (searchTerm.length < 3)
      return;
    let params = new URLSearchParams({
      searchTerm
    });
    typeof take == "number" && params.set("take", String(take)), entityTypes && entityTypes.forEach((e2) => params.append("entityTypes", e2)), fetcher.load(`/search?${params.toString()}`);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: className ?? ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("input", {
    autoFocus: !0,
    placeholder: "Start typing...",
    onChange: (0, import_debounce.default)(onChangeSearchTerm, 300, {
      trailing: !0
    })
  }), fetcher.state !== "idle" && /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-2 right-2"
  }, /* @__PURE__ */ React.createElement(LoadingCircle_default, null))), ((_b = fetcher.data) == null ? void 0 : _b.error) && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4 ml-2"
  }, fetcher.data.error), searchResults && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("ul", null, searchResults.map((entity, index) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: index
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex flex-1 justify-between items-center text-left p-2 rounded cursor-pointer hover:bg-gray-200",
    onClick: () => onSelect(entity)
  }, /* @__PURE__ */ React.createElement("span", null, entity.name, entity.entityType === import_client5.EntityType.Tune ? ` (${entity.entityType})` : ""), /* @__PURE__ */ React.createElement("span", {
    className: "uppercase text-gray-500 text-sm"
  }, entity.entityType)), /* @__PURE__ */ React.createElement(import_react13.Link, {
    to: Entity_default.makeHrefForView(entity),
    target: "_blank",
    "aria-label": `Open ${entity.name} in New Tab`,
    className: "btn-icon w-auto"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "px-1.5"
  }, "\u2197"))))), searchResults.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "p-2 block text-gray-500"
  }, "No results"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-2 ml-2"
  }, /* @__PURE__ */ React.createElement(CreateNewEntities_default, {
    entityTypes: [import_client5.EntityType.Person, import_client5.EntityType.Instrument],
    onNewEntityCreated
  }))));
}, SearchEntities_default = SearchEntities;

// app/components/Header.tsx
var Header = ({ currentUser }) => {
  let navigate = (0, import_react16.useNavigate)(), [searchModalIsVisible, setSearchModalIsVisible] = (0, import_react14.useState)(!1), openSearchModal = (event) => {
    event.preventDefault(), setSearchModalIsVisible(!0);
  }, closeSearchModal = () => {
    setSearchModalIsVisible(!1);
  };
  (0, import_react_hotkeys_hook2.useHotkeys)("/", openSearchModal);
  let onSelectSearchResult = (0, import_react14.useCallback)((entity) => {
    setSearchModalIsVisible(!1), navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement("div", {
    className: "flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700"
  }, /* @__PURE__ */ import_react14.default.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    to: "/",
    className: "whitespace-nowrap no-underline text-yellow-200 hover:text-gray-400"
  }, "Trad Archive"), /* @__PURE__ */ import_react14.default.createElement("button", {
    className: "flex flex-row items-center whitespace-nowrap text-white hover:text-gray-400 group ml-4",
    onClick: openSearchModal
  }, /* @__PURE__ */ import_react14.default.createElement("i", {
    className: "material-icons"
  }, "search"), /* @__PURE__ */ import_react14.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Search"), /* @__PURE__ */ import_react14.default.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5"
  }, "/")), /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    to: "/entities/audio-items/random",
    className: "flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react14.default.createElement("div", {
    className: "block h-6"
  }, /* @__PURE__ */ import_react14.default.createElement("i", {
    className: "material-icons"
  }, "shuffle")), /* @__PURE__ */ import_react14.default.createElement("div", {
    className: "md:pl-2 hidden md:block"
  }, "Random"))), currentUser ? /* @__PURE__ */ import_react14.default.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    to: "/saved-items",
    className: "flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react14.default.createElement("i", {
    className: "material-icons"
  }, "bookmark"), /* @__PURE__ */ import_react14.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Saved")), /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    to: "/account",
    className: "flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ import_react14.default.createElement("i", {
    className: "material-icons"
  }, "account_circle"), /* @__PURE__ */ import_react14.default.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Account"))) : /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    to: "/login",
    className: "whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4"
  }, "Log In"), /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    to: "/signup",
    className: "btn text-current no-underline whitespace-nowrap hover:text-current ml-4"
  }, "Sign Up"))), /* @__PURE__ */ import_react14.default.createElement(Modal_default, {
    title: "Search",
    isVisible: searchModalIsVisible,
    onClose: closeSearchModal
  }, /* @__PURE__ */ import_react14.default.createElement(SearchEntities_default, {
    onSelect: onSelectSearchResult
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
    target: "_blank",
    rel: "noreferrer"
  }, "Irish Traditional Music Archive \u2197"), " ", "and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://dangurney.net",
    target: "_blank",
    rel: "noreferrer"
  }, "Dan Gurney \u2197")), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Special thanks to", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://thesession.org/",
    target: "_blank",
    rel: "noreferrer"
  }, "The Session \u2197"), " ", "for providing tune data."), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "All of the code is open source on", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/dgurns/trad-archive",
    target: "_blank",
    rel: "noreferrer"
  }, "GitHub \u2197"), ". We welcome community contributors."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/dgurns/trad-archive/discussions",
    target: "_blank",
    rel: "noreferrer"
  }, "Share feedback or report a bug \u2197")));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/root.tsx
var apolloClient = new import_client6.ApolloClient({ cache: new import_client6.InMemoryCache() }), meta = () => ({
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
  let { currentUser } = (0, import_react17.useLoaderData)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react17.Meta, null), /* @__PURE__ */ React.createElement(import_react17.Links, null)), /* @__PURE__ */ React.createElement(import_client6.ApolloProvider, {
    client: apolloClient
  }, /* @__PURE__ */ React.createElement(PlayerContextProvider_default, null, /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44"
  }, /* @__PURE__ */ React.createElement(import_react17.Outlet, null)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, {
    currentUser
  }))), /* @__PURE__ */ React.createElement(import_react17.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react17.Scripts, null), /* @__PURE__ */ React.createElement(import_react17.LiveReload, null)))));
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react17.Meta, null), /* @__PURE__ */ React.createElement(import_react17.Links, null)), /* @__PURE__ */ React.createElement(import_client6.ApolloProvider, {
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
  }, error.message)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react17.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react17.Scripts, null), /* @__PURE__ */ React.createElement(import_react17.LiveReload, null)))));
}
function CatchBoundary() {
  let { currentUser } = (0, import_react17.useLoaderData)(), caught = (0, import_react17.useCatch)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react17.Meta, null), /* @__PURE__ */ React.createElement(import_react17.Links, null)), /* @__PURE__ */ React.createElement(import_client6.ApolloProvider, {
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
  }))), /* @__PURE__ */ React.createElement(import_react17.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react17.Scripts, null), /* @__PURE__ */ React.createElement(import_react17.LiveReload, null)))));
}

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
var import_react46 = require("@remix-run/react");

// app/components/Layout.tsx
var Layout = ({ children }) => /* @__PURE__ */ React.createElement("div", {
  className: "flex flex-col justify-start items-center"
}, /* @__PURE__ */ React.createElement("div", {
  className: "w-full min-h-screen lg:max-w-5xl pb-44"
}, children)), Layout_default = Layout;

// app/components/AudioItemCard.tsx
var import_react34 = require("react"), import_react35 = require("@remix-run/react");

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

// app/components/Tags.tsx
var import_react25 = require("react"), import_react26 = require("@remix-run/react");

// app/services/Tag.ts
var import_compareAsc = __toESM(require("date-fns/compareAsc")), import_compareDesc = __toESM(require("date-fns/compareDesc")), TagSortStrategy = /* @__PURE__ */ ((TagSortStrategy2) => (TagSortStrategy2.CreatedAtThenTimeMarker = "CREATED_AT_THEN_TIME_MARKER", TagSortStrategy2.CreatedAtDesc = "CREATED_AT_DESC", TagSortStrategy2))(TagSortStrategy || {}), sortByCreatedAtThenTimeMarker = (tags) => {
  let sortedTags = [...tags ?? []];
  return sortedTags.sort((a, b) => typeof a.subjectTimeMarkerSeconds != "number" && typeof b.subjectTimeMarkerSeconds != "number" ? (0, import_compareAsc.default)(new Date(a.createdAt), new Date(b.createdAt)) : typeof a.subjectTimeMarkerSeconds != "number" && typeof b.subjectTimeMarkerSeconds == "number" ? -1 : (a.subjectTimeMarkerSeconds ?? 0) - (b.subjectTimeMarkerSeconds ?? 0)), sortedTags;
}, sortByCreatedAtDesc = (tags) => {
  let sortedTags = [...tags ?? []];
  return sortedTags.sort((a, b) => (0, import_compareDesc.default)(new Date(a.createdAt), new Date(b.createdAt))), sortedTags;
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
var import_react22 = require("react");

// app/components/CreateTagForm.tsx
var import_react20 = require("react"), import_client7 = require("@prisma/client"), import_react21 = require("@remix-run/react");

// app/components/SelectRelationship.tsx
var import_react18 = require("react"), import_react19 = require("@remix-run/react");
function SelectRelationship({
  subjectEntity,
  objectEntity,
  onSelect
}) {
  var _a;
  let fetcher = (0, import_react19.useFetcher)();
  (0, import_react18.useEffect)(() => {
    let params = new URLSearchParams({
      subjectEntityType: String(subjectEntity.entityType),
      objectEntityType: String(objectEntity.entityType)
    });
    fetcher.load(`/relationships?${params.toString()}`);
  }, [subjectEntity, objectEntity]);
  let relationshipOptions = (0, import_react18.useMemo)(() => {
    var _a2;
    return ((_a2 = fetcher.data) == null ? void 0 : _a2.relationships) ?? [];
  }, [fetcher.data]), [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react18.useState)("");
  return (0, import_react18.useEffect)(() => {
    relationshipOptions.length > 0 && setSelectedRelationshipId(relationshipOptions[0].id);
  }, [relationshipOptions]), (0, import_react18.useEffect)(() => {
    onSelect && selectedRelationshipId && onSelect(selectedRelationshipId);
  }, [onSelect, selectedRelationshipId]), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 text-gray-500"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm uppercase pr-2"
  }, subjectEntity.entityType), subjectEntity.name), fetcher.state === "loading" ? /* @__PURE__ */ React.createElement(LoadingCircle_default, null) : /* @__PURE__ */ React.createElement("select", {
    value: selectedRelationshipId,
    onChange: (event) => setSelectedRelationshipId(event.target.value)
  }, relationshipOptions.map((relationship, index) => /* @__PURE__ */ React.createElement("option", {
    value: relationship.id,
    key: index
  }, relationship.name))), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 mt-2"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm uppercase pr-2"
  }, objectEntity.entityType), objectEntity.name), ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, fetcher.data.error));
}

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
var CreateTagForm = ({ entity, onSuccess }) => {
  var _a, _b;
  let fetcher = (0, import_react21.useFetcher)(), createdTag = (_a = fetcher.data) == null ? void 0 : _a.tag, isSubmittingOrLoading = fetcher.state === "submitting" || fetcher.state === "loading";
  (0, import_react20.useEffect)(() => {
    createdTag && !isSubmittingOrLoading && onSuccess(createdTag);
  }, [createdTag, onSuccess, isSubmittingOrLoading]);
  let {
    activeAudioItem,
    playbackPositionSeconds,
    activeItemDurationSeconds
  } = usePlayerContext_default(), defaultTimeMarkerValue = (activeAudioItem == null ? void 0 : activeAudioItem.id) === entity.id ? playbackPositionSeconds : void 0, [shouldAddTimeMarker, setShouldAddTimeMarker] = (0, import_react20.useState)(!1), [timeMarkerValue, setTimeMarkerValue] = (0, import_react20.useState)(defaultTimeMarkerValue), [selectedEntity, setSelectedEntity] = (0, import_react20.useState)(), [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react20.useState)(""), [selectedInverseRelationshipId, setSelectedInverseRelationshipId] = (0, import_react20.useState)(""), onSelectEntity = (0, import_react20.useCallback)((selectedEntityFromResults) => {
    if (selectedEntityFromResults.id === entity.id)
      return window.alert("Cannot tag an entity with itself");
    setSelectedEntity(selectedEntityFromResults);
  }, [entity]), onNewEntityCreated = (0, import_react20.useCallback)((entity2) => {
    setSelectedEntity(entity2);
  }, []), onTimeMarkerValueChanged = (0, import_react20.useCallback)((newTimeMarkerValueSeconds) => {
    setShouldAddTimeMarker(!0), typeof activeItemDurationSeconds < "u" && newTimeMarkerValueSeconds >= activeItemDurationSeconds ? setTimeMarkerValue(activeItemDurationSeconds) : newTimeMarkerValueSeconds <= 0 ? setTimeMarkerValue(0) : setTimeMarkerValue(newTimeMarkerValueSeconds);
  }, [activeItemDurationSeconds]), onSelectRelationship = (0, import_react20.useCallback)((relationshipId) => {
    setSelectedRelationshipId(relationshipId);
  }, [setSelectedRelationshipId]), onSelectInverseRelationship = (0, import_react20.useCallback)((relationshipId) => {
    setSelectedInverseRelationshipId(relationshipId);
  }, [setSelectedInverseRelationshipId]), onCreateTagClicked = async () => {
    if (!(selectedEntity == null ? void 0 : selectedEntity.entityType) || !entity.entityType)
      return;
    let subjectTimeMarkerSeconds;
    shouldAddTimeMarker && typeof timeMarkerValue == "number" && (subjectTimeMarkerSeconds = timeMarkerValue), await fetcher.submit({
      relationshipId: selectedRelationshipId,
      inverseRelationshipId: selectedInverseRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
      subjectTimeMarkerSeconds: String(subjectTimeMarkerSeconds ?? "")
    }, { method: "post", action: "/tags" });
  };
  if (!selectedEntity)
    return /* @__PURE__ */ React.createElement(SearchEntities_default, {
      onSelect: onSelectEntity,
      onNewEntityCreated
    });
  let shouldShowTimeMarkerCheckbox = entity.entityType === import_client7.EntityType.AudioItem && typeof defaultTimeMarkerValue < "u";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "What is the relationship between these two entities?"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-2 pl-4"
  }, /* @__PURE__ */ React.createElement(SelectRelationship, {
    subjectEntity: entity,
    objectEntity: selectedEntity,
    onSelect: onSelectRelationship
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, "...and what is the inverse relationship?"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-2 pl-4"
  }, /* @__PURE__ */ React.createElement(SelectRelationship, {
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
    valueInSeconds: timeMarkerValue ?? 0,
    onChange: onTimeMarkerValueChanged
  })))), /* @__PURE__ */ React.createElement("button", {
    className: "btn mt-6",
    onClick: onCreateTagClicked,
    disabled: !selectedRelationshipId || fetcher.state !== "idle"
  }, "Save"), ((_b = fetcher.data) == null ? void 0 : _b.error) && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, fetcher.data.error));
}, CreateTagForm_default = CreateTagForm;

// app/components/AddTagButton.tsx
var AddTagButton = ({ entity, className, children }) => {
  let [modalIsVisible, setModalIsVisible] = (0, import_react22.useState)(!1);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: () => setModalIsVisible(!0)
  }, children ?? "+ Add Tag"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Add Tag",
    isVisible: modalIsVisible,
    onClose: () => setModalIsVisible(!1)
  }, /* @__PURE__ */ React.createElement(CreateTagForm_default, {
    entity,
    onSuccess: () => setModalIsVisible(!1)
  })));
}, AddTagButton_default = AddTagButton;

// app/components/EditTagsButton.tsx
var import_react23 = require("react");
var import_react24 = require("@remix-run/react"), EditTagsButton = ({ tags, className, children, onSuccess }) => {
  let fetcher = (0, import_react24.useFetcher)(), isSubmittingOrLoading = fetcher.state === "submitting" || fetcher.state === "loading", data = fetcher.data;
  (0, import_react23.useEffect)(() => {
    onSuccess && data && !data.error && !isSubmittingOrLoading && onSuccess();
  }, [data, isSubmittingOrLoading, onSuccess]);
  let [modalIsVisible, setModalIsVisible] = (0, import_react23.useState)(!1), onDeleteTag = (0, import_react23.useCallback)(async (id) => {
    window.confirm("Are you sure you want to delete this Tag?") && await fetcher.submit({ tagId: id }, { method: "delete", action: "/tags" });
  }, []);
  (0, import_react23.useEffect)(() => {
    (data == null ? void 0 : data.error) && window.alert(`Error deleting Tag: ${data.error}`);
  }, [data]);
  let sortedTags = (0, import_react23.useMemo)(() => Array.isArray(tags) ? Tag_default.sort(tags) : [], [tags]);
  return !sortedTags || sortedTags.length === 0 ? null : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: () => setModalIsVisible(!0)
  }, children ?? "Edit Tags"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Edit Tags",
    isVisible: modalIsVisible,
    onClose: () => setModalIsVisible(!1)
  }, sortedTags.map((tag, index) => {
    let { id, relationship, subjectTimeMarkerSeconds } = tag, objectEntity = Tag_default.getObjectEntity(tag);
    return objectEntity ? /* @__PURE__ */ React.createElement("div", {
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
      onClick: () => onDeleteTag(id),
      disabled: fetcher.state !== "idle"
    }, "Delete Tag")) : null;
  })));
}, EditTagsButton_default = EditTagsButton;

// app/components/Tags.tsx
var TagLink = ({ tag }) => {
  var _a;
  let [tooltipIsVisible, setTooltipIsVisible] = (0, import_react25.useState)(!1), [timeoutFunc, setTimeoutFunc] = (0, import_react25.useState)(), onMouseEnter = (0, import_react25.useCallback)(() => {
    setTimeoutFunc(setTimeout(() => setTooltipIsVisible(!0), 400));
  }, []), onMouseLeave = (0, import_react25.useCallback)(() => {
    timeoutFunc && (clearTimeout(timeoutFunc), setTimeoutFunc(void 0)), setTooltipIsVisible(!1);
  }, [timeoutFunc]);
  (0, import_react25.useEffect)(() => () => {
    timeoutFunc && (clearTimeout(timeoutFunc), setTimeoutFunc(void 0));
  }, [timeoutFunc]);
  let { relationship } = tag, objectEntity = Tag_default.getObjectEntity(tag), href = Entity_default.makeHrefForView(objectEntity);
  return !objectEntity || !href ? null : /* @__PURE__ */ React.createElement(import_react26.Link, {
    to: href,
    className: "block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800",
    onMouseEnter,
    onMouseLeave
  }, objectEntity.name, /* @__PURE__ */ React.createElement("div", {
    className: `${tooltipIsVisible ? "hidden md:flex" : "hidden"} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`
  }, relationship.name, " ", (_a = objectEntity.entityType) == null ? void 0 : _a.toUpperCase()));
}, Tags = ({ audioItem }) => {
  let { tagsAsSubject } = audioItem, sortedTags = (0, import_react25.useMemo)(() => {
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
    tags: tagsAsSubject
  })));
}, Tags_default = Tags;

// app/components/SaveItemButton.tsx
var import_react27 = require("@remix-run/react");
function SaveItemButton({ audioItem }) {
  let fetcher = (0, import_react27.useFetcher)();
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
var import_react30 = require("react"), import_react31 = require("@remix-run/react");

// app/components/CreateCommentForm.tsx
var import_react28 = require("@remix-run/react"), import_react29 = require("react"), CreateCommentForm = ({ parentAudioItem }) => {
  var _a;
  let formRef = (0, import_react29.useRef)(null), fetcher = (0, import_react28.useFetcher)();
  return (0, import_react29.useEffect)(() => {
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
  let { comments } = audioItem, commentsCount = comments.length, commentsRef = (0, import_react30.useRef)(), [modalIsVisible, setModalIsVisible] = (0, import_react30.useState)(!1), onViewCommentsButtonClicked = (0, import_react30.useCallback)(async () => {
    setModalIsVisible(!0);
  }, []), onCloseModal = (0, import_react30.useCallback)(() => setModalIsVisible(!1), []);
  (0, import_react30.useEffect)(() => {
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
  }, /* @__PURE__ */ React.createElement(import_react31.Link, {
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
var import_react32 = require("react"), import_react33 = require("@remix-run/react");
var TimeMarkers = ({ audioItem }) => {
  let { tagsAsSubject } = audioItem, {
    activeAudioItem,
    setActiveAudioItem,
    playbackPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default(), timeMarkersWithTags = (0, import_react32.useMemo)(() => {
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
  }, [tagsAsSubject]), onTimeMarkerClicked = (0, import_react32.useCallback)((event, timeMarker) => {
    if (event.target.id === "time-marker-tag-link") {
      event.stopPropagation();
      return;
    }
    (activeAudioItem == null ? void 0 : activeAudioItem.id) !== audioItem.id && setActiveAudioItem(audioItem), setSeekPositionSeconds(parseInt(timeMarker));
  }, [audioItem, activeAudioItem, setActiveAudioItem, setSeekPositionSeconds]), audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id, activeTimeMarker = (0, import_react32.useMemo)(() => {
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
    }, /* @__PURE__ */ React.createElement(import_react33.Link, {
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
  } = usePlayerContext_default(), audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id, tagsWithTimeMarkers = (0, import_react34.useMemo)(() => Array.isArray(tags) ? tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds == "number") : [], [tags]), onPlayPressed = (0, import_react34.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), shouldShowPositionAndDuration = audioItemIsInPlayer && typeof playbackPositionSeconds == "number" && typeof activeItemDurationSeconds == "number", positionAndDuration = `${DateTime_default.formatSecondsAsDuration(playbackPositionSeconds ?? 0)} / ${DateTime_default.formatSecondsAsDuration(activeItemDurationSeconds ?? 0)}`, isTakenDown = status === "TAKEN_DOWN";
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`
  }, showTitle && /* @__PURE__ */ React.createElement("h2", {
    className: "mb-2"
  }, /* @__PURE__ */ React.createElement(import_react35.Link, {
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
  }, "Added", createdByUser && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", "by", " ", /* @__PURE__ */ React.createElement(import_react35.Link, {
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
var import_react41 = require("react"), import_react42 = require("@remix-run/react");

// app/components/Menu.tsx
var import_react36 = __toESM(require("react")), Menu = ({ children }) => {
  let containerRef = (0, import_react36.useRef)(), [shouldOpenLeft, setShouldOpenLeft] = (0, import_react36.useState)(!0), [isOpen, setIsOpen] = (0, import_react36.useState)(!1);
  (0, import_react36.useEffect)(() => {
    let container = containerRef.current;
    if (container) {
      let { x } = container.getBoundingClientRect();
      x < 200 && setShouldOpenLeft(!1);
    }
  }, []);
  let onIconClicked = (0, import_react36.useCallback)((event) => {
    event.stopPropagation(), setIsOpen(!0);
  }, []), onBackgroundClicked = (0, import_react36.useCallback)((event) => {
    event.stopPropagation(), setIsOpen(!1);
  }, []), childrenAsArray = Array.isArray(children) ? children : [children];
  return children ? /* @__PURE__ */ import_react36.default.createElement("div", {
    className: "relative",
    ref: containerRef
  }, /* @__PURE__ */ import_react36.default.createElement("button", {
    className: "btn-secondary",
    onClick: onIconClicked,
    "aria-label": isOpen ? "Close Menu" : "Show Menu"
  }, /* @__PURE__ */ import_react36.default.createElement("i", {
    className: "material-icons"
  }, "expand_more")), isOpen && /* @__PURE__ */ import_react36.default.createElement(import_react36.default.Fragment, null, /* @__PURE__ */ import_react36.default.createElement("div", {
    className: "fixed top-0 right-0 bottom-0 left-0",
    onClick: onBackgroundClicked
  }), /* @__PURE__ */ import_react36.default.createElement("ul", {
    className: `absolute top-9 ${shouldOpenLeft ? "right-0 text-right" : "left-0 text-left"} flex flex-col bg-white rounded shadow-xl`
  }, childrenAsArray.map((child, index) => /* @__PURE__ */ import_react36.default.createElement("li", {
    className: `cursor-pointer first:rounded-t last:rounded-b text-sm text-gray-500 font-bold whitespace-nowrap hover:bg-gray-200 ${index === 0 ? "hover:rounded-t" : ""} ${index === childrenAsArray.length - 1 ? "hover:rounded-b" : ""}`,
    key: index
  }, child))))) : null;
}, Menu_default = Menu;

// app/components/RequestTakedownButton.tsx
var import_react40 = require("react"), import_client11 = require("@apollo/client");

// app/hooks/useRequireLogin.ts
var import_react38 = require("@remix-run/react");

// app/hooks/useCurrentUser.ts
var import_react37 = require("react"), import_client9 = require("@apollo/client");

// app/fragments/index.ts
var import_client8 = require("@apollo/client"), UserFragments = {
  user: import_client8.gql`
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
  currentUser: import_client8.gql`
		fragment CurrentUser on User {
			id
			role
			email
			username
			copyrightPermissionStatus
		}
	`
}, RelationshipFragments = {
  relationship: import_client8.gql`
		fragment Relationship on Relationship {
			id
			name
			subjectEntityType
			objectEntityType
		}
	`
}, TagEntityFragments = {
  tagAudioItem: import_client8.gql`
		fragment TagAudioItem on AudioItem {
			id
			entityType
			name
			slug
		}
	`,
  tagInstrument: import_client8.gql`
		fragment TagInstrument on Instrument {
			id
			entityType
			name
			slug
		}
	`,
  tagPerson: import_client8.gql`
		fragment TagPerson on Person {
			id
			entityType
			name
			slug
		}
	`,
  tagPlace: import_client8.gql`
		fragment TagPlace on Place {
			id
			entityType
			name
			slug
		}
	`,
  tagTune: import_client8.gql`
		fragment TagTune on Tune {
			id
			entityType
			name
			slug
			type
		}
	`,
  tagCollection: import_client8.gql`
		fragment TagCollection on Collection {
			id
			entityType
			name
			slug
		}
	`
}, TagFragments = {
  tag: import_client8.gql`
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
  tagForEntity: import_client8.gql`
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
  audioItem: import_client8.gql`
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
  person: import_client8.gql`
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
  instrument: import_client8.gql`
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
  place: import_client8.gql`
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
  tune: import_client8.gql`
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
  collection: import_client8.gql`
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
  comment: import_client8.gql`
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
  commentWithoutParentEntity: import_client8.gql`
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
  savedItem: import_client8.gql`
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
  takedownRequest: import_client8.gql`
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
  takedownRequestWithoutEntity: import_client8.gql`
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
  verificationRequest: import_client8.gql`
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
  submission: import_client8.gql`
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
var CURRENT_USER_QUERY = import_client9.gql`
	query CurrentUser {
		currentUser {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`, useCurrentUser = () => {
  var _a;
  let [getCurrentUser, currentUserQuery] = (0, import_client9.useLazyQuery)(CURRENT_USER_QUERY);
  return (0, import_react37.useEffect)(() => {
    getCurrentUser();
  }, [getCurrentUser]), [(_a = currentUserQuery.data) == null ? void 0 : _a.currentUser, currentUserQuery];
}, useCurrentUser_default = useCurrentUser;

// app/hooks/useRequireLogin.ts
var useRequireLogin = () => {
  let navigate = (0, import_react38.useNavigate)(), { pathname } = (0, import_react38.useLocation)(), [currentUser] = useCurrentUser_default();
  return { requireLogin: ({ redirectTo } = {}) => {
    let params = new URLSearchParams({ redirectTo: redirectTo ?? pathname });
    navigate(`/login?${params.toString()}`);
  }, currentUser };
}, useRequireLogin_default = useRequireLogin;

// app/components/CreateTakedownRequestForm.tsx
var import_react39 = require("react"), import_client10 = require("@apollo/client");
var CREATE_TAKEDOWN_REQUEST = import_client10.gql`
	mutation CreateTakedownRequest($input: CreateTakedownRequestInput!) {
		createTakedownRequest(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`, CreateTakedownRequestForm = ({ entity, onSuccess }) => {
  let defaultType = Object.keys(TakedownRequestType)[0], [type, setType] = (0, import_react39.useState)(defaultType), [message, setMessage] = (0, import_react39.useState)(""), [validationError, setValidationError] = (0, import_react39.useState)(""), [createTakedownRequest, { loading, data, error }] = (0, import_client10.useMutation)(CREATE_TAKEDOWN_REQUEST, { errorPolicy: "all" }), getLabelForType = (type2) => {
    switch (TakedownRequestType[type2]) {
      case "Performer" /* Performer */:
        return "I'm a performer in it";
      case "Copyright" /* Copyright */:
        return "I own the copyright";
      default:
        return type2;
    }
  }, onSubmitForm = (0, import_react39.useCallback)((event) => {
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
  return (0, import_react39.useEffect)(() => {
    var _a;
    ((_a = data == null ? void 0 : data.createTakedownRequest) == null ? void 0 : _a.id) && onSuccess && onSuccess(data.createTakedownRequest);
  }, [data, onSuccess]), /* @__PURE__ */ React.createElement("form", {
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
}, CreateTakedownRequestForm_default = CreateTakedownRequestForm;

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

// app/components/RequestTakedownButton.tsx
var TAKEDOWN_REQUESTS_FOR_ENTITY = import_client11.gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`, RequestTakedownButton = ({ entity, onTakedownRequestCreated }) => {
  let { currentUser, requireLogin } = useRequireLogin_default(), [modalIsVisible, setModalIsVisible] = (0, import_react40.useState)(!1), closeModal = (0, import_react40.useCallback)(() => setModalIsVisible(!1), []), { loading, data, error, refetch } = (0, import_client11.useQuery)(TAKEDOWN_REQUESTS_FOR_ENTITY, {
    variables: {
      input: {
        entityType: entity.entityType,
        entityId: entity.id
      }
    },
    skip: !modalIsVisible
  }), takedownRequests = (data == null ? void 0 : data.takedownRequestsForEntity) ?? [], onButtonClicked = (0, import_react40.useCallback)(async () => {
    if (currentUser)
      setModalIsVisible(!0);
    else {
      let redirectTo = Entity_default.makeHrefForView(entity);
      await requireLogin({ redirectTo });
    }
  }, [currentUser, entity, requireLogin]), onSuccess = (0, import_react40.useCallback)(async (takedownRequest) => {
    try {
      await refetch(), onTakedownRequestCreated && await onTakedownRequestCreated(takedownRequest);
    } catch {
    }
  }, [refetch, onTakedownRequestCreated]), modalContent = (0, import_react40.useMemo)(() => {
    let pendingTakedown = takedownRequests.find(isPendingTakedownRequest), approvedTakedown = takedownRequests.find(isApprovedTakedownRequest);
    return loading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : error ? /* @__PURE__ */ React.createElement("div", {
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
}, RequestTakedownButton_default = RequestTakedownButton;

// app/components/AudioItemCompact.tsx
var AudioItemCompact = ({ audioItem, className }) => {
  let { name, slug, description, tagsAsSubject, status } = audioItem, isTakenDown = status === "TAKEN_DOWN" /* TakenDown */, sortedTags = (0, import_react41.useMemo)(() => Tag_default.sort(tagsAsSubject), [tagsAsSubject]), { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), onPlayPressed = (0, import_react41.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), playButtonMarkup = (0, import_react41.useMemo)(() => {
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
  }, /* @__PURE__ */ React.createElement(import_react42.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, "Tags:", sortedTags.map((tag, index) => {
    let objectEntity = Tag_default.getObjectEntity(tag);
    return objectEntity ? /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: "ml-1 whitespace-pre"
    }, /* @__PURE__ */ React.createElement(import_react42.Link, {
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
    tags: audioItem.tagsAsSubject
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
var import_react43 = require("react"), import_react44 = require("@remix-run/react");
var AudioItemTextOnly = ({ audioItem, className }) => {
  let { name, slug, tagsAsSubject, status } = audioItem, isTakenDown = status === "TAKEN_DOWN" /* TakenDown */, sortedTags = (0, import_react43.useMemo)(() => Tag_default.sort(tagsAsSubject), [tagsAsSubject]), { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), onPlayPressed = (0, import_react43.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), playButtonMarkup = (0, import_react43.useMemo)(() => {
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
  }, /* @__PURE__ */ React.createElement(import_react44.Link, {
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
    }, /* @__PURE__ */ React.createElement(import_react44.Link, {
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

// app/components/Breadcrumb.tsx
var import_react45 = require("@remix-run/react"), Breadcrumb = ({ items = [], className }) => {
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
  }, href ? /* @__PURE__ */ React.createElement(import_react45.Link, {
    to: href
  }, label) : /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, label), /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-gray-500 text-base ml-1"
  }, "keyboard_arrow_right")))), /* @__PURE__ */ React.createElement("h1", null, finalItem.label));
}, Breadcrumb_default = Breadcrumb;

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
  let { audioItem } = (0, import_react46.useLoaderData)();
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
  })), /* @__PURE__ */ React.createElement(AudioItem_default, {
    audioItem,
    viewAs: "Cards" /* Cards */,
    showTitle: !1
  }));
}, slug_default = ViewAudioItemBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/index.tsx
var audio_items_exports = {};
__export(audio_items_exports, {
  default: () => audio_items_default
});
var import_react47 = require("react"), import_react48 = require("@remix-run/react"), ViewAudioItems = () => {
  let navigate = (0, import_react48.useNavigate)();
  return (0, import_react47.useEffect)(() => {
    navigate("/");
  }, [navigate]), null;
}, audio_items_default = ViewAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/$slug.tsx
var slug_exports2 = {};
__export(slug_exports2, {
  default: () => slug_default2,
  loader: () => loader4
});
var import_react53 = require("@remix-run/react");

// app/components/ViewEntityAndAudioItems.tsx
var import_react52 = require("@remix-run/react");

// app/hooks/useFilters.ts
var import_react50 = require("react"), import_react51 = require("@remix-run/react");

// app/components/Filters.tsx
var import_react49 = __toESM(require("react"));
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
  let shouldRenderPagination = typeof totalItems == "number" && typeof page == "number" && onChangePage && perPage && onChangePerPage, shouldRenderSortBy = sortBy && onChangeSortBy, shouldRenderViewAs = viewAs && onChangeViewAs, totalPages = (0, import_react49.useMemo)(() => typeof totalItems != "number" || typeof perPage > "u" || totalItems === 0 ? 1 : Math.ceil(totalItems / perPage), [totalItems, perPage]), pageSelectOptions = (0, import_react49.useMemo)(() => {
    let output = [], i = 1;
    for (; i <= totalPages; )
      output.push(/* @__PURE__ */ import_react49.default.createElement("option", {
        value: i,
        key: i
      }, i)), i++;
    return output;
  }, [totalPages]), perPageOptions = (0, import_react49.useMemo)(() => {
    let output = [];
    for (let value in PerPage)
      isNaN(Number(value)) || output.push(/* @__PURE__ */ import_react49.default.createElement("option", {
        value,
        key: value
      }, value));
    return output;
  }, []);
  return /* @__PURE__ */ import_react49.default.createElement("div", {
    className: `flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 space-y-4 space-x-0 md:space-y-0 md:space-x-5 ${className ?? ""}`
  }, shouldRenderPagination && /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "flex flex-row items-center space-x-5"
  }, /* @__PURE__ */ import_react49.default.createElement("div", null, totalItems.toLocaleString(), " Item", totalItems === 1 ? "" : "s"), /* @__PURE__ */ import_react49.default.createElement("div", null, "Page", " ", /* @__PURE__ */ import_react49.default.createElement("select", {
    value: page,
    onChange: onChangePage
  }, pageSelectOptions), totalPages ? ` of ${totalPages}` : ""), /* @__PURE__ */ import_react49.default.createElement("div", null, /* @__PURE__ */ import_react49.default.createElement("select", {
    value: perPage,
    onChange: onChangePerPage,
    className: "text-sm"
  }, perPageOptions), " ", "per page")), shouldRenderSortBy && /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "flex flex-row items-center"
  }, "Sort by", /* @__PURE__ */ import_react49.default.createElement("select", {
    className: "ml-1",
    value: sortBy,
    onChange: onChangeSortBy
  }, /* @__PURE__ */ import_react49.default.createElement("option", {
    value: "RecentlyTagged" /* RecentlyTagged */
  }, "Recently tagged"), /* @__PURE__ */ import_react49.default.createElement("option", {
    value: "RecentlyAdded" /* RecentlyAdded */
  }, "Newest"))), shouldRenderViewAs && /* @__PURE__ */ import_react49.default.createElement("div", {
    className: "hidden md:flex flex-row items-center"
  }, "View as", /* @__PURE__ */ import_react49.default.createElement("select", {
    className: "ml-1",
    value: viewAs,
    onChange: onChangeViewAs
  }, /* @__PURE__ */ import_react49.default.createElement("option", {
    value: "Cards" /* Cards */
  }, "Cards"), /* @__PURE__ */ import_react49.default.createElement("option", {
    value: "Compact" /* Compact */
  }, "Compact"), /* @__PURE__ */ import_react49.default.createElement("option", {
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
  let navigate = (0, import_react51.useNavigate)(), { pathname, search } = (0, import_react51.useLocation)(), queryParams = new URLSearchParams(search), page = parseInt(queryParams.get("page") ?? "1", 10) || defaultPage, perPage = parseInt(queryParams.get("perPage") ?? "20", 10) || defaultPerPage, sortBy = queryParams.get("sortBy") ?? defaultSortBy, viewAs = queryParams.get("viewAs") ?? defaultViewAs, updateQueryParams = (0, import_react50.useCallback)((paramsToUpdate = {}) => {
    let queryParams2 = new URLSearchParams(search);
    return Object.keys(paramsToUpdate).forEach((paramName) => {
      let value = paramsToUpdate[paramName];
      value ? queryParams2.set(paramName, value) : queryParams2.delete(paramName);
    }), navigate(`${pathname}?${queryParams2.toString()}`);
  }, [navigate, pathname, search]), onChangePage = (0, import_react50.useCallback)((event) => updateQueryParams({ page: event.target.value }), [updateQueryParams]), onChangePerPage = (0, import_react50.useCallback)((event) => updateQueryParams({ perPage: event.target.value, page: "1" }), [updateQueryParams]), onChangeSortBy = (0, import_react50.useCallback)((event) => updateQueryParams({ sortBy: event.target.value }), [updateQueryParams]), onChangeViewAs = (0, import_react50.useCallback)((event) => updateQueryParams({ viewAs: event.target.value }), [updateQueryParams]);
  return (0, import_react50.useMemo)(() => ({
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
var import_client12 = require("@prisma/client"), ViewEntityAndAudioItems = ({
  entity,
  audioItems,
  totalAudioItems,
  className
}) => {
  let { name } = entity ?? {}, { search } = (0, import_react52.useLocation)(), viewAs = new URLSearchParams(search).get("viewAs"), { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalAudioItems
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-1 flex-col ${className ?? ""}`
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
    className: "text-gray-500 text-sm flex-col space-y-2"
  }, entity.description && /* @__PURE__ */ React.createElement("p", null, entity.description), entity.aliases && /* @__PURE__ */ React.createElement("p", null, "Also known as: ", entity.aliases), entity.entityType === import_client12.EntityType.Tune && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Type: ", entity.type), /* @__PURE__ */ React.createElement("p", null, "Meter: ", entity.meter), /* @__PURE__ */ React.createElement("p", null, "Mode: ", entity.mode), /* @__PURE__ */ React.createElement("p", null, "ABC: ", entity.abc), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("a", {
    href: `https://thesession.org/tunes/${entity.theSessionTuneId}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View or Edit This Tune on The Session \u2197")))), totalAudioItems > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "sticky py-3 px-2 mt-4 -ml-2 -mr-2 mb-2 bg-gray-100 top-[48px]"
  }, /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps))), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs: viewAs ?? "Cards" /* Cards */,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  }))));
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
  let { collection, audioItems, totalAudioItems } = (0, import_react53.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: collection,
    audioItems,
    totalAudioItems
  }));
}, slug_default2 = ViewCollectionBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default,
  loader: () => loader5,
  meta: () => meta2
});
var import_react54 = require("@remix-run/react");
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
  let collections = (0, import_react54.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Collections"), collections.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Collections found"), collections.length > 0 && /* @__PURE__ */ React.createElement("ul", null, collections.map((collection, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react54.Link, {
    to: Entity_default.makeHrefForView(collection)
  }, collection.name)))));
}, collections_default = Collections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/$slug.tsx
var slug_exports3 = {};
__export(slug_exports3, {
  default: () => slug_default3,
  loader: () => loader6
});
var import_react55 = require("@remix-run/react");
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
  let { instrument, audioItems, totalAudioItems } = (0, import_react55.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: instrument,
    audioItems,
    totalAudioItems
  }));
}, slug_default3 = ViewInstrumentBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var instruments_exports = {};
__export(instruments_exports, {
  action: () => action,
  default: () => instruments_default,
  loader: () => loader7,
  meta: () => meta3
});
var import_react56 = require("@remix-run/react"), import_node4 = require("@remix-run/node");
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
var action = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(referer ? new URL(referer).pathname : "/");
  if (!userId)
    return (0, import_node4.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), name = String(formData.get("name") ?? ""), slug = String(formData.get("slug") ?? ""), description = String(formData.get("description") ?? ""), aliases = String(formData.get("aliases") ?? ""), cleanedSlug = Entity_default.cleanSlug(slug), error;
  if ((!name || !slug) && (error = "Must enter a name and slug"), error)
    return (0, import_node4.json)({ error }, { status: 400 });
  let existing = await db.instrument.findFirst({
    where: { slug: cleanedSlug }
  });
  if (existing)
    return (0, import_node4.json)({
      error: `This slug is already being used for an existing Instrument: ${existing.name}`
    }, { status: 400 });
  try {
    let instrument = await db.instrument.create({
      data: {
        name,
        slug: cleanedSlug,
        description,
        aliases,
        createdByUserId: userId,
        updatedByUserId: userId
      }
    });
    return (0, import_node4.json)({ instrument }, { status: 201 });
  } catch {
    return (0, import_node4.json)({ error: "Error creating Instrument" }, { status: 500 });
  }
}, Instruments = () => {
  let instruments = (0, import_react56.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Instruments"), instruments.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Instruments found"), instruments.length > 0 && /* @__PURE__ */ React.createElement("ul", null, instruments.map((instrument, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react56.Link, {
    to: Entity_default.makeHrefForView(instrument)
  }, instrument.name)))));
}, instruments_default = Instruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/$slug.tsx
var slug_exports4 = {};
__export(slug_exports4, {
  default: () => slug_default4,
  loader: () => loader8
});
var import_react57 = require("@remix-run/react");
async function loader8({
  params,
  request
}) {
  let { slug } = params, person = await db.person.findUnique({
    where: {
      slug
    }
  });
  if (!person)
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
            subjectPersonId: person.id
          }
        }
      },
      orderBy: audioItemsOrderBy
    }),
    db.audioItem.count({
      where: {
        tagsAsObject: {
          some: {
            subjectPersonId: person.id
          }
        }
      }
    })
  ]);
  return {
    person,
    audioItems,
    totalAudioItems
  };
}
var ViewPersonBySlug = () => {
  let { person, audioItems, totalAudioItems } = (0, import_react57.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: person,
    audioItems,
    totalAudioItems
  }));
}, slug_default4 = ViewPersonBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var people_exports = {};
__export(people_exports, {
  action: () => action2,
  default: () => people_default,
  loader: () => loader9,
  meta: () => meta4
});
var import_react58 = require("@remix-run/react"), import_node5 = require("@remix-run/node");
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
var action2 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(referer ? new URL(referer).pathname : "/");
  if (!userId)
    return (0, import_node5.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), firstName = String(formData.get("first_name") ?? ""), middleName = String(formData.get("middle_name") ?? ""), lastName = String(formData.get("last_name") ?? ""), slug = String(formData.get("slug") ?? ""), description = String(formData.get("description") ?? ""), aliases = String(formData.get("aliases") ?? ""), name = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`, cleanedSlug = Entity_default.cleanSlug(slug), error;
  if ((!firstName || !lastName || !slug) && (error = "Must enter first name, last name, and slug"), error)
    return (0, import_node5.json)({ error }, { status: 400 });
  let existing = await db.person.findFirst({ where: { slug: cleanedSlug } });
  if (existing)
    return (0, import_node5.json)({
      error: `This slug is already being used for an existing Person: ${existing.name}`
    }, { status: 400 });
  try {
    let person = await db.person.create({
      data: {
        firstName,
        middleName,
        lastName,
        name,
        slug: cleanedSlug,
        description,
        aliases,
        createdByUserId: userId,
        updatedByUserId: userId
      }
    });
    return (0, import_node5.json)({ person }, { status: 201 });
  } catch {
    return (0, import_node5.json)({ error: "Error creating Person" }, { status: 500 });
  }
}, People = () => {
  let people = (0, import_react58.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "People"), people.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No People found"), people.length > 0 && /* @__PURE__ */ React.createElement("ul", null, people.map((person, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react58.Link, {
    to: Entity_default.makeHrefForView(person)
  }, person.name)))));
}, people_default = People;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/$slug.tsx
var slug_exports5 = {};
__export(slug_exports5, {
  default: () => slug_default5,
  loader: () => loader10
});
var import_react59 = require("@remix-run/react");
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
  let { place, audioItems, totalAudioItems } = (0, import_react59.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: place,
    audioItems,
    totalAudioItems
  }));
}, slug_default5 = ViewPlaceBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var places_exports = {};
__export(places_exports, {
  default: () => places_default,
  loader: () => loader11,
  meta: () => meta5
});
var import_react60 = require("@remix-run/react");
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
  let places = (0, import_react60.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Places"), places.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Places found"), places.length > 0 && /* @__PURE__ */ React.createElement("ul", null, places.map((place, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react60.Link, {
    to: Entity_default.makeHrefForView(place)
  }, place.name)))));
}, places_default = Places;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/$slug.tsx
var slug_exports6 = {};
__export(slug_exports6, {
  default: () => slug_default6,
  loader: () => loader12
});
var import_react61 = require("@remix-run/react");
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
  let { tune, audioItems, totalAudioItems } = (0, import_react61.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: tune,
    audioItems,
    totalAudioItems
  }));
}, slug_default6 = ViewTuneBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/index.tsx
var tunes_exports = {};
__export(tunes_exports, {
  default: () => tunes_default,
  loader: () => loader13,
  meta: () => meta6
});
var import_react62 = require("@remix-run/react");
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
  let { tunes, totalTunes } = (0, import_react62.useLoaderData)(), { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalTunes,
    defaultPerPage: PER_PAGE
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", null, "Tunes"), /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    sortBy: void 0,
    viewAs: void 0,
    className: "sticky left-0 right-0 py-3 bg-gray-100 top-[48px] mb-2"
  })), tunes.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Tunes found"), tunes.length > 0 && /* @__PURE__ */ React.createElement("ul", null, tunes.map((tune, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react62.Link, {
    to: Entity_default.makeHrefForView(tune)
  }, tune.name)))));
}, tunes_default = Tunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/choose-new-password.tsx
var choose_new_password_exports = {};
__export(choose_new_password_exports, {
  action: () => action3,
  default: () => ChooseNewPassword,
  loader: () => loader14
});
var import_node6 = require("@remix-run/node"), import_react63 = require("@remix-run/react"), import_bcryptjs = __toESM(require("bcryptjs")), import_isAfter = __toESM(require("date-fns/isAfter"));
var loader14 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), validationError = session.get("validationError") || null, error = null, params = new URL(request.url).searchParams, userEmail = params.get("userEmail") ?? "", tokenUnhashed = params.get("tokenUnhashed") ?? "", user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user || !user.autoLoginTokenHashed || !user.autoLoginTokenExpiry)
    return (0, import_node6.redirect)("/reset-password");
  let tokenIsMatch = await import_bcryptjs.default.compare(tokenUnhashed, user.autoLoginTokenHashed), expiryIsValid = (0, import_isAfter.default)(new Date(user.autoLoginTokenExpiry), new Date());
  return (!tokenIsMatch || !expiryIsValid) && (error = "Reset password link is invalid or expired. Please request another one."), (0, import_node6.json)({ validationError, error }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action3 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), { searchParams } = new URL(request.url), formData = await request.formData(), email = String(formData.get("email") ?? ""), password = String(formData.get("password") ?? ""), passwordConfirm = String(formData.get("password_confirm") ?? "");
  if (password !== passwordConfirm)
    return session.flash("validationError", "Passwords don't match"), (0, import_node6.redirect)(`/choose-new-password?${searchParams.toString()}`, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  let user = await db.user.findUnique({ where: { email } });
  if (!user)
    return (0, import_node6.redirect)("/reset-password");
  let newPasswordHashed = import_bcryptjs.default.hashSync(password, 10);
  return await db.user.update({
    where: { email },
    data: {
      passwordHashed: newPasswordHashed,
      autoLoginTokenHashed: null,
      autoLoginTokenExpiry: null
    }
  }), session.set("userId", user.id), (0, import_node6.redirect)("/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function ChooseNewPassword() {
  let transition = (0, import_react63.useTransition)(), { error, validationError } = (0, import_react63.useLoaderData)(), [searchParams] = (0, import_react63.useSearchParams)(), email = searchParams.get("userEmail") ?? "";
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Choose a new password"), error ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", {
    className: "text-red-600 mb-6"
  }, error), /* @__PURE__ */ React.createElement(import_react63.Link, {
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

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/reset-password.tsx
var reset_password_exports = {};
__export(reset_password_exports, {
  action: () => action4,
  default: () => ResetPassword,
  loader: () => loader15
});
var import_node7 = require("@remix-run/node"), import_react64 = require("@remix-run/react"), import_mail = __toESM(require("@sendgrid/mail")), import_bcryptjs2 = __toESM(require("bcryptjs")), import_uuid = require("uuid"), import_addMinutes = __toESM(require("date-fns/addMinutes"));
var loader15 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), error = session.get("error") || null, confirmation = session.get("confirmation") || null;
  return (0, import_node7.json)({ error, confirmation }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action4 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), formData = await request.formData(), email = String(formData.get("email") ?? ""), user = await db.user.findUnique({ where: { email } });
  if (!user)
    return session.flash("error", "Could not find a user with that email"), (0, import_node7.redirect)("/reset-password", {
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
  }), url = `${new URL(request.url).origin}/choose-new-password?${params.toString()}`, data = {
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
  return await import_mail.default.send(data), session.flash("confirmation", "Check your email for a link to reset your password"), (0, import_node7.redirect)("/reset-password", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function ResetPassword() {
  let transition = (0, import_react64.useTransition)(), { error, confirmation } = (0, import_react64.useLoaderData)();
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
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-6"
  }, error), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(import_react64.Link, {
    to: "/login"
  }, "Go Back")))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/index.tsx
var account_exports = {};
__export(account_exports, {
  default: () => AccountHome,
  loader: () => loader16
});
var import_react65 = require("@remix-run/react"), import_node8 = require("@remix-run/node");
var loader16 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), currentUserId = String(session.get("userId") ?? ""), currentUser = await db.user.findUnique({
    where: { id: currentUserId }
  });
  if (!currentUser) {
    let params = new URLSearchParams();
    return params.set("redirectTo", "/account"), (0, import_node8.redirect)(`/login?${params.toString()}`);
  }
  return (0, import_node8.json)({ currentUser });
};
function AccountHome() {
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Account"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col space-y-2"
  }, /* @__PURE__ */ React.createElement(import_react65.Link, {
    to: "/reset-password"
  }, "Change Password"), /* @__PURE__ */ React.createElement(import_react65.Link, {
    to: "/logout"
  }, "Log Out ")));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/relationships.tsx
var relationships_exports = {};
__export(relationships_exports, {
  loader: () => loader17
});
var import_node9 = require("@remix-run/node");
var loader17 = async ({ request }) => {
  let url = new URL(request.url), subjectEntityType = url.searchParams.get("subjectEntityType"), objectEntityType = url.searchParams.get("objectEntityType");
  if (!subjectEntityType || !objectEntityType)
    return (0, import_node9.json)({ error: "Must specify subject entity type and object entity type" }, { status: 400 });
  let relationships = await db.relationship.findMany({
    where: {
      subjectEntityType,
      objectEntityType
    }
  });
  return (0, import_node9.json)({ relationships }, { status: 200 });
};

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/saved-items.tsx
var saved_items_exports = {};
__export(saved_items_exports, {
  action: () => action5,
  default: () => SavedItems,
  loader: () => loader18
});
var import_react66 = require("@remix-run/react"), import_node10 = require("@remix-run/node");
var loader18 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { pathname, searchParams } = new URL(request.url), redirectParams = new URLSearchParams({
    redirectTo: pathname
  });
  if (!userId)
    return (0, import_node10.redirect)(`/login?${redirectParams.toString()}`);
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
  return (0, import_node10.json)({ audioItems });
}, action5 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectParams = new URLSearchParams({
    redirectTo: referer ? new URL(referer).pathname : "/"
  });
  if (!userId)
    return (0, import_node10.redirect)(`/login?${redirectParams.toString()}`);
  let formData = await request.formData(), audioItemId = String(formData.get("audioItemId") ?? ""), existing = await db.savedItem.findUnique({
    where: {
      userId_audioItemId: {
        userId,
        audioItemId
      }
    }
  });
  return existing ? await db.savedItem.delete({ where: { id: existing.id } }) : await db.savedItem.create({ data: { userId, audioItemId } }), (0, import_node10.json)({ ok: !0 }, { status: 200 });
};
function SavedItems() {
  let { audioItems } = (0, import_react66.useLoaderData)(), { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
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
  }, "Nothing saved yet - try browsing some", " ", /* @__PURE__ */ React.createElement(import_react66.Link, {
    to: "/"
  }, "Audio Items"), "!"), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  }))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => id_default,
  loader: () => loader19
});
var import_react67 = require("@remix-run/react"), import_node11 = require("@remix-run/node");
var loader19 = async ({ params }) => {
  let user = await db.user.findUnique({ where: { id: params.id } });
  if (!user)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find a user with this ID"
    });
  return (0, import_node11.json)({ user });
}, ViewUserById = () => {
  let { user } = (0, import_react67.useLoaderData)(), { username, createdAt } = user;
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
}, id_default = ViewUserById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/comments.tsx
var comments_exports = {};
__export(comments_exports, {
  action: () => action6
});
var import_node12 = require("@remix-run/node");
var action6 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(referer ? new URL(referer).pathname : "/");
  if (!userId)
    return (0, import_node12.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), text = String(formData.get("text") ?? ""), parentAudioItemId = String(formData.get("parentAudioItemId") ?? ""), error;
  if (text ? parentAudioItemId || (error = "Parent audio item ID not defined") : error = "Comment cannot be empty", error)
    return (0, import_node12.json)({ error }, { status: 400 });
  let comment = await db.comment.create({
    data: {
      text,
      parentAudioItemId,
      createdByUserId: userId
    }
  });
  return (0, import_node12.json)({ comment }, { status: 201 });
};

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  loader: () => loader20
});
var import_node13 = require("@remix-run/node");
var loader20 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  return (0, import_node13.redirect)("/login", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/search.tsx
var search_exports = {};
__export(search_exports, {
  loader: () => loader21
});
var import_client13 = require("@prisma/client"), import_node14 = require("@remix-run/node");
var loader21 = async ({ request }) => {
  let url = new URL(request.url), searchTerm = url.searchParams.get("searchTerm") || "", entityTypes = url.searchParams.getAll("entityTypes");
  entityTypes.length === 0 && (entityTypes = [
    import_client13.EntityType.Person,
    import_client13.EntityType.Instrument,
    import_client13.EntityType.Place,
    import_client13.EntityType.Tune,
    import_client13.EntityType.Collection,
    import_client13.EntityType.AudioItem
  ]);
  let take = Number(url.searchParams.get("take") ?? 24);
  if (searchTerm.length < 3)
    return (0, import_node14.json)({ error: "Must include a search term of at least 3 letters" }, { status: 400 });
  let cleanedSearchTerm = searchTerm.toLowerCase(), takeFromEach = Math.round(take / entityTypes.length), personQuery = db.person.findMany({
    include: {
      createdByUser: !0
    },
    where: {
      OR: [
        {
          name: {
            contains: cleanedSearchTerm
          }
        },
        { aliases: { contains: cleanedSearchTerm } },
        { description: { contains: cleanedSearchTerm } }
      ]
    },
    take: takeFromEach
  }), instrumentQuery = db.instrument.findMany({
    include: {
      createdByUser: !0
    },
    where: {
      OR: [
        {
          name: {
            contains: cleanedSearchTerm
          }
        },
        { aliases: { contains: cleanedSearchTerm } },
        { description: { contains: cleanedSearchTerm } }
      ]
    },
    take: takeFromEach
  }), placeQuery = db.place.findMany({
    include: {
      createdByUser: !0
    },
    where: {
      OR: [
        {
          name: {
            contains: cleanedSearchTerm
          }
        },
        { aliases: { contains: cleanedSearchTerm } },
        { description: { contains: cleanedSearchTerm } }
      ]
    },
    take: takeFromEach
  }), tuneQuery = db.tune.findMany({
    include: {
      createdByUser: !0
    },
    where: {
      OR: [
        {
          name: {
            contains: cleanedSearchTerm
          }
        },
        { aliases: { contains: cleanedSearchTerm } },
        { theSessionTuneId: { equals: cleanedSearchTerm } }
      ]
    },
    take: takeFromEach
  }), collectionQuery = db.collection.findMany({
    include: {
      createdByUser: !0
    },
    where: {
      OR: [
        {
          name: {
            contains: cleanedSearchTerm
          }
        },
        { aliases: { contains: cleanedSearchTerm } },
        { description: { contains: cleanedSearchTerm } }
      ]
    },
    take: takeFromEach
  }), audioItemQuery = db.audioItem.findMany({
    include: {
      createdByUser: !0
    },
    where: {
      OR: [
        {
          name: {
            contains: cleanedSearchTerm
          }
        },
        { aliases: { contains: cleanedSearchTerm } },
        { description: { contains: cleanedSearchTerm } }
      ]
    },
    take: takeFromEach
  }), queryPromises = [];
  for (let entityType of entityTypes)
    switch (entityType) {
      case import_client13.EntityType.Person:
        queryPromises.push(personQuery);
        break;
      case import_client13.EntityType.Tune:
        queryPromises.push(tuneQuery);
        break;
      case import_client13.EntityType.Instrument:
        queryPromises.push(instrumentQuery);
        break;
      case import_client13.EntityType.Place:
        queryPromises.push(placeQuery);
        break;
      case import_client13.EntityType.Collection:
        queryPromises.push(collectionQuery);
        break;
      case import_client13.EntityType.AudioItem:
        queryPromises.push(audioItemQuery);
        break;
      default:
        break;
    }
  let results = (await Promise.all(queryPromises)).reduce((prevVal, curVal) => [...prevVal, ...curVal], []);
  return (0, import_node14.json)({ results }, { status: 200 });
};

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action7,
  default: () => SignUp,
  loader: () => loader22
});
var import_react68 = require("@remix-run/react"), import_bcryptjs3 = __toESM(require("bcryptjs"));
var import_node15 = require("@remix-run/node");
var loader22 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (session.has("userId"))
    return (0, import_node15.redirect)(redirectTo || "/");
  let data = { error: session.get("error") };
  return (0, import_node15.json)(data, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action7 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo"), formData = await request.formData(), email = String(formData.get("email") ?? ""), fullName = String(formData.get("full_name") ?? ""), password = String(formData.get("password") ?? ""), passwordConfirm = String(formData.get("password_confirm") ?? "");
  if (await db.user.findUnique({ where: { email } }))
    return session.flash("error", "There is already a user with this email address. Try logging in?"), (0, import_node15.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email))
    return session.flash("error", "Email is not valid"), (0, import_node15.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(fullName.split(" ").length >= 2))
    return session.flash("error", "Please enter your full name"), (0, import_node15.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(password === passwordConfirm))
    return session.flash("error", "Passwords don't match"), (0, import_node15.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(password.length >= 8))
    return session.flash("error", "Password must be at least 8 characters long"), (0, import_node15.redirect)("/signup", {
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
  return session.set("userId", newUser.id), (0, import_node15.redirect)(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function SignUp() {
  let { error } = (0, import_react68.useLoaderData)(), { state } = (0, import_react68.useTransition)(), { search } = (0, import_react68.useLocation)(), redirectTo = new URLSearchParams(search).get("redirectTo"), logInLinkQueryParams = new URLSearchParams(redirectTo ? { redirectTo } : void 0);
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
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-6"
  }, error), /* @__PURE__ */ React.createElement("div", null, "Already have an account?", " ", /* @__PURE__ */ React.createElement(import_react68.Link, {
    to: `/login?${logInLinkQueryParams.toString()}`
  }, "Log in"))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Home,
  loader: () => loader23
});
var import_react69 = require("react"), import_react70 = require("@remix-run/react");

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
  src: "/images/logo-square.png",
  className: "absolute top-5 -left-1 lg:-left-8 w-12 lg:w-20 -rotate-12",
  alt: "Logo"
}), /* @__PURE__ */ React.createElement("strong", null, "Welcome!"), /* @__PURE__ */ React.createElement("br", null), "Trad Archive is an open source experiment by the Irish Traditional Music Archive and Dan Gurney.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "You can...", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("ul", {
  className: "list-disc list-inside"
}, /* @__PURE__ */ React.createElement("li", null, "Listen to previously unreleased archival recordings"), /* @__PURE__ */ React.createElement("li", null, "Help by tagging each recording with People, Places, Tunes, Instruments, and Collections"), /* @__PURE__ */ React.createElement("li", null, "Save favorites to listen later")), /* @__PURE__ */ React.createElement("button", {
  className: "absolute top-2 right-2 btn-icon",
  onClick: onClose
}, /* @__PURE__ */ React.createElement("i", {
  className: "material-icons"
}, "close"))), ProjectIntro_default = ProjectIntro;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
async function loader23({
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
  } = (0, import_react70.useLoaderData)(), { search } = (0, import_react70.useLocation)(), viewAs = new URLSearchParams(search).get("viewAs") ?? "Cards" /* Cards */, { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: numAudioItemsAllTime
  }), [shouldShowIntro, setShouldShowIntro] = (0, import_react69.useState)(!1);
  (0, import_react69.useEffect)(() => {
    LocalStorage_default.getItem("SHOULD_SHOW_INTRO") !== "false" && setShouldShowIntro(!0);
  }, []);
  let onCloseIntro = (0, import_react69.useCallback)(() => {
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
    className: "sticky left-0 right-0 py-3 px-2 -ml-2 -mr-2 mt-1 mb-2 bg-gray-100 top-[48px]"
  })), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "Browse"), /* @__PURE__ */ React.createElement(import_react70.Link, {
    to: "/entities/people",
    className: "mb-2"
  }, "People"), /* @__PURE__ */ React.createElement(import_react70.Link, {
    to: "/entities/tunes",
    className: "mb-2"
  }, "Tunes"), /* @__PURE__ */ React.createElement(import_react70.Link, {
    to: "/entities/instruments",
    className: "mb-2"
  }, "Instruments"), /* @__PURE__ */ React.createElement(import_react70.Link, {
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
    }, /* @__PURE__ */ React.createElement(import_react70.Link, {
      to: Entity_default.makeHrefForView(collection)
    }, collection.name)) : null;
  }), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Features + Fixes"), /* @__PURE__ */ React.createElement("a", {
    className: "mb-2",
    href: "https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc",
    target: "_blank",
    rel: "noreferrer"
  }, "View on GitHub \u2197"), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Comments"), comments.map((comment, index) => {
    let { createdByUser, parentAudioItem, text } = comment;
    return !createdByUser || !parentAudioItem ? null : /* @__PURE__ */ React.createElement("div", {
      className: "mb-4 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: " mb-1"
    }, /* @__PURE__ */ React.createElement(import_react70.Link, {
      to: `/users/${createdByUser.id}`
    }, createdByUser.username), " commented on ", /* @__PURE__ */ React.createElement(import_react70.Link, {
      to: Entity_default.makeHrefForView(parentAudioItem)
    }, parentAudioItem.name), ":"), /* @__PURE__ */ React.createElement("div", {
      className: "whitespace-pre-line text-sm"
    }, text));
  }))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action8,
  default: () => Login,
  loader: () => loader24
});
var import_react71 = require("@remix-run/react"), import_node16 = require("@remix-run/node"), import_bcryptjs4 = __toESM(require("bcryptjs"));
var loader24 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (session.has("userId"))
    return (0, import_node16.redirect)(redirectTo || "/");
  let data = { error: session.get("error") };
  return (0, import_node16.json)(data, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action8 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo"), formData = await request.formData(), email = String(formData.get("email") ?? ""), password = String(formData.get("password") ?? ""), user = await db.user.findUnique({ where: { email } });
  return user ? user.passwordHashed ? import_bcryptjs4.default.compareSync(password, user.passwordHashed) ? (session.set("userId", user.id), (0, import_node16.redirect)(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "Incorrect password"), (0, import_node16.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "This user does not have a password. TODO: Redirect to /reset-password page"), (0, import_node16.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "Could not find a user with this email"), (0, import_node16.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  }));
};
function Login() {
  let { error } = (0, import_react71.useLoaderData)(), transition = (0, import_react71.useTransition)(), { search } = (0, import_react71.useLocation)(), redirectTo = new URLSearchParams(search).get("redirectTo"), signUpLinkQueryParams = new URLSearchParams(redirectTo ? { redirectTo } : void 0);
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
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-6"
  }, error), /* @__PURE__ */ React.createElement("p", {
    className: "mb-2"
  }, "Don't have an account yet?", " ", /* @__PURE__ */ React.createElement(import_react71.Link, {
    to: `/signup?${signUpLinkQueryParams.toString()}`
  }, "Sign Up")), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement(import_react71.Link, {
    to: "/reset-password"
  }, "Reset Password"))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  action: () => action9
});
var import_client14 = require("@prisma/client"), import_node17 = require("@remix-run/node");
var action9 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(referer ? new URL(referer).pathname : "/");
  if (!userId)
    return (0, import_node17.redirect)(`/login?redirectTo=${redirectTo}`);
  if (request.method === "POST") {
    let formData = await request.formData(), relationshipId = String(formData.get("relationshipId") ?? ""), inverseRelationshipId = String(formData.get("inverseRelationshipId") ?? ""), subjectEntityType = String(formData.get("subjectEntityType") ?? ""), subjectEntityId = String(formData.get("subjectEntityId") ?? ""), objectEntityType = String(formData.get("objectEntityType") ?? ""), objectEntityId = String(formData.get("objectEntityId") ?? ""), rawSubjectTimeMarkerSeconds = String(formData.get("subjectTimeMarkerSeconds") ?? ""), subjectTimeMarkerSeconds = rawSubjectTimeMarkerSeconds === "" ? void 0 : Number(rawSubjectTimeMarkerSeconds);
    if (!relationshipId || !inverseRelationshipId || !subjectEntityType || !subjectEntityId || !objectEntityType || !objectEntityId)
      return (0, import_node17.json)({ error: "Missing required fields for creating Tag" }, { status: 400 });
    let [existing, existingInverse] = await Promise.all([
      db.tag.findFirst({
        where: {
          [`subject${subjectEntityType}Id`]: subjectEntityId,
          [`object${objectEntityType}Id`]: objectEntityId,
          relationshipId,
          subjectTimeMarkerSeconds: subjectEntityType === import_client14.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
        }
      }),
      db.tag.findFirst({
        where: {
          [`subject${objectEntityType}Id`]: objectEntityId,
          [`object${subjectEntityType}Id`]: subjectEntityId,
          relationshipId: inverseRelationshipId,
          subjectTimeMarkerSeconds: objectEntityType === import_client14.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
        }
      })
    ]);
    if (existing && existingInverse)
      return (0, import_node17.json)({ error: "This Tag has already been created" }, { status: 400 });
    let tag;
    existing || (tag = await db.tag.create({
      data: {
        [`subject${subjectEntityType}Id`]: subjectEntityId,
        [`object${objectEntityType}Id`]: objectEntityId,
        relationshipId,
        subjectTimeMarkerSeconds: subjectEntityType === import_client14.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
      }
    }));
    let tagInverse;
    return existingInverse || (tagInverse = await db.tag.create({
      data: {
        [`subject${objectEntityType}Id`]: objectEntityId,
        [`object${subjectEntityType}Id`]: subjectEntityId,
        relationshipId: inverseRelationshipId,
        subjectTimeMarkerSeconds: objectEntityType === import_client14.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
      }
    })), (0, import_node17.json)({ tag, tagInverse }, { status: 201 });
  }
  if (request.method === "DELETE") {
    let formData = await request.formData(), tagId = String(formData.get("tagId") ?? "");
    return await db.tag.delete({ where: { id: tagId } }), (0, import_node17.json)({}, { status: 200 });
  }
  return null;
};

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "afac1a98", entry: { module: "/build/entry.client-4RBPKCCT.js", imports: ["/build/_shared/chunk-LNAVFCVS.js", "/build/_shared/chunk-SDLOU3B7.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-LWACVU37.js", imports: ["/build/_shared/chunk-ZLRWE4NK.js", "/build/_shared/chunk-VYEI3UUW.js", "/build/_shared/chunk-QSZCPMIV.js", "/build/_shared/chunk-WO5ZZCZ6.js", "/build/_shared/chunk-PQJWRTRS.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/account/index": { id: "routes/account/index", parentId: "root", path: "account", index: !0, caseSensitive: void 0, module: "/build/routes/account/index-2LI7FCI7.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/choose-new-password": { id: "routes/choose-new-password", parentId: "root", path: "choose-new-password", index: void 0, caseSensitive: void 0, module: "/build/routes/choose-new-password-ZWW7EULN.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/comments": { id: "routes/comments", parentId: "root", path: "comments", index: void 0, caseSensitive: void 0, module: "/build/routes/comments-5P3ESY7C.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/$slug": { id: "routes/entities/audio-items/$slug", parentId: "root", path: "entities/audio-items/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/$slug-BEXMXUQV.js", imports: ["/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/index": { id: "routes/entities/audio-items/index", parentId: "root", path: "entities/audio-items", index: !0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/index-IWNJVVXR.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/random": { id: "routes/entities/audio-items/random", parentId: "root", path: "entities/audio-items/random", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/random-5WJTYHAU.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/$slug": { id: "routes/entities/collections/$slug", parentId: "root", path: "entities/collections/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/$slug-AE7A7D5U.js", imports: ["/build/_shared/chunk-VNU55E4K.js", "/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/index": { id: "routes/entities/collections/index", parentId: "root", path: "entities/collections", index: !0, caseSensitive: void 0, module: "/build/routes/entities/collections/index-RXX7JP2X.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/$slug": { id: "routes/entities/instruments/$slug", parentId: "root", path: "entities/instruments/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/$slug-35HRZEZ5.js", imports: ["/build/_shared/chunk-VNU55E4K.js", "/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/index": { id: "routes/entities/instruments/index", parentId: "root", path: "entities/instruments", index: !0, caseSensitive: void 0, module: "/build/routes/entities/instruments/index-2Z3QNAPZ.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/$slug": { id: "routes/entities/people/$slug", parentId: "root", path: "entities/people/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/$slug-OIERGJ6Z.js", imports: ["/build/_shared/chunk-VNU55E4K.js", "/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/index": { id: "routes/entities/people/index", parentId: "root", path: "entities/people", index: !0, caseSensitive: void 0, module: "/build/routes/entities/people/index-DCVIFE6Z.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/$slug": { id: "routes/entities/places/$slug", parentId: "root", path: "entities/places/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/$slug-NJ5TBW2N.js", imports: ["/build/_shared/chunk-VNU55E4K.js", "/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/index": { id: "routes/entities/places/index", parentId: "root", path: "entities/places", index: !0, caseSensitive: void 0, module: "/build/routes/entities/places/index-BZBNBSK5.js", imports: ["/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/$slug": { id: "routes/entities/tunes/$slug", parentId: "root", path: "entities/tunes/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/tunes/$slug-3HCET5AB.js", imports: ["/build/_shared/chunk-VNU55E4K.js", "/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/index": { id: "routes/entities/tunes/index", parentId: "root", path: "entities/tunes", index: !0, caseSensitive: void 0, module: "/build/routes/entities/tunes/index-3VXIRVYT.js", imports: ["/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-SHKC3ID5.js", imports: ["/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-KBZKWI5M.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-HAGAUS4Y.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/relationships": { id: "routes/relationships", parentId: "root", path: "relationships", index: void 0, caseSensitive: void 0, module: "/build/routes/relationships-EANS43YW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/reset-password": { id: "routes/reset-password", parentId: "root", path: "reset-password", index: void 0, caseSensitive: void 0, module: "/build/routes/reset-password-NZFGXCTV.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/saved-items": { id: "routes/saved-items", parentId: "root", path: "saved-items", index: void 0, caseSensitive: void 0, module: "/build/routes/saved-items-NEEZTS6S.js", imports: ["/build/_shared/chunk-FUKF6ZE7.js", "/build/_shared/chunk-KBUTNNJY.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/search": { id: "routes/search", parentId: "root", path: "search", index: void 0, caseSensitive: void 0, module: "/build/routes/search-4SNRFG52.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-QBGHHBL2.js", imports: ["/build/_shared/chunk-K64X6GTJ.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/tags": { id: "routes/tags", parentId: "root", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/tags-SQZRGNIB.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/users/$id": { id: "routes/users/$id", parentId: "root", path: "users/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/users/$id-CD5AOPP7.js", imports: ["/build/_shared/chunk-WPQ6M4VW.js", "/build/_shared/chunk-IAJZOXUY.js", "/build/_shared/chunk-5PUKH5YP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-AFAC1A98.js" };

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
  "routes/entities/instruments/index": {
    id: "routes/entities/instruments/index",
    parentId: "root",
    path: "entities/instruments",
    index: !0,
    caseSensitive: void 0,
    module: instruments_exports
  },
  "routes/entities/people/$slug": {
    id: "routes/entities/people/$slug",
    parentId: "root",
    path: "entities/people/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports4
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
  "routes/relationships": {
    id: "routes/relationships",
    parentId: "root",
    path: "relationships",
    index: void 0,
    caseSensitive: void 0,
    module: relationships_exports
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
    module: id_exports
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
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: search_exports
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
  },
  "routes/tags": {
    id: "routes/tags",
    parentId: "root",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports
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
