import {
  IMPRESSION_ARIA_LABEL,
  PRICE_PER_IMPRESSION_IN_DOLLARS,
  TWEET_IMPRESSION_INDEX,
} from "../constants";
import { findParentDivWithRole } from "../util/dom";
import { getNumberFromString, getParsedPrice } from "../util/parser";
import { abbreviatedStringtoNumber } from "../util/number";

export function handleTL() {
  Array.from(
    document.querySelectorAll(`a[aria-label*="${IMPRESSION_ARIA_LABEL}"]`)
  ).map((e) => {
    const parent = findParentDivWithRole(e as HTMLElement, "group");

    if (!parent) return;

    const viewsContainer = parent.children[TWEET_IMPRESSION_INDEX];

    if (!viewsContainer) return;

    const viewsText =
      viewsContainer?.firstElementChild?.getAttribute("aria-label");

    if (!viewsText) return;

    const views = getNumberFromString(viewsText);
    const tweetPrice = views * PRICE_PER_IMPRESSION_IN_DOLLARS;
    const oldPriceTextSpan = parent.querySelector("#tweet-price");

    if (oldPriceTextSpan != null) {
      oldPriceTextSpan.textContent = getParsedPrice(tweetPrice);
      return;
    }
    const [, , span2] = viewsContainer.getElementsByTagName("span");
    const priceParent = document.createElement("div");

    priceParent.className = parent.children[0].className;
    const priceTextSpan = document.createElement("span");
    priceTextSpan.id = "tweet-price";
    priceTextSpan.className = span2.className;
    priceTextSpan.textContent = getParsedPrice(tweetPrice);
    priceTextSpan.style.color = "rgb(83, 100, 113)";
    priceTextSpan.style.fontSize = "13px";
    priceTextSpan.style.fontFamily = `"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`;

    const iconContainer = document.createElement("div");
    iconContainer.style.display = "flex";
    iconContainer.style.alignItems = "center";
    iconContainer.innerHTML = `<svg style="height: 1.25em" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="rgb(83, 100, 113)" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
    <path d="M12 3v3m0 12v3"></path>
    </svg>`;

    const priceContainer = document.createElement("div");
    priceContainer.style.display = "flex";
    priceContainer.style.alignItems = "center";

    priceContainer.appendChild(iconContainer);
    priceContainer.appendChild(priceTextSpan);
    priceParent.appendChild(priceContainer);

    parent.insertBefore(
      priceParent,
      parent.children[parent.children.length - 1]
    );
  });
}

export function handleTDetail() {
  const viewsText = document.querySelector(
    `span[data-testid="app-text-transition-container"]`
  );

  if (!viewsText?.textContent) return;

  const parsedViews = abbreviatedStringtoNumber(viewsText?.textContent);
  console.log(parsedViews);
  const tweetPrice = parsedViews * PRICE_PER_IMPRESSION_IN_DOLLARS;
  const viewsContainer = document.querySelector(`div[role="group"]`);

  if (!viewsContainer) return;

  const oldPriceTextSpan = viewsContainer.querySelector("#tweet-price");

  if (oldPriceTextSpan != null) {
    oldPriceTextSpan.textContent = getParsedPrice(tweetPrice);
    return;
  }

  const [, , span2] = viewsContainer.getElementsByTagName("span");
  const priceParent = document.createElement("div");

  priceParent.className = viewsContainer.children[1].className;
  const priceTextSpan = document.createElement("span");
  priceTextSpan.id = "tweet-price";
  priceTextSpan.className = span2.className;
  priceTextSpan.textContent = getParsedPrice(tweetPrice);
  priceTextSpan.style.color = "rgb(83, 100, 113)";
  priceTextSpan.style.fontSize = "13px";
  priceTextSpan.style.fontFamily = `"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif`;

  const iconContainer = document.createElement("div");
  iconContainer.style.display = "flex";
  iconContainer.style.alignItems = "center";
  iconContainer.innerHTML = `<svg style="height: 1.25em" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
    <path d="M12 3v3m0 12v3"></path>
    </svg>`;

  const priceContainer = document.createElement("div");
  priceContainer.style.display = "flex";
  priceContainer.style.alignItems = "center";

  priceContainer.appendChild(iconContainer);
  priceContainer.appendChild(priceTextSpan);
  priceParent.appendChild(priceContainer);
  viewsContainer.appendChild(priceParent);
}
