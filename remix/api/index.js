var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx
var entry_server_react_stream_exports = {};
__export(entry_server_react_stream_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx",
          lineNumber: 39,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx",
          lineNumber: 81,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  headers: () => headers,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node3 = require("@remix-run/node"), import_react16 = require("@remix-run/react");

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-S666JKK3.css";

// app/sessions.server.ts
var import_node2 = require("@remix-run/node"), { getSession, commitSession, destroySession } = (0, import_node2.createCookieSessionStorage)({
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
var import_client2 = require("@prisma/client"), PerPage = /* @__PURE__ */ ((PerPage2) => (PerPage2[PerPage2.Ten = 10] = "Ten", PerPage2[PerPage2.Twenty = 20] = "Twenty", PerPage2[PerPage2.Fifty = 50] = "Fifty", PerPage2[PerPage2.Hundred = 100] = "Hundred", PerPage2))(PerPage || {});
var audioItemWithRelations = import_client2.Prisma.validator()({
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
function isAudioItem(entity) {
  return entity.entityType === "AudioItem" /* AudioItem */;
}

// app/components/AudioPlayer.tsx
var import_react3 = require("react");
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), AudioPlayer = ({ item }) => {
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
  }, [seekPositionSeconds]), /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    "audio",
    {
      ref: audioPlayerRef,
      id: "audio",
      preload: "metadata",
      autoPlay: !0,
      controls: !0,
      controlsList: "nodownload",
      className: "w-full outline-none",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("source", { src: item.urlSource, type: "audio/mpeg" }, void 0, !1, {
        fileName: "app/components/AudioPlayer.tsx",
        lineNumber: 62,
        columnNumber: 4
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/AudioPlayer.tsx",
      lineNumber: 53,
      columnNumber: 3
    },
    this
  );
}, AudioPlayer_default = AudioPlayer;

// app/components/Player.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), Player = () => {
  let { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), itemHref = (0, import_react4.useMemo)(() => isAudioItem(activeAudioItem) ? `/entities/audio-items/${activeAudioItem.slug}` : window.location.href, [activeAudioItem]);
  return activeAudioItem ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col align-center justify-center px-4 pb-4 pt-2 bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-row justify-between mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "leading-8", children: [
        "Now playing:",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "text-gray-500", children: activeAudioItem.name }, void 0, !1, {
          fileName: "app/components/Player.tsx",
          lineNumber: 28,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Player.tsx",
        lineNumber: 26,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-row items-center ml-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react5.Link, { to: itemHref, className: "whitespace-nowrap", children: "View" }, void 0, !1, {
          fileName: "app/components/Player.tsx",
          lineNumber: 31,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          "button",
          {
            className: "btn-icon flex ml-2 md:ml-4",
            onClick: () => setActiveAudioItem(null),
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("i", { className: "material-icons", children: "close" }, void 0, !1, {
              fileName: "app/components/Player.tsx",
              lineNumber: 38,
              columnNumber: 7
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/Player.tsx",
            lineNumber: 34,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Player.tsx",
        lineNumber: 30,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Player.tsx",
      lineNumber: 25,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(AudioPlayer_default, { item: activeAudioItem }, activeAudioItem.id, !1, {
      fileName: "app/components/Player.tsx",
      lineNumber: 43,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Player.tsx",
    lineNumber: 24,
    columnNumber: 3
  }, this) : null;
}, Player_default = Player;

// app/components/PlayerContextProvider.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), PlayerContext = import_react6.default.createContext(null);
function PlayerContextProvider({ children }) {
  let [activeAudioItem, setActiveAudioItem] = (0, import_react6.useState)(null), [activeItemDurationSeconds, setActiveItemDurationSeconds] = (0, import_react6.useState)(void 0), [playbackPositionSeconds, setPlaybackPositionSeconds] = (0, import_react6.useState)(void 0), [seekPositionSeconds, setSeekPositionSeconds] = (0, import_react6.useState)(void 0);
  return (0, import_react6.useEffect)(() => {
    activeAudioItem || (setActiveItemDurationSeconds(void 0), setPlaybackPositionSeconds(void 0), setSeekPositionSeconds(void 0));
  }, [activeAudioItem]), /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    PlayerContext.Provider,
    {
      value: {
        activeAudioItem,
        setActiveAudioItem,
        activeItemDurationSeconds,
        setActiveItemDurationSeconds,
        playbackPositionSeconds,
        setPlaybackPositionSeconds,
        seekPositionSeconds,
        setSeekPositionSeconds
      },
      children: [
        children,
        activeAudioItem && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "div",
          {
            className: "fixed bottom-0 left-0 right-0",
            style: {
              boxShadow: "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)"
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Player_default, {}, void 0, !1, {
              fileName: "app/components/PlayerContextProvider.tsx",
              lineNumber: 73,
              columnNumber: 6
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/PlayerContextProvider.tsx",
            lineNumber: 66,
            columnNumber: 5
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/PlayerContextProvider.tsx",
      lineNumber: 50,
      columnNumber: 3
    },
    this
  );
}
var PlayerContextProvider_default = PlayerContextProvider;

// app/components/Header.tsx
var import_react13 = require("react"), import_react14 = require("@remix-run/react"), import_react15 = require("@remix-run/react"), import_react_hotkeys_hook2 = require("react-hotkeys-hook");

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
var import_react_hotkeys_hook = require("react-hotkeys-hook"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), Modal = ({
  children,
  isVisible = !1,
  onClose,
  title,
  className
}) => ((0, import_react_hotkeys_hook.useHotkeys)(
  "esc",
  onClose,
  {
    enableOnTags: ["INPUT", "TEXTAREA"]
  },
  [onClose]
), isVisible ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
  "div",
  {
    className: `${isVisible ? "visible" : "hidden"} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`,
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "div",
        {
          className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
          onClick: onClose
        },
        void 0,
        !1,
        {
          fileName: "app/components/Modal.tsx",
          lineNumber: 39,
          columnNumber: 4
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "div",
        {
          className: `bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-[90vh] overflow-y-auto overflow-x-hidden md:max-w-xl ${className ?? ""}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-row justify-between items-center mb-4 text-black", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { children: title }, void 0, !1, {
                fileName: "app/components/Modal.tsx",
                lineNumber: 50,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                "button",
                {
                  className: "btn-icon flex flex-row items-center justify-center ml-4 mb-0.5",
                  onClick: onClose,
                  "aria-label": "Close",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-0.5 mr-3", children: "ESC" }, void 0, !1, {
                      fileName: "app/components/Modal.tsx",
                      lineNumber: 57,
                      columnNumber: 7
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("i", { className: "material-icons", children: "close" }, void 0, !1, {
                      fileName: "app/components/Modal.tsx",
                      lineNumber: 60,
                      columnNumber: 7
                    }, this)
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/components/Modal.tsx",
                  lineNumber: 52,
                  columnNumber: 6
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/Modal.tsx",
              lineNumber: 49,
              columnNumber: 5
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-base text-black font-normal whitespace-normal text-left cursor-auto", children }, void 0, !1, {
              fileName: "app/components/Modal.tsx",
              lineNumber: 65,
              columnNumber: 5
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/Modal.tsx",
          lineNumber: 44,
          columnNumber: 4
        },
        this
      )
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/Modal.tsx",
    lineNumber: 34,
    columnNumber: 3
  },
  this
) : null), Modal_default = Modal;

// app/components/SearchEntities.tsx
var import_react12 = require("@remix-run/react"), import_debounce = __toESM(require("lodash/debounce")), import_client5 = require("@prisma/client");

// app/components/LoadingCircle.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), LoadingCircle = ({ className }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "h-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
  "i",
  {
    className: `material-icons animate-spin text-gray-500 ${className ?? ""}`,
    children: "scatter_plot"
  },
  void 0,
  !1,
  {
    fileName: "app/components/LoadingCircle.tsx",
    lineNumber: 7,
    columnNumber: 3
  },
  this
) }, void 0, !1, {
  fileName: "app/components/LoadingCircle.tsx",
  lineNumber: 6,
  columnNumber: 2
}, this), LoadingCircle_default = LoadingCircle;

// app/components/CreateNewEntities.tsx
var import_react11 = require("react"), import_client4 = require("@prisma/client");

// app/components/CreatePersonForm.tsx
var import_react7 = require("react");
var import_react8 = require("@remix-run/react"), import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function CreatePersonForm({ onSuccess }) {
  var _a;
  let formRef = (0, import_react7.useRef)(null), fetcher = (0, import_react8.useFetcher)();
  (0, import_react7.useEffect)(() => {
    onSuccess && fetcher.type === "done" && fetcher.data.person && onSuccess(fetcher.data.person);
  }, [fetcher, onSuccess]);
  let [firstNameDraft, setFirstNameDraft] = (0, import_react7.useState)(""), [middleNameDraft, setMiddleNameDraft] = (0, import_react7.useState)(""), [lastNameDraft, setLastNameDraft] = (0, import_react7.useState)(""), [slug, setSlug] = (0, import_react7.useState)("");
  return (0, import_react7.useEffect)(() => {
    let proposedSlug = "";
    firstNameDraft && (proposedSlug = firstNameDraft), middleNameDraft && (proposedSlug = `${proposedSlug}-${middleNameDraft}`), lastNameDraft && (proposedSlug = `${proposedSlug}-${lastNameDraft}`), setSlug(Entity_default.cleanSlug(proposedSlug));
  }, [firstNameDraft, middleNameDraft, lastNameDraft]), /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_jsx_dev_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex flex-col align-start", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      fetcher.Form,
      {
        ref: formRef,
        method: "POST",
        action: "/entities/people?index",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "input",
            {
              placeholder: "First name",
              name: "first_name",
              onChange: (e) => setFirstNameDraft(e.target.value),
              className: "mb-2",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 47,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "input",
            {
              placeholder: "Middle name (optional)",
              name: "middle_name",
              onChange: (e) => setMiddleNameDraft(e.target.value),
              className: "mb-2"
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 54,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "input",
            {
              placeholder: "Last name",
              name: "last_name",
              onChange: (e) => setLastNameDraft(e.target.value),
              className: "mb-2",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 60,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "input",
            {
              placeholder: "URL slug (ie. kitty-hayes)",
              name: "slug",
              value: slug,
              onChange: (e) => setSlug(e.target.value),
              className: "mb-2",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 67,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "text-sm text-gray-400 mb-2 ml-2", children: [
            "This will be used for the URL of this Person, for example",
            " ",
            `https://trad-archive.com/entities/people/${slug || "kitty-hayes"}`
          ] }, void 0, !0, {
            fileName: "app/components/CreatePersonForm.tsx",
            lineNumber: 75,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("input", { placeholder: "Aliases", name: "aliases", className: "mb-2" }, void 0, !1, {
            fileName: "app/components/CreatePersonForm.tsx",
            lineNumber: 81,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "text-sm text-gray-400 mb-2 ml-2", children: [
            "A list of comma-separated aliases for this Person. For example:",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("em", { children: "Tony D, The Tradfather, Tony from the County Calamari" }, void 0, !1, {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 84,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/CreatePersonForm.tsx",
            lineNumber: 82,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "textarea",
            {
              placeholder: "Description",
              name: "description",
              className: "mb-2",
              rows: 5
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 86,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "btn mb-4 w-auto",
              disabled: fetcher.state !== "idle",
              children: "Create"
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreatePersonForm.tsx",
              lineNumber: 92,
              columnNumber: 6
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/CreatePersonForm.tsx",
        lineNumber: 42,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/CreatePersonForm.tsx",
      lineNumber: 41,
      columnNumber: 4
    }, this),
    ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "text-red-600", children: fetcher.data.error }, void 0, !1, {
      fileName: "app/components/CreatePersonForm.tsx",
      lineNumber: 103,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/CreatePersonForm.tsx",
    lineNumber: 40,
    columnNumber: 3
  }, this);
}

// app/components/CreateInstrumentForm.tsx
var import_react9 = require("react");
var import_react10 = require("@remix-run/react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function CreateInstrumentForm({ onSuccess }) {
  var _a;
  let formRef = (0, import_react9.useRef)(null), fetcher = (0, import_react10.useFetcher)();
  (0, import_react9.useEffect)(() => {
    onSuccess && fetcher.type === "done" && fetcher.data.instrument && onSuccess(fetcher.data.instrument);
  }, [fetcher, onSuccess]);
  let [nameDraft, setNameDraft] = (0, import_react9.useState)(""), [slug, setSlug] = (0, import_react9.useState)("");
  return (0, import_react9.useEffect)(() => {
    setSlug(Entity_default.cleanSlug(nameDraft));
  }, [nameDraft]), /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_jsx_dev_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col align-start", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
      fetcher.Form,
      {
        ref: formRef,
        method: "POST",
        action: "/entities/instruments?index",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            "input",
            {
              placeholder: "Name",
              name: "name",
              onChange: (e) => setNameDraft(e.target.value),
              className: "mb-2",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreateInstrumentForm.tsx",
              lineNumber: 35,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            "input",
            {
              placeholder: "URL slug (ie. button-accordion)",
              name: "slug",
              value: slug,
              onChange: (e) => setSlug(e.target.value),
              className: "mb-2",
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreateInstrumentForm.tsx",
              lineNumber: 42,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "text-sm text-gray-400 mb-2 ml-2", children: [
            "This will be used for the URL of this Instrument, for example",
            " ",
            `https://trad-archive.com/entities/instruments/${slug || "button-accordion"}`
          ] }, void 0, !0, {
            fileName: "app/components/CreateInstrumentForm.tsx",
            lineNumber: 50,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("input", { placeholder: "Aliases", name: "aliases", className: "mb-2" }, void 0, !1, {
            fileName: "app/components/CreateInstrumentForm.tsx",
            lineNumber: 56,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "text-sm text-gray-400 mb-2 ml-2", children: [
            "A list of comma-separated aliases for this Instrument. For example:",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("em", { children: "Bosca Ceoil, Squeezebox, Stomach Steinway" }, void 0, !1, {
              fileName: "app/components/CreateInstrumentForm.tsx",
              lineNumber: 59,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/CreateInstrumentForm.tsx",
            lineNumber: 57,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            "textarea",
            {
              placeholder: "Description",
              name: "description",
              className: "mb-2",
              rows: 5
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreateInstrumentForm.tsx",
              lineNumber: 61,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "btn mb-4 w-auto",
              disabled: fetcher.state !== "idle",
              children: "Create"
            },
            void 0,
            !1,
            {
              fileName: "app/components/CreateInstrumentForm.tsx",
              lineNumber: 67,
              columnNumber: 6
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/CreateInstrumentForm.tsx",
        lineNumber: 30,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/CreateInstrumentForm.tsx",
      lineNumber: 29,
      columnNumber: 4
    }, this),
    ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "text-red-600", children: fetcher.data.error }, void 0, !1, {
      fileName: "app/components/CreateInstrumentForm.tsx",
      lineNumber: 78,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/CreateInstrumentForm.tsx",
    lineNumber: 28,
    columnNumber: 3
  }, this);
}

// app/components/CreateNewEntities.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), CreateNewEntities = ({ entityTypes, onNewEntityCreated }) => {
  let [createPersonModalIsVisible, setCreatePersonModalIsVisible] = (0, import_react11.useState)(!1), [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] = (0, import_react11.useState)(!1), onNewPersonCreated = (0, import_react11.useCallback)(
    (person) => {
      setCreatePersonModalIsVisible(!1), onNewEntityCreated && onNewEntityCreated(person);
    },
    [onNewEntityCreated]
  ), onNewInstrumentCreated = (0, import_react11.useCallback)(
    (instrument) => {
      setCreateInstrumentModalIsVisible(!1), onNewEntityCreated && onNewEntityCreated(instrument);
    },
    [onNewEntityCreated]
  ), shouldShowCreatePerson = typeof entityTypes > "u" || entityTypes.includes(import_client4.EntityType.Person), shouldShowCreateInstrument = typeof entityTypes > "u" || entityTypes.includes(import_client4.EntityType.Instrument);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "text-gray-500", children: [
      "Can't find it? Create new:",
      " ",
      shouldShowCreatePerson && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "button",
          {
            className: "btn-text",
            onClick: () => setCreatePersonModalIsVisible(!0),
            children: "Person"
          },
          void 0,
          !1,
          {
            fileName: "app/components/CreateNewEntities.tsx",
            lineNumber: 56,
            columnNumber: 7
          },
          this
        ),
        (!entityTypes || shouldShowCreateInstrument) && ", "
      ] }, void 0, !0, {
        fileName: "app/components/CreateNewEntities.tsx",
        lineNumber: 55,
        columnNumber: 6
      }, this),
      shouldShowCreateInstrument && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
        "button",
        {
          className: "btn-text",
          onClick: () => setCreateInstrumentModalIsVisible(!0),
          children: "Instrument"
        },
        void 0,
        !1,
        {
          fileName: "app/components/CreateNewEntities.tsx",
          lineNumber: 67,
          columnNumber: 7
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/CreateNewEntities.tsx",
        lineNumber: 66,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/CreateNewEntities.tsx",
      lineNumber: 52,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      Modal_default,
      {
        title: "Create New Person",
        isVisible: createPersonModalIsVisible,
        onClose: () => setCreatePersonModalIsVisible(!1),
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(CreatePersonForm, { onSuccess: onNewPersonCreated }, void 0, !1, {
          fileName: "app/components/CreateNewEntities.tsx",
          lineNumber: 82,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateNewEntities.tsx",
        lineNumber: 77,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      Modal_default,
      {
        title: "Create New Instrument",
        isVisible: createInstrumentModalIsVisible,
        onClose: () => setCreateInstrumentModalIsVisible(!1),
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(CreateInstrumentForm, { onSuccess: onNewInstrumentCreated }, void 0, !1, {
          fileName: "app/components/CreateNewEntities.tsx",
          lineNumber: 90,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateNewEntities.tsx",
        lineNumber: 85,
        columnNumber: 4
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/CreateNewEntities.tsx",
    lineNumber: 51,
    columnNumber: 3
  }, this);
}, CreateNewEntities_default = CreateNewEntities;

// app/components/SearchEntities.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), SearchEntities = ({
  entityTypes,
  take,
  onSelect,
  onNewEntityCreated,
  className
}) => {
  var _a, _b;
  let fetcher = (0, import_react12.useFetcher)(), searchResults = (_a = fetcher.data) == null ? void 0 : _a.results;
  function onChangeSearchTerm(e) {
    let searchTerm = e.target.value;
    if (searchTerm.length < 3)
      return;
    let params = new URLSearchParams({
      searchTerm
    });
    typeof take == "number" && params.set("take", String(take)), entityTypes && entityTypes.forEach((e2) => params.append("entityTypes", e2)), fetcher.load(`/search?${params.toString()}`);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: className ?? "", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        "input",
        {
          autoFocus: !0,
          placeholder: "Start typing...",
          onChange: (0, import_debounce.default)(onChangeSearchTerm, 300, {
            trailing: !0
          })
        },
        void 0,
        !1,
        {
          fileName: "app/components/SearchEntities.tsx",
          lineNumber: 49,
          columnNumber: 5
        },
        this
      ),
      fetcher.state !== "idle" && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(LoadingCircle_default, {}, void 0, !1, {
        fileName: "app/components/SearchEntities.tsx",
        lineNumber: 58,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/SearchEntities.tsx",
        lineNumber: 57,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/SearchEntities.tsx",
      lineNumber: 48,
      columnNumber: 4
    }, this),
    ((_b = fetcher.data) == null ? void 0 : _b.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "text-red-600 mt-4 ml-2", children: fetcher.data.error }, void 0, !1, {
      fileName: "app/components/SearchEntities.tsx",
      lineNumber: 64,
      columnNumber: 5
    }, this),
    searchResults && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("ul", { children: searchResults.map((entity, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("li", { className: "flex flex-row", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          "button",
          {
            className: "flex flex-1 justify-between items-center text-left p-2 rounded cursor-pointer hover:bg-gray-200",
            onClick: () => onSelect(entity),
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { children: [
                entity.name,
                entity.entityType === import_client5.EntityType.Tune ? ` (${entity.entityType})` : ""
              ] }, void 0, !0, {
                fileName: "app/components/SearchEntities.tsx",
                lineNumber: 76,
                columnNumber: 10
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "uppercase text-gray-500 text-sm", children: entity.entityType }, void 0, !1, {
                fileName: "app/components/SearchEntities.tsx",
                lineNumber: 82,
                columnNumber: 10
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/SearchEntities.tsx",
            lineNumber: 72,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          import_react12.Link,
          {
            to: Entity_default.makeHrefForView(entity),
            target: "_blank",
            "aria-label": `Open ${entity.name} in New Tab`,
            className: "btn-icon w-auto",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "px-1.5", children: "\u2197" }, void 0, !1, {
              fileName: "app/components/SearchEntities.tsx",
              lineNumber: 93,
              columnNumber: 10
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/SearchEntities.tsx",
            lineNumber: 87,
            columnNumber: 9
          },
          this
        )
      ] }, index, !0, {
        fileName: "app/components/SearchEntities.tsx",
        lineNumber: 71,
        columnNumber: 8
      }, this)) }, void 0, !1, {
        fileName: "app/components/SearchEntities.tsx",
        lineNumber: 69,
        columnNumber: 6
      }, this),
      searchResults.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "p-2 block text-gray-500", children: "No results" }, void 0, !1, {
        fileName: "app/components/SearchEntities.tsx",
        lineNumber: 100,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "mt-2 ml-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        CreateNewEntities_default,
        {
          entityTypes: [import_client5.EntityType.Person, import_client5.EntityType.Instrument],
          onNewEntityCreated
        },
        void 0,
        !1,
        {
          fileName: "app/components/SearchEntities.tsx",
          lineNumber: 104,
          columnNumber: 7
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/SearchEntities.tsx",
        lineNumber: 103,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/SearchEntities.tsx",
      lineNumber: 68,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/SearchEntities.tsx",
    lineNumber: 47,
    columnNumber: 3
  }, this);
}, SearchEntities_default = SearchEntities;

// app/components/Header.tsx
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), Header = ({ currentUser }) => {
  let navigate = (0, import_react15.useNavigate)(), [searchModalIsVisible, setSearchModalIsVisible] = (0, import_react13.useState)(!1), openSearchModal = (event) => {
    event.preventDefault(), setSearchModalIsVisible(!0);
  }, closeSearchModal = () => {
    setSearchModalIsVisible(!1);
  };
  (0, import_react_hotkeys_hook2.useHotkeys)("/", openSearchModal);
  let onSelectSearchResult = (0, import_react13.useCallback)(
    (entity) => {
      setSearchModalIsVisible(!1), navigate(Entity_default.makeHrefForView(entity));
    },
    [navigate]
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-row", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react14.Link,
          {
            to: "/",
            className: "whitespace-nowrap no-underline text-yellow-200 hover:text-gray-400",
            children: "Trad Archive"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 46,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          "button",
          {
            className: "flex flex-row items-center whitespace-nowrap text-white hover:text-gray-400 group ml-4",
            onClick: openSearchModal,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("i", { className: "material-icons", children: "search" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 56,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "hidden md:block md:pl-1", children: "Search" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 57,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5", children: "/" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 58,
                columnNumber: 7
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 52,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react14.Link,
          {
            to: "/entities/audio-items/random",
            className: "flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "block h-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("i", { className: "material-icons", children: "shuffle" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 65,
                columnNumber: 8
              }, this) }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 64,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "md:pl-2 hidden md:block", children: "Random" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 67,
                columnNumber: 7
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 60,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 45,
        columnNumber: 5
      }, this),
      currentUser ? /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "flex flex-row items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react14.Link,
          {
            to: "/saved-items",
            className: "flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("i", { className: "material-icons", children: "bookmark" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 92,
                columnNumber: 8
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "hidden md:block md:pl-1", children: "Saved" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 93,
                columnNumber: 8
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 88,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react14.Link,
          {
            to: "/account",
            className: "flex flex-row items-center whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("i", { className: "material-icons", children: "account_circle" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 99,
                columnNumber: 8
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "hidden md:block md:pl-1", children: "Account" }, void 0, !1, {
                fileName: "app/components/Header.tsx",
                lineNumber: 100,
                columnNumber: 8
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 95,
            columnNumber: 7
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 87,
        columnNumber: 6
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react14.Link,
          {
            to: "/login",
            className: "whitespace-nowrap text-white no-underline hover:text-gray-400 ml-4",
            children: "Log In"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 73,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react14.Link,
          {
            to: "/signup",
            className: "btn text-current no-underline whitespace-nowrap hover:text-current ml-4",
            children: "Sign Up"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Header.tsx",
            lineNumber: 79,
            columnNumber: 7
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Header.tsx",
        lineNumber: 72,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Header.tsx",
      lineNumber: 44,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      Modal_default,
      {
        title: "Search",
        isVisible: searchModalIsVisible,
        onClose: closeSearchModal,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(SearchEntities_default, { onSelect: onSelectSearchResult }, void 0, !1, {
          fileName: "app/components/Header.tsx",
          lineNumber: 111,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/Header.tsx",
        lineNumber: 106,
        columnNumber: 4
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/Header.tsx",
    lineNumber: 43,
    columnNumber: 3
  }, this);
}, Header_default = Header;

// app/components/Footer.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex flex-col items-start w-full p-4 pt-7 pb-24 bg-gray-900 text-gray-100 space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
      "This project is a collaboration between the",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("a", { href: "https://www.itma.ie/", target: "_blank", rel: "noreferrer", children: "Irish Traditional Music Archive \u2197" }, void 0, !1, {
        fileName: "app/components/Footer.tsx",
        lineNumber: 6,
        columnNumber: 5
      }, this),
      " ",
      "and",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("a", { href: "https://dangurney.net", target: "_blank", rel: "noreferrer", children: "Dan Gurney \u2197" }, void 0, !1, {
        fileName: "app/components/Footer.tsx",
        lineNumber: 10,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 4,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
      "Special thanks to",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("a", { href: "https://thesession.org/", target: "_blank", rel: "noreferrer", children: "The Session \u2197" }, void 0, !1, {
        fileName: "app/components/Footer.tsx",
        lineNumber: 17,
        columnNumber: 5
      }, this),
      " ",
      "for providing tune data."
    ] }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 15,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
      "All of the code is open source on",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        "a",
        {
          href: "https://github.com/dgurns/trad-archive",
          target: "_blank",
          rel: "noreferrer",
          children: "GitHub \u2197"
        },
        void 0,
        !1,
        {
          fileName: "app/components/Footer.tsx",
          lineNumber: 25,
          columnNumber: 5
        },
        this
      ),
      ". We welcome community contributors."
    ] }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 23,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("a", { href: "mailto:dan@dangurney.net", target: "_blank", rel: "noreferrer", children: "Share feedback or request a takedown \u2197" }, void 0, !1, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 36,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 35,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 3,
    columnNumber: 3
  }, this);
}

// app/root.tsx
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), meta = () => [{ title: "Trad Archive" }];
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
function headers() {
  return {
    "Cache-Control": "private, max-age=0, must-revalidate"
  };
}
var loader = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), currentUser = null;
  return userId && (currentUser = await db.user.findUnique({ where: { id: userId } })), (0, import_node3.json)({ currentUser });
};
function App() {
  let { currentUser } = (0, import_react16.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 95,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 96,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 97,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 98,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 94,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(PlayerContextProvider_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("body", { className: "bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col w-full relative pt-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col justify-start items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Outlet, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 105,
            columnNumber: 9
          }, this) }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 104,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Footer, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 107,
            columnNumber: 8
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 103,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "fixed top-0 right-0 left-0", id: "header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Header_default, { currentUser }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 112,
          columnNumber: 8
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 111,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 102,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 116,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 117,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 118,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 101,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 100,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 93,
    columnNumber: 3
  }, this);
}
function ErrorBoundary() {
  let error = (0, import_react16.useRouteError)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 131,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 132,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 130,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(PlayerContextProvider_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("body", { className: "bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col w-full relative pt-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-col justify-start items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", { children: "Oops! There was an error." }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 139,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-red-500 mt-2", children: error.message }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 140,
              columnNumber: 9
            }, this)
          ] }, void 0, !0, {
            fileName: "app/root.tsx",
            lineNumber: 138,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Footer, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 142,
            columnNumber: 8
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 137,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "fixed top-0 right-0 left-0", id: "header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(Header_default, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 147,
          columnNumber: 8
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 136,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 151,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 152,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react16.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 153,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 135,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 134,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 129,
    columnNumber: 3
  }, this);
}

// app/routes/entities/audio-items/random.tsx
var random_exports = {};
__export(random_exports, {
  loader: () => loader2
});
var import_node4 = require("@remix-run/node");
async function loader2() {
  let totalAudioItems = await db.audioItem.count(), randomSkip = Math.round(Math.random() * (totalAudioItems - 1)), [audioItem] = await db.audioItem.findMany({
    take: 1,
    skip: randomSkip
  });
  return (0, import_node4.redirect)(`/entities/audio-items/${audioItem.slug}`);
}

// app/routes/entities/audio-items/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => slug_default,
  loader: () => loader3
});
var import_react40 = require("@remix-run/react");

// app/components/Layout.tsx
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), Layout = ({ children }) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex flex-col justify-start items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "w-full min-h-screen lg:max-w-5xl pb-44", children }, void 0, !1, {
  fileName: "app/components/Layout.tsx",
  lineNumber: 8,
  columnNumber: 4
}, this) }, void 0, !1, {
  fileName: "app/components/Layout.tsx",
  lineNumber: 7,
  columnNumber: 3
}, this), Layout_default = Layout;

// app/components/AudioItemCard.tsx
var import_react33 = require("react"), import_react34 = require("@remix-run/react");

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
  return (0, import_isToday.default)(dateObject) ? (0, import_format.default)(
    dateObject,
    `'${shouldCapitalize ? "T" : "t"}oday at' h:mm a`
  ) : (0, import_isYesterday.default)(dateObject) ? (0, import_format.default)(
    dateObject,
    `'${shouldCapitalize ? "Y" : "y"}esterday at' h:mm a`
  ) : (0, import_format.default)(new Date(date), "LLLL d, y 'at' h:mm a");
}, DateTimeService = {
  formatSecondsAsDuration,
  formatDateYear,
  formatDateYearTime
}, DateTime_default = DateTimeService;

// app/components/Tags.tsx
var import_react24 = require("react"), import_react25 = require("@remix-run/react");

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
var import_react21 = require("react");

// app/components/CreateTagForm.tsx
var import_react19 = require("react"), import_client6 = require("@prisma/client"), import_react20 = require("@remix-run/react");

// app/components/SelectRelationship.tsx
var import_react17 = require("react"), import_react18 = require("@remix-run/react");
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
function SelectRelationship({
  subjectEntity,
  objectEntity,
  onSelect
}) {
  var _a;
  let fetcher = (0, import_react18.useFetcher)();
  (0, import_react17.useEffect)(() => {
    let params = new URLSearchParams({
      subjectEntityType: String(subjectEntity.entityType),
      objectEntityType: String(objectEntity.entityType)
    });
    fetcher.load(`/relationships?${params.toString()}`);
  }, [subjectEntity, objectEntity]);
  let relationshipOptions = (0, import_react17.useMemo)(
    () => {
      var _a2;
      return ((_a2 = fetcher.data) == null ? void 0 : _a2.relationships) ?? [];
    },
    [fetcher.data]
  ), [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react17.useState)("");
  return (0, import_react17.useEffect)(() => {
    relationshipOptions.length > 0 && setSelectedRelationshipId(relationshipOptions[0].id);
  }, [relationshipOptions]), (0, import_react17.useEffect)(() => {
    onSelect && selectedRelationshipId && onSelect(selectedRelationshipId);
  }, [onSelect, selectedRelationshipId]), /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "mb-2 text-gray-500", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", { className: "text-sm uppercase pr-2", children: subjectEntity.entityType }, void 0, !1, {
        fileName: "app/components/SelectRelationship.tsx",
        lineNumber: 51,
        columnNumber: 5
      }, this),
      subjectEntity.name
    ] }, void 0, !0, {
      fileName: "app/components/SelectRelationship.tsx",
      lineNumber: 50,
      columnNumber: 4
    }, this),
    fetcher.state === "loading" ? /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(LoadingCircle_default, {}, void 0, !1, {
      fileName: "app/components/SelectRelationship.tsx",
      lineNumber: 58,
      columnNumber: 5
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
      "select",
      {
        value: selectedRelationshipId,
        onChange: (event) => setSelectedRelationshipId(event.target.value),
        children: relationshipOptions.map((relationship, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("option", { value: relationship.id, children: relationship.name }, index, !1, {
          fileName: "app/components/SelectRelationship.tsx",
          lineNumber: 65,
          columnNumber: 7
        }, this))
      },
      void 0,
      !1,
      {
        fileName: "app/components/SelectRelationship.tsx",
        lineNumber: 60,
        columnNumber: 5
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "text-gray-500 mt-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", { className: "text-sm uppercase pr-2", children: objectEntity.entityType }, void 0, !1, {
        fileName: "app/components/SelectRelationship.tsx",
        lineNumber: 73,
        columnNumber: 5
      }, this),
      objectEntity.name
    ] }, void 0, !0, {
      fileName: "app/components/SelectRelationship.tsx",
      lineNumber: 72,
      columnNumber: 4
    }, this),
    ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "text-red-600 mt-4", children: fetcher.data.error }, void 0, !1, {
      fileName: "app/components/SelectRelationship.tsx",
      lineNumber: 80,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/SelectRelationship.tsx",
    lineNumber: 49,
    columnNumber: 3
  }, this);
}

// app/components/TimestampInput.tsx
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), TimestampInput = ({ valueInSeconds, onChange, className }) => {
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: `flex flex-row items-center ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      "input",
      {
        type: "number",
        id: "hrs",
        className: "flex max-w-[50px]",
        value: hrs || "",
        placeholder: "0",
        onChange: onChangeHrs
      },
      void 0,
      !1,
      {
        fileName: "app/components/TimestampInput.tsx",
        lineNumber: 32,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("label", { htmlFor: "hours", className: "px-2", children: [
      "hr",
      hrs !== 1 && "s"
    ] }, void 0, !0, {
      fileName: "app/components/TimestampInput.tsx",
      lineNumber: 40,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      "input",
      {
        type: "number",
        id: "mins",
        className: "flex max-w-[55px]",
        value: mins || "",
        placeholder: "0",
        onChange: onChangeMins
      },
      void 0,
      !1,
      {
        fileName: "app/components/TimestampInput.tsx",
        lineNumber: 43,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("label", { htmlFor: "mins", className: "px-2", children: [
      "min",
      mins !== 1 ? "s" : ""
    ] }, void 0, !0, {
      fileName: "app/components/TimestampInput.tsx",
      lineNumber: 51,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      "input",
      {
        type: "number",
        id: "secs",
        className: "flex max-w-[55px]",
        value: secs || "",
        placeholder: "0",
        onChange: onChangeSecs
      },
      void 0,
      !1,
      {
        fileName: "app/components/TimestampInput.tsx",
        lineNumber: 54,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("label", { htmlFor: "secs", className: "px-2", children: [
      "sec",
      secs !== 1 ? "s" : ""
    ] }, void 0, !0, {
      fileName: "app/components/TimestampInput.tsx",
      lineNumber: 62,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/TimestampInput.tsx",
    lineNumber: 31,
    columnNumber: 3
  }, this);
}, TimestampInput_default = TimestampInput;

// app/components/CreateTagForm.tsx
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime"), CreateTagForm = ({ entity, onSuccess }) => {
  var _a, _b;
  let fetcher = (0, import_react20.useFetcher)(), createdTag = (_a = fetcher.data) == null ? void 0 : _a.tag, isSubmittingOrLoading = fetcher.state === "submitting" || fetcher.state === "loading";
  (0, import_react19.useEffect)(() => {
    createdTag && !isSubmittingOrLoading && onSuccess(createdTag);
  }, [createdTag, onSuccess, isSubmittingOrLoading]);
  let {
    activeAudioItem,
    playbackPositionSeconds,
    activeItemDurationSeconds
  } = usePlayerContext_default(), defaultTimeMarkerValue = (activeAudioItem == null ? void 0 : activeAudioItem.id) === entity.id ? playbackPositionSeconds : void 0, [shouldAddTimeMarker, setShouldAddTimeMarker] = (0, import_react19.useState)(!1), [timeMarkerValue, setTimeMarkerValue] = (0, import_react19.useState)(
    defaultTimeMarkerValue
  ), [selectedEntity, setSelectedEntity] = (0, import_react19.useState)(), [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react19.useState)(""), [selectedInverseRelationshipId, setSelectedInverseRelationshipId] = (0, import_react19.useState)(""), onSelectEntity = (0, import_react19.useCallback)(
    (selectedEntityFromResults) => {
      if (selectedEntityFromResults.id === entity.id)
        return window.alert("Cannot tag an entity with itself");
      setSelectedEntity(selectedEntityFromResults);
    },
    [entity]
  ), onNewEntityCreated = (0, import_react19.useCallback)((entity2) => {
    setSelectedEntity(entity2);
  }, []), onTimeMarkerValueChanged = (0, import_react19.useCallback)(
    (newTimeMarkerValueSeconds) => {
      setShouldAddTimeMarker(!0), typeof activeItemDurationSeconds < "u" && newTimeMarkerValueSeconds >= activeItemDurationSeconds ? setTimeMarkerValue(activeItemDurationSeconds) : newTimeMarkerValueSeconds <= 0 ? setTimeMarkerValue(0) : setTimeMarkerValue(newTimeMarkerValueSeconds);
    },
    [activeItemDurationSeconds]
  ), onSelectRelationship = (0, import_react19.useCallback)(
    (relationshipId) => {
      setSelectedRelationshipId(relationshipId);
    },
    [setSelectedRelationshipId]
  ), onSelectInverseRelationship = (0, import_react19.useCallback)(
    (relationshipId) => {
      setSelectedInverseRelationshipId(relationshipId);
    },
    [setSelectedInverseRelationshipId]
  ), onCreateTagClicked = async () => {
    if (!(selectedEntity != null && selectedEntity.entityType) || !entity.entityType)
      return;
    let subjectTimeMarkerSeconds;
    shouldAddTimeMarker && typeof timeMarkerValue == "number" && (subjectTimeMarkerSeconds = timeMarkerValue), await fetcher.submit(
      {
        relationshipId: selectedRelationshipId,
        inverseRelationshipId: selectedInverseRelationshipId,
        subjectEntityType: entity.entityType,
        subjectEntityId: entity.id,
        objectEntityType: selectedEntity.entityType,
        objectEntityId: selectedEntity.id,
        subjectTimeMarkerSeconds: String(subjectTimeMarkerSeconds ?? "")
      },
      { method: "POST", action: "/tags" }
    );
  };
  if (!selectedEntity)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      SearchEntities_default,
      {
        onSelect: onSelectEntity,
        onNewEntityCreated
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateTagForm.tsx",
        lineNumber: 123,
        columnNumber: 4
      },
      this
    );
  let shouldShowTimeMarkerCheckbox = entity.entityType === import_client6.EntityType.AudioItem && typeof defaultTimeMarkerValue < "u";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: "What is the relationship between these two entities?" }, void 0, !1, {
      fileName: "app/components/CreateTagForm.tsx",
      lineNumber: 137,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mt-2 pl-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      SelectRelationship,
      {
        subjectEntity: entity,
        objectEntity: selectedEntity,
        onSelect: onSelectRelationship
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateTagForm.tsx",
        lineNumber: 140,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/CreateTagForm.tsx",
      lineNumber: 139,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mt-6", children: "...and what is the inverse relationship?" }, void 0, !1, {
      fileName: "app/components/CreateTagForm.tsx",
      lineNumber: 147,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mt-2 pl-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      SelectRelationship,
      {
        subjectEntity: selectedEntity,
        objectEntity: entity,
        onSelect: onSelectInverseRelationship
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateTagForm.tsx",
        lineNumber: 150,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/CreateTagForm.tsx",
      lineNumber: 149,
      columnNumber: 4
    }, this),
    shouldShowTimeMarkerCheckbox && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mt-6 flex flex-row items-start justify-start", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
        "input",
        {
          type: "checkbox",
          id: "time-marker",
          className: "mt-1",
          checked: shouldAddTimeMarker,
          onChange: (event) => setShouldAddTimeMarker(event.target.checked)
        },
        void 0,
        !1,
        {
          fileName: "app/components/CreateTagForm.tsx",
          lineNumber: 159,
          columnNumber: 6
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("label", { htmlFor: "time-marker", className: "ml-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "flex flex-col items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "mb-2", children: "Mark this Tag at time:" }, void 0, !1, {
          fileName: "app/components/CreateTagForm.tsx",
          lineNumber: 168,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
          TimestampInput_default,
          {
            valueInSeconds: timeMarkerValue ?? 0,
            onChange: onTimeMarkerValueChanged
          },
          void 0,
          !1,
          {
            fileName: "app/components/CreateTagForm.tsx",
            lineNumber: 169,
            columnNumber: 8
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/CreateTagForm.tsx",
        lineNumber: 167,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/components/CreateTagForm.tsx",
        lineNumber: 166,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/CreateTagForm.tsx",
      lineNumber: 158,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      "button",
      {
        className: "btn mt-6",
        onClick: onCreateTagClicked,
        disabled: !selectedRelationshipId || fetcher.state !== "idle",
        children: "Save"
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateTagForm.tsx",
        lineNumber: 178,
        columnNumber: 4
      },
      this
    ),
    ((_b = fetcher.data) == null ? void 0 : _b.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "text-red-600 mt-4", children: fetcher.data.error }, void 0, !1, {
      fileName: "app/components/CreateTagForm.tsx",
      lineNumber: 187,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/CreateTagForm.tsx",
    lineNumber: 136,
    columnNumber: 3
  }, this);
}, CreateTagForm_default = CreateTagForm;

// app/components/AddTagButton.tsx
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), AddTagButton = ({ entity, className, children }) => {
  let [modalIsVisible, setModalIsVisible] = (0, import_react21.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_jsx_dev_runtime18.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "button",
      {
        className: `btn-text whitespace-pre ${className ?? ""}`,
        onClick: () => setModalIsVisible(!0),
        children: children ?? "+ Add Tag"
      },
      void 0,
      !1,
      {
        fileName: "app/components/AddTagButton.tsx",
        lineNumber: 17,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      Modal_default,
      {
        title: "Add Tag",
        isVisible: modalIsVisible,
        onClose: () => setModalIsVisible(!1),
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          CreateTagForm_default,
          {
            entity,
            onSuccess: () => setModalIsVisible(!1)
          },
          void 0,
          !1,
          {
            fileName: "app/components/AddTagButton.tsx",
            lineNumber: 29,
            columnNumber: 5
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/components/AddTagButton.tsx",
        lineNumber: 24,
        columnNumber: 4
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/AddTagButton.tsx",
    lineNumber: 16,
    columnNumber: 3
  }, this);
}, AddTagButton_default = AddTagButton;

// app/components/EditTagsButton.tsx
var import_react22 = require("react");
var import_react23 = require("@remix-run/react"), import_jsx_dev_runtime19 = require("react/jsx-dev-runtime"), EditTagsButton = ({ tags, className, children, onSuccess }) => {
  let fetcher = (0, import_react23.useFetcher)(), isSubmittingOrLoading = fetcher.state === "submitting" || fetcher.state === "loading", data = fetcher.data;
  (0, import_react22.useEffect)(() => {
    onSuccess && data && !data.error && !isSubmittingOrLoading && onSuccess();
  }, [data, isSubmittingOrLoading, onSuccess]);
  let [modalIsVisible, setModalIsVisible] = (0, import_react22.useState)(!1), onDeleteTag = (0, import_react22.useCallback)(async (id) => {
    window.confirm("Are you sure you want to delete this Tag?") && await fetcher.submit(
      { tagId: id },
      { method: "delete", action: "/tags" }
    );
  }, []);
  (0, import_react22.useEffect)(() => {
    data != null && data.error && window.alert(`Error deleting Tag: ${data.error}`);
  }, [data]);
  let sortedTags = (0, import_react22.useMemo)(() => Array.isArray(tags) ? Tag_default.sort(tags) : [], [tags]);
  return !sortedTags || sortedTags.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_jsx_dev_runtime19.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
      "button",
      {
        className: `btn-text whitespace-pre ${className ?? ""}`,
        onClick: () => setModalIsVisible(!0),
        children: children ?? "Edit Tags"
      },
      void 0,
      !1,
      {
        fileName: "app/components/EditTagsButton.tsx",
        lineNumber: 57,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
      Modal_default,
      {
        title: "Edit Tags",
        isVisible: modalIsVisible,
        onClose: () => setModalIsVisible(!1),
        children: sortedTags.map((tag, index) => {
          let { id, relationship, subjectTimeMarkerSeconds } = tag, objectEntity = Tag_default.getObjectEntity(tag);
          return objectEntity ? /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
            "div",
            {
              className: "flex flex-row items-start justify-start",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "flex flex-col flex-1 justify-start align-start mb-4 pr-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "italic text-gray-500", children: relationship.name }, void 0, !1, {
                    fileName: "app/components/EditTagsButton.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "uppercase text-sm text-gray-500 pr-2", children: objectEntity.entityType }, void 0, !1, {
                    fileName: "app/components/EditTagsButton.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                  }, this),
                  objectEntity.name,
                  typeof subjectTimeMarkerSeconds == "number" && /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "italic text-gray-500", children: `at ${DateTime_default.formatSecondsAsDuration(
                    subjectTimeMarkerSeconds
                  )}` }, void 0, !1, {
                    fileName: "app/components/EditTagsButton.tsx",
                    lineNumber: 87,
                    columnNumber: 10
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/EditTagsButton.tsx",
                  lineNumber: 80,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
                  "button",
                  {
                    className: "btn-text",
                    onClick: () => onDeleteTag(id),
                    disabled: fetcher.state !== "idle",
                    children: "Delete Tag"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/EditTagsButton.tsx",
                    lineNumber: 94,
                    columnNumber: 8
                  },
                  this
                )
              ]
            },
            index,
            !0,
            {
              fileName: "app/components/EditTagsButton.tsx",
              lineNumber: 76,
              columnNumber: 7
            },
            this
          ) : null;
        })
      },
      void 0,
      !1,
      {
        fileName: "app/components/EditTagsButton.tsx",
        lineNumber: 64,
        columnNumber: 4
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/EditTagsButton.tsx",
    lineNumber: 56,
    columnNumber: 3
  }, this);
}, EditTagsButton_default = EditTagsButton;

// app/components/Tags.tsx
var import_jsx_dev_runtime20 = require("react/jsx-dev-runtime"), TagLink = ({ tag }) => {
  var _a;
  let [tooltipIsVisible, setTooltipIsVisible] = (0, import_react24.useState)(!1), [timeoutFunc, setTimeoutFunc] = (0, import_react24.useState)(), onMouseEnter = (0, import_react24.useCallback)(() => {
    setTimeoutFunc(setTimeout(() => setTooltipIsVisible(!0), 400));
  }, []), onMouseLeave = (0, import_react24.useCallback)(() => {
    timeoutFunc && (clearTimeout(timeoutFunc), setTimeoutFunc(void 0)), setTooltipIsVisible(!1);
  }, [timeoutFunc]);
  (0, import_react24.useEffect)(() => () => {
    timeoutFunc && (clearTimeout(timeoutFunc), setTimeoutFunc(void 0));
  }, [timeoutFunc]);
  let { relationship } = tag, objectEntity = Tag_default.getObjectEntity(tag), href = Entity_default.makeHrefForView(objectEntity);
  return !objectEntity || !href ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
    import_react25.Link,
    {
      to: href,
      className: "block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800",
      onMouseEnter,
      onMouseLeave,
      children: [
        objectEntity.name,
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
          "div",
          {
            className: `${tooltipIsVisible ? "hidden md:flex" : "hidden"} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`,
            children: [
              relationship.name,
              " ",
              (_a = objectEntity.entityType) == null ? void 0 : _a.toUpperCase()
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Tags.tsx",
            lineNumber: 54,
            columnNumber: 4
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/Tags.tsx",
      lineNumber: 47,
      columnNumber: 3
    },
    this
  );
}, Tags = ({ audioItem }) => {
  let { tagsAsSubject } = audioItem, sortedTags = (0, import_react24.useMemo)(() => {
    if (!Array.isArray(tagsAsSubject))
      return [];
    let tagsWithoutTimeMarkers = tagsAsSubject.filter(
      (tag) => typeof tag.subjectTimeMarkerSeconds != "number"
    );
    return Tag_default.sort(tagsWithoutTimeMarkers);
  }, [tagsAsSubject]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex flex-row items-center flex-wrap", children: [
    sortedTags.map((tag, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "mr-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(TagLink, { tag }, void 0, !1, {
      fileName: "app/components/Tags.tsx",
      lineNumber: 85,
      columnNumber: 6
    }, this) }, index, !1, {
      fileName: "app/components/Tags.tsx",
      lineNumber: 84,
      columnNumber: 5
    }, this)),
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
      "div",
      {
        className: tagsAsSubject && tagsAsSubject.length > 0 ? "mb-2 ml-1" : void 0,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(AddTagButton_default, { entity: audioItem }, void 0, !1, {
          fileName: "app/components/Tags.tsx",
          lineNumber: 94,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/Tags.tsx",
        lineNumber: 89,
        columnNumber: 4
      },
      this
    ),
    tagsAsSubject && tagsAsSubject.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: "flex ml-1 mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("span", { className: "text-gray-500 mr-1", children: "/" }, void 0, !1, {
        fileName: "app/components/Tags.tsx",
        lineNumber: 99,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(EditTagsButton_default, { tags: tagsAsSubject }, void 0, !1, {
        fileName: "app/components/Tags.tsx",
        lineNumber: 100,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Tags.tsx",
      lineNumber: 98,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Tags.tsx",
    lineNumber: 82,
    columnNumber: 3
  }, this);
}, Tags_default = Tags;

// app/components/SaveItemButton.tsx
var import_react26 = require("@remix-run/react"), import_jsx_dev_runtime21 = require("react/jsx-dev-runtime");
function SaveItemButton({ audioItem }) {
  let fetcher = (0, import_react26.useFetcher)();
  function onButtonClicked() {
    fetcher.submit(
      { audioItemId: audioItem.id },
      { method: "POST", action: "/saved-items" }
    );
  }
  let isSaved = audioItem.savedItems.length === 1;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
    "button",
    {
      className: `btn-secondary ${isSaved ? "btn-secondary-active" : ""} pl-0.5`,
      onClick: onButtonClicked,
      disabled: fetcher.state !== "idle",
      "aria-label": isSaved ? "Unsave" : "Save",
      children: isSaved ? /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("i", { className: "material-icons", children: "bookmark" }, void 0, !1, {
          fileName: "app/components/SaveItemButton.tsx",
          lineNumber: 30,
          columnNumber: 6
        }, this),
        "Saved"
      ] }, void 0, !0, {
        fileName: "app/components/SaveItemButton.tsx",
        lineNumber: 29,
        columnNumber: 5
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_jsx_dev_runtime21.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("i", { className: "material-icons", children: "bookmark_border" }, void 0, !1, {
          fileName: "app/components/SaveItemButton.tsx",
          lineNumber: 35,
          columnNumber: 6
        }, this),
        "Save"
      ] }, void 0, !0, {
        fileName: "app/components/SaveItemButton.tsx",
        lineNumber: 34,
        columnNumber: 5
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/SaveItemButton.tsx",
      lineNumber: 20,
      columnNumber: 3
    },
    this
  );
}

// app/components/ViewCommentsButton.tsx
var import_react29 = require("react"), import_react30 = require("@remix-run/react");

// app/components/CreateCommentForm.tsx
var import_react27 = require("@remix-run/react"), import_react28 = require("react"), import_jsx_dev_runtime22 = require("react/jsx-dev-runtime"), CreateCommentForm = ({ parentAudioItem }) => {
  var _a;
  let formRef = (0, import_react28.useRef)(null), fetcher = (0, import_react27.useFetcher)();
  return (0, import_react28.useEffect)(() => {
    var _a2;
    fetcher.type === "done" && fetcher.data.comment && ((_a2 = formRef.current) == null || _a2.reset());
  }, [fetcher]), /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
    fetcher.Form,
    {
      ref: formRef,
      method: "POST",
      action: "/comments",
      className: "w-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          "textarea",
          {
            placeholder: "Add a comment...",
            rows: 3,
            required: !0,
            minLength: 1,
            name: "text"
          },
          void 0,
          !1,
          {
            fileName: "app/components/CreateCommentForm.tsx",
            lineNumber: 25,
            columnNumber: 4
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          "input",
          {
            type: "hidden",
            name: "parentAudioItemId",
            value: parentAudioItem.id
          },
          void 0,
          !1,
          {
            fileName: "app/components/CreateCommentForm.tsx",
            lineNumber: 32,
            columnNumber: 4
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          "button",
          {
            className: "btn mt-3 w-auto",
            type: "submit",
            disabled: fetcher.state !== "idle",
            children: "Add Comment"
          },
          void 0,
          !1,
          {
            fileName: "app/components/CreateCommentForm.tsx",
            lineNumber: 37,
            columnNumber: 4
          },
          this
        ),
        ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "text-red-600 mt-3", children: fetcher.data.error }, void 0, !1, {
          fileName: "app/components/CreateCommentForm.tsx",
          lineNumber: 45,
          columnNumber: 5
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/CreateCommentForm.tsx",
      lineNumber: 19,
      columnNumber: 3
    },
    this
  );
}, CreateCommentForm_default = CreateCommentForm;

// app/components/ViewCommentsButton.tsx
var import_jsx_dev_runtime23 = require("react/jsx-dev-runtime"), ViewCommentsButton = ({ audioItem }) => {
  let { comments } = audioItem, commentsCount = comments.length, commentsRef = (0, import_react29.useRef)(), [modalIsVisible, setModalIsVisible] = (0, import_react29.useState)(!1), onViewCommentsButtonClicked = (0, import_react29.useCallback)(async () => {
    setModalIsVisible(!0);
  }, []), onCloseModal = (0, import_react29.useCallback)(() => setModalIsVisible(!1), []);
  (0, import_react29.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_jsx_dev_runtime23.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
      "button",
      {
        className: "btn-secondary",
        onClick: onViewCommentsButtonClicked,
        "aria-label": "View Comments",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("i", { className: "material-icons mr-0.5", children: "chat_bubble_outline" }, void 0, !1, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 51,
            columnNumber: 5
          }, this),
          commentsCount > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_jsx_dev_runtime23.Fragment, { children: [
            commentsCount,
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "hidden md:block md:pl-1", children: [
              "Comment",
              commentsCount === 1 ? "" : "s"
            ] }, void 0, !0, {
              fileName: "app/components/ViewCommentsButton.tsx",
              lineNumber: 55,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 53,
            columnNumber: 6
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_jsx_dev_runtime23.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "md:hidden", children: "0" }, void 0, !1, {
              fileName: "app/components/ViewCommentsButton.tsx",
              lineNumber: 61,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "hidden md:block", children: "No Comments" }, void 0, !1, {
              fileName: "app/components/ViewCommentsButton.tsx",
              lineNumber: 62,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 60,
            columnNumber: 6
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/ViewCommentsButton.tsx",
        lineNumber: 46,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
      Modal_default,
      {
        title: modalTitle,
        isVisible: modalIsVisible,
        onClose: onCloseModal,
        children: [
          comments.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "max-h-1/2 overflow-auto", children: comments.map(({ createdByUser, createdAt, text }, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "text-gray-500 text-sm mb-1 flex flex-row items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
                import_react30.Link,
                {
                  to: `/users/${createdByUser == null ? void 0 : createdByUser.id}`,
                  className: "mr-1 flex flex-row items-center",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { children: createdByUser == null ? void 0 : createdByUser.username }, void 0, !1, {
                    fileName: "app/components/ViewCommentsButton.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/components/ViewCommentsButton.tsx",
                  lineNumber: 77,
                  columnNumber: 10
                },
                this
              ),
              " ",
              DateTime_default.formatDateYearTime(createdAt)
            ] }, void 0, !0, {
              fileName: "app/components/ViewCommentsButton.tsx",
              lineNumber: 76,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "text-sm whitespace-pre-line text-gray-900", children: text }, void 0, !1, {
              fileName: "app/components/ViewCommentsButton.tsx",
              lineNumber: 85,
              columnNumber: 9
            }, this)
          ] }, index, !0, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 75,
            columnNumber: 8
          }, this)) }, void 0, !1, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 73,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(CreateCommentForm_default, { parentAudioItem: audioItem }, void 0, !1, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 94,
            columnNumber: 6
          }, this) }, void 0, !1, {
            fileName: "app/components/ViewCommentsButton.tsx",
            lineNumber: 93,
            columnNumber: 5
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/ViewCommentsButton.tsx",
        lineNumber: 67,
        columnNumber: 4
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/ViewCommentsButton.tsx",
    lineNumber: 45,
    columnNumber: 3
  }, this);
}, ViewCommentsButton_default = ViewCommentsButton;

// app/components/TimeMarkers.tsx
var import_react31 = require("react"), import_react32 = require("@remix-run/react");
var import_jsx_dev_runtime24 = require("react/jsx-dev-runtime"), TimeMarkers = ({ audioItem }) => {
  let { tagsAsSubject } = audioItem, {
    activeAudioItem,
    setActiveAudioItem,
    playbackPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default(), timeMarkersWithTags = (0, import_react31.useMemo)(() => {
    let output = {};
    if (!tagsAsSubject)
      return output;
    let filteredTags = tagsAsSubject.filter(
      (tag) => typeof tag.subjectTimeMarkerSeconds == "number"
    );
    return filteredTags.sort(
      (a, b) => a.subjectTimeMarkerSeconds ?? 0 - (b.subjectTimeMarkerSeconds ?? 0)
    ), filteredTags.forEach((tag) => {
      if (typeof tag.subjectTimeMarkerSeconds != "number")
        return;
      let existingTagsAtTimeMarker = output[tag.subjectTimeMarkerSeconds] ?? [];
      output[tag.subjectTimeMarkerSeconds] = [...existingTagsAtTimeMarker, tag];
    }), output;
  }, [tagsAsSubject]), onTimeMarkerClicked = (0, import_react31.useCallback)(
    (event, timeMarker) => {
      if (event.target.id === "time-marker-tag-link") {
        event.stopPropagation();
        return;
      }
      (activeAudioItem == null ? void 0 : activeAudioItem.id) !== audioItem.id && setActiveAudioItem(audioItem), setSeekPositionSeconds(parseInt(timeMarker));
    },
    [audioItem, activeAudioItem, setActiveAudioItem, setSeekPositionSeconds]
  ), audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id, activeTimeMarker = (0, import_react31.useMemo)(() => {
    if (!audioItemIsInPlayer)
      return;
    let result;
    return Object.keys(timeMarkersWithTags).forEach((timeMarker) => {
      parseInt(timeMarker) <= (playbackPositionSeconds ?? 0) && (result = timeMarker);
    }), result;
  }, [audioItemIsInPlayer, timeMarkersWithTags, playbackPositionSeconds]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col", children: Object.entries(timeMarkersWithTags).map(
    ([timeMarker, tagsAsSubjectAtTimeMarker], index) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
      "div",
      {
        className: "flex flex-row items-start md:items-center justify-start mb-2 last:mb-1 text-sm",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-row w-16 flex-shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "w-3 text-left", children: activeTimeMarker === timeMarker && ">" }, void 0, !1, {
              fileName: "app/components/TimeMarkers.tsx",
              lineNumber: 93,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
              "button",
              {
                className: "link",
                onClick: (event) => onTimeMarkerClicked(event, timeMarker),
                children: DateTime_default.formatSecondsAsDuration(parseInt(timeMarker))
              },
              void 0,
              !1,
              {
                fileName: "app/components/TimeMarkers.tsx",
                lineNumber: 94,
                columnNumber: 9
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/TimeMarkers.tsx",
            lineNumber: 92,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "flex flex-col md:flex-row", children: tagsAsSubjectAtTimeMarker.map((tag, index2) => {
            let objectEntity = Tag_default.getObjectEntity(tag);
            return objectEntity ? /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("span", { className: "flex flex-row items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(
                import_react32.Link,
                {
                  to: Entity_default.makeHrefForView(objectEntity),
                  id: "time-marker-tag-link",
                  children: [
                    objectEntity.name,
                    objectEntity.entityType === "Tune" /* Tune */ ? ` (${objectEntity.type})` : ""
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/components/TimeMarkers.tsx",
                  lineNumber: 109,
                  columnNumber: 12
                },
                this
              ),
              index2 !== tagsAsSubjectAtTimeMarker.length - 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("span", { className: "hidden md:block mr-1", children: "," }, void 0, !1, {
                fileName: "app/components/TimeMarkers.tsx",
                lineNumber: 119,
                columnNumber: 13
              }, this)
            ] }, index2, !0, {
              fileName: "app/components/TimeMarkers.tsx",
              lineNumber: 108,
              columnNumber: 11
            }, this) : null;
          }) }, void 0, !1, {
            fileName: "app/components/TimeMarkers.tsx",
            lineNumber: 101,
            columnNumber: 8
          }, this)
        ]
      },
      index,
      !0,
      {
        fileName: "app/components/TimeMarkers.tsx",
        lineNumber: 88,
        columnNumber: 7
      },
      this
    )
  ) }, void 0, !1, {
    fileName: "app/components/TimeMarkers.tsx",
    lineNumber: 83,
    columnNumber: 3
  }, this);
}, TimeMarkers_default = TimeMarkers;

// app/components/AudioItemCard.tsx
var import_jsx_dev_runtime25 = require("react/jsx-dev-runtime"), AudioItemCard = ({ audioItem, showTitle = !0, className }) => {
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
  } = usePlayerContext_default(), audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id, tagsWithTimeMarkers = (0, import_react33.useMemo)(() => Array.isArray(tags) ? tags.filter(
    (tag) => typeof tag.subjectTimeMarkerSeconds == "number"
  ) : [], [tags]), onPlayPressed = (0, import_react33.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), shouldShowPositionAndDuration = audioItemIsInPlayer && typeof playbackPositionSeconds == "number" && typeof activeItemDurationSeconds == "number", positionAndDuration = `${DateTime_default.formatSecondsAsDuration(
    playbackPositionSeconds ?? 0
  )} / ${DateTime_default.formatSecondsAsDuration(activeItemDurationSeconds ?? 0)}`, isTakenDown = status === "TAKEN_DOWN";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
    "div",
    {
      className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`,
      children: [
        showTitle && /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h2", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
          import_react34.Link,
          {
            to: `/entities/audio-items/${slug}`,
            className: "no-underline text-gray-700",
            children: name
          },
          void 0,
          !1,
          {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 69,
            columnNumber: 6
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 68,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(Tags_default, { audioItem }, void 0, !1, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 79,
          columnNumber: 5
        }, this) }, void 0, !1, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 78,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-col w-full border border-gray-200 rounded mb-2", children: [
          isTakenDown ? /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-row items-center px-4 py-6 text-gray-500", children: "This Audio Item has been removed via an approved Takedown Request" }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 84,
            columnNumber: 6
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_jsx_dev_runtime25.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-row justify-start items-center pr-4 h-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-1", children: [
            audioItemIsInPlayer ? /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "pl-4 text-gray-500", children: "Playing" }, void 0, !1, {
              fileName: "app/components/AudioItemCard.tsx",
              lineNumber: 92,
              columnNumber: 10
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
              "button",
              {
                style: { lineHeight: 0 },
                onClick: onPlayPressed,
                "aria-label": "Play",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("i", { className: "material-icons text-teal-600 hover:text-teal-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("span", { className: "text-6xl", children: "play_arrow" }, void 0, !1, {
                  fileName: "app/components/AudioItemCard.tsx",
                  lineNumber: 100,
                  columnNumber: 12
                }, this) }, void 0, !1, {
                  fileName: "app/components/AudioItemCard.tsx",
                  lineNumber: 99,
                  columnNumber: 11
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/AudioItemCard.tsx",
                lineNumber: 94,
                columnNumber: 10
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
              "div",
              {
                className: `ml-4 text-gray-500 opacity-0 ${shouldShowPositionAndDuration ? "opacity-100 transition-opacity delay-500 duration-400" : ""}`,
                children: positionAndDuration
              },
              void 0,
              !1,
              {
                fileName: "app/components/AudioItemCard.tsx",
                lineNumber: 105,
                columnNumber: 9
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 90,
            columnNumber: 8
          }, this) }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 89,
            columnNumber: 7
          }, this) }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 88,
            columnNumber: 6
          }, this),
          tagsWithTimeMarkers.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "mx-4 mb-2 pt-3 border-t border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(TimeMarkers_default, { audioItem }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 120,
            columnNumber: 7
          }, this) }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 119,
            columnNumber: 6
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 82,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "text-gray-500 text-sm flex flex-row", children: [
            "Added",
            createdByUser && /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_jsx_dev_runtime25.Fragment, { children: [
              " ",
              "by",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
                import_react34.Link,
                {
                  to: `/users/${createdByUser.id}`,
                  className: "flex flex-row px-0 sm:px-1",
                  children: createdByUser.username
                },
                void 0,
                !1,
                {
                  fileName: "app/components/AudioItemCard.tsx",
                  lineNumber: 132,
                  columnNumber: 8
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/AudioItemCard.tsx",
              lineNumber: 129,
              columnNumber: 7
            }, this),
            " ",
            DateTime_default.formatDateYearTime(createdAt)
          ] }, void 0, !0, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 126,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "text-sm mt-1 text-gray-900 whitespace-pre-wrap", children: description || "No description" }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 142,
            columnNumber: 5
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 125,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "border-t border-gray-200 mt-4 pt-3 w-full flex flex-row justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "flex flex-row items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(ViewCommentsButton_default, { audioItem }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 149,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "ml-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(SaveItemButton, { audioItem }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 152,
            columnNumber: 7
          }, this) }, void 0, !1, {
            fileName: "app/components/AudioItemCard.tsx",
            lineNumber: 151,
            columnNumber: 6
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 148,
          columnNumber: 5
        }, this) }, void 0, !1, {
          fileName: "app/components/AudioItemCard.tsx",
          lineNumber: 147,
          columnNumber: 4
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/AudioItemCard.tsx",
      lineNumber: 62,
      columnNumber: 3
    },
    this
  );
}, AudioItemCard_default = AudioItemCard;

// app/components/AudioItemCompact.tsx
var import_react35 = require("react"), import_react36 = require("@remix-run/react");
var import_jsx_dev_runtime26 = require("react/jsx-dev-runtime"), AudioItemCompact = ({ audioItem, className }) => {
  let { name, slug, description, tagsAsSubject, status } = audioItem, isTakenDown = status === "TAKEN_DOWN" /* TakenDown */, sortedTags = (0, import_react35.useMemo)(
    () => Tag_default.sort(tagsAsSubject),
    [tagsAsSubject]
  ), { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), onPlayPressed = (0, import_react35.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), playButtonMarkup = (0, import_react35.useMemo)(() => {
    let audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    return isTakenDown ? /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "text-gray-500", children: "Taken Down" }, void 0, !1, {
      fileName: "app/components/AudioItemCompact.tsx",
      lineNumber: 38,
      columnNumber: 11
    }, this) : audioItemIsInPlayer ? /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "text-gray-500", children: "Playing" }, void 0, !1, {
      fileName: "app/components/AudioItemCompact.tsx",
      lineNumber: 41,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
      "button",
      {
        style: { lineHeight: 0 },
        onClick: onPlayPressed,
        "aria-label": "Play",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("i", { className: "material-icons text-teal-600 hover:text-teal-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("span", { className: "text-6xl", children: "play_arrow" }, void 0, !1, {
          fileName: "app/components/AudioItemCompact.tsx",
          lineNumber: 50,
          columnNumber: 6
        }, this) }, void 0, !1, {
          fileName: "app/components/AudioItemCompact.tsx",
          lineNumber: 49,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/AudioItemCompact.tsx",
        lineNumber: 44,
        columnNumber: 4
      },
      this
    );
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(
    "div",
    {
      className: `flex flex-row justify-start items-start bg-white shadow-md rounded pt-2 px-3 pb-1 ${className ?? ""}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex justify-center items-center w-14 mr-3", children: playButtonMarkup }, void 0, !1, {
          fileName: "app/components/AudioItemCompact.tsx",
          lineNumber: 62,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(import_react36.Link, { to: `/entities/audio-items/${slug}`, children: name }, void 0, !1, {
            fileName: "app/components/AudioItemCompact.tsx",
            lineNumber: 67,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-row flex-wrap text-sm mt-1 mb-1", children: [
            "Tags:",
            sortedTags.map((tag, index) => {
              let objectEntity = Tag_default.getObjectEntity(tag);
              return objectEntity ? /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "ml-1 whitespace-pre", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(import_react36.Link, { to: Entity_default.makeHrefForView(objectEntity), children: [
                  objectEntity.name,
                  objectEntity.entityType === "Tune" /* Tune */ ? ` (${objectEntity.type})` : ""
                ] }, void 0, !0, {
                  fileName: "app/components/AudioItemCompact.tsx",
                  lineNumber: 78,
                  columnNumber: 9
                }, this),
                index !== sortedTags.length - 1 && ", "
              ] }, index, !0, {
                fileName: "app/components/AudioItemCompact.tsx",
                lineNumber: 77,
                columnNumber: 8
              }, this) : null;
            }),
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(AddTagButton_default, { entity: audioItem, className: "ml-2" }, void 0, !1, {
              fileName: "app/components/AudioItemCompact.tsx",
              lineNumber: 88,
              columnNumber: 6
            }, this),
            (tagsAsSubject == null ? void 0 : tagsAsSubject.length) > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex ml-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("span", { className: "text-gray-500 mr-1", children: "/" }, void 0, !1, {
                fileName: "app/components/AudioItemCompact.tsx",
                lineNumber: 91,
                columnNumber: 8
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(EditTagsButton_default, { tags: audioItem.tagsAsSubject }, void 0, !1, {
                fileName: "app/components/AudioItemCompact.tsx",
                lineNumber: 92,
                columnNumber: 8
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/AudioItemCompact.tsx",
              lineNumber: 90,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/AudioItemCompact.tsx",
            lineNumber: 69,
            columnNumber: 5
          }, this),
          description && /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "text-gray-500 text-sm", children: description }, void 0, !1, {
            fileName: "app/components/AudioItemCompact.tsx",
            lineNumber: 98,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "border-t border-gray-200 mt-2 pt-1 w-full flex flex-row justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "flex flex-row items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(ViewCommentsButton_default, { audioItem }, void 0, !1, {
              fileName: "app/components/AudioItemCompact.tsx",
              lineNumber: 103,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "ml-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(SaveItemButton, { audioItem }, void 0, !1, {
              fileName: "app/components/AudioItemCompact.tsx",
              lineNumber: 106,
              columnNumber: 8
            }, this) }, void 0, !1, {
              fileName: "app/components/AudioItemCompact.tsx",
              lineNumber: 105,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/AudioItemCompact.tsx",
            lineNumber: 102,
            columnNumber: 6
          }, this) }, void 0, !1, {
            fileName: "app/components/AudioItemCompact.tsx",
            lineNumber: 101,
            columnNumber: 5
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/AudioItemCompact.tsx",
          lineNumber: 66,
          columnNumber: 4
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/AudioItemCompact.tsx",
      lineNumber: 57,
      columnNumber: 3
    },
    this
  );
}, AudioItemCompact_default = AudioItemCompact;

// app/components/AudioItemTextOnly.tsx
var import_react37 = require("react"), import_react38 = require("@remix-run/react");
var import_jsx_dev_runtime27 = require("react/jsx-dev-runtime"), AudioItemTextOnly = ({ audioItem, className }) => {
  let { name, slug, tagsAsSubject, status } = audioItem, isTakenDown = status === "TAKEN_DOWN" /* TakenDown */, sortedTags = (0, import_react37.useMemo)(
    () => Tag_default.sort(tagsAsSubject),
    [tagsAsSubject]
  ), { activeAudioItem, setActiveAudioItem } = usePlayerContext_default(), onPlayPressed = (0, import_react37.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem, setActiveAudioItem]), playButtonMarkup = (0, import_react37.useMemo)(() => {
    let audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    return isTakenDown ? /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "text-gray-500", children: "Taken Down" }, void 0, !1, {
      fileName: "app/components/AudioItemTextOnly.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) : audioItemIsInPlayer ? /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "text-gray-500", children: "Playing" }, void 0, !1, {
      fileName: "app/components/AudioItemTextOnly.tsx",
      lineNumber: 34,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(
      "button",
      {
        style: { lineHeight: 0 },
        onClick: onPlayPressed,
        "aria-label": "Play",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("i", { className: "material-icons text-teal-600 hover:text-teal-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { className: "text-3xl", children: "play_arrow" }, void 0, !1, {
          fileName: "app/components/AudioItemTextOnly.tsx",
          lineNumber: 43,
          columnNumber: 6
        }, this) }, void 0, !1, {
          fileName: "app/components/AudioItemTextOnly.tsx",
          lineNumber: 42,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/AudioItemTextOnly.tsx",
        lineNumber: 37,
        columnNumber: 4
      },
      this
    );
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(
    "div",
    {
      className: `flex flex-row justify-start items-start ${className ?? ""}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "flex justify-center items-center w-14 mr-3", children: playButtonMarkup }, void 0, !1, {
          fileName: "app/components/AudioItemTextOnly.tsx",
          lineNumber: 53,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_react38.Link, { to: `/entities/audio-items/${slug}`, children: name }, void 0, !1, {
            fileName: "app/components/AudioItemTextOnly.tsx",
            lineNumber: 58,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "flex flex-row flex-wrap text-sm mt-1 mb-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { className: "text-gray-500", children: "Tags:" }, void 0, !1, {
              fileName: "app/components/AudioItemTextOnly.tsx",
              lineNumber: 61,
              columnNumber: 6
            }, this),
            sortedTags.map((tag, index) => {
              let objectEntity = Tag_default.getObjectEntity(tag);
              return /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { className: "ml-1 whitespace-pre", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_react38.Link, { to: Entity_default.makeHrefForView(objectEntity), children: objectEntity == null ? void 0 : objectEntity.name }, void 0, !1, {
                  fileName: "app/components/AudioItemTextOnly.tsx",
                  lineNumber: 66,
                  columnNumber: 9
                }, this),
                index !== sortedTags.length - 1 && ", "
              ] }, index, !0, {
                fileName: "app/components/AudioItemTextOnly.tsx",
                lineNumber: 65,
                columnNumber: 8
              }, this);
            })
          ] }, void 0, !0, {
            fileName: "app/components/AudioItemTextOnly.tsx",
            lineNumber: 60,
            columnNumber: 5
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/AudioItemTextOnly.tsx",
          lineNumber: 57,
          columnNumber: 4
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/AudioItemTextOnly.tsx",
      lineNumber: 50,
      columnNumber: 3
    },
    this
  );
}, AudioItemTextOnly_default = AudioItemTextOnly;

// app/components/AudioItem.tsx
var import_jsx_dev_runtime28 = require("react/jsx-dev-runtime"), AudioItemComponent = ({
  viewAs,
  audioItem,
  showTitle,
  className
}) => viewAs === "Cards" /* Cards */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
  AudioItemCard_default,
  {
    audioItem,
    showTitle,
    className
  },
  void 0,
  !1,
  {
    fileName: "app/components/AudioItem.tsx",
    lineNumber: 25,
    columnNumber: 4
  },
  this
) : viewAs === "Compact" /* Compact */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(AudioItemCompact_default, { audioItem, className }, void 0, !1, {
  fileName: "app/components/AudioItem.tsx",
  lineNumber: 32,
  columnNumber: 10
}, this) : viewAs === "List" /* List */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(AudioItemTextOnly_default, { audioItem, className }, void 0, !1, {
  fileName: "app/components/AudioItem.tsx",
  lineNumber: 34,
  columnNumber: 10
}, this) : null, AudioItem_default = AudioItemComponent;

// app/components/Breadcrumb.tsx
var import_react39 = require("@remix-run/react"), import_jsx_dev_runtime29 = require("react/jsx-dev-runtime"), Breadcrumb = ({ items = [], className }) => {
  if (items.length === 0)
    return null;
  if (items.length === 1)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("h1", { className: className ?? "", children: items[0].label }, void 0, !1, {
      fileName: "app/components/Breadcrumb.tsx",
      lineNumber: 18,
      columnNumber: 10
    }, this);
  let subItems = items.slice(0, items.length - 1), finalItem = items[items.length - 1];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: `flex flex-col ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "flex flex-row items-center mb-1", children: subItems.map(({ label, href }, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "flex", children: [
      href ? /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(import_react39.Link, { to: href, children: label }, void 0, !1, {
        fileName: "app/components/Breadcrumb.tsx",
        lineNumber: 30,
        columnNumber: 8
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("span", { className: "text-gray-500", children: label }, void 0, !1, {
        fileName: "app/components/Breadcrumb.tsx",
        lineNumber: 32,
        columnNumber: 8
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("i", { className: "material-icons text-gray-500 text-base ml-1", children: "keyboard_arrow_right" }, void 0, !1, {
        fileName: "app/components/Breadcrumb.tsx",
        lineNumber: 34,
        columnNumber: 7
      }, this)
    ] }, index, !0, {
      fileName: "app/components/Breadcrumb.tsx",
      lineNumber: 28,
      columnNumber: 6
    }, this)) }, void 0, !1, {
      fileName: "app/components/Breadcrumb.tsx",
      lineNumber: 26,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("h1", { children: finalItem.label }, void 0, !1, {
      fileName: "app/components/Breadcrumb.tsx",
      lineNumber: 41,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Breadcrumb.tsx",
    lineNumber: 25,
    columnNumber: 3
  }, this);
}, Breadcrumb_default = Breadcrumb;

// app/routes/entities/audio-items/$slug.tsx
var import_jsx_dev_runtime30 = require("react/jsx-dev-runtime");
async function loader3({
  request,
  params
}) {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { slug } = params, audioItem = await db.audioItem.findUnique({
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
      savedItems: {
        where: {
          userId
        }
      }
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
  let { audioItem } = (0, import_react40.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
      Breadcrumb_default,
      {
        items: [
          {
            label: Entity_default.makeReadableNamePlural(audioItem),
            href: Entity_default.makeHrefForTopLevel(audioItem)
          },
          { label: audioItem.name }
        ],
        className: "mb-2"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/entities/audio-items/$slug.tsx",
        lineNumber: 75,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/entities/audio-items/$slug.tsx",
      lineNumber: 74,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
      AudioItem_default,
      {
        audioItem,
        viewAs: "Cards" /* Cards */,
        showTitle: !1
      },
      void 0,
      !1,
      {
        fileName: "app/routes/entities/audio-items/$slug.tsx",
        lineNumber: 87,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "mt-8 text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
      "a",
      {
        href: `https://itma-atom.arkivum.net/index.php/${audioItem.itmaAtomSlug}`,
        target: "_blank",
        rel: "noreferrer",
        children: "View in ITMA AtoM catalog \u2197"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/entities/audio-items/$slug.tsx",
        lineNumber: 94,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/entities/audio-items/$slug.tsx",
      lineNumber: 93,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entities/audio-items/$slug.tsx",
    lineNumber: 73,
    columnNumber: 3
  }, this);
}, slug_default = ViewAudioItemBySlug;

// app/routes/entities/audio-items/index.tsx
var audio_items_exports = {};
__export(audio_items_exports, {
  default: () => audio_items_default
});
var import_react41 = require("react"), import_react42 = require("@remix-run/react"), ViewAudioItems = () => {
  let navigate = (0, import_react42.useNavigate)();
  return (0, import_react41.useEffect)(() => {
    navigate("/");
  }, [navigate]), null;
}, audio_items_default = ViewAudioItems;

// app/routes/entities/collections/$slug.tsx
var slug_exports2 = {};
__export(slug_exports2, {
  default: () => slug_default2,
  loader: () => loader4
});
var import_react47 = require("@remix-run/react");

// app/components/ViewEntityAndAudioItems.tsx
var import_react46 = require("@remix-run/react");

// app/hooks/useFilters.ts
var import_react44 = require("react"), import_react45 = require("@remix-run/react");

// app/components/Filters.tsx
var import_react43 = require("react");
var import_jsx_dev_runtime31 = require("react/jsx-dev-runtime"), Filters = ({
  totalItems,
  page,
  onChangePage,
  perPage,
  onChangePerPage,
  sortByOptions = [],
  sortBy,
  onChangeSortBy,
  viewAs,
  onChangeViewAs,
  className
}) => {
  let shouldRenderPagination = typeof totalItems == "number" && typeof page == "number" && onChangePage && perPage && onChangePerPage, shouldRenderSortBy = sortByOptions.length > 0 && sortBy && onChangeSortBy, shouldRenderViewAs = viewAs && onChangeViewAs, totalPages = (0, import_react43.useMemo)(() => typeof totalItems != "number" || typeof perPage > "u" || totalItems === 0 ? 1 : Math.ceil(totalItems / perPage), [totalItems, perPage]), pageSelectOptions = (0, import_react43.useMemo)(() => {
    let output = [], i = 1;
    for (; i <= totalPages; )
      output.push(
        /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: i, children: i }, i, !1, {
          fileName: "app/components/Filters.tsx",
          lineNumber: 57,
          columnNumber: 5
        }, this)
      ), i++;
    return output;
  }, [totalPages]), perPageOptions = (0, import_react43.useMemo)(() => {
    let output = [];
    for (let value in PerPage)
      isNaN(Number(value)) || output.push(
        /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value, children: value }, value, !1, {
          fileName: "app/components/Filters.tsx",
          lineNumber: 73,
          columnNumber: 5
        }, this)
      );
    return output;
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
    "div",
    {
      className: `flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 space-y-4 space-x-0 md:space-y-0 md:space-x-5 ${className ?? ""}`,
      children: [
        shouldRenderPagination && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex flex-row items-center space-x-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { children: [
            totalItems.toLocaleString(),
            " Item",
            totalItems === 1 ? "" : "s"
          ] }, void 0, !0, {
            fileName: "app/components/Filters.tsx",
            lineNumber: 89,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { children: [
            "Page",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("select", { value: page, onChange: onChangePage, children: pageSelectOptions }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 94,
              columnNumber: 7
            }, this),
            totalPages ? ` of ${totalPages}` : ""
          ] }, void 0, !0, {
            fileName: "app/components/Filters.tsx",
            lineNumber: 92,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("select", { value: perPage, onChange: onChangePerPage, children: perPageOptions }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 100,
              columnNumber: 7
            }, this),
            " ",
            "per page"
          ] }, void 0, !0, {
            fileName: "app/components/Filters.tsx",
            lineNumber: 99,
            columnNumber: 6
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Filters.tsx",
          lineNumber: 88,
          columnNumber: 5
        }, this),
        shouldRenderSortBy && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex flex-row items-center", children: [
          "Sort by",
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("select", { className: "ml-1", value: sortBy, onChange: onChangeSortBy, children: [
            sortByOptions.includes("RecentlyTagged" /* RecentlyTagged */) && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: "RecentlyTagged" /* RecentlyTagged */, children: "Recently Tagged" }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 113,
              columnNumber: 8
            }, this),
            sortByOptions.includes("DateAddedOldToNew" /* DateAddedOldToNew */) && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: "DateAddedOldToNew" /* DateAddedOldToNew */, children: "Date Added (Old to New)" }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 116,
              columnNumber: 8
            }, this),
            sortByOptions.includes("DateSavedOldToNew" /* DateSavedOldToNew */) && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: "DateSavedOldToNew" /* DateSavedOldToNew */, children: "Date Saved (Old to New)" }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 121,
              columnNumber: 8
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Filters.tsx",
            lineNumber: 111,
            columnNumber: 6
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Filters.tsx",
          lineNumber: 109,
          columnNumber: 5
        }, this),
        shouldRenderViewAs && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "hidden md:flex flex-row items-center", children: [
          "View as",
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("select", { className: "ml-1", value: viewAs, onChange: onChangeViewAs, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: "Cards" /* Cards */, children: "Cards" }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 133,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: "Compact" /* Compact */, children: "Compact" }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 134,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("option", { value: "List" /* List */, children: "List" }, void 0, !1, {
              fileName: "app/components/Filters.tsx",
              lineNumber: 135,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Filters.tsx",
            lineNumber: 132,
            columnNumber: 6
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Filters.tsx",
          lineNumber: 130,
          columnNumber: 5
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/Filters.tsx",
      lineNumber: 82,
      columnNumber: 3
    },
    this
  );
}, Filters_default = Filters;

// app/hooks/useFilters.ts
var useFilters = ({
  totalItems,
  defaultPage = 1,
  defaultPerPage = 20,
  defaultSortBy = "DateAddedOldToNew" /* DateAddedOldToNew */,
  defaultViewAs = "Cards" /* Cards */
} = {}) => {
  let navigate = (0, import_react45.useNavigate)(), { pathname, search } = (0, import_react45.useLocation)(), queryParams = new URLSearchParams(search), page = parseInt(queryParams.get("page") ?? "1", 10) || defaultPage, perPage = parseInt(queryParams.get("perPage") ?? "20", 10) || defaultPerPage, sortBy = queryParams.get("sortBy") ?? defaultSortBy, viewAs = queryParams.get("viewAs") ?? defaultViewAs, updateQueryParams = (0, import_react44.useCallback)(
    (paramsToUpdate = {}) => {
      let queryParams2 = new URLSearchParams(search);
      return Object.keys(paramsToUpdate).forEach((paramName) => {
        let value = paramsToUpdate[paramName];
        value ? queryParams2.set(paramName, value) : queryParams2.delete(paramName);
      }), navigate(`${pathname}?${queryParams2.toString()}`);
    },
    [navigate, pathname, search]
  ), onChangePage = (0, import_react44.useCallback)(
    (event) => updateQueryParams({ page: event.target.value }),
    [updateQueryParams]
  ), onChangePerPage = (0, import_react44.useCallback)(
    (event) => updateQueryParams({ perPage: event.target.value, page: "1" }),
    [updateQueryParams]
  ), onChangeSortBy = (0, import_react44.useCallback)(
    (event) => updateQueryParams({ sortBy: event.target.value }),
    [updateQueryParams]
  ), onChangeViewAs = (0, import_react44.useCallback)(
    (event) => updateQueryParams({ viewAs: event.target.value }),
    [updateQueryParams]
  );
  return (0, import_react44.useMemo)(
    () => ({
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
    }),
    [
      totalItems,
      page,
      onChangePage,
      perPage,
      onChangePerPage,
      sortBy,
      onChangeSortBy,
      viewAs,
      onChangeViewAs
    ]
  );
}, useFilters_default = useFilters;

// app/components/ViewEntityAndAudioItems.tsx
var import_client7 = require("@prisma/client"), import_jsx_dev_runtime32 = require("react/jsx-dev-runtime"), ViewEntityAndAudioItems = ({
  entity,
  audioItems,
  totalAudioItems,
  className
}) => {
  let { name } = entity ?? {}, { search } = (0, import_react46.useLocation)(), viewAs = new URLSearchParams(search).get("viewAs"), { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalAudioItems
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { className: `flex flex-1 flex-col ${className ?? ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
      Breadcrumb_default,
      {
        items: [
          {
            label: Entity_default.makeReadableNamePlural(entity),
            href: Entity_default.makeHrefForTopLevel(entity)
          },
          { label: name }
        ],
        className: "mb-2"
      },
      void 0,
      !1,
      {
        fileName: "app/components/ViewEntityAndAudioItems.tsx",
        lineNumber: 38,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { className: "text-gray-500 text-sm flex-col space-y-2", children: [
      entity.description && /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: entity.description }, void 0, !1, {
        fileName: "app/components/ViewEntityAndAudioItems.tsx",
        lineNumber: 50,
        columnNumber: 28
      }, this),
      entity.aliases && /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: [
        "Also known as: ",
        entity.aliases
      ] }, void 0, !0, {
        fileName: "app/components/ViewEntityAndAudioItems.tsx",
        lineNumber: 51,
        columnNumber: 24
      }, this),
      entity.entityType === import_client7.EntityType.Tune && /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_jsx_dev_runtime32.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: [
          "Type: ",
          entity.type
        ] }, void 0, !0, {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 54,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: [
          "Meter: ",
          entity.meter
        ] }, void 0, !0, {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 55,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: [
          "Mode: ",
          entity.mode
        ] }, void 0, !0, {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 56,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: [
          "ABC: ",
          entity.abc
        ] }, void 0, !0, {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 57,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
          "a",
          {
            href: `https://thesession.org/tunes/${entity.theSessionTuneId}`,
            target: "_blank",
            rel: "noreferrer",
            children: "View or Edit This Tune on The Session \u2197"
          },
          void 0,
          !1,
          {
            fileName: "app/components/ViewEntityAndAudioItems.tsx",
            lineNumber: 59,
            columnNumber: 8
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 58,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/ViewEntityAndAudioItems.tsx",
        lineNumber: 53,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/ViewEntityAndAudioItems.tsx",
      lineNumber: 49,
      columnNumber: 4
    }, this),
    totalAudioItems > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_jsx_dev_runtime32.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { className: "sticky py-3 px-2 mt-4 -ml-2 -mr-2 mb-2 bg-gray-100 top-[48px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
        Filters2,
        {
          ...filtersProps,
          sortByOptions: ["DateAddedOldToNew" /* DateAddedOldToNew */],
          sortBy: "DateAddedOldToNew" /* DateAddedOldToNew */
        },
        void 0,
        !1,
        {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 76,
          columnNumber: 7
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/ViewEntityAndAudioItems.tsx",
        lineNumber: 75,
        columnNumber: 6
      }, this),
      audioItems.map((audioItem, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
        AudioItem_default,
        {
          viewAs: viewAs ?? "Cards" /* Cards */,
          audioItem,
          className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
        },
        index,
        !1,
        {
          fileName: "app/components/ViewEntityAndAudioItems.tsx",
          lineNumber: 83,
          columnNumber: 7
        },
        this
      ))
    ] }, void 0, !0, {
      fileName: "app/components/ViewEntityAndAudioItems.tsx",
      lineNumber: 74,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/ViewEntityAndAudioItems.tsx",
    lineNumber: 37,
    columnNumber: 3
  }, this);
}, ViewEntityAndAudioItems_default = ViewEntityAndAudioItems;

// app/routes/entities/collections/$slug.tsx
var import_jsx_dev_runtime33 = require("react/jsx-dev-runtime");
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
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "DateAddedOldToNew" /* DateAddedOldToNew */) === "DateAddedOldToNew" /* DateAddedOldToNew */ ? { createdAt: "asc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
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
  let { collection, audioItems, totalAudioItems } = (0, import_react47.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime33.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime33.jsxDEV)(
    ViewEntityAndAudioItems_default,
    {
      entity: collection,
      audioItems,
      totalAudioItems
    },
    void 0,
    !1,
    {
      fileName: "app/routes/entities/collections/$slug.tsx",
      lineNumber: 110,
      columnNumber: 4
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/entities/collections/$slug.tsx",
    lineNumber: 109,
    columnNumber: 3
  }, this);
}, slug_default2 = ViewCollectionBySlug;

// app/routes/entities/collections/index.tsx
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default,
  loader: () => loader5,
  meta: () => meta2
});
var import_react48 = require("@remix-run/react");
var import_jsx_dev_runtime34 = require("react/jsx-dev-runtime");
function meta2() {
  return [
    {
      title: "Trad Archive - Collections"
    }
  ];
}
function loader5() {
  return db.collection.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Collections = () => {
  let collections = (0, import_react48.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("h1", { className: "mb-6", children: "Collections" }, void 0, !1, {
      fileName: "app/routes/entities/collections/index.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this),
    collections.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("div", { className: "text-gray-500", children: "No Collections found" }, void 0, !1, {
      fileName: "app/routes/entities/collections/index.tsx",
      lineNumber: 32,
      columnNumber: 5
    }, this),
    collections.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("ul", { children: collections.map((collection, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("li", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)(import_react48.Link, { to: Entity_default.makeHrefForView(collection), children: collection.name }, void 0, !1, {
      fileName: "app/routes/entities/collections/index.tsx",
      lineNumber: 38,
      columnNumber: 8
    }, this) }, index, !1, {
      fileName: "app/routes/entities/collections/index.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)) }, void 0, !1, {
      fileName: "app/routes/entities/collections/index.tsx",
      lineNumber: 35,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entities/collections/index.tsx",
    lineNumber: 29,
    columnNumber: 3
  }, this);
}, collections_default = Collections;

// app/routes/entities/instruments/$slug.tsx
var slug_exports3 = {};
__export(slug_exports3, {
  default: () => slug_default3,
  loader: () => loader6
});
var import_react49 = require("@remix-run/react");
var import_jsx_dev_runtime35 = require("react/jsx-dev-runtime");
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
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "DateAddedOldToNew" /* DateAddedOldToNew */) === "DateAddedOldToNew" /* DateAddedOldToNew */ ? { createdAt: "asc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
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
  let { instrument, audioItems, totalAudioItems } = (0, import_react49.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(
    ViewEntityAndAudioItems_default,
    {
      entity: instrument,
      audioItems,
      totalAudioItems
    },
    void 0,
    !1,
    {
      fileName: "app/routes/entities/instruments/$slug.tsx",
      lineNumber: 111,
      columnNumber: 4
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/entities/instruments/$slug.tsx",
    lineNumber: 110,
    columnNumber: 3
  }, this);
}, slug_default3 = ViewInstrumentBySlug;

// app/routes/entities/instruments/index.tsx
var instruments_exports = {};
__export(instruments_exports, {
  action: () => action,
  default: () => instruments_default,
  loader: () => loader7,
  meta: () => meta3
});
var import_react50 = require("@remix-run/react"), import_node5 = require("@remix-run/node");
var import_jsx_dev_runtime36 = require("react/jsx-dev-runtime");
function meta3() {
  return [
    {
      title: "Trad Archive - Instruments"
    }
  ];
}
function loader7() {
  return db.instrument.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var action = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(
    referer ? new URL(referer).pathname : "/"
  );
  if (!userId)
    return (0, import_node5.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), name = String(formData.get("name") ?? ""), slug = String(formData.get("slug") ?? ""), description = String(formData.get("description") ?? ""), aliases = String(formData.get("aliases") ?? ""), cleanedSlug = Entity_default.cleanSlug(slug), error;
  if ((!name || !slug) && (error = "Must enter a name and slug"), error)
    return (0, import_node5.json)({ error }, { status: 400 });
  let existing = await db.instrument.findFirst({
    where: { slug: cleanedSlug }
  });
  if (existing)
    return (0, import_node5.json)(
      {
        error: `This slug is already being used for an existing Instrument: ${existing.name}`
      },
      { status: 400 }
    );
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
    return (0, import_node5.json)({ instrument }, { status: 201 });
  } catch {
    return (0, import_node5.json)(
      { error: "Error creating Instrument" },
      { status: 500 }
    );
  }
}, Instruments = () => {
  let instruments = (0, import_react50.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime36.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime36.jsxDEV)("h1", { className: "mb-6", children: "Instruments" }, void 0, !1, {
      fileName: "app/routes/entities/instruments/index.tsx",
      lineNumber: 97,
      columnNumber: 4
    }, this),
    instruments.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime36.jsxDEV)("div", { className: "text-gray-500", children: "No Instruments found" }, void 0, !1, {
      fileName: "app/routes/entities/instruments/index.tsx",
      lineNumber: 99,
      columnNumber: 5
    }, this),
    instruments.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime36.jsxDEV)("ul", { children: instruments.map((instrument, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime36.jsxDEV)("li", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime36.jsxDEV)(import_react50.Link, { to: Entity_default.makeHrefForView(instrument), children: instrument.name }, void 0, !1, {
      fileName: "app/routes/entities/instruments/index.tsx",
      lineNumber: 105,
      columnNumber: 8
    }, this) }, index, !1, {
      fileName: "app/routes/entities/instruments/index.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)) }, void 0, !1, {
      fileName: "app/routes/entities/instruments/index.tsx",
      lineNumber: 102,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entities/instruments/index.tsx",
    lineNumber: 96,
    columnNumber: 3
  }, this);
}, instruments_default = Instruments;

// app/routes/entities/people/$slug.tsx
var slug_exports4 = {};
__export(slug_exports4, {
  default: () => slug_default4,
  loader: () => loader8
});
var import_react51 = require("@remix-run/react");
var import_jsx_dev_runtime37 = require("react/jsx-dev-runtime");
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
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "DateAddedOldToNew" /* DateAddedOldToNew */) === "DateAddedOldToNew" /* DateAddedOldToNew */ ? { createdAt: "asc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
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
  let { person, audioItems, totalAudioItems } = (0, import_react51.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime37.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime37.jsxDEV)(
    ViewEntityAndAudioItems_default,
    {
      entity: person,
      audioItems,
      totalAudioItems
    },
    void 0,
    !1,
    {
      fileName: "app/routes/entities/people/$slug.tsx",
      lineNumber: 109,
      columnNumber: 4
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/entities/people/$slug.tsx",
    lineNumber: 108,
    columnNumber: 3
  }, this);
}, slug_default4 = ViewPersonBySlug;

// app/routes/entities/people/index.tsx
var people_exports = {};
__export(people_exports, {
  action: () => action2,
  default: () => people_default,
  loader: () => loader9,
  meta: () => meta4
});
var import_react52 = require("@remix-run/react"), import_node6 = require("@remix-run/node");
var import_jsx_dev_runtime38 = require("react/jsx-dev-runtime");
function meta4() {
  return [
    {
      title: "Trad Archive - People"
    }
  ];
}
function loader9() {
  return db.person.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var action2 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(
    referer ? new URL(referer).pathname : "/"
  );
  if (!userId)
    return (0, import_node6.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), firstName = String(formData.get("first_name") ?? ""), middleName = String(formData.get("middle_name") ?? ""), lastName = String(formData.get("last_name") ?? ""), slug = String(formData.get("slug") ?? ""), description = String(formData.get("description") ?? ""), aliases = String(formData.get("aliases") ?? ""), name = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`, cleanedSlug = Entity_default.cleanSlug(slug), error;
  if ((!firstName || !lastName || !slug) && (error = "Must enter first name, last name, and slug"), error)
    return (0, import_node6.json)({ error }, { status: 400 });
  let existing = await db.person.findFirst({ where: { slug: cleanedSlug } });
  if (existing)
    return (0, import_node6.json)(
      {
        error: `This slug is already being used for an existing Person: ${existing.name}`
      },
      { status: 400 }
    );
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
    return (0, import_node6.json)({ person }, { status: 201 });
  } catch {
    return (0, import_node6.json)(
      { error: "Error creating Person" },
      { status: 500 }
    );
  }
}, People = () => {
  let people = (0, import_react52.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime38.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime38.jsxDEV)("h1", { className: "mb-6", children: "People" }, void 0, !1, {
      fileName: "app/routes/entities/people/index.tsx",
      lineNumber: 103,
      columnNumber: 4
    }, this),
    people.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime38.jsxDEV)("div", { className: "text-gray-500", children: "No People found" }, void 0, !1, {
      fileName: "app/routes/entities/people/index.tsx",
      lineNumber: 105,
      columnNumber: 5
    }, this),
    people.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime38.jsxDEV)("ul", { children: people.map((person, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime38.jsxDEV)("li", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime38.jsxDEV)(import_react52.Link, { to: Entity_default.makeHrefForView(person), children: person.name }, void 0, !1, {
      fileName: "app/routes/entities/people/index.tsx",
      lineNumber: 111,
      columnNumber: 8
    }, this) }, index, !1, {
      fileName: "app/routes/entities/people/index.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this)) }, void 0, !1, {
      fileName: "app/routes/entities/people/index.tsx",
      lineNumber: 108,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entities/people/index.tsx",
    lineNumber: 102,
    columnNumber: 3
  }, this);
}, people_default = People;

// app/routes/entities/places/$slug.tsx
var slug_exports5 = {};
__export(slug_exports5, {
  default: () => slug_default5,
  loader: () => loader10
});
var import_react53 = require("@remix-run/react");
var import_jsx_dev_runtime39 = require("react/jsx-dev-runtime");
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
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "DateAddedOldToNew" /* DateAddedOldToNew */) === "DateAddedOldToNew" /* DateAddedOldToNew */ ? { createdAt: "asc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
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
  let { place, audioItems, totalAudioItems } = (0, import_react53.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime39.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime39.jsxDEV)(
    ViewEntityAndAudioItems_default,
    {
      entity: place,
      audioItems,
      totalAudioItems
    },
    void 0,
    !1,
    {
      fileName: "app/routes/entities/places/$slug.tsx",
      lineNumber: 109,
      columnNumber: 4
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/entities/places/$slug.tsx",
    lineNumber: 108,
    columnNumber: 3
  }, this);
}, slug_default5 = ViewPlaceBySlug;

// app/routes/entities/places/index.tsx
var places_exports = {};
__export(places_exports, {
  default: () => places_default,
  loader: () => loader11,
  meta: () => meta5
});
var import_react54 = require("@remix-run/react");
var import_jsx_dev_runtime40 = require("react/jsx-dev-runtime");
function meta5() {
  return [
    {
      title: "Trad Archive - Places"
    }
  ];
}
function loader11() {
  return db.place.findMany({
    orderBy: {
      name: "asc"
    }
  });
}
var Places = () => {
  let places = (0, import_react54.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime40.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime40.jsxDEV)("h1", { className: "mb-6", children: "Places" }, void 0, !1, {
      fileName: "app/routes/entities/places/index.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this),
    places.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime40.jsxDEV)("div", { className: "text-gray-500", children: "No Places found" }, void 0, !1, {
      fileName: "app/routes/entities/places/index.tsx",
      lineNumber: 32,
      columnNumber: 5
    }, this),
    places.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime40.jsxDEV)("ul", { children: places.map((place, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime40.jsxDEV)("li", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime40.jsxDEV)(import_react54.Link, { to: Entity_default.makeHrefForView(place), children: place.name }, void 0, !1, {
      fileName: "app/routes/entities/places/index.tsx",
      lineNumber: 38,
      columnNumber: 8
    }, this) }, index, !1, {
      fileName: "app/routes/entities/places/index.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)) }, void 0, !1, {
      fileName: "app/routes/entities/places/index.tsx",
      lineNumber: 35,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entities/places/index.tsx",
    lineNumber: 29,
    columnNumber: 3
  }, this);
}, places_default = Places;

// app/routes/entities/tunes/$slug.tsx
var slug_exports6 = {};
__export(slug_exports6, {
  default: () => slug_default6,
  loader: () => loader12
});
var import_react55 = require("@remix-run/react");
var import_jsx_dev_runtime41 = require("react/jsx-dev-runtime");
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
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), audioItemsOrderBy = (searchParams.get("sortBy") ?? "DateAddedOldToNew" /* DateAddedOldToNew */) === "DateAddedOldToNew" /* DateAddedOldToNew */ ? { createdAt: "asc" } : { createdAt: "desc" }, [audioItems, totalAudioItems] = await Promise.all([
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
  let { tune, audioItems, totalAudioItems } = (0, import_react55.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime41.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime41.jsxDEV)(
    ViewEntityAndAudioItems_default,
    {
      entity: tune,
      audioItems,
      totalAudioItems
    },
    void 0,
    !1,
    {
      fileName: "app/routes/entities/tunes/$slug.tsx",
      lineNumber: 109,
      columnNumber: 4
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/entities/tunes/$slug.tsx",
    lineNumber: 108,
    columnNumber: 3
  }, this);
}, slug_default6 = ViewTuneBySlug;

// app/routes/entities/tunes/index.tsx
var tunes_exports = {};
__export(tunes_exports, {
  default: () => tunes_default,
  loader: () => loader13,
  meta: () => meta6
});
var import_react56 = require("@remix-run/react");
var import_jsx_dev_runtime42 = require("react/jsx-dev-runtime");
function meta6() {
  return [
    {
      title: "Trad Archive - Tunes"
    }
  ];
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
  let { tunes, totalTunes } = (0, import_react56.useLoaderData)(), { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: totalTunes,
    defaultPerPage: PER_PAGE
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)("h1", { children: "Tunes" }, void 0, !1, {
      fileName: "app/routes/entities/tunes/index.tsx",
      lineNumber: 61,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)("div", { className: "text-gray-500 text-sm mt-2", children: [
      "All tunes are sourced from",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)("a", { href: "https://thesession.org", target: "_blank", rel: "noreferrer", children: "The Session \u2197" }, void 0, !1, {
        fileName: "app/routes/entities/tunes/index.tsx",
        lineNumber: 65,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/entities/tunes/index.tsx",
      lineNumber: 63,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)(
      Filters2,
      {
        ...filtersProps,
        sortBy: void 0,
        viewAs: void 0,
        className: "sticky left-0 right-0 py-3 bg-gray-100 top-[48px] mt-4 mb-6"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/entities/tunes/index.tsx",
        lineNumber: 70,
        columnNumber: 4
      },
      this
    ),
    tunes.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)("div", { className: "text-gray-500", children: "No Tunes found" }, void 0, !1, {
      fileName: "app/routes/entities/tunes/index.tsx",
      lineNumber: 78,
      columnNumber: 5
    }, this),
    tunes.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)("ul", { className: "space-y-2", children: tunes.map((tune, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime42.jsxDEV)(import_react56.Link, { to: Entity_default.makeHrefForView(tune), children: tune.name }, void 0, !1, {
      fileName: "app/routes/entities/tunes/index.tsx",
      lineNumber: 84,
      columnNumber: 8
    }, this) }, index, !1, {
      fileName: "app/routes/entities/tunes/index.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this)) }, void 0, !1, {
      fileName: "app/routes/entities/tunes/index.tsx",
      lineNumber: 81,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/entities/tunes/index.tsx",
    lineNumber: 60,
    columnNumber: 3
  }, this);
}, tunes_default = Tunes;

// app/routes/choose-new-password.tsx
var choose_new_password_exports = {};
__export(choose_new_password_exports, {
  action: () => action3,
  default: () => ChooseNewPassword,
  loader: () => loader14
});
var import_node7 = require("@remix-run/node"), import_react57 = require("@remix-run/react"), import_bcryptjs = __toESM(require("bcryptjs")), import_isAfter = __toESM(require("date-fns/isAfter"));
var import_jsx_dev_runtime43 = require("react/jsx-dev-runtime"), loader14 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), validationError = session.get("validationError") || null, error = null, params = new URL(request.url).searchParams, userEmail = params.get("userEmail") ?? "", tokenUnhashed = params.get("tokenUnhashed") ?? "", user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user || !user.autoLoginTokenHashed || !user.autoLoginTokenExpiry)
    return (0, import_node7.redirect)("/reset-password");
  let tokenIsMatch = await import_bcryptjs.default.compare(
    tokenUnhashed,
    user.autoLoginTokenHashed
  ), expiryIsValid = (0, import_isAfter.default)(
    new Date(user.autoLoginTokenExpiry),
    new Date()
  );
  return (!tokenIsMatch || !expiryIsValid) && (error = "Reset password link is invalid or expired. Please request another one."), (0, import_node7.json)(
    { validationError, error },
    {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    }
  );
}, action3 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), { searchParams } = new URL(request.url), formData = await request.formData(), email = String(formData.get("email") ?? ""), password = String(formData.get("password") ?? ""), passwordConfirm = String(formData.get("password_confirm") ?? "");
  if (password !== passwordConfirm)
    return session.flash("validationError", "Passwords don't match"), (0, import_node7.redirect)(`/choose-new-password?${searchParams.toString()}`, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  let user = await db.user.findUnique({ where: { email } });
  if (!user)
    return (0, import_node7.redirect)("/reset-password");
  let newPasswordHashed = import_bcryptjs.default.hashSync(password, 10);
  return await db.user.update({
    where: { email },
    data: {
      passwordHashed: newPasswordHashed,
      autoLoginTokenHashed: null,
      autoLoginTokenExpiry: null
    }
  }), session.set("userId", user.id), (0, import_node7.redirect)("/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function ChooseNewPassword() {
  let transition = (0, import_react57.useTransition)(), { error, validationError } = (0, import_react57.useLoaderData)(), [searchParams] = (0, import_react57.useSearchParams)(), email = searchParams.get("userEmail") ?? "";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("h1", { className: "mb-6", children: "Choose a new password" }, void 0, !1, {
      fileName: "app/routes/choose-new-password.tsx",
      lineNumber: 112,
      columnNumber: 4
    }, this),
    error ? /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("p", { className: "text-red-600 mb-6", children: error }, void 0, !1, {
        fileName: "app/routes/choose-new-password.tsx",
        lineNumber: 116,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)(import_react57.Link, { to: "/reset-password", children: "Reset Password" }, void 0, !1, {
        fileName: "app/routes/choose-new-password.tsx",
        lineNumber: 117,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/choose-new-password.tsx",
      lineNumber: 115,
      columnNumber: 5
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("div", { className: "flex flex-col align-start max-w-xs", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("form", { method: "POST", className: "space-y-4 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)(
          "input",
          {
            type: "password",
            placeholder: "New password",
            autoFocus: !0,
            required: !0,
            name: "password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/choose-new-password.tsx",
            lineNumber: 122,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)(
          "input",
          {
            type: "password",
            placeholder: "New password (again)",
            required: !0,
            name: "password_confirm"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/choose-new-password.tsx",
            lineNumber: 129,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("input", { type: "hidden", name: "email", value: email }, void 0, !1, {
          fileName: "app/routes/choose-new-password.tsx",
          lineNumber: 135,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)(
          "input",
          {
            type: "submit",
            className: "btn w-auto",
            disabled: transition.state === "submitting",
            value: "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/choose-new-password.tsx",
            lineNumber: 137,
            columnNumber: 7
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/choose-new-password.tsx",
        lineNumber: 121,
        columnNumber: 6
      }, this),
      validationError && /* @__PURE__ */ (0, import_jsx_dev_runtime43.jsxDEV)("div", { className: "text-red-600", children: validationError }, void 0, !1, {
        fileName: "app/routes/choose-new-password.tsx",
        lineNumber: 146,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/choose-new-password.tsx",
      lineNumber: 120,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/choose-new-password.tsx",
    lineNumber: 111,
    columnNumber: 3
  }, this);
}

// app/routes/reset-password.tsx
var reset_password_exports = {};
__export(reset_password_exports, {
  action: () => action4,
  default: () => ResetPassword,
  loader: () => loader15
});
var import_node8 = require("@remix-run/node"), import_react58 = require("@remix-run/react"), import_mail = __toESM(require("@sendgrid/mail")), import_bcryptjs2 = __toESM(require("bcryptjs")), import_uuid = require("uuid"), import_addMinutes = __toESM(require("date-fns/addMinutes"));
var import_jsx_dev_runtime44 = require("react/jsx-dev-runtime"), loader15 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), error = session.get("error") || null, confirmation = session.get("confirmation") || null;
  return (0, import_node8.json)(
    { error, confirmation },
    {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    }
  );
}, action4 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), formData = await request.formData(), email = String(formData.get("email") ?? ""), user = await db.user.findUnique({ where: { email } });
  if (!user)
    return session.flash("error", "Could not find a user with that email"), (0, import_node8.redirect)("/reset-password", {
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
  return await import_mail.default.send(data), session.flash(
    "confirmation",
    "Check your email for a link to reset your password"
  ), (0, import_node8.redirect)("/reset-password", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function ResetPassword() {
  let transition = (0, import_react58.useTransition)(), { error, confirmation } = (0, import_react58.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("h1", { className: "mb-4", children: "Reset your password" }, void 0, !1, {
      fileName: "app/routes/reset-password.tsx",
      lineNumber: 109,
      columnNumber: 4
    }, this),
    confirmation ? /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("div", { className: "flex flex-row items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("i", { className: "material-icons mr-1", children: "mail_outline" }, void 0, !1, {
        fileName: "app/routes/reset-password.tsx",
        lineNumber: 113,
        columnNumber: 6
      }, this),
      confirmation
    ] }, void 0, !0, {
      fileName: "app/routes/reset-password.tsx",
      lineNumber: 112,
      columnNumber: 5
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)(import_jsx_dev_runtime44.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("p", { className: "text-gray-500 mb-4", children: "We'll send you an email with a link to reset your password." }, void 0, !1, {
        fileName: "app/routes/reset-password.tsx",
        lineNumber: 118,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("div", { className: "flex flex-col align-start max-w-xs", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("form", { method: "POST", className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)(
            "input",
            {
              type: "text",
              placeholder: "Email",
              autoFocus: !0,
              required: !0,
              name: "email"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/reset-password.tsx",
              lineNumber: 123,
              columnNumber: 8
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)(
            "input",
            {
              type: "submit",
              className: "btn w-auto",
              disabled: transition.state === "submitting",
              value: "Send Email"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/reset-password.tsx",
              lineNumber: 131,
              columnNumber: 8
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/reset-password.tsx",
          lineNumber: 122,
          columnNumber: 7
        }, this),
        error && /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("div", { className: "text-red-600 mb-6", children: error }, void 0, !1, {
          fileName: "app/routes/reset-password.tsx",
          lineNumber: 139,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime44.jsxDEV)(import_react58.Link, { to: "/login", children: "Go back" }, void 0, !1, {
          fileName: "app/routes/reset-password.tsx",
          lineNumber: 142,
          columnNumber: 8
        }, this) }, void 0, !1, {
          fileName: "app/routes/reset-password.tsx",
          lineNumber: 141,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/reset-password.tsx",
        lineNumber: 121,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/reset-password.tsx",
      lineNumber: 117,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/reset-password.tsx",
    lineNumber: 108,
    columnNumber: 3
  }, this);
}

// app/routes/account/index.tsx
var account_exports = {};
__export(account_exports, {
  default: () => AccountHome,
  loader: () => loader16
});
var import_react59 = require("@remix-run/react"), import_node9 = require("@remix-run/node");
var import_jsx_dev_runtime45 = require("react/jsx-dev-runtime"), loader16 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), currentUserId = String(session.get("userId") ?? ""), currentUser = await db.user.findUnique({
    where: { id: currentUserId }
  });
  if (!currentUser) {
    let params = new URLSearchParams();
    return params.set("redirectTo", "/account"), (0, import_node9.redirect)(`/login?${params.toString()}`);
  }
  return (0, import_node9.json)({ currentUser });
};
function AccountHome() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime45.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime45.jsxDEV)("h1", { className: "mb-6", children: "Account" }, void 0, !1, {
      fileName: "app/routes/account/index.tsx",
      lineNumber: 31,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime45.jsxDEV)("div", { className: "flex flex-col space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime45.jsxDEV)(import_react59.Link, { to: "/reset-password", children: "Change Password" }, void 0, !1, {
        fileName: "app/routes/account/index.tsx",
        lineNumber: 33,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime45.jsxDEV)(import_react59.Link, { to: "/logout", children: "Log Out " }, void 0, !1, {
        fileName: "app/routes/account/index.tsx",
        lineNumber: 34,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/account/index.tsx",
      lineNumber: 32,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/account/index.tsx",
    lineNumber: 30,
    columnNumber: 3
  }, this);
}

// app/routes/relationships.tsx
var relationships_exports = {};
__export(relationships_exports, {
  loader: () => loader17
});
var import_node10 = require("@remix-run/node");
var loader17 = async ({ request }) => {
  let url = new URL(request.url), subjectEntityType = url.searchParams.get("subjectEntityType"), objectEntityType = url.searchParams.get("objectEntityType");
  if (!subjectEntityType || !objectEntityType)
    return (0, import_node10.json)(
      { error: "Must specify subject entity type and object entity type" },
      { status: 400 }
    );
  let relationships = await db.relationship.findMany({
    where: {
      subjectEntityType,
      objectEntityType
    }
  });
  return (0, import_node10.json)({ relationships }, { status: 200 });
};

// app/routes/saved-items.tsx
var saved_items_exports = {};
__export(saved_items_exports, {
  action: () => action5,
  default: () => SavedItems,
  loader: () => loader18
});
var import_react60 = require("@remix-run/react"), import_node11 = require("@remix-run/node");
var import_jsx_dev_runtime46 = require("react/jsx-dev-runtime"), loader18 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { pathname, searchParams } = new URL(request.url), redirectParams = new URLSearchParams({
    redirectTo: pathname
  });
  if (!userId)
    return (0, import_node11.redirect)(`/login?${redirectParams.toString()}`);
  let page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), [savedItems, totalSavedItems] = await Promise.all([
    db.savedItem.findMany({
      where: {
        userId
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: "asc"
      }
    }),
    db.savedItem.count({ where: { userId } })
  ]), savedAudioItemIds = savedItems.map((s) => s.audioItemId), audioItems = await db.audioItem.findMany({
    where: {
      id: {
        in: savedAudioItemIds
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
    }
  }), orderedAudioItems = [];
  for (let id of savedAudioItemIds)
    for (let a of audioItems)
      if (a.id === id) {
        orderedAudioItems.push(a);
        break;
      }
  return (0, import_node11.json)({ savedItems: orderedAudioItems, totalSavedItems });
}, action5 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectParams = new URLSearchParams({
    redirectTo: referer ? new URL(referer).pathname : "/"
  });
  if (!userId)
    return (0, import_node11.redirect)(`/login?${redirectParams.toString()}`);
  let formData = await request.formData(), audioItemId = String(formData.get("audioItemId") ?? ""), existing = await db.savedItem.findUnique({
    where: {
      userId_audioItemId: {
        userId,
        audioItemId
      }
    }
  });
  return existing ? await db.savedItem.delete({ where: { id: existing.id } }) : await db.savedItem.create({ data: { userId, audioItemId } }), (0, import_node11.json)({ ok: !0 }, { status: 200 });
};
function SavedItems() {
  let { savedItems, totalSavedItems } = (0, import_react60.useLoaderData)(), { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    totalItems: totalSavedItems,
    defaultViewAs: "Compact" /* Compact */
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)("h1", { className: "mb-6", children: "Saved Items" }, void 0, !1, {
      fileName: "app/routes/saved-items.tsx",
      lineNumber: 148,
      columnNumber: 5
    }, this),
    savedItems.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)(
      Filters2,
      {
        ...filtersProps,
        sortByOptions: ["DateSavedOldToNew" /* DateSavedOldToNew */],
        sortBy: "DateSavedOldToNew" /* DateSavedOldToNew */,
        className: "mb-6"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/saved-items.tsx",
        lineNumber: 151,
        columnNumber: 6
      },
      this
    ),
    savedItems.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)("div", { className: "text-gray-500", children: [
      "Nothing saved yet - try browsing some",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)(import_react60.Link, { to: "/", children: "Audio Items" }, void 0, !1, {
        fileName: "app/routes/saved-items.tsx",
        lineNumber: 162,
        columnNumber: 7
      }, this),
      "!"
    ] }, void 0, !0, {
      fileName: "app/routes/saved-items.tsx",
      lineNumber: 160,
      columnNumber: 6
    }, this),
    savedItems.map((s, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime46.jsxDEV)(
      AudioItem_default,
      {
        viewAs,
        audioItem: s,
        className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
      },
      index,
      !1,
      {
        fileName: "app/routes/saved-items.tsx",
        lineNumber: 167,
        columnNumber: 6
      },
      this
    ))
  ] }, void 0, !0, {
    fileName: "app/routes/saved-items.tsx",
    lineNumber: 147,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/saved-items.tsx",
    lineNumber: 146,
    columnNumber: 3
  }, this);
}

// app/routes/users/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => id_default,
  loader: () => loader19
});
var import_react61 = require("@remix-run/react"), import_node12 = require("@remix-run/node");
var import_jsx_dev_runtime47 = require("react/jsx-dev-runtime"), loader19 = async ({ params }) => {
  let user = await db.user.findUnique({ where: { id: params.id } });
  if (!user)
    throw new Response("Not Found", {
      status: 404,
      statusText: "Could not find a user with this ID"
    });
  return (0, import_node12.json)({ user });
}, ViewUserById = () => {
  let { user } = (0, import_react61.useLoaderData)(), { username, createdAt } = user;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)(Layout_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)("div", { className: "flex flex-col-reverse md:flex-row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)("div", { className: "flex flex-1 flex-col pb-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)(
      Breadcrumb_default,
      {
        className: "mb-6",
        items: [{ label: "Users" }, { label: username }]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/users/$id.tsx",
        lineNumber: 35,
        columnNumber: 6
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)("div", { className: "flex-col mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)("div", { children: [
      "Account Created:",
      /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/users/$id.tsx",
        lineNumber: 43,
        columnNumber: 8
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime47.jsxDEV)("span", { className: "text-gray-500", children: DateTime_default.formatDateYear(createdAt) }, void 0, !1, {
        fileName: "app/routes/users/$id.tsx",
        lineNumber: 44,
        columnNumber: 8
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/users/$id.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/routes/users/$id.tsx",
      lineNumber: 40,
      columnNumber: 6
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/users/$id.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this) }, void 0, !1, {
    fileName: "app/routes/users/$id.tsx",
    lineNumber: 33,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/users/$id.tsx",
    lineNumber: 32,
    columnNumber: 3
  }, this);
}, id_default = ViewUserById;

// app/routes/comments.tsx
var comments_exports = {};
__export(comments_exports, {
  action: () => action6
});
var import_node13 = require("@remix-run/node");
var action6 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(
    referer ? new URL(referer).pathname : "/"
  );
  if (!userId)
    return (0, import_node13.redirect)(`/login?redirectTo=${redirectTo}`);
  let formData = await request.formData(), text = String(formData.get("text") ?? ""), parentAudioItemId = String(formData.get("parentAudioItemId") ?? ""), error;
  if (text ? parentAudioItemId || (error = "Parent audio item ID not defined") : error = "Comment cannot be empty", error)
    return (0, import_node13.json)({ error }, { status: 400 });
  let comment = await db.comment.create({
    data: {
      text,
      parentAudioItemId,
      createdByUserId: userId
    }
  });
  return (0, import_node13.json)({ comment }, { status: 201 });
};

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  loader: () => loader20
});
var import_node14 = require("@remix-run/node");
var loader20 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  return (0, import_node14.redirect)("/login", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};

// app/routes/search.tsx
var search_exports = {};
__export(search_exports, {
  loader: () => loader21
});
var import_client8 = require("@prisma/client"), import_node15 = require("@remix-run/node");
var loader21 = async ({ request }) => {
  let url = new URL(request.url), searchTerm = url.searchParams.get("searchTerm") || "", entityTypes = url.searchParams.getAll("entityTypes");
  entityTypes.length === 0 && (entityTypes = [
    import_client8.EntityType.Person,
    import_client8.EntityType.Instrument,
    import_client8.EntityType.Place,
    import_client8.EntityType.Tune,
    import_client8.EntityType.Collection,
    import_client8.EntityType.AudioItem
  ]);
  let take = Number(url.searchParams.get("take") ?? 24);
  if (searchTerm.length < 3)
    return (0, import_node15.json)(
      { error: "Must include a search term of at least 3 letters" },
      { status: 400 }
    );
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
      case import_client8.EntityType.Person:
        queryPromises.push(personQuery);
        break;
      case import_client8.EntityType.Tune:
        queryPromises.push(tuneQuery);
        break;
      case import_client8.EntityType.Instrument:
        queryPromises.push(instrumentQuery);
        break;
      case import_client8.EntityType.Place:
        queryPromises.push(placeQuery);
        break;
      case import_client8.EntityType.Collection:
        queryPromises.push(collectionQuery);
        break;
      case import_client8.EntityType.AudioItem:
        queryPromises.push(audioItemQuery);
        break;
      default:
        break;
    }
  let results = (await Promise.all(queryPromises)).reduce(
    (prevVal, curVal) => [...prevVal, ...curVal],
    []
  );
  return (0, import_node15.json)({ results }, { status: 200 });
};

// app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action7,
  default: () => SignUp,
  loader: () => loader22
});
var import_react62 = require("@remix-run/react"), import_bcryptjs3 = __toESM(require("bcryptjs"));
var import_node16 = require("@remix-run/node");
var import_jsx_dev_runtime48 = require("react/jsx-dev-runtime"), loader22 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (session.has("userId"))
    return (0, import_node16.redirect)(redirectTo || "/");
  let data = { error: session.get("error") };
  return (0, import_node16.json)(data, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action7 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo"), formData = await request.formData(), email = String(formData.get("email") ?? ""), fullName = String(formData.get("full_name") ?? ""), password = String(formData.get("password") ?? ""), passwordConfirm = String(formData.get("password_confirm") ?? "");
  if (await db.user.findUnique({ where: { email } }))
    return session.flash(
      "error",
      "There is already a user with this email address. Try logging in?"
    ), (0, import_node16.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!new RegExp(
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  ).test(email))
    return session.flash("error", "Email is not valid"), (0, import_node16.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(fullName.split(" ").length >= 2))
    return session.flash("error", "Please enter your full name"), (0, import_node16.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(password === passwordConfirm))
    return session.flash("error", "Passwords don't match"), (0, import_node16.redirect)("/signup", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  if (!(password.length >= 8))
    return session.flash("error", "Password must be at least 8 characters long"), (0, import_node16.redirect)("/signup", {
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
  return session.set("userId", newUser.id), (0, import_node16.redirect)(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
function SignUp() {
  let { error } = (0, import_react62.useLoaderData)(), { state } = (0, import_react62.useTransition)(), { search } = (0, import_react62.useLocation)(), redirectTo = new URLSearchParams(search).get("redirectTo"), logInLinkQueryParams = new URLSearchParams(
    redirectTo ? { redirectTo } : void 0
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)("h1", { className: "mb-6", children: redirectTo ? "Create an account to continue" : "Create your account" }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 128,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)("div", { className: "flex flex-col align-start max-w-xs", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)("form", { method: "POST", className: "space-y-4 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(
          "input",
          {
            type: "text",
            name: "email",
            placeholder: "Your email",
            autoFocus: !0,
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 133,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(
          "input",
          {
            type: "text",
            name: "full_name",
            placeholder: "Your full name",
            required: !0
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 140,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(
          "input",
          {
            type: "password",
            name: "password",
            required: !0,
            placeholder: "Choose a password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 146,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(
          "input",
          {
            type: "password",
            name: "password_confirm",
            required: !0,
            placeholder: "Password (again)"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 152,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(
          "input",
          {
            type: "submit",
            className: "btn mb-4 w-auto",
            disabled: state === "submitting",
            value: "Sign Up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/signup.tsx",
            lineNumber: 158,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 132,
        columnNumber: 5
      }, this),
      error && /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)("div", { className: "text-red-600 mb-6", children: error }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 166,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)("div", { children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime48.jsxDEV)(import_react62.Link, { to: `/login?${logInLinkQueryParams.toString()}`, children: "Log in" }, void 0, !1, {
          fileName: "app/routes/signup.tsx",
          lineNumber: 170,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 168,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 131,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 127,
    columnNumber: 3
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Home,
  loader: () => loader23
});
var import_react63 = require("react"), import_react64 = require("@remix-run/react"), import_subMinutes = __toESM(require("date-fns/subMinutes"));

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
var import_jsx_dev_runtime49 = require("react/jsx-dev-runtime"), ProjectIntro = ({ className, onClose }) => /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)(
  "div",
  {
    className: `flex flex-col flex-grow bg-gray-200 rounded p-4 pl-16 lg:pl-20 relative ${className ?? ""}`,
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)(
        "img",
        {
          src: "/images/logo-square.png",
          className: "absolute top-5 -left-1 lg:-left-8 w-12 lg:w-20 -rotate-12",
          alt: "Logo"
        },
        void 0,
        !1,
        {
          fileName: "app/components/ProjectIntro.tsx",
          lineNumber: 13,
          columnNumber: 4
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("strong", { children: "Welcome!" }, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 18,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 19,
        columnNumber: 4
      }, this),
      "Trad Archive is an open source experiment by the Irish Traditional Music Archive and Dan Gurney.",
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 22,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 23,
        columnNumber: 4
      }, this),
      "You can...",
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 25,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("ul", { className: "list-disc list-inside", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("li", { children: "Listen to previously unreleased archival recordings" }, void 0, !1, {
          fileName: "app/components/ProjectIntro.tsx",
          lineNumber: 27,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("li", { children: "Help by tagging each recording with People, Tunes, Instruments, and Collections" }, void 0, !1, {
          fileName: "app/components/ProjectIntro.tsx",
          lineNumber: 28,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("li", { children: "Save favorites to listen later" }, void 0, !1, {
          fileName: "app/components/ProjectIntro.tsx",
          lineNumber: 32,
          columnNumber: 5
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 26,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("button", { className: "absolute top-2 right-2 btn-icon", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_dev_runtime49.jsxDEV)("i", { className: "material-icons", children: "close" }, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 35,
        columnNumber: 5
      }, this) }, void 0, !1, {
        fileName: "app/components/ProjectIntro.tsx",
        lineNumber: 34,
        columnNumber: 4
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ProjectIntro.tsx",
    lineNumber: 8,
    columnNumber: 3
  },
  this
), ProjectIntro_default = ProjectIntro;

// app/routes/index.tsx
var import_jsx_dev_runtime50 = require("react/jsx-dev-runtime");
async function loader23({
  request
}) {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), { searchParams } = new URL(request.url), page = Number(searchParams.get("page") ?? 1), perPage = Number(searchParams.get("perPage") ?? 20), recentTags = await db.tag.findMany({
    select: {
      subjectAudioItemId: !0,
      createdAt: !0
    },
    where: {
      subjectAudioItemId: {
        not: null
      },
      createdAt: {
        lt: (0, import_subMinutes.default)(new Date(), 5)
      }
    },
    distinct: ["subjectAudioItemId"],
    orderBy: {
      createdAt: "desc"
    },
    skip: (page - 1) * perPage,
    take: perPage
  }), recentlyTaggedAudioItemIds = [];
  for (let r of recentTags)
    r.subjectAudioItemId && recentlyTaggedAudioItemIds.push(r.subjectAudioItemId);
  let [
    audioItems,
    collections,
    comments,
    numAudioItemsAllTime,
    numTagsAllTime,
    numCommentsAllTime
  ] = await Promise.all([
    db.audioItem.findMany({
      where: {
        id: {
          in: recentlyTaggedAudioItemIds
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
  ]), orderedAudioItems = [];
  for (let id of recentlyTaggedAudioItemIds)
    for (let a of audioItems)
      if (a.id === id) {
        orderedAudioItems.push(a);
        break;
      }
  return {
    audioItems: orderedAudioItems,
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
  } = (0, import_react64.useLoaderData)(), { search } = (0, import_react64.useLocation)(), viewAs = new URLSearchParams(search).get("viewAs") ?? "Cards" /* Cards */, { Filters: Filters2, filtersProps } = useFilters_default({
    totalItems: numAudioItemsAllTime
  }), [shouldShowIntro, setShouldShowIntro] = (0, import_react63.useState)(!1);
  (0, import_react63.useEffect)(() => {
    LocalStorage_default.getItem("SHOULD_SHOW_INTRO") !== "false" && setShouldShowIntro(!0);
  }, []);
  let onCloseIntro = (0, import_react63.useCallback)(() => {
    LocalStorage_default.setItem("SHOULD_SHOW_INTRO", "false"), setShouldShowIntro(!1);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(Layout_default, { children: [
    shouldShowIntro && /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(
      ProjectIntro_default,
      {
        className: "mb-8 md:mt-4 md:mb-12",
        onClose: onCloseIntro
      },
      void 0,
      !1,
      {
        fileName: "app/routes/index.tsx",
        lineNumber: 195,
        columnNumber: 5
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: "flex flex-col md:flex-row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: "flex flex-1 flex-col pb-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("h1", { children: "Explore" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 203,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(
          Filters2,
          {
            ...filtersProps,
            viewAs: void 0,
            sortBy: "RecentlyTagged" /* RecentlyTagged */,
            sortByOptions: ["RecentlyTagged" /* RecentlyTagged */],
            className: "sticky left-0 right-0 py-3 px-2 -ml-2 -mr-2 mt-1 mb-2 bg-gray-100 top-[48px]"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 205,
            columnNumber: 6
          },
          this
        ),
        audioItems.map((audioItem, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(
          AudioItem_default,
          {
            viewAs,
            audioItem,
            className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
          },
          index,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 214,
            columnNumber: 7
          },
          this
        ))
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 202,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("h3", { className: "mb-4", children: "Browse" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 224,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: "/entities/people", className: "mb-2", children: "People" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 225,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: "/entities/tunes", className: "mb-2", children: "Tunes" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 228,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: "/entities/instruments", className: "mb-2", children: "Instruments" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 231,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: "/entities/collections", className: "mb-2", children: "Collections" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 234,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("h3", { className: "mt-6 mb-4", children: "Stats" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 238,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("span", { className: "mb-2 text-gray-500", children: [
          numAudioItemsAllTime,
          " Audio Items"
        ] }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 239,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("span", { className: "mb-2 text-gray-500", children: [
          numTagsAllTime,
          " Tags"
        ] }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 242,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("span", { className: "mb-2 text-gray-500", children: [
          numCommentsAllTime,
          " Comments"
        ] }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 243,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("h3", { className: "mt-6 mb-4", children: "Latest Collections" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 247,
          columnNumber: 6
        }, this),
        collections.map((collection, index) => {
          let { name } = collection;
          return name ? /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: "mb-2 text-gray-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: Entity_default.makeHrefForView(collection), children: collection.name }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 255,
            columnNumber: 9
          }, this) }, index, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 254,
            columnNumber: 8
          }, this) : null;
        }),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("h3", { className: "mt-6 mb-4", children: "Latest Features + Fixes" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 262,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(
          "a",
          {
            className: "mb-2",
            href: "https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc",
            target: "_blank",
            rel: "noreferrer",
            children: "View on GitHub \u2197"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 263,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("h3", { className: "mt-6 mb-4", children: "Latest Comments" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 272,
          columnNumber: 6
        }, this),
        comments.map((comment, index) => {
          let { createdByUser, parentAudioItem, text } = comment;
          return !createdByUser || !parentAudioItem ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: "mb-4 text-gray-500", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: " mb-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: `/users/${createdByUser.id}`, children: createdByUser.username }, void 0, !1, {
                fileName: "app/routes/index.tsx",
                lineNumber: 281,
                columnNumber: 10
              }, this),
              " commented on ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)(import_react64.Link, { to: Entity_default.makeHrefForView(parentAudioItem), children: parentAudioItem.name }, void 0, !1, {
                fileName: "app/routes/index.tsx",
                lineNumber: 285,
                columnNumber: 10
              }, this),
              ":"
            ] }, void 0, !0, {
              fileName: "app/routes/index.tsx",
              lineNumber: 280,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime50.jsxDEV)("div", { className: "whitespace-pre-line text-sm", children: text }, void 0, !1, {
              fileName: "app/routes/index.tsx",
              lineNumber: 290,
              columnNumber: 9
            }, this)
          ] }, index, !0, {
            fileName: "app/routes/index.tsx",
            lineNumber: 279,
            columnNumber: 8
          }, this);
        })
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 223,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 201,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 193,
    columnNumber: 3
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action8,
  default: () => Login,
  loader: () => loader24
});
var import_react65 = require("@remix-run/react"), import_node17 = require("@remix-run/node"), import_bcryptjs4 = __toESM(require("bcryptjs"));
var import_jsx_dev_runtime51 = require("react/jsx-dev-runtime"), loader24 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo");
  if (session.has("userId"))
    return (0, import_node17.redirect)(redirectTo || "/");
  let data = { error: session.get("error") };
  return (0, import_node17.json)(data, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}, action8 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), redirectTo = new URL(request.url).searchParams.get("redirectTo"), formData = await request.formData(), email = String(formData.get("email") ?? ""), password = String(formData.get("password") ?? ""), user = await db.user.findUnique({ where: { email } });
  return user ? user.passwordHashed ? import_bcryptjs4.default.compareSync(password, user.passwordHashed) ? (session.set("userId", user.id), (0, import_node17.redirect)(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "Incorrect password"), (0, import_node17.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash(
    "error",
    "This user does not have a password. TODO: Redirect to /reset-password page"
  ), (0, import_node17.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })) : (session.flash("error", "Could not find a user with this email"), (0, import_node17.redirect)("/login", {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  }));
};
function Login() {
  let { error } = (0, import_react65.useLoaderData)(), transition = (0, import_react65.useTransition)(), { search } = (0, import_react65.useLocation)(), redirectTo = new URLSearchParams(search).get("redirectTo"), signUpLinkQueryParams = new URLSearchParams(
    redirectTo ? { redirectTo } : void 0
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)(Layout_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)("h1", { className: "mb-6", children: [
      "Log in to ",
      redirectTo ? "continue" : "Trad Archive"
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 95,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)("div", { className: "flex flex-col align-start max-w-xs", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)("form", { method: "POST", className: "space-y-4 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)(
          "input",
          {
            type: "text",
            placeholder: "Email",
            autoFocus: !0,
            required: !0,
            name: "email"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 100,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)(
          "input",
          {
            type: "password",
            placeholder: "Password",
            required: !0,
            name: "password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 107,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)(
          "input",
          {
            type: "submit",
            className: "btn w-auto",
            disabled: transition.state === "submitting",
            value: "Log In"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 113,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 99,
        columnNumber: 5
      }, this),
      error && /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)("div", { className: "text-red-600 mb-6", children: error }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 121,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)("p", { className: "mb-2", children: [
        "Don't have an account yet?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)(import_react65.Link, { to: `/signup?${signUpLinkQueryParams.toString()}`, children: "Sign up" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 125,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 123,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime51.jsxDEV)(import_react65.Link, { to: "/reset-password", children: "Forgot password?" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 130,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 129,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 98,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 94,
    columnNumber: 3
  }, this);
}

// app/routes/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  action: () => action9
});
var import_client9 = require("@prisma/client"), import_node18 = require("@remix-run/node");
var action9 = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie")), userId = String(session.get("userId") ?? ""), referer = String(request.headers.get("referer") ?? ""), redirectTo = encodeURIComponent(
    referer ? new URL(referer).pathname : "/"
  );
  if (!userId)
    return (0, import_node18.redirect)(`/login?redirectTo=${redirectTo}`);
  if (request.method === "POST") {
    let formData = await request.formData(), relationshipId = String(formData.get("relationshipId") ?? ""), inverseRelationshipId = String(
      formData.get("inverseRelationshipId") ?? ""
    ), subjectEntityType = String(formData.get("subjectEntityType") ?? ""), subjectEntityId = String(formData.get("subjectEntityId") ?? ""), objectEntityType = String(formData.get("objectEntityType") ?? ""), objectEntityId = String(formData.get("objectEntityId") ?? ""), rawSubjectTimeMarkerSeconds = String(
      formData.get("subjectTimeMarkerSeconds") ?? ""
    ), subjectTimeMarkerSeconds = rawSubjectTimeMarkerSeconds === "" ? void 0 : Number(rawSubjectTimeMarkerSeconds);
    if (!relationshipId || !inverseRelationshipId || !subjectEntityType || !subjectEntityId || !objectEntityType || !objectEntityId)
      return (0, import_node18.json)(
        { error: "Missing required fields for creating Tag" },
        { status: 400 }
      );
    let [existing, existingInverse] = await Promise.all([
      db.tag.findFirst({
        where: {
          [`subject${subjectEntityType}Id`]: subjectEntityId,
          [`object${objectEntityType}Id`]: objectEntityId,
          relationshipId,
          subjectTimeMarkerSeconds: subjectEntityType === import_client9.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
        }
      }),
      db.tag.findFirst({
        where: {
          [`subject${objectEntityType}Id`]: objectEntityId,
          [`object${subjectEntityType}Id`]: subjectEntityId,
          relationshipId: inverseRelationshipId,
          subjectTimeMarkerSeconds: objectEntityType === import_client9.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
        }
      })
    ]);
    if (existing && existingInverse)
      return (0, import_node18.json)(
        { error: "This Tag has already been created" },
        { status: 400 }
      );
    let tag;
    existing || (tag = await db.tag.create({
      data: {
        [`subject${subjectEntityType}Id`]: subjectEntityId,
        [`object${objectEntityType}Id`]: objectEntityId,
        relationshipId,
        subjectTimeMarkerSeconds: subjectEntityType === import_client9.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
      }
    }));
    let tagInverse;
    return existingInverse || (tagInverse = await db.tag.create({
      data: {
        [`subject${objectEntityType}Id`]: objectEntityId,
        [`object${subjectEntityType}Id`]: subjectEntityId,
        relationshipId: inverseRelationshipId,
        subjectTimeMarkerSeconds: objectEntityType === import_client9.EntityType.AudioItem ? subjectTimeMarkerSeconds : void 0
      }
    })), (0, import_node18.json)({ tag, tagInverse }, { status: 201 });
  }
  if (request.method === "DELETE") {
    let formData = await request.formData(), tagId = String(formData.get("tagId") ?? "");
    return await db.tag.delete({ where: { id: tagId } }), (0, import_node18.json)({}, { status: 200 });
  }
  return null;
};

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "b94da72f", entry: { module: "/build/entry.client-TSMCFMUV.js", imports: ["/build/_shared/chunk-E4POIEVB.js", "/build/_shared/chunk-QS3GJO57.js", "/build/_shared/chunk-CUPSZOF3.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-VD2RZH7A.js", imports: ["/build/_shared/chunk-XD23K4ZD.js", "/build/_shared/chunk-SBX4NKV4.js", "/build/_shared/chunk-6MFXEF3F.js", "/build/_shared/chunk-FF66HNX7.js", "/build/_shared/chunk-LFDIS6R5.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/account/index": { id: "routes/account/index", parentId: "root", path: "account", index: !0, caseSensitive: void 0, module: "/build/routes/account/index-W4FZDM77.js", imports: ["/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/choose-new-password": { id: "routes/choose-new-password", parentId: "root", path: "choose-new-password", index: void 0, caseSensitive: void 0, module: "/build/routes/choose-new-password-SZ5CTA63.js", imports: ["/build/_shared/chunk-RZD3QUYA.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/comments": { id: "routes/comments", parentId: "root", path: "comments", index: void 0, caseSensitive: void 0, module: "/build/routes/comments-TE4UCUVI.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/$slug": { id: "routes/entities/audio-items/$slug", parentId: "root", path: "entities/audio-items/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/$slug-IR7CUAXU.js", imports: ["/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/index": { id: "routes/entities/audio-items/index", parentId: "root", path: "entities/audio-items", index: !0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/index-E3SI33KS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/audio-items/random": { id: "routes/entities/audio-items/random", parentId: "root", path: "entities/audio-items/random", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/audio-items/random-4HQM4E2D.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/$slug": { id: "routes/entities/collections/$slug", parentId: "root", path: "entities/collections/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/collections/$slug-4S34WU2F.js", imports: ["/build/_shared/chunk-SI53EVXF.js", "/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/collections/index": { id: "routes/entities/collections/index", parentId: "root", path: "entities/collections", index: !0, caseSensitive: void 0, module: "/build/routes/entities/collections/index-N7WIWN4J.js", imports: ["/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/$slug": { id: "routes/entities/instruments/$slug", parentId: "root", path: "entities/instruments/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/instruments/$slug-M2BYOI3U.js", imports: ["/build/_shared/chunk-SI53EVXF.js", "/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/instruments/index": { id: "routes/entities/instruments/index", parentId: "root", path: "entities/instruments", index: !0, caseSensitive: void 0, module: "/build/routes/entities/instruments/index-BHZELHAG.js", imports: ["/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/$slug": { id: "routes/entities/people/$slug", parentId: "root", path: "entities/people/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/people/$slug-JNEKSOLV.js", imports: ["/build/_shared/chunk-SI53EVXF.js", "/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/people/index": { id: "routes/entities/people/index", parentId: "root", path: "entities/people", index: !0, caseSensitive: void 0, module: "/build/routes/entities/people/index-7QOFBSUQ.js", imports: ["/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/$slug": { id: "routes/entities/places/$slug", parentId: "root", path: "entities/places/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/places/$slug-L6JK5UJY.js", imports: ["/build/_shared/chunk-SI53EVXF.js", "/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/places/index": { id: "routes/entities/places/index", parentId: "root", path: "entities/places", index: !0, caseSensitive: void 0, module: "/build/routes/entities/places/index-YZDLTG67.js", imports: ["/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/$slug": { id: "routes/entities/tunes/$slug", parentId: "root", path: "entities/tunes/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/entities/tunes/$slug-QUYROJ6I.js", imports: ["/build/_shared/chunk-SI53EVXF.js", "/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/entities/tunes/index": { id: "routes/entities/tunes/index", parentId: "root", path: "entities/tunes", index: !0, caseSensitive: void 0, module: "/build/routes/entities/tunes/index-5DF2FW3B.js", imports: ["/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-4UI5TM32.js", imports: ["/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-DVQME63M.js", imports: ["/build/_shared/chunk-RZD3QUYA.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-QCIOKXNT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/relationships": { id: "routes/relationships", parentId: "root", path: "relationships", index: void 0, caseSensitive: void 0, module: "/build/routes/relationships-NVSTW3YI.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/reset-password": { id: "routes/reset-password", parentId: "root", path: "reset-password", index: void 0, caseSensitive: void 0, module: "/build/routes/reset-password-KBNBUXZ3.js", imports: ["/build/_shared/chunk-RZD3QUYA.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/saved-items": { id: "routes/saved-items", parentId: "root", path: "saved-items", index: void 0, caseSensitive: void 0, module: "/build/routes/saved-items-A7VFI3MC.js", imports: ["/build/_shared/chunk-IGPGF2YZ.js", "/build/_shared/chunk-3O2QNSSL.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/search": { id: "routes/search", parentId: "root", path: "search", index: void 0, caseSensitive: void 0, module: "/build/routes/search-242MWHLE.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-5OPADG5A.js", imports: ["/build/_shared/chunk-RZD3QUYA.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/tags": { id: "routes/tags", parentId: "root", path: "tags", index: void 0, caseSensitive: void 0, module: "/build/routes/tags-B6DTFF6T.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/users/$id": { id: "routes/users/$id", parentId: "root", path: "users/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/users/$id-2HNC2HKB.js", imports: ["/build/_shared/chunk-HM2UVJMW.js", "/build/_shared/chunk-SINXZYOU.js", "/build/_shared/chunk-43JJPWIC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-B94DA72F.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_react_stream_exports }, routes = {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
