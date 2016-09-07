
const mobile = {
  "landscape": "@media only screen and (max-device-width: 680px) and (max-device-height: 667px) and (orientation: landscape) and (min-device-height: 0) and (min-device-width: 0)",
  "portrait": "@media only screen and (max-device-height: 667px) and (max-device-width: 375px) and (orientation: portrait) and (min-device-height: 0) and (min-device-width: 0)"
}

const large = {
  "landscape": "@media only screen and (min-device-width: 375px) and (min-device-height: 667px) and (orientation: landscape)",
  "portrait": "@media only screen and (min-device-height: 668px) and (min-device-width: 376px) and (orientation: portrait)"
}

const huge = {
  "landscape": "@media only screen and (min-device-width: 1200px) and (min-device-height: 800px) and (orientation: landscape)",
  "portrait": "@media only screen and (min-device-height: 800px) and (min-device-width: 1200px) and (orientation: portrait)"
}

export {
  huge,
  large,
  mobile
}

