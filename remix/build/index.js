var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_react3 = require("@remix-run/react");

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-LQ3Y3A32.css";

// app/components/Header.tsx
var import_react2 = require("@remix-run/react");
var import_outline = require("@heroicons/react/outline");
function Header() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row py-3 px-4 justify-between items-center bg-teal-700"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement(import_react2.Link, {
    to: "/",
    className: "whitespace-nowrap no-underline hover:no-underline text-yellow-200 hover:text-gray-400"
  }, "Trad Archive"), /* @__PURE__ */ React.createElement("button", {
    className: "text-white flex flex-row items-center whitespace-nowrap hover:text-gray-400 group ml-4"
  }, /* @__PURE__ */ React.createElement(import_outline.SearchIcon, {
    className: "h-5 block"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Search"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2"
  }, `/`)), /* @__PURE__ */ React.createElement(import_react2.Link, {
    to: "/entities/audio-items/random",
    className: "flex flex-row items-center no-underline text-white hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ React.createElement(import_outline.TrendingUpIcon, {
    className: "h-5 block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "md:pl-2 hidden md:block"
  }, "Random")))));
}

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
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react3.Meta, null), /* @__PURE__ */ React.createElement(import_react3.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44"
  }, /* @__PURE__ */ React.createElement(import_react3.Outlet, null)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header, null))), /* @__PURE__ */ React.createElement(import_react3.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react3.Scripts, null), /* @__PURE__ */ React.createElement(import_react3.LiveReload, null)));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader
});
var import_react6 = require("@remix-run/react");

// app/utils/db.server.ts
var import_client = require("@prisma/client");
var db;
if (false) {
  db = new import_client.PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new import_client.PrismaClient();
  }
  db = global.__db;
}

// app/components/AudioItemCard.tsx
var import_react4 = require("react");
var import_react5 = require("@remix-run/react");
var import_client2 = require("@prisma/client");
var import_outline2 = require("@heroicons/react/outline");
var AudioItemCard = ({ audioItem, showTitle = true, className }) => {
  const {
    name,
    slug,
    description,
    status,
    tagsAsSubject,
    createdByUser,
    createdAt
  } = audioItem;
  const navigate = (0, import_react5.useNavigate)();
  const audioItemIsInPlayer = false;
  const tagsWithTimeMarkers = (0, import_react4.useMemo)(() => {
    if (!Array.isArray(tagsAsSubject)) {
      return [];
    }
    return tagsAsSubject.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
  }, [tagsAsSubject]);
  const shouldShowPositionAndDuration = false;
  const isTakenDown = status === import_client2.EntityStatus.TAKEN_DOWN;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`
  }, showTitle && /* @__PURE__ */ React.createElement("h2", {
    className: "mb-2"
  }, /* @__PURE__ */ React.createElement(import_react5.Link, {
    to: `/entities/audio-items/${slug}`,
    className: "link-bare"
  }, name)), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }), /* @__PURE__ */ React.createElement("div", {
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
    "aria-label": "Play"
  }, /* @__PURE__ */ React.createElement(import_outline2.PlayIcon, {
    className: "material-icons h-8 text-teal-600 hover:text-teal-800"
  })), /* @__PURE__ */ React.createElement("div", {
    className: `ml-4 text-gray-500 opacity-0 ${shouldShowPositionAndDuration ? "opacity-100 transition-opacity delay-500 duration-400" : ""}`
  })))), tagsWithTimeMarkers.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "mx-4 mb-2 pt-3 border-t border-gray-200"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm flex flex-col sm:flex-row"
  }, "Added", createdByUser && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", "by", " ", /* @__PURE__ */ React.createElement(import_react5.Link, {
    to: `/users/${createdByUser.id}`,
    className: "flex flex-row px-0 sm:px-1"
  }, createdByUser.username)), " "), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm mt-1 text-gray-900 whitespace-pre-wrap"
  }, description || "No description")), /* @__PURE__ */ React.createElement("div", {
    className: "border-t border-gray-200 mt-4 pt-3 w-full flex flex-row justify-between items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "ml-2"
  }))));
};
var AudioItemCard_default = AudioItemCard;

// app/components/AudioItem.tsx
function AudioItemComponent({
  viewAs = "Cards" /* Cards */,
  audioItem,
  showTitle,
  className
}) {
  if (viewAs === "Cards" /* Cards */) {
    return /* @__PURE__ */ React.createElement(AudioItemCard_default, {
      audioItem,
      showTitle,
      className
    });
  } else {
    return null;
  }
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
async function loader() {
  const start = Date.now();
  const audioItems = await db.audioItem.findMany({
    include: {
      tagsAsSubject: true,
      createdByUser: true
    }
  });
  console.log(Date.now() - start);
  return { audioItems };
}
function Index() {
  const { audioItems } = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Explore"), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItemComponent, {
    viewAs: "Cards" /* Cards */,
    audioItem,
    key: index,
    className: "mb-6"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "Browse"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col space-y-2"
  }, /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: "/entities/people"
  }, "People"), /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: "/entities/instruments"
  }, "Instruments"), /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: "/entities/places"
  }, "Places"), /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: "/entities/tunes"
  }, "Tunes"), /* @__PURE__ */ React.createElement(import_react6.Link, {
    to: "/entities/collections"
  }, "Collections")), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Collections"), /* @__PURE__ */ React.createElement("h3", {
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
  }, "Latest Comments")));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "573e5ec1", "entry": { "module": "/build/entry.client-XFAQ3DFY.js", "imports": ["/build/_shared/chunk-JFS2FXVD.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-HOGINFI2.js", "imports": ["/build/_shared/chunk-YJ5V2O2W.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-I5KKIDCP.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-573E5EC1.js" };

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
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
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
