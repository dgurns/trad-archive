import { type EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import etag from "etag";

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	let markup = renderToString(
		<RemixServer context={remixContext} url={request.url} />
	);
	const generatedEtag = etag(markup);
	responseHeaders.set("Content-Type", "text/html");
	responseHeaders.set("ETag", generatedEtag);

	// check if the `If-None-Match` header matches the ETag; if so, send a 304 so
	// the browser can use its cached document
	if (request.headers.get("If-None-Match") === responseHeaders.get("ETag")) {
		return new Response("", { status: 304, headers: responseHeaders });
	}

	return new Response("<!DOCTYPE html>" + markup, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}
