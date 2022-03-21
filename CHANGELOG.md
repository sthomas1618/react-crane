# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.32.1] - 2022-03-21

### Fixed

- a11y: removed orphaned aria-expanded from crane-select div. There already exists an aria-expanded attribute on the combobox element.

## [0.32.0] - 2022-03-17

### Fixed

- Add aria-activedescendant to Input so screen-readers like JAWs can know which option is "focused" while DOM focus remains on the input.
  Move aria-controls to Input per aria standards.
- Add aria-owns to the combobox element so screen-readers know the listbox should immediately follows the input in reading order.
- Give the menu element a unique id. Fixes a11y problems when multiple menus exist on the screen.

### Changed

- Remove tabindex=0 from Option. Unneeded.
- Made id a required prop. This is needed to give menu elements a unique id.

## [0.31.1] - 2022-02-04

### Fixed

- Fix 'enter' keyboard events not firing on selected options.

## [0.31.0] - 2022-01-26

### Changed

- Switched compilation/build from webpack to rollup.

### Fixed

- Improved accessibility of menu with aria-controls and aria-expanded.

## [0.30.0] - 2021-08-10

### Fixed

- Disable keyboard select when an option is disabled.

## [0.29.0] - 2021-07-28

### Added

- Add ability to override key used for disabled option, optionDisabledKey.
- Add ability to disable individual options in a dropdown.
