export function findParentDivWithRole(
  element: HTMLElement,
  roleName: string
): HTMLElement | null {
  let currentElement = element.parentElement;

  while (currentElement) {
    if (
      currentElement.tagName.toLowerCase() === "div" &&
      currentElement.getAttribute("role") === roleName
    ) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
}
