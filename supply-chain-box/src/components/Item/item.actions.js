export const OPEN_ITEM = "OPEN_ITEM";
export const CLOSE_ITEM = "CLOSE_ITEM";

export const openItem = function () {
  return {
    type: OPEN_ITEM,
    isOpen: true,
  }
}

export const closeItem = function () {
  return {
    type: CLOSE_ITEM,
    isOpen: false,
  }
}